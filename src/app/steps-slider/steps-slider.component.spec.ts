import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsSliderComponent } from './steps-slider.component';

describe('StepsSliderComponent', () => {
  let component: StepsSliderComponent;
  let fixture: ComponentFixture<StepsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
