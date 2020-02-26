import {
  Injectable
} from '@angular/core';
import {
  ConfigService
} from './config.service';
import { dataResource } from '../../modules/resource';
import { TooltipService } from './tooltip/tooltip.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  viewer = null;

  constructor(private config: ConfigService, private tooltip: TooltipService) {}

  create(el) {
    this.viewer = new ArkWeb.Viewer(el,{ terrainExaggeration : 2.0});

    this.viewer.extend(ArkWeb.viewerArkWebNavigationMixin, {});

    this.tooltip.create();



    // const data = `http://10.6.172.177:8092/chongq/json/provider.json`;
    const data = `/assets/mock/provider.json`;
    const dataStr = ArkWeb.Resource.createIfNeeded(data);
    dataStr.fetchJson().then((jsonData) => {
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      if (jsonData.Terrain) {
        const terrainProvider = new ArkWeb.ArkWebTerrainProvider({
          url: jsonData.Terrain
        });
        this.viewer.terrainProvider = terrainProvider;
      }
      if (jsonData.Tidandi) {
        const imgProvider = new ArkWeb.WebMapTileServiceImageryProvider({
          url: jsonData.Tidandi + '&tk=b6673f69c76ae272825e3bf1071f8d3f',
          layer: 'tdtBasicLayer',
          style: 'default',
          format: 'image/jpeg',
          tileMatrixSetID: 'GoogleMapsCompatible',
          show: false
        });
        this.viewer.imageryLayers.addImageryProvider(imgProvider);
      }
      if (jsonData.Arcgis) {
        dataResource.map ((datas) => {
          if (datas.data[0].type === 'ArcGisMapServerImageryProvider') {
            datas.data[0].options.url = jsonData.Arcgis;
          }
        });

      }
    });
  }


}
