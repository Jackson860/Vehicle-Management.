import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VLogsuccessComponent } from './v-logsuccess.component';

describe('VLogsuccessComponent', () => {
  let component: VLogsuccessComponent;
  let fixture: ComponentFixture<VLogsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VLogsuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VLogsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
