import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent {

  product: any = { images: [] }; // Default empty images array
  loading : boolean = false;
  id!:any 

  constructor( private service:ProductsService ,private route:ActivatedRoute ) {
    this.id = this.route.snapshot.paramMap.get("id") 
  }
  ngOnInit():void {
    this.getProduct()
  }
  getProduct(){
    this.loading = true;


    this.service.getProductById(this.id).subscribe((res: any) => {
      this.product = res;
      this.product.images = this.sanitizeImageUrl(this.product.images);
      this.loading = false;
    }, ( error) =>{
      alert("Error");
      this.loading = false;
      console.log(error.message);
    })
  }

  
  sanitizeImageUrl(urls: string[]): string[] {
    const regex = /(http[s]?:\/\/.*?\.(?:jpg|jpeg|png))/gi;
    return urls.map(url => {
      const matches = url.match(regex);
      return matches && matches.length > 0 ? matches[0] : ''; // Return the first valid URL or empty string
    });
  }
  
}
