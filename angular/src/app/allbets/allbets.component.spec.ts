import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbetsComponent } from './allbets.component';

describe('AllbetsComponent', () => {
  let component: AllbetsComponent;
  let fixture: ComponentFixture<AllbetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllbetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllbetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
