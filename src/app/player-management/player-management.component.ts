import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from '@angular/material/snack-bar';

declare const require: any;
const short = require('short-uuid');

const MAX_PLAYER = 4;

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

  @ViewChild(MatTable) table: MatTable<Player>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['id', 'name', 'lastPlayed', 'action'];
  dataSource: MatTableDataSource<Player>;
  selectedPlayerList = new Set<Player>();

  constructor(
    public dialogRef: MatDialogRef<PlayerManagementComponent>,
    private confirmDialog: MatDialog,
    private snackBar: MatSnackBar,
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

  formatDate(data: string) {
    const date = new Date(Date.parse(data));
    return (date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " +
            date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  // quick fix for rendering table
  renderTableData() {
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
      name: "player-" + this.dataSource.data.length,
      lastPlayed: new Date(),
    };
    this.dataSource.data.push(player as Player);
    if (this.table) { this.renderTableData(); }
    return player;
  }

  editPlayer(index) {

  }

  deletePlayer(player, index) {
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
