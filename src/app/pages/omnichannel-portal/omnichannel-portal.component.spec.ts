import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmnichannelPortalComponent } from './omnichannel-portal.component';

describe('OmnichannelPortalComponent', () => {
  let component: OmnichannelPortalComponent;
  let fixture: ComponentFixture<OmnichannelPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OmnichannelPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmnichannelPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
