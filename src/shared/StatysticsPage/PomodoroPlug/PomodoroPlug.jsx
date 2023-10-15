import React from 'react';
import './pomodoroPlug.css';

import img from '../../../img/pomodoro-smile.svg'

export function PomodoroPlug() {
  return (
    <div
    className="statistics__pomodoro-plug pomodoro-plug hidden"
    id="pomodoro-plug"
  >
    <img
      className="pomodoro-plug__img"
      src={img}
      alt="Пока не выполнено ни одного помидора"
    />
  </div>
  );
}
