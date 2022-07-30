import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinalWordComponent } from './add-final-word.component';

describe('AddFinalWordComponent', () => {
  let component: AddFinalWordComponent;
  let fixture: ComponentFixture<AddFinalWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFinalWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFinalWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
