import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HetIsJeVerjaardagGame } from './het-is-je-verjaardag-game';

describe('HetIsJeVerjaardagGame', () => {
  let component: HetIsJeVerjaardagGame;
  let fixture: ComponentFixture<HetIsJeVerjaardagGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HetIsJeVerjaardagGame],
    }).compileComponents();

    fixture = TestBed.createComponent(HetIsJeVerjaardagGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
