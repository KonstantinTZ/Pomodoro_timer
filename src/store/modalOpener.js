import {makeAutoObservable} from 'mobx'

class ModalOpener {

    modalStatus = false

    constructor() {
        makeAutoObservable(this)
    }

    modalOpenFn () {
        this.modalStatus = true
    }

    modalCloseFn () {
        this.modalStatus = false
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ModalOpener ()