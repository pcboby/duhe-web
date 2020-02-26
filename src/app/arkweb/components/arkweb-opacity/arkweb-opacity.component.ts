import { Component, OnInit } from '@angular/core';
import { ArkwebService } from '../../services/arkweb.service';

@Component({
  selector: 'app-arkweb-opacity',
  templateUrl: './arkweb-opacity.component.html',
  styleUrls: ['./arkweb-opacity.component.css']
})
export class ArkwebOpacityComponent implements OnInit {
  opacity = 100;
  disabled = false;
  constructor(
    private map: ArkwebService) { }

  ngOnInit() {
  }

  transChange(event) {
    console.log(this.map.core.viewer.scene.globe._surface._tileProvider._commandsPass);
    this.map.core.viewer.scene.backgroundColor = new ArkWeb.Color(0.0, 0.0, 0.0, 0.0);
    this.map.core.viewer.scene.globe.baseColor = new ArkWeb.Color(0, 0, 0, 0);
    if ( event === 100) {
        this.map.core.viewer.scene.globe.depthTestAgainstTerrain = true;
        this.map.core.viewer.sce0ne.globe._surface._tileProvider._commandsPass = ArkWeb.Pass.GLOBE;
        this.map.core.viewer.scene.skyAtmosphere.show = true;
    } else {
      this.map.core.viewer.scene.globe.depthTestAgainstTerrain = false;
      this.map.core.viewer.scene.globe._surface._tileProvider._commandsPass = 9;
      this.map.core.viewer.scene.skyAtmosphere.show = false;
    }
    if (this.map.core.viewer.imageryLayers.length > 0) {
        if (this.map.core.viewer.imageryLayers.get(0)) {
          this.map.core.viewer.imageryLayers.get(0)["alpha"] =  event / 100;
        }
        if (this.map.core.viewer.imageryLayers.get(1)) {
          this.map.core.viewer.imageryLayers.get(1)["alpha"] =  event / 100;
        }
    }
  }
}
