
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//////////////////// Fire ////////////////////////////////////
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ShareModule,
    MenuModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),

    MaterialsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
