import {makeAutoObservable} from 'mobx'

class SaveModeOpener {

    saveModeStatus = false

    constructor() {
        makeAutoObservable(this)
    }

    saveModeOpenFn () {
        this.saveModeStatus = true
    }

    saveModeCloseFn () {
        this.saveModeStatus = false
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new SaveModeOpener()