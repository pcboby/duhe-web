import {
    Injectable
  } from '@angular/core';
import {
    CoreService
  } from '../../core.service';
import * as turf from '@turf/turf';
import { CoordinateCoutToolService } from '../mathtool/coordinate-cout-tool.service';


@Injectable({
    providedIn: 'root'
})
export class SpaceOverlayService {
    constructor(
        public core: CoreService,
        protected coordinateCoutTool: CoordinateCoutToolService
        ) {
    }

    private basicTool;
    private currentPolygon;
    private prePolygon;
    private aftPolygon;
    private currentpolygonpointsList = [];
    private prePointsList = [];
    private currentActivePolygonpointsList = [];

    activeTool(toolMode, toolName, basicTool  ): void {
        if ( toolName !== 'SpaceOverlayTool') {
            return ;
        }
        if (!ArkWeb.defined(this.basicTool))  {
            this.basicTool = basicTool;
        }
        if ( this.basicTool.toolName !== 'SpaceOverlayTool') {
            this.basicTool.activeBasicToolMode( toolMode , toolName);
        }  else {
            this.basicTool.activeBasicToolMode( toolMode , toolName);
            return;
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
    }

    leftClickCallbcak(movement) {
        if (this.basicTool.toolMode === 0) {
        return;
        }
        if (this.basicTool.toolName !== 'SpaceOverlayTool') {
            return ;
        }
        const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
        const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
        if ( ArkWeb.defined(cartesian)) {
              this.currentpolygonpointsList.push(cartesian);
          }
        this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);


    }

    rightClickCallback(movement) {
        if (this.basicTool.toolName !== 'SpaceOverlayTool') {
            return ;
        }
        const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
        const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
        if (this.currentpolygonpointsList.length > 1 ) {
          if ( ArkWeb.defined(cartesian)) {
              this.currentpolygonpointsList.push(cartesian);
          }
          this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
        }
        const pos = [].concat(this.currentActivePolygonpointsList);
        let currentM = new ArkWeb.ColorMaterialProperty(ArkWeb.Color.CORNFLOWERBLUE.withAlpha(0.7));
        if (ArkWeb.defined(this.prePointsList) && this.prePointsList.length > 0) {
            currentM = new ArkWeb.ColorMaterialProperty(ArkWeb.Color.CADETBLUE.withAlpha(0.7));
        }

        if (this.currentpolygonpointsList.length > 2) {
            const addPolygon = this.core.viewer.entities.add({
                polygon : {
                    hierarchy: pos,
                    material: currentM
                }
            });
            if (ArkWeb.defined(this.prePointsList) && this.prePointsList.length > 0) {
                this.overlayAnalysis();
            }  else {
                this.prePointsList =  [].concat(this.currentpolygonpointsList);
            }
            this.currentpolygonpointsList = []; // 清空点
            this.currentActivePolygonpointsList = []; // 清空点
            this.basicTool.measurePolygonCollection.push(addPolygon);
        }

    }

    mouseMoveCallbcak(movement) {
        if (this.basicTool.toolName !== 'SpaceOverlayTool') {
            return ;
        }

        const pickRay = this.core.viewer.scene.camera.getPickRay(movement.endPosition);
        const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
        this.currentActivePolygonpointsList = [].concat(this.currentpolygonpointsList);
        if ( ArkWeb.defined(cartesian)) {
            this.currentActivePolygonpointsList .push(cartesian);
        }
    }

