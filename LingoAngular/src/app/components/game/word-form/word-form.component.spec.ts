import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { WordFormComponent } from './word-form.component';

describe('WordFormComponent', () => {
  let component: WordFormComponent;
  let fixture: ComponentFixture<WordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordFormComponent ],
      imports: [ ToastrModule.forRoot() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordFormComponent);
    component = fixture.componentInstance;
    component.wordEntries = [];
    component.correctWord = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
