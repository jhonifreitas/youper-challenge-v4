import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from '../../interfaces/user';
import { Message } from '../../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userCollection: AngularFirestoreCollection<User>;
  private messagesCollection: AngularFirestoreCollection<Message>;

  constructor(private db: AngularFirestore) {
    this.userCollection = db.collection<User>('users');
    this.messagesCollection = db.collection<Message>('messages');
  }

  // MESSAGES
  getMessages(user_id: string) {
    return this.db.collection<Message>('messages', ref => ref.where('user', '==', user_id))
    .snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  putMessage(message: Message, id: string) {
    return this.messagesCollection.doc(id).update(message);
  }

  // USER
  getUser(id) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  putUser(user: User, id: string) {
    return this.userCollection.doc(id).update(user);
  }
}
