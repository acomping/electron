/* jshint esversion: 6 */

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const { app, BrowserView, BrowserWindow, ipcMain, Menu, shell, globalShortcut, Tray } = require('electron')
const winURL = `http://localhost:8080`
const path = require('path');

const url = require('url');
//托盘对象
var appTray = null
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}
ipcMain.on("submit", (event, arg) => {
  console.log(arg);
})

// const newWindowBtn = document.getElementById('frameless-window')







// Keep a global reference of the window object, if you don't, the window will

// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;
var parent_x;
var parent_y;
var parent_size_x;
var parent_size_y;
var vipWin_x;
var vipWin_y;
var vipWin_size_x;
var vipWin_size_y;





// This method will be called when Electron has finished

// initialization and is ready to create browser windows.

// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {

  // 创建一个窗口，大小 800 * 600

  mainWindow = new BrowserWindow({

    width: 800,

    height: 600,
    modal: true,
    title: "",
    icon: __dirname + "/static/favicon.ico",
    // frame: false,
    // transparent:true,
    // autoHideMenuBar: true,
    // backgroundColor: "#333333",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: __dirname + '/preload.js'
    },


  });
  const view = new BrowserView()

  globalShortcut.register('CommandOrControl+Shift+i', function () {
    mainWindow.webContents.openDevTools()
  })
  globalShortcut.register('F5', function () {
    mainWindow.webContents.reload()
  })
  // 在窗口内要展示的内容为 ./dist/index.html，即打包生成的index.html

  mainWindow.loadURL(url.format({

    pathname: path.join(__dirname, './dist', 'index.html'),

    protocol: 'file:',

    slashes: true

  }));
  // mainWindow.loadURL(`http://localhost:8080`)

  // mainWindow.loadURL(`file://${__dirname}/index.html`);


  // 自动打开调试台

  // mainWindow.webContents.openDevTools({

  //   detach: false

  // });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });


  mainWindow.setBrowserView(view)
  // view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  // view.webContents.loadURL('https://electronjs.org')
  view.setBackgroundColor('red')
  parent_x = mainWindow.getPosition()[0]
  parent_y = mainWindow.getPosition()[1]
  parent_size_x = mainWindow.getSize()[0]
  parent_size_y = mainWindow.getSize()[1]
  console.log('主窗口离电脑左边距离', parent_x);
  console.log('主窗口离电脑上面距离', parent_y);
  console.log('主窗口宽度', parent_size_x);
  console.log('主窗口高度', parent_size_y);
  ipcMain.on('md', (e, a) => {
    e.sender.send('mainmd', { parent_x, parent_y, parent_size_x, parent_size_y })
  })
  if (process.platform === 'win32') {
    //设置托盘图标和菜单
    var trayMenuTemplate = [
      {
        label: '打开',
        click: () => {
          mainWindow.show();
        }
      },
      {
        label: '退出',
        click: () => {
          app.quit();
          app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
        }
      }
    ];
    //系统托盘图标
    appTray = process.env.NODE_ENV === 'development' ? new Tray('./static/favicon.ico') : new Tray(`${__dirname}/static/favicon.ico`);
    //图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    //设置此托盘图标的悬停提示内容
    appTray.setToolTip('wode');
    //设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);
    //单击右下角小图标显示应用左键
    appTray.on('click', function () {
      mainWindow.show();
    })
    //右键
    appTray.on('right-click', () => {
      appTray.popUpContextMenu(trayMenuTemplate);
    });
  };

})



// Quit when all windows are closed.

app.on('window-all-closed', function () {

  // On OS X it is common for applications and their menu bar

  // to stay active until the user quits explicitly with Cmd + Q

  if (process.platform !== 'darwin') {

    app.quit();

  }

});



app.on('activate', function () {

  // On OS X it's common to re-create a window in the app when the

  // dock icon is clicked and there are no other windows open.

  if (mainWindow === null) {

    createWindow();

  }

});


const template = [
  {
    label: '原生应用菜单演示',
    submenu: [
      {
        label: '个人信息',
      },
      {
        type: 'separator',
      },
      {
        label: '开机启动',
        type: 'checkbox',
        checked: true,
      },
      {
        type: 'separator',
      },
      {
        label: '性别',
        submenu: [
          {
            label: '男',
            type: 'radio',
          },
          {
            label: '女',
            type: 'radio',
          },
        ],
      },
    ],
  },
  {
    label: '文件',
    submenu: [
      {
        label: '新建',
        click() { },
      },
      {
        label: '打开',
        accelerator: 'ctrl+q',
        click() { },
      },
      {
        label: '保存',
        click() {

        },
      },
      {
        type: 'separator',  // 分割线
      },
      {
        label: '打印',
        click() { },
      },
      {
        label: '退出',
        click() { },
      },
    ],
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        role: 'undo',
      },
      {
        label: '恢复',
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        label: '截切',
        role: 'cut',
      },
      {
        label: '复制',
        role: 'copy',
      },
      {
        label: '黏贴',
        role: 'paste',
      },

      {
        label: '删除',
        role: 'delete',
      },
      {
        label: '全选',
        role: 'selectall',
      },
    ],
  },
  {
    label: '视图',
    submenu: [
      {
        label: '放大',
        role: 'zoomIn',
      },
      {
        label: '缩小',
        role: 'zoomOut',
        accelerator: 'CmdOrCtrl+-',
      },
      {
        label: '重置缩放',
        role: 'resetZoom',
        accelerator: 'CmdOrCtrl+0',
      },
      {
        type: 'separator',
      },
      {
        label: '全屏',
        role: 'togglefullscreen',
      },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '关于',
        click() {
          shell.openExternal('https://www.baidu.com');
        },
      },
    ],
  },
];
const m = Menu.buildFromTemplate(template);


Menu.setApplicationMenu(m);

// 右键菜单
const contextMenuTemplate = [
  {
    label: '撤销',
    role: 'undo',
  },
  {
    label: '恢复',
    role: 'redo',
  },
  {
    type: 'separator',
  },
  {
    label: '截切',
    role: 'cut',
  },
  {
    label: '复制',
    role: 'copy',
  },
  {
    label: '黏贴',
    role: 'paste',
  },
  {
    type: 'separator',
  },  // 分隔线
  {
    label: '全选',
    role: 'selectall',
  },
  // Select All菜单项
];

const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);


// 监听右键事件
ipcMain.on('contextMenu', () => {
  contextMenu.popup(BrowserWindow.getFocusedWindow());
});

