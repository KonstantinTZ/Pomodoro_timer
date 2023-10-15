import {React, useState, useEffect} from 'react';
import './dayStatystics.css';



export function DayStatystics({todayName, workedTime}) {

  let [isHidden, setHidden] = useState(true)

  useEffect(()=>{
    if (workedTime === 0) {
		setHidden(false) 
  } else if (workedTime !== 0) {
    setHidden(true) 
  }
	}, [workedTime])

  
 
  return (
    <div className="statistics__day-activity-field day-activity-field d-flex flex-column ">
      <span className="day-activity-field__day" id="statistics-day">
        {todayName}
      </span>
      {!isHidden && <span className="day-activity-field__plug hidden">Нет данных</span>}
      {isHidden && <span className="day-activity-field__info info">
        Вы работали над задачами в течениии 
        <span className="info__counter" id="day-activity-counter">
            {" " + workedTime}
        </span> 
      </span> }
    </div>
  );
}
