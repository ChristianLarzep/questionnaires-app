import React, { useEffect, useRef } from 'react';

import $ from "jquery";

import "./styles.scss";

export default function Modal({ type = "dialog", headingText, applyButtonText, darkBackground = false, onSave, onCancel, children }) {

  const DRAWER = "drawer";

  const containerElement = useRef();

  const activateModal = activate => {
      const MODAL_ACTIVE = "modal-active",
          MODAL_CONTAINER = "qe-ModalContainer--";

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
    <div className="qe-ModalContainer" ref={containerElement} >
      <div className={`qe-Modal-background ${ darkBackground ? "qe-Modal-backgroundDark" : "qe-Modal-backgroundLight" }`}>
        <div className={`qe-Modal-body ${ type === "drawer" ? "qe-Modal-bodyDrawer" : "qe-Modal-bodyDialog" }`}> 
          <h2>{headingText}</h2>
          <a className="qe-Modal-close" href="/" onClick={ e => { e.preventDefault(); closeModal( onCancel ); }}>&times;</a>
          <div className="qe-Modal-bodyContent">
            {children}
            <div className="qe-Modal-bodyActions">
              <button className="qe-Modal-button qe-Modal-actionCancel" onClick={ () => closeModal( onCancel ) }>Cancel</button>
              <button className="qe-Modal-button qe-Modal-actionApply" onClick={ () => closeModal( onSave ) }>{applyButtonText}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
