import React, { useState, useEffect } from 'react';
import './statysticsPage.css';
import { InfoField } from './InfoField';
import { PomodoroPlug } from './PomodoroPlug/PomodoroPlug';
import { DayStatystics } from './DayStatystics/DayStatystics';
import { PomodoroSatystics } from './PomodoroSatystics/PomodoroSatystics';
import finishTaskStore from '../../store/finishTaskStore';
import { hoursCounterFn } from '../TimerPage/HoursCounter/HoursCounter';

// charJS plugin activation
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale, // y
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale, // y
  Tooltip,
  Legend
)

export function StatysticsPage() {

  let finishTaskArray = finishTaskStore.finishTasksArray
  // выгружаем массив из MOBX taskStore с которым будем работать

  let [isLoaded] = useState(false) // isLoaded для стилизации и добавления "заглушек" и избавления от ошибок, что taskArray[index].text не найден
  loadingStatus(finishTaskArray) // запускаем ф-ю

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
  // Правильно ли так делать ^

  const [isPauseMinutesStyleActive, setPauseMinutesStyleActive] = useState('')
  const [isStopCounterStyleActive, setStopCounterStyleActive] = useState('')
  const [isFocusStyleActive, setFocusStyleActive] = useState('')

  let nowDate = new Date() //  вычисляем СЕГОДНЯ

  function dayName(incomeDate) { // ф-я для вычисления названия дня недели (СЕГОДНЯ)
    let dayNumber = incomeDate.getDay()
    let result

    if (dayNumber === 0) {
      return result = 'Воскресенье'
    } else if (dayNumber === 1) {
      return result = 'Понедельник'
    } else if (dayNumber === 2) {
      return result = 'Вторник'
    } else if (dayNumber === 3) {
      return result = 'Среда'
    } else if (dayNumber === 4) {
      return result = 'Четверг'
    } else if (dayNumber === 5) {
      return result = 'Пятница'
    } else if (dayNumber === 6) {
      // eslint-disable-next-line
      return result = 'Суббота'
    }

  }

  let weekName = dayName(nowDate);

  function todayFilter(item) { // фильтруем массив по Сегодняшнему дню
    let incomDate = new Date(item.finishDate)
    return incomDate.toLocaleDateString() === nowDate.toLocaleDateString()
  }

  let filtredToDayTaskArray = finishTaskArray.filter(todayFilter)  // фильтруем массив по Сегодняшнему дню

  let pomodoreCounter = filtredToDayTaskArray.reduce((summ, i) => summ = summ + i.pomodore, 0) // считаем помидоры за сегодня и потом передаём в компонент PomodoroSatystics

  let workMinuteCounter = filtredToDayTaskArray.reduce((summ, i) => summ = summ + i.time, 0) // складываем время за сегодня и 
  let workMinute = hoursCounterFn(filtredToDayTaskArray) // вычисляем время потом передаём в компонент DayStatystics


  let pauseMinuteCounter = filtredToDayTaskArray.reduce((summ, i) => summ = summ + i.pauseTime, 0)

  let pauseMinute = new Date(pauseMinuteCounter).getMinutes()

  useEffect(() => {
    if (pauseMinuteCounter !== 0) { //  вывод на страницу pauseMinute + стилизация
      // document.getElementById('pause-box').classList.add('active')
      // document.getElementById('pause-metric').textContent = pauseMinute + 'м'
      setPauseMinutesStyleActive('active')
    } else if (pauseMinuteCounter === 0) {
      // document.getElementById('pause-box').classList.remove('active')
      // document.getElementById('pause-metric').textContent = pauseMinute + 'м'
      setPauseMinutesStyleActive('')
    }
  }, [pauseMinuteCounter]);


  //вывод на страницу stopCounter

  let stopCounter = filtredToDayTaskArray.reduce((summ, i) => summ = summ + i.stopCounter, 0)

  useEffect(() => {
    if (stopCounter !== 0) { //  вывод на страницу stopCounter+ стилизация

      setStopCounterStyleActive('active')
    } else if (stopCounter === 0) {

      setStopCounterStyleActive('')
    }
  }, [stopCounter]);

  //focus

  let focusPercent
  
  if (workMinuteCounter === 0) {
    focusPercent = 0
  } else if (workMinuteCounter !== 0) {
    focusPercent = ((workMinuteCounter / (workMinuteCounter + pauseMinuteCounter)) * 100).toFixed(0)
  }
  

  useEffect(() => {
    if (workMinuteCounter !== 0) { //  вывод на страницу focusPercent+ стилизация
      setFocusStyleActive('active')
    } else if (workMinuteCounter === 0) {
      
      setFocusStyleActive('')
    }
  }, [workMinuteCounter])




  function weekNumberFn(incomDate) { //ф-я вычисения номера недели
    let currentDate = incomDate
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil(days / 7);

    return weekNumber
  }

  let currentWeekNumber = weekNumberFn(nowDate) // получаем текущий номер недели

  let weekDaysArray = mainActionFn(currentWeekNumber, finishTaskArray) // получаем отфильтрованный по дням недели массив с помидорками пример [0,5,0,8,0,0,10];



  function mainActionFn(currentWeekNumber, taskArray) { // вычисляем отфильтрованный по дням недели массив с минутами пример [0,5,0,8,0,0,10];
    function currentWeekFilter(item) { // для сравнения № недели объекта и  неделе
      return item.weekNumber === currentWeekNumber
    }


    let filtredCurentWeekTaskArray = taskArray.filter(currentWeekFilter) // фильтруем taskArray по неделе

    let result = filtredCurentWeekTaskArray.reduce((prev, item) => { // складываем минуты  по дням
      if (item.finishDate in prev) {
        prev[item.finishDate] += item.time
      } else {
        prev[item.finishDate] = item.time;
      }
      return prev;
    }, {})

    let minutesDateArray = [] // складываем минуты  по дням в массив

    Object.keys(result).forEach(id => {
      let newObj = {}
      newObj.finishDate = id;
      newObj.time = result[id]
      minutesDateArray.push(newObj) // складываем минуты  по дням в массив
    })


    let weekDaysArray = [60000, 60000, 60000, 60000, 60000, 60000, 60000]; // распределяем минуты  по дням недели // 60000 (1 мин.) для стилизации

    for (let item of minutesDateArray) { // распределяем минуты  по дням недели
      let index = new Date(item.finishDate).getDay() // ИНДЕКС - это день недели

      weekDaysArray[index] = item.time
    }


    return weekDaysArray // пллучаем распределенные по массиву минуты  по дням недели

  }

  const [chartData, setChartData] = useState(weekDaysArray);


  const selectOptions = [
    { value: 'currentWeek', text: 'Эта неделя' },
    { value: 'weekAgo', text: 'Прошедшая неделя' },
    { value: 'twoWeekAgo', text: '2 недели назад' },
  ];



  const [selectInputValue, setSelectAddInputValue] = useState(selectOptions[0].value);
  function onChangeHandler(event) {

    console.log(event.target.value);
    setSelectAddInputValue(event.target.value)



    let prewiousWeek = new Date();
    prewiousWeek.setDate(nowDate.getDate() - 7)

    let twoWeekAgo = new Date();
    twoWeekAgo.setDate(nowDate.getDate() - 14)





    if (event.target.value === 'currentWeek') {
      currentWeekNumber = weekNumberFn(nowDate)
    }

    if (event.target.value === 'weekAgo') {
      currentWeekNumber = weekNumberFn(prewiousWeek)
    }

    if (event.target.value === 'twoWeekAgo') {
      currentWeekNumber = weekNumberFn(twoWeekAgo)
    }

    console.log('currentWeekNumber ->', currentWeekNumber)


    weekDaysArray = mainActionFn(currentWeekNumber, finishTaskArray) // получаем
    console.log('weekDaysArray, после SELECTA->', weekDaysArray)

    setChartData(weekDaysArray)
  }




  // chartJS Settings
  // настраиваб бэкграунд колонок
  // https://www.youtube.com/watch?v=ylWoIaSgThk
  let today = new Date()
  let todayIndex = today.getDay()
  let backgroundcolor = [];
  for (let i = 0; i < chartData.length; i++) {
    if (chartData[i] === 60000) { backgroundcolor.push('#C4C4C4') }
    if (chartData[i] > 60000) { backgroundcolor.push('#EA8A79') }
  }
  backgroundcolor[todayIndex] = '#DC3E22'
  console.log('backgroundcolor ->', backgroundcolor)


  const data = {
    labels: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    datasets: [{
      // label: 'количество помидорок',
      data: chartData,
      borderWidth: 1,
      backgroundColor: backgroundcolor, // настраиваб бэкграунд колонок
      hoverBackgroundColor: '#DC3E22',
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        position: 'right',
        background: "#F4F4F4",
        ticks: {
          // https://www.youtube.com/watch?v=qD4mZUicKe0
          // настраиваю насвания на шкале Y
          callback: function (value, index, values) {


            let date = new Date(value)

            let result = [date.getUTCHours() !== 0 ? (date.getUTCHours() + ' ч') : '', date.getUTCMinutes() + ' мин'].map(function (x) {
              return x
            }).join(" ")

            return result

          }
        }
      },
      x: {
        backgroundColor: "#ECECEC",
        ticks: {
          // https://www.youtube.com/watch?v=lMFB59oQo94
          // настраиваю подсвечивание дня недели на шкале X
          color: (context, index) => {
            let today = new Date()
            let todayIndex = today.getDay()
            // console.log('todayIndex ->', todayIndex)
            // context.chart.data.datasets[0].data.forEach((datapoint, index)=> {
            //   console.log("datapoint.indexOf(datapoint)", datapoint.indexOf(datapoint))
            // })
            const ticksColors = ['#999', '#999', '#999', '#999', '#999', '#999', '#999']
            ticksColors[todayIndex] = '#DC3E22'
            return ticksColors
          }
        },
        grid: {
          drawOnChartArea: false,
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: false,
        },
      legend: {
        display: false,
      },
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      }      
    }
  }


  return (
    <>

      <div className="row statistics__row statistics__row--top justify-content-between">

        <h2 className="statistics__title col-1">Ваша активность</h2>
        <select className="statistics__select col-1" id="statistics-select" onChange={onChangeHandler} value={selectInputValue}>
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

      </div>
      <div className="row statistics__row justify-content-between statistics__row--center">
        <div className="statistics__wrapper col-3">
          <DayStatystics todayName={weekName} workedTime={workMinute} />
          {!isLoaded && <PomodoroPlug />}
          {isLoaded && <PomodoroSatystics pomodoreMetric={pomodoreCounter} />}
        </div>
        <div className="statistics__chart col-9">
          <Bar id='myBar'
            style={
              {
                height: '100%',
                backgroundColor: '#F4F4F4',
              }
            }
            data={data}
            options={options}
          >
          </Bar>
        </div>
      </div>
      <div className="row statistics__row statistics__row--bottom justify-content-between">

        <InfoField fieldInfo={"Фокус"} fieldMetric={focusPercent + ' %'} activeClass={isFocusStyleActive} categoryClass={'info-field--focus'} iconName={"focus"} />
        <InfoField fieldInfo={"Время на паузе"} fieldMetric={pauseMinute + " м"} activeClass={isPauseMinutesStyleActive} categoryClass={'info-field--paused'} iconName={"pause"} />
        <InfoField fieldInfo={"Остановки"} fieldMetric={stopCounter} activeClass={isStopCounterStyleActive} categoryClass={'info-field--stops'} iconName={"stops"} />

      </div>
    </>

  );
}
