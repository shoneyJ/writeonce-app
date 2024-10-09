import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  title: string | null = null;
  article: any;
  content: any;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private articleService: ArticleService
  ) { }
 
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.title = params.get('systitle');
      if (this.title){
        this.loadBlogPost(this.title);
      }
      
    });
  }

  loadBlogPost(systitle: string | null): void {
 
    this.articleService.getArticles().subscribe(articles => {
      // Find the article by title
      this.article = articles.find((article: any) => article.systitle === systitle);
      this.content = this.article.content;
    });
    
  
  }

}
