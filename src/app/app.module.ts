import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipDirective } from './shared/tooltip.directive';
import { HomeComponent } from './home/home.component';
import { TooltipComponent } from './shared/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    HomeComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TooltipComponent]
})
export class AppModule { }
