import { OrderModule } from './order/order.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask'


//////////////////  ngrx //////////////////////////////
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';
import { reducers, metaReducers } from './reducers';
import { AppEffects } from './app.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

///////////////////  external  ////////////////////
import { ShareModule } from 'ngx-sharebuttons';


///////////////////  OWN CREATED ////////////////////
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './menu/menu.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialsModule } from './materials/materials.module';
import { AppShellRenderDirective } from './directives/appshell-render.directive';
import { AppShellNoRenderDirective } from './directives/appshell-no-render.directive';
import { FormsModule } from '@angular/forms';
import { BaseelementsModule } from './baseelements/baseelements.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee,faBars , faSearch, faTimes, faShoppingCart, faUtensils, faTrash,  faPlus, faMinus, faHome, faChevronCircleUp, faPizzaSlice, faGlassMartini, faFish, faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppShellRenderDirective,
    AppShellNoRenderDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    ShareModule,
    MenuModule,
    OrderModule,
    BaseelementsModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    NgxMaskModule.forRoot(),
    MaterialsModule,
    FontAwesomeModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    

    library.addIcons(faCoffee,
      faBars,
      faSearch,
      faTimes,
      faShoppingCart,
      faUtensils,
      faFacebook,
      faTelegram,
      faTrash,
      faPlus,
      faMinus,
      faHome,
      faChevronCircleUp,
      faPizzaSlice,
      faGlassMartini,
      faFish,
      faBreadSlice
      

      );
  }
 }
