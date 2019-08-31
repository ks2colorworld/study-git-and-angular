import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[]=[];

  add(message:string){
    this.messages.push(message);
    this.messages.reverse(); //새 메시지가 맨 위로 나오게끔.
  }

  clear(){
    this.messages = [];
  }

  constructor() { }
}
