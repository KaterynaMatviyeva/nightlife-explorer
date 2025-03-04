import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePartyComponent } from './pre-party.component';

describe('PrePartyComponent', () => {
  let component: PrePartyComponent;
  let fixture: ComponentFixture<PrePartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrePartyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrePartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
