import { Component, OnInit } from '@angular/core';

import { ElectronService } from 'ngx-electron';
import { User } from '../../../assets/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  listUserView = true;
  currentUser: User = new User();
  users: User[] = [];
  columns = [
    { name: 'Nome', prop: 'name' },
    { name: 'E-mail', prop: 'email' },
    { name: 'Telefone', prop: 'phone' }
  ];

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = [];

    if (this.electronService.isElectronApp) {

      this.electronService.ipcRenderer.on('usersResponse', (event, arg) => {
        this.users = arg;
        this.users = [...this.users];
      });

      this.electronService.ipcRenderer.send('getUsers');
    }
  }

  addUser() {

    if (this.electronService.isElectronApp) {

      this.electronService.ipcRenderer.on('usersResponse', (event, arg) => {
        this.users = arg;
        this.users = [...this.users];
      });

      this.electronService.ipcRenderer.send('addUser', this.currentUser);
      this.currentUser = new User();
      this.listUserView = true;
    }
  }

  showUserForm() {
    this.listUserView = false;
  }

}
