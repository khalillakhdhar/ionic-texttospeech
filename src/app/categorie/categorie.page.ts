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
  constructor(private cateogrieService:CategorieService) { }
  public matches=[];

  ngOnInit() {
this.categorie=new Categorie();
      this.read();
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

  });

}


}
