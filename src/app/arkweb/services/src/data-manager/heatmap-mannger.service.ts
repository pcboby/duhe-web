import {
  Injectable
} from '@angular/core';
import {
  CoreService
} from '../core.service';
import { DrawPolylineService } from '../draw-tool/draw-polyline.service';
import { PointBillService } from '../flood1954/city-point.service';
import { EntityToolService } from '../basic-entity/add-entities.service';
// import { polygon } from '@turf/turf';
import heatmapjs from 'heatmap.js';

@Injectable({
  providedIn: 'root'
})

export class HeatmapMangerService {
    heatMap = new Map() ; // 矢量数据管理

    constructor(
      private core: CoreService,
      private polyline: DrawPolylineService,
      private entityService: EntityToolService,
      private pointsLabel: PointBillService
    ) {}


    addHeatMap(geoSrc, param) {
        if (this.heatMap.get(geoSrc)) {
            return;
        }
        // geoSrc = '/assets/mock/flood/shp/reservoir2.json';
        const dataStr = ArkWeb.Resource.createIfNeeded(geoSrc);
        let minlat = 90;
        let minlon = 180;
        let maxlat = -90;
        let maxlon = -180;

        this.heatMap.set(geoSrc, null);

        // let promise = dataStr.fetchJson().then(function(jsonData) {
        dataStr.fetchJson().then((jsonData) => {
        const points = [];
        let max = 0;
        let i = 0;
        console.log(jsonData);
        if ( jsonData.features) {
            jsonData.features.forEach(feature => {
                maxlat = Math.max(maxlat, feature.geometry.coordinates[1]);
                minlat = Math.min(minlat, feature.geometry.coordinates[1]);
                maxlon = Math.max(minlon, feature.geometry.coordinates[0]);
                minlon = Math.min(minlon, feature.geometry.coordinates[0]);
            });
            const maxlat1 = Math.ceil(maxlat);
            const minlat1 = Math.floor(minlat);
            const maxlon1 = Math.ceil(maxlon);
            const minlon1 = Math.floor(minlon);
            const detalon = ( maxlon1 - minlon1 ) / 2;
            const detalat = ( maxlat1 - minlat1 ) / 2;
            const deta = Math.ceil(Math.max(detalon, detalat));
            minlon = (minlon1 + maxlon1) / 2 - deta;
            maxlon = (minlon1 + maxlon1) / 2 + deta;
            minlat = (minlat1 + maxlat1) / 2 - deta;
            maxlat = (minlat1 + maxlat1) / 2 + deta;
            
            jsonData.features.forEach(feature => {
                const x1 =  Math.round((feature.geometry.coordinates[0] - minlon) * 500 / deta );
                const y1 = 1000 - Math.round((feature.geometry.coordinates[1] - minlat) * 500 /  deta );
                const val = Math.round(Math.random() * 1000);
                max = Math.max(max, val);
                const point = {
                    x: x1,
                    y: y1,
                    value: val
                };
                points.push(point);
                i++;
            });
            // jsonData.features.forEach(feature => {
            //     const x1 =  Math.floor((feature.geometry.coordinates[0] - 60) * 10);
            //     const y1 = 1000 - Math.floor((feature.geometry.coordinates[1] + 35) * 10);
            //     const val = Math.floor(Math.random() * 1000);
            //     max = Math.max(max, val);
            //     const point = {
            //         x: x1,
            //         y: y1,
            //         value: val
            //     };
            //     points.push(point);
            //     i++;
            // });
        } else if (jsonData.geometries) {
            jsonData.geometries.forEach(geometry => {
                maxlat = Math.max(maxlat, geometry.coordinates[1]);
                minlat = Math.min(minlat, geometry.coordinates[1]);
                maxlon = Math.max(minlon, geometry.coordinates[0]);
                minlon = Math.min(minlon, geometry.coordinates[0]);
            });
            const maxlat1 = Math.ceil(maxlat);
            const minlat1 = Math.floor(minlat);
            const maxlon1 = Math.ceil(maxlon);
            const minlon1 = Math.floor(minlon);
            const detalon = ( maxlon1 - minlon1 ) / 2;
            const detalat = ( maxlat1 - minlat1 ) / 2;
            const deta = Math.ceil(Math.max(detalon, detalat));
            minlon = (minlon1 + maxlon1) / 2 - deta;
            maxlon = (minlon1 + maxlon1) / 2 + deta;
            minlat = (minlat1 + maxlat1) / 2 - deta;
            maxlat = (minlat1 + maxlat1) / 2 + deta;
            
            jsonData.geometries.forEach(geometry => {
                const x1 =  Math.floor((geometry.coordinates[0] - 90) * 20);
                const y1 = 1000 - Math.floor((geometry.coordinates[1] + 5) * 20);
                const val = Math.floor(Math.random() * 100);
                max = Math.max(max, val);
                const point = {
                    x: x1,
                    y: y1,
                    value: val
                };
                points.push(point);
                i++;
            });

        }
            // return {max: max, data: points}

        // const coordinate2 = [60.0, -35.0, 160.0, 65.0];
        // const maxdeta = Math.
        const coordinate2 = [minlon, minlat, maxlon, maxlat];
        const heatMap2 = this.createHeatMap(max, points, param);
        console.log('max2', max);
        this.creatRectangle(this.core.viewer, coordinate2, heatMap2 , geoSrc);
    });

            // viewer.dataSources.add(ArkWeb.GeoJsonDataSource.load(geoSrc));
    }

    removeHeatMap(param) {
        if  (param.url) {
            const heat = this.heatMap.get(param.url);
            this.core.viewer.entities.remove(heat);
            this.heatMap.delete(param.url);
        }
    }

///////////////////////////////////////////////
    private creatRectangle(viewer, coordinate, heatMap, id) {
        const enty =  viewer.entities.add({
            name: 'Rotating rectangle with rotating texture coordinate',
            show: true,
            rectangle: {
                coordinates: ArkWeb.Rectangle.fromDegrees(coordinate[0], coordinate[1], coordinate[2], coordinate[3]),
                material: heatMap._renderer.canvas // 核心语句，填充热力图
            }
        });
        this.heatMap.set(id, enty);
    }

    private createHeatMap(hmax, hdata, param) {
        // 创建元素
        const heatDoc = document.createElement("div");
        heatDoc.setAttribute("style", "width:1000px;height:1000px;margin: 0px;display: none;");
        document.body.appendChild(heatDoc);
        const heatmapOpt = {
            container: heatDoc,
            radius: ArkWeb.defaultValue(param.radius, 10) ,
            maxOpacity: ArkWeb.defaultValue(param.maxOpacity, 0.7),
            minOpacity: ArkWeb.defaultValue(param.minOpacity,  0.0),
            blur: ArkWeb.defaultValue(param.blur, 0.95),
            gradient: ArkWeb.defaultValue(param.gradient, {
                '0.95': 'red',
                '0.86': 'orange',
                '0.73': 'pink',
                '0.6': 'yellow',
                '0.5': 'blue',
                '0.3': 'white',
                '0.1': 'green',
            }),
        };
        // 创建热力图对象
        const heatmap = h337.create(heatmapOpt);
        // 添加数据
        heatmap.setData({
            max: hmax,
            data: hdata
        });
        return heatmap;
    }

}
