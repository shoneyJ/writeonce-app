import { Component, AfterViewInit, Input, OnInit} from '@angular/core';
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; 
import {Clipboard} from '@angular/cdk/clipboard';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-code-snippet',
  templateUrl: './article-code-snippet.component.html',
  styleUrl: './article-code-snippet.component.css'
})
export class ArticleCodeSnippetComponent implements AfterViewInit, OnInit {
  
  /**
   *
   */
  faCopy = faCopy;

  copyText : string = "";
  constructor(private clipboard: Clipboard) {}
  ngOnInit(): void {
    this.initCopyBtn();
  }
  
  ngAfterViewInit(): void {
     // Highlight the code after view initialization
     (window as any).Prism.highlightAll();
  }
 
  @Input() codeSnippet: string = ``;

  @Input() title: string = "";
  @Input() codeLang: string = "";


  copyCode(){
    this.clipboard.copy(this.codeSnippet);
    this.copyText = "Copied!";
    this.faCopy = faCheck;

    setTimeout(() => {
      this.initCopyBtn(); 
    }, 2000);
  }

  initCopyBtn(){

    this.copyText = "Copy";
    this.faCopy = faCopy;

  }
 


}
