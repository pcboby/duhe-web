import {
  Injectable
} from '@angular/core';
import {
  CoreService
} from '../../core.service';
// import {
// BasicToolService
// } from '../basic-Tool.service';


@Injectable({
  providedIn: 'root'
})
export class VisualToolService {

constructor(
  public core: CoreService
  ) {
}


private currentPoint ;
private preLine;
private aftLine;
// private currentMovementList = [];
private currentpointsList = [];
private prepointsList = [];
private aftpointsList = [];
private currentActivePolylinepointsList = [];
private basicTool;


private blueSpherePosition;
private redSpherePosition;
private redSphere;
private blueSphere;
private arrow;

private intersectionMarkers = [];
private pickedFeatures = [];
private objectsToExclude = [];
private drillPick;

activeTool(toolMode, toolName, basicTool  ): void {
  if ( toolName !== 'VisualTool') {
    return ;
  }

  if (!ArkWeb.defined(this.basicTool)) {
    this.basicTool = basicTool;
  }
  this.basicTool.activeBasicToolMode( toolMode , toolName);
  this.core.viewer.scene.globe.depthTestAgainstTerrain = false;

  if (!ArkWeb.defined(this.preLine)) {
    this.preLine = this.core.viewer.entities.add({
        polyline : {
            positions: new ArkWeb.CallbackProperty(() => {
                return this.prepointsList;
            }),
            width : 6,
            followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
            material : ArkWeb.Color.GREEN,
            // clampToGround: true
        }
    });
  }

  if (!ArkWeb.defined(this.aftLine)) {
    this.aftLine = this.core.viewer.entities.add({
        polyline : {
            positions: new ArkWeb.CallbackProperty(() => {
                return this.aftpointsList;
            }),
            width : 6,
            followSurface : false,  // 是否贴着地表，这句话加上去就不会出现点顺序错乱
            material : ArkWeb.Color.RED,
            // clampToGround: true
        }
    });
  }
  if (!ArkWeb.defined(this.drillPick)) {
    this.drillPick = true;
  }
  if (!ArkWeb.defined(this.redSphere)) {
    this.redSphere = this.core.viewer.entities.add({
      position : new ArkWeb.CallbackProperty(() => {
        return this.redSpherePosition;
        }),
      ellipsoid : {
          radii : new ArkWeb.Cartesian3(7.0, 7.0, 7.0),
          material : ArkWeb.Color.RED
      }
    });
  }
  if (!ArkWeb.defined(this.blueSphere)) {
    this.blueSphere = this.core.viewer.entities.add({
      position :  new ArkWeb.CallbackProperty(() => {
                      return this.blueSpherePosition;
                  }),
      ellipsoid : {
          radii : new ArkWeb.Cartesian3(7.0, 7.0, 7.0),
          material : ArkWeb.Color.BLUE
      }
    });
  }

  if (!ArkWeb.defined(this.arrow)) {
    this. arrow = this.core.viewer.entities.add({
        polyline : {
            positions : new ArkWeb.CallbackProperty(() => {
              return this.currentActivePolylinepointsList;
            }),
            width : 10,
            // arcType : 0,
            material : ArkWeb.Color.YELLOW
        }
    });
  }

}

leftClickCallbcak(movement) {
  if (this.basicTool.toolMode === 0) {
    return;
  }
  if (this.basicTool.toolName !== 'VisualTool') {
      return ;
  }

  if (this.prepointsList.length > 0) {
    // this.currentpointsList = []; // 清空点
    this.aftpointsList = [];
    this.prepointsList = [];
    this.currentActivePolylinepointsList = []; // 清空点s
    this.blueSpherePosition = null;
    this.redSpherePosition = null;
    this.reset();
    // this.currentMovementList = [];
  }
  if (this.currentpointsList.length < 1) {
    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
///

    const blueCartesian = this.core.viewer.scene.pickPosition(movement.position);
    const blueCartographic = ArkWeb.Cartographic.fromCartesian(blueCartesian);
    blueCartographic.height = blueCartographic.height + 10.0;
    const cartesian = ArkWeb.Cartographic.toCartesian(blueCartographic);
    // this.currentPoint = cartesian;
///

    // const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene

    this.blueSpherePosition = cartesian;
    this.currentpointsList.push(cartesian);
  } else {
    this.rightClickCallback(movement);
  }
  // if (this.currentpointsList.length < 1) {
  //   const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
  //   const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
  //   this.currentPoint = cartesian;
  //   this.currentpointsList.push(cartesian);
  //   this.currentActivePolylinepointsList = [].concat(this.currentpointsList);
  // } else {
  //   this.rightClickCallback(movement);
  // }
}

rightClickCallback(movement) {
  if (this.basicTool.toolName !== 'VisualTool') {
      return ;
  }
  if (this.currentpointsList.length < 1) {
    return;
  }
  {
    // const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
    // const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);

    const redCartesian = this.core.viewer.scene.pickPosition(movement.position);
    const redCartographic = ArkWeb.Cartographic.fromCartesian(redCartesian);
    redCartographic.height = redCartographic.height + 10.0;
    const cartesian = ArkWeb.Cartographic.toCartesian(redCartographic);
    this.currentPoint = cartesian;

    this.redSpherePosition = cartesian;
    this.currentpointsList.push(cartesian);
    // const pos = {x: 0, y: 0};
    // pos.x = movement.position.x;
    // pos.y = movement.position.y;
    // // this.currentMovementList.push(pos);

  }
  this.core.viewer.scene.globe.depthTestAgainstTerrain = true;

  // this.updateVisual();
  this.updateVisual();
}

mouseMoveCallbcak(movement) {
  if (this.basicTool.toolName !== 'VisualTool') {
      return ;
  }
  // return;
  if (this.currentpointsList.length > 1) {
    return;
  }
  const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
  const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
  this.currentPoint = cartesian;
  this.currentActivePolylinepointsList = [].concat(this.currentpointsList);
  this.currentActivePolylinepointsList .push(cartesian);
}

private updateVisual(): void {
  const start = this.currentpointsList[0];
  const end = this.currentpointsList[1];
  const direction = ArkWeb.Cartesian3.normalize(ArkWeb.Cartesian3.subtract(end, start, new ArkWeb.Cartesian3()), new ArkWeb.Cartesian3());
  const ray = new ArkWeb.Ray(start, direction);
  let results = [];
  if (this.drillPick) {
      results = this.core.viewer.scene.drillPickFromRay(ray, 10, this.objectsToExclude);
  } else {
      const result = this.core.viewer.scene.pickFromRay(ray, this.objectsToExclude);
      if (ArkWeb.defined(result)) {
          results = [result];
      }
  }
  this.showIntersections(results);
  this.currentpointsList = []; // 清空点
}

private reset(): void {

  this.objectsToExclude = [this.blueSphere, this.redSphere, this.arrow];
  this.pickedFeatures.forEach(pickedFeature => {
    pickedFeature.color = ArkWeb.Color.fromAlpha(ArkWeb.Color.WHITE, pickedFeature.color.alpha);
  });
  this.intersectionMarkers.forEach(intersectionMarker => {
    this.core.viewer.entities.remove(intersectionMarker);
    this.objectsToExclude.push(intersectionMarker);
  });
  this.pickedFeatures.length = 0;
  this.intersectionMarkers.length = 0;
}

private showIntersections(result) {
  result.forEach(objectA => {
    const object = objectA.object;
    if (object instanceof ArkWeb.ArkWeb3DTileFeature) {
      this.pickedFeatures.push(object);
      object.color = ArkWeb.Color.fromAlpha(ArkWeb.Color.YELLOW, object.color.alpha);

      this.intersectionMarkers.push(this.core.viewer.entities.add({
        position : objectA.position,
        ellipsoid : {
            radii : new ArkWeb.Cartesian3(3.0, 3.0, 3.0),
            material : ArkWeb.Color.GREEN
        }
      }));
    }
  });

  if (result.length > 0) {
    const object = result[0].object;
    if (object instanceof ArkWeb.ArkWeb3DTileFeature) {
      this.prepointsList.push(this.currentpointsList[0]);
      this.prepointsList.push(result[0].position);

      this.aftpointsList.push(result[0].position);
      this.aftpointsList.push(this.currentpointsList[1]);
    }
  } else {
    this.prepointsList.push(this.currentpointsList[0]);
    this.prepointsList.push(this.currentpointsList[1]);
  }
}


clearTool(): void {
  this.currentpointsList = []; // 清空点
  this.aftpointsList = [];
  this.prepointsList = [];
  this.currentActivePolylinepointsList = []; // 清空点s
  this.blueSpherePosition = null;
  this.redSpherePosition = null;
}

}
