import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';
// import { polygon } from '@turf/turf';


@Injectable({
  providedIn: 'root'
})

export  class DrawWaterService {
  constructor(
      public core: CoreService
      // private tbasicTool: BasicToolService,
    //   protected gasProjectionTool: GasProjectionToolService,
    //   protected coordinateCoutTool: CoordinateCoutToolService
      ) {
  }

  private currentPoint;
  public riverPrimitiverSate = false;
  private waterPrimitive;
  private waterPrimitiveList = [];
  private defaultOption = {
    fillColor: ArkWeb.Color.CYAN.withAlpha(0.6)
  };
  public polygonMap = new Map();
  public urlMap = new Map();
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

  }

/**
 * 在场景中添加水面矢量
 * @param polygonGeometryInstance GeometryInstance格式多边形
 */
addWaterPrimitive(polygonGeometryInstance, pId, property ?) {
  // const viewer = this.core.viewer;
  const waterPrimitiveArray = [];
  this.waterPrimitive = new ArkWeb.Primitive({
    // allowPicking: false,
    geometryInstances : new ArkWeb.GeometryInstance({
        geometry :  polygonGeometryInstance
    }),
    appearance : new ArkWeb.EllipsoidSurfaceAppearance({
        material : new ArkWeb.Material({
            fabric : {
                type : 'Water',
                uniforms : {
                    baseWaterColor: new ArkWeb.Color(0.2, 0.4, 1.0, 0.5),
                    normalMap: `/assets/themes/default/images/Textures/water/waterNormals.jpg`,
                    frequency: 20000.0,
                    animationSpeed: 0.02,
                    amplitude: 10.0
                }
            }
        }) ,
        // tslint:disable-next-line:max-line-length
        fragmentShaderSource: `varying vec3 v_positionMC;\nvarying vec3 v_positionEC;\nvarying vec2 v_st;\nvoid main()\n{\nczm_materialInput materialInput;\nvec3 normalEC = normalize(czm_normal3D * czm_geodeticSurfaceNormal(v_positionMC, vec3(0.0), vec3(1.0)));\n#ifdef FACE_FORWARD\nnormalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);\n#endif\nmaterialInput.s = v_st.s;\nmaterialInput.st = v_st;\nmaterialInput.str = vec3(v_st, 0.0);\nmaterialInput.normalEC = normalEC;\nmaterialInput.tangentToEyeMatrix = czm_eastNorthUpToEyeCoordinates(v_positionMC, materialInput.normalEC);\nvec3 positionToEyeEC = -v_positionEC;\nmaterialInput.positionToEyeEC = positionToEyeEC;\nczm_material material = czm_getMaterial(materialInput);\n#ifdef FLAT\ngl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n#else\ngl_FragColor = czm_phong(normalize(positionToEyeEC), material);\
        gl_FragColor.a=0.8;\n#endif\n}\n`// 重写shader，修改水面的透明度
        })
    });
  this.waterPrimitive.properties = property ;
  const wa = this.core.viewer.scene.primitives.add(this.waterPrimitive);
  waterPrimitiveArray.push(wa);
  // waterPrimitiveArray.push(this.waterPrimitive);
  // console.log('waterprimitive', wa);
  this.riverPrimitiverSate = true;
  this.waterPrimitiveList.push(waterPrimitiveArray);
  this.polygonMap.set(pId, this.waterPrimitiveList);
  return waterPrimitiveArray;
}

/**
 * 数据初始化
 * @param geoSrc 多边形geojson数据路径
 */
