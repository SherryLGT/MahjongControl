import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { WelcomeScreenComponent } from './old/welcome-screen/welcome-screen.component';
import { NewGameComponent } from './old/new-game/new-game.component';
import { PlayerManagementComponent } from './old/player-management/player-management.component';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register-form/register-form.component';
import { TablePageComponent } from './table/table-page/table-page.component';
import { PlayerZoneComponent } from './table/player-zone/player-zone/player-zone.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    NewGameComponent,
    PlayerManagementComponent,
    ConfirmationDialogComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    TablePageComponent,
    PlayerZoneComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonToggleModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
