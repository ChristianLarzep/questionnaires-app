import React, { useEffect, useRef } from 'react';

import $ from 'jquery';

import './styles.scss';

export default function Modal({ type = "dialog", headingText, applyButtonText, darkBackground = false, onSave, onCancel, children }) {

  const DRAWER = "drawer";

  const blockName = "qe-Modal";

  const containerElement = useRef();

  const activateModal = activate => {
      const MODAL_ACTIVE = "modal-active",
          MODAL_CONTAINER = blockName + "Container--";

      let body$ = $( "body" ),
          container$ = $( containerElement.current );

      if ( activate ) {
          body$.addClass( MODAL_ACTIVE );

          container$.addClass( MODAL_CONTAINER + "opened" );
      } else {
          body$.removeClass( MODAL_ACTIVE );

          container$.addClass( MODAL_CONTAINER + "closed" );
      }
  }; 

  const closeModal = callBack => {
      let timeout = type === DRAWER ? 500 : 0;

      activateModal( false );

      setTimeout( () => {     
        callBack();
      }, timeout );
  };

  useEffect( () => {
      activateModal( true );
  }, [] );

  return (
    <div className={`${blockName}Container`} ref={containerElement} >
      <div className={`${blockName}-background ${ darkBackground ? `${blockName}-backgroundDark` : `${blockName}-backgroundLight` }`}>
        <div className={`${blockName}-body ${ type === "drawer" ? `${blockName}-bodyDrawer` : `${blockName}-bodyDialog` }`}> 
          <h2>{headingText}</h2>
          <a className={`${blockName}-close`} href="/" onClick={ e => { e.preventDefault(); closeModal( onCancel ); }}>&times;</a>
          <div className={`${blockName}-bodyContent`}>
            {children}
            <div className={`${blockName}-bodyActions`}>
              <button className={`${blockName}-button ${blockName}-actionCancel`} onClick={ () => closeModal( onCancel ) }>Cancel</button>
              <button className={`${blockName}-button ${blockName}-actionApply`} onClick={ () => closeModal( onSave ) }>{applyButtonText}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
