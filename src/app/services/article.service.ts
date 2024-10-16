import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiBaseUrl = 'https://api.writeonce.de/v1';
  private headers: HttpHeaders; 

  constructor(private http: HttpClient) {
   
    const token = '4gX0kZ7hLqF3cW9s7TjD4vH8kB3vY8Qd';
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });

   }

  getArticles(): Observable<any> {
    return this.http.get('assets/articles.json');
  }

  getArticlesBySysTitle(systitle: string): Observable<any> {

    if (environment.production){
      return this.http.get(`${this.apiBaseUrl}/article/${systitle}`,{ headers: this.headers });

    }else {
     return this.http.get(`assets/writeonce-articles/${systitle}.json`);
    }

   

  }

  
}
