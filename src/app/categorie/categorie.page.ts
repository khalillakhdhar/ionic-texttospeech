import { Component, OnInit } from '@angular/core';
import { Categorie } from '../classes/categorie';
import { CategorieService } from '../services/categorie.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {
  categorie:Categorie;
  categories:Categorie[];
  liste="";
  constructor(    private textToSpeech: TextToSpeech,public speechRecognition: SpeechRecognition
,    private cateogrieService:CategorieService) { }
  public matches=[];

  ngOnInit() {
this.categorie=new Categorie();
      this.read();
      alert(this.liste);
     
    this.textToSpeech.speak({
      text: this.liste,
      locale: 'fr-FR',
      rate: 0.75
  });
  
  }
  read()
{
  this.cateogrieService.read_Categories().subscribe(data => {

    this.categories = data.map(e => {
      return {
       id: e.payload.doc.id,

      
       titre: e.payload.doc.data()["titre"],
       description: e.payload.doc.data()["description"],



      };
    });
    console.log(this.categories);
  for(let ca of this.categories)
  {
    this.liste=this.liste+" "+ca.titre;
  }
  });

}
   
startListening(){
  let options = {
    language: 'fr-FR'
  }
this.speechRecognition.startListening(options).subscribe((speeches)=>{
 this.matches=speeches;
 if(this.matches.length>0)
 {
   window.location.replace("produits");
 }
},(err)=>{
 alert(JSON.stringify(err))
})

 }

}
