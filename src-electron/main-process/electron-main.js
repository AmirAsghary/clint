import { app, BrowserWindow, nativeTheme, screen } from 'electron'
import {Clint} from './python-controller'
import fs from 'fs'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname
}

let mainWindow

function createWindow () {
  //
  mainWindow = new BrowserWindow({
    width: 375,
    height: 500,
    minHeight: 475,
    maxHeight: 650,
    minWidth: 350,
    maxWidth: 425,
    maximizable: false,
    transparent: true,
    movable: true,
    resizable: true,
    frame: false,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,  webSecurity: false,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // TODO : Implement a sticking functions :P
  let behaviour = []
  let stuck = false
  function stickWindow () {
    if(mainWindow.getPosition()[0]<screen.getPrimaryDisplay().workAreaSize.width * 0.55)
      stuck = false

    if(stuck){
      behaviour = []
      return false
    }

    if(behaviour.length<10)
      return false

    function filterBehave(pos) {
      return (pos.after > pos.before)
    }

    if(mainWindow.getPosition()[0] > screen.getPrimaryDisplay().workAreaSize.width * 0.6){
      stuck = true
      return true
    }
      return false
  }
  mainWindow.on('move', () => {
    behaviour.push(mainWindow.getPosition()[0])
    if(stickWindow()) {
      console.log('fuck')
      mainWindow.setPosition(screen.getPrimaryDisplay().workAreaSize.width - 375, screen.getPrimaryDisplay().workAreaSize.height - 500)
      BrowserWindow.getFocusedWindow().webContents.sendInputEvent({button:'left' ,type: 'mouseMove', x: 10, y: 10});
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// let clint = new Clint()
// clint.setPythonPath('PYTHON36')
// clint.wakeup()
//
import {DBHandler} from './dbHandler/dbHandler.js'

let sdd = new DBHandler()
sdd.DEV_refresh().then((res) => {
  if(res){
    console.log(sdd.get_appear().toString())
  }
});
