import { Injectable } from '@angular/core';
import { CoreService } from '../../core.service';



@Injectable({
  providedIn: 'root'
})

export  class SlopToolService {
    [x: string]: any;
  constructor(
      public core: CoreService
      ) {
  }

  private basicTool;
  private currentPoint ;
  private currentLine;
  private currentLabel;
  private currentpolylinepointsList = [];
  private currentActivePolylinepointsList = [];
  private currentLablePointPos = new ArkWeb.Cartesian3(0.0, 0.0, 0.0);


  activeTool(toolMode, toolName, basicTool  ): void {
      this.core.viewer.scene.globe.depthTestAgainstTerrain = false;
      if (!ArkWeb.defined(this.basicTool))  {
          this.basicTool = basicTool;
      }
      if ( this.basicTool.toolName !== 'SlopTool') {
          this.basicTool.activeBasicToolMode( toolMode , toolName);
      }  else {
          this.basicTool.activeBasicToolMode( toolMode , toolName);
          this.clearLengthTemp();
          this.clearAreaTemp();
          return;
      }

      if (!ArkWeb.defined(this.currentLine)) {
          this.currentLine = this.core.viewer.entities.add({
              polyline : {
                  positions: new ArkWeb.CallbackProperty(() => {
                      return this.currentActivePolylinepointsList;
                  }),
                  width : 2,
                  material : ArkWeb.Color.YELLOW
              }
          });
      }

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
  }

  clearAreaTemp(): void {
      this.currentpolygonpointsList = [];
      this.currentActivePolygonpointsList = [];
  }

  leftClickCallbcak(movement) {
      if (this.basicTool.toolMode === 0) {
          return;
      }
      if (this.basicTool.toolName !== 'SlopTool') {
          return ;
      }

      const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
      const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
      if ( ArkWeb.defined(cartesian)) {
        this.currentPoint = cartesian;
      }
      if (this.currentpolylinepointsList.length > 1) {
          this.currentpolylinepointsList = [];
      }

      if (this.currentpolylinepointsList.length < 1) {
        if ( ArkWeb.defined(cartesian)) {
            this.currentpolylinepointsList.push(cartesian);
            }
        } else {
            this.rightClickCallback(movement);
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
      if (this.basicTool.toolName !== 'SlopTool') {
          return ;
      }

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
        const line = this.basicTool.measureLineCollection.add({
            positions: pos,
            material: ArkWeb.Material.fromType('Color', {
            color: ArkWeb.Color.LIGHTCYAN}),
            // material: new ArkWeb.PolylineArrowMaterialProperty(ArkWeb.Color.YELLOW),
            width: 2
        });
        this.updateSlopToolResult(true);
        this.currentActivePolylinepointsList = []; // 清空点
        this.currentpolylinepointsList = []; // 清空点
      }
      this.currentLablePointPos = [];
  }

  mouseMoveCallbcak(movement): void {
      if (this.basicTool.toolMode === 0) {
          return;
      }
      if (this.basicTool.toolName !== 'SlopTool') {
          return ;
      }
      if (!ArkWeb.defined(this.currentPoint)) {
          return;
      }

    //   if (this.basicTool.toolMode === 1)
      { // 测量长度
          const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
          const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
          this.currentActivePolylinepointsList = [].concat(this.currentpolylinepointsList);
          if ( ArkWeb.defined(cartesian)) {
              this.currentActivePolylinepointsList.push(cartesian);
              this.currentPoint = cartesian;
          }
      }
  }

  private updateSlopToolResult(isEnd: boolean): void {
    if (this.currentpolylinepointsList.length < 2) {
        return;
    }
    const p1 = this.currentpolylinepointsList[0] ;
    const p2 = this.currentpolylinepointsList[1] ;
    const cartographic0 = ArkWeb.Cartographic.fromCartesian(p1);
    const cartographic1 = ArkWeb.Cartographic.fromCartesian(p2);
    const planeLineCartesian3 = [];
    if (cartographic0.height > cartographic1.height) {
        // tslint:disable-next-line:max-line-length
        const pos0 = ArkWeb.Cartesian3.fromRadians(cartographic0.longitude  , cartographic0.latitude  , cartographic1.height);
        planeLineCartesian3.push(pos0);
        planeLineCartesian3.push(p2);
        this.currentLablePointPos = p2;
    } else {
        const pos0 = ArkWeb.Cartesian3.fromRadians(cartographic1.longitude , cartographic1.latitude , cartographic0.height);
        planeLineCartesian3.push(pos0);
        planeLineCartesian3.push(p1);
        this.currentLablePointPos = p1;
    }
    const line = this.basicTool.measureLineCollection.add({
        positions: planeLineCartesian3,
        material: ArkWeb.Material.fromType('Color', {
        color: ArkWeb.Color.GREEN}),
        width: 2
    });
    const dis =  ArkWeb.Cartesian3.distance(p1, p2);
    // const dis2 = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) + (p1.z - p2.z) );
    const detaHeight = Math.abs(cartographic0.height - cartographic1.height);

    const sinA = ArkWeb.Math.toDegrees(Math.asin(detaHeight / dis)) ;
    const labelText = sinA.toFixed(2) + `°`;
    if ( isEnd ) {
        this.basicTool.measureLableCollection.add({
            position: this.currentLablePointPos,
            text : labelText,
            font : '18px Arial',
            fillColor: ArkWeb.Color.RED,
            outlineColor: ArkWeb.Color.BLACK,
            style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
            verticalOrigin: ArkWeb.VerticalOrigin.TOP
        });
    } else {
        this.currentLabel._label._text._value = labelText;
        this.currentLablePointPos = this.currentPoint;
    }
}

}
