import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetresultComponent } from './setresult.component';

describe('SetresultComponent', () => {
  let component: SetresultComponent;
  let fixture: ComponentFixture<SetresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
