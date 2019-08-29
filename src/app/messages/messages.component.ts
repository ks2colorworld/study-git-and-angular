import { Component, OnInit } from '@angular/core';
import { MessageService } from "../message.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(
    public messageService: MessageService, // html 코드에서 접근하여 사용해야 하므로 public으로 선언함.
  ) { }

  ngOnInit() {
  }

}
