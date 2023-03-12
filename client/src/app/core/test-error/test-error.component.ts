
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  grt404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe(responce =>{
      console.log(responce)
    },error => {
      console.log(error);
    });
  }

  grt500Error() {
    this.http.get(this.baseUrl + 'Buggy/servererror').subscribe(responce =>{
      console.log(responce)
    },error => {
      console.log(error);
    });
  }

  grt400Error() {
    this.http.get(this.baseUrl + 'Buggy/badrequest').subscribe(responce =>{
      console.log(responce)
    },error => {
      console.log(error);
    });
  }

  get400validationError() {
    this.http.get(this.baseUrl + 'buggy/fourtytwo').subscribe(responce => {
      console.log(responce)
    },error => {
      console.log(error);
    });
  }

}
