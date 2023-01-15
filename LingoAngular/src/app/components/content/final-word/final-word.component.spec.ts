import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { FinalWordComponent } from './final-word.component';

describe('FinalWordComponent', () => {
  let component: FinalWordComponent;
  let fixture: ComponentFixture<FinalWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalWordComponent ],
      imports: [ ToastrModule.forRoot() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
