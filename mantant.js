console.log("hello mantantWindow");

// const sqlite3 = require('sqlite3').verbose();
const { BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const { loadEnvFile } = require("process");
const url = require("url");




let mantantWindow = null; // Declare globally

function openMantantWindow() {
    let mantantWindow = new BrowserWindow({

        webPreferences: {
            preload: path.join(__dirname, "../preload.js"),
            contextIsolation: true,
            nodeIntegration: true,
            enableRemoteModule: false, // Improves security
            sandbox: false, 
        },

    });


    mantantWindow.loadFile("mantant/mantant.html");
    mantantWindow.webContents.openDevTools();

    // Apply menu only to the new window
    const menuTemplate = [
        {
            label: " المبلغ الاجمالي",
            click: () => mantantWindow.loadFile("mantant/mantant.html")
        },
        {
            label: " مبلغ الحالات",
            click: () => mantantWindow.loadFile("mantant/etatMantant.html")
        },
        {
            label: "reload", click: () => mantantWindow.reload() // recharge juste la page HTML
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    mantantWindow.setMenu(menu); // Set the menu for this window only

    mantantWindow.on("closed", () => {
       mantantWindow = null;
    });
}

// Listen for IPC message from renderer
ipcMain.on("open-mantant-window", () => {
    openMantantWindow();
});

module.exports = { openMantantWindow };


