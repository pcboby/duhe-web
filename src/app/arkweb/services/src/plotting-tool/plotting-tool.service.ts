import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';
import { DrawLabelService } from '../draw-tool/draw-label.service';
import { DrawPolylineService } from '../draw-tool/draw-polyline.service';
import { DrawArrowService } from '../draw-tool/draw-arrowline.service';
import { DrawPolygonService } from '../draw-tool/draw-polygon.service';
import { DrawCircleService } from '../draw-tool/draw-circle.service';
import { DrawCylinderService } from '../draw-tool/draw-cylinder.service';

@Injectable({
  providedIn: 'root'
})

export  class PlottingToolService {
    [x: string]: any;
  constructor(
      private drawLabelTool: DrawLabelService,
      private drawArrowTool: DrawArrowService,
      private drawPolygonTool: DrawPolygonService,
      private drawCylinderTool: DrawCylinderService,
      private drawCicleTool: DrawCircleService,
      public core: CoreService
    //   protected gasProjectionTool: GasProjectionToolService,
    //   protected coordinateCoutTool: CoordinateCoutToolService
      ) {
  }

  private currentDrawType = 0; // 1 label 2 Line 3 Arrow 4 Polygon
  private eventHandler = null;
  private activeToolManager ;
  private currentOptions;
  private currentCallbackFunction ;
  private currentLine;
  private currentActivePolylinepointsList = [];
  private defaultOption = {
    fillColor: ArkWeb.Color.YELLOW
  };
  ///// pick
  private isPick = false;
  private pickObj ;
  private pickPreMovemnetPos;
  private pickAftMovemnet;
  private transCartographic = [];

  private billBoardMap = new Map ();
  private currentCartographic = [];

