import { IType } from './../shared/models/productType';
import { IBrands } from './../shared/models/brands';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static:true}) searchTerm:ElementRef;
  products: IProduct[];
  brands: IBrands[];
  types: IType[];

  totalCount:number;

  shopParams = new ShopParams();
  
  sortOptions = [
    {name:'Alphabetical', value:'name'},
    {name:'Price:Low to High', value:'priceAsc'},
    {name:'Price:High to low', value:'priceDesc'},
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
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
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  //sorting method
  onSortSelection(sort:string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  //pageing handeler
  onPageChanged(event:any){
    if(this.shopParams.pageNumber !== event){
    this.shopParams.pageNumber = event;
    this.getProducts();
  }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value='';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
