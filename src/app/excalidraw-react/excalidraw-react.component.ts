import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Excalidraw } from '@excalidraw/excalidraw';

@Component({
  selector: 'app-excalidraw-react',
  template: '<div #reactContainer></div>',
  styleUrl: './excalidraw-react.component.css'
})
export class ExcalidrawReactComponent implements AfterViewInit  {
  @ViewChild('reactContainer', { static: true }) reactContainer!: ElementRef;
  ngAfterViewInit(): void {
    const root = createRoot(this.reactContainer.nativeElement);
    root.render(React.createElement(Excalidraw));
  }

}
