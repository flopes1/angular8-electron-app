import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

const USERS = [
  { name: 'Filipe Lopes', email: 'flm@mail.com', height: '1,78' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' },
  { name: 'Maria Paula', email: 'mpnfl@mail.com', height: '1,68' }
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any = [];
  columns = [
    { name: 'Nome', prop: 'name' },
    { name: 'E-mail', prop: 'email' },
    { name: 'Altura', prop: 'height' }
  ];

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    // this.users = USERS;
    this.getUsers();
  }

  getUsers() {
    // return this.users;
    this.users = [];

    if (this.electronService.isElectronApp) {

      this.electronService.ipcRenderer.on('usersResponse', (event, arg) => {
        console.log('chegou' + arg);
        this.users = arg;
        this.users = [...this.users];
      });

      this.electronService.ipcRenderer.send('getUsers');
    }
  }

  addUser() {
    const user = { name: 'Filipe Lopes', email: 'flm@mail.com', height: '1,78' };
    this.users.push(user);
    this.users = [...this.users]
  }

}
