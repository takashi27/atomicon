import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgwWowService } from 'ngx-wow';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'atomicon';
  constructor(firestore: AngularFirestore, private wowService: NgwWowService){

  }
  ngOnInit(): void {
    this.wowService.init();
  }
}
