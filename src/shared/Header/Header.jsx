import React from 'react';
import './header.css';
import { TimerPageButton } from './TimerPageButton/TimerPageButton';
import { StatysticsPageButton } from './StatysticsPageButton/StatysticsPageButton';


export function Header() {
  return (
    <header className="header">
    <div className="container d-flex justify-content-between pt-4 pb-4 header__container">
      <TimerPageButton/>
      <StatysticsPageButton/>
    </div>
  </header>
  );
}
