import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
export class PlayerManagementComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlayerManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public playerList: Player[]) {}

  displayedColumns = ['id', 'name', 'lastPlayed'];
  dataSource: Player[] = [];

  ngOnInit(): void {
    if (this.playerList) {
      this.playerList.forEach((player) => {
        this.dataSource.push(player);
      });
    }
  }

  formatDate(data: string) {
    const date = new Date(Date.parse(data));
    return (date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + 
            date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
}
