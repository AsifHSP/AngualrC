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
    Id : [0],
    name : ['', Validators.required],
    productCategoryId : ['', Validators.required],
    productFreshnessId : ['', Validators.required],
    price : ['', Validators.required],
    comment : ['', Validators.required],
    selectionDate:['',Validators.required]
  });
  if(this.editData){
    this.actionBtn = "Update";
    debugger
    console.log(this.editData)
    this.productForm.controls['Id'].setValue(this.editData.id);
    this.productForm.controls['name'].setValue(this.editData.name);
    this.productForm.controls['productCategoryId'].setValue(this.editData.productCategoryId);
    this.productForm.controls['productFreshnessId'].setValue(this.editData.productFreshnessId);
    this.productForm.controls['price'].setValue(this.editData.price);
    this.productForm.controls['comment'].setValue(this.editData.comment);
    this.productForm.controls['selectionDate'].setValue(this.editData.selectionDate);
  }
}
addProduct(){
  debugger
    if(this.productForm.valid){
      if(this.actionBtn=="Update"){
        this.updateProduct();
      }
      else{
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
      }
    
    // else{
    //   this.updateProduct()
    // }
  
}
updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .toPromise().then(res=>{
        debugger
        alert(res.message);
        this.productForm.reset();
        this.dialogRef.close('update');
      },
     
    ), ()=>{
      alert("Error while upadating the record."); 
    }
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
