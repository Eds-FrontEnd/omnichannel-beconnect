import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importando Router e ActivatedRoute

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOmnichannel: boolean = false; // Variável para controlar a lógica do botão

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // Verificar a URL e definir o tipo de botão a ser exibido
  ngOnInit(): void {
    // Checa a URL atual e altera a variável isOmnichannel
    this.isOmnichannel = this.router.url === '/omnichannel';
  }

  onLoginClick(): void {
    // Limpa todos os itens do sessionStorage
    sessionStorage.clear();

    // Limpa todos os itens do localStorage
    localStorage.clear();

    // Redireciona para a página inicial
    this.router.navigate(['/']);
  }

}
