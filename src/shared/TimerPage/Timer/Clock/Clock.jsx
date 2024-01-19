import React from 'react';
import './Clock.css';

export function Clock({minutes, seconds}) {
  return (
    <div className="timer__clock clock" id="timer-clock">
                <span className="clock__minutes">{minutes}</span>
                <span lass="clock__separator">:</span>
                <span className="clock__seconds">{seconds}</span>
              </div>
  );
}
