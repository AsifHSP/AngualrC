import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
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
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err:any)=>{
        alert("Error While Featching the Record!!!")
      }
    })
  }

  editProduct(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe((val:any)=>{
      if(val === 'update'){
        this.getAllProducts();
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
}

// function ViewChild(MatPaginator: any): (target: AppComponent, propertyKey: "paginator") => void {
//   throw new Error('Function not implemented.');
// }

