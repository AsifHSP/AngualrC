import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path:  '', component:  AppComponent,
   children:[
    {
       path:  'categories', component:  CategoriesComponent
    }
   ]
}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
