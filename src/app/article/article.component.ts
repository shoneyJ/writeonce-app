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

  loadBlogPost(systitle: string): void {
 
    this.articleService.getArticlesBySysTitle(systitle).subscribe(resp => {
      // Find the article by title
      this.article = resp;
      this.content = this.article.content;
    });
    
  
  }

}
