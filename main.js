const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

const menuItems = [
    { label: "Menu", submenu: [{ label: "About" }] },
    {
        label: "File",
        submenu: [
            {
                label: "New",
                click: async () => {
                    const win2 = new BrowserWindow({
                        height: 300,
                        width: 400,
                        show: false,
                    });
                    // win2.loadFile("index2.html");
                    win2.loadURL("https://vermietung.trailerparts-24.de");
                    win2.once("ready-to-show", () => win2.show());
                },
            },
            {
                label: "Learn More",
                click: async () => {
                    await shell.openExternal("https://electronjs.org");
                },
            },
            { type: "separator" },
            { label: "Exit", click: () => app.quit() },
        ],
    },
    {
        label: "Window",
        submenu: [
            {
                role: "Minimize",
            },
            {
                role: "close",
            },
        ],
    },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile("index.html");
};
app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
