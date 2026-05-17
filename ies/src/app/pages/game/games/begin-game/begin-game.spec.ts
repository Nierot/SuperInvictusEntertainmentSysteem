import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginGame } from './begin-game';

describe('BeginGame', () => {
  let component: BeginGame;
  let fixture: ComponentFixture<BeginGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeginGame],
    }).compileComponents();

    fixture = TestBed.createComponent(BeginGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
