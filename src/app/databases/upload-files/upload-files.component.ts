import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UploadService } from 'src/app/services/upload.service';
import { ToastrService } from 'ngx-toastr';


class FileSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  selectedFile: FileSnippet;
  headers: string[];
  loading: boolean;

  @Output() selectedFileEvent = new EventEmitter();
  @Output() headersEvent = new EventEmitter();

  constructor(private uploadService: UploadService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = false;
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.toastr.success('File Uploaded Succesfuly!', 'Success!');
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
    this.toastr.error('File Upload Failed!', 'Error!');
  }

  processFile(fileInput: any) {
    const file: File = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new FileSnippet(event.target.result, file);
      this.selectedFileEvent.emit(file);

      this.loading = true;
      this.uploadService.getHeaders(this.selectedFile.file)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (res) => {
          console.log(res);
          this.headers = res;
          this.headersEvent.emit(this.headers);
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });
    reader.readAsDataURL(file);
  }

}
