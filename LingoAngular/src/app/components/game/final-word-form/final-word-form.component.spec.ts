import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalWordFormComponent } from './final-word-form.component';

describe('FinalWordFormComponent', () => {
  let component: FinalWordFormComponent;
  let fixture: ComponentFixture<FinalWordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalWordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalWordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
