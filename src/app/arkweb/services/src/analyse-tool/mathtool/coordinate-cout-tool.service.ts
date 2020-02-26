import { Injectable } from '@angular/core';
import { CoreService } from '../../core.service';
import { GasProjectionToolService } from './gas-projection-tool.service';



@Injectable({
  providedIn: 'root'
})
export class CoordinateCoutToolService {

constructor(
  private core: CoreService,
  private gasProjectionTool: GasProjectionToolService
  ) {}

  public countdisInCartesian3(p1, p2) {
    p1 = this.core.viewer.scene.globe.ellipsoid.cartesianToCartographic(p1);
    p1 = this.PItoDU(p1) ;
    p2 = this.core.viewer.scene.globe.ellipsoid.cartesianToCartographic(p2);
    p2 = this.PItoDU(p2) ;
    const center = (p1.longitude + p2.longitude) / 2;
    p1 = this.gasProjectionTool.Gauss_to_XY(p1.longitude, p1.latitude, center);
    p2 = this.gasProjectionTool.Gauss_to_XY(p2.longitude, p2.latitude, center);
    return this.countdis(p1, p2);
}

public countAreaInCartesian3(pointsold) {
    const points = new Array(pointsold.length);
    for (let i = 0; i < pointsold.length; i++)  {
      points[i] = this.PItoDU(this.core.viewer.scene.globe.ellipsoid.cartesianToCartographic(pointsold[i]));
    }

    let center = 0;
    points.forEach(element => {
      center += element.longitude;
      center = center / points.length;
    });

    for (let k = 0; k < points.length; k++) {
      points[k] = this.gasProjectionTool.Gauss_to_XY(points[k].longitude, points[k].latitude, center) ;
    }
    return Math.abs(this.countArea(points)) ;
}

public countCenter(ps) {
   let x = 0;
   let y = 0;
   let z = 0;
   ps.forEach(point => {
     x += point.x;
     y += point.y;
     z += point.z;
   });
   const center = new ArkWeb.Cartesian3(x / ps.length, y / ps.length, z / ps.length);
   return center ;
}
  ////////// *计算工具 */

  public countdis(p1, p2): number {
    if (p1.z && p2.z) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) * (p1.z - p2.z));
    } else {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }
}

private PItoDU(location) {
  location.longitude = location.longitude / Math.PI * 180;
  location.latitude = location.latitude / Math.PI * 180;
  return location;
 }

 private countArea(ps) {
  let s = 0;
  for (let i = 0; i < ps.length; i++) {
    const p1 = ps[i];
    let p2;
    if (i < ps.length - 1) {
      p2 = ps[i + 1];
    } else {
      p2 = ps[0];
    }
    s += p1.x * p2.y - p2.x * p1.y;
  }
  return s / 2 ;
 }


}

