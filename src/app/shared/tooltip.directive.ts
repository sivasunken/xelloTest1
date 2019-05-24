import { Directive, Input, HostListener, ElementRef, OnInit, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input() tooltipText = '';
  tooltipVisible = false;
  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private overlayPositionBuilder: OverlayPositionBuilder
  ) { }

  ngOnInit() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }]);

    this.overlayRef = this.overlay.create({positionStrategy});
  }

  @HostListener('click')
  onClick(eventData: MouseEvent) {
    if (this.elementRef.nativeElement === eventData.target) {
      const tootltipPortal = new ComponentPortal(TooltipComponent);

      const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(tootltipPortal);

      tooltipRef.instance.text = this.tooltipText;
    } else {
      this.overlayRef.detach();
    }
  }
}
