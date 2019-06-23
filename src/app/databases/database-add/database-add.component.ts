import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { DatabaseService } from 'src/app/services/database.service';
import Database from 'src/app/models/database';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { finalize } from 'rxjs/operators';
import * as s from 'underscore.string';

//var s = require("underscore.string");

@Component({
  selector: 'app-database-add',
  templateUrl: './database-add.component.html',
  styleUrls: ['./database-add.component.scss']
})
export class DatabaseAddComponent implements OnInit {

  database: Database;
  databaseForm: FormGroup;
  file: File;
  loading: boolean;

  constructor(
    private fb: FormBuilder, 
    private ds: DatabaseService, 
    private uploadService: UploadService,
    private toastr: ToastrService,
    private router: Router
    ) { 
    this.createForm();
  }

  ngOnInit() {
    this.database = new Database();
  }

  createForm() {
    this.databaseForm = this.fb.group({
      name: ['', Validators.required ],
      description: ['']
    });
  }

  addDatabase() {
    this.loading = true;
    this.database.name = this.databaseForm.get('name').value;
    this.database.description = this.databaseForm.get('description').value;
    //this.database.key = s.underscored(this.database.name);
    console.log(this.database);
    this.uploadService.saveDatabase(this.database, this.file)
    .pipe(finalize(() => this.loading = false))
    .subscribe(
      (response) => {
        this.toastr.success('Database created Succesfuly!', 'Success!');
        this.router.navigate(['/database']);
      }, err => {
        this.toastr.error('Add database failed!', 'Error!');
      }
    );
  }

  headersEvent(headers: string[]) {
    this.database.columns = headers;
  }

  selectedFileEvent(file: File) {
    this.file = file; 
  }

}
