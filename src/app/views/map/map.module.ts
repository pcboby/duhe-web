import { PageFloodDispatchComponent } from './components/page-flood-dispatch/page-flood-dispatch.component';
import { PageHydrologicalForecastComponent } from './components/page-hydrological-forecast/page-hydrological-forecast.component';



import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  MapComponent
} from './map.component';
import {
  CoreModule
} from 'src/app/core/core.module';
import {
  MapRoutes
} from './map.routing';
import {
  DashboardComponent,
  MapToolbarComponent,
  MapToolbar2Component,
  MapToolbar2SearchComponent,
  MapToolbar2SwitchComponent,
  DetailBufferComponent,
  DetailChartComponent,
  DetailClipComponent,
  PageHomeComponent,
  PageAPictureComponent,
  PlotRealWaterComponent,
  PageSystemUserComponent,
  PageSystemRoleComponent,
  SystemUserDetailComponent,
  SystemUserEditComponent,
  SystemUserSearchComponent,
  DatabaseModelReservoirsComponent,
  DatabaseReservoirComponent,
  DatabaseRiversComponent,
  DatabaseStationComponent,
  PlotLayerComponent,
  ConditionRiverComponent,
  ConditionWaterDetailComponent,
  ConditionRiverDetailComponent,
  ConditionWorkDetailComponent,
  ConditionRainComponent,
  ConditionWaterComponent,
  ConditionWorkComponent,
  ConditionRainDetailComponent,
  PlotRealWeatherComponent,
  StationDetailComponent,
  ReservoirDetailComponent,
  // PageAutomaticPredictionConfigurationComponent,
  // PageForecastResultManagementComponent,
  // PageRealtimeJobPredictionComponent,
  // PageRealtimeJobPredictionStationComponent,
  // PageRealtimeJobPredictionRecommendComponent,
  // PageForecastResultManagementSearchComponent,
  // PageForecastResultManagementChartComponent,
  // PageRealtimeJobPredictionFloodComponent,
  DatabaseFloodPointComponent,
  // PageRealtimeJobPredictionFloodTreeComponent,
  // PageJointDispatchComponent,
  // PageJointSchedulingSchemeComponent,
  // PageContrastDispatchingSchemesComponent,
  // PageHistorySchedulingSchemeComponent,
  // PageRecommendedSchedulingSchemeComponent,
  // PageFloodSimulationComponent,
  // PageSimulatedResultsManagementComponent,
  // PageAssessmentAnalysisComponent,
  // PageJointDispatchSettingComponent,
  // PageJointDispatchSettingFormComponent,
  // PageJointDispatchSettingMapComponent,
  // PageJointDispatchSettingGridComponent,
  // PageJointDispatchSettingTreeComponent,
  // PageJointSchedulingSchemeFormComponent,
  // PageContrastDispatchingSchemesFormComponent,
  // PageRealtimeJobPredictionFloodGridComponent,
  // PageRealtimeJobPredictionFloodChart1Component,
  // PageRealtimeJobPredictionFloodChart2Component,
  // PageRealtimeJobPredictionRecommendGridComponent,
  // PageRealtimeJobPredictionRecommendChartComponent,
  // PageJointSchedulingSchemeGrid1Component,
  // PageJointSchedulingSchemeGrid2Component,
  // PageJointSchedulingSchemeChartComponent,
  // PageJointSchedulingSchemeTreeComponent,
  // PageContrastDispatchingSchemesGrid1Component,
  // PageContrastDispatchingSchemesGrid2Component,
  // PageContrastDispatchingSchemesChart1Component,
  // PageContrastDispatchingSchemesChart2Component,
  // PageRealtimeJobPredictionResultComponent,
  // PageRealtimeJobPredictionSettingComponent,
  // PageHistorySchedulingSchemeFormComponent,
  // PageHistorySchedulingSchemeChartComponent,
  // PageRealtimeJobPredictionSettingFormComponent,
  // PageHistorySchedulingSchemeGrid1Component,
  // PageHistorySchedulingSchemeGrid2Component,
  // PageHistorySchedulingSchemeTreeComponent,
  // PageRecommendedSchedulingSchemeFormComponent,
  // PageRecommendedSchedulingSchemeGridComponent,
  // PageRecommendedSchedulingSchemeValuesComponent,
  // PageRecommendedSchedulingSchemeChartComponent,
  // PageRecommendedSchedulingSchemeTreeComponent,
  // PageFloodSimulationSettingComponent,
  // PageFloodSimulationSettingFormComponent,
  // PageFloodSimulationSettingGridComponent,
  // PageFloodSimulationSettingTreeComponent,
  // PageSimulatedResultsManagementGrid1Component,
  // PageSimulatedResultsManagementGrid2Component,
  // PageSimulatedResultsManagementFormComponent,
  // PageSimulatedResultsManagementChartComponent,
  // PageSimulatedResultsManagementTreeComponent,
  // PageAssessmentAnalysisSettingComponent,
  // PageAssessmentAnalysisSettingFormComponent,
  // PageAssessmentAnalysisSettingGridComponent,
  // PageAssessmentAnalysisSettingTreeComponent,
  PageMessageNewsComponent,
  PageMessageNewsSearchComponent,
  PageDispatchingDataSearchComponent,
  PageDispatchingSchemesComponent,
  PageDispatchingSchemesSearchComponent,
  PageSystemRoleDetailComponent,
  PageSystemRoleEditComponent,
  PageSystemRoleSearchComponent,
  PageDispatchingDataComponent,
  PageRunningailySearchComponent,
  PageRunningailyComponent,
  PageWaterNewsSearchComponent,
  PageWaterNewsComponent,
  PageSystemObjectComponent,
  PageSystemObjectDetailComponent,
  PageSystemObjectEditComponent,
  PageSystemObjectSearchComponent,
  PageSystemModuleComponent,
  PageSystemModuleDetailComponent,
  PageSystemModuleEditComponent,
  PageSystemModuleSearchComponent,
  PageSystemModelComponent,
  PageSystemModelDetailComponent,
  PageSystemModelEditComponent,
  PageSystemModelSearchComponent,
  PageSystemLogComponent,
  PageSystemLogSearchComponent,
  PageSystemObjectTreeComponent,
  PageSystemModuleTreeComponent,
  PageSystemModelTreeComponent,
  PlotRealRiverComponent,
  MapToolbar2HomeComponent,
  PlotConfigComponent,
  PlotControlComponent,
  ConditionGateComponent,
  ConditionGateDetailComponent,
  RiverDetailComponent,
  ConditionRainControlComponent
} from './components';

