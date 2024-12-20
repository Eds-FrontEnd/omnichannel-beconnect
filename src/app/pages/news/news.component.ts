import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  standalone: false,
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  // Array de posts, cada post possui id, título, conteúdo, imagem, contadores de curtidas e comentários, e os comentários
  posts = [
    {
      id: 1,
      title: '🛒 A Revolução das Compras Online: Transformando o Mundo do E-commerce! 🚀',
      content: `O e-commerce não para de evoluir! 🌐 Em um mundo cada vez mais conectado, as compras online se tornaram mais rápidas, práticas e seguras...`,
      image: '../../../assets/images/tech.png',
      likeCount: 0,
      commentCount: 0,
      comments: [] as string[],  // Definindo explicitamente como array de strings
    },
    {
      id: 2,
      title: 'Compras nas Lojas Virtuais: A Inovação Está Mudando Tudo! 🌟',
      content: `As lojas virtuais estão em constante inovação! A cada dia, novas tecnologias chegam para melhorar nossa experiência de compra online...`,
      image: '../../../assets/images/ecommerce.png',
      likeCount: 0,
      commentCount: 0,
      comments: [] as string[],  // Definindo explicitamente como array de strings
    },
  ];

  // Função para incrementar o contador de curtidas de cada postagem
  likePost(postId: number) {
    const post = this.posts.find(post => post.id === postId);
    if (post) {
      post.likeCount++;
    }
  }

  // Função para incrementar o contador de comentários e exibir comentários criativos sobre tecnologia
  commentPost(postId: number) {
    const post = this.posts.find(post => post.id === postId);
    if (post) {
      post.commentCount++;
      this.showComments(postId); // Exibe comentários quando clicado
    }
  }

  // Exibe comentários sobre tecnologia
  showComments(postId: number) {
    const technologyComments = [
      '🛍️ O futuro das compras está no digital! Com a tecnologia, podemos comprar de qualquer lugar, a qualquer hora! ⏰',
      '💳 Pagamentos digitais e inteligência artificial estão transformando a forma como compramos! A conveniência nunca foi tão grande! 🤖',
      '🌐 O e-commerce está evoluindo! A cada dia, novas inovações tecnológicas tornam as compras online mais rápidas e seguras! 🔐',
      '📦 A tecnologia está tornando a experiência de compra mais personalizada! Cada clique nos aproxima de nossos desejos! 💡',
      '🛒 Compra inteligente com a ajuda da IA! O que mais a tecnologia pode fazer para melhorar a nossa jornada de compras? 🧐',
      '🚚 A entrega de produtos nunca foi tão rápida! O futuro das compras online já chegou, e ele é cheio de tecnologia! 📦',
      '🔍 Encontrar o produto perfeito nunca foi tão fácil! A busca personalizada está revolucionando o e-commerce! 💻',
    ];

    const post = this.posts.find(post => post.id === postId);
    if (post) {
      // Adiciona um comentário aleatório
      const randomComment = technologyComments[Math.floor(Math.random() * technologyComments.length)];
      post.comments.push(randomComment);
    }
  }

  // Função para compartilhar uma postagem
  sharePost() {
    alert('Postagem compartilhada!');
  }

  // Função para alterar a cor do link e somar 1 ao contador de curtidas
  changeLinkColor(event: Event, postId: number) {
    const link = event.target as HTMLElement;
    link.style.color = 'blue'; // Altera a cor do link para azul ao clicar
    this.likePost(postId); // Incrementa o contador de curtidas para o post
  }

  // Método para enviar a mensagem de dúvida
  sendDoubtMessage(): void {
    this.doubtMessage = '🌟 Muito obrigado pelo seu comentário! 💬❤️ Adoramos a sua interação!';
    this.doubtTitle = 'Rede Social - Comentou!';
  }

  // Método para enviar a mensagem de sucesso
  sendSuccessMessage(): void {
    this.successMessage = '🎉 Uhuul! Obrigado pela curtida! 😄💖';
    this.successTitle = 'Rede Social - Curtiu!';
  }

  // Mensagens para o componente de chat
  doubtMessage: string = '';
  successMessage: string = '';
  doubtTitle: string = '';  // Título dinâmico de dúvida
  successTitle: string = '';  // Título dinâmico de sucesso
}
