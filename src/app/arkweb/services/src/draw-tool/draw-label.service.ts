import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';


@Injectable({
  providedIn: 'root'
})

export  class DrawLabelService {
  constructor(
      public core: CoreService
      // private tbasicTool: BasicToolService,
    //   protected gasProjectionTool: GasProjectionToolService,
    //   protected coordinateCoutTool: CoordinateCoutToolService
      ) {
  }

  private labelPoint;
  private currentBill;
  private currentLablePointPos = new ArkWeb.Cartesian3(0.0, 0.0, 0.0);

  private billboardCollection;
  private defaultImage = '/assets/themes/default/images/billboardIcons/locate.png';

  public billMap = new Map();

  setTempLabel(postionType, position, textString, option? ) {
    if ( !ArkWeb.defined(this.labelPoint)) {
    this.labelPoint = this.core.viewer.entities.add({
        position : new ArkWeb.CallbackProperty(() => {
            return this.currentLablePointPos;
        }, false),
        label : {
            text : textString,
            font : '14px Arial',
            fillColor : ArkWeb.Color.YELLOW,
            outlineColor : ArkWeb.Color.BLACK,
            outlineWidth : 2,
            pixelOffset : new ArkWeb.Cartesian2(2.0, 2.0),
            // showBackground : true,
            style : ArkWeb.LabelStyle.FILL_AND_OUTLINE,
            clampToGround: true
        }
        });
    }
    if (postionType === 'window' || postionType === 1) {
        const pickRay = this.core.viewer.scene.camera.getPickRay(position);
        let cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
        if (option) {
            if (option.clampGround) {
                const newCartographic = ArkWeb.Cartographic.fromCartesian(cartesian);
                newCartographic.height = newCartographic.height + 100.0;
                cartesian = ArkWeb.Cartesian3.fromRadians(newCartographic.longitude  , newCartographic.latitude  , newCartographic.height);
            }
        }
        this.currentLablePointPos = cartesian;
        this.labelPoint._label._text._value = textString ;

      } else if (postionType === 'Cartesian3' || postionType === 2) {
          this.currentLablePointPos = position;
          this.labelPoint._label._text._value = textString ;
      } else {
        this.labelPoint._label._text._value = '' ;
      }
  }

  addPointGeoJson( geoSrc , param ): void {

    const Image = ArkWeb.defaultValue(param.icon , this.defaultImage);
    const imgColor = ArkWeb.defaultValue(param.imagecolor , ArkWeb.Color.WHITE);
    const iconSize = ArkWeb.defaultValue(param.iconSize , 1);
    const clampToGround = ArkWeb.defaultValue(param.clampToGround , true);
    const FarDistanceCondition = ArkWeb.defaultValue(param.farDistanceCondition , Number.MAX_VALUE);
    const nearDistanceCondition = ArkWeb.defaultValue(param.nearDistanceCondition, 0.0);

    const promise = ArkWeb.GeoJsonDataSource.load(geoSrc);

    let idNo = this.billMap.size;
    let bId = ArkWeb.defaultValue(param.nId , 'bd' + idNo);
    if ( ArkWeb.defined(this.billMap.get(bId))) {
      while ( ArkWeb.defined(this.billMap.get(bId))) {
        idNo++;
        bId = ArkWeb.defaultValue(param.nId , 'bd' + idNo);
        if (!ArkWeb.defined(this.billMap.get(bId))) {
          break;
        }
      }
    }
    this.billMap.set(bId, null);

    promise.then((dataSource) => {
      const billEntities = dataSource.entities.values;
      if (!this.billboardCollection) {
        this.billboardCollection = new ArkWeb.BillboardCollection();
        this.core.viewer.scene.primitives.add(this.billboardCollection);
      }
      // this.core.viewer.scene.globe.depthTestAgainstTerrain = false;
      billEntities.forEach(entity => {
        if (ArkWeb.defined(param.icon)) {
          entity.billboard.image = Image;
          entity.billboard.scale = iconSize;
          entity.billboard.disableDepthTestDistance = Number.POSITIVE_INFINITY;
          if (ArkWeb.defined(param.nearDistanceCondition) || ArkWeb.defined(param.FarDistanceCondition)) {
            entity.billboard.distanceDisplayCondition = new ArkWeb.DistanceDisplayCondition(nearDistanceCondition, FarDistanceCondition);
          }
          if (clampToGround) {
            entity.billboard.heightReference =  ArkWeb.HeightReference.CLAMP_TO_GROUND;
          }
        } else {
          entity.billboard.show = false;
        }
        if (ArkWeb.defined(param.boudingLabel)) {
          if (ArkWeb.defined(entity.properties ) && ArkWeb.defined( entity.properties[param.boudingLabel]) ) {
            const lableColor = ArkWeb.defaultValue(param.lableColor, ArkWeb.Color.YELLOW);
            entity.label = new ArkWeb.LabelGraphics({
              font : '16px Helvetica',
              fillColor : lableColor,
              pixelOffset : new ArkWeb.Cartesian2(2.0, 5.0),
              style : ArkWeb.LabelStyle.FILL_AND_OUTLINE
            });
            entity.label.disableDepthTestDistance = Number.POSITIVE_INFINITY;
            entity.label.text = entity.properties[param.boudingLabel];
            if (ArkWeb.defined(param.addLabel)) {
              // console.log('add', param.addLabel)
              // entity.label.text =  new ArkWeb.CallbackProperty(() => {
              //   // console.log('add' , entity.label.text);
              //   return entity.properties[param.boudingLabel] +  param.addLabel;
              //   });
              entity.label.text = entity.label.text + param.addLabel;
              entity.label.text =  new ArkWeb.CallbackProperty(() => {
                // console.log('add' , entity.label.text);
                return entity.properties[param.boudingLabel] +  param.addLabel;
                });
              // entity.label.text = entity.label.text + param.addLabel;

            }
            entity.label.distanceDisplayCondition = new ArkWeb.DistanceDisplayCondition(nearDistanceCondition, FarDistanceCondition);
            entity.label.heightReference =  ArkWeb.HeightReference.CLAMP_TO_GROUND;

          }
        }
        entity.billboard.verticalOrigin = ArkWeb.VerticalOrigin.BOTTOM;
        // console.log('entity', entity, entity.properties);
      });
      this.core.viewer.dataSources.add(dataSource);
      // this.core.viewer.zoomTo(dataSource);

      this.billMap.set(bId, dataSource);
      return {
        id: bId,
        data: dataSource
      };
      ////////
      // console.log('dataSource', dataSource);
      // this.removeAllLabels();
    });

    return bId;
  }
  removeTempLabel() {
    if (  ArkWeb.defined(this.labelPoint)) {
        this.labelPoint._label._text._value = '' ;
        this.core.viewer.entities.remove(this.labelPoint);
    }
  }

