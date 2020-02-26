import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';


@Injectable({
  providedIn: 'root'
})

export  class DrawCylinderService {
    [x: string]: any;
  constructor(
      public core: CoreService
      // private tbasicTool: BasicToolService,
    //   protected gasProjectionTool: GasProjectionToolService,
    //   protected coordinateCoutTool: CoordinateCoutToolService
      ) {
  }

  private defaultOption = {
    fillColor: ArkWeb.Color.CYAN.withAlpha(0.6),
    clength: 300,
    topRadius: 200,
    bottomRadius: 200
  };
  private cylinderMap = new Map();
  private currentCylinder;
  private currentActiveCylinderpointsList = [];
  private currentcylinderpointsList = [];
  private twickeMap = new Map();

  public newCylinderJson(geojsonObj, param?): any {

    if (geojsonObj.geometry.type === 'Cylinder') {
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
      const curcylinder = new ArkWeb.CylinderGraphics();
      curcylinder.hierarchy = new ArkWeb.ConstantProperty(new ArkWeb.CylinderHierarchy(posArray));
      // console.log(curcylinder.hierarchy);
      const entity = new ArkWeb.Entity({
        show: true,
        cylinder: curcylinder
      });
      if (param.heightToGround) {
        // const newCartographic = new ArkWeb.Cartographic(coorArray[0][0][0], coorArray[0][0][1], 0);
        // const height = this.core.viewer.scene.globe.getHeight(newCartographic) + 5;
        curcylinder.perPositionHeight = new ArkWeb.ConstantProperty(true);
      }
      curcylinder.material = colormaterial;
      return entity;
    }
    return null;
    // const curcylinder = new ArkWeb.CylinderGraphics();
    // curcylinder.hierarchy = new ArkWeb.ConstantProperty(new ArkWeb.CylinderHierarchy());

        // ArkWeb.Cartesian3.fromRadiansArray([
      //     -1, -1,
      //     1, -1,
      //     1, 1,
      //     -1, 1
      // ])

  }

  addCylinder(cPos,  posType = 'cartesian', param?) {

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
        const cartesian = ArkWeb.Cartesian3.fromDegrees(cPos[0], cPos[1], ArkWeb.defaultValue(cPos[2], 160));
        pos = cartesian;

    }
    // 红色椭圆形，位于地表，带轮廓
    let fillColor =  this.defaultOption.fillColor ;
    let idNo = this.cylinderMap.size;
    let cyId =  'cy' + idNo ;
    if (param) {
      fillColor = ArkWeb.defaultValue(param.fillColor, this.defaultOption.fillColor);
      cyId = ArkWeb.defaultValue(param.nId , 'cy' + idNo);
    }

    if ( ArkWeb.defined(this.cylinderMap.get(cyId))) {
    while ( ArkWeb.defined(this.cylinderMap.get(cyId))) {
      idNo++;
      cyId = ArkWeb.defaultValue(param.nId , 'cy' + idNo);
      if (!ArkWeb.defined(this.cylinderMap.get(cyId))) {
        break;
      }
    }}

    const clength =  ArkWeb.defaultValue( param.clength , this.defaultOption.clength );
    const ctopRadius = ArkWeb.defaultValue( param.topRadius , this.defaultOption.topRadius );
    const cbottomRadius = ArkWeb.defaultValue( param.bottomRadius , this.defaultOption.bottomRadius );


    // const addCylinder = this.core.viewer.entities.add({
    //   cylinder : {
    //       hierarchy: postion,
    //       material: new ArkWeb.ColorMaterialProperty(fillColor)
    //   },
    //   id: pId
    // });

