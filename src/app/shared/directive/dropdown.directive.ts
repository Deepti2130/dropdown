import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective  {

  private isOpen = false;

  constructor(
    private _element : ElementRef,
    private _rendrer : Renderer2
  ) { }

  ngOnInit(): void {

  }

  // @HostListener('touchstart') onTouchStart() {
  //   this.toggleDropdown();
  // }

  @HostListener('click') toggleDropdown(){
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      this._rendrer.addClass(this._element.nativeElement.nextElementSibling,'show')
    }else{
      this._rendrer.removeClass(this._element.nativeElement.nextElementSibling,'show')
    }
  }


  @HostListener('document:click',['$event.target']) onclickoutside(targetelement:HTMLElement){
    const clickinside = this._element.nativeElement.contains(targetelement);

    if(!clickinside){
      this.isOpen = false;
      this._rendrer.removeClass(this._element.nativeElement.nextElementSibling,'show')
    }
  }


  @HostListener('document:keydown.escape',['$event']) onEscapepress(event:KeyboardEvent){
    this.isOpen = false;
    this._rendrer.removeClass(this._element.nativeElement.nextElementSibling,'show')
}
}



