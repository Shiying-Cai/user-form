import { Component, ViewChild, Inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @ViewChild('userForm') userForm: NgForm;

  favoriteSeasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  canDriveOptions = [
    {label: "Yes", value: true},
    {label: "No", value: false}
  ];

  user = new User('',18,'',false);

  showForm = true;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
    // retrieve user data from local storage if available
    const localUser = this.storage.get(STORAGE_KEY);
    if (localUser) {
      this.user = localUser;
    }
  }

  newUser() {
    this.user = new User("",18,"",false)
    this.userForm.resetForm();
    this.storage.remove(STORAGE_KEY); // clear local storage on reset
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    this.showForm = false;
    this.storage.set(STORAGE_KEY, this.user); // save user data to local storage
  }
}

