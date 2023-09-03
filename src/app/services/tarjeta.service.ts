import { Injectable } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionSnapshots, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { TarjetaCredito } from '../models/tarjeta-credito';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  tarjetaCollection: CollectionReference;
  tarjeta$ = new Subject<TarjetaCredito>();

  constructor(private firebase: Firestore) {
    this.tarjetaCollection = collection(this.firebase, 'tarjeta');
  }

  storeTarjeta(tarjeta: TarjetaCredito): Promise<any> {
    return addDoc(this.tarjetaCollection, tarjeta.object());
  }

  getTarjetas(): Observable<any> {
    //return collectionChanges(this.tarjetaCollection);
    return collectionSnapshots(this.tarjetaCollection)
  }

  removeTarjeta(id: string): Promise<any> {
    const ref = doc(this.tarjetaCollection, id);
    console.log(ref);
    return deleteDoc(ref);
  }


  editTarjeta(id: string, tarjeta: TarjetaCredito): Promise<any> {
    const ref = doc(this.tarjetaCollection, id);
    return updateDoc(ref, tarjeta.object());
  }


  addTarjetaEdit(tarjeta: TarjetaCredito) {
    this.tarjeta$.next(tarjeta);
  }

  getTarjetaEdit(): Observable<TarjetaCredito> {
    return this.tarjeta$ as Observable<TarjetaCredito>;
  }

}
