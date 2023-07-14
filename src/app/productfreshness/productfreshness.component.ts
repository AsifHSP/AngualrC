import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-productfreshness',
  templateUrl: './productfreshness.component.html',
  styleUrls: ['./productfreshness.component.css']
})
export class ProductfreshnessComponent implements OnInit {

  freshnessList = [];
  productCategoryForm !: FormGroup;
  actionBtn: string = "Save"
  dialogRef: any;
  constructor(private _apiService: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.productCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }


  addProductCategory() {

    if (this.productCategoryForm.valid) {
      this._apiService.postProductCategory(this.productCategoryForm.value).subscribe(res => {
        let result = res;
      }, (error) => {
       
      })
    }
    else {
      alert("form not valid");
    }

  }

 

}