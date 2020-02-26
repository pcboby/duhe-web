import {
  Injectable
} from '@angular/core';
import {
  CoreService
} from '../core.service';
import { DrawPolylineService } from '../draw-tool/draw-polyline.service';
import { EntityToolService } from '../basic-entity/add-entities.service';
import { DrawWaterService } from '../draw-tool/draw-water.service';
import { PointBillService } from '../flood1954/city-point.service';

@Injectable({
  providedIn: 'root'
})

export class VectorMangerService {
    vectorMap = new Map() ; // 矢量数据管理

    constructor(
      private core: CoreService,
      private polyline: DrawPolylineService,
      private entityService: EntityToolService,
      private pointsLabel: PointBillService,
      private waterPolygon: DrawWaterService
    ) {}

    private defaultOption = {
        fillColor: ArkWeb.Color.GREEN.withAlpha(0.6),
        lineWidth: 5
      };

    addvector(param) {
        if (param.vectorType === 'POLYLINE' || param.vectorType === 'polyline' ) {
            this.polyline.addLineFromGeoJson( param.url, {});
        } else if (param.vectorType === 'ArcGis' || param.vectorType === 'arcgis' || param.vectorType === 'ARCGIS') {
            this.addArcGISMapServer(param);
        } else if ( param.vectorType === 'POINT' || param.vectorType === 'point') {
            this.addPointGeoJson(param);
        } else if ( param.vectorType === 'LINE' || param.vectorType === 'line') {
            this.addLineGeoJson(param);
        } else if ( param.vectorType === 'POLYGON' || param.vectorType === 'polygon') {
            this.addpolygonGeoJson(param);
        } else if ( param.vectorType === 'water' || param.vectorType === 'WATER'  ) {
            this.addWaterGeoJson(param);
        } else if (param.vectorType === 'wms' || param.vectorType === 'WMS') {
            this.addWMSServer(param);
        } else if (param.vectorType === 'wmts' || param.vectorType === 'WMTS') {
            this.addWMTSServer(param);
        }
    }

    removevector(param) {
        if (param.vectorType === 'ArcGis' || param.vectorType === 'arcgis' || param.vectorType === 'ARCGIS') {
            this.removercGISMapServer(param);
        } else if ( param.vectorType === 'POINT' || param.vectorType === 'point') {
            this.removePointGeoJson(param);
        } else if ( param.vectorType === 'LINE' || param.vectorType === 'line') {
            this.removeLineGeoJson(param);
        } else if ( param.vectorType === 'POLYGON' || param.vectorType === 'polygon') {
            this.removepolygonGeoJson(param);
        } else if ( param.vectorType === 'water' || param.vectorType === 'WATER'  ) {
            this.removeWaterGeoJson(param);
        } else if (param.vectorType === 'wms' || param.vectorType === 'WMS') {
            this.removerWmsServer(param);
        } else if (param.vectorType === 'wmts' || param.vectorType === 'WMTS') {
            this.removerWmsServer(param);
        }
    }

    // add ArcGIS MapServer
    addArcGISMapServer(param) {
        if (ArkWeb.defined(param.url)) {
            const ArcGisUrl = param.url;
            const imageryProvider2 = new ArkWeb.ArcGisMapServerImageryProvider({
                url: ArcGisUrl
            });
            const l2 = this.core.viewer.imageryLayers.addImageryProvider(imageryProvider2);
            if (ArkWeb.defined(param.alpha)) {
                l2['alpha'] = param.alpha;
            }
            this.vectorMap.set(param.url, l2 );
        }
    }

    addWMSServer(param) {
        if (ArkWeb.defined(param.url && param.layers)) {
            const wmsUrl = param.url ;
            const imageryProvider2 = new ArkWeb.WebMapServiceImageryProvider({
                      url: wmsUrl,
                      layers:  ArkWeb.defaultValue(param.layers , ''),
                      parameters: {
                                    service: 'WMS',
                                    format:  ArkWeb.defaultValue(param.format, 'image/png'),
                                    transparent: ArkWeb.defaultValue(param.transparent, true),
                                }
                    });
            const l2 = this.core.viewer.imageryLayers.addImageryProvider(imageryProvider2);
            if (ArkWeb.defined(param.alpha)) {
                l2['alpha'] = param.alpha;
            }
            this.vectorMap.set(param.url + param.key, l2 );
        }
    }

