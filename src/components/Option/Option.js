import React, { useEffect, useState } from 'react';

import { Button, TextField } from "./../index";

import "./styles.scss";

export default function Option( { 
    type, 
    sectionNum, 
    questionNum, 
    optionNum, 
    isSortable, 
    icon, 
    data = {}, 
    addOption,
    deleteOption,
    disableDelete,
    focusOption,
    isFirst,
    isLast
} ) {
    const blockName = "qe-Option";
  
    const IS_COMMENT_TYPE = type === "COMMENT";
  
    const [ text, setText ] = useState( "" );

    const handleOptTextChange = e => {
        data.text = e.target.value; 

        setText( e.target.value );
    };

    const handleKeyDown = function( e ) {
        if ( isSortable ) {
            if ( e.code === "ArrowDown" ) {
                e.preventDefault();

                if ( isLast ) {
                    addOption( true );
                } else {
                    focusOption( data.id, "down" );
                }
            } else if ( e.code === "ArrowUp" && !isFirst ) {
                e.preventDefault();

                focusOption( data.id, "up" );
            }
        }
    };

    useEffect( () => {
        setText( isSortable ? data.text : "" );
    }, [ isSortable, data ] );

    useEffect( () => {
      const test = function() {
          delete data._focused;
      };
      
      test();
    } );

    return (
      <li className={blockName} id={data.id}>    
        {
          isSortable ? 
            <div className={`${blockName}-sortable`}>
              <Button icon="fa fa-bars" text="Drag Option" />
            </div>
          : null
        }  
        {
          icon ? 
            <div className={`${blockName}-visual`}>
              <Button icon={icon} text="" />
            </div>
          : null
        }        
        {
          type !== "SWITCH" ?
            <div className={`${blockName}Details`}>
              <TextField 
                id={`s_${sectionNum}_q_${questionNum}_o_${optionNum}_title`}
                label={ !IS_COMMENT_TYPE ? "Option Text" : "" }
                value={text} 
                onChange={handleOptTextChange}
                disabled={ IS_COMMENT_TYPE }
                autoResize={false}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                focused={!!data._focused}
              />
          </div>
          : null
        }
        {
          isSortable ? 
            <div className={`${blockName}-actions`}>
              <Button icon="fa fa-trash-o" text="Delete Option" disabled={disableDelete} onClick={ () => { if ( !disableDelete ) { deleteOption( data.id ); } } }/>
            </div>
          : null
        }
      </li>  
    )
}