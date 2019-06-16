import { Component, OnInit } from '@angular/core';

const USERS = [
  { name: 'Filipe Lopes', email: 'flm@mail.com', height: '1,78' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' }
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;
  columns = [
    { name: 'Nome', prop: 'name' },
    { name: 'E-mail', prop: 'email' },
    { name: 'Altura', prop: 'height' }
  ];

  constructor() { }

  ngOnInit() {
    this.users = USERS;
  }

  getUsers() {
    return this.users;
  }

}
