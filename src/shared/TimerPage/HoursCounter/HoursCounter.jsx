import React, {useState} from 'react';
import './HoursCounter.css';
import taskStore from '../../../store/taskStore';
import { observer } from 'mobx-react-lite';

export function hoursCounterFn (taskArray) {
  let hoursCounter = taskArray.reduce((summ, i) => summ = summ + i.time, 0)
   
  let date = new Date(hoursCounter)

  let result = [date.getUTCHours() ? date.getUTCHours() + ' ч.' : '', date.getUTCMinutes() + ' мин.'].map(function (x) {
    return x
  }).join("  ")

  return result

}

export const HoursCounter = observer (() => {

  let taskArray = taskStore.tasksArray

  let [isLoaded] = useState(false) // isLoaded для стилизации и добавления "заглушек" и избавления от ошибок, что taskArray[index].text не найден
  loadingStatus(taskArray) // запускаем ф-ю

  // setIsLoaded (taskArray.length !== 0 ? true : false) пишет, что много ререндеров, нужно решать через useEffect, а он только загружает 
  // один Первый раз
  function loadingStatus(array) { // тут понятно
    if (array.length === 0) {
      isLoaded = false
    } else if (array.length !== 0) {
      isLoaded = true
    }

    return isLoaded
  }

  

  let hoursDisplay = hoursCounterFn (taskArray)





  return (
     isLoaded && <div className='hoursCounter'>{hoursDisplay}</div>
  );
})
