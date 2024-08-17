import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  title: string | null = null;

  constructor(private route: ActivatedRoute,private sanitizer: DomSanitizer) { }
  content: SafeHtml = '';  // Use SafeHtml type for sanitized content
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.title = params.get('title');
      this.loadBlogPost(this.title);
    });
  }

  loadBlogPost(title: string | null): void {
    // Logic to determine category or load the blog post based on the title
    // Example: you might load different data based on the title or parse the title to determine the category
    this.content = this.sanitizer.bypassSecurityTrustHtml('<p>Planning your next adventure? Check out our list of the <strong>top 10 travel destinations for 2024</strong>, featuring breathtaking landscapes, vibrant cultures, and unforgettable experiences.</p>')
  
  }

}
