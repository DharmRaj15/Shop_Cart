import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  id:number;
  constructor(private shopService: ShopService, private activatedRaout: ActivatedRoute,private bcService:BreadcrumbService ) {
    bcService.set('@productDetails',' ');
   }

  ngOnInit(): void {
    debugger;
    this.loadProduct();
    console.log(this.activatedRaout.snapshot.paramMap.get('id'));
  }

  loadProduct() {
    
    this.id = parseInt(this.activatedRaout.snapshot.paramMap.get('id'));
    this.shopService.getProduct(this.id).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails',product.name)
    }, error => {
      console.log(error);
    });
  }
}
