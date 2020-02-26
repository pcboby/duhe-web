import { Injectable, OnInit } from '@angular/core';
import { BasicToolService } from './basic-tool.service';
import { MeasureService } from './analysistool/measure.service';
// import { TerrainClippingService } from './analysistool/terrain-clipping.service';
// import { VisualToolService } from './analysistool/visual.service';
import { CoreService } from '../core.service';
import { SectionToolService } from './analysistool/section-tool.service';
import { BufferToolService } from './analysistool/buffer-tool.service';
import { SpaceOverlayService } from './analysistool/space-overlay.service';
// import { SlopToolService } from './analysistool/slop-tool.service';



@Injectable({
  providedIn: 'root'
})

export  class ToolManagerService  extends BasicToolService implements OnInit {
  constructor(
      private measureTool: MeasureService, // 量算 extends BasicToolService
      // private TerrainClippingTool: TerrainClippingService, // 挖洞
      private sectionTool: SectionToolService, // 剖面
      // private visualTool: VisualToolService, // 视域分析
      private bufferTool: BufferToolService,
      private spaceOverlayTool: SpaceOverlayService,
      // private slopTool: SlopToolService,
      public core: CoreService
    ) {
        super (core);
      }

      private activeToolManager ;

      ngOnInit() {
        
        if (this.eventHandler === null) {
            this.eventHandler = new ArkWeb.ScreenSpaceEventHandler(this.core.viewer.scene.canvas);
        }
        // alert('oninit');
        this.eventHandler.setInputAction((evt) => {
          this.leftclick(evt);
        }, ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
        this.eventHandler.setInputAction((event) => {
            this.rightClick(event);
        }, ArkWeb.ScreenSpaceEventType.RIGHT_CLICK);
        this.eventHandler.setInputAction((event) => {
            this.mouseMove(event);
        }, ArkWeb.ScreenSpaceEventType.MOUSE_MOVE);
      }
  /**
   * 激活点击事件
   * @param mode = 0 表示点击事件置空， = 1表示属性查询
   */
  public activeToolMode(mode = 0, currenttoolString = ''): void {

    if (ArkWeb.defined(this.toolName)) {
      if ( currenttoolString === this.toolName) {
          if ( this.toolMode === mode) {
            return;
          }
      } else {
        if (ArkWeb.defined(this.activeToolManager)) {
          this.clearToolManager();
        }
      }
    }

    if (this.eventHandler === null) {
      this.eventHandler = new ArkWeb.ScreenSpaceEventHandler(this.core.viewer.scene.canvas);
    }
    if ( !this.eventHandler.getInputAction(ArkWeb.ScreenSpaceEventType.LEFT_CLICK)) {
      this.eventHandler.setInputAction((evt) => {
        this.leftclick(evt);
      }, ArkWeb.ScreenSpaceEventType.LEFT_CLICK);
      this.eventHandler.setInputAction((event) => {
          this.rightClick(event);
      }, ArkWeb.ScreenSpaceEventType.RIGHT_CLICK);
      this.eventHandler.setInputAction((event) => {
          this.mouseMove(event);
      }, ArkWeb.ScreenSpaceEventType.MOUSE_MOVE);
    }

    if (currenttoolString === 'MeasureTool') {
        this.activeToolManager = this.measureTool;
    // } else if (currenttoolString === 'TerrainClipTool') {
    //   this.activeToolManager = this.TerrainClippingTool;
    } else if (currenttoolString === 'SectionTool') {
      this.activeToolManager = this.sectionTool;
    // } else if (currenttoolString === 'VisualTool') {
    //   this.activeToolManager = this.visualTool;
    } else if (currenttoolString === 'BufferTool') {
      this.activeToolManager = this.bufferTool;
    } else if (currenttoolString === 'SpaceOverlayTool') {
      this.activeToolManager = this.spaceOverlayTool;
    // } else if (currenttoolString === 'SlopTool') {
    //   this.activeToolManager = this.slopTool;
    } else {
      return;
    }
    if (ArkWeb.defined(this.activeToolManager)) {
      this.activeToolManager.activeTool(mode, currenttoolString, this.basicManager);
    }
  }
  public clearToolManager(): void {
    if (ArkWeb.defined(this.activeToolManager)) {
      this.activeToolManager.clearTool();
      this.activeToolManager  = null;
    }
    this.clearBasicTool();
  }

  protected activeTool(): void {

  }
  protected leftclick(movement): void {
      if (!this.activeToolManager ) {
        return;
      }
      this.activeToolManager.leftClickCallbcak(movement);
  }

  protected rightClick(movement): void {
      if (!this.activeToolManager ) {
          return;
      }
      this.activeToolManager.rightClickCallback(movement);
  }
  private  mouseMove(movement): void {
      if (!this.activeToolManager ) {
          return;
      }
      this.activeToolManager.mouseMoveCallbcak(movement);
  }

  public setBufferDistance(dis: number): void {
    if (this.toolName === 'BufferTool') {
      this.activeToolManager.setBufferDistance(dis);
    }
  }

  public setSectionChart( fun ): void {
    if ( this.toolName === 'SectionTool') {
      this.activeToolManager.setSectionChartCallback(fun);
    }
  }

  public setDeepClipHeight(h) {
    if ( this.toolName === 'TerrainClipTool') {
      this.activeToolManager.setDeepClip(h);
    }
  }
}
