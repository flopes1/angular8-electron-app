import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

let window: BrowserWindow;
const production = false;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

function createWindow() {

    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

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

    if (serve) {
        window.webContents.openDevTools();
    }
}

app.on('ready', createWindow);
