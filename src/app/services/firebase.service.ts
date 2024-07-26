import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Client2 } from '../clients/model/Client';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore = inject(Firestore);

  clientsCollection = collection(this.firestore, 'clients');

  getClients(): Observable<Client2[]> {
    return collectionData(this.clientsCollection, {
      idField: 'id',
    }) as Observable<Client2[]>;
  }

  getSingleClinet(clientId: string): Observable<any> {
    const docRef = doc(this.firestore, 'clients/' + clientId);

    return from(docData(docRef));
  }

  addTodo(payload: Client2): Observable<string> {
    const promise = addDoc(this.clientsCollection, payload).then(
      (response) => response.id
    );
    return from(promise);
  }

  updateClient(client: Client2, clientId: string): Observable<void> {
    const docRef = doc(this.firestore, 'clients/' + clientId);

    const promise = setDoc(docRef, client);

    return from(promise);
  }

  updateTodo(
    todoId: string,
    dataToUpdate: { text: string; isCompleted: boolean }
  ): Observable<void> {
    const docRef = doc(this.firestore, 'todos/' + todoId);
    const promise = setDoc(docRef, dataToUpdate);
    return from(promise);
  }
}
