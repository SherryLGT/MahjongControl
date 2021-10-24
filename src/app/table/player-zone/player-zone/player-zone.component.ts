import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'player-zone',
  templateUrl: './player-zone.component.html',
  styleUrls: ['./player-zone.component.scss']
})
export class PlayerZoneComponent implements OnInit {

  @Input() PLAYER_POS;

  constructor() { }

  ngOnInit(): void {
  }

}
