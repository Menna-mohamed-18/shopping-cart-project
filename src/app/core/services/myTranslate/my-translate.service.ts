import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
private readonly renderer2 =inject(RendererFactory2).createRenderer(null,null)
  constructor(private translateService :TranslateService , @Inject(PLATFORM_ID) private id:object , private renderer:RendererFactory2) { 

    this.renderer2 = this.renderer.createRenderer(null,null)
if(isPlatformBrowser(this.id)){
  
  this.translateService.setDefaultLang('en')

  const saveLang = localStorage.getItem('lang')

if(saveLang) {
this.translateService.use(saveLang !)

}
this.changeDirection();
}
 }



 changeDirection():void{
  if(localStorage.getItem('lang') === 'en'){
    this.renderer2.setAttribute(document.documentElement , 'dir' , 'ltr')
    this.renderer2.setAttribute(document.documentElement , 'lang' , 'en')
  }else if(localStorage.getItem('lang') === 'ar'){
    this.renderer2.setAttribute(document.documentElement , 'dir' , 'rtl')
    this.renderer2.setAttribute(document.documentElement , 'lang' , 'ar')

  }
 
 }




 changeLangTranslate(lang:string):void{

  localStorage.setItem('lang' , lang)
  this.translateService.use(lang)
  this.changeDirection();
 }
}
