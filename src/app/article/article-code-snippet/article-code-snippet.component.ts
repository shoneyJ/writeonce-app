import { Component } from '@angular/core';

@Component({
  selector: 'app-article-code-snippet',
  templateUrl: './article-code-snippet.component.html',
  styleUrl: './article-code-snippet.component.css'
})
export class ArticleCodeSnippetComponent {
  codeSnippet: string = `
  function helloWorld() {
      console.log("Hello, World!");
  }
  `;

}
