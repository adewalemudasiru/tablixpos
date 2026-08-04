import { app, BrowserWindow, ipcMain } from "electron"
import electronUpdater from "electron-updater"
import path from "node:path"
import { fileURLToPath } from "node:url"

const { autoUpdater } = electronUpdater
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const iconPath = path.resolve(__dirname, "../src/assets/tablixlogo.ico")

function createWindow() {
  const win = new BrowserWindow({
    title: "Tablix POS",
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  })

  if (process.env.ELECTRON_DEV === "true") {
    win.loadURL("http://127.0.0.1:5173")
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"))
  }
}

app.commandLine.appendSwitch("enable-experimental-web-platform-features")

app.whenReady().then(() => {
  createWindow()

  if (app.isPackaged) {
    autoUpdater.checkForUpdatesAndNotify()
  }
})

ipcMain.handle("get-printers", (event) => {
  return (
    BrowserWindow.fromWebContents(event.sender)?.webContents.getPrinters() || []
  )
})

ipcMain.handle(
  "print",
  (event, options = { silent: false, printBackground: true }) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    return new Promise((resolve) => {
      if (!win) {
        resolve({ success: false, failureReason: "no-window" })
        return
      }

      win.webContents.print(options, (success, failureReason) => {
        resolve({ success, failureReason })
      })
    })
  }
)

ipcMain.handle("open-external", async (event, url) => {
  const { shell } = await import("electron")
  return shell.openExternal(url)
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
