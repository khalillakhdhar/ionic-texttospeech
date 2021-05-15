import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../classes/categorie';
import { Produit } from '../classes/produit';
import { CategorieService } from '../services/categorie.service';
import { ProduitService } from '../services/produit.service';

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
selected=false;
  constructor(private cateogrieService:CategorieService,private produitService:ProduitService,) { }

  ngOnInit() {
    
    this.choix=localStorage.getItem("choix");
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
  
  });
  
  
  
  }
}
