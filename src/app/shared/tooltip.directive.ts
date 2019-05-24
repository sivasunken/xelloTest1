import { Directive, Input, HostListener, ElementRef, OnInit, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipComponent } from './tooltip.component';
import { NotifyService } from './../services/notify.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') tooltipText = '';
  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    this.notifyService.onOutsideClicked.subscribe(
      () => { this.hide(); }
    );

    this.notifyService.onButtonClicked.subscribe(
      (eventData: Event) => {
        if (eventData.target === this.elementRef.nativeElement) {
          this.show();
        } else {
          this.hide();
        }
      }
    );
  }

  @HostListener('click', ['$event'])
  onClick(eventData: MouseEvent) {
    this.notifyService.onButtonClicked.emit(eventData);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.hide();
    }
  }

  private show() {
    const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
    tooltipRef.instance.text = this.tooltipText;
  }

  private hide() {
    this.overlayRef.detach();
  }
}
