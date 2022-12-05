let types = {
    setQuestionnairesList: "SET_LIST",
    editItem: "EDIT_ITEM",
    editQuestionnaire: "EDIT_QUESTIONNAIRE",
    deleteQuestionnaire: "DELETE_QUESTIONNAIRE"
};

let actions = {
    editItem: ( questionnaireId, sectionId, item ) => ( {
        type: types.editQeditItemuestionnaire,
        payload: {
            questionnaireId,
            sectionId,
            item
        }
    } ),
    editQuestionnaire: questionnare => ( {
        type: types.editQuestionnaire,
        payload: questionnare
    } ),
    deleteQuestionnaire: questionnaireId => ( {
        type: types.deleteQuestionnaire,
        payload: questionnaireId
    } ),
    setQuestionnairesList: list => ( {
        type: types.setQuestionnairesList,
        payload: list
    } )
};

export { types, actions };