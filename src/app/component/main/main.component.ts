import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(
    private message: MessageService
  ) { }

  ngOnInit() {
    this.message.start();
  }

  ngOnDestroy() {
    this.message.stop();
  }

}
