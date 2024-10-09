import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

 

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    return this.http.get('assets/articles.json');
  }

  getArticlesBySysTitle(systitle: string): Observable<any> {

    return this.getArticles().pipe(
      map((articles: any[]) => {
        // Find the article by title
        return articles.find((article: any) => article.systitle === systitle);
      })
    )

  }

  // getCodeSnipets(systitle: string,sectionIndex: number, paragraphIndex: number): Observable<any> {

  //  return this.getArticlesBySysTitle(systitle).pipe(

  //   map ((article:any)=>{

  //     return article.content.codes

  //   })

  //   )
    
  // }
}
