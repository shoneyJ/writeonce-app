import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-article-section',
  templateUrl: './article-section.component.html',
  styleUrl: './article-section.component.css'
})
export class ArticleSectionComponent {
  @Input() heading: string = '';
  @Input() paragraphs: string [] = [];

}
