import { Item } from '../shared/item';

import { ItemService } from '../shared/item.service';

import { Component } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Event {
  title:string;
  description:string;
  location:string;
}

interface EventId extends Event { 
  id:string;
}

@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent {
  eventsCol: AngularFirestoreCollection<Event>;
  events: any;

  eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;

  title:string;
  description:string;
  location:string; 

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.eventsCol = this.afs.collection('events');
   // this.posts = this.postsCol.valueChanges();
    this.events = this.eventsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  addEvent() {
     //     this.afs.collection('posts').add({'title': this.title, 'content': this.content});
    this.afs.collection('events').doc(this.location).set({'title': this.title, 'description': this.description, 'location': this.location});
  }

}
