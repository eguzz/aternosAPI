const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('serverController', {
    startButton: () => ipcRenderer.invoke('startButton'),
    restartButton: () => ipcRenderer.invoke('restartButton'),
    stopButton: () => ipcRenderer.invoke('stopButton'),
    statusServer: () => ipcRenderer.invoke('statusServer'),
    portapapeles: () => ipcRenderer.invoke('portapapeles')
  })


