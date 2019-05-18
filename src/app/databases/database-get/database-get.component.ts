import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import Database from 'src/app/models/database';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-database-get',
  templateUrl: './database-get.component.html',
  styleUrls: ['./database-get.component.scss']
})
export class DatabaseGetComponent implements OnInit {

  databases: Database[] = [];
  loading = false;

  constructor(private ds: DatabaseService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = true;
    this.ds
      .getDatabases()
      .pipe(finalize(() => this.loading = false))
      .subscribe((data: Database[]) => {
        this.databases = data;
    });
  }

  deleteDatabase(id) {
    this.loading = true;
    this.ds.deleteDatabase(id)
    .pipe(finalize(() => this.loading = false))
    .subscribe(res => {
      this.toastr.success('Database deleted succesfuly!', 'Success!');
      this.ngOnInit();
    }, err => {
      this.toastr.error('Error!', 'Error!');
    });
  }

}
