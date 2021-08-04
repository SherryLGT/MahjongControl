import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PlayerManagementComponent} from '../player-management/player-management.component';
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";

import _ from "lodash";
import {PLAYER} from "../../interface";
import {PLAYER_COOKIE} from "../../constants";

// enum Wind {
//   Dong,
//   Nan,
//   Xi,
//   Bei
// }

@Component({
  selector: 'new-game-component',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private editPlayerDialog: MatDialog,
    private snackBar: MatSnackBar) {}

  // Stores list of player from cookie
  playerList: PLAYER[] = [];

  // Stores dropdown list selection
  players = new FormControl();
  playersSelectedList = new Set<PLAYER>();
  allSelected: boolean = false;

  // playerAltList: PLAYER[] = [];
  playerAltList: PLAYER[] = [];
  playerSeatL = new FormControl();
  playerSeatR = new FormControl();
  playerSeatT = new FormControl();
  playerSeatB = new FormControl();

  ngOnInit(): void {
    if (!this.refreshCookie()) {
      this.openEditPlayerDialog();
    }

    // DEVELOPMENT MODE
    if (this.players.value === null) {
      const temp: PLAYER[] = [];
      temp.push(this.playerList[0]);
      temp.push(this.playerList[1]);
      temp.push(this.playerList[2]);
      temp.push(this.playerList[3]);
      this.players.setValue(temp);
      this.playerSelected();
    }
  }

  openEditPlayerDialog(): void {
    this.editPlayerDialog.open(PlayerManagementComponent, {
      data: this.players.value,
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true
    }).afterClosed().subscribe(players => {
      this.players.setValue(players);
      this.playerSelected();
      this.refreshCookie();
    });
  }

  refreshCookie() {
    const playerCookie = this.cookieService.get(PLAYER_COOKIE);
    if (playerCookie) {
      this.playerList = JSON.parse(playerCookie);
      return true;
    } else {
      return false;
    }
  }

  comparePlayersObj(player1, player2) {
    return player1 && player2 && player1.id == player2.id;
  }

  playerSelected() {
    if (this.players.value.length < 5) {
      this.playersSelectedList = this.players.value;
    } else {
      this.players.setValue(this.playersSelectedList);
    }
    this.allSelected = this.players.value.length == 4;
    this.playerAltList = _.clone(this.playerList);
  }

  playerSeatSelected() { // TODO
    console.log(this.playerAltList);
    console.log(this.playerSeatL.value);
    console.log(this.playerSeatR.value);
    console.log(this.playerSeatT.value);
    console.log(this.playerSeatB.value);
  }
}
