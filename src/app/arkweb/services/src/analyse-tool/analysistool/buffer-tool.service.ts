import {
  Injectable
} from '@angular/core';
import {
  CoreService
} from '../../core.service';
import collect from '@turf/collect';
import * as turf from '@turf/turf';
import { CoordinateCoutToolService } from '../mathtool/coordinate-cout-tool.service';




@Injectable({
  providedIn: 'root'
})

export class BufferToolService {
  constructor(
    public core: CoreService,
    protected coordinateCoutTool: CoordinateCoutToolService
    // private tbasicTool: BasicToolService,
  ) {}

  private basicTool;
  private currentPoint;
  private bufferDistance = 50;
  private currentLine;
  private currentPolygon;
  private currentLabel;
  private currentpolylinepointsList = [];
  private currentActivePolylinepointsList = [];
  private currentpolygonpointsList = [];
  private currentActivePolygonpointsList = [];
  private currentLablePointPos = new ArkWeb.Cartesian3(0.0, 0.0, 0.0);


  activeTool(toolMode, toolName, basicTool): void {

    this.core.viewer.scene.globe.depthTestAgainstTerrain = false;
    if (!ArkWeb.defined(this.basicTool)) {
      this.basicTool = basicTool;
    }
    if (this.basicTool.toolName !== 'BufferTool') {
      this.basicTool.activeBasicToolMode(toolMode, toolName);
    } else {
      this.basicTool.activeBasicToolMode(toolMode, toolName);
      this.clearLengthTemp();
      this.clearAreaTemp();
      return;
    }
    if (!ArkWeb.defined(this.currentLine)) {
      this.currentLine = this.core.viewer.entities.add({
        polyline: {
          positions: new ArkWeb.CallbackProperty(() => {
            return this.currentActivePolylinepointsList;
          }),
          width: 5,
          followSurface: false, // 是否贴着地表，这句话加上去就不会出现点顺序错乱
          material: new ArkWeb.PolylineArrowMaterialProperty(ArkWeb.Color.YELLOW),
          clampToGround: true
        }
      });
    }
    if (!ArkWeb.defined(this.currentPolygon)) {
      this.currentPolygon = this.core.viewer.entities.add({
        polygon: {
          hierarchy: new ArkWeb.CallbackProperty(() => {
            return this.currentActivePolygonpointsList;
          }, false),
          material: new ArkWeb.ColorMaterialProperty(ArkWeb.Color.YELLOW.withAlpha(0.8)),
        }
      });
    }

    if (!ArkWeb.defined(this.currentLabel)) {
      this.currentLabel = this.core.viewer.entities.add({
        position: new ArkWeb.CallbackProperty(() => {
          return this.currentLablePointPos;
        }, false),
        label: {
          text: '',
          font: '18px Arial',
          fillColor: ArkWeb.Color.YELLOW,
          outlineColor: ArkWeb.Color.BLACK,
          outlineWidth: 2,
          pixelOffset: new ArkWeb.Cartesian2(2.0, 2.0),
          // showBackground : true,
          style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
          clampToGround: true
        }
      });
    }
  }

  clearTool(): void {
    this.basicTool.clearBasicTool();
    this.core.viewer.scene.globe.depthTestAgainstTerrain = true;
  }

  clearLengthTemp(): void {
    this.currentpolylinepointsList = []; // 清空点
    this.currentActivePolylinepointsList = [];
  }

  clearAreaTemp(): void {
    this.currentpolygonpointsList = [];
    this.currentActivePolygonpointsList = [];
  }

