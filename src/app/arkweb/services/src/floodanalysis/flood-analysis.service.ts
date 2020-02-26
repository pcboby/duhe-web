import {
  Injectable
} from '@angular/core';
import {
  CoreService
} from '../core.service';
import {
  toNumber
} from 'ng-zorro-antd';
import {
  DrawPolygonService
} from '../draw-tool/draw-polygon.service';
import {
  SpinnerService
} from 'src/app/core/services/local/spinner/spinner.service';
// import {
//   TooltipService
// } from '../tooltip/tooltip.service';


@Injectable({
  providedIn: 'root'
})
export class FloodAnalysisService {

  // tslint:disable-next-line:variable-name
  private waterEntities = [];
  private waterRec = null;
  private currentDataSource = [];
  private hasEntity = false;
  private entityCollection = new ArkWeb.EntityCollection();

  constructor(
    private loader: SpinnerService,
    private drawPoygonTool: DrawPolygonService,
    private core: CoreService,
    // private tooltip: TooltipService
  ) {}

  /**
   * 在场景中添加水面矢量
   * @param polygonGeometryInstance GeometryInstance格式多边形
   */
  addFloodEntity(polygonGeometryInstance) {}

  AddFloodNetGeoJson(geoSrc, param): void {
    const dataStr = ArkWeb.Resource.createIfNeeded(geoSrc);
    // let promise = dataStr.fetchJson().then(function(jsonData) {
    const originColor = ArkWeb.Color.fromBytes(0, 0, 200, 10);
    dataStr.fetchJson().then((jsonData) => {
      if (jsonData.type === `FeatureCollection`) {
        // thisSource.load(thisSource, jsonData,)
        jsonData.features.forEach(perFeature => {
          if (perFeature.type === 'Feature') {
            // Add the entity to the collection.
            const entity = this.drawPoygonTool.newPolygonJson(perFeature, {
              heightToGround: 10
            });
            if (entity) {
              this.entityCollection.add(entity);
            }

          }
        });
      }
      this.core.viewer.zoomTo(this.entityCollection.values);
      // this.core.viewer.dataSources.add(dataSource);
      this.core.viewer.scene.primitives.add(this.entityCollection);
    });
    // features
  }
  /**
   * @param geoSrc 多边形geojson三角网格数据路径
   * @param colorHash 水面网格颜色对象
   */
  AddFloodNet(geoSrc, param): void {
    if (this.hasEntity) {
      this.RemoveCurrentNet();
    }
    const isClampToGround = ArkWeb.defaultValue(param.isClampToGround, false);
    let isSetEveryEntity = false;
    let currentHeight = null;
    if (param.height && isClampToGround === false) {
      currentHeight = ArkWeb.defaultValue(param.height, false);
      isSetEveryEntity = true;
      // isClampToGround = false;
    }
    // this.loader.show('正在渲染淹没数据....');
    // const originColor = ArkWeb.Color.fromBytes(0, 0, 200, 100);
    const originColor = ArkWeb.Color.fromRandom({
      red: 0,
      maximumGreen: 0.3,
      minimumBlue: 0.4,
      alpha: 0.01
    });
    const promise = ArkWeb.GeoJsonDataSource.load(geoSrc, {
      stroke: originColor,
      fill: originColor,
      clampToGround: isClampToGround
    });
    promise.then((dataSource) => {
      // promise.then(function(dataSource) {
      this.loader.show('正在渲染淹没数据....');
      this.currentDataSource = dataSource;
      this.waterEntities = dataSource.entities.values;
      this.hasEntity = true;
      if (isSetEveryEntity) {
        this.waterEntities.forEach(entity => {
          if (currentHeight) {
            entity.polygon.height = currentHeight;
          }
        });

      }
      this.core.viewer.dataSources.add(dataSource);
      // console.log('zoom', ) ;
      this.core.viewer.zoomTo(dataSource);
      this.loader.hide();


      // // 显示tooltip
      // this.core.viewer.screenSpaceEventHandler.setInputAction(movement => {
      //   const pickedFeature = this.core.viewer.scene.pick(movement.endPosition);
      //   if (!ArkWeb.defined(pickedFeature)) {
      //     this.tooltip.hide();
      //     return;
      //   }
      //   // console.log('######', pickedFeature, pickedFeature.id._id);
      //   const contentText = pickedFeature.id._id; // pickedFeature.getProperty('name');
      //   this.tooltip.show(contentText, {
      //     bottom: this.core.viewer.canvas.clientHeight - movement.endPosition.y + 'px',
      //     left: movement.endPosition.x + 'px'
      //   });

      // }, ArkWeb.ScreenSpaceEventType.MOUSE_MOVE);



    }).otherwise((error) => {
      console.log(error);
      this.loader.hide();
    });
  } // AddWaterNet

