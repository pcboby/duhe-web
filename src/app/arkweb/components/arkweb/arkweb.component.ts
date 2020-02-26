import {
  Component,
  OnInit,
  ElementRef,
  HostBinding,
  DebugElement
} from '@angular/core';
import {
  ArkwebService
} from '../../services/arkweb.service';

@Component({
  selector: 'app-arkweb',
  templateUrl: './arkweb.component.html',
  styleUrls: ['./arkweb.component.css']
})
export class ArkwebComponent implements OnInit {

  constructor(
    private el: ElementRef,
    private arkweb: ArkwebService
  ) {}

  ngOnInit() {
    this.arkweb.core.create(this.el.nativeElement);
    // this.loadShp();

    // const provider = new ArkWeb.WebMapServiceImageryProvider({
    //   url: 'http://10.6.172.178:6080/arcgis/rest/services/cjcenter/%E6%B3%B5%E7%AB%99/MapServer/WmsServer', // 服务地址
    //   layers: '0,5', // 接入图层
    //   tilingScheme: new ArkWeb.WebMercatorTilingScheme(), // web墨卡托
    //   getFeatureInfoFormats :  [new ArkWeb.GetFeatureInfoFormat('json', 'application/geojson')],  //获取格式，可以多种
    //   subdomains: ['30.237', '30.238', '30.239'], // 多域名
    //   parameters: {
    //       service: 'WMS',
    //       format: 'image/png',
    //       transparent: true
    //   }
    // });
    // this.arkweb.core.viewer.imageryLayers.addImageryProvider(provider);

    const rectangle = ArkWeb.Rectangle.fromDegrees(109.031, 31.276, 110.933, 32.992);
    this.arkweb.core.viewer.camera.flyTo({
        destination: rectangle
      });
  }

  loadShp() {
    // // 140个断面
    // this.arkweb.entityService.AddGeoJsonDataSource(`/assets/mock/flood/shp/Section_140.json`, {
    //   // isClampToGround: true
    //   originColor: ArkWeb.Color.fromBytes(0, 150, 200, 200),
    //   height: 180
    // });

    // // 断面中心点
    // this.arkweb.pointsLabel.addPointGeoJson(`/assets/mock/flood/shp/midPoint.json`, {
    //   icon: '/assets/themes/default/images/billboardIcons/placemark32.png',
    //   farDistanceCondition: 3.0e4,
    //   nearDistanceCondition: 0,
    //   boudingLabel: 'DMName',
    //   type: 'section'
    // });

    // 堵河流域范围
    this.arkweb.drawPolylineTool.addLineFromGeoJson(`/assets/mock/shp/DuheRiver.json`, {
      farDistanceCondition: 6.0e4,
      originColor: '#ffffff',
      nearDistanceCondition: 0,
      isClampToGround: true
    });

    // // 长江
    // // this.arkweb.drawPolylineTool.addLineFromGeoJson(`/assets/mock/flood/shp/ChangJiang.json`, {
    // //   farDistanceCondition :  6.0e6,
    // //   nearDistanceCondition :  6.0e4,
    // //   originColor: ArkWeb.Color.fromBytes(0, 100, 200, 255),
    // //   isClampToGround: true
    // // });
    // const imageryProvider2 = new ArkWeb.ArcGisMapServerImageryProvider({
    //   url: `http://10.6.172.178:6080/arcgis/rest/services/cjcenter/%E9%95%BF%E6%B1%9F%E6%B5%81%E5%9F%9F%E6%B2%B3%E6%B5%813857/MapServer`
    // });
    // this.arkweb.core.viewer.imageryLayers.addImageryProvider(imageryProvider2);

    // // 水库点
    this.arkweb.pointsLabel.addPointGeoJson(`/assets/mock/shp/Shuiku.json`, {
      icon: '/assets/themes/default/images/billboardIcons/flood/reservoir.png',
      farDistanceCondition: 7.0e5,
      nearDistanceCondition: 1.0e3,
      boudingLabel: 'Name',
      iconSize: 0.5,
      type: 'storage'
    });

    // // 河流名称
    // this.arkweb.drawlabelTool.addPointGeoJson(`/assets/mock/flood/shp/streamAndtributaryText.json`, {
    //   farDistanceCondition: 6.0e6,
    //   nearDistanceCondition: 3.0e4,
    //   boudingLabel: 'NAME',
    //   // lableColor:  ArkWeb.Color.fromCssColorString('#ffffff'),
    //   lableColor: ArkWeb.Color.WHITE,
    //   iconSize: 0.5
    // });

    // // 城市名 cityt.json
    // this.arkweb.pointsLabel.addPointGeoJson(`/assets/mock/flood/shp/cityt.json`, {
    //   icon: '/assets/themes/default/images/billboardIcons/placemark32.png',
    //   farDistanceCondition: 1.0e6,
    //   nearDistanceCondition: 100,
    //   boudingLabel: 'NAME',
    //   type: 'city'
    //   // addLabel: addl
    // });

    // $.ajax({
    //   url: "http://localhost:8082/geoserver/mytest/ows?service=WFS&request=GetFeature&typeName=mytest:river4&outputFormat=application/json",
    //   cache: false,
    //   async: true,
    //   success: function (data) {
    //     var datasource = ArkWeb.GeoJsonDataSource.load(data);
    //     viewer.dataSources.add(datasource);
    //   },
    //   error: function (data) {
    //   }
    // });

    // const provider = new ArkWeb.WebMapServiceImageryProvider({
    //   url: 'http://10.6.172.178:6080/arcgis/rest/services/cjcenter/%E6%B3%B5%E7%AB%99/MapServer/WmsServer', // 服务地址
    //   layers: '0,1', // 接入图层
    //   tilingScheme: new ArkWeb.WebMercatorTilingScheme(), // web墨卡托
    //   getFeatureInfoFormats :  [new ArkWeb.GetFeatureInfoFormat('json', 'application/geojson')],  //获取格式，可以多种
    //   subdomains: ['30.237', '30.238', '30.239'], // 多域名
    //   parameters: {
    //       service: 'WMS',
    //       format: 'image/png',
    //       transparent: true
    //   }
    // });


    // this.arkweb.core.viewer.imageryLayers.addImageryProvider(provider);
    // const geoSrc = 'http://10.6.172.178:6080/arcgis/rest/services/cjcenter/%E6%B3%B5%E7%AB%99/MapServer/WFSServer?request=GetCapabilities&service=WFS';
    // const dataStr = ArkWeb.Resource.createIfNeeded(geoSrc);
    // // let promise = dataStr.fetchJson().then(function(jsonData) {
    // const originColor = ArkWeb.Color.fromBytes(0, 0, 200, 50);
    // dataStr.fetchJson().then((jsonData) => {
    //   alert('');
    // });
  }

  @HostBinding('class')
  get className() {
    return 'arkweb';
  }

}
