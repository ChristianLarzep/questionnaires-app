import React from 'react';

import "./styles.scss";

export default function Button( props ) {

  const { type = "text", iconClass, label, disabled = false, onClick, ...extraProps } = props;

  const blockName = "qe-Button",
      isIconType = type === 'icon';

  const getBody = function() {
      return (
        <span className={`${blockName}-label`}> 
          <span className= {`${blockName}-icon ${iconClass}`} aria-hidden="true"></span>
          <span className={`${blockName + ( type === 'icon' ? '-labelText-hidden' : '-labelText-visible' ) }`}>{label}</span>
        </span>
      );
  };

  const getIconBtnClasses = function() {
      return blockName + ' ' + ( isIconType ? blockName + '--Icon' : blockName + '--IconText' );
  };

  return (
    <>
      {
        isIconType || type === "iconText" ? 
          onClick ? 
            <button {...extraProps} onClick={onClick} className={getIconBtnClasses()} type="button" title={label} disabled={disabled}>
              { getBody() }
            </button>
          :           
            <span {...extraProps} className={getIconBtnClasses()}>
              { getBody() }
            </span>
        : <button {...extraProps} onClick={onClick} className={`${blockName}-text`} disabled={disabled}>
            {label}
          </button>
      }
    </>
  )
}
