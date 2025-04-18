console.warn("Electron is running");

// const sqlite3 = require('sqlite3').verbose();
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const url = require("url");
const { openBinifcaireWindow } = require("./binificaire/binificaire");
const { openOrganisationWindow } = require("./organisation/orgranitation");
const { openMantantWindow } = require("./mantant/mantant");

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), //  Preload script
            nodeIntegration: false,  //  Allow `require` in preload.js
            contextIsolation: true, //  Allow communication between preload.js and renderer
            enableRemoteModule: false, // Improves security
            spellcheck: false,  // 🔹 Disable spellcheck (reduces autofill-related errors)
            sandbox: false, 
        }
    });

    mainWindow.setMenu(null); // Remove menu from the main window

    mainWindow.loadFile('index.html');
    
    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createMainWindow);

// Quit app when all windows are closed
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (mainWindow === null) createMainWindow();
});
