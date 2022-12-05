import React from 'react';

import "./styles.scss";

export default function Button( props ) {

  const {  icon, text, disabled = false, onClick, ...extraProps } = props;

  const blockName = "qe-Button";

  const getBody = function() {
      return (
        <span className={`${blockName}-label`}>
          <span className= {`${blockName}-icon ${icon}`} aria-hidden="true"></span>
          <span className={`${blockName}-text`}>{text}</span>
        </span>
      );
  };

  return (
    <>
      {
        icon ? 
          onClick ? 
            <button {...extraProps} onClick={onClick} className={`${blockName}`} type="button" title={text} disabled={disabled}>
              { getBody() }
            </button>
          :           
            <span {...extraProps} className={`${blockName}`}>
              { getBody() }
            </span>
        : <button {...extraProps} onClick={onClick} className={`${blockName}-text`} disabled={disabled}>
            {text}
          </button>
      }
    </>
  )
}
