import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FindFareComponent } from './find-fare.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken } from '@angular/core';
export const BASE_URL = new InjectionToken<string>('BASE_URL');
describe('FindFareComponent', () => {
  let component: FindFareComponent;
  let fixture: ComponentFixture<FindFareComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const baseUrl = document.getElementsByTagName('base')[0].href;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FindFareComponent
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: 'BASE_URL', baseUrl }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFareComponent);
    component = fixture.componentInstance;

    component.staticTrip = formBuilder.group({
      date: '2020-07-17',
      milesUnder6: 2,
      minAbove6: 5,
      time: '05:30'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be value', () =>{
    expect(component.staticTrip.valid).toBeTruthy();
  });

});
