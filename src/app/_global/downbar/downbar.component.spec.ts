import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownbarComponent } from './downbar.component';

describe('DownbarComponent', () => {
  let component: DownbarComponent;
  let fixture: ComponentFixture<DownbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