  activeLabelCollection() {
    if (!this.billboardCollection) {
      this.billboardCollection = new ArkWeb.BillboardCollection();
      this.core.viewer.scene.primitives.add(this.billboardCollection);
    }
  }
  addLabel(carPostion, param) {
    this.activeLabelCollection();
    // const pos = ArkWeb.SceneTransforms.wgs84ToWindowCoordinates (this.core.viewer.scene, carPostion);
    // const pickRay = this.core.viewer.scene.camera.getPickRay(pos);
    // const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    // this.core.viewer.scene.globe.depthTestAgainstTerrain = true;
    const ImageUrl = ArkWeb.defaultValue(param.image , this.defaultImage);
    const imgColor = ArkWeb.defaultValue(param.imagecolor , ArkWeb.Color.WHITE);
    const iconSize = ArkWeb.defaultValue(param.iconSize , 1);
  
    let idNo = this.billboardCollection.length;
    let bId = ArkWeb.defaultValue(param.nId , 'b' + idNo);
    if ( ArkWeb.defined(this.billMap.get(bId))) {
    while ( ArkWeb.defined(this.billMap.get(bId))) {
      idNo++;
      bId = ArkWeb.defaultValue(param.nId , 'b' + idNo);
      if (!ArkWeb.defined(this.billMap.get(bId))) {
        break;
      }
    }}
  

    var bill = this.core.viewer.entities.add({
        position : carPostion,
        billboard : {
            image : ImageUrl
        }
    });
    if ( param && param.property) {
      bill.property = param.property;
    }
    this.billMap.set(bId, bill);
    return bill;
  }
  getDataFromId(bid) {
    const data = this.billMap.get(bid);
    return data;
  }
  removeAllLabels() {
    if ( ArkWeb.defined(this.billboardCollection) ) {
      this.billboardCollection.removeAll();
    }
    this.billMap.forEach((value, key) => {
      if (key.indexOf('bd') !== -1) {
        this.core.viewer.dataSources.remove(value);
      } else {
        this.core.viewer.entities.remove(value);
      }
    });
    this.billMap.clear();
  }

  removeLabeOfId(id) {
    const index = this.billMap.get(id);
    if (ArkWeb.defined(index)) {
      // var str = "123"
      if (id.indexOf('bd') === -1) {
        this.removeLabelOfIndex(index);
        this.core.viewer.entities.remove(index);
        this.billMap.delete(id);
      } else {
       this.core.viewer.dataSources.remove(index);
      }
    }
  }
  removeLabelOfIndex(index) {
    const currentBilloard = this.billboardCollection.get(index);
    if (currentBilloard) {
      this.billboardCollection.remove(currentBilloard);
    }
  }

  leftClickCallbcak(movement, param?) {
    return this.rightClickCallback(movement, param);
  }

  mouseMoveCallbcak(movement, param?): void {
  }
  rightClickCallback(movement, param?) {
    const pickRay = this.core.viewer.scene.camera.getPickRay(movement.position);
    const cartesian = this.core.viewer.scene.globe.pick(pickRay, this.core.viewer.scene);
    return this.addLabel(cartesian, param);
  }
}
