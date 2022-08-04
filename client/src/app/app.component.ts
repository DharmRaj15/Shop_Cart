import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Creative Prints';
  products:any[]; 

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

    this.http.get('https://localhost:44310/api/Products?pageSize=50').subscribe((responce: any) => {
      this.products = responce.data;
    }, error => {
      console.log(error);
    });
  }
}
