import React, { useState } from 'react';
import './TaskItem.css';
import { DropDown } from '../../DropDown/DropDown';
// import saveModeOpener from '../../../../store/saveModeOpener';
import { observer } from 'mobx-react-lite';

const NOOP = () => {};

export const TaskItem = observer( ({taskCounter, taskText,  isOpen, onOpen = NOOP, onClose = NOOP, taskId}) => {
  // eslint-disable-next-line
  // const [isDropDownOpen, setDropDownOpen] = useState(false)
  // для закрытия на нажатие Вне 
  // НЕ РАБОТАЕТ
  // const dropDownClose = () => {
  //   console.log('Я пытаюсь закрыться')
  // };

  // useEffect(()=>{
  //   isDropDownOpen(false)
	// }, [isDropDownOpen])

  // let isInputOpen = saveModeOpener.saveModeStatus
  const [isInputOpen, setInputOpen] = useState(false)

  const toggleInputOpen = () => {
    setInputOpen(!isInputOpen);
  };

  const handleInputClose = () => {
    setInputOpen(false);
    
};

  let isSpanOpen = !isInputOpen
 

  const [inputValue, setInputValue] = React.useState(taskText);

  function handlerInput (event) {
    setInputValue(event.target.value);
  }

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  React.useEffect(() =>setIsDropdownOpen(isOpen) , [isOpen]);
  // eslint-disable-next-line
  React.useEffect(() =>isDropdownOpen ? onOpen() : onClose() , [isDropdownOpen]);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
    handleInputClose()
  }

  return (
    <li className="task-list__item task-body ">
        <span className="task-body__counter">{taskCounter}</span>
       {isSpanOpen && <span className="task-body__text">{taskText}</span>}
        {isInputOpen &&<input className="task-body__text task-body__text--active" value={inputValue} onChange={handlerInput}/>}
        <button className="btn-reset task-body__button" onClick={handleOpen}>
          <svg
            width={26}
            height={6}
            viewBox="0 0 26 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={3} cy={3} r={3} fill="#C4C4C4" />
            <circle cx={13} cy={3} r={3} fill="#C4C4C4" />
            <circle cx={23} cy={3} r={3} fill="#C4C4C4" />
          </svg>
        </button>
        {isDropdownOpen && <DropDown taskId={taskId}  inputValue={inputValue} toggleInputOpen={toggleInputOpen } handleInputClose ={handleInputClose }/> }
      </li>
  );
})
