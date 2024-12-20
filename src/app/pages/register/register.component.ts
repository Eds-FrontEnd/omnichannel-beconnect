import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PopupService } from '../../services/popup/popup.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  isPasswordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private popupService: PopupService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Carrega dados do localStorage, se existirem
    this.loadFormDataFromLocalStorage();

    this.registerForm.get('cep')?.valueChanges.subscribe(cep => {
      if (cep && cep.length === 8) {
        this.getAddressFromCEP(cep);
      } else {
        this.clearAddressFields();
      }
    });

    this.registerForm.get('phone')?.valueChanges.subscribe((phone: string) => {
      this.formatPhone(phone);
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  loadFormDataFromLocalStorage() {
    const savedData = localStorage.getItem('registerClient');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.registerForm.patchValue(parsedData);
    }
  }

  getAddressFromCEP(cep: string) {
    if (cep && cep.length === 8) {
      const url = `https://viacep.com.br/ws/${cep}/json/`;

      this.http.get(url).subscribe(
        (data: any) => {
          if (data) {
            this.registerForm.patchValue({
              address: data.logradouro || '',
              city: data.localidade || '',
              state: data.uf || ''
            });
          }
        },
        (error) => {
          console.error('Erro ao consultar o CEP:', error);
          alert('Erro ao consultar o CEP, verifique o número digitado.');
        }
      );
    }
  }

  clearAddressFields() {
    this.registerForm.patchValue({
      address: '',
      city: '',
      state: ''
    });
  }

  // Agora, este método apenas submete o formulário sem disparar funções de mensagem
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // Salva os dados no localStorage
    localStorage.setItem('registerClient', JSON.stringify(this.registerForm.value));

    this.popupService.showPopup(
      'Cadastro realizado com Sucesso!',
      'Você poderá agora logar a sua conta!',
      'Ok',
      '/login'
    );
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  formatPhone(phone: string) {
    if (phone) {
      phone = phone.replace(/\D/g, '');

      if (phone.length <= 2) {
        phone = `(${phone}`;
      } else if (phone.length <= 6) {
        phone = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
      } else if (phone.length <= 10) {
        phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
      } else {
        phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
      }

      this.registerForm.get('phone')?.setValue(phone, { emitEvent: false });
    }
  }

  // Método para enviar a mensagem de dúvida
  doubtMessage: string = '';
  successMessage: string = '';
  doubtTitle: string = '';  // Título dinâmico de dúvida
  successTitle: string = '';  // Título dinâmico de sucesso

  sendDoubtMessage(): void {
    this.doubtMessage = '🔒 Seu cadastro foi atualizado com sucesso! 🎉 Tudo seguro e pronto para você! 😎';
    this.doubtTitle = 'Cadastro - Dúvidas?';
  }

  // Método para enviar a mensagem de sucesso
  sendSuccessMessage(): void {
    this.successMessage = '🌟🚀 Cadastro realizado com sucesso! 🌟🚀';
    this.successTitle = 'Cadastro - Efetuado';
  }

  // Método para ser chamado no template, que dispara a função correta
  checkStorageAndSendMessage() {
    if (localStorage.getItem('registerClient')) {
      this.sendDoubtMessage();  // Se a chave estiver no localStorage
    } else {
      this.sendSuccessMessage();  // Caso contrário
    }
  }
}
