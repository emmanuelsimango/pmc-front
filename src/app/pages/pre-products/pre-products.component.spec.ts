import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreProductsComponent } from './pre-products.component';

describe('PreProductsComponent', () => {
  let component: PreProductsComponent;
  let fixture: ComponentFixture<PreProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
