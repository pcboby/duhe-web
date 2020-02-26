import {
  Injectable
} from '@angular/core';
import {
  CoreService
} from '../core.service';
// import {
//   SpinnerService
// } from 'src/app/core/services/locals/spinner/spinner.service';


@Injectable({
  providedIn: 'root'
})
export abstract class BasicToolService {
  constructor(
      public core: CoreService
    ) {}

  public eventHandler = null;
  public measureLineCollection; // 距离线的集合
  public measureLableCollection; // 距离线的集合
  public measurePolygonCollection = []; // 距离线的集合
  public billboardCollection ;
  public pointCollection;

  private currentToolName = null;
  private currenttoolMode = 0;
  public get toolMode() {
      return this.currenttoolMode;
  }
  public set toolMode(mode) {
      this.currenttoolMode = mode;
  }
  public get toolName() {
      return this.currentToolName;
  }
  public set toolName(toolname) {
      this.currentToolName = toolname;
  }

  public get basicManager() {
      return this;
  }
  /**
   * 激活点击事件
   * @param mode = 0 表示点击事件置空， = 1表示属性查询
   */
  public activeBasicToolMode(mode = 0, currentToolName = ''): void {
      if (this.eventHandler === null) {
          this.eventHandler = new ArkWeb.ScreenSpaceEventHandler(this.core.viewer.scene.canvas);
      }
      this.currenttoolMode = mode;
      this.currentToolName = currentToolName;

      if ( (!ArkWeb.defined(this.measureLineCollection))) {
          this.measureLineCollection = new ArkWeb.PolylineCollection();
          this.core.viewer.scene.primitives.add(this.measureLineCollection);

          this.measureLableCollection = new ArkWeb.LabelCollection();
          this.core.viewer.scene.primitives.add(this.measureLableCollection);

          this.billboardCollection = new ArkWeb.BillboardCollection();
          this.core.viewer.scene.primitives.add(this.billboardCollection);
      }
      if (!ArkWeb.defined(this.pointCollection)) {
          this.pointCollection = this.core.viewer.scene.primitives.add(new ArkWeb.PointPrimitiveCollection());
      }
  }
  public clearBasicTool(): void {
      this.activeBasicToolMode();
      {
          let eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
          if (eve) {
              this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
          }
          eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_UP);
          if (eve) {
              this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.LEFT_UP);
          }
          eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_DOWN);
          if (eve) {
              this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.LEFT_DOWN);
          }
          eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.RIGHT_CLICK);
          if (eve) {
              this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.RIGHT_CLICK);
          }
          eve = this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.MOUSE_MOVE);
          if (eve) {
              this.eventHandler.removeInputAction(ArkWeb.ScreenSpaceEventType.MOUSE_MOVE);
          }
      }
      if (ArkWeb.defined(this.measureLableCollection)) {
          this.measureLineCollection.removeAll();
          this.measurePolygonCollection.forEach(currPolygon => {
              this.core.viewer.entities.remove(currPolygon);
          });
          this.measureLableCollection.removeAll();
          this.billboardCollection.removeAll();
          this.pointCollection.removeAll();

      }
  }

//   protected abstract activeTool(): any;
  protected abstract leftclick(movement): any ;
}

