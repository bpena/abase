import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostResetPasswordComponent } from './post-reset-password.component';

describe('PostResetPasswordComponent', () => {
  let component: PostResetPasswordComponent;
  let fixture: ComponentFixture<PostResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