  leftClickCallbcak(movement) {
    if (this.basicTool.toolMode === 0) {
      return;
    }
    if (this.basicTool.toolName !== 'BufferTool') {
      return;
    }

    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    if (ArkWeb.defined(cartesian)) {
      this.currentPoint = cartesian;
    }
    if (this.basicTool.toolMode === 2) { // 测量长度
      if (ArkWeb.defined(cartesian)) {
        this.currentpolylinepointsList.push(cartesian);
      }
      this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);

    } else if (this.basicTool.toolMode === 3) {
      const pickedFeature = this.core.viewer.scene.pick(movement.position);
      if (ArkWeb.defined(cartesian)) {
        this.currentpolygonpointsList.push(cartesian);
      }
      this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
    } else if (this.basicTool.toolMode === 1) {
      this.updatePointBuffer(true);
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
    if (this.basicTool.toolName !== 'BufferTool') {
      return;
    }

    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    if (ArkWeb.defined(cartesian)) {
      this.currentPoint = cartesian;
    }
    if (this.basicTool.toolMode === 2) { // 测量长度
      if (this.currentpolylinepointsList.length > 0) {
        if (ArkWeb.defined(cartesian)) {
          this.currentpolylinepointsList.push(cartesian);
        }
        this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
      }
      if (this.currentActivePolylinepointsList.length > 1) {
        this.updateLengthBufferToolResult(true);
      }
      this.currentpolylinepointsList = []; // 清空点
      this.currentActivePolylinepointsList = []; // 清空点
    } else if (this.basicTool.toolMode === 3) {
      if (this.currentpolygonpointsList.length > 1) {
        if (ArkWeb.defined(cartesian)) {
          this.currentpolygonpointsList.push(cartesian);
        }
        this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
      }
      const pos = [].concat(this.currentActivePolygonpointsList);
      if (this.currentpolygonpointsList.length > 2) {
        const addPolygon = this.core.viewer.entities.add({
          polygon: {
            hierarchy: pos,
            material: new ArkWeb.ColorMaterialProperty(ArkWeb.Color.YELLOW.withAlpha(0.9))
          }
        });
        this.updateAreaBufferToolResult(true);
        this.currentpolygonpointsList = []; // 清空点
        this.currentActivePolygonpointsList = []; // 清空点
        this.basicTool.measurePolygonCollection.push(addPolygon);
      }
    } else if (this.basicTool.toolMode === 1) {
      this.updatePointBuffer(true);
    }
    this.currentLablePointPos = [];
  }

  mouseMoveCallbcak(movement): void {
    if (this.basicTool.toolMode === 0) {
      return;
    }
    if (this.basicTool.toolName !== 'BufferTool') {
      return;
    }
    if (!ArkWeb.defined(this.currentPoint)) {
      return;
    }

    if (this.basicTool.toolMode === 2) { // 测量长度
      const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
      const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
      this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
      if (ArkWeb.defined(cartesian)) {
        this.currentActivePolylinepointsList.push(cartesian);
        this.currentPoint = cartesian;
      }
    } else if (this.basicTool.toolMode === 3) {
      const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
      const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
      this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
      if (ArkWeb.defined(cartesian)) {
        this.currentActivePolygonpointsList.push(cartesian);
        this.currentPoint = cartesian;
      }
    }

  }

  public setBufferDistance( dis: number ): void {
    if (dis < 0) {
      return;
    }

    this.bufferDistance = dis ;
  }

  private updateLengthBufferToolResult(isEnd: boolean): void {
    const polygonCartesian = [];
    this.currentpolylinepointsList.forEach(cartesian => {
      const cartographic = ArkWeb.Cartographic.fromCartesian(cartesian);
      const carPos = [] ;
      carPos.push(cartographic.longitude);
      carPos.push(cartographic.latitude);
      polygonCartesian.push(carPos);
    });
    
    const line = turf.lineString(polygonCartesian);
    const buffered = turf.buffer(line, this.bufferDistance / 50000.0, {units: 'kilometers'});
    const bufferpolygonCartographic =  buffered.geometry.coordinates[0];
    const bufferpolygonPosition = [];
    bufferpolygonCartographic.forEach(cartographicPos => {
      const lon = cartographicPos[0] / Math.PI * 180.0;
      bufferpolygonPosition.push(ArkWeb.Cartesian3.fromDegrees(lon, cartographicPos[1] / Math.PI * 180.0, 0));
    });
    if (bufferpolygonPosition.length > 3) {
      this.currentPolygon = this.core.viewer.entities.add({
        polygon : {
            hierarchy: bufferpolygonPosition,
            material: new ArkWeb.ColorMaterialProperty(ArkWeb.Color.CYAN.withAlpha(0.6)),
        }
      });
      this.core.viewer.zoomTo(this.currentPolygon);
      this.basicTool.measurePolygonCollection.push(this.currentPolygon);
    }
  }

  private updateAreaBufferToolResult(isEnd: boolean): void {
    const polygonCartesian = [];
    if (this.currentpolygonpointsList.length < 3) {
      return;
    }
    this.currentpolygonpointsList.forEach(cartesian => {
      const cartographic = ArkWeb.Cartographic.fromCartesian(cartesian);
      const carPos = [] ;
      carPos.push(cartographic.longitude);
      carPos.push(cartographic.latitude);
      polygonCartesian.push(carPos);
    });
    {
      const cartographic = ArkWeb.Cartographic.fromCartesian(this.currentpolygonpointsList[0]);
      const carPos = [] ;
      carPos.push(cartographic.longitude);
      carPos.push(cartographic.latitude);
      polygonCartesian.push(carPos);
    }
    const line = turf.polygon([polygonCartesian]);
    const buffered = turf.buffer(line, this.bufferDistance / 50000.0, {units: 'kilometers'});
    const bufferpolygonCartographic =  buffered.geometry.coordinates[0];
    const bufferpolygonPosition = [];
    bufferpolygonCartographic.forEach(cartographicPos => {
      const lon = cartographicPos[0] / Math.PI * 180.0;
      bufferpolygonPosition.push(ArkWeb.Cartesian3.fromDegrees(lon, cartographicPos[1] / Math.PI * 180.0, 0));
    });
    if (bufferpolygonPosition.length > 3) {
      this.currentPolygon = this.core.viewer.entities.add({
        polygon : {
            hierarchy: bufferpolygonPosition,
            material: new ArkWeb.ColorMaterialProperty(ArkWeb.Color.CYAN.withAlpha(0.6)),
        }
      });
      this.core.viewer.zoomTo(this.currentPolygon);
      this.basicTool.measurePolygonCollection.push(this.currentPolygon);
      this.addAreaLabelText(bufferpolygonPosition);
    }

  }

