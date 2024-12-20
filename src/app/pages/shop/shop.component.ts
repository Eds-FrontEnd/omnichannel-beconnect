import { Component, Output, EventEmitter } from '@angular/core';
import { PopupService } from '../../services/popup/popup.service';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  cartOpen: boolean = false;
  cartItems: any[] = [];
  products = [
    { id: 1, name: 'Tênis Nike Casual', price: 399.00, image: '../../../assets/images/shoes_01.png', installments: 39.90 },
    { id: 2, name: 'Tênis Nike Dynamic', price: 499.00, image: '../../../assets/images/shoes_02.png', installments: 49.90 },
    { id: 3, name: 'Tênis Nike Camaleon', price: 599.00, image: '../../../assets/images/shoes_03.png', installments: 59.90 },
    { id: 4, name: 'Tênis Nike Basket', price: 699.00, image: '../../../assets/images/shoes_04.png', installments: 69.90 }
  ];

  constructor(private popupService: PopupService) {}

  // Método para enviar a mensagem de dúvida
  // Mensagens e Títulos para serem passados para o filho
  doubtMessage: string = '';
  successMessage: string = '';
  doubtTitle: string = '';  // Título dinâmico de dúvida
  successTitle: string = '';  // Título dinâmico de sucesso

  // Método para enviar a mensagem de dúvida
  sendDoubtMessage(): void {
    this.doubtMessage = 'Ah, não 😞! Parece que você não conseguiu finalizar a sua compra... Estamos aqui para ajudar! 💬🛒 O que podemos fazer para te ajudar a completar seu pedido? 🤔🚀';
    this.doubtTitle = 'Loja Virtual - Dúvidas?';
  }

  // Método para enviar a mensagem de sucesso
  sendSuccessMessage(): void {
    this.successMessage = '🎉 Uhuul! Parabéns pela sua compra! 🛍️💫 Estamos super felizes por você! 🥳✨ Agora, é só aguardar o seu pedido chegar e aproveitar a compra! 🚚🎁';
    this.successTitle = 'Loja Virtual - Sucesso';
  }

  // Toggle entre abrir e fechar o carrinho
  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  // Adicionar produto ao carrinho
  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id); // Verificar se o item já está no carrinho
    if (existingItem) {
      existingItem.quantity += 1;  // Se já existe, aumenta a quantidade
    } else {
      this.cartItems.push({ ...product, quantity: 1 });  // Se não existe, adiciona novo item
    }

    this.cartOpen = true; // Abre o carrinho imediatamente após adicionar um item
  }

  // Atualizar quantidade de um item no carrinho
  updateQuantity(item: any, change: number) {
    if (item.quantity + change > 0) {
      item.quantity += change;
    }
  }

  // Calcular o preço total do carrinho
  totalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2).replace('.', ',');
  }

  // Remover um item do carrinho baseado no id
  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id); // Filtra os itens que têm id diferente do que foi removido
  }

  // Método para finalizar a compra e mostrar o popup
  payProducts() {
    this.popupService.showPopup(
      'Compra realizada com Sucesso!',
      'Obrigado pela preferência!',
      'Ok',
      '/contact'
    );
  }
}
