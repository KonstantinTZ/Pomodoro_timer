import React, { useState, useRef} from 'react';
import './Timer.css';
import { Clock } from './Clock';
import { AddMinuteButton } from './AddMinuteButton';
import taskStore from '../../../store/taskStore';
import finishTaskStore from '../../../store/finishTaskStore';
import { observer } from 'mobx-react-lite';

export const Timer = observer(() => {
  //observer для перерендеривания

  let taskArray = taskStore.tasksArray
  // выгружаем массив из MOBX taskStore с которым будем работать


  // let [isLoaded, setIsLoaded] = useState(false)
  // useEffect(() => {
  //   setIsLoaded(taskArray.length !== 0 ? true : false)
  // }, [taskArray]); // НЕ РАБОТАЕТ + добавить импорт USESTATE, Приизменении массива НЕ Перерендеривает, хотя в зависимостях taskArray

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
  // Правильно ли так делать ^

  let mainTimerId = useRef(null); // из документации use Ref что бы можно было применять во всех местах кода

  // константы
  const TWENTY_FIVE_MINUTES = 15000  // 25 мин = 1500000 милисекунд
  const THIRTY_MINUTES =1800000  // 30 мин = 1800000
  const FIVE_MINUTES = 300000// 5 мин = 300000 мс
  const FIVTINE_MINUTES = 900000 // 15 мин = 900000 мс
  const ONE_MINUTE = 60000 // 1мин = 60000 мс

  let [isTimerReverse, setTimerReverse] = useState(false); // нужно что бы  разварачивать таймер для паузы срабатывает. setTimerReverse НЕ ВСЕГДА
  let [mainInterval, setMainInterval] = useState(TWENTY_FIVE_MINUTES); //setMainIntervale НЕ ВСЕГДА срабатывает
  let [arrayIndex] = useState(0);//setArrayIndex НЕ ВСЕГДА срабатывает (убрал его)
  //arrayIndex его изменением мы переключаемся между нашими тасками(задачами)
  let [savedInterval, setSavedIntrval] = useState(0);//setSavedIntrval НЕ ВСЕГДА срабатывает (убрал его) // нужен для сохранения значения таймера после нажатия кнопки пауза, что бы потом начать с остановившегося "места"
  let [minutesText, setMinutesText] = useState('25')
  let [secondsText, setsecondsText] = useState('00')
  let [isPaused] = useState(false); // условно дублируется с let [showRealx, setShowRelax] = useState(false), но так работает надёжнее


  // для показа необходимых кнопок
  // здесь хуки работают стабильно
  let [isStartButtonOpen, setStartButtonStatus] = useState(true)
  let [isPauseButtonOpen, setPauseButtonStatus] = useState(false)
  let [isContinueButtonOpen, setContinuetButtonStatus] = useState(false)
  let [isStopButtonOpen, setStoptButtonStatus] = useState(true)
  let [isSkipButtonOpen, setSkiptButtonStatus] = useState(false)
  let [isDoneButtonOpen, setDonetButtonStatus] = useState(false)
  let [isAddOneMinuteButtonOpen, setAddOneMinuteButtonOpen] = useState(true)

  // для показа необходимых заглушек
  // здесь хуки работают стабильно
  let [showRealx, setShowRelax] = useState(false)
  let [showYouTurnedOnPause, setYouTurnedOnPause] = useState(false)


  function mainTimer() {
    //

    if (isTimerReverse === false) { // если false , то отнимаем секунду
      mainInterval = mainInterval - 1000
      //setMainInterval(mainInterval - 1000); ХУК НЕ РАБОТАЕТ Время не изменяется
    } else if (isTimerReverse === true) { // если тру, то прибавляем секунду
      mainInterval = mainInterval + 1000
      //setMainInterval(mainInterval + 1000); ХУК НЕ РАБОТАЕТ Время не изменяется
    }
    
    setMainInterval(mainInterval)

    if (mainInterval <= 0 && isPaused === false) { //если интервал = 0 и не запущена пауза, то

      clearInterval(mainTimerId.current); // останавливаем таймер
      savedInterval = 0 // нужен для сохранения значения таймера после нажатия кнопки пауза


      // // установить на 5 мин или 15 мин , если taskArray[arrayIndex].counter % 4
      // для работы с паузой
      if (((taskArray[arrayIndex].pomodore + 1) % 4 === 0)) { // +1 т.к. поимидорки начинаются с нуля
        workPause(FIVTINE_MINUTES) // вызываем паузу
        console.log('длинная пауза')

      } else if ((taskArray[arrayIndex].pomodore + 1) % 4 !== 0) {
        workPause(FIVE_MINUTES)
        console.log('короткая пауза')
      }

    } else if (mainInterval <= 0 && isPaused === true) { // для того что бы остановить отсчет после завершения работы паузы
      console.log('таймер паузы на нуле')
      mainInterval = 0 // обнуляем таймер
      clearInterval(mainTimerId.current); // останавливаем таймер

      setMinutesText('00') // что бы красиво был 00;00, а не  00:01
      setsecondsText('00')

      // переключаем кнопки в соответствии с макером (одномоментно может быть 2 кнопки)
      setStartButtonStatus(false);
      setPauseButtonStatus(false);
      setContinuetButtonStatus(true);
      setStoptButtonStatus(false);
      setSkiptButtonStatus(false);
      setDonetButtonStatus(true);

      setAddOneMinuteButtonOpen(false)

      // //стилизация

      
      document.getElementById('timer-head').classList.remove('red')
      document.getElementById('timer-clock').classList.remove('red')

      document.getElementById('timer-head').classList.remove('green')
      document.getElementById('timer-clock').classList.remove('green')

      // //стилизация

      // setPaused(false) не срабатывает, падает в цикл    
      setShowRelax(false)
      return isPaused = false
    }



    const minutes = mainInterval > 0 ? Math.floor(mainInterval / 1000 / 60) % 60 : 0;
    const seconds = mainInterval > 0 ? Math.floor(mainInterval / 1000) % 60 : 0;

    setMinutesText(minutes < 10 ? '0' + minutes : minutes);
    setsecondsText(seconds < 10 ? '0' + seconds : seconds);


  }

  function workPause(pauseInterval) {
    isPaused = true
    // setPaused(true) //не срабатывает, падает в цикл
    clearInterval(mainTimerId.current);
    mainInterval = pauseInterval //300000 - 5 мин 900000 - 15 мин задаем интервал на который будет пауза


    mainTimerId.current = setInterval(mainTimer, 1000); // включаем таймер mainTimerId.current - т.к. работаем через useRef

    // добавляем информ сообщение
    setShowRelax(true)
    // переключаем кнопки в соответствии с макером (одномоментно может быть 2 кнопки)
    setStartButtonStatus(false);
    setPauseButtonStatus(false);
    setContinuetButtonStatus(true);
    setStoptButtonStatus(false);
    setSkiptButtonStatus(true);
    setDonetButtonStatus(false);
    


    //стилизация

    document.getElementById('timer-head').classList.add('green')
    document.getElementById('timer-clock').classList.add('green')

    document.getElementById('timer-head').classList.remove('red')
    document.getElementById('timer-clock').classList.remove('red')
    // //стилизация
  }

  function startButtonHandler() {

    if (taskArray[arrayIndex] === undefined && taskArray.length === 0) {
      arrayIndex = 0
      clearInterval(mainTimerId.current);
      return
    }

    console.log('savedInterval', savedInterval)
    if (savedInterval === 0) { // усли сохранённый интервал = 0 то задаём интервал в 25 мин
      setMainInterval(TWENTY_FIVE_MINUTES)
      console.log('savedInterval === 0')
    } else if (savedInterval !== 0) { // иначе 
      taskArray[arrayIndex].pauseTime = taskArray[arrayIndex].pauseTime + mainInterval; // и приплюсовываем время, которое было в паузе
      console.log('savedInterval !== 0 ,сохранившийся mainInterval', mainInterval)
      mainInterval = savedInterval;
      setMainInterval(mainInterval) // вставляем из сохоанённого интервала
      console.log('savedInterval !== 0 , mainInterval', mainInterval)
    } // не работает

    setYouTurnedOnPause(false)
    setTimerReverse(false) // Здесь ф-я сеттер хука ОТРАБАТЫВАЕТ НЕ ПОНИМАЮ ПОЧЕМУ ...
    clearInterval(mainTimerId.current);
    mainTimerId.current = setInterval(mainTimer, 1000); // включаем таймер mainTimerId.current - т.к. работаем через useRef


    // переключаем кнопки в соответствии с макером (одномоментно может быть 2 кнопки)
    setStartButtonStatus(false);
    setPauseButtonStatus(true);
    setContinuetButtonStatus(false);
    setStoptButtonStatus(true);
    setSkiptButtonStatus(false);
    setDonetButtonStatus(false);

    setAddOneMinuteButtonOpen(false)


    //стилизация
    document.getElementById('timer-head').classList.add('red')
    document.getElementById('timer-clock').classList.add('red')

    document.getElementById('timer-head').classList.remove('green')
    document.getElementById('timer-clock').classList.remove('green')
    // //стилизация
  }

  function pauseButtonHandler() {
    // setSavedIntrval(mainInterval) // НЕ РАБОТАЕТ Сожраняет 0
    // console.log('setSavedIntrval(mainInterval)', setSavedIntrval(mainInterval))
    clearInterval(mainTimerId.current);
    savedInterval = mainInterval; // сохранят TWENTY_FIVE_MINUTES  т.е. изначально значение mainInterval;, а не уже отсчитанное
    setSavedIntrval(savedInterval) 
    console.log('savedInterval', savedInterval)
    //установить на 0
    mainInterval = 0
    isTimerReverse = true
    mainTimerId.current = setInterval(mainTimer, 1000); // включаем таймер mainTimerId.current - т.к. работаем через useRef
    // setTimerReverse(true) // ф-я сеттер ХУКА отрабатывает НЕ ВЕРНО, работает только isTimerReverse = true ПОЧЕМУ ?
    setYouTurnedOnPause(true)  // добавляем информ сообщение

    // переключаем кнопки в соответствии с макером (одномоментно может быть 2 кнопки)
    setStartButtonStatus(true);
    setPauseButtonStatus(false);
    setContinuetButtonStatus(false);
    setStoptButtonStatus(true);
    setSkiptButtonStatus(false);
    setDonetButtonStatus(false);

    setAddOneMinuteButtonOpen(false)

    //стилизация
    document.getElementById('timer-head').classList.add('green')
    document.getElementById('timer-clock').classList.add('green')

    document.getElementById('timer-head').classList.remove('red')
    document.getElementById('timer-clock').classList.remove('red')
    // //стилизация
  }

  function stopButtonHandler() {
    if (taskArray[arrayIndex] === undefined && taskArray.length === 0) {
      return
    }

    clearInterval(mainTimerId.current);
   
    if (mainInterval < TWENTY_FIVE_MINUTES) { // если таймер не меньше 25 минутам, то 
      taskArray[arrayIndex].stopCounter = taskArray[arrayIndex].stopCounter + 1 // то прибавляем еолличество стопов
      console.log('taskArray[arrayIndex].stopCounter ->', taskArray[arrayIndex].stopCounter)
    }

    savedInterval = 0;

    setMainInterval(TWENTY_FIVE_MINUTES) // а вот здесь работает

    setMinutesText('25')
    setsecondsText('00')


    // переключаем кнопки в соответствии с макером (одномоментно может быть 2 кнопки)
    setStartButtonStatus(true);
    setPauseButtonStatus(false);
    setContinuetButtonStatus(false);
    setStoptButtonStatus(true);
    setSkiptButtonStatus(false);
    setDonetButtonStatus(false);

    setAddOneMinuteButtonOpen(true)

    //стилизация
    document.getElementById('timer-head').classList.remove('green')
    document.getElementById('timer-clock').classList.remove('green')

    document.getElementById('timer-head').classList.remove('red')
    document.getElementById('timer-clock').classList.remove('red')
    // //стилизация
  }

  function skipButtonHandler() {
    // установить на 0
    mainInterval = 0
    clearInterval(mainTimerId.current);
    // убираем Информ Сообщение
    setShowRelax(false)

    // переводим из режима паузы (Хук срабатывает не адкватно при setPause(false))
    isPaused = false

    setMinutesText('00') // выставляем часы красиво
    setsecondsText('00')

    // переключаем кнопки в соответствии с макером (одномоментно может быть 2 кнопки)
    setStartButtonStatus(false);
    setPauseButtonStatus(false);
    setContinuetButtonStatus(true);
    setStoptButtonStatus(false);
    setSkiptButtonStatus(false);
    setDonetButtonStatus(true);

    setAddOneMinuteButtonOpen(false)

    //стилизация


    document.getElementById('timer-head').classList.remove('red')
    document.getElementById('timer-clock').classList.remove('red')

    document.getElementById('timer-head').classList.remove('green')
    document.getElementById('timer-clock').classList.remove('green')

    // //стилизация
  }

  // weekNumber function вспомогательная ф-я для подсчета недели в году, записываем ее результат в наш массив
  function weekNumberFn(incomDate) {
    let currentDate = incomDate
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil(days / 7);

    return weekNumber
  }

  function doneButtonHandler() {

    // переводим из режима паузы (Хук срабатывает не адкватно при setPause(false))
    isPaused = false
    taskArray[arrayIndex].counter = taskArray[arrayIndex].counter - 1 // убираем 1 коунер у объекта
    taskArray[arrayIndex].pomodore = taskArray[arrayIndex].pomodore + 1 // добавляем помидорку
    taskArray[arrayIndex].time = taskArray[arrayIndex].pomodore * TWENTY_FIVE_MINUTES
    let finishDateObj = new Date()
    taskArray[arrayIndex].finishDate = finishDateObj.toJSON()
    taskArray[arrayIndex].weekNumber = weekNumberFn(finishDateObj)
    finishTaskStore.addFinishTaskFn(taskArray[arrayIndex]) // добавляем в стор с законченными делами finishTaskStore

    taskStore.removeTaskFn(taskArray[arrayIndex].id)// удаляем из стора по айди

    // setArrayIndex(arrayIndex + 1) // не срабатывает
    arrayIndex = arrayIndex + 1 // переходим к следующему таску

    clearInterval(mainTimerId.current);
    // установить на 25 мин
    mainInterval = TWENTY_FIVE_MINUTES

    // переключаем кнопки в соответствии с макером (одномоментно может быть 2 кнопки)
    setStartButtonStatus(true);
    setPauseButtonStatus(false);
    setContinuetButtonStatus(false);
    setStoptButtonStatus(true);
    setSkiptButtonStatus(false);
    setDonetButtonStatus(false);

    setAddOneMinuteButtonOpen(false)

  }

  function continueButtonHandler() {

    setShowRelax(false)

    if (taskArray.length === 1 && taskArray[arrayIndex].counter === 1) { // когда остался последний таск
      doneButtonHandler() // запускаем doneButtonHandler() , т.к. действие аналогично
      arrayIndex = 0
      return
    }


    taskArray[arrayIndex].counter = taskArray[arrayIndex].counter - 1 // убираем 1 коунер у объекта
    taskArray[arrayIndex].pomodore = taskArray[arrayIndex].pomodore + 1 // добавляем помидорку
  

    if (taskArray[arrayIndex].counter <= 0) { // .counter <= 0 т.к. первый раз мы  точно выполним задачу если коунеров у обхекта не осталось
      let finishDateObj = new Date()
      taskArray[arrayIndex].finishDate = finishDateObj.toJSON()
      taskArray[arrayIndex].weekNumber = weekNumberFn(finishDateObj)
      finishTaskStore.addFinishTaskFn(taskArray[arrayIndex]) // добавляем в стор с законченными делами finishTaskStore
      taskStore.removeTaskFn(taskArray[arrayIndex].id)// удаляем из стора по айди

      arrayIndex = arrayIndex + 1 // то переходим к следующему объекту (таску)
      // setArrayIndex(arrayIndex + 1) // не срабатывает

    }

    // переключаем кнопки в соответствии с макером (одномоментно может быть 2 кнопки)
    setStartButtonStatus(false);
    setPauseButtonStatus(true);
    setContinuetButtonStatus(false);
    setStoptButtonStatus(true);
    setSkiptButtonStatus(false);
    setDonetButtonStatus(false);

    setAddOneMinuteButtonOpen(false)




    clearInterval(mainTimerId.current);
    // установить на 25 мин
    mainInterval = TWENTY_FIVE_MINUTES
    mainTimerId.current = setInterval(mainTimer, 1000); // включаем таймер mainTimerId.current - т.к. работаем через useRef


    //стилизация

    document.getElementById('timer-head').classList.add('red')
    document.getElementById('timer-clock').classList.add('red')

    document.getElementById('timer-head').classList.remove('green')
    document.getElementById('timer-clock').classList.remove('green')

    // //стилизация

  }

  function addOneMinute () {
    if (mainInterval >= TWENTY_FIVE_MINUTES && mainInterval <= THIRTY_MINUTES) { // если от 25 мин до 30 мин можем добавить 1 минуту
      isPaused = false
      taskArray[arrayIndex].time = taskArray[arrayIndex].time + ONE_MINUTE // в объект добавляем минуту
      mainInterval = mainInterval +  ONE_MINUTE// mainInterval +  ONE_MINUTE
      setMainInterval(mainInterval) // устанавливаем значение
      // setMainInterval(taskArray[arrayIndex].time) // Вот так НЕ работает
      const minutes = mainInterval > 0 ? Math.floor(mainInterval / 1000 / 60) % 60 : 0; //отрисовываем
      const seconds = mainInterval > 0 ? Math.floor(mainInterval / 1000) % 60 : 0; //отрисовываем
  
      setMinutesText(minutes < 10 ? '0' + minutes : minutes); //отрисовываем
      setsecondsText(seconds < 10 ? '0' + seconds : seconds); //отрисовываем
  }
  }

  //  useEffect(() => {
  //   addOneMinute ()
  // }, [setMinutesText, ]); // НЕ РАБОТАЕТ + добавить импорт USESTATE, Приизменении массива НЕ Перерендеривает, хотя в зависимостях taskArray





  return (
    <div className='timer'>
      <div
        className="timer__header d-flex justify-content-between"
        id="timer-head"
      >
        <span className="timer__task-name" id="timer-header-task-name">

          {isLoaded ? (taskArray[arrayIndex].text) : 'Добавьте задачи, а затем активируйте таймер'}
        </span>
        {isLoaded ? <div className="timer__task-number timer-decoration">
          <span className="timer-decoration__descr">Помидор </span>
          <span
            className="timer-decoration__number"
            id="timer-header-pomodore-number"
          >

            {" " + (taskArray[arrayIndex].pomodore + 1)}
          </span>
        </div> : ''}
      </div>
      <div className="timer__main d-flex flex-column align-items-center">
        <div className="timer__wrapper d-flex timer__wrapper--clock">
          <Clock minutes={minutesText} seconds={secondsText}  />
          {isLoaded && isAddOneMinuteButtonOpen &&  <AddMinuteButton  addOneMinute={addOneMinute} isLoaded={isLoaded}/>}
        </div>
        {isLoaded ? !showRealx && !showYouTurnedOnPause && <div className="timer__wrapper timer-descr">
          <span className="timer-descr__text">Задача </span>
          <span className="timer-descr__number" id="timer-main-task-number">
            {arrayIndex + 1}
          </span>
          <span className="timer-descr__separator"> -</span>
          <span className="timer-descr__task" id="timer-main-task-name">
            {" " + taskArray[arrayIndex].text}
          </span>
        </div> : <span className="timer__wrapper timer-descr timer-descr__text">Добавьте задачи, а затем активируйте таймер</span>}
        {showRealx ? <span className="timer__wrapper timer-descr timer-descr__text">Время отдыха</span> : ''}
        {showYouTurnedOnPause ? <span className="timer__wrapper timer-descr timer-descr__text">Вы нажали на паузу, это отразится на статистике</span> : ''}
        <div className="timer__wrapper timer__wrapper--buttons" >
          {isStartButtonOpen && <button
            className="timer__start-button btn-reset main-button"
            id="timer-start-button"
            onClick={startButtonHandler}
          >
            Старт
          </button>}
          {isPauseButtonOpen && <button
            className="timer__start-button btn-reset main-button hidden"
            id="timer-pause-button"
            onClick={pauseButtonHandler}
          >
            Пауза
          </button>}
          {isContinueButtonOpen && <button
            className="timer__start-button btn-reset main-button hidden"
            id="timer-continue-button"
            onClick={continueButtonHandler}
          >
            Продолжить
          </button>}
          {isStopButtonOpen && <button
            className="timer__stop-button btn-reset main-button main-button--grey"
            id="timer-stop-button"
            onClick={stopButtonHandler}
          >
            Стоп
          </button>}
          {isSkipButtonOpen && <button
            className="timer__stop-button btn-reset main-button main-button--grey hidden"
            id="timer-skip-button"
            onClick={skipButtonHandler}
          >
            Пропустить
          </button>}
          {isDoneButtonOpen && <button
            className="timer__stop-button btn-reset main-button main-button--grey hidden"
            id="timer-done-button"
            onClick={doneButtonHandler}
          >
            Сделано
          </button>}
        </div>
      </div>
    </div>
  );
})
