import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionSliderComponent } from './solution-slider.component';

describe('SolutionSliderComponent', () => {
  let component: SolutionSliderComponent;
  let fixture: ComponentFixture<SolutionSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
