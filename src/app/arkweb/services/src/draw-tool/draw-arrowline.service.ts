import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export  class DrawArrowService {
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
              material: new ArkWeb.PolylineArrowMaterialProperty(this.defaultOption.fillColor),
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
        this.currentLine.polyline.material = new ArkWeb.PolylineArrowMaterialProperty(this.defaultOption.fillColor);
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
    const lineMaterial = new ArkWeb.PolylineArrowMaterialProperty(lineColor);
    const Arrowline = this.core.viewer.entities.add({
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

    if ( param && param.property) {
      Arrowline.property = param.property;
    }
    this.lineList.set(aId, Arrowline);
    return Arrowline;
  }

  removeArrow(id) {
    const line = this.lineList.get(id) ;
    if (line) {
      this.lineList.delete(id);
      this.core.viewer.entities.remove(line);
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
      const isArrow =  ArkWeb.defaultValue(param.isArrow , false);
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
