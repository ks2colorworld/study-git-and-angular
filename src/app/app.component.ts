import { environment } from './../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'angular-project-management-with-github';
  addTitle = environment.detailMessage? ' with detail message':'!';
  title = environment.server_url.toString() + this.addTitle ;
}
