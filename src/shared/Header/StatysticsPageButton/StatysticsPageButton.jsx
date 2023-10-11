import React from 'react';
import './statysticsPageButton.css';
import pageOpener from '../../../store/pageOpener';



export function StatysticsPageButton() {
 

  
 

  return (
    <button
        onClick={()=>pageOpener.statysticsPageOpenFn()}
        className=" header__statistics-page statistics-link d-flex align-items-center btn-reset"
      >
        <svg
          className="statistics-link__img"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_18287_400)">
            <path
              d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z"
              fill="#DC3E22"
            />
          </g>
          <defs>
            <clipPath id="clip0_18287_400">
              <rect width={24} height={24} fill="white" />
            </clipPath>
          </defs>
        </svg>
        {/* <img class="statistics-link__img" src="img/statystik__img.svg" alt="логотип"> */}
        <span className="statistics-link__descr ">Статистика</span>
      </button>
  );
}
