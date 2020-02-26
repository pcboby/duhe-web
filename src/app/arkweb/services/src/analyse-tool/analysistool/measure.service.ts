import { Injectable } from '@angular/core';
import { CoreService } from '../../core.service';
import { GasProjectionToolService } from '../mathtool/gas-projection-tool.service';
import { CoordinateCoutToolService } from '../mathtool/coordinate-cout-tool.service';



@Injectable({
  providedIn: 'root'
})

export  class MeasureService {
    [x: string]: any;
  constructor(
      public core: CoreService,
      // private tbasicTool: BasicToolService,
      protected gasProjectionTool: GasProjectionToolService,
      protected coordinateCoutTool: CoordinateCoutToolService) {
  }

  private basicTool;
  private currentPoint ;
  private currentLine;
  private currentPolygon;
  private currentLabel;
  private currentpolylinepointsList = [];
  private currentActivePolylinepointsList = [];
  private currentpolygonpointsList = [];
  private currentActivePolygonpointsList = [];
  private currentLablePointPos = new ArkWeb.Cartesian3(0.0, 0.0, 0.0);
  private currentVerticalcarternsList = [];
  private currentVerticalPolyline;
  private currentHorizontalcarternsList = [];
  private currentHorizontalPolyline;
  private currentHeight = 0;

  // activeLengthMeasureTool(): void {
  //     this.basicTool.toolMode = 1; // 距离测量
  //     if ( this.basicTool.toolName !== 'MeasureTool') {
  //         this.activeTool();
  //     } else {
  //         this.clearAreaTemp();
  //         this.clearLengthTemp();
  //     }
  // }

  // /**
  //  * 测量面积
  //  */
  // activeAreaMeasureTool(): void {
  //     this.basicTool.toolMode = 2;
  //     if ( this.basicTool.toolName !== 'MeasureTool') {
  //         this.activeTool();
  //     }  else {
  //         this.clearLengthTemp();
  //         this.clearAreaTemp();
  //     }
  // }

  // /**
  //  * 测量坐标
  //  */
  // activeCoordinateMeasureTool(): void {
  //     this.basicTool.toolMode = 3;
  //     if ( this.basicTool.toolName !== 'MeasureTool') {
  //         this.activeTool();
  //     }  else {
  //         this.clearLengthTemp();
  //         this.clearAreaTemp();
  //     }
  // }


  // activeHeightMeasureTool(): void {
  //     this.basicTool.toolMode = 4;
  //     if ( this.basicTool.toolName !== 'MeasureTool') {
  //         this.activeTool();
  //     }  else {
  //         this.clearLengthTemp();
  //         this.clearAreaTemp();
  //     }
  // }

  activeTool(toolMode, toolName, basicTool  ): void {
      this.core.viewer.scene.globe.depthTestAgainstTerrain = false;
      if (!ArkWeb.defined(this.basicTool))  {
          this.basicTool = basicTool;
      }
      if ( this.basicTool.toolName !== 'MeasureTool') {
          this.basicTool.activeBasicToolMode( toolMode , toolName);
      }  else {
          this.basicTool.activeBasicToolMode( toolMode , toolName);
          this.clearLengthTemp();
          this.clearAreaTemp();
          this.currentVerticalcarternsList = []; // 清空点
          this.currentHorizontalcarternsList = []; // 清空点
          return;
      }

      if (!ArkWeb.defined(this.currentLine)) {
          this.currentLine = this.core.viewer.entities.add({
              polyline : {
                  positions: new ArkWeb.CallbackProperty(() => {
                      return this.currentActivePolylinepointsList;
                  }),
                  width : 2,
                  followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
                  material : ArkWeb.Color.YELLOW,
                  clampToGround: true
              }
          });
      }
      if (!ArkWeb.defined(this.currentPolygon)) {
          this.currentPolygon = this.core.viewer.entities.add({
              polygon : {
                  hierarchy: new ArkWeb.CallbackProperty(() => {
                      return this.currentActivePolygonpointsList;
                  }, false),
                  material: new ArkWeb.ColorMaterialProperty(ArkWeb.Color.CYAN.withAlpha(0.6)),
              }
          });
      }

      this.currentRedPoint = this.basicTool.pointCollection.add({
        position: new ArkWeb.CallbackProperty(() => {
            return this.currentRedPointPos[0];
        }, false),
        color: ArkWeb.Color.YELLOW
      });
      if (!ArkWeb.defined(this.currentLabel)) {
          this.currentLabel = this.core.viewer.entities.add({
              position : new ArkWeb.CallbackProperty(() => {
                  return this.currentLablePointPos;
              }, false),
              label : {
                  text : '',
                  font : '18px Arial',
                  fillColor : ArkWeb.Color.YELLOW,
                  outlineColor : ArkWeb.Color.BLACK,
                  outlineWidth : 2,
                  pixelOffset : new ArkWeb.Cartesian2(2.0, 2.0),
                  // showBackground : true,
                  style : ArkWeb.LabelStyle.FILL_AND_OUTLINE,
                  clampToGround: true
              }
            });
      }

      if (!ArkWeb.defined(this.currentVerticalPolyline)) {
        this.currentVerticalPolyline = this.core.viewer.entities.add({
            polyline : {
                positions: new ArkWeb.CallbackProperty(() => {
                    return this.currentVerticalcarternsList;
                }),
                width : 3,
                // followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
                material : ArkWeb.Color.CORNFLOWERBLUE
            }
        });
      }
      if (!ArkWeb.defined(this.currentHorizontalPolyline)) {
        this.currentHorizontalPolyline = this.core.viewer.entities.add({
            polyline : {
                positions: new ArkWeb.CallbackProperty(() => {
                    return this.currentHorizontalcarternsList;
                }),
                width : 3,
                // followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
                material : ArkWeb.Color.RED // ArkWeb.Color.CORNFLOWERBLUE
            }
        });
      }
  }

