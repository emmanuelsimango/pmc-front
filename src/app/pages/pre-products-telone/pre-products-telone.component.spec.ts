import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreProductsTeloneComponent } from './pre-products-telone.component';

describe('PreProductsTeloneComponent', () => {
  let component: PreProductsTeloneComponent;
  let fixture: ComponentFixture<PreProductsTeloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreProductsTeloneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreProductsTeloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
