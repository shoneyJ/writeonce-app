import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css'
})
export class SummaryCardComponent implements  OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @Input() router: string = '';
  @Input() introduction: string = '';
  @Input() title: string = '';
  @Input() tags: string []= [];

}
