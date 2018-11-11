import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Store} from '@ngxs/store';
import {AddUser, guid, UserModel, UserRole} from '../state/user.actions';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('firstNameInput') firstNameInput: ElementRef;

  roles = [UserRole.USER, UserRole.ADMIN];

  userFormGroup: FormGroup;
  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  roleControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private store: Store, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.userFormGroup = new FormGroup({
      firstNameFormControl: this.firstNameFormControl,
      emailFormControl: this.emailFormControl,
      roleControl: this.roleControl
    });
  }

  addUserInState() {
    if (this.userFormGroup.valid) {
      this.store.dispatch(
        new AddUser(
          <UserModel>{
            id: guid(),
            firstName: this.firstNameFormControl.value,
            email: this.emailFormControl.value,
            role: this.roleControl.value
          }
        )
      ).subscribe(() => {
        this.firstNameInput.nativeElement.focus();
        this.userFormGroup.reset();
      });
    }
  }

  ngAfterViewInit(): void {
    this.firstNameInput.nativeElement.focus();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
