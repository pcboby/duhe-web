import { Injectable } from '@angular/core';
import { CoreService, ConfigService } from './src';
import { EntityToolService } from './src/basic-entity/add-entities.service';
import { DrawLabelService } from './src/draw-tool/draw-label.service';
import { DrawPolylineService } from './src/draw-tool/draw-polyline.service';
import { QueryToolService } from './src/query-tool/query-tool.service';
import { PointBillService } from './src/flood1954/city-point.service';
import { VectorMangerService } from './src/data-manager/vector-mannger.service';
import { ModelMangerService } from './src/data-manager/model-mannger.service';
import { HeatmapMangerService } from './src/data-manager/heatmap-mannger.service';
import { FloodAnalysisService } from './src/floodanalysis/flood-analysis.service';
import { FloodWaterService } from './src/floodanalysis/flood-water.service';
import { DrawTwinkleCircleService } from './src/draw-tool/draw-twinkclecircle.service';
import { ToolManagerService } from './src/analyse-tool/tool-manager.service';
import { TooltipService } from './src/tooltip/tooltip.service';
import { PlottingToolService } from './src/plotting-tool/plotting-tool.service';

@Injectable({
  providedIn: 'root'
})
export class ArkwebService {

constructor(
  public config: ConfigService,
  public core: CoreService,
  public tooltip: TooltipService,
  public entityService: EntityToolService,
  public drawlabelTool: DrawLabelService,
  public drawPolylineTool: DrawPolylineService,
  public queryTool: QueryToolService,
  public pointsLabel: PointBillService,
  public vectorManager: VectorMangerService,
  public modelManager: ModelMangerService,
  public heatMapManager: HeatmapMangerService,
  public floodAnalysis: FloodAnalysisService,
  public waterPolygon: FloodWaterService,
  public twinkleCircle: DrawTwinkleCircleService,
  private toolManager: ToolManagerService,
  public plotting: PlottingToolService
) { }

////////////////////////////////////////////////////////
// 工具类
  activeLengthMeasureTool() {
    this.toolManager.activeToolMode(1, 'MeasureTool');
    // this.measureTool.
  }

  activeHeightMeasureTool(): void {
    this.toolManager.activeToolMode(4, 'MeasureTool');
  }

  activeAreaMeasureTool() {
    this.toolManager.activeToolMode(2, 'MeasureTool');
    // this.measureTool.
  }

  activeCoordinateMeasureTool() {
    this.toolManager.activeToolMode(3, 'MeasureTool');
  }

  clearMeasureTool() {
    this.toolManager.clearToolManager();
  }
///////////////////////////
  activeSectionTool(): void {
    this.toolManager.activeToolMode(1, 'SectionTool');
  }
  setSectionChartFunction( fun ): void {
    this.toolManager.setSectionChart(fun);
  }


  activePointBufferTool(): void {
    this.toolManager.activeToolMode(1, 'BufferTool');
  }

  activeLineBufferTool(): void {
    this.toolManager.activeToolMode(2, 'BufferTool');
  }

  activePolygonBufferTool(): void {
    this.toolManager.activeToolMode(3, 'BufferTool');
  }

  setBufferDistance(bufferDistance: number): void {
    this.toolManager.setBufferDistance(bufferDistance);
  }
  activeSpaceOverLayTool(): void {
    this.toolManager.activeToolMode(1, 'SpaceOverlayTool');
  }
}
