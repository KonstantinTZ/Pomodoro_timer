import React from 'react';
import './main.css';
import { TimerPage } from '../TimerPage';
import { StatysticsPage } from '../StatysticsPage';
import pageOpener from '../../store/pageOpener';
import { observer } from 'mobx-react-lite';

export const Main = observer(() => {
  const openStatysticPage = pageOpener.pageOpenStatus
  const openTimerPage = !openStatysticPage
  return (
   <main className='container row main__container statistics'>
    {openTimerPage && <TimerPage/>}
    {openStatysticPage && <StatysticsPage/>}
    </main>
  );
})
