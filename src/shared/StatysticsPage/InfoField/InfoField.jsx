import React from 'react';
import { ReactSVG } from "react-svg";
import './infoField.css';



export function InfoField({fieldInfo, fieldMetric, activeClass, categoryClass, iconName}) {
  return (
    <div
        className={"statistics__info-field info-field col-4 d-flex justify-content-between " + activeClass + " " + categoryClass}
        id="focus-box"
      >
        <div className="statistics__wrapper d-flex flex-column">
          <span className="info-field__title">{fieldInfo}</span>
          <span className="info-field__metric" id="focus-metric">
            {fieldMetric}
          </span>
        </div>
        
         <ReactSVG className="reactSvg"  src={require(`../../../img/${iconName}__img.svg`)}/> 
       
      </div>
  );
}
