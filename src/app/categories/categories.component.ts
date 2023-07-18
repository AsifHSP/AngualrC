import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  dataSource: any;
  dialog: any;
  api: any;
  sort: any;
  title = 'Angular13Crud';
  displayedColumns: string[] = ['category', 'action' ];
  // dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit(): void {
    this.getAllProducts(); 
  }
  // openDialog() {
  //   this.dialog.open(DialogComponent, {
  //     width:'30%'
  //   }).afterClosed().subscribe((val: string)=>{
  //     if(val === 'save'){
  //       this.getAllProducts();
  //     }
  //   })
  // } 
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
  getAllCategories(){
    this.api.getProductCategoryList()
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
    this.api.getProductData(id).subscribe((res: any)=>{
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

   editProductCategories(id:number){
    this.api.putProductCategories(id).subscribe((res: any)=>{
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
