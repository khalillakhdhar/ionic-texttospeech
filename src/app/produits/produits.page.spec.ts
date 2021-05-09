import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduitsPage } from './produits.page';

describe('ProduitsPage', () => {
  let component: ProduitsPage;
  let fixture: ComponentFixture<ProduitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
