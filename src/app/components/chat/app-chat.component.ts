import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './app-chat.component.html',
  styleUrls: ['./app-chat.component.scss']
})
export class AppChatComponent implements OnInit, OnChanges, OnDestroy {
  @Input() doubtMessage: string = '';  // Mensagem de dúvida recebida do pai
  @Input() successMessage: string = '';  // Mensagem de sucesso recebida do pai
  @Input() doubtTitle: string = 'Está tudo bem?';  // Título de dúvida dinâmico
  @Input() successTitle: string = 'Que legal!';  // Título de sucesso dinâmico

  isChatVisible: boolean = false;
  messages: Array<{ id: string, title: string, message: string, timestamp: Date }> = [];
  editableMessage: string = ''; // Mensagem que o usuário digita no textarea

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isChatVisible = true;
      this.loadMessages(); // Carrega as mensagens do localStorage
    }, 3000);

    window.addEventListener('storage', this.loadMessages.bind(this)); // Escuta por mudanças no localStorage
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se a mensagem de dúvida foi alterada
    if (changes['doubtMessage'] && this.doubtMessage) {
      this.addMessageToLocalStorage(this.doubtMessage, this.doubtTitle);
    }

    // Verifica se a mensagem de sucesso foi alterada
    if (changes['successMessage'] && this.successMessage) {
      this.addMessageToLocalStorage(this.successMessage, this.successTitle);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.loadMessages.bind(this)); // Limpa o listener quando o componente for destruído
  }

  // Carrega mensagens do localStorage
  loadMessages(): void {
    const chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    this.messages = chatMessages;
  }

  // Envia a mensagem do usuário e uma mensagem padrão após o envio
  sendMessage(): void {
    if (this.editableMessage.trim()) {
      const userMessage = this.editableMessage.trim();
      this.addMessageToLocalStorage(userMessage, 'Mensagem do Usuário'); // Armazena a mensagem do usuário
      this.editableMessage = ''; // Limpa o campo do textarea

      // Envia a mensagem padrão após o envio da mensagem do usuário
      this.sendDefaultMessage();
    }
  }

  // Envia a mensagem padrão ao clicar no botão de enviar
  sendDefaultMessage(): void {
    const defaultMessage = 'Oi! 😊 Se precisar de ajuda ou tiver alguma dúvida, é só chamar no Whatsapp que está em nosso site! Estamos aqui para te ajudar e garantir que tudo dê certo! 💬✨ Vamos fazer de tudo para te atender rapidinho! 🚀💙';
    this.addMessageToLocalStorage(defaultMessage, 'Atendimento - Chat'); // Armazena no localStorage
  }

  // Função para armazenar mensagens no localStorage
  private addMessageToLocalStorage(message: string, type: string): void {
    if (!message) return;

    const messageId = `msg-${new Date().getTime()}`;
    const newMessage = {
      id: messageId,
      title: type,
      message: message,
      timestamp: new Date()
    };

    const chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    chatMessages.push(newMessage);
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));

    // Atualiza as mensagens no chat imediatamente
    this.loadMessages();
  }
}
