import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '@security/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bbase';
  mobileQuery: MediaQueryList;
  isLogged: any;

  fillerNav = Array(5).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService,
            private changeDetectorRef: ChangeDetectorRef,
            private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.isLogged = this.authService.isLogged();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
