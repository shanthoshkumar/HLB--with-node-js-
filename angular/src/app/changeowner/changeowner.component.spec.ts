import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeownerComponent } from './changeowner.component';

describe('ChangeownerComponent', () => {
  let component: ChangeownerComponent;
  let fixture: ComponentFixture<ChangeownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