  private updatePointBuffer(isEnd: boolean = true): void {
    if (ArkWeb.defined(this.currentPoint)) {
    //   this.basicTool.pointCollection.add({
    //     position: this.currentPoint,
    //     color: ArkWeb.Color.YELLOW
    //   });

      const redEllipse = this.core.viewer.entities.add({
        position: this.currentPoint,
        name: 'ELLIPSE',
        ellipse: {
          semiMinorAxis: this.bufferDistance,
          semiMajorAxis: this.bufferDistance,
          material: ArkWeb.Color.BLUE.withAlpha(0.5),
          outline: true,
          outlineColor: ArkWeb.Color.PINK
        }
      });
      this.basicTool.measurePolygonCollection.push(redEllipse);



      const currentArea = Math.PI * this.bufferDistance * this.bufferDistance;
      let labelText = '';
      if (currentArea < 1000000) {
          labelText  = currentArea.toFixed(2) + `平方米`;
      } else {
          labelText = (currentArea / 1000 ).toFixed(2) + `平方千米`;
      }
      const redCartographic = ArkWeb.Cartographic.fromCartesian(this.currentPoint);
      redCartographic.height = redCartographic.height + 2000.0;
      const newCartographic = new ArkWeb.Cartographic(redCartographic.longitude, redCartographic.latitude, 0);
      const height = this.core.viewer.scene.globe.getHeight(newCartographic) + 5;
      // tslint:disable-next-line:max-line-length
      const cartesian = ArkWeb.Cartographic.toCartesian(new ArkWeb.Cartographic(newCartographic.longitude, newCartographic.latitude, height));
      if ( ArkWeb.defined(currentArea)) {
          this.basicTool.measureLableCollection.add({
              position: cartesian,
              text : labelText,
              font : '18px Arial',
              fillColor: ArkWeb.Color.YELLOW,
              outlineColor: ArkWeb.Color.RED,
              // heightReference: ArkWeb.HeightReference.CLAMP_TO_GROUND,
              style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: ArkWeb.VerticalOrigin.TOP,
              disableDepthTestDistance : Number.POSITIVE_INFINITY
          });
      }

    }
  }

  private addAreaLabelText(polygonPosition): void {

        /////////
        let currentArea = 0;

        if ( polygonPosition.length < 3 ) {
            return;
        }

        currentArea = this.coordinateCoutTool.countAreaInCartesian3( polygonPosition);

        let labelText = '';
        if (currentArea < 1000000) {
            labelText  = currentArea.toFixed(2) + `平方米`;
        } else {
            labelText = (currentArea / 1000 ).toFixed(2) + `平方千米`;
        }
        const redCartographic = ArkWeb.Cartographic.fromCartesian(polygonPosition[0]);
        redCartographic.height = redCartographic.height + 2000.0;
        const newCartographic = new ArkWeb.Cartographic(redCartographic.longitude, redCartographic.latitude, 0);
        const height = this.core.viewer.scene.globe.getHeight(newCartographic) + 5;
        // tslint:disable-next-line:max-line-length
        const cartesian = ArkWeb.Cartographic.toCartesian(new ArkWeb.Cartographic(newCartographic.longitude, newCartographic.latitude, height));

        currentArea = this.coordinateCoutTool.countAreaInCartesian3(polygonPosition);
        if ( ArkWeb.defined(currentArea)) {
            this.basicTool.measureLableCollection.add({
                position: cartesian,
                text : labelText,
                font : '18px Arial',
                fillColor: ArkWeb.Color.YELLOW,
                outlineColor: ArkWeb.Color.RED,
                // heightReference: ArkWeb.HeightReference.CLAMP_TO_GROUND,
                style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: ArkWeb.VerticalOrigin.TOP,
                disableDepthTestDistance : Number.POSITIVE_INFINITY
            });
        }
  }

}
