import {
  Injectable
} from '@angular/core';
import {
  CoreService
} from '../core.service';
import {
  toNumber
} from 'ng-zorro-antd';
import { SpinnerService } from 'src/app/core/services/local/spinner/spinner.service';
import { DrawWaterService } from '../draw-tool/draw-water.service';


@Injectable({
  providedIn: 'root'
})
export class FloodWaterService {

  private currentWaterID;
  private currentHeight = 500;

  constructor(
    private loader: SpinnerService,
    // private drawPoygonTool: DrawPolygonService,
    private waterTool: DrawWaterService,
    private core: CoreService
  ) {}

  /**
   * 在场景中添加水面矢量
   * @param polygonGeometryInstance GeometryInstance格式多边形
   */
  addFloodEntity(polygonGeometryInstance) {}

  AddFloodWaterGeoJson(geoSrc, param): void {
    // features
    const isfly = true;
    const waterId = this.waterTool.addWaterGeojson(geoSrc, param, isfly);
    this.currentWaterID = waterId;
    
    return waterId;
}
/**
 * @param geoSrc 多边形geojson三角网格数据路径
 * @param colorHash 水面网格颜色对象
 */
removeCurrentPrimitives(): void {
  this.waterTool.removeCurrentPrimitives();
} // AddWaterNet

changeWaterLevel(id, level): void {
  if (this.currentWaterID) {
    const prim = this.waterTool.polygonMap.get(id);
    const currentUrlarams = this.waterTool.urlMap.get(id);
    if (prim) {
      const primitives = prim[0][0];
      const propertys = primitives.properties;
      if (id === propertys.FLZN_CD) {
        // console.log(id,  this.waterTool.polygonMap);
        // if (primitives) {
        //   console.log('geometryInstances',  primitives.geometryInstances);
        // }
        if ( primitives.geometryInstances) {
        } else if (currentUrlarams) {
          this.waterTool.removePolygon('water' + id);
          currentUrlarams.height = ( currentUrlarams.height + 50 ) % 1500;
          currentUrlarams.height = level * 2;

          this.waterTool.addWaterGeojson(currentUrlarams.url2, currentUrlarams);
          // geomInstances.height = 1000 * Math.random();
          // primitives.geometryInstances = new ArkWeb.GeometryInstance({
          //   geometry :  geomInstances
        // });
        }
      }
    }
  }
}


}
