import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { User } from '../src/assets/model/user';

let window: BrowserWindow;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

function createWindow() {

    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;
    const users: User[] = [];
    users.push(new User('Filipe Lopes', 'flm@mail.com', '77777-7777'));
    users.push(new User('Maria Paula', 'mpnfl@mail.com', '77777-1111'));

    window = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true
        },
    });

    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/../../node_modules/electron`)
        });
        window.loadURL('http://localhost:4200');

    } else {

        window.loadURL(
            url.format({
                pathname: path.join(__dirname, `/../../dist/angular8-electron-app/index.html`),
                protocol: 'file:',
                slashes: true,
            })
        );
    }
    window.removeMenu();

    ipcMain.on('getUsers', (event, arg) => {

        event.sender.send('usersResponse', users);
    });

    ipcMain.on('addUser', (event, arg) => {
        users.push(arg);
        event.sender.send('usersResponse', users);
    });

    if (serve) {
        window.webContents.openDevTools();
    }
}

app.on('ready', createWindow);
