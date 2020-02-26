import {
  dataResource
} from './../../modules/resource';
import {
  Component,
  OnInit
} from '@angular/core';
import { ArkwebService } from '../../services/arkweb.service';

@Component({
  selector: 'app-arkweb-resource',
  templateUrl: './arkweb-resource.component.html',
  styleUrls: ['./arkweb-resource.component.scss']
})
export class ArkwebResourceComponent implements OnInit {

  selected = 3;

  dataset = dataResource;
  currentImagery = null;

  get selectedItem() {
    return this.dataset.find(item => item.id === this.selected);
  }

  constructor(private arkweb: ArkwebService) {}

  ngOnInit() {}

  onCheckItem(id) {
    this.selected = id;

    const type2 = this.dataset[id - 1].data[0].type;
    if (this.currentImagery === null) {
      this.currentImagery = this.arkweb.core.viewer.imageryLayers._layers[1];
    }
    this.arkweb.core.viewer.imageryLayers.remove(this.currentImagery);
    if ( type2 === 'WebMapTileServiceImageryProvider' ) {
      this.addWebMapTileService(this.dataset[id - 1].data[0].options) ;
    } else if (type2 === 'ArcGisMapServerImageryProvider' ) {
      this.addArcGisService(this.dataset[id - 1].data[0].options);
    } else if (type2 === 'UrlTemplateImageryProvider') {
      this.addUrlTemplate(this.dataset[id - 1].data[0].options);
    }
  }

  addWebMapTileService(param) {
    const imgProvider = new ArkWeb.WebMapTileServiceImageryProvider({
      url: param.url,
      layer: ArkWeb.defaultValue(param.layer , 'tdtBasicLayer'),
      style: ArkWeb.defaultValue(param.style , 'default'),
      format: ArkWeb.defaultValue(param.format , 'image/jpeg'),
      tileMatrixSetID: ArkWeb.defaultValue(param.tileMatrixSetID , 'GoogleMapsCompatible'),
      show: ArkWeb.defaultValue(param.tileMatrixSetID.show , false)
    });
    this.currentImagery = this.arkweb.core.viewer.imageryLayers.addImageryProvider(imgProvider);
    this.arkweb.core.viewer.imageryLayers.lowerToBottom(this.currentImagery);
    this.arkweb.core.viewer.imageryLayers.raise(this.currentImagery);
  }

  addArcGisService(param) {
    const imageryProvider2 = new ArkWeb.ArcGisMapServerImageryProvider({
        url: param.url
    });
    this.currentImagery = this.arkweb.core.viewer.imageryLayers.addImageryProvider(imageryProvider2);
    this.arkweb.core.viewer.imageryLayers.lowerToBottom(this.currentImagery);
    this.arkweb.core.viewer.imageryLayers.raise(this.currentImagery);
  }

  addUrlTemplate(param) {
    const provider = new ArkWeb.UrlTemplateImageryProvider({
                      url: param.url,
                  });
    this.currentImagery = this.arkweb.core.viewer.imageryLayers.addImageryProvider(provider);
    this.arkweb.core.viewer.imageryLayers.lowerToBottom(this.currentImagery);
    this.arkweb.core.viewer.imageryLayers.raise(this.currentImagery);
    // function swapLayers(collection, i, j)
        //   this.viewer.imageryLayers.addImageryProvider(new ArkWeb.UrlTemplateImageryProvider({
        //                 url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        //     //            layer: "tdtAnnoLayer",
        //     //            style: "default",
        //     //            format: "image/jpeg",
        //     //            tileMatrixSetID: "GoogleMapsCompatible"
        //             }));
  }

}
