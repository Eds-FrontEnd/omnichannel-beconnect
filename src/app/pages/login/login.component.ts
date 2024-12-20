import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  isPasswordVisible = false; // Controle de visibilidade da senha

  constructor(private formBuilder: FormBuilder, private router: Router, private popupService: PopupService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Verifica se o formulário é válido
    if (this.loginForm.invalid) {
      return;
    }

    // Recupera os dados armazenados no localStorage (caso existam)
    const savedData = localStorage.getItem('registerClient');
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // Verifica se o email e a senha inseridos correspondem aos dados armazenados
      const inputEmail = this.loginForm.value.email;
      const inputPassword = this.loginForm.value.password;

      if (inputEmail === parsedData.email && inputPassword === parsedData.password) {
        // Login bem-sucedido
        console.log('Login successful');

        // Armazena no sessionStorage a chave 'isLoggedIn' com o valor 'true'
        sessionStorage.setItem('isLoggedIn', 'true');

        // Redireciona para a página /omnichannel
        this.router.navigate(['/omnichannel']);
      } else {
        // Dados de login inválidos
        this.popupService.showPopup(
          'Email ou senha inválidos.',
          'Realize o seu cadastro no link abaixo.',
          'Ok',
          '/login'
        );
      }
    } else {
      // Caso não exista dados no localStorage
      this.popupService.showPopup(
        'Ops...Nenhum cadastro encontrado.',
        'Por favor, cadastre-se primeiro no link abaixo.',
        'Ok',
        '/login'
      );
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible; // Alterna a visibilidade da senha
  }
}
