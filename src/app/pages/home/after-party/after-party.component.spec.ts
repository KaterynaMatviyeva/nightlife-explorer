import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterPartyComponent } from './after-party.component';

describe('AfterPartyComponent', () => {
  let component: AfterPartyComponent;
  let fixture: ComponentFixture<AfterPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfterPartyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
