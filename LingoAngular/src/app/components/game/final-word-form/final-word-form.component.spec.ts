import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { FinalWordFormComponent } from './final-word-form.component';

describe('FinalWordFormComponent', () => {
  let component: FinalWordFormComponent;
  let fixture: ComponentFixture<FinalWordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalWordFormComponent ],
      imports: [ ToastrModule.forRoot() ]
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
