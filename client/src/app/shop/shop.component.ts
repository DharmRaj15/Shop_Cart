import { IType } from './../shared/models/productType';
import { IBrands } from './../shared/models/brands';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrands[];
  types: IType[];

  brandIdSelected: number;
  typeIdSelected: number;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected).subscribe(response => {
      this.products = response.data
    }, error => console.log(error)
    )
  }

  getBrands() {
    this.shopService.getBrands().subscribe(responce => {
      this.brands = [{ id: 0, name: 'All' }, ...responce];
    }, error => {
      console.log(error)
    }
    )
  }

  getTypes() {
    this.shopService.getType().subscribe(responce => {
      this.types =  [{ id: 0, name: 'All' }, ...responce];
    }, error => {
      console.log(error)
    }
    )
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypwSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

}
