import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageTemplateComponent } from './login-page-template.component';

describe('LoginPageTemplateComponent', () => {
  let component: LoginPageTemplateComponent;
  let fixture: ComponentFixture<LoginPageTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
