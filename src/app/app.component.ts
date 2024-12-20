import { AfterViewInit, Component, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'FrontEndAngular';
  isLoading: boolean = true;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {

      setTimeout(() => {
        this.ngZone.run(() => {

          this.isLoading = false;

          this.cdr.detectChanges();
        });
      }, 2000);
    });
  }
}
