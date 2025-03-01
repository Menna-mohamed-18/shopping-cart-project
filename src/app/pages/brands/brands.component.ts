import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  private readonly brandsService=inject(BrandsService);

  brands:Ibrands[]=[];
ngOnInit(): void {
    this.getBrandsData();
}



getBrandsData():void{
  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.brands =res.data;
    },
    error:(err) =>{
      console.log(err);
      
    }
  })
}

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
