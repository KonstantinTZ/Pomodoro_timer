import React, { useState } from 'react';
import './addTaskForm.css';
import { idGenerator } from '../../../utils/idGenerator';
import taskStore from '../../../store/taskStore';


export function AddTaskForm() {

  const [addInputValue, setAddInputValue] = useState('')

  function handleOnInputChange(event) {
    setAddInputValue(event.target.value)
  }

  function handlerAddFormSubmit ( event) {
    event.preventDefault();
    let newTask = {}

    let taskId = idGenerator();

    newTask.text = addInputValue
    newTask.counter = 1;
    newTask.id = taskId 
    newTask.pomodore = 0;
    newTask.time = 1500000;
    newTask.pauseTime = 0;
    newTask.stopCounter =  0;
    newTask.weekNumber = 0;
    newTask.finishDate = '';

    taskStore.addTaskFn(newTask)

    setAddInputValue(event.target.value = '')

  }

  return (
    <form
      className="section-left__form add-form d-flex flex-column align-items-start"
      id="add-form"
      onSubmit={handlerAddFormSubmit}
    >
      <input
        type="text"
        id="add-form-input"
        className="add-form__input"
        placeholder="Название задачи"
        value={addInputValue}
        onChange={handleOnInputChange}
      />
      <button
        className="add-form__button btn-reset main-button" id="add-form-button" type='submit'>
        Добавить
      </button>
    </form>
  );
}
