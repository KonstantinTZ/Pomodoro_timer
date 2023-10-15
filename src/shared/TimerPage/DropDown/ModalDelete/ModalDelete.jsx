import React from 'react';
import ReactDOM from 'react-dom';
import './ModalDelete.css';
import { observer } from 'mobx-react-lite';
import taskStore from '../../../../store/taskStore';
import modalOpener from '../../../../store/modalOpener';

export const ModalDelete = observer(({ taskId }) => {

  function deleteButtonHandler () {
    taskStore.removeTaskFn(taskId)
    modalOpener.modalCloseFn()
  }

  function closeButtonHandler () {
    modalOpener.modalCloseFn()
  }

  return ReactDOM.createPortal((

    <div className="popup-rc open">
  {/* rc - remove client */}
  <div className="popup-rc__box d-flex flex-column align-items-center">
    <button className="btn popup-rc__btn-close" onClick={closeButtonHandler}>
      <svg
        className="popup-rc__icon-close"
        width={17}
        height={17}
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z"
          fill="#B0B0B0"
        />
      </svg>
    </button>
    <span className="popup-rc__title">Удалить задачу?</span>
    <button className="popup-rc__btn-submit btn" onClick={deleteButtonHandler} >
      Удалить
    </button>
    <button className="popup-rc__btn-cancel btn" onClick={closeButtonHandler} >Отмена</button>
  </div>
</div>




  ), document.getElementById('modal')
  );
})
