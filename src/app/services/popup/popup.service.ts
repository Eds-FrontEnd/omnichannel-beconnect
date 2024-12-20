import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupSubject = new BehaviorSubject<{
    title: string;
    message: string;
    buttonText: string;
    show: boolean;
    redirectRoute?: string;  // Rota dinâmica opcional
  }>({
    title: '',
    message: '',
    buttonText: 'OK',
    show: false
  });

  popupState$ = this.popupSubject.asObservable();

  constructor() {}

  // Mostrar o popup com a rota dinâmica
  showPopup(
    title: string,
    message: string,
    buttonText: string = 'OK',
    redirectRoute?: string  // Rota dinâmica opcional
  ): void {
    this.popupSubject.next({
      title,
      message,
      buttonText,
      show: true,
      redirectRoute  // Passa a rota dinâmica para o estado do popup
    });
  }

  hidePopup(): void {
    this.popupSubject.next({ ...this.popupSubject.value, show: false });
  }
}
