import {
  Injectable
} from '@angular/core';
import {
  CoreService
} from '../core.service';
import { DrawPolylineService } from '../draw-tool/draw-polyline.service';
import { PointBillService } from '../flood1954/city-point.service';
import { EntityToolService } from '../basic-entity/add-entities.service';

@Injectable({
  providedIn: 'root'
})

export class ModelMangerService {
    modelMap = new Map() ; // 矢量数据管理
    currentModelList = [];

    constructor(
      private core: CoreService,
      private polyline: DrawPolylineService,
      private entityService: EntityToolService,
      private pointsLabel: PointBillService
    ) {}


    addmodel(param) {
      const murl = param.url.toString();

      if (ArkWeb.defined(murl)) {
        // 获取总的json数据
        const dataStr = ArkWeb.Resource.createIfNeeded(murl);
        dataStr.fetchJson().then((jsonData) => {

          // const fileName = jsonData.fileName;
          // const fileChnName = jsonData.fileChnName;
          // const longitude = ArkWeb.defaultValue( jsonData.longitude, 105);
          // const latitude = ArkWeb.defaultValue( jsonData.latitude, 30);
          // const altitude = ArkWeb.defaultValue( jsonData.altitude, 0.0);
          const heightOffset = ArkWeb.defaultValue( jsonData.heightOffset, 0.0);
          // this.core.viewer.camera.flyTo({
          //   destination: ArkWeb.Cartesian3.fromDegrees(longitude, latitude, altitude)
          // });

          const jsonFileList = jsonData.jsonFileList;
          if (jsonFileList) {
            const arrayurl = murl.split('.json');
            if (arrayurl.length > 1) {
              const halfurl = arrayurl[0];
              jsonFileList.map((item) => {
                const urlnow = halfurl + '/' + item.toString() + '/tileset.json';
                this.add3DTileset(urlnow, param, heightOffset);
              });
            }
          } else {
            const urlnow = murl;
            this.add3DTileset(urlnow, param, heightOffset);
          }


        });
      }
    }
    add3DTileset(urlnow, param, offset?) {
      // const tmodel = new ArkWeb.ArkWeb3DTileset({
      //   url: urlnow
      // });
      const build = this.core.viewer.scene.primitives.add(new ArkWeb.ArkWeb3DTileset({
        url: urlnow
      }));

      let currentmodellist = [];
      if (this.modelMap.get(param.url)) {
        currentmodellist = this.modelMap.get(param.url);
      }
      currentmodellist.push(build);
      this.modelMap.set(param.url, currentmodellist);

      const heightOffset = ArkWeb.defaultValue(offset, 60.0) + ArkWeb.defaultValue( param.heightOffset, 0.0);
      build.readyPromise.then((tileset) => {
        const boundingSphere = tileset.boundingSphere;
        const cartographic = ArkWeb.Cartographic.fromCartesian(boundingSphere.center);
        const surface = ArkWeb.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        const offset = ArkWeb.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
        // const offset = ArkWeb.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        const translation = ArkWeb.Cartesian3.subtract(offset, surface, new ArkWeb.Cartesian3());
        tileset.modelMatrix = ArkWeb.Matrix4.fromTranslation(translation);
      }); // readyPromise

      // if (build !== null) {
      //   const tempModel = {
      //     title: '',
      //     type: null,
      //     model: null,
      //     code: null,
      //     url: urlnow
      //   };
      //   tempModel.title = param.title; // 中文
      //   tempModel.type = param.type;
      //   if (ArkWeb.defined(param.code)) {
      //     tempModel.code = param.code;
      //   }
      //   tempModel.model = build;
      //   // modelsList.push(tempModel);
      // }
    }

    removemodel(param) {
      
      if (param.url) {
        if (this.modelMap.get(param.url)) {
          const currentmodellist = this.modelMap.get(param.url);
          currentmodellist.map ((model) => {
            this.core.viewer.scene.primitives.remove(model);
          });

        }
        this.modelMap.delete(param.url);
      }
      // this.core.viewer.scene.primitives.remove(element.model);
    }

}
