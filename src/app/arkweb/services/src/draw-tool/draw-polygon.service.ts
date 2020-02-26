import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';
// import { polygon } from '@turf/turf';


@Injectable({
  providedIn: 'root'
})

export  class DrawPolygonService {
    [x: string]: any;
  constructor(
      public core: CoreService
      // private tbasicTool: BasicToolService,
    //   protected gasProjectionTool: GasProjectionToolService,
    //   protected coordinateCoutTool: CoordinateCoutToolService
      ) {
  }

  private defaultOption = {
    fillColor: ArkWeb.Color.CYAN.withAlpha(0.6)
  };
  private polygonMap = new Map();
  private currentPolygon;
  private currentActivePolygonpointsList = [];
  private currentpolygonpointsList = [];

  public newPolygonJson(geojsonObj, param?): any {

    if (geojsonObj.geometry.type === 'Polygon') {
      const posArray = [];
      const coorArray = geojsonObj.geometry.coordinates;
      coorArray.forEach(poslist => {
        poslist.forEach(pos => {
        if (pos.length > 0 ) {
          let cH = 0;
          if (param.heightToGround) {
            const currentcartographic = new ArkWeb.Cartographic(ArkWeb.Math.toRadians(pos[0]), ArkWeb.Math.toRadians(pos[1]), 0);
            cH = ArkWeb.defaultValue(this.core.viewer.scene.globe.getHeight(currentcartographic) , 0 ) + param.heightToGround;
          }
          posArray.push(ArkWeb.Cartesian3.fromDegrees(ArkWeb.Math.toRadians(pos[0]), ArkWeb.Math.toRadians(pos[1]), cH));
          ;
        }
        });
      });
      const fillColor = ArkWeb.defaultValue(param.fillColor, this.defaultOption.fillColor);
      const colormaterial = new ArkWeb.ColorMaterialProperty(fillColor);
      const curpolygon = new ArkWeb.PolygonGraphics();
      curpolygon.hierarchy = new ArkWeb.ConstantProperty(new ArkWeb.PolygonHierarchy(posArray));
      // console.log(curpolygon.hierarchy);
      const entity = new ArkWeb.Entity({
        show: true,
        polygon: curpolygon
      });
      if (param.heightToGround) {
        // const newCartographic = new ArkWeb.Cartographic(coorArray[0][0][0], coorArray[0][0][1], 0);
        // const height = this.core.viewer.scene.globe.getHeight(newCartographic) + 5;
        curpolygon.perPositionHeight = new ArkWeb.ConstantProperty(true);
      }
      curpolygon.material = colormaterial;
      return entity;
    }
    return null;
    // const curpolygon = new ArkWeb.PolygonGraphics();
    // curpolygon.hierarchy = new ArkWeb.ConstantProperty(new ArkWeb.PolygonHierarchy());

        // ArkWeb.Cartesian3.fromRadiansArray([
      //     -1, -1,
      //     1, -1,
      //     1, 1,
      //     -1, 1
      // ])

  }

  addPolygon(poslist, posType = 'cartesian', param?) {

    if (poslist.length < 3) {
      return null;
    }
    let postion = [];
    let idNo = this.polygonMap.size;
    let pId = ArkWeb.defaultValue(param.nId , 'p' + idNo);
    // if (ArkWeb.defined(this.billMap.get(pId))) {
    while (ArkWeb.defined(this.polygonMap.get(pId))) {
      idNo++;
      pId = ArkWeb.defaultValue(param.nId , 'p' + idNo);
      if (!ArkWeb.defined(this.polygonMap.get(pId))) {
        break;
      }
    }
  // }
    if (posType === 'window') {
      poslist.forEach(movement => {
        const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
        const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
        postion.push(cartesian);
      });

    } else if ( posType === 'cartesian') {
      postion = [].concat(poslist);
    } else if (posType === 'radian') {
      poslist.forEach(radian => {
        const cartesian = ArkWeb.Cartesian3.fromRadians(radian[0] , radian[1] , ArkWeb.defaultValue(radian[2] , 0));
        postion.push(cartesian);
      });
    } else if (posType === 'degree' ) {
      poslist.forEach(degree => {
        const cartesian = ArkWeb.Cartesian3.fromDegrees(degree[0], degree[1], ArkWeb.defaultValue(degree[2], 0));
        postion.push(cartesian);
      });
    }

    const fillColor =  ArkWeb.defaultValue(param.fillColor , this.defaultOption.fillColor);

    const addPolygon = this.core.viewer.entities.add({
      polygon : {
          hierarchy: postion,
          material: new ArkWeb.ColorMaterialProperty(fillColor)
      },
      id: pId
    });
    this.polygonMap.set(pId, addPolygon);
    return addPolygon ;
  // this.basicTool.measurePolygonCollection.push(addPolygon);
  }
  removePolygon(id) {
    const polygonc = this.polygonMap.get(id) ;
    if (polygonc) {
      this.polygonMap.delete(id);
      this.core.viewer.entities.remove(polygonc);
    }
  }

  removeAll() {
    this.polygonMap.forEach(polygon2 => {
      this.core.viewer.entities.remove(polygon2);
    });
    this.polygonMap.clear();
  }
  activeTool(param?): void {
    if (!ArkWeb.defined(this.currentPolygon)) {
      this.currentPolygon = this.core.viewer.entities.add({
          polygon : {
              hierarchy: new ArkWeb.CallbackProperty(() => {
                  return this.currentActivePolygonpointsList;
              }, false),
              material: new ArkWeb.ColorMaterialProperty(this.defaultOption.fillColor),
          }
      });
    }
    if (param && param.fillColor) {
      this.defaultOption.fillColor = param.fillColor;
      if (ArkWeb.defined(this.currentPolygon)) {
        this.currentPolygon.polygon.material = new ArkWeb.ColorMaterialProperty(this.defaultOption.fillColor);
      }
    }
  }
setOption(option) {
  if (option.fillColor) {
    this.defaultOption.fillColor = option.fillColor;

  }
}
////////////////////////////////////////////////////////////////////////////
  leftClickCallbcak(movement, param ) {
      const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
      const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
      if ( ArkWeb.defined(cartesian)) {
        this.currentPoint = cartesian;
      }
      {
          const pickedFeature = this.core.viewer.scene.pick(movement.position);
        //   console.log('pickedFeature', pickedFeature);
          if ( ArkWeb.defined(cartesian)) {
              this.currentpolygonpointsList.push(cartesian);
          }
          this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
      }
  }
  /**
   * 右键结束
   * @param movement 点击位置
   */
  rightClickCallback(movement , param ) {
      const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
      const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
      if ( ArkWeb.defined(cartesian)) {
        this.currentPoint = cartesian;
      }
      {
          if (this.currentpolygonpointsList.length > 1 ) {
            if ( ArkWeb.defined(cartesian)) {
                this.currentpolygonpointsList.push(cartesian);
            }
            this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
          }
          const pos = [].concat(this.currentActivePolygonpointsList);
          if (this.currentpolygonpointsList.length > 2) {
              const current  = this.addPolygon(this.currentActivePolygonpointsList, 'cartesian', param );
              this.currentpolygonpointsList = []; // 清空点
              this.currentActivePolygonpointsList = []; // 清空点
              return current;
          }
      }
  }

  mouseMoveCallbcak(movement, param ): void {
    if (this.currentpolygonpointsList.length < 2) {
      return;
    }
    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
    if ( ArkWeb.defined(cartesian)) {
      this.currentActivePolygonpointsList .push(cartesian);
      this.currentPoint = cartesian;
    }
  }

}
