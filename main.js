const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const Parser = require('rss-parser');
const parser = new Parser();

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg'] }
    ]
  });
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

async function handleRssParse(event, url) {
  try {
    const feed = await parser.parseURL(url);
    return feed.items
      .filter(item => item.enclosure && item.enclosure.url)
      .map(item => ({
        title: item.title,
        artist: item.creator || item.author || 'Unknown Artist',
        url: item.enclosure.url
      }));
  } catch (error) {
    console.error('Failed to parse RSS feed:', error);
    return null;
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.handle('rss:parse', handleRssParse);
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
