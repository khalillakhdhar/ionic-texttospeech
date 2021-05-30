import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Observable } from 'rxjs';
import { Categorie } from '../classes/categorie';
import { Produit } from '../classes/produit';
import { CategorieService } from '../services/categorie.service';
import { ProduitService } from '../services/produit.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.page.html',
  styleUrls: ['./produits.page.scss'],
})
export class ProduitsPage implements OnInit {
choix:string;
id:string;
grade:string;
categories:Categorie[];
downloadURL: Observable<string>;
selectedFile: File = null;
fb = "product";
produit:Produit;
produits:Produit[];
liste=" " ;

selected=false;
  constructor(  private textToSpeech: TextToSpeech,public speechRecognition: SpeechRecognition,private cateogrieService:CategorieService,private produitService:ProduitService,) { }
  ngOnInit() {
    
    this.choix=localStorage.getItem("choix");
    this.read();
  }
  read()
  {
  this.produitService.read_Produits().subscribe(data => {
  
    this.produits = data.map(e => {
      return {
        id: e.payload.doc.id,
  
         titre: e.payload.doc.data()["titre"],
         prix: e.payload.doc.data()["prix"],
         photo: e.payload.doc.data()["photo"],
         categorie: e.payload.doc.data()["categorie"],
         quantite_totale: e.payload.doc.data()["quantite_totale"],
         description: e.payload.doc.data()["description"],
        
        
  
      };
    });
  
  
    console.log("liste",this.produits);
    for(let pr of this.produits)
    {
      this.liste=this.liste+" "+pr.titre+", le prix est :  "+pr.prix+",   ";
      
    }
    console.log("produits",this.produits);
    console.log("liste ",this.liste);
    for(let i=0;i<3;i++)
  {
  this.textToSpeech.speak({
    text: this.liste,
    locale: 'fr-FR',
    rate: 0.5
});
  }
  });
  
  
  
  }
}
