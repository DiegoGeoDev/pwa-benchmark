import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Benchmark01 } from './benchmark-01';

describe('Benchmark01', () => {
  let component: Benchmark01;
  let fixture: ComponentFixture<Benchmark01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Benchmark01]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Benchmark01);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
