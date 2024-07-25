import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent {
products:any[]=[]
categories:any[]=[]
cartProducts:any[]=[]
chosenCategory:string = ''
category :any;
loading : boolean = false;
gridView:boolean = true


constructor( private service:ProductsService , private router: Router , private sanitizer: DomSanitizer) {}
ngOnInit():void {
  this.getProducts()
  this.getCategories()
}
getProducts(){
  this.loading = true;

    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res.map((product: any) => {
        product.images[0] = this.sanitizeImageUrl(product.images);
        return product;
    });
    this.loading = false;
  } , ( error) =>{
    alert("Error");
    this.loading = false;
    console.log(error.message);
  })
}
// getProducts(){
//   this.loading = true;
//   this.service.getAllProducts().subscribe((res:any)=>{
//     this.products = res;
//     this.loading = false;
//   } , ( error) =>{
//     alert("Error");
//     this.loading = false;
//     console.log(error.message);
//   })
// }
getCategories(){
  this.loading = true;
  this.service.getAllCategories().subscribe((res:any)=>{
    this.categories = res.map((category: any) => category.name);
    this.loading = false;
  } , ( error) =>{
    this.loading = false;
    alert("Error");
    console.log(error.message);
  })
}
filterCategory(event:any){
  this.loading = true;
  this.chosenCategory = event.target.value;
  if(this.chosenCategory == "All")
    {
      this.getProducts();
    }
    else{
      
      this.service.getAllProducts().subscribe((res: any) => {

        

        this.products = res.filter((product: any) => product.category.name === this.chosenCategory );
        this.products = this.products.map((product: any) => {
          product.images[0] = this.sanitizeImageUrl(product.images);
          return product;
      });
        this.loading = false;
      }, (error) => {
        alert("Error");
        this.loading = false;
        console.log(error.message);
      })
    }
}


toggleGridView(){
  this.gridView = !this.gridView
}

addToCart(event: any): void {
  if("cart" in localStorage){
    this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    let exist = this.cartProducts.find(item=>item.id == event.item.id)
    if(exist){
      alert("Product is already in your cart")
    }
    else{
      this.cartProducts.push(event);
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    }
  }
  else{
    this.cartProducts.push(event);
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }
  
}


sanitizeImageUrl(urls: string[]): string {
  // Regular expression to match URLs ending in .jpg or .jpeg
  const regex = /(http[s]?:\/\/.*?\.(?:jpg|jpeg|png))/gi;

  for (const url of urls) {
    const matches = url.match(regex);
    if (matches && matches.length > 0) {
      return matches[0]; // Return the first valid URL
    }
  }

  return ''; // Return an empty string if no valid URL is found
}
}
