import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoComponent } from './disco.component';

describe('DiscoComponent', () => {
  let component: DiscoComponent;
  let fixture: ComponentFixture<DiscoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
