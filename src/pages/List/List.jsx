import { useContext, useEffect } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { Context } from './../../context/context';
import { getQuestionnairesData } from './../../services/fakeQuestionnairesService';

import './styles.scss';

export default function List() {

    const blockName = "list";

    const { questionnaires, dispatch } = useContext( Context );

    useEffect( () => {
        if ( questionnaires.length === 0 ) {
            getQuestionnairesData( dispatch );
        }
    }, [ questionnaires ,dispatch ] );

    return (
        <>
          <div className={`${blockName}-panel`}>
            <div className={`${blockName}-panelBody`}>
              <span className={`${blockName}-panelBody-count`}>
                <b>{ questionnaires.length }</b>
              </span>Questionnaires
            </div>
          </div>
          <div className={`${blockName}-itemsContainer`}>
            <ul className={`${blockName}-items`}>
              {
                questionnaires.map( ( item, index ) => (
                  <ListItem key={index} item={ item } dispatch={dispatch}/>
                ) )
              }
            </ul>
          </div>
        </>
    )
};