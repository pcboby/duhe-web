import { Injectable, OnInit } from '@angular/core';
import { CoreService } from '../core.service';
// import { InformboxService } from './informbox.service';


@Injectable({
  providedIn: 'root'
})
export class QueryToolService implements OnInit {
  constructor(
    private core: CoreService,
    // private informbox: InformboxService
    ) {}

  // tslint:disable-next-line:variable-name
  private _toolMode = 0;
  public get toolMode() {
    return this._toolMode;
  }
  public set toolMode(value) {
    this._toolMode = value;
  }
  private eventHandler = null;
  private pinBuilderEntity = null ;
  private propertEntity = null;
  private clickProperty = null ;
  private currentClickEntity = null;
  private orignalColor = null;
  private orignalSize = null;
  private labelPoint ;

  private clickCallbackFuction = null;

  ngOnInit() {
    this.eventHandler = new ArkWeb.ScreenSpaceEventHandler(this.core.viewer.scene.canvas);
    alert('inter');
  }

  /**
   * 激活点击事件
   * @param mode = 0 表示点击事件置空， = 1表示属性查询
   */
  private activeToolMode(mode = 0): void {
    if (this.eventHandler === null) {
      this.eventHandler = new ArkWeb.ScreenSpaceEventHandler(this.core.viewer.scene.canvas);
      this.setTooltip();
    }
    let eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
    if (eve) {
      this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
    }

    eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_UP);
    if (eve) {
      this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.LEFT_UP);
    }

    eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_DOWN);
    if (eve) {
      this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.LEFT_DOWN);
    }
    this.toolMode = mode;
  }

  clearClickTool() {
    this.activeToolMode();
  }
  /**
   * 属性点击查询
   */
  AttributeTool() {
    this.activeToolMode(1);
    this.eventHandler.setInputAction((evt) => {
      this.leftclick(evt);
    }, ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * 点击查询propertyName的属性值
   * @param propertyName 查询点击目标的propertyName的值
   */
  ShowAttributeTool(propertyName , callFunction ?) {
    this.activeToolMode(3);
    this.clickProperty = propertyName ;
    if (callFunction) {
        // alert('ss');
        this.clickCallbackFuction = callFunction;
    }
    this.eventHandler.setInputAction((evt) => {
      this.leftclick(evt);
    }, ArkWeb.ScreenSpaceEventType.LEFT_CLICK);

  }

  addCilckCallbackFuction(propertyName: string,  fun: any,  propertyName2 ?): void {
    this.activeToolMode();
    this.eventHandler.setInputAction((evt) => {
      if (fun) {
        this.addCilckCallback(evt, propertyName, fun ,  propertyName2 );
      }
    }, ArkWeb.ScreenSpaceEventType.LEFT_CLICK);

  }

  SetCilckCallbackFuction(propertyName: string,  fun?: any ): void {
    this.activeToolMode();
    this.eventHandler.setInputAction((evt) => {
      if (fun) {
        this.getCilckCallbackMessage(evt, propertyName, fun);
      }
    }, ArkWeb.ScreenSpaceEventType.LEFT_CLICK);

  }

  leftclick(movement) {
    // console.log(this);
    if (this.toolMode === 0) {
      // this.leftclick_0(movement);
      return;
    }
    // const pinBuilder = new ArkWeb.PinBuilder();
    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);

    // if ( this.pinBuilderEntity === null) {
    //   this.pinBuilderEntity = this.core.viewer.entities.add({
    //     position: cartesian,
    //     billboard: {
    //       // show: false,
    //       image: '/assets/themes/default/images/billboardIcons/locate.png',
    //       // image: pinBuilder.fromText(infString, ArkWeb.Color.PINK, 58).toDataURL(),
    //       scale: 1.0,
    //       eyeOffset: new ArkWeb.Cartesian3(0.0, 0.0, 0.0),
    //       horizontalOrigin: ArkWeb.HorizontalOrigin.CENTER,
    //       verticalOrigin: ArkWeb.VerticalOrigin.BOTTOM,
    //       scaleByDistance: new ArkWeb.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.1),
    //       heightReference : ArkWeb.HeightReference.CLAMP_TO_GROUND
    //     },
    //     label : {
    //       text : '',
    //       font : '20px sans-serif',
    //       showBackground : true,
    //       heightReference : ArkWeb.HeightReference.CLAMP_TO_GROUND,
    //       fillColor : ArkWeb.Color.RED,
    //       horizontalOrigin : ArkWeb.HorizontalOrigin.LEFT,
    //       pixelOffset : new ArkWeb.Cartesian2(0.0, 2.0),
    //       pixelOffsetScaleByDistance : new ArkWeb.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
    //       disableDepthTestDistance : Number.POSITIVE_INFINITY // draws the label in front of terrain
    //     }
    //   }); //
    // } else {
    //   this.pinBuilderEntity.show = false;
    // }

    if (this.toolMode === 2) {
      const pickedObjects = this.core.viewer.scene.drillPick(movement.position);
      if (pickedObjects.length > 0) {
        const pickedFeature = this.core.viewer.scene.pick(movement.position);
        if (this.core.viewer.scene.mode === 1) {
          const picksObj = ArkWeb.defaultValue(pickedFeature.id, pickedFeature.primitive.id);
          picksObj.forEach(proname => {
            const attrubteStr = picksObj.properties[proname].getValue();
            // console.log(attrubteStr);
          });
        } else {
          // console.log('pickedFeature', pickedFeature);
          if (ArkWeb.defined(pickedFeature.id)) {
            const featureName = pickedFeature.id.properties._GDNM._value;
            this.pinBuilderEntity.position = cartesian ;
            this.pinBuilderEntity.show = true;

          }
        }
      } else {
        this.pinBuilderEntity.show = false;
      }
    } else if (this.toolMode === 1 ) {
      const pickedObjects = this.core.viewer.scene.drillPick(movement.position);
      if (pickedObjects.length > 0) {
        const pickedFeature = this.core.viewer.scene.pick(movement.position);
        if (!ArkWeb.defined(pickedFeature)) {
        //   this.informbox.hide();
          return;
        }
        if (this.core.viewer.scene.mode === 1) {
          const picksObj = ArkWeb.defaultValue(pickedFeature.id, pickedFeature.primitive.id);
          picksObj.forEach(proname => {
            const attrubteStr = picksObj.properties[proname].getValue();
            // console.log(attrubteStr);
          });
        } else {
          // console.log(pickedFeature.id.properties._propertyNames[0]);
          const sName = pickedFeature.id.properties._propertyNames[1];
          let infString = '';
          // pickedFeature.id.properties._propertyNames.forEach(sName => {
          const ss =  pickedFeature.id.properties[sName];
          infString = `` + sName + `: ` + ss;
          // });
          // this.informbox.show({
          //   textContent: infString,
          //   x: movement.position.x,
          //   y: this.core.viewer.canvas.clientHeight - movement.position.y
          // });
          this.pinBuilderEntity.position = cartesian ;
          this.pinBuilderEntity.show = true;
          // console.log(this.pinBuilderEntity._label._text._value) ;
          this.pinBuilderEntity._label._text._value = infString ;
        }
      } else {// pickedObjects.length > 0
        this.pinBuilderEntity.show = false;
        // this.informbox.hide();
      }
  } else if (this.toolMode === 3) {
    this.showSpacialProperty (movement) ;
  }
  }// leftclick

  private addCilckCallback(movement, propertyName: string, fun,  propertyName2 ?  ): void {
    if (typeof fun === 'function') {
      const pickedFeature = this.core.viewer.scene.pick(movement.position);
      if (ArkWeb.defined(pickedFeature)) {
        if (ArkWeb.defined(pickedFeature.id)) {
          const idNew = pickedFeature.id.properties[propertyName].getValue();
          if (ArkWeb.defined(idNew)) {
            if (ArkWeb.defined(propertyName2)) {
              const idNew2 = pickedFeature.id.properties[propertyName2].getValue();
              fun(idNew, idNew2, movement.position);
            } else {
              fun(idNew, movement.position);
            }
          }
        } else if (ArkWeb.defined(pickedFeature.primitive)) {
          if (ArkWeb.defined(pickedFeature.primitive[propertyName])) {
            // console.log(pickedFeature.primitive[propertyName]);
            if (ArkWeb.defined(propertyName2)) {
              const idnew = pickedFeature.primitive[propertyName2];
              fun(pickedFeature.primitive[propertyName], idnew, movement.position);
            } else {
              fun(pickedFeature.primitive[propertyName], movement.position);
            }
          }
        }
      } else {
        if (ArkWeb.defined(propertyName2)) {
          fun(null, null, movement.position);
        } else {
          fun(null, movement.position);
        }
      }
    }

  }


  private getCilckCallbackMessage(movement, propertyName , fun ): void {
    if (typeof fun === 'function') {
      const pickedFeature = this.core.viewer.scene.pick(movement.position);
      if (ArkWeb.defined(pickedFeature)) {
        if (ArkWeb.defined(pickedFeature.id)) {
          propertyName.forEach(property => {
            const idNew = pickedFeature.id[property];
            if (ArkWeb.defined(idNew)) {
              fun(idNew, movement.position, property);
            }
          });
        } else if (ArkWeb.defined(pickedFeature.primitive)) {
          propertyName.forEach(property => {
            if (ArkWeb.defined(pickedFeature.primitive[property])) {
              fun( pickedFeature.primitive[property], movement.position, property);
            }
          });
        }
      }
    }

  }
  private showSpacialProperty( movement ) {

    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    if (this.pinBuilderEntity) {
        this.pinBuilderEntity.show = false;
    }
    // console.log(this.clickProperty);
    if (this.clickProperty === null) {
      return;
    }
    const pickedObjects = this.core.viewer.scene.drillPick(movement.position);
    if (pickedObjects.length > 0) {
      // if ( this.currentClickEntity !== null && pickedObjects[0].id === this.currentClickEntity ) {
      //   return;
      // }
      // if ( this.currentClickEntity !== null && pickedObjects[0].id && pickedObjects[0].id !== this.currentClickEntity ) {
      //   if (ArkWeb.defined(pickedObjects[0].id.billboard) && this.currentClickEntity.id.billboard ) {
      //     // this.currentClickEntity.id.billboard.scale = ArkWeb.defaultValue(this.orignalSize, 1);
      //     this.currentClickEntity.id.billboard.color = ArkWeb.defaultValue( this.orignalColor, ArkWeb.Color.WHITE);
      //   } else if (ArkWeb.defined(pickedObjects[0].id.polygon)) {
      //     this.orignalColor = ArkWeb.defaultValue( this.orignalColor, pickedObjects[0].id.polygon.material.color.getValue());
      //     if (this.currentClickEntity.polygon) {
      //       this.currentClickEntity.polygon.material.color.setValue( ArkWeb.defaultValue( this.orignalColor, ArkWeb.Color.WHITE));
      //     }
      //   }
        // this.orignalSize = null ;
        // this.orignalColor = null ;
        // this.currentClickEntity = null;
      // }
      if ( this.propertEntity === null ) {
        this.propertEntity = this.core.viewer.entities.add({
          position: cartesian,
          label : {
            text : '',
            font : '20px sans-serif',
            showBackground : true,
            fillColor : ArkWeb.Color.WHITE,
            horizontalOrigin : ArkWeb.HorizontalOrigin.LEFT,
            pixelOffset : new ArkWeb.Cartesian2(0.0, 2.0),
            pixelOffsetScaleByDistance : new ArkWeb.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5)
          }
        });
      }

      this.currentClickEntity = pickedObjects[0].id ;
      if (!ArkWeb.defined(this.currentClickEntity)) {
        this.currentClickEntity = pickedObjects[0].primitive;
      }
      let propertText = '';
      if (this.clickProperty === 'All' || this.clickProperty === 'all' || this.clickProperty === 'ALL' ) {
        // console.log('All', this.currentClickEntity);
        if (this.clickCallbackFuction && typeof this.clickCallbackFuction === 'function') {
            this.clickCallbackFuction(this.currentClickEntity);
        }
        return;
      } else  {
        const ln = this.clickProperty.length;
        if (ln > 0) {
          this.clickProperty.forEach(property => {
              if ( ArkWeb.defined(this.currentClickEntity[property])) {
                propertText += ` ` + property + `:`;
                propertText +=  this.currentClickEntity[property];
            }
          });
        }
      }
      // console.log('pickedObject.id', pickedObjects[0].id);
      if (ArkWeb.defined(pickedObjects[0].id.billboard)) {
        this.orignalColor = ArkWeb.defaultValue( this.orignalColor, pickedObjects[0].id.billboard.color);
        this.orignalSize =   ArkWeb.defaultValue(this.orignalSize, pickedObjects[0].id.billboard.scale);
        pickedObjects[0].id.billboard.color = ArkWeb.Color.BLUE;
        // pickedObjects[0].id.billboard.scale = this.orignalSize  * 2.0;
      } else if (ArkWeb.defined(pickedObjects[0].id.polygon)) {
        // console.log('pickedObjects[0].id.polygon', pickedObjects[0].id.polygon.material.color.getValue());
        this.orignalColor = ArkWeb.defaultValue( this.orignalColor, pickedObjects[0].id.polygon.material.color.getValue());
        pickedObjects[0].id.polygon.material.color.setValue( ArkWeb.Color.BLUE);
      }
      this.propertEntity.label.text._value = propertText ;
      this.propertEntity.position = cartesian ;
      this.propertEntity.show = true;
    } else {
      if (  this.currentClickEntity != null) {
        if (ArkWeb.defined(this.currentClickEntity.billboard)) {
          // this.currentClickEntity.billboard.scale = this.orignalSize;
          this.currentClickEntity.billboard.color = this.orignalColor;
        } else if (ArkWeb.defined(this.currentClickEntity.polygon)) {
          this.currentClickEntity.polygon.material.color.setValue( this.orignalColor );
        }
        this.propertEntity.show = false;
        this.currentClickEntity = null;
        this.orignalSize = null ;
        this.orignalColor = null ;
      }
      return ;
    }
  }

  private setTooltip() {
    // this.core.viewer.container.appendChild(this.informbox.elmtRef);
  }

}
