import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMiniComponent } from './order-mini.component';

describe('OrderMiniComponent', () => {
  let component: OrderMiniComponent;
  let fixture: ComponentFixture<OrderMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
