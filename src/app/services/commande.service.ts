import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class Commandeservice {
  id: string;
  constructor(private firestore: AngularFirestore) {}

  create_NewCommande(record) {
    return this.firestore.collection("Commandes").add(record);
  }

  read_Commandes() {
    return this.firestore.collection("Commandes").snapshotChanges();
  }
  read_mesCommandes() {
    let u = JSON.parse(localStorage.getItem("user"));
    return this.firestore
      .collection("Commandes", (ref) => ref.where("iduser", "==", u.uid))
      .snapshotChanges();
  }
  update_Commande(recordID, record) {
    this.firestore.doc("Commandes/" + recordID).update(record);
    console.log("updated");
  }

  delete_Commande(record_id) {
    this.firestore.doc("Commandes/" + record_id).delete();
  }
}
