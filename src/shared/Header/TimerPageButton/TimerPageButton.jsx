import React from 'react';
import './timerPageButton.css';
import logoImg from '../../../img/logo.png'
import pageOpener from '../../../store/pageOpener';

export function TimerPageButton() {
  return (
    <button className="header__logo logo-link d-flex align-items-center btn-reset" onClick={()=>pageOpener.statysticsPageCloseFn()}>
        <img className="logo-link__img " src={logoImg} alt="логотип" />
        <span className="logo-link__descr">pomodoro_box</span>
      </button>
  );
}
