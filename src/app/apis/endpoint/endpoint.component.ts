import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Endpoint from 'src/app/models/endpoint';
import { DatabaseService } from 'src/app/services/database.service';
import Database from 'src/app/models/database';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {

  endpoints: Endpoint[] = [];
  databases: Database[] = [];
  operators: string[] = ['&&']

  newEndpoint: Endpoint;
  selectedDatabase: Database = null;
  selectedField: string = '';
  selectedOperator: string = '';

  @Output() saveEvent = new EventEmitter();
  
  loading = false;
  listing = true;
  creating = false;

  constructor(
    private ds: DatabaseService, 
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.selectedOperator = this.operators[0];
  }

  onChangeDatabase(database) {
    this.selectedDatabase = database;
  }

  onChangeField(field) {
    this.selectedField = field;
  }

  onChangeOperator(operator) {
    this.selectedOperator = operator;
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

  insertOperator() {
    this.newEndpoint.formula += this.selectedOperator;
  }

  checkSyntax() {
    this.apiService.evaluate(this.newEndpoint.formula).subscribe(
      (result) => {
        console.log(result);
        if(result) {
          this.toastr.success('Correct syntax!', 'Success!');
        } else {
          this.toastr.error('Incorrect syntax!', 'Error!');
        }
      }
    );
  }
}
