import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { imagemaparea } from '../app.imagemap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lblname = 'Select Image View';
  imageUrl = '../assets/data/imageselector.json';
  img = {};
  constructor(private http: Http) { }
  ngOnInit() {    
    this.img = this.http.get(this.imageUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.img = data;
      });
  }
}
