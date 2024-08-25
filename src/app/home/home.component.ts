import { Component, OnInit } from '@angular/core';
import { WriteoncedbService } from '../writeoncedb.service';
import { Json } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private writeoncedbService: WriteoncedbService;
  data: Json = {};

  constructor() {

    this.writeoncedbService = new WriteoncedbService('writteonce-blog-user');

  }

  items: { text: string; link?: string; isEditing: boolean }[] = [
    { text: 'No Sugar - Gajar ka Halva', link: 'blog/no-sugar-gajar-ka-halva', isEditing: false },
  ];

  ngOnInit(): void {
    // The WebSocket connection is automatically established when the service is instantiated
  }



  addItem(): void {
    this.items.push({ text: '', isEditing: true });
  }

  saveItem(index: number): void {
    const item = this.items[index];
    if (item.text.trim()) {
      item.isEditing = false;
    } else {
      // If the text is empty, remove the item
      this.items.splice(index, 1);
    }

    this.data['id'] = this.writeoncedbService.convertTextToDocId(item.text);
    this.data['title'] = item.text;
    this.writeoncedbService.insert(this.data['id'], this.data);


  }

}
