import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Endpoint from 'src/app/models/endpoint';
import { DatabaseService } from 'src/app/services/database.service';
import Database from 'src/app/models/database';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {

  endpoints: Endpoint[] = [];
  databases: Database[] = [];

  newEndpoint: Endpoint;
  selectedDatabase: Database = null;
  selectedField: string = '';

  @Output() saveEvent = new EventEmitter();
  
  loading = false;
  listing = true;
  creating = false;

  constructor(private ds: DatabaseService) { }

  ngOnInit() {
  }

  onChangeDatabase(database) {
    this.selectedDatabase = database;
  }

  onChangeField(field) {
    this.selectedField = field;
  }

  createEndpoint() {
    this.newEndpoint = new Endpoint();
    this.listing = false;
    this.creating = true;

    this.ds.getDatabases().subscribe(
      (databases: Database[]) => {
        if (databases.length) {
          this.selectedDatabase = databases[0];

          if(this.selectedDatabase.columns.length) {
            this.selectedField = this.selectedDatabase.columns[0];
          }
        }
        this.databases = databases;
      }
    );
  }

  editEndpoint() {}

  deleteEndpoint() {}

  saveEndpoint() {
    this.endpoints.push(this.newEndpoint);
    this.saveEvent.emit(this.endpoints);

    this.cancelEndpoint();
  }

  cancelEndpoint() {
    this.newEndpoint = null;
    this.listing = true;
    this.creating = false;
  }

  insertField() {
    this.newEndpoint.formula += this.selectedDatabase.name + '.' + this.selectedField;
  }
}
