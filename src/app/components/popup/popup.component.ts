import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../../services/popup/popup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {
  title: string = '';
  message: string = '';
  buttonText: string = 'OK';
  show: boolean = false;
  redirectRoute?: string;
  private popupSubscription: Subscription;

  constructor(private router: Router, private popupService: PopupService) {
    // Inscrevendo-se no estado do popup
    this.popupSubscription = this.popupService.popupState$.subscribe(state => {
      this.title = state.title;
      this.message = state.message;
      this.buttonText = state.buttonText;
      this.show = state.show;
      this.redirectRoute = state.redirectRoute;  // Obtendo a rota para redirecionamento, se houver
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // Limpeza da inscrição
    this.popupSubscription.unsubscribe();
  }

  // Função chamada ao clicar no botão de fechamento
  onClose(): void {
    // Aciona a transição de saída
    this.show = false;

    // Após a animação de saída, esconde o popup
    setTimeout(() => {
      this.popupService.hidePopup();

      if (this.redirectRoute) {
        this.router.navigate([this.redirectRoute]);
      }
    }, 700);
  }
}
