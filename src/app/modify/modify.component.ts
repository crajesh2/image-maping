import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { imagemaparea } from '../app.imagemap';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  lblname = 'Select Image View';
  imageUrl = '../assets/data/imageselector.json';  
  img = {};   
  imgJson = {};
  private idItem: any;
  
  constructor(private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {     
    this.activatedRoute.params.subscribe(params => {
      this.idItem = params.id;
    });
    this.img = this.http.get(this.imageUrl)
    .map(res => res.json())
    .subscribe(data => {      
      //this.imgJson= JSON.stringify(data, null, 2); // Shows JSON Data in format
      for (let i = 0; i < data.pic_url.length; i++) {        
        if (data.pic_url[i].id === this.idItem) {            
          this.img = data.pic_url[i];
          this.imgJson= JSON.stringify(data.pic_url[i], null, 2)
        }
      }
    });    
  }
  
}
