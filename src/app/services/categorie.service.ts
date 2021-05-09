import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewUser(record) {
    return this.firestore.collection('Categories').add(record);
  }

  read_Categories() {
    return this.firestore.collection('Categories').snapshotChanges();
  }

  update_User(recordID, record) {
    this.firestore.doc('Categories/' + recordID).update(record);
    console.log('updated');
  }

  delete_User(record_id) {
    this.firestore.doc('Categories/' + record_id).delete();
  }
}
