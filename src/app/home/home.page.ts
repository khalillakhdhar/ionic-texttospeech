import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public matches=[];

  Text_app = [];
  Text_application = [];

  constructor(
    private textToSpeech: TextToSpeech,public speechRecognition: SpeechRecognition
  ) {
    this.Text_app = [
      "Bonjour",
      "Je suis l'application",
      "je suis ici pour vous aider",
      "Dite catégorie pour entendre la liste!"      
    ];
    this.Text_application = [
      "Bonjour Je suis l'application je suis ici pour vous aider Dite catégorie pour entendre la liste!"
    ];


  }
  ngOnInit() {
    this.speechRecognition.requestPermission();

  for(let txt of this.Text_application)
  {
    this.convertTextToSpeech_en(txt);
  }
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

 
  checkPermission(){
    this.speechRecognition.hasPermission().then((permission)=>{
      if(permission){
   
       alert("Already has permission for speech recognition")
      }
      else{
        alert("Not permission yet")
      }
   
    }, (err)=>{
     alert(JSON.stringify(err))
    })
   
     }
   
     requestPermission(){
       
       this.speechRecognition.requestPermission().then((data)=>{
   
         alert(JSON.stringify(data))
   
       }, (err)=>{
         alert(JSON.stringify(err))
       })
   
     }
     
     startListening(){
      let options = {
        language: 'fr-FR'
      }
   this.speechRecognition.startListening(options).subscribe((speeches)=>{
     this.matches=speeches;
     if(this.matches.includes("catégorie"))
     {
       window.location.replace("categorie");
     }
   },(err)=>{
     alert(JSON.stringify(err))
   })
   
     }
   
     stopListening(){
       this.speechRecognition.stopListening()
   
     }

}
