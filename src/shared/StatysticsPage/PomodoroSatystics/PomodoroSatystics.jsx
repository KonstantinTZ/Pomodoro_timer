import React from 'react';
import './pomodoroSatystics.css';

import img from '../../../img/pomidoro__img.svg'

export function PomodoroSatystics({pomodoreMetric}) {
  return (
    <div
            className="statistics__pomodoro-field pomodoro-field"
            id="pomodoro-field-info"
          >
            <div className="statistics__wrapper statistics__wrapper--pomodoro">
              <img
                className="pomodoro-field__img"
                src={img}
                alt="помидор"
              />
              <span
                className="pomodoro-field__counter"
                id="pomodoro-counter-body"
              >
                x{" " + pomodoreMetric}
              </span>
            </div>
            <div className="pomodoro-field__footer">
              <span
                className="pomodoro-field__counter-footer"
                id="pomodoro-counter-footer"
              >
                {pomodoreMetric + ' '} помидора
              </span>
            </div>
          </div>
  );
}
