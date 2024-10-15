import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcalidrawReactComponent } from './excalidraw-react.component';

describe('ExcalidrawReactComponent', () => {
  let component: ExcalidrawReactComponent;
  let fixture: ComponentFixture<ExcalidrawReactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcalidrawReactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcalidrawReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
