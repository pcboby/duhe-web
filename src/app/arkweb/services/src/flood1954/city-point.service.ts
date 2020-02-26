import { Injectable, OnInit } from '@angular/core';
import { CoreService } from '../core.service';
import { DrawLabelService } from '../draw-tool/draw-label.service';
// import { InformboxService } from './informbox.service';


@Injectable({
  providedIn: 'root'
})
export class PointBillService implements OnInit {
  constructor(
    private core: CoreService,
    private drawLabel: DrawLabelService
    // private informbox: InformboxService
    ) {}

  // private currentDataList = [];
  private currentDataMap = new Map();

  ngOnInit() {
  }

  addPointGeoJson( geoSrc , param ): void {
    const sid = this.drawLabel.addPointGeoJson(geoSrc, param);
    this.currentDataMap.set(param.type, sid);

    return sid;
  }

  removePointGeoJson(geoSrc , sid ) {
    if (this.drawLabel.billMap.get(sid)) {
      this.drawLabel.removeLabeOfId(sid);
    }
  }

  locatePointLabel( type, propertyName, lableValue ): void {
    const datalistId = this.currentDataMap.get(type);
    if (!ArkWeb.defined(datalistId)) {
      return;
    }
    const sData = this.drawLabel.getDataFromId(datalistId);
    if (!ArkWeb.defined(sData)) {
      return;
    }

    const billEntities = sData.entities.values;
    for (const entity of billEntities) {
      if (entity.properties[propertyName]) {
        if (entity.properties[propertyName].getValue() === lableValue) {
          const pos = entity.position.getValue();
          const cartographic = ArkWeb.Cartographic.fromCartesian(pos);
          const carPos = ArkWeb.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 1000)
          this.core.viewer.camera.flyTo({
            destination : carPos
          });
        }
      }
    }
  }
  changePointListLabel( datalist, type, propertyName? ): void {
    // for ( let i = 0; i < 8; i++) {
    //   const ss = Math.random() % 8 + 100;
    //   console.log('余', ss);
    //   const str = ss + 'm';
    //   console.log('余2', str);
    //   datalist.push({
    //     id : i,
    //     waterLevel: str
    //   });
    // }
    datalist.forEach(data => {
      this.changePointLabel(data.id, data.waterLevel, type, propertyName);
    });
  }

  changePointLabel( thisId, str , type, propertyName?) {
    
    const datalistId = this.currentDataMap.get(type);
    if (!ArkWeb.defined(datalistId)) {
      return;
    }
    const sData = this.drawLabel.getDataFromId(datalistId);
    if (!ArkWeb.defined(sData)) {
      return;
    }

    const billEntities = sData.entities.values;
    for (const entity of billEntities) {
      let id = 0;
      if (type === 'city') {
        id = entity.properties.cityID.getValue();

      } else  if (type === 'section' ) {
       id = entity.properties.NoID.getValue();
      }
      if (id === thisId) {
        if (entity.label) {
          if (entity.properties.NAME) {
            entity.label.text = entity.properties.NAME  + str;
          } else if (entity.properties.DMName) {
            entity.label.text = entity.properties.DMName  + str;
          } else {
            entity.label.text =  str;
          }
        }
        return;
      }
    }
    // billEntities.forEach(entity => {
    //   const id = entity.properties.cityID.getValue();
    //   if (id === cityId) {
    //     if (entity.label) {
    //       entity.label.text = str;
    //     }
    //     break;
    //   }
    // });
  }
}
