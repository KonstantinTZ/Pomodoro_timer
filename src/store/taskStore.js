import { makeAutoObservable } from 'mobx'

class tasksArraytore {

    tasksArray = [

        //  использовать для проверки
        // {
        //     text: "Алексей",
        //     counter: 1,
        //     id: 1,
        //     pomodore: 0,
        //     time: 1500000,
        //     pauseTime: 0,
        //     stopCounter: 0,
        //     weekNumber: 0,
        //     finishDate: '',
        // },
        // {
        //     text: "Бенжамин",
        //     counter: 2,
        //     id: 2,
        //     pomodore: 0,
        //     time: 1500000,
        //     pauseTime: 0,
        //     stopCounter: 0,
        //     weekNumber: 0,
        //     finishDate: '',
        // },
        // {
        //     text: "Виктор",
        //     counter: 4,
        //     id: 3,
        //     pomodore: 0,
        //     time: 1500000,
        //     pauseTime: 0,
        //     stopCounter: 0,
        //     weekNumber: 0,
        //     finishDate: '',
        // },

    ]

    constructor() {
        makeAutoObservable(this)
    }

    addTaskFn(task) {
        if (task.text.length > 3) {
            this.tasksArray.push(task)
        } else if (task.text.length < 3) {
            return
        }

        console.log(this.tasksArray)
        
    }

    removeTaskFn(id) {
        this.tasksArray = this.tasksArray.filter(task => task.id !== id)
        console.log('this.tasksArray удаляем из незаконченных дел', this.tasksArray)
    }

    changeCounterFn(id, direction) {

        if (direction === true) {
            this.tasksArray = this.tasksArray.map(task => task.id === id ? { ...task, counter: (task.counter < 9 ? task.counter + 1 : task.counter) } : task)
            // с ограничением на максимальный счетчик 9
            this.tasksArray = this.tasksArray.map(task => task.id === id ? { ...task, time: (task.time < 13500000 ? task.time + 1500000 : task.time) } : task)
            // // с ограничением на максимальное время 25мин(1500000) в милисикундв х 9коунтеров (13500000)
        } else if (direction === false) {
            this.tasksArray = this.tasksArray.map(task => task.id === id ? { ...task, counter: (task.counter > 1 ? task.counter - 1 : task.counter) } : task)
            // с ограничением на минимальный счетчик 1
            this.tasksArray = this.tasksArray.map(task => task.id === id ? { ...task, time: (task.time > 1500000 ? task.time - 1500000 : task.time) } : task)
            // с ограничением на максимальное время 25мин(1500000) в милисикундв х 1 коунтеров (1500000)
        }

    }

    changeTextFn(id, incomeText) {

        this.tasksArray = this.tasksArray.map(task => task.id === id ? { ...task, text: (incomeText.length >= 3 ? (task.text = incomeText) : task.text) } : task)
        // с ограничением на минимаальное кол-во символов = 3
    }


}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new tasksArraytore()