import {PythonShell} from 'python-shell';

class Clint {

    #options = {
        mode: 'text',
        pythonPath: null
    }

    constructor() {

    }

    wakeup() {
        let pyshell = new PythonShell('src-electron/main-process/python-logic/main.py', this.#options);

        pyshell.on('message', function (message) {
            console.log(message);
        });
    }

    setPythonPath(path) {
        this.#options.pythonPath = path
    }
    setComMode(mode) {
        if(['text','json'].includes(mode.toLowerCase()))
            this.#options.mode = mode
    }
}

export {Clint}