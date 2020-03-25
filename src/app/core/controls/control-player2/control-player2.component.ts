import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-player2',
  templateUrl: './control-player2.component.html',
  styleUrls: ['./control-player2.component.scss']
})
export class ControlPlayer2Component implements OnInit {

  // 
  marks = null;
  s = 24;

  constructor() { }

  ngOnInit() {
    const M = {};
    for(let i=0;i<=this.s;i++) {
      M[i] = '15:00';
    }
    this.marks = M;
  }

}
