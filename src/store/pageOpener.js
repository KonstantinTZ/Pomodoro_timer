import {makeAutoObservable} from 'mobx'

class PageOpener {

    pageOpenStatus = false

    constructor() {
        makeAutoObservable(this)
    }

    statysticsPageOpenFn () {
        this.pageOpenStatus = true
    }

    statysticsPageCloseFn () {
        this.pageOpenStatus = false
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new PageOpener()