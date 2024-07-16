import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet, HeaderComponent, SpinnerComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render header component', () => {
    const headerElement = fixture.debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should render spinner component', () => {
    const spinnerElement = fixture.debugElement.query(By.css('app-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should render router outlet', () => {
    const routerOutletElement = fixture.debugElement.query(
      By.directive(RouterOutlet)
    );
    expect(routerOutletElement).toBeTruthy();
  });
});
