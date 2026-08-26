import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[appChangeBg]",
})
export class ChangeBgDirective {
  @Input() isCorrect: Boolean = false;
  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener("click") answer() {
    if (this.isCorrect) {
      this.render.addClass(this.el.nativeElement, "bg-green-600");
    } else {
      this.render.addClass(this.el.nativeElement, "bg-red-600");
    }

    //show correct answer for 1 second before moving to next question

    let correct = document.getElementById('correct');
    //if (correct) (correct as HTMLFormElement).reset();
    //console.log('Correct answer element:', correct);

    correct?.classList.add('bg-green-600');
    
    setTimeout(() => {
      correct?.classList.remove('bg-green-600');
    }, 1000);
  }
}
