import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {StorageService} from "../service/storage.service";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterModule} from "@angular/router";

interface LoginCredentials {
  username: string;
  password: string;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  credentials: LoginCredentials = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient, private storage?: StorageService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const apiUrl = 'http://localhost:8080/api/authenticate';
    this.credentials.password = form.value.password;
    this.credentials.username = form.value.username;
    this.http.post<any>(apiUrl, this.credentials)
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Store the access token securely (use storage service or local storage)
          if (this.storage) {
            this.storage.setItem('access_token', response.id_token);
          } else {
            localStorage.setItem('access_token', response.id_token);
          }
          // Redirect to the desired page after successful login (optional)
          this.router.navigate(['/items']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid username or password.';
        }
      });
  }
}