  clearTool(): void {
    this.basicTool.clearBasicTool();
    this.clearLengthTemp();
    this.clearAreaTemp();
    this.core.viewer.scene.globe.depthTestAgainstTerrain = true;
  }

  clearLengthTemp(): void {
      this.currentpolylinepointsList = []; // 清空点
      this.currentActivePolylinepointsList = [];
      this.currentVerticalcarternsList = [];
      this.currentHorizontalcarternsList = [];
  }

  clearAreaTemp(): void {
      this.currentpolygonpointsList = [];
      this.currentActivePolygonpointsList = [];
  }

  leftClickCallbcak(movement) {
      if (this.basicTool.toolMode === 0) {
          return;
      }
      if (this.basicTool.toolName !== 'MeasureTool') {
          return ;
      }

      const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
      const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
      if ( ArkWeb.defined(cartesian)) {
        this.currentPoint = cartesian;
      }
      if (this.basicTool.toolMode === 1) { // 测量长度
        if ( ArkWeb.defined(cartesian)) {
            this.currentpolylinepointsList.push(cartesian);
        }
        this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
        if (this.currentActivePolylinepointsList.length > 1) {
            this.updateLengthMeasureResult(false);
        }
      } else if (this.basicTool.toolMode === 2) {
          const pickedFeature = this.core.viewer.scene.pick(movement.position);
          if ( ArkWeb.defined(cartesian)) {
              this.currentpolygonpointsList.push(cartesian);
          }
          this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);

          this.updateAreaMeasureResult(false);
      } else if (this.basicTool.toolMode === 3) {
          this.updateCoordinateResult(true);
      } else if (this.basicTool.toolMode === 4) {
          if (cartesian) {
            this.currentPoint = cartesian;
          } else {
            this.currentPoint = this.core.viewer.scene.pickPosition(movement.position);
          }

          if (this.currentpolylinepointsList.length > 0) {
              this.updateHeigthMeasureResult(true);
              this.currentHorizontalcarternsList = [];
              this.currentpolylinepointsList = [];
          } else {
            this.currentpolylinepointsList.push(this.currentPoint);
            this.currentRedPointPos = [];
            this.currentRedPointPos.push(this.currentPoint);
          }
      }
  }
  /**
   * 右键结束
   * @param movement 点击位置
   */
  rightClickCallback(movement) {
      if (this.basicTool.toolMode === 0) {
          return;
      }
      if (this.basicTool.toolName !== 'MeasureTool') {
          return ;
      }

      const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
      const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
      if ( ArkWeb.defined(cartesian)) {
        this.currentPoint = cartesian;
      }
      if (this.basicTool.toolMode === 1) { // 测量长度
        if (this.currentpolylinepointsList.length > 0 ) {
            if ( ArkWeb.defined(cartesian)) {
                this.currentpolylinepointsList.push(cartesian);
            }
            this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
        }
        if (this.currentActivePolylinepointsList.length > 1) {
            this.updateLengthMeasureResult(false);
        }
        const pos = [].concat(this.currentActivePolylinepointsList);
        const line = this.basicTool.measureLineCollection.add({
            positions: pos,
            material: ArkWeb.Material.fromType('Color', {
            color: ArkWeb.Color.YELLOW}),
            // material: new ArkWeb.PolylineArrowMaterialProperty(ArkWeb.Color.YELLOW),
            width: 2,
            followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
            // extrudedHeight: 10,
            clampToGround: true
        });

        this.updateLengthMeasureResult(true);
        this.currentActivePolylinepointsList = []; // 清空点
        this.currentpolylinepointsList = []; // 清空点
      } else if (this.basicTool.toolMode === 2 ) {
          /**
           * 面积计算
           */
          if (this.currentpolygonpointsList.length > 1 ) {
            if ( ArkWeb.defined(cartesian)) {
                this.currentpolygonpointsList.push(cartesian);
            }
            this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
          }
          const pos = [].concat(this.currentActivePolygonpointsList);
          if (this.currentpolygonpointsList.length > 2) {
              const addPolygon = this.core.viewer.entities.add({
                  polygon : {
                      hierarchy: pos,
                      material: new ArkWeb.ColorMaterialProperty(ArkWeb.Color.CYAN.withAlpha(0.6))
                  }
              });
              this.updateAreaMeasureResult(true);
              this.currentpolygonpointsList = []; // 清空点
              this.currentActivePolygonpointsList = []; // 清空点
              this.basicTool.measurePolygonCollection.push(addPolygon);
          }
      } else if (this.basicTool.toolMode === 3) {
          this.updateCoordinateResult(true);
      } else if ( this.basicTool.toolMode === 4 ) { // 高度测量
          if (cartesian) {
            this.currentPoint = cartesian;
          } else {
            this.currentPoint = this.core.viewer.scene.pickPosition(movement.position);
          }
          if (this.currentpolylinepointsList.length < 1) {
              return;
          }
          this.updateHeigthMeasureResult(true);
        //   this.currentpolylinepointsList.push(this.currentPoint);
    }
      this.currentLablePointPos = [];
  }

  mouseMoveCallbcak(movement): void {
      if (this.basicTool.toolMode === 0) {
          return;
      }
      if (this.basicTool.toolName !== 'MeasureTool') {
          return ;
      }
      if (!ArkWeb.defined(this.currentPoint)) {
          return;
      }

      if (this.basicTool.toolMode === 1) { // 测量长度
          const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
          const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
          this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
          if ( ArkWeb.defined(cartesian)) {
              this.currentActivePolylinepointsList.push(cartesian);
              this.currentPoint = cartesian;
          }
      } else if (this.basicTool.toolMode === 2 ) {
          const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
          const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
          this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
          if ( ArkWeb.defined(cartesian)) {
            this.currentActivePolygonpointsList .push(cartesian);
            this.currentPoint = cartesian;
          }
      } else if (this.basicTool.toolMode === 4 ) {
        const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
        const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
        // this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
        if ( ArkWeb.defined(cartesian) && this.currentpolylinepointsList.length > 0) {
            // this.currentActivePolylinepointsList.push(cartesian);
            this.currentPoint = cartesian;
            this.updateHeigthMeasureResult(false);
        }
      }

  }

  private updateLengthMeasureResult(isEnd: boolean): void {
      // let temparray: Array<any> = [];
      let dis = 0;

      if (this.currentpolylinepointsList.length < 2 ) {
          return;
      }

      for ( let i = 0;  i < this.currentpolylinepointsList.length - 1; i++ ) {
      // surfaceps=surfaceLine([editor.currentpolylinepoints[i],editor.currentpolylinepoints[i+1]]);
          // tslint:disable-next-line:max-line-length
          dis = dis + this.coordinateCoutTool.countdisInCartesian3( this.currentpolylinepointsList[i], this.currentpolylinepointsList[i + 1]) ;
      //   temparray=temparray.concat(surfaceps)
      }
      let labelText = '';
      if (dis < 1000) {
          labelText  = dis.toFixed(2) + `米`;
      } else if (dis < 10000000) {
          labelText = (dis / 1000 ).toFixed(2) + `千米`;
      } else {
          labelText = (dis / 10000000 ).toFixed(2) + `万千米`;
      }

      if ( isEnd ) {
          this.currentLablePointPos = [];
          this.basicTool.measureLableCollection.add({
              position: this.currentPoint,
              text : labelText,
              font : '18px Arial',
              fillColor: ArkWeb.Color.YELLOW,
              outlineColor: ArkWeb.Color.BLACK,
              style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: ArkWeb.VerticalOrigin.TOP
          });
      } else {
          this.currentLabel._label._text._value = labelText;
          this.currentLablePointPos = this.currentPoint;
      }
  }

  private updateAreaMeasureResult(isEnd: boolean): void {
      let currentArea = 0;

      if ( this.currentActivePolygonpointsList.length < 3 ) {
          return;
      }

      currentArea = this.coordinateCoutTool.countAreaInCartesian3(this.currentActivePolygonpointsList);

      let labelText = '';
      if (currentArea < 1000000) {
          labelText  = currentArea.toFixed(2) + `平方米`;
      } else {
          labelText = (currentArea / 1000 ).toFixed(2) + `平方千米`;
      }
      const countCenter = this.coordinateCoutTool.countCenter(this.currentActivePolygonpointsList);
      if ( isEnd && ArkWeb.defined(this.currentPoint)) {
          this.currentLablePointPos = [];
          this.basicTool.measureLableCollection.add({
              position: this.currentPoint,
              text : labelText,
              font : '18px Arial',
              fillColor: ArkWeb.Color.YELLOW,
              outlineColor: ArkWeb.Color.BLACK,
              style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
            //   clampToGround: true,
              verticalOrigin: ArkWeb.VerticalOrigin.TOP
          });
      } else {
          this.currentLabel._label._text._value = labelText;
          this.currentLablePointPos = this.currentPoint;
      }

  }

  private updateHeigthMeasureResult(isEnd: boolean = true): void {
      if (this.currentpolylinepointsList.length < 1) {
          return;
        }
      this.currentVerticalcarternsList = []; // 清空点
      this.currentHorizontalcarternsList = []; // 清空点
      this.currentVerticalcarternsList.push(this.currentpolylinepointsList[0]);
    //   this.currentHorizontalcarternsList.push(this.currentPoint);

      const pickPos = this.updatePosition();
      if (pickPos) {
          const midPoint = this.midPointPos(this.currentpolylinepointsList[0], pickPos);
          this.currentVerticalcarternsList.push(midPoint);
          this.currentHorizontalcarternsList.push(midPoint);
          this.currentHorizontalcarternsList.push(pickPos);
          const labelText = this.currentHeight.toFixed(3) + `米`;
          if (isEnd) {
                    this.currentpolylinepointsList = []; // 清空点
                    this.basicTool.pointCollection.add({
                      position: pickPos,
                      color: ArkWeb.Color.YELLOW
                    });
                    this.basicTool.measureLableCollection.add({
                        position: midPoint,
                        text : labelText,
                        font : '18px Arial',
                        fillColor: ArkWeb.Color.RED,
                        outlineColor: ArkWeb.Color.BLACK,
                        style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
                        verticalOrigin: ArkWeb.VerticalOrigin.TOP
                    });

                    const pos = [].concat(this.currentHorizontalcarternsList);
                    const line = this.basicTool.measureLineCollection.add({
                        positions: pos,
                        material: ArkWeb.Material.fromType('Color', {
                        color: ArkWeb.Color.YELLOW}),
                        width: 2,
                        followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
                        // extrudedHeight: 10,
                        clampToGround: true
                    });


                    const pos2 = [].concat(this.currentVerticalcarternsList);
                    this.basicTool.pointCollection.add({
                      position: pos2[0],
                      color: ArkWeb.Color.YELLOW
                    });
                    const line2 = this.basicTool.measureLineCollection.add({
                        positions: pos2,
                        material: ArkWeb.Material.fromType('Color', {
                        color: ArkWeb.Color.GREEN}),
                        width: 2,
                        followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
                        // extrudedHeight: 10,
                        clampToGround: true
                    });

                    this.objectsToExclude = [];
                    this.currentVerticalcarternsList = []; // 清空点
                    this.currentHorizontalcarternsList = []; // 清空点
                    this.currentLablePointPos = [];
            } else {
                this.currentLabel._label._text._value = labelText;
                this.currentLablePointPos = midPoint;

            }
    }
  }

  private midPointPos(p1, p2) {
      let midPoint = new  ArkWeb.Cartesian3((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2);

      const cartographic0 = ArkWeb.Cartographic.fromCartesian(p1);
      const cartographic1 = ArkWeb.Cartographic.fromCartesian(p2);
      const planeLineCartesian3 = [];
      if (cartographic0.height < cartographic1.height) {
          const pos0 = ArkWeb.Cartesian3.fromRadians(cartographic0.longitude  , cartographic0.latitude  , cartographic1.height);
          midPoint = pos0;
      } else {
          const pos0 = ArkWeb.Cartesian3.fromRadians(cartographic1.longitude , cartographic1.latitude , cartographic0.height);
          midPoint = pos0;
      }

      this.currentHeight = Math.abs(cartographic0.height - cartographic1.height);
      return midPoint;
  }

  private updatePosition(result = []) {
    if ( ArkWeb.defined(this.currentPoint) ) {
        const cartographic = ArkWeb.Cartographic.fromCartesian(this.currentPoint);
        // cartographic.longitude = longitude - range + offset * range * 2.0;
        // cartographic.latitude = latitude;
        let height;
        if (this.core.viewer.scene.sampleHeightSupported) {
            height = this.core.viewer.scene.sampleHeight(cartographic, this.objectsToExclude);
        }
        if (ArkWeb.defined(height) && (height > 0)) {
            cartographic.height = height;
        } else {
            // cartographic.height = 0.0;
            return this.currentPoint;
        }
        return ArkWeb.Cartographic.toCartesian(cartographic, ArkWeb.Ellipsoid.WGS84, result);
    }

  }
  private updateCoordinateResult(isEnd: boolean = true): void {

      const cartesian = this.currentPoint;
      const cartographic = this.core.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
      const longitudeDegrees = ArkWeb.Math.toDegrees(cartographic.longitude);
      const longitudeMin = (longitudeDegrees - Math.floor(longitudeDegrees)) * 60;
      const longitudefenStr = longitudeMin.toFixed(0);
      const longitudeSec = (longitudeMin - Math.floor(longitudeMin)) * 60;
      const longitudeSecStr = longitudeSec.toFixed(0);
      const longitudeString = longitudeDegrees.toFixed(0) + '°' + longitudefenStr + '′' + longitudeSecStr + '″';
      // const longitudeString = ArkWeb.Math.toDegrees(cartographic.longitude).toFixed(4);
      const latitudeDegrees = ArkWeb.Math.toDegrees(cartographic.latitude);
      const latitudeMin = (latitudeDegrees - Math.floor(latitudeDegrees)) * 60;
      const latitudefenStr = latitudeMin.toFixed(0);
      const latitudeSec = (latitudeMin - Math.floor(latitudeMin)) * 60;
      const latitudeSecStr = latitudeSec.toFixed(0);
      const latitudeString = latitudeDegrees.toFixed(0) + '°' + latitudefenStr + '′' + latitudeSecStr + '″';
      const heightString = '高度   : ' + cartographic.height.toFixed(2) + '米';
      let labelText = '经度: ' + ('   ' + longitudeString) + '\u00B0' +  '\n纬度: ' + ('   ' + latitudeString) + '\u00B0\n' ;
      labelText = labelText +  heightString + '\u00B0';


      if ( isEnd && ArkWeb.defined(this.currentPoint)) {
          this.currentLablePointPos = [];
          this.basicTool.measureLableCollection.add({
              position: this.currentPoint,
              text : labelText,
              font : '18px Arial',
              fillColor: ArkWeb.Color.YELLOW,
              outlineColor: ArkWeb.Color.BLACK,
              style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: ArkWeb.VerticalOrigin.TOP
              // heightReference : ArkWeb.HeightReference.CLAMP_TO_GROUND
          });
          this.basicTool.billboardCollection.add({
              position: this.currentPoint,
              image: '/assets/themes/default/images/billboardIcons/locate.png',
              horizontalOrigin: ArkWeb.HorizontalOrigin.CENTER,
              verticalOrigin: ArkWeb.VerticalOrigin.CENTER,
            //   heightReference : ArkWeb.HeightReference.CLAMP_TO_GROUND,
              id: -1});
      } else {
          this.currentLabel._label._text._value = labelText;
          this.currentLablePointPos = this.currentPoint;
      }
  }


}
