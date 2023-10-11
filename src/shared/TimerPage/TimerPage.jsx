import React from 'react';
import './timerPage.css';
import { AddTaskForm } from './AddTaskForm/AddTaskForm';
import { TaskList } from './TaskList';
import { Timer } from './Timer/Timer';
import { HoursCounter } from './HoursCounter/HoursCounter';

export function TimerPage() {
  return (
    <div className="container row main__container">
      <section className="main__section col section-left">
        <h2 className="section-left__title">Ура! Теперь можно начать работать:</h2>
        <ul className="section-left__list list-descr list-reset">
          <li className="list-descr__item">
            Выберите категорию и&nbsp;напишите название текущей задачи
          </li>
          <li className="list-descr__item">Запустите таймер («помидор»)</li>
          <li className="list-descr__item">
            Работайте пока «помидор» не&nbsp;прозвонит
          </li>
          <li className="list-descr__item">
            Сделайте короткий перерыв (3-5&nbsp;минут)
          </li>
          <li className="list-descr__item">
            Продолжайте работать «помидор» за&nbsp;«помидором», пока задача
            не&nbsp;будут выполнена. Каждые 4&nbsp;«помидора» делайте длинный
            перерыв (15-30&nbsp;минут).
          </li>
        </ul>
        <AddTaskForm />
        <TaskList />
        <HoursCounter/>
      </section>
      <section className="main__section col section-right timer">
        <Timer/>
      </section>
    </div>

  );
}
