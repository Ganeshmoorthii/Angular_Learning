import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageReactiveComponent } from './login-page-reactive.component';

describe('LoginPageReactiveComponent', () => {
  let component: LoginPageReactiveComponent;
  let fixture: ComponentFixture<LoginPageReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageReactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
