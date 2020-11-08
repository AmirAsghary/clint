# Clint

Clint, Your horrible kind-of-annoying useless virtual friend

Powered by [Quasar](https://quasar.dev/), [Electron](https://www.electronjs.org/), [SpeechRecognition](https://pypi.org/project/SpeechRecognition/)

<img src="https://avatars3.githubusercontent.com/u/23064371?s=200&v=4" alt="drawing" height="30"/>  <img src="https://cdn.iconscout.com/icon/free/png-256/vue-282497.png" alt="drawing" height="30"/>  <img src="https://cdn.iconscout.com/icon/free/png-256/electron-67-1175035.png" alt="drawing" height="30"/>  <img src="https://cdn.iconscout.com/icon/free/png-256/node-js-1-1174935.png" alt="drawing" height="30"/>  <img src="https://cdn.iconscout.com/icon/free/png-512/typescript-1174965.png" alt="drawing" height="30"/>  <img src="https://cdn.iconscout.com/icon/free/png-256/javascript-1-225993.png" alt="drawing" height="30"/>  <img src="https://cdn.iconscout.com/icon/free/png-256/python-2-226051.png" alt="drawing" height="30"/>

# How to Install

**Dependencies :**
> [Node.js : ">= 10.16.0"](https://nodejs.org/download/release/v10.16.0/)
>
> [NPM : "6.x.x"](https://www.npmjs.com/package/npm)
>
> [Python: "3.6.x"](https://www.python.org/downloads/release/python-365/)

to **Install** node modules:

    $ npm install

## Development

You can run in the **development mode** by using :

    $ quasar dev -m electron
    
Also, instead of manually compiling .ts files for each iteration, you can run  :
   
    $ nodemon  --exec tsc [.ts file name]
    
    // use -V flag to show details on what is causing restarts
    $ nodemon  --exec tsc -V [.ts file name]