  activePlottingTool(): void {

    if (!ArkWeb.defined(this.currentLine)) {
      this.currentLine = this.core.viewer.entities.add({
          polyline : {
              positions: new ArkWeb.CallbackProperty(() => {
                  return this.currentActivePolylinepointsList;
              }),
              width : 10,
              followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
              material : ArkWeb.Color.WHITE,
              // material:  this.defaultOption.fillColor ,
              clampToGround: true
          }
      });
    }
    if (this.eventHandler === null) {
      this.eventHandler = new ArkWeb.ScreenSpaceEventHandler(this.core.viewer.scene.canvas);
    }

    const eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
    if (!eve) {
      this.eventHandler.setInputAction((evt) => {
        this.leftclick(evt);
      }, ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
      this.eventHandler.setInputAction((event) => {
          this.rightClick(event);
      }, ArkWeb.ScreenSpaceEventType.RIGHT_CLICK);
      this.eventHandler.setInputAction((event) => {
          this.mouseMove(event);
      }, ArkWeb.ScreenSpaceEventType.MOUSE_MOVE);
      // this.eventHandler.setInputAction((event) => {
      //     this.leftup(event);
      // }, ArkWeb.ScreenSpaceEventType.LEFT_UP);
      // this.eventHandler.setInputAction((event) => {
      //     this.leftdown(event);
      // }, ArkWeb.ScreenSpaceEventType.LEFT_DOWN);
      this.eventHandler.setInputAction((event) => {
          this.leftDlbClick(event);
      }, ArkWeb.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
  }


  setCurrentCallbackFunction( fun ) {// 设置
    this.currentCallbackFunction = fun;
  }
//////////////////////////////////////////////////////////////////////// 点标注
  public addLabel(positionList, param) {
    const option = param;
    this.drawLabelTool.activeLabelCollection();
    // option.nId = ArkWeb.defaultValue(param.nId , this.billboardCollection.length);
    const billlabel = this.drawLabelTool.addLabel(positionList, param);
    // this.billBoardMap.set(  billlabel.id, billlabel);
    return billlabel.id;

  }

  public activeDrawLabel(param) {
    this.activePlottingTool();
    this.drawLabelTool.activeLabelCollection();
    this.activeToolManager = this.drawLabelTool;
    this.currentOptions = param;
    this.currentDrawType = 1;
  }

  public drawText(positionList, textString, param) {
  }
////////////////////////////////
drawCylinder(pos, param) {

}
  //////////////////////////////////////////////////////////////////////// 箭头标注
  addArrow(positionList, coordinateType,  param): void {
    this.drawArrowTool.activeDrawLineTool();
    const bill = this.drawArrowTool.addLine(positionList, coordinateType, param);
    // this.currentDrawType = 2;
    return bill.id;
  }

  public activeDrawArrow(param) {
    this.activePlottingTool();
    this.drawArrowTool.activeDrawLineTool();
    this.drawArrowTool.setOption(param);
    this.activeToolManager = this.drawArrowTool;
    this.currentOptions = param;
    this.currentDrawType = 2;
  }
  //////////////////////////////////////////////////////////////////////// 多边形标注
  activeDrawPolygon(param): void {
    // this.activeDrawLabel({
    //   data: 's',
    //   onAfter: (reg, id, inputoptions) => {
    //   // alert('label');
    //   console.log(inputoptions);
    // }});
    // return; // temp
    this.activePlottingTool();
    this.drawPolygonTool.activeTool(param);
    this.currentDrawType = 3;
    this.activeToolManager = this.drawPolygonTool;
    this.currentOptions = param;

  }

  //////////////////////////////////////////////////////////////////////// 圆标注
  addCircle(pos, radius, posType = 'cartesian',  param? ) {
    this.drawCicleTool.drawCircle(pos, radius, posType, param );
  }

  activeDrawCircle(param) {
    this.activePlottingTool();
    this.drawCicleTool.activeTool(param);
    this.currentDrawType = 4;
    this.activeToolManager = this.drawCicleTool;
    this.currentOptions = param;

  }
  //////////////////////////////////////////////////////////////////////// 点击选择
  activePick(param?): void {
    this.activePlottingTool();
    this.activeToolManager = null;
    this.currentDrawType = -1;
    if (param) {
      this.currentOptions = param;
    }
  }

  removePick(id): void {
    // alert(id[0]);
    if (id) {
      if (id[0] === 'p') {
        this.drawPolygonTool.removePolygon(id);
      } else if (id[0] === 'a') {
        this.drawArrowTool.removeArrow(id);
      } else if (id[0] === 'b') {
        this.drawLabelTool.removeLabeOfId(id);
      }
    }
  }

  removeAll(): void {
    this.drawArrowTool.removeAll();
    this.drawPolygonTool.removeAll();
    this.drawLabelTool.removeAllLabels();
    this.drawCicleTool.removeAll();
    this.activeToolManager = null;
    this.currentDrawType = 0;
  }

  clearPlottingTool(): void {
    this.activeToolManager = null;
    this.currentDrawType = 0;
    return;
  }

  OnDestroyTool() {
    if ( ArkWeb.defined(this.eventHandler))  {
        let eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
        if (eve) {
            this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
        }
        eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_UP);
        if (eve) {
            this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.LEFT_UP);
        }
        eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        if (eve) {
            this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        }
        eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.RIGHT_CLICK);
        if (eve) {
            this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.RIGHT_CLICK);
        }
        eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.MOUSE_MOVE);
        if (eve) {
            this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.MOUSE_MOVE);
        }
    }
  }
