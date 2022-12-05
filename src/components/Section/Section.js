import React, { useCallback, useEffect, useState } from 'react';

import { Button, Dropdown, Item, Modal, TextField } from './..';
import { getItemTypeTemplate } from './../../services/fakeItemsTemplatesService';

import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

import './styles.scss';

export default function Section( { 
    questionnaireId,
    sectionName, 
    sectionNum, 
    heading, 
    allowQuestions, 
    allowBoilerplates,
    hasDetails,
    addPage,
    deletePage,
    disableDelete,
    data
} ) {
    const blockName = "qe-Section";

    const PAGE = "PAGE",
        SELECT_LIST = "SELECT_LIST",
        DISPLAY_TEXT = "DISPLAY_TEXT";

    const [ sectionTitle, setSectionTitle ] = useState( '' );
    const [ sectionAdditionalText, setSectionAdditionalText ] = useState( '' );
    const [ sectionItems, setSectionItems ] = useState( [] );
    const [ openDeletePageModal, setOpenDeletePageModal ] = useState( false );
    const [ openEditModal, setOpenEditModal ] = useState( false );

    const handleSectionTitleChange = e => {
        data.title = e.target.value;
        setSectionTitle( data.title );
    };

    const handleSectionAdditionalTextChange = e => {
        data.additionalText = e.target.value;

        setSectionAdditionalText( data.additionalText );
    };

    const generateId = function() {
        return parseInt( Math.random().toString().split( "." )[ 1 ] + Math.random().toString().split( "." )[ 1 ] );
    };

    const deleteItem = function( itemId ) {
        data.items = data.items.filter( item => item.id !== itemId );

        setSectionItems( data.items );
    };

    const addItem = function( item, position ) {
        if ( position ) { 
            data.items.splice( position, 0, item );
        } else { 
            data.items.push( item );
        }

        setSectionItems( [ ...data.items ] ); 
    };

    const copyItem = function( item ) {
        let copy = { ...item },
            options = item.options;

        copy._added = true;

        if ( options ) {
            
            copy.options = [];

            for ( let i = 0; i < options.length; i++ ) {
                copy.options.push( { ...options[ i ] } );
            }
        } else if ( copy.items ) {
            
            copy.items = [];
        }

        return copy;
    };

    const duplicateItem = function( itemId, position ) {
        let item = data.items.find( item => item.id === itemId ),
            copy = copyItem( item );

        copy.id = generateId();
        copy.title += " - Copy";

        addItem( copy, position );
    };

    const addNewItem = function( type, position ) {
        let item = getItemTypeTemplate( type ),
            copy = copyItem( item );

        copy.id = generateId();

        if ( type === PAGE ) {
            addPage( copy, position );
        } else {
            addItem( copy, position );
        }
    };

    const addSortable = useCallback( () => {
        $( `#${data.id}` ).find( `.${blockName}-itemsList` ).sortable( {
            items: ".qe-Item",
            handle: ".qe-Item-sortable",
            placeholder: "ui-state-highlight",
            tolerance: "pointer",
            update: ( event, ui ) => {
                let target$ = ui.item,
                    itemId = target$.attr( "id" ),
                    itemDataIndex = data.items.findIndex( item => item.id === parseInt( itemId ) ),
                    itemData = data.items[ itemDataIndex ];

                setTimeout( () => {
                    let newPosition = [ ...target$.parent().children() ].findIndex( item => item.id === itemId );

                    // Remove item
                    data.items.splice( itemDataIndex, 1 );

                    // Add item at new position
                    data.items.splice( newPosition, 0, itemData );

                    // Update items hook
                    setSectionItems( data.items );
                }, 0 );
            }
        } ); 
    
    }, [ data ] );

    useEffect( () => {
        setSectionTitle( data.title );
        setSectionAdditionalText( data.additionalText );
        setSectionItems( data.items );

        addSortable();

        delete data.type;
        delete data._added;

    }, [ addSortable, data ] );

    return (
        <div id={data.id} className={`${blockName} ${blockName}--${sectionName}`} role="region" aria-labelledby={`s_${sectionNum}_heading`}>
          <div className={`${blockName}-header`}>
            <div id={`s_${sectionNum}_heading`} className={`${blockName}-heading`}>{heading}</div>
            <div className={`${blockName}-add`}>
              <span className={`${blockName}-addIcon`}>
                <i className="fa fa-plus" aria-hidden="true"></i>
              </span>
                <div className={`${blockName}-addActions`}>
                {
                    allowQuestions ? 
                      <Button text="Add Question" onClick={ () => addNewItem( SELECT_LIST ) }/>
                    : null
                }
                {
                    allowBoilerplates ? 
                      <Button text="Add Boilerplate" onClick={ () => addNewItem( DISPLAY_TEXT ) } />
                    : null
                }
                {
                    sectionName === "Page" ?
                      <Button text="Add Page" onClick={ () => addNewItem( PAGE, sectionNum - 1 ) } />
                    : null
                }
                </div>
            </div>
          </div>
          {
            hasDetails ? 
              <div className={`${blockName}-details`}>
                <div className={`${blockName}Details`}>
                  <TextField 
                    id={`s_${sectionNum}_title`}
                    label="Page Title" 
                    value={sectionTitle} 
                    onChange={handleSectionTitleChange}
                    focused={!!data._added}
                  />
                  <TextField 
                    id={`s_${sectionNum}_desc`} 
                    label="Page Description" 
                    value={sectionAdditionalText} 
                    onChange={handleSectionAdditionalTextChange}
                  />
                </div>

                <div className={`${blockName}-actions`}>
                  <Button icon="fa fa-pencil" text="Edit Page" onClick={ () => setOpenEditModal( true ) } />
                  <Dropdown 
                    id={`s_${sectionNum}-actionsMenu`}
                    actions={ [
                      {
                        name: "Add Question", 
                        icon: "fa fa-address-card-o",
                        closeOnClick: true,
                        action: () => {
                            addNewItem( SELECT_LIST );
                            console.log( "Add question" );
                        }
                      },
                      {
                        name: "Add Boilerplate", 
                        icon: "fa fa-address-card",
                        closeOnClick: true,
                        action: () => {
                            addNewItem( DISPLAY_TEXT );
                            console.log( "Add boilerplate" );
                        }
                      },
                      {
                        name: "Add Page", 
                        icon: "fa fa-plus-square",
                        closeOnClick: true,
                        action: () => {
                            addNewItem( PAGE, sectionNum - 1 );
                            console.log( "Add page" );
                        }
                      },
                      {
                        name: "Delete Page", 
                        icon: "fa fa-minus-circle",
                        closeOnClick: true,
                        disabled: disableDelete,
                        action: () => {
                            setOpenDeletePageModal( true );
                            console.log( "delete page" );
                        }
                      },
                    ] }
                  />
                </div>
              </div>
              : null
          }
          <div className={`${blockName}-itemsList`}>
            {
              sectionItems ? 
                sectionItems.map( ( item, index ) => (
                  <Item 
                    key={index}
                    questionnaireId={questionnaireId}
                    sectionId={data.id}
                    sectionName={sectionName}
                    questionNum={index+1}
                    sectionNum={sectionNum}
                    isLast={ ( index + 1 ) === sectionItems.length }
                    data={item}
                    deleteItem={deleteItem}
                    duplicateItem={duplicateItem}
                    addNewItem={addNewItem}
                  />
                ) ) 
              : null
            }
          </div>
          {
            openDeletePageModal ?
              <Modal 
                headingText="Delete Page"
                applyButtonText="Delete"
                onSave={ () => { deletePage( data.id ); setOpenDeletePageModal( false ); } }
                onCancel={ () => setOpenDeletePageModal( false ) }
              >
                <b>Are you sure you want to delete this page?</b><br/>
                <span>All items in this page will be deleted too.</span>
              </Modal>
              : null
          }
          {
            openEditModal ?
              <Modal 
                type="drawer"
                headingText="Edit Page"
                applyButtonText="Save"
                onSave={ () => setOpenEditModal( false ) }
                onCancel={ () => setOpenEditModal( false ) }
              >
                <div style={{ height: "500px" }}>Through this modal user will be able to update more page properties.</div>
              </Modal>
            : null
          }
        </div>
    )
}
