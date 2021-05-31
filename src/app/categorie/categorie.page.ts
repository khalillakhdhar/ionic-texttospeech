import { Component, OnInit } from '@angular/core';
import { Categorie } from '../classes/categorie';
import { CategorieService } from '../services/categorie.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { LongPressModule } from 'ionic-long-press';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {
  encodedData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions; 
  ngOnInit() {

     
   
  
  }

  constructor(private barcodeScanner: BarcodeScanner) {
    this.encodedData = "https://www.google.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        localStorage.setItem("choix",this.scannedData["text"]);
        window.location.replace("produits");
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodedData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodedData = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }
}