/////////////////////////////////////////////////
private leftclick(movement): void {
  if (this.currentDrawType === 0 ) {
    return;
  }

  if (!this.activeToolManager ) {
    if ( this.currentDrawType < 0 && !this.isPick) {
      const pickedFeature = this.core.viewer.scene.pick(movement.position);
      this.callbackPick(pickedFeature);
      // if (ArkWeb.defined(pickedFeature)) {
      //   // const picksObj = ArkWeb.defaultValue(pickedFeature.primitive, pickedFeature.id);
      //   const option = {
      //     id: 0,
      //     property: null
      //   };
      //   // this.currentCallbackFunction = this.currentOptions.onAfter;
      //   if ( ArkWeb.defined(pickedFeature.id) && pickedFeature.id.id) {
      //     option.id = pickedFeature.id.id;
      //     if (pickedFeature.property) {
      //       option.property = pickedFeature.property;
      //     } else if (pickedFeature.id.property) {
      //       option.property = pickedFeature.id.property;
      //     } else if (pickedFeature.id.property) {
      //       option.property = pickedFeature.id.property;
      //     }
      //   } else if (ArkWeb.defined(pickedFeature.primitive) && ArkWeb.defined(pickedFeature.id)) {
      //       option.id = pickedFeature.id;
      //       if (pickedFeature.property) {
      //         option.property = pickedFeature.property;
      //       } else if (pickedFeature.primitive.property) {
      //         option.property = pickedFeature.primitive.property;
      //       }
      //   }
      //   if (typeof this.currentOptions.onAfter === 'function') {
      //     this.currentCallbackFunction = this.currentOptions.onAfter;
      //     this.currentCallbackFunction( option );
      //   }
      //   // console.log(picksObj);
      // }
    }
    return;
  }
  const enti = this.activeToolManager.leftClickCallbcak(movement, this.currentOptions);

  const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
  const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
  if (cartesian) {
    const cartographic = ArkWeb.Cartographic.fromCartesian(cartesian);
    cartographic.latitude = cartographic.latitude * 180 / Math.PI;
    cartographic.longitude = cartographic.longitude * 180 / Math.PI;
    this.currentCartographic.push(cartographic);
  }

  if (enti) {
    // this.activeToolManager = null;
    // this.currentDrawType = -1;
    // return; // temp
    this.currentDrawType = 0;
    if (typeof this.currentOptions.onAfter === 'function') {
      this.currentCallbackFunction = this.currentOptions.onAfter;
      this.currentCallbackFunction(this.currentCartographic, enti.id, this.currentOptions );
      this.currentCartographic = [];
      this.transCartographic = [];
    }
  }
}


  private callbackPick(pickedFeature) {
    // const pickedFeature = this.core.viewer.scene.pick(movement.position);
      if (ArkWeb.defined(pickedFeature)) {
        // const picksObj = ArkWeb.defaultValue(pickedFeature.primitive, pickedFeature.id);
        const option = {
          id: 0,
          property: null,
          prePostion: null,
          aftPostion: null
        };
        // this.currentCallbackFunction = this.currentOptions.onAfter;
        if ( ArkWeb.defined(pickedFeature.id) && pickedFeature.id.id) {
          option.id = pickedFeature.id.id;
          if (pickedFeature.property) {
            option.property = pickedFeature.property;
          } else if (pickedFeature.id.property) {
            option.property = pickedFeature.id.property;
          } else if (pickedFeature.id.property) {
            option.property = pickedFeature.id.property;
          }
        } else if (ArkWeb.defined(pickedFeature.primitive) && ArkWeb.defined(pickedFeature.id)) {
            option.id = pickedFeature.id;
            if (pickedFeature.property) {
              option.property = pickedFeature.property;
            } else if (pickedFeature.primitive.property) {
              option.property = pickedFeature.primitive.property;
            }
        }
        if (typeof this.currentOptions.onAfter === 'function') {
          if (this.isPick) {
            option.aftPostion = this.transCartographic;
            option.prePostion = this.currentCartographic;
          }
          this.currentCallbackFunction = this.currentOptions.onAfter;
          this.currentCallbackFunction( option );
          this.currentCartographic = [];
          this.transCartographic = [];
        }
        // console.log(picksObj);
      }
  }
  private rightClick(movement): void {
    if (this.currentDrawType === 0 ) {
      return;
    }

    if (!this.activeToolManager ) {
      if ( this.currentDrawType < 0) {
        if ( !this.isPick) {
          this.isPick = false;
          const pickedFeature = this.core.viewer.scene.pick(movement.position);
          if (ArkWeb.defined(pickedFeature)) {
            this.pickObj = pickedFeature;
            this.isPick = true;
            const windowpos = movement.position;
            this.pickPreMovemnetPos = new  ArkWeb.Cartesian2(windowpos.x  , windowpos.y );
            const pickRay2 = this.core.viewer.scene.camera.getPickRay(movement.position);
            const cartesian2 = this.core.viewer.scene.globe.pick(pickRay2, this.core.viewer.scene);
            if (this.currentActivePolylinepointsList.length > 1) {
              this.currentActivePolylinepointsList.pop();
            }
            this.currentActivePolylinepointsList.push(cartesian2);
            }
          } else {
            const pickedFeature = this.pickObj;
            if (this.currentActivePolylinepointsList.length > 1) {
              this.transCartographic = [];
              this.currentCartographic = [];
              this.transPickObject(pickedFeature, this.pickPreMovemnetPos, movement.position);
              this.currentActivePolylinepointsList = [];
              this.pickPreMovemnetPos.postion = null;
            }
            this.isPick = false;
          }
        }
      return;
      }
    if (!this.activeToolManager ) {
      return;
    }
    const enti = this.activeToolManager.rightClickCallback(movement, this.currentOptions);

    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    if (cartesian) {
      const cartographic = ArkWeb.Cartographic.fromCartesian(cartesian);
      cartographic.latitude = cartographic.latitude * 180 / Math.PI;
      cartographic.longitude = cartographic.longitude * 180 / Math.PI;
      this.currentCartographic.push(cartographic);
    }

    if (enti) {
      // this.activeToolManager = null;
      // this.currentDrawType = -1;
      // return; // temp
      if (typeof this.currentOptions.onAfter === 'function') {

        if (this.currentDrawType > 1 ) {
            this.currentDrawType = 0;

            this.activeToolManager = null;
            this.currentCallbackFunction = this.currentOptions.onAfter;
            this.currentCallbackFunction(this.currentCartographic, enti.id, this.currentOptions );
            this.currentCartographic = [];
            this.transCartographic = [];
        }
      }
    } else {
      this.currentCartographic = [];
      this.transCartographic = [];
      this.currentDrawType = 0;
      this.activeToolManager = null;
    }
  }

  private  mouseMove(movement): void {
    if (this.currentDrawType === 0 ) {
      return;
    }
    if (!this.activeToolManager ) {
      if ( this.currentDrawType < 0 && this.isPick) {
        this.pickAftMovemnet = movement;
        const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
        const cartesian2 = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
        if (this.currentActivePolylinepointsList.length > 1) {
          this.currentActivePolylinepointsList.pop();
        }
        this.currentActivePolylinepointsList.push(cartesian2);
      }
    }
    if (!this.activeToolManager ) {
      return;
    }
    this.activeToolManager.mouseMoveCallbcak(movement, this.currentOptions);
  }

  private transPickObject(pickedFeature, prePos, aftPos) {

    const detaX = aftPos.x - prePos.x;
    const detaY = aftPos.y - prePos.y;
    if (Math.abs(detaX) < 1  || Math.abs( detaX) < 1) {
      return;
    }

    if (ArkWeb.defined(pickedFeature.id._position))  {
      const pos = pickedFeature.id._position.getValue();
      const pickRayAft = this.core.viewer.scene.camera.getPickRay(aftPos);
      const cartesianAft = this.core.viewer.scene.globe.pick(pickRayAft, this.core.viewer.scene);
      const pickRayPre = this.core.viewer.scene.camera.getPickRay(prePos);
      const cartesianPre = this.core.viewer.scene.globe.pick(pickRayPre, this.core.viewer.scene);
      // tslint:disable-next-line:max-line-length
      if (Math.abs(aftPos.x -  prePos.x) > 1  || Math.abs( this.prePos.y) > 1) {
        pickedFeature.id._position.setValue(cartesianAft);

        const precartographic = ArkWeb.Cartographic.fromCartesian(cartesianPre);
        precartographic.latitude = precartographic.latitude * 180 / Math.PI;
        precartographic.longitude = precartographic.longitude * 180 / Math.PI;
        this.currentCartographic.push(precartographic);

        const cartographic = ArkWeb.Cartographic.fromCartesian(cartesianAft);
        cartographic.latitude = cartographic.latitude * 180 / Math.PI;
        cartographic.longitude = cartographic.longitude * 180 / Math.PI;
        this.transCartographic.push(cartographic);
      }

    } else if (ArkWeb.defined(pickedFeature.id._polygon) && ArkWeb.defined(pickedFeature.id._polygon.hierarchy))  {
      console.log(pickedFeature.id.polygon.hierarchy );
      const posList = pickedFeature.id.polygon.hierarchy.getValue();

      const transPosList = [];
      posList.forEach(car => {
        const cartesian = this.transPoint(car, detaX, detaY);
        transPosList.push(cartesian);

        const precartographic = ArkWeb.Cartographic.fromCartesian(car);
        precartographic.latitude = precartographic.latitude * 180 / Math.PI;
        precartographic.longitude = precartographic.longitude * 180 / Math.PI;
        this.currentCartographic.push(precartographic);

        const cartographic = ArkWeb.Cartographic.fromCartesian(cartesian);
        cartographic.latitude = cartographic.latitude * 180 / Math.PI;
        cartographic.longitude = cartographic.longitude * 180 / Math.PI;
        this.transCartographic.push(cartographic);
      });
      pickedFeature.id.polygon.hierarchy.setValue(transPosList);
    } else if (ArkWeb.defined(pickedFeature.id._polyline) && ArkWeb.defined(pickedFeature.id._polyline._positions)) {
      console.log(pickedFeature.id._polyline._postions );
      const posList = pickedFeature.id._polyline._positions.getValue();
      const transPosList = [];
      posList.forEach(car => {
        const cartesian = this.transPoint(car, detaX, detaY);
        transPosList.push(cartesian);

        const cartographic = ArkWeb.Cartographic.fromCartesian(cartesian);
        cartographic.latitude = cartographic.latitude * 180 / Math.PI;
        cartographic.longitude = cartographic.longitude * 180 / Math.PI;
        this.transCartographic.push(cartographic);

        const precartographic = ArkWeb.Cartographic.fromCartesian(car);
        precartographic.latitude = precartographic.latitude * 180 / Math.PI;
        precartographic.longitude = precartographic.longitude * 180 / Math.PI;
        this.currentCartographic.push(precartographic);
      });
      this.callbackPick(pickedFeature);
      // pickedFeature.id._polyline._positions.setValue(transPosList);
    } else {
              const pickRayAft = this.core.viewer.scene.camera.getPickRay(aftPos);
              const cartesianAft = this.core.viewer.scene.globe.pick(pickRayAft, this.core.viewer.scene);
              // const cartesianPre = pos;
              const pickRayPre = this.core.viewer.scene.camera.getPickRay(prePos);
              let cartesianPre = this.core.viewer.scene.globe.pick(pickRayPre, this.core.viewer.scene);

              if (!ArkWeb.defined(cartesianPre)) {
                cartesianPre = this.core.viewer.camera.pickEllipsoid(pickRayPre, this.core.viewer.scene.globe.ellipsoid);
              }
              const precartographic = ArkWeb.Cartographic.fromCartesian(cartesianPre);
              precartographic.latitude = precartographic.latitude * 180 / Math.PI;
              precartographic.longitude = precartographic.longitude * 180 / Math.PI;
              this.currentCartographic.push(precartographic);

              const cartographic = ArkWeb.Cartographic.fromCartesian(cartesianAft);
              cartographic.latitude = cartographic.latitude * 180 / Math.PI;
              cartographic.longitude = cartographic.longitude * 180 / Math.PI;
              this.transCartographic.push(cartographic);
              this.callbackPick(pickedFeature);
    }
  }

  private transPoint(precartesian, detaX, detaY ) {
    const  windowpos = ArkWeb.SceneTransforms.wgs84ToWindowCoordinates(this.core.viewer.scene, precartesian);
    // var pick1= new Cesium.Cartesian2(0,0);
    const aftWindowPos = new ArkWeb.Cartesian2(windowpos.x + detaX , windowpos.y + detaY );
    const pickRay = this.core.viewer.scene.camera.getPickRay(aftWindowPos);
    const cartesianAft = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);

    if (!ArkWeb.defined(cartesianAft)) {
      const  cartesian = this.core.viewer.camera.pickEllipsoid(pickRay, this.core.viewer.scene.globe.ellipsoid);
      if (!ArkWeb.defined(cartesian)) {
        return cartesian;
      }
    }
    // var aftcartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick1),viewer.scene);
    return cartesianAft;

  }
}
