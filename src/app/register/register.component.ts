import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  loading: boolean = false;
  returnUrl: string;

  registerForm: FormGroup;
  
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    
      if(this.authService.userValue){
        this.router.navigate(['/']);
        return;
      }

      this.registerForm = this.formBuilder.group({
        login: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]]
      });

               
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public get f() {
    return this.registerForm.controls;
  }
  checkPassword(group: FormGroup): ValidationErrors | null {
    return group.controls.password.value === group.controls.confirm.value ? null : { notSame: true };
  }

  onPasswordInput() {
    if (this.registerForm.hasError('notSame'))
      this.f.confirm.setErrors([{'notSame': true}]);
    else
      this.f.confirm.setErrors(null);
  }

  register(){
    if(this.registerForm.invalid){
      return;
    }

    let user = new User(this.f.login.value, this.f.password.value);
    this.loading = true;
    this.authService.register(user)
      .pipe(first())
        .subscribe(data => {
            this.loading = false;
            this.router.navigate(['/login'], {queryParams: {returnUrl: this.returnUrl}});

        },
        error => {
          this.loading = false;
          alert(error);

        });

  }

}
