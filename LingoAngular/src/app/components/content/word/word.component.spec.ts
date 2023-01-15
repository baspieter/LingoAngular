import { ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { async, of } from 'rxjs';
import { WordService } from 'src/app/services/word.service';

import { WordComponent } from './word.component';

describe('WordComponent', () => {
  let component: WordComponent;
  let fixture: ComponentFixture<WordComponent>;
  let mockWordService: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WordComponent ],
      imports: [ ToastrModule.forRoot() ]
    }).compileComponents();

    mockWordService = TestBed.inject(WordService);
    spyOn(mockWordService, 'getWords').and.returnValue(of([{id: 1, name: 'bussen'}]));

    fixture = TestBed.createComponent(WordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.u-text-3xl')?.textContent).toContain('Word');
    expect(compiled.querySelector('td')?.textContent).toContain('bussen');
  });
});
