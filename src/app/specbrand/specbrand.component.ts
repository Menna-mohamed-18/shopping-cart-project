import { Component, inject } from '@angular/core';
import { BrandsService } from '../core/services/brands/brands.service';

@Component({
  selector: 'app-specbrand',
  imports: [],
  templateUrl: './specbrand.component.html',
  styleUrl: './specbrand.component.scss'
})
export class SpecbrandComponent {

  private readonly brandsService=inject(BrandsService);

  getSpecbrandData(id:string):void{
    this.brandsService.getSpecificBrands(id).subscribe({
      next:(res) =>{
        console.log(res);
        
      },
      error:(err) =>{
        console.log(err);
        
      }
    })
  }
}
