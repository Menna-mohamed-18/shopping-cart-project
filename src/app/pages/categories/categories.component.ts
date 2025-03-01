import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
private readonly categoriesService =inject(CategoriesService);

categories:Icategory[]=[];


ngOnInit(): void {
  this.getCategoriesData();
}


getCategoriesData():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categories=res.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })

}
}