const components = [
  MapComponent,
  DashboardComponent,
  MapToolbarComponent,
  MapToolbar2Component,
  MapToolbar2HomeComponent,
  MapToolbar2SearchComponent,
  MapToolbar2SwitchComponent,
  PlotLayerComponent,
  PlotConfigComponent,
  DetailBufferComponent,
  DetailChartComponent,
  DetailClipComponent,
  //
  PageHomeComponent,
  PlotControlComponent,
  PlotRealRiverComponent,
  PlotRealWaterComponent,
  PlotRealWeatherComponent,
  //
  PageAPictureComponent,
  ConditionRainComponent,
  ConditionRainControlComponent,
  ConditionRainDetailComponent,
  ConditionWaterComponent,
  ConditionWaterDetailComponent,
  ConditionRiverComponent,
  ConditionRiverDetailComponent,
  ConditionWorkComponent,
  ConditionWorkDetailComponent,
  ConditionGateComponent,
  ConditionGateDetailComponent,
  RiverDetailComponent,
  StationDetailComponent,
  ReservoirDetailComponent,
  // 
  PageHydrologicalForecastComponent,
  // 
  PageFloodDispatchComponent,
  // //
  // PageAutomaticPredictionConfigurationComponent,
  // PageForecastResultManagementComponent,
  // PageForecastResultManagementSearchComponent,
  // PageForecastResultManagementChartComponent,
  // PageRealtimeJobPredictionComponent,
  // PageRealtimeJobPredictionSettingComponent,
  // PageRealtimeJobPredictionSettingFormComponent,
  // PageRealtimeJobPredictionResultComponent,
  // PageRealtimeJobPredictionStationComponent,
  // PageRealtimeJobPredictionFloodComponent,
  // PageRealtimeJobPredictionFloodGridComponent,
  // PageRealtimeJobPredictionFloodChart1Component,
  // PageRealtimeJobPredictionFloodChart2Component,
  // PageRealtimeJobPredictionFloodTreeComponent,
  // PageRealtimeJobPredictionRecommendComponent,
  // PageRealtimeJobPredictionRecommendGridComponent,
  // PageRealtimeJobPredictionRecommendChartComponent,
  // //
  // PageJointDispatchComponent,
  // PageJointDispatchSettingComponent,
  // PageJointDispatchSettingFormComponent,
  // PageJointDispatchSettingMapComponent,
  // PageJointDispatchSettingGridComponent,
  // PageJointDispatchSettingTreeComponent,
  // //
  // PageJointSchedulingSchemeComponent,
  // PageJointSchedulingSchemeFormComponent,
  // PageJointSchedulingSchemeGrid1Component,
  // PageJointSchedulingSchemeGrid2Component,
  // PageJointSchedulingSchemeChartComponent,
  // PageJointSchedulingSchemeTreeComponent,
  // //
  // PageContrastDispatchingSchemesComponent,
  // PageContrastDispatchingSchemesFormComponent,
  // PageContrastDispatchingSchemesGrid1Component,
  // PageContrastDispatchingSchemesGrid2Component,
  // PageContrastDispatchingSchemesChart1Component,
  // PageContrastDispatchingSchemesChart2Component,
  // //
  // PageHistorySchedulingSchemeComponent,
  // PageHistorySchedulingSchemeFormComponent,
  // PageHistorySchedulingSchemeGrid1Component,
  // PageHistorySchedulingSchemeGrid2Component,
  // PageHistorySchedulingSchemeChartComponent,
  // PageHistorySchedulingSchemeTreeComponent,
  // //
  // PageRecommendedSchedulingSchemeComponent,
  // PageRecommendedSchedulingSchemeFormComponent,
  // PageRecommendedSchedulingSchemeGridComponent,
  // PageRecommendedSchedulingSchemeValuesComponent,
  // PageRecommendedSchedulingSchemeChartComponent,
  // PageRecommendedSchedulingSchemeTreeComponent,
  // //
  // PageFloodSimulationComponent,
  // PageFloodSimulationSettingComponent,
  // PageFloodSimulationSettingFormComponent,
  // PageFloodSimulationSettingGridComponent,
  // PageFloodSimulationSettingTreeComponent,
  // //
  // PageSimulatedResultsManagementComponent,
  // PageSimulatedResultsManagementFormComponent,
  // PageSimulatedResultsManagementGrid1Component,
  // PageSimulatedResultsManagementGrid2Component,
  // PageSimulatedResultsManagementChartComponent,
  // PageSimulatedResultsManagementTreeComponent,
  // //
  // PageAssessmentAnalysisComponent,
  // PageAssessmentAnalysisSettingComponent,
  // PageAssessmentAnalysisSettingFormComponent,
  // PageAssessmentAnalysisSettingGridComponent,
  // PageAssessmentAnalysisSettingTreeComponent,
  // //
  PageMessageNewsComponent,
  PageMessageNewsSearchComponent,
  //
  PageWaterNewsComponent,
  PageWaterNewsSearchComponent,
  //
  PageRunningailyComponent,
  PageRunningailySearchComponent,
  //
  PageDispatchingDataComponent,
  PageDispatchingDataSearchComponent,
  //
  PageDispatchingSchemesComponent,
  PageDispatchingSchemesSearchComponent,
  //
  DatabaseModelReservoirsComponent,
  DatabaseReservoirComponent,
  DatabaseRiversComponent,
  DatabaseStationComponent,
  DatabaseFloodPointComponent,
  //
  //
  PageSystemUserComponent,
  SystemUserDetailComponent,
  SystemUserEditComponent,
  SystemUserSearchComponent,
  //
  PageSystemRoleComponent,
  PageSystemRoleDetailComponent,
  PageSystemRoleEditComponent,
  PageSystemRoleSearchComponent,
  //
  PageSystemObjectComponent,
  PageSystemObjectDetailComponent,
  PageSystemObjectEditComponent,
  PageSystemObjectSearchComponent,
  PageSystemObjectTreeComponent,
  //
  PageSystemModuleComponent,
  PageSystemModuleDetailComponent,
  PageSystemModuleEditComponent,
  PageSystemModuleSearchComponent,
  PageSystemModuleTreeComponent,
  //
  PageSystemModelComponent,
  PageSystemModelDetailComponent,
  PageSystemModelEditComponent,
  PageSystemModelSearchComponent,
  PageSystemModelTreeComponent,
  //
  PageSystemLogComponent,
  PageSystemLogSearchComponent
  //
];
const services = [];

@NgModule({
  imports: [
    CoreModule,
    MapRoutes
  ],
  providers: [
    ...services
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ]
})
export class MapModule {}
