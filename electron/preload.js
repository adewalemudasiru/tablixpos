import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electronAPI", {
  getPrinters: () => ipcRenderer.invoke("get-printers"),
  print: (options) => ipcRenderer.invoke("print", options),
  openExternal: (url) => ipcRenderer.invoke("open-external", url),
})

window.addEventListener("DOMContentLoaded", () => {
  console.log("Electron preload loaded")
})
