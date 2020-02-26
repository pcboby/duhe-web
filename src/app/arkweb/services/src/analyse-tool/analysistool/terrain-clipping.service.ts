import { Injectable } from '@angular/core';
import { CoreService } from '../../core.service';
import { CoordinateCoutToolService } from '../mathtool/coordinate-cout-tool.service';



@Injectable({
  providedIn: 'root'
})
export class TerrainClippingService {

constructor(
  public core: CoreService,
  protected coordinateCoutTool: CoordinateCoutToolService
  ) {
}


private currentPoint ;
private currentPolygon;
private currentpointsList = [];
private currentLabel;
private currentActivePolygonpointsList = [];
private currentLablePointPos = new ArkWeb.Cartesian3(0.0, 0.0, 0.0);
private basicTool;
private deepClip = 50;

// }
// private eventHandler = null;
activeTool(toolMode, toolName, basicTool  ): void {
  if ( toolName !== 'TerrainClipTool') {
    return ;
  }

  if (!ArkWeb.defined(this.basicTool)) {
    this.basicTool = basicTool;
  }
  this.basicTool.activeBasicToolMode( toolMode , toolName);
  this.core.viewer.scene.globe.depthTestAgainstTerrain = false;

  if (!ArkWeb.defined(this.currentPolygon)) {
    this.currentPolygon = this.core.viewer.entities.add({
        polygon : {
            hierarchy: new ArkWeb.CallbackProperty(() => {
                return this.currentActivePolygonpointsList;
            }, false),
            material: new ArkWeb.ColorMaterialProperty(ArkWeb.Color.CYAN.withAlpha(0.6))
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
setDeepClip(pdeepClip) {
  this.deepClip = pdeepClip;
}
leftClickCallbcak(movement) {
  if (this.basicTool.toolMode === 0) {
    return;
  }
  if (this.basicTool.toolName !== 'TerrainClipTool') {
      return ;
  }

  const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
  const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
  this.currentPoint = cartesian;
  this.currentpointsList.push(cartesian);
  this.currentActivePolygonpointsList = [].concat(this.currentpointsList);
}

rightClickCallback(movement) {
  if (this.currentpointsList.length < 2) {
    return;
  }
  const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
  const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
  this.currentPoint = cartesian;

  this.currentpointsList.push(cartesian);

  const points = this.currentpointsList;
  this.core.viewer.scene.globe.depthTestAgainstTerrain = true;

  const clippingPlanes = [];
  const pointsLength = points.length;
  for (let i = 0; i < pointsLength; ++i) {
      const nextIndex = (i + 1) % pointsLength;
      let midpoint = ArkWeb.Cartesian3.add(points[i], points[nextIndex], new ArkWeb.Cartesian3());
      midpoint = ArkWeb.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);

      const up = ArkWeb.Cartesian3.normalize(midpoint, new ArkWeb.Cartesian3());
      let right = ArkWeb.Cartesian3.subtract(points[nextIndex], midpoint, new ArkWeb.Cartesian3());
      right = ArkWeb.Cartesian3.normalize(right, right);

      let normal = ArkWeb.Cartesian3.cross(right, up, new ArkWeb.Cartesian3());
      normal = ArkWeb.Cartesian3.normalize(normal, normal);

      // Compute distance by pretending the plane is at the origin
      const originCenteredPlane = new ArkWeb.Plane(normal, 0.0);
      const distance = ArkWeb.Plane.getPointDistance(originCenteredPlane, midpoint);

      clippingPlanes.push(new ArkWeb.ClippingPlane(normal, distance));
  }
  //////////
  this.core.viewer.scene.globe.clippingPlanes = new ArkWeb.ClippingPlaneCollection({
      planes : clippingPlanes,
      edgeWidth: 0,
      edgeColor: ArkWeb.Color.WHITE,
      enabled : true
  });
  // console.log('clippingPlanes', clippingPlanes);
  this.updateLabelAndClip();

  this.currentpointsList = []; // 清空点
  this.currentActivePolygonpointsList = []; // 清空点
}

mouseMoveCallbcak(movement) {
  const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
  const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
  this.currentPoint = cartesian;
  this.currentActivePolygonpointsList = [].concat(this.currentpointsList);
  this.currentActivePolygonpointsList .push(cartesian);
}
clearTool(): void {
  this.core.viewer.scene.globe.clippingPlanes = null;
  this.currentActivePolygonpointsList = [];
}

private updateLabelAndClip() {
  // {
    const minHeights = [];
    const maxHeights = [];
    this.currentActivePolygonpointsList.push(this.currentActivePolygonpointsList[0]);
    const currentPosList = [];
    let minH  = -1;
    this.currentActivePolygonpointsList.forEach(cartesianPos => {
      const cartographicPos = ArkWeb.Cartographic.fromCartesian(cartesianPos);
      const cheight = this.core.viewer.scene.globe.getHeight(cartographicPos) ;
      if (minH === -1) {
        minH = cheight - this.deepClip;
      }
      minHeights.push( minH );
      maxHeights.push(cheight + 1);
      cartographicPos.height = minH;
      const newC = ArkWeb.Cartesian3.fromRadians( cartographicPos.longitude , cartographicPos.latitude , cartographicPos.height);
      // console.log(cartographicPos, 's', newC);
      currentPosList.push(newC);
    });
    // /assets/themes/default/images
    this.currentPolygon = this.core.viewer.entities.add({
      name : 'Red wall at height',
      wall : {
          positions : this.currentActivePolygonpointsList,
          maximumHeights : maxHeights,
          minimumHeights : minHeights,
          material : '/assets/themes/default/images/soil.jpg' // ArkWeb.Color.DARKGREEN
      }
    });

    this.basicTool.measurePolygonCollection.push(this.currentPolygon);
    currentPosList.pop();
    const currentPolygon2 =  this.core.viewer.entities.add({
      polygon : {
          hierarchy: currentPosList,
          // material: new ArkWeb.ColorMaterialProperty(ArkWeb.Color.GREEN),
          material: '/assets/themes/default/images/soil.jpg',
          perPositionHeight : true
      }
    });
    this.basicTool.measurePolygonCollection.push(currentPolygon2);

    // lable
    const currentArea = this.coordinateCoutTool.countAreaInCartesian3( currentPosList) * Math.abs(this.deepClip);
    // console.log('currentArea', currentArea);
    // alert(currentArea);
    let labelText = '';
    if (currentArea < 1000000000) {
        labelText  = currentArea.toFixed(2) + `立方米`;
    } else {
        labelText = (currentArea / 1000 ).toFixed(2) + `立方千米`;
    }
    const redCartographic = ArkWeb.Cartographic.fromCartesian(this.currentActivePolygonpointsList[0]);
    redCartographic.height = redCartographic.height + 2000.0;
    const newCartographic = new ArkWeb.Cartographic(redCartographic.longitude, redCartographic.latitude, 0);
    const height = this.core.viewer.scene.globe.getHeight(newCartographic) + 15;
    // tslint:disable-next-line:max-line-length
    const cartesian = ArkWeb.Cartographic.toCartesian(new ArkWeb.Cartographic(newCartographic.longitude, newCartographic.latitude, height));
    // console.log('area', currentArea);
    if ( ArkWeb.defined(currentArea)) {
        // this.basicTool.measureLableCollection.add({
        //     position: cartesian,
        //     text : labelText,
        //     font : '18px Arial',
        //     fillColor: ArkWeb.Color.YELLOW,
        //     outlineColor: ArkWeb.Color.RED,
        //     // heightReference: ArkWeb.HeightReference.CLAMP_TO_GROUND,
        //     style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
        //     verticalOrigin: ArkWeb.VerticalOrigin.TOP,
        //     disableDepthTestDistance : Number.POSITIVE_INFINITY
        // });
        this.currentLabel._label._text._value = labelText;
        this.currentLablePointPos = cartesian;
    }

    }
}
