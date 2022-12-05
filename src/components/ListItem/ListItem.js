import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Dropdown from '../Dropdown';
import { actions } from '../../context/actions';

import './styles.scss';

export default function ListItem( { item, dispatch } ) {
    const blockName = "list-item";

    const EDITOR_ROUTE = "/editor";

    const navigate = useNavigate();

    const [ isPublished, setIsPublished ] = useState( item.published );

    const getQuestionsCount = function( questionnaire ) {
        let count = questionnaire.prologue.items.length;

        for ( let i = 0; i < questionnaire.pages.length; i++ ) {
            count += questionnaire.pages[ i ].items.length;
        } 
  
        count += questionnaire.epilogue.items.length;
  
        return count;
    };

    return (
      <li className={`${blockName}`}>
        <div className={`${blockName}Body`}>
          <div className={`${blockName}Badge`}>
            <span className={`${blockName}Badge--` + ( isPublished ? 'published' : 'draft' ) }>{ isPublished ? "Published" : "Draft" }</span>
          </div>
          <div className={`${blockName}Details`}>
            <div className={`${blockName}Content`}>
              <div className={`${blockName}-primaryText`}> 
                <Link to={EDITOR_ROUTE} state={ { questionnaire: item } } >
                  <b>{ item.title }</b>
                </Link>
              </div>
              <div className={`${blockName}-secondaryText`}>Updated 8 hours ago by Christian lara</div>
            </div>
            <div className={`${blockName}-meta`}>
              <b>{ getQuestionsCount( item ) }</b>questions
            </div>
          </div>
        </div>
        <Dropdown 
          id={`dropdown-${item.id}`} 
          hover={true}
          actions={ [
            {
              name: "Edit", 
              icon: "fa fa-pencil",
              closeOnClick: true,
              action: () => {
                  navigate( EDITOR_ROUTE, { state: { questionnaire: item } } );
              }
            },
            { 
              name: ( isPublished ? "Unpublish" : "Publish" ), 
              icon: "fa " + ( isPublished ?  "fa-times" : "fa-check-square" ),
              action: () => {

                  item.published = !isPublished;

                  dispatch( actions.editQuestionnaire( item ) );

                  setIsPublished( item.published );
              }
            },
            {
              name: "Delete", 
              icon: "fa fa-trash",
              closeOnClick: true,
              action: () => {
                 dispatch( actions.deleteQuestionnaire( item.id ) );
              }
            }    
          ] } 
        />
      </li>
    )
}
