import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PlayerManagementComponent} from '../player-management/player-management.component';
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";

import _ from "lodash";
import {PLAYER} from "../../interface";
import {STATE, PLAYER_COOKIE} from "../../constants";

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

  // Stores player seat selection
  playerSeatT = new FormControl();
  playerSeatB = new FormControl();
  playerSeatL = new FormControl();
  playerSeatR = new FormControl();
  playerSeatListT: PLAYER[] = [];
  playerSeatListB: PLAYER[] = [];
  playerSeatListL: PLAYER[] = [];
  playerSeatListR: PLAYER[] = [];

  ngOnInit(): void {
    if (!this.refreshCookie()) {
      this.openEditPlayerDialog();
    }

    if (STATE === "DEV" && this.players.value === null) {
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
    if (this.allSelected) {
      this.resetSeat();
    }
  }

  playerSeatSelected(player, pos) {
    const indexT = this.playerSeatListT.findIndex((p) => p === player);
    const indexB = this.playerSeatListB.findIndex((p) => p === player);
    const indexL = this.playerSeatListL.findIndex((p) => p === player);
    const indexR = this.playerSeatListR.findIndex((p) => p === player);

    switch(pos) {
      case "TOP" :
        this.playerSeatListB.splice(indexB, 1);
        this.playerSeatListL.splice(indexL, 1);
        this.playerSeatListR.splice(indexR, 1);

        this.syncPlayerSeatList(player, this.playerSeatListT, this.playerSeatListB);
        this.syncPlayerSeatList(player, this.playerSeatListT, this.playerSeatListL);
        this.syncPlayerSeatList(player, this.playerSeatListT, this.playerSeatListR);
        break;
      case "BOTTOM" :
        this.playerSeatListT.splice(indexT, 1);
        this.playerSeatListL.splice(indexL, 1);
        this.playerSeatListR.splice(indexR, 1);

        this.syncPlayerSeatList(player, this.playerSeatListB, this.playerSeatListT);
        this.syncPlayerSeatList(player, this.playerSeatListB, this.playerSeatListL);
        this.syncPlayerSeatList(player, this.playerSeatListB, this.playerSeatListR);
        break;
      case "LEFT" :
        this.playerSeatListT.splice(indexT, 1);
        this.playerSeatListB.splice(indexB, 1);
        this.playerSeatListR.splice(indexR, 1);

        this.syncPlayerSeatList(player, this.playerSeatListL, this.playerSeatListT);
        this.syncPlayerSeatList(player, this.playerSeatListL, this.playerSeatListB);
        this.syncPlayerSeatList(player, this.playerSeatListL, this.playerSeatListR);
        break;
      case "RIGHT" :
        this.playerSeatListT.splice(indexT, 1);
        this.playerSeatListB.splice(indexB, 1);
        this.playerSeatListL.splice(indexL, 1);

        this.syncPlayerSeatList(player, this.playerSeatListR, this.playerSeatListT);
        this.syncPlayerSeatList(player, this.playerSeatListR, this.playerSeatListB);
        this.syncPlayerSeatList(player, this.playerSeatListR, this.playerSeatListL);
    }
  }

  syncPlayerSeatList(check, main, sub) {
    const diff = main.find(p => p !== check && !sub.includes(p));
    if (diff) sub.push(diff);
  }

  removePlayerSeat(player, pos) {
    switch(pos) {
      case "TOP" :
        this.playerSeatListB.push(player);
        this.playerSeatListL.push(player);
        this.playerSeatListR.push(player);
        this.playerSeatT.setValue(null);
        break;
      case "BOTTOM" :
        this.playerSeatListT.push(player);
        this.playerSeatListL.push(player);
        this.playerSeatListR.push(player);
        this.playerSeatB.setValue(null);
        break;
      case "LEFT" :
        this.playerSeatListT.push(player);
        this.playerSeatListB.push(player);
        this.playerSeatListR.push(player);
        this.playerSeatL.setValue(null);
        break;
      case "RIGHT" :
        this.playerSeatListT.push(player);
        this.playerSeatListB.push(player);
        this.playerSeatListL.push(player);
        this.playerSeatR.setValue(null);
        break;
    }
  }

  randomSeat() {
    if (this.playerSeatT.value === null && this.playerSeatB.value === null && this.playerSeatL.value === null && this.playerSeatR.value === null ||
        this.playerSeatT.value && this.playerSeatB.value && this.playerSeatL.value && this.playerSeatR.value) {
      const list = _.shuffle(_.clone(this.playerList));
      this.playerSeatT.setValue(list[0]);
      this.playerSeatListT = [list[0]];
      this.playerSeatB.setValue(list[1]);
      this.playerSeatListB = [list[1]];
      this.playerSeatL.setValue(list[2]);
      this.playerSeatListL = [list[2]];
      this.playerSeatR.setValue(list[3]);
      this.playerSeatListR = [list[3]];
    } else { // TODO : Random remainder
    }
  }

  resetSeat() {
    this.playerSeatT.setValue(null);
    this.playerSeatB.setValue(null);
    this.playerSeatL.setValue(null);
    this.playerSeatR.setValue(null);
    this.playerSeatListT = _.clone(this.playerList);
    this.playerSeatListB = _.clone(this.playerList);
    this.playerSeatListL = _.clone(this.playerList);
    this.playerSeatListR = _.clone(this.playerList);
  }
}
