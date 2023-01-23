import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDialogeComponent } from './logout-dialoge.component';

describe('LogoutDialogeComponent', () => {
  let component: LogoutDialogeComponent;
  let fixture: ComponentFixture<LogoutDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutDialogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
