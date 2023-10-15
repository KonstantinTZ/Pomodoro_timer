import { makeAutoObservable } from 'mobx'

class finishTasksArrayStore {

    finishTasksArray = [
        //  использовать для проверки
        // {
        //     text: "Алексей",
        //     counter: 0,
        //     id: 1,
        //     pomodore: 3,
        //     time: 1500000,
        //     pauseTime: 0,
        //     stopCounter: 1,
        //     weekNumber: 41,
        //     finishDate: '2023-10-09T10:28:00.000Z',
        // },
        // {
        //     text: "Бенжамин",
        //     counter: 0,
        //     id: 2,
        //     pomodore: 2,
        //     time: 1500000,
        //     pauseTime: 1500000,
        //     stopCounter: 0,
        //     weekNumber: 41,
        //     finishDate:  '2023-10-10T10:56:00.000Z',
        // },
        // {
        //     text: "Виктор",
        //     counter: 0,
        //     id: 3,
        //     pomodore: 6,
        //     time: 1500000,
        //     pauseTime: 0,
        //     stopCounter: 0,
        //     weekNumber: 41,
        //     finishDate: '2023-10-11T15:12:00.000Z',
        // },
        // {
        //     text: "Алексей",
        //     counter: 0,
        //     id: 4,
        //     pomodore: 10,
        //     time: 15000000,
        //     pauseTime: 0,
        //     stopCounter: 1,
        //     weekNumber: 40,
        //     finishDate: '2023-10-02T15:12:00.000Z',
        // },
        // {
        //     text: "Бенжамин",
        //     counter: 0,
        //     id: 5,
        //     pomodore: 8,
        //     time: 2000000,
        //     pauseTime: 1500000,
        //     stopCounter: 0,
        //     weekNumber: 40,
        //     finishDate:  '2023-10-04T15:12:00.000Z',
        // },
        // {
        //     text: "Виктор",
        //     counter: 0,
        //     id: 6,
        //     pomodore: 10,
        //     time: 2000000,
        //     pauseTime: 0,
        //     stopCounter: 0,
        //     weekNumber: 40,
        //     finishDate: '2023-10-06T15:12:00.000Z',
        // },
        // {
        //     text: "Алексей",
        //     counter: 0,
        //     id: 4,
        //     pomodore: 10,
        //     time: 1500000,
        //     pauseTime: 0,
        //     stopCounter: 1,
        //     weekNumber: 39,
        //     finishDate: '2023-09-25T15:12:00.000Z',
        // },
        // {
        //     text: "Бенжамин",
        //     counter: 0,
        //     id: 5,
        //     pomodore: 8,
        //     time: 2000000,
        //     pauseTime: 15000000,
        //     stopCounter: 0,
        //     weekNumber: 39,
        //     finishDate:  '2023-09-27T15:12:00.000Z',
        // },
        // {
        //     text: "Виктор",
        //     counter: 0,
        //     id: 6,
        //     pomodore: 10,
        //     time: 2000000,
        //     pauseTime: 0,
        //     stopCounter: 0,
        //     weekNumber: 39,
        //     finishDate:  '2023-09-28T15:12:00.000Z',
        // },

    ]


    constructor() {
        makeAutoObservable(this)
    }

    addFinishTaskFn(task) {
        this.finishTasksArray.push(task)
        console.log('finishTasksArray',this.finishTasksArray)
    }

    removeFinishTaskFn(id) {
        this.tasksArray = this.tasksArray.filter(task => task.id !== id)
        console.log('finishTasksArray',this.finishTasksArray)
    }




}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new finishTasksArrayStore()