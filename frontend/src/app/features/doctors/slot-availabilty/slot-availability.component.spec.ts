import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlotAvailabilityComponent } from './slot-availability.component';


describe('SlotAvailabilty', () => {
  let component: SlotAvailabilityComponent;
  let fixture: ComponentFixture<SlotAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotAvailabilityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlotAvailabilityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
