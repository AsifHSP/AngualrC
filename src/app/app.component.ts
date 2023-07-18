import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProductfreshnessComponent } from './productfreshness/productfreshness.component';
import { SelectfreshnessComponent } from './selectfreshness/selectfreshness.component';
import { CategoriesComponent } from './categories/categories.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'Angular13Crud';
  displayedColumns: string[] = ['productName', 'category', 'date' , 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild('sort', { static: true })
  sort!: MatSort;  constructor(private dialog : MatDialog, private api : ApiService){

}
ngOnInit(): void {
this.getAllProducts();  
}
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  } 
  opencategories() {
    this.dialog.open(CategoriesComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  }

  openDialogFreshness() {
    this.dialog.open(ProductfreshnessComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  }
  openDialogSelectFreshness() {
    this.dialog.open(SelectfreshnessComponent , {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  }

  openDialogCategories() {
    this.dialog.open(CategoriesComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  }

  

  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res:any)=>{
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err:any)=>{
        alert("Error While Featching the Record!!!")
      }
    })
  }


  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res:any)=>{
        alert("Deleted Successfully.")
      },
      error:()=>{
        alert("Error while deleting the record.")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(id:number){
    this.api.getProductData(id).subscribe(res=>{
      this.dialog.open(DialogComponent,{
        width:'30%',
        data: res 
      }).afterClosed().subscribe((val:any)=>{
        if(val === 'update'){
          this.getAllProducts();
        }
      })
    })
      
     
   }
}



