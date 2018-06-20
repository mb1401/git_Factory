import { Directive, OnInit, ElementRef, Renderer, Input} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
@Directive({
    selector: '[jhiActiveMenu]'
})
export class ActiveMenuDirective implements OnInit {
    @Input() jhiActiveMenu: string;
    private fragment: string;
    constructor(private el: ElementRef, private renderer: Renderer, private translateService: TranslateService, private route: ActivatedRoute) {}

    ngOnInit() {
      this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
         this.updateActiveFlag(event.lang);
      });
      this.updateActiveFlag(this.translateService.currentLang);
        this.route.fragment.subscribe((fragment) => { this.fragment = fragment; });
    }

    updateActiveFlag(selectedLanguage) {
      if (this.jhiActiveMenu === selectedLanguage) {
          this.renderer.setElementClass(this.el.nativeElement, 'active', true);
      } else {
          this.renderer.setElementClass(this.el.nativeElement, 'active', false);
      }
    }
    }
