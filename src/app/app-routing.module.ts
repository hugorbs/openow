import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabaseGetComponent } from './databases/database-get/database-get.component';
import { DatabaseEditComponent } from './databases/database-edit/database-edit.component';
import { DatabaseAddComponent } from './databases/database-add/database-add.component';
import { ApiGetComponent } from './apis/api-get/api-get.component';
import { ApiAddComponent } from './apis/api-add/api-add.component';
import { ApiEditComponent } from './apis/api-edit/api-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },
  {
    path: 'database/create',
    component: DatabaseAddComponent
  },
  {
    path: 'database/edit/:id',
    component: DatabaseEditComponent
  },
  {
    path: 'database',
    component: DatabaseGetComponent
  },
  {
    path: 'api',
    component: ApiGetComponent
  },
  {
    path: 'api/create',
    component: ApiAddComponent
  },
  {
    path: 'api/edit/:id',
    component: ApiEditComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
