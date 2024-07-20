import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})

export class CartsComponent {
  
  constructor( private service:CartsService ) {}

  
  ngOnInit():void {
    this.getCartProducts()
  }
  
  amount:number = 0
  loading : boolean = false;
  cartProducts:any[] = []
  total:any = 0
  sendToCartProducts:any[] = []
  date:any 
  cartSentSuccefully: boolean = false

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  console.log(this.cartProducts)
}
getCartTotal(){
  this.total = 0;
  for(let x in this.cartProducts)
    {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
      this.total = parseFloat(this.total.toFixed(2));
    }
}
minusAmount(index:number){
  this.cartProducts[index].quantity -=1; 
  this.getCartTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartProducts))
}
plusAmount(index:number){
  this.cartProducts[index].quantity +=1; 
  this.getCartTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartProducts))
}
changeAmount(index:number){
  this.getCartTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartProducts))
}
deleteProduct(index:number){
  this.cartProducts.splice(index , 1) 
  this.getCartTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartProducts))
}
clearCart(){
  this.cartProducts = []
  localStorage.setItem("cart",JSON.stringify(this.cartProducts))
}
newOrder(){

  this.loading = true;
  for (let i = 0; i < this.cartProducts.length; i++) {
    this.sendToCartProducts[i] = {
      id: this.cartProducts[i].item.id,
      quantity: this.cartProducts[i].quantity
    };
  }
  this.date = new Date()
  this.service.sendCart(2,this.date,this.sendToCartProducts).subscribe((res:any)=>{
    this.loading = false;
    this.cartSentSuccefully = true
    console.log("Cart sent successfully")
  } , ( error) =>{
    this.loading = false;
    alert("Error");
    console.log(error.message);
  })
  
    this.cartSentSuccefully = true
  
    console.log(this.cartProducts);

}
}
