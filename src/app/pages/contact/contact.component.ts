import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Mensagens e Títulos para serem passados para o filho
  doubtMessage: string = '';
  successMessage: string = '';
  doubtTitle: string = '';  // Título dinâmico de dúvida
  successTitle: string = '';  // Título dinâmico de sucesso

  // Método para enviar a mensagem de dúvida
  sendDoubtMessage(): void {
    this.doubtMessage = 'Ficamos tristes que não conseguiu finalizar a sua compra, podemos te ajudar?';
    this.doubtTitle = 'Canal de Atendimento - Dúvidas?';
  }

  // Método para enviar a mensagem de sucesso
  sendSuccessMessage(): void {
    this.successMessage = 'Parabéns por finalizar a sua compra!';
    this.successTitle = 'Canal de Atendimento - Sucesso';
  }
}