addWaterGeojson(geoSrc, param, isfly = false) {
  this.waterPrimitiveList = [];
  const data = geoSrc;
  const promise = data;
  let idNo = this.polygonMap.size;
  const  currentHeight = ArkWeb.defaultValue(param.height, 200);
  let firstCurrentPoint = null;

  let pId = ArkWeb.defaultValue(param.nId , 'water' + idNo);
  // if (ArkWeb.defined(this.billMap.get(pId))) {
  if (!ArkWeb.defined(param.nId)) {
    while (ArkWeb.defined(this.polygonMap.get(pId)) ) {
      idNo++;
      pId = ArkWeb.defaultValue(param.nId , 'water' + idNo);
      if (!ArkWeb.defined(this.polygonMap.get(pId))) {
        break;
      }
    }
  } else {
    pId = 'water' + pId;
  }
  this.polygonMap.set(pId, null);
  // tslint:disable-next-line:prefer-const
  let polygonPosArray = [];
  if (typeof data === 'string' ) {
      const dataStr = ArkWeb.Resource.createIfNeeded(data);
      // let promise = dataStr.fetchJson().then(function(jsonData) {
      dataStr.fetchJson().then((jsonData) => {
        // console.log(`set`);
        let posArray;
        if (jsonData.type === `FeatureCollection`) {
          const pLength = jsonData.features.length;
          jsonData.features.forEach(element => {
            let i = 0 ;
            const geometryType = element.geometry.type;
            if (geometryType === 'MultiPolygon' ) {
              posArray = element.geometry.coordinates;
              posArray.forEach(PolygonList => {
                const polygonPosArray2 = [] ;
                const PointList = PolygonList[0];
                PointList.forEach(Points => {
                  Points.forEach(xy => {
                    polygonPosArray2.push(xy);
                  });
                });
                // console.log ('polygonPosArray', polygonPosArray2);
                const polygonGeometryInstance =  new ArkWeb.PolygonGeometry({
                    polygonHierarchy : {
                      positions : ArkWeb.Cartesian3.fromDegreesArray(polygonPosArray2)
                    },
                    height : currentHeight
                });
                polygonGeometryInstance.id = i++;
                this.addWaterPrimitive(polygonGeometryInstance, pId, element.properties);
              });
            } else if (geometryType === 'Polygon') {
              posArray = element.geometry.coordinates;
              const polygonPosArray2 = [] ;
              posArray.forEach(PolygonList => {
                let PointList = PolygonList[0];
                if (PolygonList[0].length === 2) {
                  PointList = PolygonList;
                }
                PointList.forEach(Points => {
                  if (!ArkWeb.defined(firstCurrentPoint)) {
                    firstCurrentPoint = Points;
                    
                    if (isfly) {
                      this.core.viewer.camera.flyTo({
                        destination: ArkWeb.Cartesian3.fromDegrees(firstCurrentPoint[0], firstCurrentPoint[1], 100000)
                      });
                    }
                  }
                  Points.forEach(xy => {
                    polygonPosArray2.push(xy);
                  });
                });
                // console.log ('polygonPosArray', polygonPosArray2);
              });
              const polygonGeometryInstance =  new ArkWeb.PolygonGeometry({
                  polygonHierarchy : {
                    positions : ArkWeb.Cartesian3.fromDegreesArray(polygonPosArray2)
                  },
                  height : currentHeight
              });
              polygonGeometryInstance.id = i++;
              const water = this.addWaterPrimitive(polygonGeometryInstance, pId, element.properties);
              // this.polygonMap.set(pId, water);
              this.urlMap.set(pId, param);
              // this.addWaterPrimitive(polygonGeometryInstance,  element.properties);
            }
            // tslint:disable-next-line:prefer-const

          });
        } else if ( jsonData.type === `GeometryCollection`) {
          let i = 0 ;
          jsonData.geometries.forEach((geometries: any) => {
            posArray = geometries.coordinates[0];
            const pLength = posArray.length;
            const polygonPosArray2 = [];
            posArray.forEach((PointList, index) => {
              PointList.forEach(Point => {
                polygonPosArray2.push(Point);
              });
              // polygonPosArray2.push(1000);
            });
            // console.log('let polygonPosArray2', polygonPosArray2 );
            const polygonGeometryInstance =  new ArkWeb.PolygonGeometry({
                polygonHierarchy : {
                  positions : ArkWeb.Cartesian3.fromDegreesArray(polygonPosArray2)
                  // positions : ArkWeb.Cartesian3.fromDegreesArrayHeights(polygonPosArray2)
                },
                height : currentHeight
            });
            polygonGeometryInstance.id = i++;
            const water = this.addWaterPrimitive(polygonGeometryInstance, pId);
            this.waterPrimitiveList.push(water);
            this.polygonMap.set(pId, this.waterPrimitiveList);
            this.urlMap.set(pId, param);

          });
          // alert('ss');
        }
      });
  }
  return pId;
} // water


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

  getWaterPolygon(id) {
    const polygonc = this.polygonMap.get(id) ;
    let primitive = null;
    if (polygonc) {
      if (id.indexOf('water') !== -1 || id.indexOf('FFF') !== -1) {
        polygonc.forEach(waterPrimitivelist => {
          waterPrimitivelist.forEach(waterPrimitive => {
          // console.log(waterPrimitive);
          primitive = waterPrimitive;
          // this.core.viewer.scene.primitives.remove(waterPrimitive);
          });
        });
      }
    }
    return primitive;
  }
  removePolygon(id) {
    const polygonc = this.polygonMap.get(id) ;
    if (polygonc) {
      if (id.indexOf('pd') !== -1) {
        this.core.viewer.dataSources.remove(polygonc);
      } else if (id.indexOf('water') !== -1 || id.indexOf('FF') !== -1) {
        polygonc.forEach(waterPrimitivelist => {
          waterPrimitivelist.forEach(waterPrimitive => {
          // console.log(waterPrimitive);
          this.core.viewer.scene.primitives.remove(waterPrimitive);
          });
        });
        this.polygonMap.delete(id);
      } else {
        this.polygonMap.delete(id);
        this.core.viewer.entities.remove(polygonc);
      }
    }
  }

  removeAll() {
    this.polygonMap.forEach(polygon2 => {
      this.core.viewer.entities.remove(polygon2);
    });
    // this.polygonMap.delete(id);
    this.polygonMap.clear();
  }
  removeCurrentPrimitives() {
    this.waterPrimitiveList.forEach( waterlist => {
      waterlist.forEach(waterPrimitive => {
      console.log('removeCurrentPrimitives', waterPrimitive);
      this.core.viewer.scene.primitives.remove(waterPrimitive);
      });
    });
    // console.log(this.waterPrimitiveList, typeof this.waterPrimitiveList );

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
