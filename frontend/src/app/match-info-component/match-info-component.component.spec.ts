import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchInfoComponentComponent } from './match-info-component.component';

describe('MatchInfoComponentComponent', () => {
  let component: MatchInfoComponentComponent;
  let fixture: ComponentFixture<MatchInfoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchInfoComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
