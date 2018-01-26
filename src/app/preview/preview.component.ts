import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { imagemaparea } from '../app.imagemap';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  private idItem: any;
  imageUrl = '../assets/data/imageselector.json';
  img = {};
  constructor(private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idItem = params.id;
    });

    //let imagePost = new imagemaparea(this.http);
    this.img = this.http.get(this.imageUrl)
      .map(res => res.json())
      .subscribe(data => {
        for (let i = 0; i < data.pic_url.length; i++) {
          if (data.pic_url[i].id === this.idItem) {            
            this.img = data.pic_url[i];            
          }
        }
      });
  }

}

