import React, { useEffect, useState } from 'react';

import $ from 'jquery'; 

import "./styles.scss";

export default function TextField( props ) {
  const blockName = "qe";

  const { id, label, value, onChange, disabled = false, autoResize = true, focused = false, ...extraProps } = props;

  const [ scrollHeight, setScrollHeight ] = useState( 0 );
  const [ offsetHeight, setOffsetHeight ] = useState( 0 );

  const resizeField = field => {

      field.style.height = offsetHeight;

      if ( field.scrollHeight > scrollHeight ) {
          field.style.height = field.scrollHeight + "px";     
      }
  };

  const handleChange = e => {
      onChange( e ); 
      
      if ( autoResize ) {
          resizeField( e.target );
      }
  };

  useEffect( () => {
      let title$ = $( "#" + id );

      setScrollHeight( title$.get( 0 ).scrollHeight );

      setOffsetHeight( title$.css( "height" ) );

      if ( focused ) {
          title$.trigger(  "focus" );
      }
  }, [ id, focused ] );
  
  return (
    <div className={`${blockName}-textField`}>
      {
        autoResize ? 
          <>
            <label className={`${blockName}-textField-label`} htmlFor={id}>{label}</label>
            <textarea 
              id={id}
              className={`${blockName}-textField-input`}
              placeholder={label} 
              value={value} 
              onChange={handleChange}
              disabled={disabled}
              { ...extraProps }
            ></textarea>
          </>
        : <input 
            id={id}
            type="text"
            placeholder={label} 
            className={`${blockName}-textField-input`}
            value={value} 
            onChange={handleChange}
            disabled={disabled}
            { ...extraProps }
          />
      }
    </div>
  )
}
