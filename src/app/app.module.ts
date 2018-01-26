import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { PreviewComponent } from './preview/preview.component';
import { ModifyComponent } from './modify/modify.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component'; 

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'preview', component: PreviewComponent }, { path: 'preview/:id', component: PreviewComponent },
  { path: 'modify', component: ModifyComponent },{ path: 'modify/:id', component: ModifyComponent },
  { path: 'upload', component: UploadComponent },  
  /*
  { path: 'user', children:[
    { path: 'list', component: UserListComponent, childern:[
      {
        path: 'detail/:name', component: UserComponent //<a [rounterLink]="['detail',user.name]">{{user.name}}</a>
      }
    ]}
  ]}
  */   
  { path: '**', redirectTo: '', pathMatch:'full'} 
]

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    ModifyComponent,
    UploadComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
