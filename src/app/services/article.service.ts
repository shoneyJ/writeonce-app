import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ArticleContent } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private dbApiBaseUrl = 'https://api.writeonce.de/db';
  private awsApiBaseUrl = 'https://api.writeonce.de/aws';
  private headers: HttpHeaders; 

  constructor(private http: HttpClient) {
   
    const token = '4gX0kZ7hLqF3cW9s7TjD4vH8kB3vY8Qd';
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

   }

  getArticles(): Observable<any> {
    return this.http.get('assets/articles.json');
  }

  getArticlesBySysTitle(systitle: string): Observable<any> {

    if (environment.production){
      return this.http.get(`${this.dbApiBaseUrl}/article/${systitle}`, { headers: this.headers });

    }else {
     return this.http.get(`assets/writeonce-articles/${systitle}.json`);
    }

  }

  getArticlesPagination(skip: number, limit: number): Observable<ArticleContent[]> {

    if (environment.production){
      return this.http.get<ArticleContent[]>(`${this.dbApiBaseUrl}/articles/${skip}/${limit}`, { headers: this.headers });

    }else {
     return this.http.get<ArticleContent[]>(`assets/writeonce-articles/page.json`);
    }

  }

  getArticlesCount(): Observable<any> {

    if (environment.production){
      return this.http.get<ArticleContent[]>(`${this.dbApiBaseUrl}/articles/count`, { headers: this.headers });

    }else {
     return of({"count": 10});
    }

  }


  getMarkdown(fileName: string): Observable<string> {

    if (environment.production) {
      return this.http.get(`${this.awsApiBaseUrl}/markdown/${fileName}`,
        { 
          responseType: 'text',
          headers: this.headers
       });

    } else {
     return this.http.get(`assets/writeonce-articles/${fileName}.md`, { responseType: 'text' });
    }
  }
  
}
