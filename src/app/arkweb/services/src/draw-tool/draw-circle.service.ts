import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';
// import { polygon } from '@turf/turf';


@Injectable({
  providedIn: 'root'
})

export  class DrawCircleService {
    [x: string]: any;
  constructor(
      public core: CoreService
      // private tbasicTool: BasicToolService,
    //   protected gasProjectionTool: GasProjectionToolService,
    //   protected coordinateCoutTool: CoordinateCoutToolService
      ) {
  }

  private defaultOption = {
    fillColor: ArkWeb.Color.GREEN.withAlpha(0.6)
  };
  private circleMap = new Map();
  private currentCircle;
  private circleCenter =  new ArkWeb.Cartesian3(0.0, 0.0, 0);
  private radius = 0;
  private startDraw = false;


  drawCircle(cPos, radius, posType = 'cartesian',  param? ) {
    // console.log("绘制椭圆形！：" + ellipseStruct);
    let pos = cPos;
    if (posType === 'window') {
        const pickRay = this.core.viewer.scene.camera.getPickRay(cPos.position);
        const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
        pos = cartesian;

    } else if ( posType === 'cartesian') {
      pos = cPos;
    } else if (posType === 'radian') {
        const cartesian = ArkWeb.Cartesian3.fromRadians(cPos[0] , cPos[1] , ArkWeb.defaultValue(cPos[2] , 0));
        pos = cartesian;

    } else if (posType === 'degree' ) {
        const cartesian = ArkWeb.Cartesian3.fromDegrees(cPos[0], cPos[1], ArkWeb.defaultValue(cPos[2], 0));
        pos = cartesian;

    }
    // 红色椭圆形，位于地表，带轮廓
    let fillColor =  this.defaultOption.fillColor ;
    let idNo = this.circleMap.size;
    let bId =  'c' + idNo ;
    if (param) {
      fillColor = ArkWeb.defaultValue(param.fillColor, this.defaultOption.fillColor);
      bId = ArkWeb.defaultValue(param.nId , 'c' + idNo);
    }

    if ( ArkWeb.defined(this.circleMap.get(bId))) {
    while ( ArkWeb.defined(this.circleMap.get(bId))) {
      idNo++;
      bId = ArkWeb.defaultValue(param.nId , 'c' + idNo);
      if (!ArkWeb.defined(this.circleMap.get(bId))) {
        break;
      }
    }}

    const redEllipse = this.core.viewer.entities.add({
        // 不带高度
        position: pos,  // ArkWeb.Cartesian3.fromDegrees(-103.0, 40.0),
        ellipse: {
            semiMinorAxis: radius,
            semiMajorAxis: radius,
            material: fillColor
        },
        id: bId
    });
    this.circleMap.set(bId, redEllipse);
    return redEllipse;
}
  removePolygon(id) {
    const polygonc = this.circleMap.get(id) ;
    if (polygonc) {
      this.circleMap.delete(id);
      this.core.viewer.entities.remove(polygonc);
    }
  }

  removeAll() {
    this.circleMap.forEach(cir => {
      this.core.viewer.entities.remove(cir);
    });
    this.circleMap.clear();
  }
  activeTool(param?): void {
    if (!ArkWeb.defined(this.currentCircle)) {
      // const fillColor = ArkWeb.defaultValue(param.fillColor, this.defaultOption.fillColor);
      this.currentCircle = this.core.viewer.entities.add({
          // 不带高度
          position: new ArkWeb.CallbackProperty(() => { return this.circleCenter;
          }),  // ArkWeb.Cartesian3.fromDegrees(-103.0, 40.0),
          ellipse: {
              semiMinorAxis:  new ArkWeb.CallbackProperty(() => {  return this.radius;
              }),
              semiMajorAxis: new ArkWeb.CallbackProperty(() => {  return this.radius;
              }),
              material: this.defaultOption.fillColor
          }
      });
    }
    if (param && param.fillColor) {
      this.defaultOption.fillColor = param.fillColor;
      if (ArkWeb.defined(this.currentCircle)) {
        this.currentCircle.ellipse.material = this.defaultOption.fillColor ;
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
      if (!this.startDraw) {
        if ( ArkWeb.defined(cartesian)) {
          this.circleCenter = cartesian;
          this.startDraw = true;
        }
      } else {
        return this.rightClickCallback(movement, param);
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
        this.radius = ArkWeb.Cartesian3.distance(this.circleCenter, cartesian);
        const cir =  this.drawCircle(this.circleCenter, this.radius, param);
        this.startDraw = false;
        this.radius = 0;
        return cir;
      }

  }

  mouseMoveCallbcak(movement, param ): void {
    if (!this.startDraw) {
      return;
    }
    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);

    if ( ArkWeb.defined(cartesian)) {
      this.radius = ArkWeb.Cartesian3.distance(this.circleCenter, cartesian);
    }
  }

}
