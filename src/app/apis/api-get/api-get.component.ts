import { Component, OnInit } from '@angular/core';
import API from 'src/app/models/api';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-api-get',
  templateUrl: './api-get.component.html',
  styleUrls: ['./api-get.component.scss']
})
export class ApiGetComponent implements OnInit {

  apis: API[] = [];
  loading = false;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = true;
    this.apiService
      .getAPIs()
      .pipe(finalize(() => this.loading = false))
      .subscribe((data: API[]) => {
        this.apis = data;
    });
  }

  deleteAPI(id: number) {
    this.loading = true;
    this.apiService.deleteAPI(id)
    .pipe(finalize(() => this.loading = false))
    .subscribe(res => {
      this.toastr.success('API deleted succesfuly!', 'Success!');
      this.ngOnInit();
    }, err => {
      this.toastr.error('Error!', 'Error!');
    });
  }

}
