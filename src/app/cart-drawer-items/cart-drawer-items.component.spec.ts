import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDrawerItemsComponent } from './cart-drawer-items.component';

describe('CartDrawerItemsComponent', () => {
  let component: CartDrawerItemsComponent;
  let fixture: ComponentFixture<CartDrawerItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDrawerItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDrawerItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
