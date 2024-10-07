import { Component, AfterViewInit, Input} from '@angular/core';
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; 

@Component({
  selector: 'app-article-code-snippet',
  templateUrl: './article-code-snippet.component.html',
  styleUrl: './article-code-snippet.component.css'
})
export class ArticleCodeSnippetComponent {
  @Input() codeSnippet: string = ``;

  @Input() title: string = "";

  AfterViewInit() {
    // Highlight the code after view initialization
    (window as any).Prism.highlightAll();
  }

}