    addWMTSServer(param) {
        // return;
        const wmtsUrl = param.url ;
        const imageryProvider2 = new ArkWeb.WebMapTileServiceImageryProvider({
            url : wmtsUrl,
            layer : ArkWeb.defaultValue(param.layer , ''),
            style : ArkWeb.defaultValue(param.style, 'default'),
            format : ArkWeb.defaultValue(param.format,  'image/jpeg'),
            tileMatrixSetID : ArkWeb.defaultValue(param.tileMatrixSet, 'default028mm')
        });
        debugger
        imageryProvider2.defaultAlpha = 1.0;

        const l2 = this.core.viewer.imageryLayers.addImageryProvider(imageryProvider2);
        if (ArkWeb.defined(param.alpha)) {
            l2['alpha'] = param.alpha;
        }
        this.vectorMap.set(param.url + param.key, l2 );
    }
    removercGISMapServer(param) {
        if (this.vectorMap.get(param.url)) {
            const imageryLayers = this.core.viewer.imageryLayers;
            imageryLayers.remove(this.vectorMap.get(param.url), false);
            this.vectorMap.delete(param.url);
        }
    }

    removerWmsServer(param) {
        if (this.vectorMap.get(param.url + param.key)) {
            const imageryLayers = this.core.viewer.imageryLayers;
            imageryLayers.remove(this.vectorMap.get(param.url + param.key), false);
            this.vectorMap.delete(param.url + param.key);
        }
    }
    // 添加点矢量GeoJson
    addPointGeoJson(param) {
        if (ArkWeb.defined(param.url)) {
            if (this.vectorMap.get(param.url)) {
                return;
            }
            if (ArkWeb.defined(param.lableColor)) {
                if (typeof param.lableColor === 'string') {
                    param.lableColor = ArkWeb.Color.fromCssColorString(param.lableColor);
                }
            }
            const sid = this.pointsLabel.addPointGeoJson(param.url,  param);
            this.vectorMap.set(param.url, sid);
        }
    }
    removePointGeoJson(param) {
        if (this.vectorMap.get(param.url)) {
            const sid = this.vectorMap.get(param.url);
            this.pointsLabel.removePointGeoJson(param.url,  sid);
            this.vectorMap.delete(param.url);
        }
    }

    // 添加线矢量GeoJson
    addLineGeoJson(param) {
        if (ArkWeb.defined(param.url)) {
            if (this.vectorMap.get(param.url)) {
                return;
            }
            const sid = this.polyline.addLineFromGeoJson(param.url,  param);
            this.vectorMap.set(param.url, sid);
        }
    }
    removeLineGeoJson(param) {
        if (this.vectorMap.get(param.url)) {
            const sid = this.vectorMap.get(param.url);
            this.polyline.removePolyline(  sid);
            this.vectorMap.delete(param.url);
        }
    }


    // 添加线矢量GeoJson
    addpolygonGeoJson(param) {
        if (ArkWeb.defined(param.url)) {
            if (this.vectorMap.get(param.url)) {
                return;
            }
            const param2 = param;
            if (ArkWeb.defined(param.originColor)) {
                if (typeof param2.originColor === 'string') {
                    param2.originColor = ArkWeb.Color.fromCssColorString(param2.originColor);
                }
            }
            const pid = this.entityService.AddGeoJsonDataSource(param.url, param2);
            this.vectorMap.set(param.url, pid);
        }

    }
    removepolygonGeoJson(param) {
        if (ArkWeb.defined(param.url)) {
            const sid = this.vectorMap.get(param.url);
            if (sid) {
                this.entityService.removeEntity(sid);
                this.vectorMap.delete(param.url);
            }
        }
    }
    // 添加水面GeoJson
    addWaterGeoJson(param) {
        if (ArkWeb.defined(param.url)) {
            if (this.vectorMap.get(param.url)) {
                return;
            }
            const addWaterGeojson = true;
            const pid = this.waterPolygon.addWaterGeojson(param.url, param, addWaterGeojson);
            this.vectorMap.set(param.url, pid);
        }
    }

    removeWaterGeoJson(param) {
        if (ArkWeb.defined(param.url)) {
            const sid = this.vectorMap.get(param.url);
            if (sid) {
                this.waterPolygon.removePolygon(sid);
                this.vectorMap.delete(param.url);
            }
        }
    }
}
