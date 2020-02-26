// 可选数据源
export const dataResource = [{
  id: 1,
  name: '高德地图',
  images: '/assets/themes/default/images/maptype_b.png',
  data: [{
    type: 'UrlTemplateImageryProvider',
    method: 'addImageryProvider',
    options: {
      // tslint:disable-next-line:max-line-length
      url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      layer: 'tdtBasicLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      show: false
    }
  }]
}, {
  id: 2,
  name: '内网',
  images: '/assets/themes/default/images/maptype_b.png',
  data: [{
    type: 'ArcGisMapServerImageryProvider',
    method: 'addImageryProvider',
    options: {
      url: ''
    }
  }]
}, {
  id: 3,
  name: '天地图影像',
  images: '/assets/themes/default/images/maptype_b.png',
  data: [{
    type: 'WebMapTileServiceImageryProvider',
    method: 'addImageryProvider',
    options: {
      // tslint:disable-next-line:max-line-length
      url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=b6673f69c76ae272825e3bf1071f8d3f',
      layer: 'tdtBasicLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      show: false
    }
  }]
}];
