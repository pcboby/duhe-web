import { Injectable } from '@angular/core';
import { CoreService } from '../../core.service';


@Injectable({
  providedIn: 'root'
})
export class SectionToolService {

  constructor(
    public core: CoreService
    ) {
  }


  private currentPoint ;
  private currentLine;
  private currentMovementList = [];
  private currentpointsList = [];
  private currentActivePolylinepointsList = [];
  private basicTool;
  private sectionChartfun;

  // }
  // private eventHandler = null;
  activeTool(toolMode, toolName, basicTool  ): void {
    if ( toolName !== 'SectionTool') {
      return ;
    }

    if (!ArkWeb.defined(this.basicTool)) {
      this.basicTool = basicTool;
    }
    this.basicTool.activeBasicToolMode( toolMode , toolName);
    this.core.viewer.scene.globe.depthTestAgainstTerrain = false;

    if (!ArkWeb.defined(this.currentLine)) {
      this.currentLine = this.core.viewer.entities.add({
          polyline : {
              positions: new ArkWeb.CallbackProperty(() => {
                  return this.currentActivePolylinepointsList;
              }),
              width : 10,
              followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
              // material : ArkWeb.Color.YELLOW,
              material: new ArkWeb.PolylineArrowMaterialProperty(ArkWeb.Color.YELLOW),
              clampToGround: true
          }
      });
    }
  }

  leftClickCallbcak(movement) {
    if (this.basicTool.toolMode === 0) {
      return;
    }
    if (this.basicTool.toolName !== 'SectionTool') {
        return ;
    }

    if (this.currentpointsList.length > 1) {
      this.currentpointsList = []; // 清空点
      this.currentActivePolylinepointsList = []; // 清空点s
      this.currentMovementList = [];
    }

    if (this.currentpointsList.length < 1) {
      const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
      const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
      this.currentPoint = cartesian;
      this.currentpointsList.push(cartesian);
      const pos = {x: 0, y: 0};
      pos.x = movement.position.x;
      pos.y = movement.position.y;
      this.currentMovementList.push(pos);
      this.currentActivePolylinepointsList = [].concat(this.currentpointsList);
    } else {
      this.rightClickCallback(movement);
    }
  }

  rightClickCallback(movement) {
    if (this.basicTool.toolName !== 'SectionTool') {
        return ;
    }
    if (this.currentpointsList.length < 1) {
      return;
    }
    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    this.currentPoint = cartesian;

    this.currentpointsList.push(cartesian);
    const pos = {x: 0, y: 0};
    pos.x = movement.position.x;
    pos.y = movement.position.y;
    this.currentMovementList.push(pos);

    const points = this.currentpointsList;
    this.core.viewer.scene.globe.depthTestAgainstTerrain = true;

    this.updateSection();
    // this.currentpointsList = []; // 清空点
    // this.currentActivePolylinepointsList = []; // 清空点
  }

  mouseMoveCallbcak(movement) {
    if (this.basicTool.toolName !== 'SectionTool') {
        return ;
    }

    if (this.currentpointsList.length > 1) {
      return;
    }
    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    this.currentPoint = cartesian;
    this.currentActivePolylinepointsList = [].concat(this.currentpointsList);
    this.currentActivePolylinepointsList .push(cartesian);
  }

  private updateSection(): void {
    const lerpPointNum = 100;

    const leftX = this.currentMovementList[0].x;
    const leftY =  this.currentMovementList[0].y;
    const rightPoint = this.currentMovementList[1];
    // 起止点相关信息
    const startCartographic = ArkWeb.Cartographic.fromCartesian(this.currentpointsList[0]);
    const startLon = ArkWeb.Math.toDegrees(startCartographic.longitude);
    const startLat = ArkWeb.Math.toDegrees(startCartographic.latitude);
    const startLen = startCartographic.height;

    const endCartographic = ArkWeb.Cartographic.fromCartesian(this.currentpointsList[1]);
    const endLon = ArkWeb.Math.toDegrees(endCartographic.longitude);
    const endLat = ArkWeb.Math.toDegrees(endCartographic.latitude);
    const endLen = endCartographic.height;

    const stepLon = ArkWeb.Math.lerp(startLon, endLon, 1.0 / lerpPointNum) - startLon; // 步长
    const stepLat = ArkWeb.Math.lerp(startLat, endLat, 1.0 / lerpPointNum) - startLat; // 步长

    const addX = ArkWeb.Math.lerp (leftX, rightPoint.x, 1.0 / lerpPointNum) - leftX;
    const addY = ArkWeb.Math.lerp (leftY, rightPoint.y, 1.0 / lerpPointNum) - leftY;

    const heightArr = [];

    let dp1;
    let dp2;

    for (let i = 0; i < lerpPointNum; i ++) {

        const longitude = startLon + (i + 1) * stepLon;
        const latitude = startLat + (i + 1) * stepLat;
        if (i === 0) {
            dp1 = ArkWeb.Cartesian3.fromDegrees(longitude, latitude, 0);
        } else if (i === 1) {
            dp2 = ArkWeb.Cartesian3.fromDegrees(longitude, latitude, 0);
        }

        const px = leftX + (i + 1) * addX;
        const py = leftY + (i + 1) * addY;

        const eventPosition = {x: px, y: py};

        const ray = this.core.viewer.camera.getPickRay(eventPosition);
        const position = this.core.viewer.scene.globe.pick(ray, this.core.viewer.scene);
        if (ArkWeb.defined(position)) {
            const cartographic = ArkWeb.Ellipsoid.WGS84.cartesianToCartographic(position);
            heightArr[i] = cartographic.height / 2;   // 保留两位小数
        }

    }

    // 计算两个三维坐标之间的距离
    const juli = Math.round(ArkWeb.Cartesian3.distance(dp1, dp2) ); // dp1、dp2 都是三维坐标系
    const yData = heightArr;
    const xDataStr = [];
    const xData = [];

    for (let i = 0; i < lerpPointNum; i ++) {
        if (i === 0) {
            xData[i] = 0;
            xDataStr[i] = xData[i].toFixed(2);
        } else {
            xData[i] = xData[i - 1] + juli;
            xDataStr[i] = xData[i].toFixed(2);
        }
    }
    if (typeof this.sectionChartfun === 'function') {
      this.sectionChartfun(xDataStr, yData);
    }
  }

  clearTool(): void {
    this.currentpointsList = []; // 清空点
    this.currentActivePolylinepointsList = []; // 清空点s
    this.currentMovementList = [];
  }

  public setSectionChartCallback(fun): void {
    this.sectionChartfun = fun;
  }
}
