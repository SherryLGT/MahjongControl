import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";

import {MAX_PLAYER, PLAYER_COOKIE} from "../../constants";

declare const require: any;
const short = require('short-uuid');

interface Player {
  id: number,
  name: string,
  lastPlayed: Date
}

@Component({
  selector: 'player-management',
  templateUrl: './player-management.component.html',
  styleUrls: ['./player-management.component.scss']
})
export class PlayerManagementComponent implements AfterViewInit {

  // for html access
  readonly MAX_PLAYER = MAX_PLAYER;

  @ViewChild(MatTable) table: MatTable<Player>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['id', 'name', 'lastPlayed', 'action'];
  dataSource: MatTableDataSource<Player>;
  selectedPlayerList = new Set<Player>();

  editRowId: number = -1;
  nameFormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<PlayerManagementComponent>,
    private confirmDialog: MatDialog,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    @Inject(MAT_DIALOG_DATA) public playerList: Player[]) {

    this.dataSource = new MatTableDataSource(this.playerList);
    this.initPlayerList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  closeDialog() {
    this.dialogRef.close(Array.from(this.selectedPlayerList));
  }

  selectedPlayer() {
    if (this.editRowId !== -1 ) {
      this.confirmDialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Unsaved data',
          message: 'Are you sure you want to leave the dialog?',
          cancel: true,
          confirm: 'Yes'
        }
      }).afterClosed().subscribe(result => {
        if (result) { this.closeDialog(); }
      })
    } else { this.closeDialog(); }
  }

  formatDate(data: string) {
    const date = new Date(Date.parse(data));
    return (date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " +
            date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  // quick fix for rendering table
  renderTableData() {
    this.playerList = this.dataSource.data;
    this.dataSource.data = this.dataSource.data;
  }

  // new start
  initPlayerList() {
    if (this.dataSource.data.length < MAX_PLAYER) {
      while(this.dataSource.data.length < MAX_PLAYER) {
        this.addPlayer();
      }
    }
  }

  addPlayer() {
    const player: Player = {
      id: short.generate(),
      name: "New Player",
      lastPlayed: new Date(),
    };
    this.dataSource.data.push(player as Player);
    if (this.table) { this.renderTableData(); }
    return player;
  }

  editPlayer(e, player, index) {
    e.stopPropagation();
    this.editRowId = index;
    this.nameFormControl.setValue(player.name);
  }

  savePlayer(e, player, index) {
    e.stopPropagation();
    if (this.nameFormControl.value && this.nameFormControl.value !== '') {
      this.dataSource.data[index].name = this.nameFormControl.value;
      this.renderTableData();

      this.cookieService.set(PLAYER_COOKIE, JSON.stringify(this.playerList));
      this.editRowId = -1;
      this.snackBar.open('Saved.', 'Close', {
        duration: 1000
      });
    } else {
      this.snackBar.open('This is not No Game No Life. Name cannot be blank.', 'Close', {
        duration: 2000
      });
    }
  }

  deletePlayer(e, player, index) {
    e.stopPropagation();
    this.confirmDialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete player',
        message: 'Bye bye ' + player.name,
        cancel: true,
        confirm: 'Confirm'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.selectedPlayerList.delete(player);
        this.dataSource.data.splice(index, 1);
        this.renderTableData();
      }
    });
  }

  selectPlayer(player) {
    if (this.selectedPlayerList.size < MAX_PLAYER) {
      this.selectedPlayerList.has(player) ? this.selectedPlayerList.delete(player) : this.selectedPlayerList.add(player);
    } else {
      if (!this.selectedPlayerList.has(player)) {
        this.snackBar.open('Max 4 player. Deselect a player first to change selection.', 'Close', {
          duration: 2000
        });
      } else {
        this.selectedPlayerList.delete(player);
      }
    }
  }
}
