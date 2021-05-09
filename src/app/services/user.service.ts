import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  //collection firebase
  create_NewUser(record) {
    return this.firestore.collection("users").add(record);
  }
  read_User() {
    return this.firestore.collection("users").snapshotChanges();
  }
  //${user.uid}

  read_One(id) {
    return this.firestore.collection("users").doc(id).snapshotChanges;
  }
  update_User(recordID, record) {
    this.firestore.doc("users/" + recordID).update(record);
    console.log("updated");
  }
  delete_User(record_id) {
    this.firestore.doc("users/" + record_id).delete();
  }
}
