import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VListComponent } from './v-list.component';

describe('VListComponent', () => {
  let component: VListComponent;
  let fixture: ComponentFixture<VListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
