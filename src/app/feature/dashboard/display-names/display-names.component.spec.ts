import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNamesComponent } from './display-names.component';

describe('DisplayNamesComponent', () => {
  let component: DisplayNamesComponent;
  let fixture: ComponentFixture<DisplayNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayNamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
