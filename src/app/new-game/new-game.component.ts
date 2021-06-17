import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerManagementComponent } from '../player-management/player-management.component';

enum Wind {
  Dong,
  Nan,
  Xi,
  Bei
}

interface Player {
  id: number,
  name: string,
  lastPlayed: Date
}

@Component({
  selector: 'new-game-component',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private dialog: MatDialog) {}

  playerCookie!: string;
  playerList: Player[] = [];
  
  ngOnInit(): void {
    this.cookieService.set('player-list', JSON.stringify({'id': 0, 'name': 'name', 'lastPlayed': new Date()}));
    this.playerCookie = this.cookieService.get('player-list');

    if (this.playerCookie) {
      this.playerList = [JSON.parse(this.playerCookie)];
    // } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PlayerManagementComponent, {
      data: this.playerList,
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // result
    });
  }

  windList: { id: Wind, name: string }[] = [
    { "id": Wind.Dong, "name": "東" },
    { "id": Wind.Nan, "name": "南" },
    { "id": Wind.Xi, "name": "西" },
    { "id": Wind.Bei, "name": "北" },
  ]

  players = new FormControl();
  playersSelected: string[] = [];
  allSelected: boolean = false;

  playersSeat = new FormControl();
  // playersSeat: { id: number, wind: number }[] = [
  //   { "id": -1, "wind": Wind.Dong },
  //   { "id": -1, "wind": Wind.Nan },
  //   { "id": -1, "wind": Wind.Xi },
  //   { "id": -1, "wind": Wind.Bei },
  // ];
  
  playerSelected() {
    if (this.players.value.length < 5) {
      this.playersSelected = this.players.value;
    } else {
      this.players.setValue(this.playersSelected);
    }

    if (this.players.value.length == 4) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
  }

  playerSeatSelected() {
    console.log(this.playersSeat);
  }

}