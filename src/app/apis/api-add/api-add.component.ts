import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import API from 'src/app/models/api';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Endpoint from 'src/app/models/endpoint';

@Component({
  selector: 'app-api-add',
  templateUrl: './api-add.component.html',
  styleUrls: ['./api-add.component.scss']
})
export class ApiAddComponent implements OnInit {

  api: API;
  loading = false;
  apiForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
    ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.apiForm = this.fb.group({
      name: ['', Validators.required ],
      active: [false, Validators.required ],
      description: ['', Validators.required ],
      endpoints: [[]]
    });
  }

  addAPI() {
    this.loading = true;
    this.api = this.apiForm.value;
    this.apiService.addAPI(this.api)
    .pipe(finalize(() => this.loading = false))
    .subscribe(
      (response) => {
        this.toastr.success('API created Succesfuly!', 'Success!');
        this.router.navigate(['/api']);
      }, err => {
        this.toastr.error('Add API failed!', 'Error!');
      }
    );
  }

  saveEndpointsEvent(endpoints: Endpoint[]) {
    this.apiForm.controls['endpoints'].setValue(endpoints);
  }

}
