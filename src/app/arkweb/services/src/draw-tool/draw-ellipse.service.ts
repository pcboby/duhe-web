import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';
// import { polygon } from '@turf/turf';


@Injectable({
  providedIn: 'root'
})

export  class DrawPolygonService {
    [x: string]: any;
  constructor(
      public core: CoreService
      // private tbasicTool: BasicToolService,
    //   protected gasProjectionTool: GasProjectionToolService,
    //   protected coordinateCoutTool: CoordinateCoutToolService
      ) {
    }

    private defaultOption = {
        fillColor: ArkWeb.Color.YELLOW
    };

    drawEllipse(Cartesian3, semiMajor,  semiMinor,  param? ) {
        // console.log("绘制椭圆形！：" + ellipseStruct);
        // 红色椭圆形，位于地表，带轮廓
        const fillColor = ArkWeb.defaultValue(param.fillColor, this.defaultOption.fillColor);
        const redEllipse = this.viewer.entities.add({
            // 不带高度
            position: Cartesian3,  // ArkWeb.Cartesian3.fromDegrees(-103.0, 40.0),
            ellipse: {
                semiMinorAxis: semiMinor,
                semiMajorAxis: semiMajor,
                material: fillColor
            }
        });
        redEllipse.type = 'ELLIPSE';
        return redEllipse;
    }
}
