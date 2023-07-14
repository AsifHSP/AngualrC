import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-selectfreshness',
  templateUrl: './selectfreshness.component.html',
  styleUrls: ['./selectfreshness.component.css']
})
export class SelectfreshnessComponent implements OnInit {
  productSFreshnessForm !: FormGroup;
  actionBtn: string = "Save"


  constructor(private _apiService: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productSFreshnessForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }

  addProductFreshness() {

    if (this.productSFreshnessForm.valid) {
      this._apiService.postProductFreshness(this.productSFreshnessForm.value).subscribe(res => {
        let result = res;
      }, (error) => {
       
      })
    }
    else {
      alert("form not valid");
    }

  }

}
