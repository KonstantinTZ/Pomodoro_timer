import React from 'react';
import './TaskList.css';
import { TaskItem } from './TaskItem/TaskItem';
import { observer } from 'mobx-react-lite';
import taskStore from '../../../store/taskStore';


export const TaskList = observer(() => {
  return (
    <ul className="section-left__list task-list list-reset" id="task-list">
      {
        taskStore.tasksArray.map(task =>
          <TaskItem key={task.id} taskCounter={task.counter} taskText={task.text} taskId={task.id}/>
          )}
    </ul>
  );
})
