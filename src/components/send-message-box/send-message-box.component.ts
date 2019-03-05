import { Component } from '@angular/core';

@Component({
  selector: 'app-send-message-box',
  templateUrl: 'send-message-box.component.html'
})
export class SendMessageBoxComponent {

  text: string;

  constructor() {
    console.log('Hello SendMessageBoxComponent Component');
    this.text = 'Hello World';
  }

}
