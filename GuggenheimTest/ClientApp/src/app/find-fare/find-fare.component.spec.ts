import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFareComponent } from './find-fare.component';

describe('FindFareComponent', () => {
  let component: FindFareComponent;
  let fixture: ComponentFixture<FindFareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindFareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
