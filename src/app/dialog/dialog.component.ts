import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { ApiService } from '../services/api.service';
import{ MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
freshnessList : any = []
productForm !: FormGroup;
actionBtn : string = "Save"
categoryList:any=[];

constructor(private formBuilder : FormBuilder, 
  private api:ApiService, 
  
  @Inject(MAT_DIALOG_DATA) public editData : any,
  private dialogRef :MatDialogRef<DialogComponent>,
  private _apiService: ApiService,
  ){}


ngOnInit(): void {
  this.getProductCategoryList();
  this.getProductFreshness();
  this.productForm =  this.formBuilder.group({
    name : ['', Validators.required],
    productCategoryId : ['', Validators.required],
    productFreshnessId : ['', Validators.required],
    price : ['', Validators.required],
    comment : ['', Validators.required],
    date : ['', Validators.required],
  });
  if(this.editData){
    this.actionBtn = "Update";
    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['category'].setValue(this.editData.category);
    this.productForm.controls['freshness'].setValue(this.editData.freshness);
    this.productForm.controls['price'].setValue(this.editData.price);
    this.productForm.controls['comment'].setValue(this.editData.comment);
    this.productForm.controls['date'].setValue(this.editData.date);
  }
}
addProduct(){
  
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Product Added Successfully.")
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error While Adding The Product.")
        }
      })
    }
    // else{
    //   this.updateProduct()
    // }
  
}
updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product Updated Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while upadating the record.");
      }
    })
  }

  getProductCategoryList(){
    this._apiService.getProductCategoryList().subscribe(res=>{
      this.categoryList = res;
    })
  }

  getProductFreshness(){
    this._apiService.getProductFreshnessList().subscribe(res=>{
      this.freshnessList = res;
    })
  }

  
}
