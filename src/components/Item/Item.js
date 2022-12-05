import React, { useCallback, useEffect, useState } from 'react';
import { getItemTypeTemplate } from './../../services/fakeItemsTemplatesService';
import { Button, Dropdown, TextField, Option, Modal } from "./../index.js";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

import "./styles.scss";

export default function Item( { 
    questionnaireId, 
    sectionId,
    sectionName, 
    sectionNum, 
    questionNum,
    isLast, 
    data, 
    deleteItem,
    duplicateItem,
    addNewItem
} ) {

    const blockName = "qe-Item";

    const PAGE = "Page",
        QUESTION = "QUESTION";
    
    const [ itemTitle, setItemTitle ] = useState( '' );
    const [ itemAdditionalText, setItemAdditionalText ] = useState( '' );
    const [ itemOptions, setItemOptions ] = useState( [] );
    const [ itemType, setItemType ] = useState( '' );
    const [ selectValue, setSelectValue ] = useState( '' );
    const [ itemIcon, setItemIcon ] = useState( '' );
    const [ openTypesModal, setOpenTypesModal ] = useState( false );
    const [ openDeleteModal, setOpenDeleteModal ] = useState( false );
    const [ openEditModal, setOpenEditModal ] = useState( false );

    const handleItemTitleChange = e => {
        data.title = e.target.value;

        setItemTitle( data.title );
    };

    const handleItemAdditionalTextChange = e => {
        data.additionalText = e.target.value;
        
        setItemAdditionalText( data.additionalText );
    };

    const handleChangeType = e => {
        setSelectValue( e.target.value );
    };

    const deleteOption = function( optId ) {
        data.options = data.options.filter( opt => opt.id !== optId );

        setItemOptions( data.options );
    };

    const changeType = () => {
        let itemTemplate = getItemTypeTemplate( selectValue );

        if ( [ "SWITCH", "COMMENT" ].includes( selectValue ) ) {
                data.options = null;
        } else {
            if ( !itemOptions ) {
                data.options = itemTemplate.options;
            }
        }

        setItemOptions( data.options );

        data.type = selectValue;
        setItemType( data.type );

        data.icon = itemTemplate.icon;
        setItemIcon( data.icon );

        setOpenTypesModal( false );   
    };

    const getActions = () => {
        let actions = [
            {
              name: "Delete", 
              icon: "fa fa-minus-circle",
              closeOnClick: true,
              action: () => {
                  setOpenDeleteModal( true );
              }
            },
            {
              name: "Duplicate", 
              icon: "fa fa-files-o",
              closeOnClick: true,
              action: () => {
                  duplicateItem( data.id, questionNum );
              }
            }
        ];

        if ( data.category === QUESTION ) {
            actions.unshift( {
                name: "Change Type", 
                icon: "fa fa-wrench",
                closeOnClick: true,
                action: () => {
                    console.log( "Change Type" );
                    setOpenTypesModal( true );
                }
            } );
        }

        if ( itemOptions ) {
            actions.push( {
                name: "Add Option", 
                icon: "fa fa-plus-circle",
                closeOnClick: true,
                action: () => {
                    addOption();
                    console.log( "Add Option" );
                }
            } );
        }

        return actions;
    };

    const removeItem = function() {
        setOpenDeleteModal( false );

        deleteItem( data.id );
    };

    const addOption = function( focus = false ) {
        data.options = data.options.concat( {
            id: parseInt( Math.random().toString().split( "." )[ 1 ] ),
            text: "Option " + ( itemOptions.length + 1 ),
            _focused: focus
        } );

        setItemOptions( data.options );
    };

    const focusNextOption = function( optId, direction ) {
        let optIndex = data.options.findIndex( opt => opt.id === optId ),
            option = data.options[ direction === "up" ? optIndex - 1 : optIndex + 1 ];

        option._focused = true;

        data.options = data.options.map( opt => opt.id === option.id ? option : opt );

        setItemOptions( data.options );
    };

    const addSortable = useCallback( () => {
      if ( data.options ) {
          $( `#${data.id}` ).find( `.${blockName}Options-list` ).sortable( {
              items: ".qe-Option",
              handle: ".qe-Option-sortable",
              placeholder: "ui-state-highlight",
              tolerance: "pointer",
              axis: "y",
              update: ( event, ui ) => {
                  let target$ = ui.item,
                      optId = target$.attr( "id" ),
                      optDataIndex = data.options.findIndex( opt => opt.id === parseInt( optId ) ),
                      optionData = data.options[ optDataIndex ];

                  setTimeout( () => {
                      let newPosition = [ ...target$.parent().children() ].findIndex( opt => opt.id === optId );

                      // Remove option
                      data.options.splice( optDataIndex, 1 );

                      // Add option at new position
                      data.options.splice( newPosition, 0, optionData );

                      // Update options hook
                      setItemOptions( data.options );
                  }, 0 );
                  
              },
        } );
      } 
    }, [ data ] );

    useEffect( () => {
        setItemTitle( data.title );
        setItemAdditionalText( data.additionalText );
        setItemOptions( data.options );
        setItemType( data.type );
        setSelectValue( data.type );
        setItemIcon( data.icon );

        delete data._added;

        addSortable();
        
    }, [ addSortable, data ] );

    return (
      <div className={blockName} id={data.id}>
        <div className={`${blockName}-details`}>
          <div className={`${blockName}-sortable`}>
            <Button icon="fa fa-bars" text="Drag Item" />
          </div>

          <div className={`${blockName}Details`}>
            <TextField 
              id={`s_${sectionNum}_q_${questionNum}_title`}
              label="Item Title"
              value={itemTitle} 
              onChange={handleItemTitleChange}
              focused={!!data._added}
            />
            <TextField 
              id={`s_${sectionNum}_q_${questionNum}_desc`}
              label="Item Description"
              value={itemAdditionalText} 
              onChange={handleItemAdditionalTextChange}
            />
          </div>

          <div className={`${blockName}-actions`}>
            <Button icon="fa fa-pencil" text="Edit Item" onClick={ () => setOpenEditModal( true ) }/>
            <Dropdown
              id={`dropdown_s_${sectionNum}_q_${questionNum}`} 
              actions={ getActions() } 
            />
          </div>
        </div>
        {
          data.category === QUESTION ? // Curently only questions can have options
            <div className={`${blockName}Options`} aria-labelledby={`s_${sectionNum}_q_${questionNum}_o_heading`}>
              <div className={`${blockName}Options-heading`} id={`s_${sectionNum}_q_${questionNum}_o_heading`}>Options</div>
              <ul className={`${blockName}Options-list`}>
              {
                itemOptions ?
                  itemOptions.map( ( option, index ) => (
                    <Option
                      key={index}
                      type={itemType}
                      sectionNum={sectionNum}
                      questionNum={questionNum}
                      optionNum={index+1}
                      isSortable={true}
                      icon={itemIcon}
                      data={option}
                      addOption={addOption}
                      deleteOption={deleteOption}
                      disableDelete={itemOptions.length <= 1}
                      focusOption={focusNextOption}
                      isFirst={index === 0}
                      isLast={index === itemOptions.length - 1}
                    />
                    ) )
                : <Option
                    type={itemType}
                    sectionNum={sectionNum}
                    questionNum={questionNum}
                    optionNum={1}
                    isSortable={false}
                    icon={itemIcon}
                  />
              }
              </ul>
            </div>
            : null
        }
        <div className={`${blockName}-add ${( isLast ? blockName + "-addLast": "" )}`}>
          <span className={`${blockName}-addIcon`}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </span>
          <div className={`${blockName}-addActions`}>
            { 
              sectionName === PAGE ? <Button text="Add Question" onClick={ () => addNewItem( "SELECT_LIST", questionNum ) } />: null
            }
            <Button text="Add Boilerplate" onClick={ () => addNewItem( "DISPLAY_TEXT", questionNum ) } />
            { 
              sectionName === PAGE && isLast ? <Button text="Add Page" onClick={ () => addNewItem( "PAGE", sectionNum - 1 ) }/>: null
            }
          </div>
        </div>
        {
          openTypesModal ?
            <Modal 
              headingText="Change Type"
              applyButtonText="Apply"
              darkBackground={true}
              onSave={ () => changeType() }
              onCancel={ () => setOpenTypesModal( false ) }
            >
              <div className="qe-Item-selectType-container">
                <label htmlFor="select-type" className="qe-Item-selectType-label">Item Type</label>
                <div className="qe-Item-selectType-select">
                  <select id="select-type" value={selectValue} onChange={handleChangeType}>
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="CHECKBOX">Checkbox</option>
                    <option value="SELECT_LIST">Select List</option>
                    <option value="SWITCH">Switch</option>
                    <option value="COMMENT">Comment Box</option>
                  </select>
                </div>
              </div>
            </Modal>
          : null
        }
        {
          openDeleteModal ?
            <Modal 
              headingText="Delete Item"
              applyButtonText="Delete"
              onSave={ () => removeItem() }
              onCancel={ () => setOpenDeleteModal( false ) }
            >
              <div><b>Are you sure you want to delete this item?</b></div>
            </Modal>
          : null
        }
        {
          openEditModal ? 
            <Modal 
              type="drawer"
              headingText="Edit Item"
              applyButtonText="Save"
              onSave={ () => setOpenEditModal( false ) }
              onCancel={ () => setOpenEditModal( false ) }
            >
              <div>Through this modal user will be able to update more item properties.</div><br/>
              <div><b>Questionnaire: </b>{questionnaireId}</div>
              <div><b>Section: </b>{sectionId}</div>
              <div><b>Item: </b>{data.id}</div>
          </Modal> 
          : null
        }
      </div>
    )
}