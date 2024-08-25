import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('wss://api.writeonce.de');
    this.connect();
  }

  private connect(): void {
    // Create the WebSocket connection   

    // Set up event listeners
    this.socket.onopen = () => {
      console.log('WebSocket connection opened');
      this.sendMessage();
    };

    this.socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };
  }

  private sendMessage(): void {
    const message = 'insert into writteonce-blog-user of doc id:user:1; json ={"name": "shoney", "age": 30}.';
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
      console.log('Message sent:', message);
    } else {
      console.error('WebSocket is not open. Message not sent.');
    }
  }

  // Optionally, you can add more methods to handle sending and receiving messages
  public sendCustomMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
      console.log('Custom message sent:', message);
    } else {
      console.error('WebSocket is not open. Custom message not sent.');
    }
  }

  public closeConnection(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
