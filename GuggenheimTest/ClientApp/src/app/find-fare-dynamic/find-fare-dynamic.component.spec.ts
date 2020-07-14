/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FindFareDynamicComponent } from './find-fare-dynamic.component';

describe('FindFareDynamicComponent', () => {
  let component: FindFareDynamicComponent;
  let fixture: ComponentFixture<FindFareDynamicComponent>;
  const baseUrl = document.getElementsByTagName('base')[0].href;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindFareDynamicComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: 'BASE_URL', baseUrl }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFareDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*   it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
