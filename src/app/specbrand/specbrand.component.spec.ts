import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecbrandComponent } from './specbrand.component';

describe('SpecbrandComponent', () => {
  let component: SpecbrandComponent;
  let fixture: ComponentFixture<SpecbrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecbrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
