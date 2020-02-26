import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export  class DrawPolylineService {
    [x: string]: any;
  constructor(
      public core: CoreService
      // private tbasicTool: BasicToolService,
    //   protected gasProjectionTool: GasProjectionToolService,
    //   protected coordinateCoutTool: CoordinateCoutToolService
      ) {
  }
  private currentpolylinepointsList = [];
  private currentActivePolylinepointsList = [];
  private currentLine;
  private measureLineCollection;
  private lineList = new Map();
  private defaultOption = {
    fillColor: ArkWeb.Color.YELLOW,
    lineWidth: 30
  };

  activeDrawLineTool(): void {
    if (!this.measureLineCollection) {
      this.measureLineCollection = new ArkWeb.PolylineCollection();
      this.core.viewer.scene.primitives.add(this.measureLineCollection);
    }
    if (!ArkWeb.defined(this.currentLine)) {
      this.currentLine = this.core.viewer.entities.add({
          polyline : {
              positions: new ArkWeb.CallbackProperty(() => {
                  return this.currentActivePolylinepointsList;
              }),
              width : this.defaultOption.lineWidth,
              followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
              // material : ArkWeb.Color.YELLOW,
              material:  this.defaultOption.fillColor ,
              clampToGround: true
          }
      });
    }
  }
  clearDrawLineTool(): void {
    this.measureLineCollection.removeAll();
  }

  setOption( option ) {
    if (option.fillColor) {
      this.defaultOption.fillColor = option.fillColor;
      if (ArkWeb.defined(this.currentLine)) {
        this.currentLine.polyline.material = this.defaultOption.fillColor ;
      }
    }
    if (option.lineWidth ) {
      this.defaultOption.lineWidth = option.lineWidth;
      if (ArkWeb.defined(this.currentLine)) {
        this.currentLine.polyline.width = this.defaultOption.lineWidth;
      }
    }
  }

  addLine(poslist, posType = 'cartesian', param?) {
    const lineColor =  ArkWeb.defaultValue(param.fillColor , this.defaultOption.fillColor);
    const lineWidth = ArkWeb.defaultValue(param.lineWidth , 10);
    let idNo: number = this.lineList.size;
    let aId = ArkWeb.defaultValue(param.nId , 'a' + idNo);
    // const li = this.lineList.get(aId);
    // if (!ArkWeb.defined(this.lineList.get(aId))) {
    while (ArkWeb.defined(this.lineList.get(aId))) {
      idNo++;
      aId = ArkWeb.defaultValue(param.nId , 'a' + idNo);
      if (!ArkWeb.defined(this.lineList.get(aId))) {
        break;
      }
    }
    // }
    let postion = [];
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
    const lineMaterial = lineColor ;
    const Polyline = this.core.viewer.entities.add({
      name: '箭头线',
      polyline: {
        positions: postion,
        width: lineWidth,
        followSurface: false,
        material: lineMaterial,  // ArkWeb.Color.FUCHSIA
        clampToGround: true
      },
      id: aId
    });
    this.lineList.set(aId, Polyline);
    return Polyline;
  }

  addLineFromGeoJson(geoSrc, param) {
    let isClampToGround = ArkWeb.defaultValue(param.isClampToGround, true);
    let isSetEveryEntity = false;
    let currentHeight = null;
    if (param.height) {
      currentHeight = ArkWeb.defaultValue(param.height, false);
      isSetEveryEntity = true;
      isClampToGround = false;
    }
    const FarDistanceCondition = ArkWeb.defaultValue(param.farDistanceCondition , Number.MAX_VALUE);
    const nearDistanceCondition = ArkWeb.defaultValue(param.nearDistanceCondition, 0.0);
    // this.loader.show('正在渲染淹没数据....');
    let strokeColor =   ArkWeb.Color.YELLOW;
    let fillColor = strokeColor;
    if (param.originColor) {
      strokeColor = ArkWeb.Color.fromCssColorString(param.originColor);
      fillColor = strokeColor;
    }
    if (param.stroke) {
      strokeColor = ArkWeb.Color.fromCssColorString(param.stroke);
      fillColor = strokeColor;
    }
    if (param.fill ) {
      fillColor =  ArkWeb.Color.fromCssColorString(param.fill);

    }
    const promise = ArkWeb.GeoJsonDataSource.load(geoSrc, {
      stroke: strokeColor,
      fill: fillColor,
      clampToGround: isClampToGround,
      distanceDisplayCondition : new ArkWeb.DistanceDisplayCondition(0, 3e5)
    });

    let idNo: number = this.lineList.size;
    let aId = ArkWeb.defaultValue(param.nId , 'ad' + idNo);
    while (ArkWeb.defined(this.lineList.get(aId))) {
      idNo++;
      aId = ArkWeb.defaultValue(param.nId , 'ad' + idNo);
      if (!ArkWeb.defined(this.lineList.get(aId))) {
        break;
      }
    }

    promise.then((dataSource) => {
      // if (isSetEveryEntity) {
        const entitylist = [];
        dataSource.entities.values.forEach(entity => {
      //     entity.polyline.distanceDisplayCondition = new ArkWeb.DistanceDisplayCondition(0, 3e5);

      //     if (currentHeight) {
      //       entity.polygon.height = currentHeight;
      //     }
          if (ArkWeb.defined(param.nearDistanceCondition) || ArkWeb.defined(param.FarDistanceCondition)) {
            entity.polyline.distanceDisplayCondition = new ArkWeb.DistanceDisplayCondition(nearDistanceCondition, FarDistanceCondition);
          }
          
          this.core.viewer.entities.add(entity);
          entitylist.push(entity);
        });
        this.lineList.set(aId, entitylist);
    }).otherwise((error) => {
      // this.loader.hide();
    });

    return aId;
  }

  removePolyline(id) {
    const line = this.lineList.get(id) ;
    if (line) {
      if (id.indexOf('ad') === -1) {
        this.lineList.delete(id);
        this.core.viewer.entities.remove(line);
      } else {
        line.forEach(entity => {
          this.core.viewer.entities.remove(entity);
        });
      }
    }
  }

  removeAll() {
    this.lineList.forEach(line => {
      this.core.viewer.entities.remove(line);
    });
    this.lineList.clear();
  }
  leftClickCallbcak(movement) {

    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    if ( ArkWeb.defined(cartesian)) {
      this.currentPoint = cartesian;
    }
    { // 测量长度
      if ( ArkWeb.defined(cartesian)) {
          this.currentpolylinepointsList.push(cartesian);
      }
      this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
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
      if (this.currentpolylinepointsList.length > 0 ) {
          if ( ArkWeb.defined(cartesian)) {
              this.currentpolylinepointsList.push(cartesian);
          }
          this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
      }
      const pos = [].concat(this.currentActivePolylinepointsList);

      this.currentActivePolylinepointsList = []; // 清空点
      this.currentpolylinepointsList = []; // 清空点
      const isPolyline =  ArkWeb.defaultValue(param.isPolyline , false);
      return this.addLine(pos, 'cartesian',  param);
    }
}

mouseMoveCallbcak(movement): void {
    { // 画线
        const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
        const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
        this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
        if ( ArkWeb.defined(cartesian)) {
            this.currentActivePolylinepointsList.push(cartesian);
        }
    }

}

}
