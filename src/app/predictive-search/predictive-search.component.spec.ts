import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictiveSearchComponent } from './predictive-search.component';

describe('PredictiveSearchComponent', () => {
  let component: PredictiveSearchComponent;
  let fixture: ComponentFixture<PredictiveSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictiveSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictiveSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
