import { actions, types } from "./actions";

const Reducer = ( state, action ) => {
    switch( action.type ) {
        case types.editItem:
            const { questionnaireId, sectionId, item } = actions.payload;
            
            return state.map( q => {
                // Get questionnaire to edit
                if ( q.id === questionnaireId ) {
                    let questionnaire = { ...q };

                    if ( [ "epilogue", "prologue" ].includes( sectionId ) ) {
                        questionnaire[ sectionId ].items = questionnaire[ sectionId ].items.map( i => i.id === item.id ? item : i );
                    } else {
                        questionnaire.pages = questionnaire.pages.map( p => { 
                            // Get page to edit
                            if ( p.id === sectionId ) {
                                let page = { ...p };
            
                                // Replace item
                                page.items = page.items.map( i => i.id === item.id ? item : i );
            
                                return page;
                            } else {
                                return p;
                            } 
                        } );
                    }

                    return questionnaire;
                } else {
                    return q;
                }
            } );
            
        case types.editQuestionnaire: 
            return state.map( q => q.id === action.payload.id ? action.payload : q );
        case types.deleteQuestionnaire: 
            return state.filter( q => q.id !== action.payload );
        case types.setQuestionnairesList:
            return action.payload
        default: 
            return [ ...state ]
    }
};

export default Reducer;