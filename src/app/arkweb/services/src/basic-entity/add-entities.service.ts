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


@Injectable({
  providedIn: 'root'
})

export class EntityToolService {

  // tslint:disable-next-line:variable-name
  private entityMap = new Map();
  private waterEntities = [];
  private currentDataSource = [];
  private hasEntity = false;
  private entityCollection = new ArkWeb.EntityCollection();

  constructor(
    private drawPoygonTool: DrawPolygonService,
    private core: CoreService
  ) {}

  /**
   * 在场景中添加水面矢量
   * @param polygonGeometryInstance GeometryInstance格式多边形
   */

  AddGeoJson(geoSrc, param): void {
    const dataStr = ArkWeb.Resource.createIfNeeded(geoSrc);
    // let promise = dataStr.fetchJson().then(function(jsonData) {
    const originColor = ArkWeb.Color.fromBytes(0, 0, 200, 50);

    let idNo: number = this.entityMap.size;
    let aId = ArkWeb.defaultValue(param.nId , 'pn' + idNo);
    while (ArkWeb.defined(this.entityMap.get(aId))) {
      idNo++;
      aId = ArkWeb.defaultValue(param.nId , 'pn' + idNo);
      if (!ArkWeb.defined(this.entityMap.get(aId))) {
        break;
      }
    }

    dataStr.fetchJson().then((jsonData) => {
        const entiList = [];
        if (jsonData.type === `FeatureCollection`) {
          // thisSource.load(thisSource, jsonData,)
          jsonData.features.forEach(perFeature => {
            if (perFeature.type === 'Feature') {
                // Add the entity to the collection.
                const  entity = this.drawPoygonTool.newPolygonJson(perFeature, {
                  heightToGround: 10
                });
                if (entity) {
                  this.entityCollection.add(entity);
                  entiList.push(entity);
                }

            }
          });
        }
        this.core.viewer.zoomTo(this.entityCollection.values);
        // this.core.viewer.dataSources.add(dataSource);
        this.entityMap.set(aId, entiList);
        this.core.viewer.scene.primitives.add(this.entityCollection);
    });
    return aId;
  // features
}
/**
 * @param geoSrc 多边形geojson三角网格数据路径
 * @param colorHash 水面网格颜色对象
 */
AddGeoJsonDataSource(geoSrc, param): void {
  // if (this.hasEntity) {
  //   this.RemoveCurrentNet();
  // }
  let isClampToGround = ArkWeb.defaultValue(param.isClampToGround, false);
  let isSetEveryEntity = false;
  let currentHeight = null;
  if (param.height) {
    currentHeight = ArkWeb.defaultValue(param.height, false);
    isSetEveryEntity = true;
    isClampToGround = false;
  }
  // this.loader.show('正在渲染淹没数据....');
  // const originColor = ArkWeb.Color.fromBytes(0, 100, 200, 200);
  let strokeColor =   ArkWeb.Color.WHITE;
  let fillColor = strokeColor;
  if (param.originColor) {
    strokeColor = param.originColor;
    fillColor = strokeColor;
  }
  if (param.stroke) {
    strokeColor = ArkWeb.Color.fromCssColorString(param.stroke);
    fillColor = strokeColor;
  }
  if (param.fill ) {
    fillColor =  ArkWeb.Color.fromCssColorString(param.fill);

  }
  const strokeWidth2 = ArkWeb.defaultValue(param.strokeWidth, 2);
  // const originColor = ArkWeb.Color.fromRandom({
  //   red: 0,
  //   // maximumGreen: 0.3,
  //   // minimumBlue: 0.4,
  //   alpha: 0.4
  // });
  const promise = ArkWeb.GeoJsonDataSource.load(geoSrc, {
    stroke: strokeColor,
    fill: fillColor,
    strokeWidth: strokeWidth2,
    clampToGround: isClampToGround
  });

  let idNo: number = this.entityMap.size;
  let aId = ArkWeb.defaultValue(param.nId , 'pd' + idNo);
  while (ArkWeb.defined(this.entityMap.get(aId))) {
    idNo++;
    aId = ArkWeb.defaultValue(param.nId , 'pd' + idNo);
    if (!ArkWeb.defined(this.entityMap.get(aId))) {
      break;
    }
  }
  promise.then((dataSource) => {
    // this.loader.show('正在渲染淹没数据....');
    this.currentDataSource = dataSource;
    this.waterEntities = dataSource.entities.values;
    this.hasEntity = true;
    if (isSetEveryEntity) {
      this.waterEntities.forEach(entity => {
        const FarDistanceCondition = ArkWeb.defaultValue(param.farDistanceCondition , Number.MAX_VALUE);
        const nearDistanceCondition = ArkWeb.defaultValue(param.nearDistanceCondition, 0.0);
        entity.polygon.distanceDisplayCondition = new ArkWeb.DistanceDisplayCondition(nearDistanceCondition, FarDistanceCondition);
 
        if (currentHeight) {
          entity.polygon.height = currentHeight;
        }
      });

    }
    this.core.viewer.dataSources.add(dataSource);
    this.entityMap.set(aId, dataSource);
    // this.core.viewer.zoomTo(dataSource);
    // this.loader.hide();
  }).otherwise((error) => {
    console.log(error);
    // this.loader.hide();
  });
  return aId;
} // AddWaterNet

RemoveCurrentNet(): void {
  if (this.hasEntity) {
    this.core.viewer.dataSources.remove(this.currentDataSource);
    this.hasEntity = false;
  }
}


removeEntity(id) {
  const Ent = this.entityMap.get(id) ;
  if (Ent) {
    if (id.indexOf('pd') !== -1) {
      this.core.viewer.dataSources.remove(Ent);
    } else if (id.indexOf('pn') === -1) {
      // this.core.viewer.dataSources.remove(Ent);
      this.entityMap.delete(id);
      this.core.viewer.entities.remove(Ent);
    } else {
      Ent.forEach(entity => {
        this.core.viewer.entities.remove(entity);
      });
    }
  }
}


getFloodAnaysisState() {
  return this.hasEntity;
}

changeFloodNetColor(colorHash): void {
  // let i = 0;
  this.waterEntities.forEach(entity => {
    let color = ArkWeb.Color.fromBytes(0, 0, 200, 0);

    if (entity.properties._GDIDS) {
      const idNew = entity.properties._GDIDS.getValue();
      const allId = idNew.split(',') ;
      let count = 0 ;
      for (const cID of allId) {
        let curID = `BB02-`;
        if (count === 0 ) {
          curID = curID + cID;
        } else {
            const netId = toNumber(cID) + toNumber( idNew.split(',')[0] );
            curID = curID + netId;
        }
        count ++;
        if (colorHash && ArkWeb.defined(colorHash[curID])) {
          color = ArkWeb.Color.fromCssColorString(colorHash[curID].style.color);
          if (color.alpha === 1 ) {
            color = color.withAlpha(0.6);
            // console.log('s', curID);
            break;
          }
        }
      }


      const firstId = `BB02-` + idNew.split(',')[0];
      if (colorHash && ArkWeb.defined(colorHash[firstId])) {
        color = ArkWeb.Color.fromCssColorString(colorHash[firstId].style.color);
        if (color.alpha === 1 ) {
          color = color.withAlpha(0.6);
        }
      }

    } else if (entity.properties.GDID) {
      const firstId = entity.properties.GDID.getValue();
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
    // console.log('color', colorHash[i++].style.color);
  });

}
}