    const addCylinder = this.core.viewer.entities.add({
        name : 'Green cylinder with black outline',
        position: pos,
        cylinder : {
            length : clength,
            topRadius : ctopRadius,
            bottomRadius : cbottomRadius,
            material : fillColor
            // outline : true,
            // outlineColor : fillColor
        },
        id: cyId
    });
    this.cylinderMap.set(cyId, addCylinder);
    return addCylinder ;
  // this.basicTool.measureCylinderCollection.push(addCylinder);
  }


  addTwickleCylinder(cPos,  posType = 'cartesian', param?) {

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
        const cartesian = ArkWeb.Cartesian3.fromDegrees(cPos[0], cPos[1], ArkWeb.defaultValue(cPos[2], 300));
        pos = cartesian;

    }
    // 红色椭圆形，位于地表，带轮廓
    let fillColor =  this.defaultOption.fillColor ;
    let idNo = this.cylinderMap.size;
    let cyId =  'cy' + idNo ;
    if (param) {
      fillColor = ArkWeb.defaultValue(param.fillColor, this.defaultOption.fillColor);
      cyId = ArkWeb.defaultValue(param.nId , 'cy' + idNo);
    }

    if ( ArkWeb.defined(this.cylinderMap.get(cyId))) {
    while ( ArkWeb.defined(this.cylinderMap.get(cyId))) {
      idNo++;
      cyId = ArkWeb.defaultValue(param.nId , 'cy' + idNo);
      if (!ArkWeb.defined(this.cylinderMap.get(cyId))) {
        break;
      }
    }}

    const clength =  ArkWeb.defaultValue( param.clength , this.defaultOption.clength );
    const ctopRadius = ArkWeb.defaultValue( param.topRadius , this.defaultOption.topRadius );
    const cbottomRadius = ArkWeb.defaultValue( param.bottomRadius , this.defaultOption.bottomRadius );


    // const addCylinder = this.core.viewer.entities.add({
    //   cylinder : {
    //       hierarchy: postion,
    //       material: new ArkWeb.ColorMaterialProperty(fillColor)
    //   },
    //   id: pId
    // });
    let i = 0;
    const addCylinder = this.core.viewer.entities.add({
        position: pos,
        cylinder : {
            length : clength,
            topRadius : ctopRadius,
            bottomRadius : cbottomRadius,
            material :  new ArkWeb.CallbackProperty(() => {
              // console.log('call', time, result);
              i = ++i % 300;
              let co = fillColor;
              if ( i / 100 > 1) {
                co = ArkWeb.Color.RED;
              }
              return co;
            }),
            // outline : true,
            // outlineColor : fillColor
        },
        id: cyId
    });
    this.cylinderMap.set(cyId, addCylinder);
    return addCylinder ;
  // this.basicTool.measureCylinderCollection.push(addCylinder);
  }
  removeCylinder(id) {
    const cylinderc = this.cylinderMap.get(id) ;
    if (cylinderc) {
      this.cylinderMap.delete(id);
      this.core.viewer.entities.remove(cylinderc);
    }
  }

  setTwinkle(id, isEnable = false) {
    const cylinderc = this.cylinderMap.get(id) ;
    // if (cylinderc) {
    //   if (isEnable) {
    //     let i = 0;
    //     const fillColor = cylinderc.cylinder.material;
    //     cylinderc.cylinder.material = new ArkWeb.CallbackProperty(() => {
    //       // console.log('call', time, result);
    //       i = ++i % 300;
    //       let co = fillColor;
    //       if ( i / 100 > 1.5) {
    //         co = ArkWeb.Color.RED;
    //       }
    //       return co;
    //     });
    //     this.twickeMap.set(id, fillColor);
    //   }   else {
    //     const colo = this.twickeMap.get(id);
    //     cylinderc.cylinder.material = colo;
    //     this.twickeMap.delete(id);
    //   }
    // }

  }
  setColor(id, isEnable = false) {
    this.rebackAllColor();
    const cylinderc = this.cylinderMap.get(id) ;
    if (cylinderc) {
      if (isEnable) {
        // let i = 0;
        const fillColor = cylinderc.cylinder.material;
        cylinderc.cylinder.material = ArkWeb.Color.RED;
        // cylinderc.cylinder.material = new ArkWeb.CallbackProperty(() => {
        //   // console.log('call', time, result);
        //   i = ++i % 300;
        //   let co = fillColor;
        //   if ( i / 100 > 1.5) {
        //     co = ArkWeb.Color.RED;
        //   }
        //   return co;
        // });
        this.twickeMap.set(id, fillColor);
      }   else {
        const colo = this.twickeMap.get(id);
        cylinderc.cylinder.material = colo;
        this.twickeMap.delete(id);
      }
    }

  }
  rebackAllColor() {
    this.twickeMap.forEach((cyl, id) => {
      
      const cylinderc = this.cylinderMap.get(id) ;
      if (cylinderc) {
        // this.core.viewer.entities.remove(cyl);
        cylinderc.cylinder.material = cyl;
        this.twickeMap.delete(id);
      }
    });
  }

  removeAll() {
    this.cylinderMap.forEach(cylinder2 => {
      this.core.viewer.entities.remove(cylinder2);
    });
    this.cylinderMap.clear();
  }
  activeTool(param?): void {
    if (!ArkWeb.defined(this.currentCylinder)) {
      this.currentCylinder = this.core.viewer.entities.add({
          cylinder : {
              hierarchy: new ArkWeb.CallbackProperty(() => {
                  return this.currentActiveCylinderpointsList;
              }, false),
              material: new ArkWeb.ColorMaterialProperty(this.defaultOption.fillColor),
          }
      });
    }
    if (param && param.fillColor) {
      this.defaultOption.fillColor = param.fillColor;
      if (ArkWeb.defined(this.currentCylinder)) {
        this.currentCylinder.cylinder.material = new ArkWeb.ColorMaterialProperty(this.defaultOption.fillColor);
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
              this.currentcylinderpointsList.push(cartesian);
          }
          this.currentActiveCylinderpointsList = [].concat(this.currentcylinderpointsList);
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
          if (this.currentcylinderpointsList.length > 1 ) {
            if ( ArkWeb.defined(cartesian)) {
                this.currentcylinderpointsList.push(cartesian);
            }
            this.currentActiveCylinderpointsList = [].concat(this.currentcylinderpointsList);
          }
          const pos = [].concat(this.currentActiveCylinderpointsList);
          if (this.currentcylinderpointsList.length > 2) {
              const current  = this.addCylinder(this.currentActiveCylinderpointsList, 'cartesian', param );
              this.currentcylinderpointsList = []; // 清空点
              this.currentActiveCylinderpointsList = []; // 清空点
              return current;
          }
      }
  }

  mouseMoveCallbcak(movement, param ): void {
    if (this.currentcylinderpointsList.length < 2) {
      return;
    }
    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    this.currentActiveCylinderpointsList = [].concat(this.currentcylinderpointsList);
    if ( ArkWeb.defined(cartesian)) {
      this.currentActiveCylinderpointsList .push(cartesian);
      this.currentPoint = cartesian;
    }
  }

}
