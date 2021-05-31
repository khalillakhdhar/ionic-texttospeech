import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
//firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { LongPressModule } from 'ionic-long-press';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { IonicGestureConfig } from './utils/IonicGestureConfig';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    LongPressModule,
    IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,SpeechRecognition,    BarcodeScanner,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig},
    TextToSpeech
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