    overlayAnalysis(): void {
        const preCatoPos = [];
        this.prePointsList.forEach(cartesian2 => {
          const cartographic = ArkWeb.Cartographic.fromCartesian(cartesian2);
          const carPos = [] ;
          carPos.push(cartographic.longitude / Math.PI * 180.0);
          carPos.push(cartographic.latitude / Math.PI * 180.0);
          preCatoPos.push(carPos);
        });
        const carPos0 = [] ;
        const cartographic0 = ArkWeb.Cartographic.fromCartesian(this.prePointsList[0]);
        carPos0.push(cartographic0.longitude / Math.PI * 180.0);
        carPos0.push(cartographic0.latitude / Math.PI * 180.0);
        preCatoPos.push(carPos0);

        const aftCatoPos = [];
        this.currentpolygonpointsList.forEach(cartesian6 => {
          const cartographic = ArkWeb.Cartographic.fromCartesian(cartesian6);
          const carPos = [] ;
          carPos.push(cartographic.longitude / Math.PI * 180.0);
          carPos.push(cartographic.latitude / Math.PI * 180.0);
          aftCatoPos.push(carPos);
        });
        const carPos1 = [] ;
        const cartographic1 = ArkWeb.Cartographic.fromCartesian(this.currentpolygonpointsList[0]);
        carPos1.push(cartographic1.longitude / Math.PI * 180.0);
        carPos1.push(cartographic1.latitude / Math.PI * 180.0);
        aftCatoPos.push(carPos1);
        const prePolygon = turf.polygon([preCatoPos]);
        const aftPolygon = turf.polygon([aftCatoPos], {
            // tslint:disable-next-line:object-literal-key-quotes
            'fill': '#F00',
            'fill-opacity': 0.1
          });

        const difference = turf.intersect(prePolygon, aftPolygon);
        const diffpolygonPosition = [];
        let currentArea = 0;
        if (difference) {
            const differencePolygonCartographic =  difference.geometry.coordinates[0];
            if (differencePolygonCartographic.length > 0 ) {
                for (const diffCartographic  of differencePolygonCartographic) {
                    // const cartographicPos: Array = ;
                    const lon = diffCartographic[0];
                    const lat = diffCartographic[1] ;
                    diffpolygonPosition.push(ArkWeb.Cartesian3.fromDegrees(lon, lat, 0));
                }
                // differencePolygonCartographic.forEach(cartographicPos => {
                //     // const lon = cartographicPos[0] / Math.PI * 180.0;
                //     // const lat = cartographicPos[1] / Math.PI * 180.0;
                //     // diffpolygonPosition.push(ArkWeb.Cartesian3.fromDegrees(lon, lat, 0));
                //     diffpolygonPosition.push(ArkWeb.Cartesian3.fromDegrees(106, 30, 0));
                // });
                const redEllipse = this.core.viewer.entities.add({
                    polygon : {
                        hierarchy: new ArkWeb.CallbackProperty(() => {
                            return diffpolygonPosition;
                        }, false),
                        material: new ArkWeb.ColorMaterialProperty(ArkWeb.Color.RED),
                    }
                });
                this.basicTool.measurePolygonCollection.push(redEllipse);
                currentArea = turf.area(difference);

            }
        }
        const  arePre = turf.area( prePolygon);
        const areaAft = turf.area( aftPolygon);
/////////


        // currentArea = this.coordinateCoutTool.countAreaInCartesian3( diffpolygonPosition);

        let labelText = '面积差：';
        if (currentArea < 1000000) {
            labelText  = labelText + currentArea.toFixed(2) + `平方米  \n面积和：`;
            labelText  = labelText + (arePre + areaAft - currentArea).toFixed(2) + `平方米`;
        } else {
            labelText = labelText + (currentArea / 1000000 ).toFixed(2) + `平方千米  \n总面积和：`;
            labelText  = labelText + (arePre / 1000000 + areaAft / 1000000 - currentArea / 1000000).toFixed(2) + `平方千米`;
        }

        let redCartographic = ArkWeb.Cartographic.fromCartesian(this.currentpolygonpointsList[0]);

        if ( diffpolygonPosition.length < 3  ) {
        } else {
            redCartographic = ArkWeb.Cartographic.fromCartesian(diffpolygonPosition[0]);
        }
        redCartographic.height = redCartographic.height + 2000.0;
        const newCartographic = new ArkWeb.Cartographic(redCartographic.longitude, redCartographic.latitude, 0);
        const height = this.core.viewer.scene.globe.getHeight(newCartographic) + 5;
        // tslint:disable-next-line:max-line-length
        const cartesian = ArkWeb.Cartographic.toCartesian(new ArkWeb.Cartographic(newCartographic.longitude, newCartographic.latitude, height));

        // currentArea = this.coordinateCoutTool.countAreaInCartesian3(diffpolygonPosition);
        if ( ArkWeb.defined(currentArea)) {
            this.basicTool.measureLableCollection.add({
                position: cartesian,
                text : labelText,
                font : '18px Arial',
                fillColor: ArkWeb.Color.YELLOW,
                outlineColor: ArkWeb.Color.GREEN,
                // heightReference: ArkWeb.HeightReference.CLAMP_TO_GROUND,
                style: ArkWeb.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: ArkWeb.VerticalOrigin.BOTTOM,
                disableDepthTestDistance : Number.POSITIVE_INFINITY
            });
        }
        this.prePointsList =  [];
        this.currentpolygonpointsList = [];
    }

    clearTool(): void {
        this.currentpolygonpointsList = [];
        this.prePointsList =  [];
        this.currentActivePolygonpointsList = [];

    }
}
