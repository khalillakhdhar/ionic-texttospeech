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
prx=0;
x:number;
public matches=[];
Text_application = [];
selected=false;
  constructor(  private textToSpeech: TextToSpeech,public speechRecognition: SpeechRecognition,private cateogrieService:CategorieService,private produitService:ProduitService,) { }
  ngOnInit() {
    if(!Number.isNaN(localStorage.getItem("panier")))
    {
    this.x=parseInt(localStorage.getItem("panier"));
    alert(this.x);
 // alert("ok")  ;
  }
  else
  {
    this.x=0;
    //alert(this.x);
  }
    this.Text_application = [
      " dite retour pour annuler et  ok pour confirmer l'achat"
    ];
    for(let txt of this.Text_application)
    {
      this.convertTextToSpeech_en(txt);
    }
    this.choix=localStorage.getItem("choix");
    this.read();
  }
  convertTextToSpeech_en(text) {
    this.textToSpeech.speak({
      text: text,
      locale: 'fr-FR',
      rate: 0.75
  })
  .then(() => 
    console.log('Done')
  )
  .catch((reason: any) => 
    console.log(reason)
  );
}
startListening(){
  let options = {
    language: 'fr-FR'
  }
this.speechRecognition.startListening(options).subscribe((speeches)=>{
 this.matches=speeches;
 if(this.matches.includes("ok"))
 {
 
this.x=this.x+this.prx;

this.convertTextToSpeech_en("le prix à payer"+ this.prx);
localStorage.setItem("panier",String(this.x));

alert(this.x);
 }
 if(this.matches.includes("retour"))
 {this.back();}

},(err)=>{
 //alert(JSON.stringify(err))
})

 }

 stopListening(){
   this.speechRecognition.stopListening()

 }
  read()
  {
  this.produitService.read_Produits().subscribe(data => {
  
    this.produits = data.map(e => {
      return {
        id: e.payload.doc.id,
  
        titre: e.payload.doc.data()["titre"],
        description: e.payload.doc.data()["description"],
        prix: e.payload.doc.data()["prix"],
        codebarre: e.payload.doc.data()["codebarre"],
       
        
  
      };
    });
  
  
    console.log("liste",this.produits);
    for(let pr of this.produits)
    {
      if(pr.codebarre==this.choix)
     { this.liste=this.liste+" "+pr.titre+", le prix est :  "+pr.prix+",   ";
      this.prx=pr.prix;
    alert(this.prx+this.x);
    }
    }
    console.log("produits",this.produits);
    console.log("liste ",this.liste);
   // alert(this.liste);
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
  back()
  {
window.location.replace("categorie");

  }
}
