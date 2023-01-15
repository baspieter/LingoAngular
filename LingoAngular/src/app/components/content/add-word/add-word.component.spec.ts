import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AddWordComponent } from './add-word.component';


describe('AddWordComponent', () => {
  let component: AddWordComponent;
  let fixture: ComponentFixture<AddWordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWordComponent ],
      imports: [ ToastrModule.forRoot() ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation error when typing nothing', fakeAsync(() => {
    spyOn(window, 'alert');
    const debug=fixture.debugElement.query(By.css('#save'));
    debug.nativeElement.click();
    expect(window.alert).toHaveBeenCalledWith('Please add a name');
  }));

  it('should show validation error when typing too many characters', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(window, 'alert');
    setInputValue('#name', 'kerstmisfeest');

    component.name = 'kerstmisfeest';
    const submit = fixture.debugElement.query(By.css('#save'));
    submit.nativeElement.click();
    expect(window.alert).toHaveBeenCalledWith('Name should be 6 characters.');
  }));

  it('should show validation error when typing too less characters', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(window, 'alert');
    setInputValue('#name', 'bus');

    component.name = 'bus';
    const submit = fixture.debugElement.query(By.css('#save'));
    submit.nativeElement.click();
    expect(window.alert).toHaveBeenCalledWith('Name should be 6 characters.');
  }));

  it('should send word to backend when validations succeed.', fakeAsync(() => {
    fixture.detectChanges();
    const submitSpy = spyOn(component, "onSubmit").and.callThrough();
    const emitSpy = spyOn(component.onAddWord, 'emit')
    spyOn(window, 'alert');
    setInputValue('#name', 'bussen');

    component.name = 'bussen';
    const submit = fixture.debugElement.query(By.css('#save'));
    submit.nativeElement.click();

    expect(submitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith({name: 'bussen'});
  }));

  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    tick();
  
    let input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    tick();
  }
});
