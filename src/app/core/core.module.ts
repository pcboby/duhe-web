import { SelectBaseSurfaceComponent } from './controls/select-base-surface/select-base-surface.component';
import { DialogMapMiniHydrologicalComponent } from './controls/control-map-mini/components/dialog-map-mini-hydrological/dialog-map-mini-hydrological.component';
import { DialogMapMiniHydropowerComponent } from './controls/control-map-mini/components/dialog-map-mini-hydropower/dialog-map-mini-hydropower.component';
import { ItemPlayComponent } from './components/item-play/item-play.component';
import { ItemIconComponent } from './components/item-icon/item-icon.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { DetailStationComponent } from './details/detail-station/detail-station.component';
import { DetailRiverComponent } from './details/detail-river/detail-river.component';
import { DetailReservoirComponent } from './details/detail-reservoir/detail-reservoir.component';
import { ApiMapSearchService } from './services/apis/api-map-search.service';
import { DetailSearchComponent } from './details/detail-search/detail-search.component';
import { ControlSearchComponent } from './controls/control-search/control-search.component';

import {
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  NgZorroAntdModule,
  NZ_I18N,
  zh_CN
} from 'ng-zorro-antd';
import {
  registerLocaleData
} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient
} from '@angular/common/http';
import {
  HttpModule
} from '@angular/http';
import {
  RouterModule
} from '@angular/router';
import {
  NgScrollbarModule
} from 'ngx-scrollbar';
import {
  EssenceNg2PrintModule
} from 'essence-ng2-print';
import {
  NgxEchartsModule
} from 'ngx-echarts';
import {
  TimingIntercepterService,
  SpinnerService,
  NavigationService,
  LayoutService,
  FixPanelService,
  ApiWeatherService,
  ApiWaterService,
  ApiUserService,
  ApiChartTempService,
  ApiPredictionService,
  MapService,
  ApiDatabaseService,
  ApiAreaService,
  ApiRiverService
} from './services';
import {
  SpinnerComponent,
  HeaderComponent,
  SliderComponent,
  WraperComponent,
  FooterComponent,
  LayoutComponent,
  LoginComponent,
  ErrorComponent,
  PlotUserComponent,
  ToolbarComponent,
  MapAreaComponent,
  FixPanelComponent,
  PanelComponent,
  WeatherComponent,
  BreadcrumbComponent,
  LimitComponent,
  EchartsComponent,
  CameraComponent,
  PredictionComponent,
  VideoComponent,
  SwiperComponent,
  SwitchYearComponent,
  Toolbar2Component,
  Login2Component,
  BannerComponent,
  Layout2Component,
  Header2Component,
  LegendComponent,
  Weather2Component,
  LegendLabelComponent
} from './components';
import {
  ArkwebModule
} from '../arkweb/arkweb.module';
import {
  WeekPipe,
  LimitsPipe
} from './pipes';
import {
  ButtonDropmenuComponent,
  ControlPlayerComponent,
  ControlToolTabComponent,
  SelectSatelliteMapComponent,
  SelectElectronicMapComponent,
  SelectTopographicMapComponent,
  InputGroupComponent,
  ControlMapMiniComponent,
  DialogMapMiniReservoirComponent,
  ControlPlayer2Component,
  ControlSearch2Component,
  SelectTypeComponent,
  SelectBasinComponent,
  SelectUnitComponent,
  SelectStepComponent,
  InputTextareaComponent,
  SelectStationTypeComponent,
  SelectFloodLevelComponent,
  SelectBaseBankComponent,
  SelectReservoirTypeComponent,
  SelectFloodDatetypeComponent,
  SelectRiverCharacteristicComponent,
  SelectWaterFlowComponent,
  SelectTestFlowComponent,
  SelectTestProductComponent,
  SelectTestVelocityComponent
} from './controls';


registerLocaleData(zh);


// -----------------------------------------------------------------------------------------------------------------------
const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgScrollbarModule,
  HttpModule,
  RouterModule,
  HttpClientModule,
  NgZorroAntdModule,
  NgxEchartsModule,
  EssenceNg2PrintModule,
  ArkwebModule
];
// -----------------------------------------------------------------------------------------------------------------------
const controls = [
  InputGroupComponent,
  InputTextareaComponent,
  ControlMapMiniComponent,
  DialogMapMiniHydropowerComponent,
  DialogMapMiniReservoirComponent,
  DialogMapMiniHydrologicalComponent,




  ButtonDropmenuComponent,
  ControlPlayerComponent,
  ControlPlayer2Component,
  ControlToolTabComponent,
  SelectSatelliteMapComponent,
  SelectTopographicMapComponent,
  SelectElectronicMapComponent,
  ControlSearchComponent,
  ControlSearch2Component,

  SelectTypeComponent,
  SelectBasinComponent,
  SelectUnitComponent,
  SelectStepComponent,

  SelectStationTypeComponent,
  SelectFloodLevelComponent,
  SelectBaseSurfaceComponent,
  SelectBaseBankComponent,
  SelectReservoirTypeComponent,
  SelectFloodDatetypeComponent,
  SelectRiverCharacteristicComponent,
  SelectWaterFlowComponent,
  SelectTestFlowComponent,
  SelectTestProductComponent,
  SelectTestVelocityComponent
];
const details = [
  DetailSearchComponent,
  DetailReservoirComponent,
  DetailRiverComponent,
  DetailStationComponent
]
// -----------------------------------------------------------------------------------------------------------------------
const components = [
  Login2Component,
  BannerComponent,

  LegendComponent,
  LegendLabelComponent,
  
  LoginComponent,
  ErrorComponent,
  SpinnerComponent,
  HeaderComponent,
  Header2Component,
  BreadcrumbComponent,
  PredictionComponent,
  SliderComponent,
  WraperComponent,
  FooterComponent,
  LayoutComponent,
  Layout2Component,
  PlotUserComponent,
  ToolbarComponent,
  Toolbar2Component,
  MapAreaComponent,
  PanelComponent,
  FixPanelComponent,
  WeatherComponent,
  Weather2Component,
  LimitComponent,
  EchartsComponent,
  CameraComponent,
  VideoComponent,
  SwiperComponent,
  SwitchYearComponent,
  ListItemComponent,
  ItemIconComponent,
  ItemPlayComponent
];
// -----------------------------------------------------------------------------------------------------------------------
const directives = [];
// -----------------------------------------------------------------------------------------------------------------------
const services = [{
    provide: NZ_I18N,
    useValue: zh_CN
  },
  // SpinnerService,
  // NavigationService,
  // LayoutService,
  // FixPanelService,
  // MapService
];

const interceptors = [{
  provide: HTTP_INTERCEPTORS,
  useClass: TimingIntercepterService,
  multi: true
}];

const servicesApi = [
  ApiAreaService,
  ApiPredictionService,
  ApiChartTempService,
  ApiWeatherService,
  ApiWaterService,
  ApiRiverService,
  ApiUserService,
  ApiDatabaseService,

  ApiMapSearchService
];
// -----------------------------------------------------------------------------------------------------------------------
const pipes = [
  WeekPipe,
  LimitsPipe
];
// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------


@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...controls,
    ...details,
    ...modules,
    ...directives,
    ...pipes
  ],
  providers: [
    ...interceptors,
    ...services,
    ...servicesApi,
    ...pipes
  ],
  declarations: [
    ...components,
    ...controls,
    ...details,
    ...directives,
    ...pipes
  ],
  entryComponents: [
    ...components,
    ...controls,
    ...details
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // if (parentModule) {
    //   console.error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`); // new Error
    // }
  }
}
