import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private db: AngularFireDatabase) {}

  onSearchInputChange() {
    if (this.searchQuery === '') {
      this.searchResults = [];
      return;
    }

    this.db.list('/users', ref => ref.orderByChild('username').startAt(this.searchQuery).endAt(this.searchQuery + '\uf8ff'))
      .snapshotChanges()
      .subscribe((snapshot) => {
        this.searchResults = snapshot.map((item) => {
          const data = item.payload.val();
          const id = item.key;
          console.log(Object.assign({id},data));
          
          return Object.assign({id},data);
        });
      });
  }
}