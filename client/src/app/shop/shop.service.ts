import { IType } from './../shared/models/productType';
import { IBrands } from './../shared/models/brands';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { delay, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = "https://localhost:44310/api";

  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, typeId?: number) {
    let params = new HttpParams();
    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }

    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }

    return this.http.get<IPagination>(this.baseUrl + "/products", { observe: 'response', params })
      .pipe(
        delay(2000),
        map(response => {
          return response.body
        })
      );
  }

  getBrands() {
    return this.http.get<IBrands[]>(this.baseUrl + '/products/brands');
  }

  getType() {
    return this.http.get<IType[]>(this.baseUrl + '/products/types');
  }
}
