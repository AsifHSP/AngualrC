import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  postProduct(data : any){
    return this.http.post<any>("http://localhost:5077/api/Product/AddProduct/",data);
  }
  getProduct(){
    
    return this.http.get<any>("http://localhost:5077/api/Product/GetProducts");
  }
  // putProduct(data:any, id: number){
  //   return this.http.put<any>("http://localhost:5077/api/Product/UpdateProduct/"+id, data);
  // }
  deleteProduct(id: number){
    return this.http.delete<any>("http://localhost:5077/api/Product/DeleteProduct/"+id);
  }
  postProductCategory(data : any){
    return this.http.post<any>("http://localhost:5077/api/ProductCategory/AddProductCategory", data);
  }
  putProductCategory(data: any){
    return this.http.put<any>("http://localhost:5077/api/ProductCategory/UpdateProductCategory", data);
  }
  getProductCategoryList(){
    return this.http.get<any>("http://localhost:5077/api/ProductCategory/GetProductsCategory");
  }
  postProductFreshness(data:any){
    return this.http.post<any>("http://localhost:5077/api/ProductFreshness/AddProductFreshness", data)
  }
  getProductFreshnessList(){
    return this.http.get<any>("http://localhost:5077/api/ProductFreshness/GetProductsFreshness")
  }
  putProduct(data:any, id: number){
    
    return this.http.put<any>("http://localhost:5077/api/Product/UpdateProduct", data);
  }
  
  getProductData(id:number){
    return this.http.get<any>("http://localhost:5077/api/Product/GetProduct?id="+id);
   }
  
}
