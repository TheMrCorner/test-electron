// First import necessary modules and packages
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

var a = 1;

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences:{
            nodeIntegration: true
        }
    });

    mainWindow.webContents.openDevTools()
    mainWindow.loadFile(path.join(__dirname, "app/index.html"));
} // loadMainWindow

// Loads the main window when the app just initializes and
// is ready to load it. (ready event is emitted)
app.on("ready", loadMainWindow);

// Close and end application when all windows have closed 
// to avoid app keep running in the background.
app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    } // if
});

// Make sure that the app boots up when its icon is clicked
// on the OS app dock when no windows are open. 
app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});

ipcMain.handle('show-notification', (event, ...args) => {
    const notification = {
        title: 'New Task',
        body: `Added: ${args[0]}`
    }

    new Notification(notification).show();
});