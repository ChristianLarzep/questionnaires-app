import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, NavBar } from '../../components';
import Section from '../../components/Section/Section';
import { actions } from '../../context/actions';
import { Context } from '../../context/context';

import "./styles.scss";

export default function Editor() {
    
    const location = useLocation();

    const { questionnaire = {} } = location.state || {};

    const { dispatch } = useContext( Context );

    const [ title, setTitle ] = useState( '' );
    const [ pages, setPages ] = useState( [] );
    const [ prologue, setPrologue ] = useState( {} );
    const [ epilogue, setEpilogue ] = useState( {} );

    const navigate = useNavigate();

    const { id } = questionnaire;

    const saveChanges = function() {
        
        dispatch( actions.editQuestionnaire( {
            ...questionnaire,
            title,
            prologue,
            pages,
            epilogue
        } ) );

        navigate("/");
    };

    const copySection = function( section ) {
        return { 
            ...section,
            items: section.items.map( item => { 
                return {
                    ...item,
                    options: item.options ? item.options.map( opt => ( { ...opt } ) ) : null
                }; 
            } )
        }
    };

    const addPage = function( page, position ) {
        if ( position ) { 
            let allPages = [ ...pages ];
    
            allPages.splice( position, 0, page );

            setPages( allPages );
        } else { 
            setPages( pgs => pgs.concat( page ) );
        }
    };

    const deletePage = function( pageId ) {
        setPages( pgs => pgs.filter( p => p.id !== pageId ) );
    };

    useEffect( () => {
        const copyQuestionnaire = function() {
            setTitle( questionnaire.title );

            setPrologue( copySection( questionnaire.prologue ) );

            setPages( questionnaire.pages.map( page => copySection( page ) ) );
            
            setEpilogue( copySection( questionnaire.epilogue ) );
        };

        copyQuestionnaire();
    }, [ questionnaire ] );

    return (
      <>
        <NavBar>
          <div className='qe-NavBar'>
            <div className='qe-NavBar-title'>{title}</div>
            <Button style={{boxShadow: 'none', backgroundColor: '#03aa6d', color: 'white' }}  type="text" text="Save" onClick={ () => { saveChanges(); } }/>
          </div>
        </NavBar>
        <div className="qe-Sections">
          <Section
            questionnaireId={id}
            sectionName="Prolog" 
            sectionNum={1} 
            heading="Welcome Page" 
            allowBoilerplates={true}
            data={prologue}
          />

          {
            pages.map( ( page, index ) => (
              <Section 
                key={index}
                questionnaireId={id}
                sectionName="Page" 
                sectionNum={index + 2} 
                heading="Page"
                allowQuestions={true} 
                allowBoilerplates={true}
                hasDetails={true}
                addPage={addPage}
                deletePage={deletePage}
                disableDelete={pages.length <= 1}
                data={page}
              />
            ) )
          }

          <Section
            questionnaireId={id}
            sectionName="Epilog" 
            sectionNum={pages.length + 2} 
            heading="Thank You Page" 
            allowBoilerplates={true}
            data={epilogue}
          />
        </div>
      </>
    )
}
