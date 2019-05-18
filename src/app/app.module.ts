import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseAddComponent } from './databases/database-add/database-add.component';
import { DatabaseGetComponent } from './databases/database-get/database-get.component';
import { DatabaseEditComponent } from './databases/database-edit/database-edit.component';
import { DatabaseService } from './services/database.service';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { LayoutModule } from 'angular-admin-lte';  
import { BoxModule } from 'angular-admin-lte';
import { adminLteConf } from './admin-lte.conf';
import { UploadFilesComponent } from './databases/upload-files/upload-files.component';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ApiGetComponent } from './apis/api-get/api-get.component';
import { ApiAddComponent } from './apis/api-add/api-add.component';
import { ApiEditComponent } from './apis/api-edit/api-edit.component';
import { ApiService } from './services/api.service';
import { EndpointComponent } from './apis/endpoint/endpoint.component';

@NgModule({
  declarations: [
    AppComponent,
    DatabaseAddComponent,
    DatabaseGetComponent,
    DatabaseEditComponent,
    UploadFilesComponent,
    ApiGetComponent,
    ApiAddComponent,
    ApiEditComponent,
    EndpointComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    BoxModule,
    LayoutModule.forRoot(adminLteConf),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [DatabaseService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
