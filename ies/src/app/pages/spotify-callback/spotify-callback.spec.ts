import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyCallback } from './spotify-callback';

describe('SpotifyCallback', () => {
  let component: SpotifyCallback;
  let fixture: ComponentFixture<SpotifyCallback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyCallback],
    }).compileComponents();

    fixture = TestBed.createComponent(SpotifyCallback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
