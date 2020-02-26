import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';
// import { polygon } from '@turf/turf';


@Injectable({
  providedIn: 'root'
})

export  class DrawTwinkleCircleService {
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
  private currentId;
  private circleCenter =  new ArkWeb.Cartesian3(0.0, 0.0, 0);
  private radius = 0;
  private startDraw = false;




  drawTwinkleCircle(lon: number, lat: number, id ): void {

    const pos = ArkWeb.SceneTransforms.wgs84ToWindowCoordinates (this.core.viewer.scene, ArkWeb.Cartesian3.fromDegrees(lon, lat));
    const pickRay = this.core.viewer.scene.camera.getPickRay(pos);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    let i = 0;
    this.currentCircle = this.core.viewer.entities.add({
      position:  ArkWeb.Cartesian3.fromDegrees(lon, lat, 150),
      point: {
          color: ArkWeb.Color.RED.withAlpha(0.2),
          pixelSize:  new ArkWeb.CallbackProperty(() => {
            // console.log('call', time, result);
            i = ++i % 260;
            const isv = Math.floor(i / 20);
            return isv;
          }),
          outlineWidth : 2.0,
          clampToGround : true,
          outlineColor : ArkWeb.Color.RED,
          eyeOffset: new ArkWeb.Cartesian3(0.0, 0.0, 20.0),
          // horizontalOrigin: ArkWeb.HorizontalOrigin.CENTER,
          // verticalOrigin: ArkWeb.VerticalOrigin.BOTTOM,
          // heightReference: ArkWeb.HeightReference.CLAMP_TO_GROUND,
          scaleByDistance: new ArkWeb.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.1)
      }
    });
    let entitieList = [];
    if (this.circleMap.get(id)) {
      entitieList = this.circleMap.get(id);
    }
    entitieList.push(this.currentCircle);
    this.circleMap.set(id, entitieList);
    this.currentId = id;
  }
  removePolygon(id) {
    const entitieList = this.circleMap.get(id);
    if (ArkWeb.defined( entitieList)) {
      entitieList.forEach(entity => {
        this.core.viewer.entities.remove(entity);
      });
      this.circleMap.delete(id);
    }
  }

  removeCurrent() {
    this.removePolygon(this.currentId);
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
