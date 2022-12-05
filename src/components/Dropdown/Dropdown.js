import React, { useEffect, useRef, useState } from 'react';

import $ from "jquery";

import "./styles.scss";
import Button from '../Button';

export default function Dropdown( { id, hover, actions } ) {
    const blockName = "qe-dropdown";

    const dropdownRef = useRef();

    const [ showDropdown, setShowDropdown ] = useState( false );

    const openDropdown = () => {
        setShowDropdown( show => !show );
    };

    useEffect( () => {
        const CLICK_EVENT = "click";

        const handleClick = e => {
            let isOuterElmnt = !e.target.closest( "#" + id );
    
            if ( isOuterElmnt ) {
                setShowDropdown( false );
            }
        };
 
        window.addEventListener( CLICK_EVENT, handleClick );

        return () => {
            window.removeEventListener( CLICK_EVENT, handleClick );

            $( document ).off( `keydown.${id}` );
        }
    }, [ id ] );

    useEffect( () => {
        let keydownEvent = `keydown.${id}`;

        if ( showDropdown ) {
            let rect = dropdownRef.current.getBoundingClientRect(),
                isOffscreen = !( rect.right <= window.innerWidth ); // For this case we only check if dropdown is within the right boundrie of viewport 

            if ( isOffscreen ) {
                dropdownRef.current.classList.toggle( "right" ); // Fix dropdown position
            }

            // Focus first action item
            $( `#${id}-menu > li > a` )[0].focus();

            // Key event handler
            $( document ).on( keydownEvent, e => {
                if ( e.originalEvent.key === "Escape" ) {

                    setShowDropdown( false );
        
                    document.querySelector( `#${id}-menu-btn` ).focus();
                }
            } );
        } else {
            // We only need the key event handler while dropdown is opened
            $( document ).off( keydownEvent );
        }
    }, [ showDropdown, id ] );

    return (
        <div id={id} className={`${blockName} ${ ( hover ? "hover-btn" : "" ) }`}>
          <Button 
            id={`${id}-menu-btn`}
            icon="fa fa-ellipsis-h"
            text="Actions"
            aria-haspopup="true"
            aria-controls={`${id}-menu`}
            onClick={openDropdown}
          />
          {
            showDropdown ? (
                  <ul 
                    id={`${id}-menu`}
                    ref={dropdownRef} 
                    className={`${blockName}-ActionsMenu`} 
                    role="menu"
                    aria-labelledby={`${id}-menu-btn`}
                  >
                    {
                        actions.map( ( item, index ) => (
                            <li key={index} role="none">
                              <a
                                className={ item.disabled ? `${blockName}-ActionsMenu-item--disabled` : '' } 
                                role="menuitem"
                                href="/"
                                onClick={ e => { 

                                    e.preventDefault(); 

                                    if ( !item.disabled ) {
                                        item.action(); 

                                        setShowDropdown( !item.closeOnClick );
                                    }
                                
                                } }>
                                <i className={item.icon} role="none"></i>{item.name}
                              </a>
                            </li>
                        ) )
                    }
                  </ul>
            ) : null
          }
        </div>
    )
}