  AddFoodRec(geoSrc, y , param) {
    
    const dataStr = ArkWeb.Resource.createIfNeeded(geoSrc + '/coordinate.json');
    const originColor = ArkWeb.Color.fromBytes(0, 0, 200, 10);
    dataStr.fetchJson().then((jsonData) => {
    const lonmax = ArkWeb.defaultValue(jsonData.xMax, 100.1);
    const lonmin = ArkWeb.defaultValue(jsonData.xMin, 100);
    const latmax = ArkWeb.defaultValue(jsonData.yMax, 30.1);
    const latmin = ArkWeb.defaultValue(jsonData.yMin, 30);

    const rectangle = ArkWeb.Rectangle.fromDegrees(lonmin, latmin, lonmax, latmax);
    // this.core.viewer.camera.setView({
    //     destination: rectangle
    // });
    
      this.core.viewer.camera.flyTo({
        destination: rectangle
      });
    const currentMateria = ArkWeb.defaultValue(param.image ,  ArkWeb.Color.WHITE.withAlpha(7.0));
    this.waterRec = this.core.viewer.entities.add({
          name : 'polygon on surface',
          rectangle : {
              coordinates : ArkWeb.Rectangle.fromDegrees(lonmin, latmin, lonmax, latmax),
              material : currentMateria
          }
      });
    });
  }

  RemoveCurrentNet(): void {
    if (this.hasEntity) {
      this.core.viewer.dataSources.remove(this.currentDataSource);
      this.hasEntity = false;
    }
    if (this.waterRec) {
      this.core.viewer.entities.remove(this.waterRec);
    }
  }

  getFloodAnaysisState() {
    return this.hasEntity;
  }
  
  changeRecColor(img): void {
    if (this.waterRec) {
      this.waterRec._rectangle.material = img;
    }
  }

  changeFloodNetColor(colorHash): void {
    // let i = 0;
    this.waterEntities.forEach(entity => {
      let color = ArkWeb.Color.fromBytes(0, 0, 200, 0);

      if (entity.properties._GDIDS) {
        const idNew = entity.properties._GDIDS.getValue();
        const allId = idNew.split(',');
        let count = 0;
        for (const cID of allId) {
          let curID = `BB02-`;
          if (count === 0) {
            curID = curID + cID;
          } else {
            const netId = toNumber(cID) + toNumber(idNew.split(',')[0]);
            curID = curID + netId;
          }
          count++;
          if (colorHash && ArkWeb.defined(colorHash[curID])) {
            color = ArkWeb.Color.fromCssColorString(colorHash[curID].style.color);
            if (color.alpha === 1) {
              color = color.withAlpha(0.6);
              // console.log('s', curID);
              break;
            }
          }
        }


        const firstId = `BB02-` + idNew.split(',')[0];
        if (colorHash && ArkWeb.defined(colorHash[firstId])) {
          color = ArkWeb.Color.fromCssColorString(colorHash[firstId].style.color);
          if (color.alpha === 1) {
            color = color.withAlpha(0.6);
          }
        }

      } else if (entity.properties.gridcode) {
        const firstId = entity.properties.gridcode.getValue();
        // console.log(firstId);
        const netId = toNumber(firstId);
        if (netId < colorHash.length) {
          if (colorHash && ArkWeb.defined(colorHash[firstId].style)) {
            // if (ArkWeb.defined(colorHash[firstId].style.color)) {
            color = ArkWeb.Color.fromCssColorString(colorHash[firstId].style.color);
          }
        }

      }
      entity.polygon.material = color;
      entity.polygon.outline = false;
    });

  }
  changeNetColor(datalist, styleList, propertyName, key): void {
    this.waterEntities.forEach(entity => {
      let color = ArkWeb.Color.fromBytes(0, 100, 200, 10);

      if (entity.properties[propertyName]) {
        const firstId = entity.properties[propertyName].getValue();
        // console.log(firstId);
        const netId = toNumber(firstId);
        if (netId < datalist.length) {
          const keyValue = datalist[netId][key] - 1;
          if (netId < datalist.length) {
            if (datalist && ArkWeb.defined(keyValue) && ArkWeb.defined(styleList[keyValue])) {
              const colorStr = styleList[keyValue].color;
              color = ArkWeb.Color.fromCssColorString(colorStr);
            }
          }
        }

      }
      entity.polygon.material = color;
      entity.polygon.outline = false;
    });

  }
}
