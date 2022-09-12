const {app, BrowserWindow, ipcMain, clipboard} = require('electron')
const path = require('path')
const {aternosAPI} = require('./aternos_controller.js')

const createWindow = () => {
    const win = new BrowserWindow({
        width : 800,
        height : 600,
        preload: path.join(__dirname, 'preload.js'),
    })
    win.loadFile('static/index.html')
}

login_server()
app.whenReady().then(() => {
    ipcMain.handle('startButton', () => aternosAPI.start_server())
    ipcMain.handle('portapapeles', () => {
        const ip = aternosAPI.get_ip()
        clipboard.writeText(ip)
        return ip
    })
    ipcMain.handle('stopButton', () => aternosAPI.stop_server())
    ipcMain.handle('restartButton', () => aternosAPI.restart_server())
    ipcMain.handle('statusServer', () => aternosAPI.server_status())

    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
      });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        aternosAPI.close_browser()
        app.quit()
    } 
  })