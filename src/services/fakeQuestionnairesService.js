import { actions } from "./../context/actions";

const questionnaires = [ 
    {
        "id" : 198765432,
        "title": "My First questionnaire",
        "published": false,
        "pages" : [
            {
                "id" : 678909876,
                "title": "first page",
                "additionalText": "Description here",
                "items": [
                    {
                        "id" : 1234567890,
                        "title": "Page item",
                        "additionalText": "Description here",
                        "category": "QUESTION",
                        "type": "SWITCH",
                        "icon": "fa fa-toggle-on"
                    }
                ]
            }
        ],
        "epilogue" : {
            "id" : "epilogue",
            "items" : [
                {
                    "id" : 1234567891,
                    "title": "Epilogue item",
                    "additionalText": "Description here",
                    "category": "BOILERPLATE",
                    "type": "DISPLAY_TEXT"               
                }
            ]
        },
        "prologue" : {
            "id" : "prologue",
            "items": []
        }
    },
    {
        "id" : 198765433,
        "title": "My Second questionnaire",
        "published": true,
        "pages" : [
            {
                "id" : 678909875,
                "title": "first page",
                "additionalText": "Description here",                
                "items": [
                    {
                        "id" : 1234567892,
                        "title": "Page item",
                        "additionalText": "Description here",
                        "category": "QUESTION",
                        "type": "CHECKBOX",
                        "icon": "fa fa-square-o",
                        "options": [
                            {
                                "id": 9876,
                                "text": "Option 1"
                            }
                        ]
                    }
                ]
            }
        ],
        "epilogue" : {
            "id" : "epilogue",
            "items" : [
                {
                    "id" : 1234567893,
                    "title": "Epilogue item",
                    "additionalText": "Description here",
                    "category": "BOILERPLATE",
                    "type": "DISPLAY_TEXT",
                }
            ]
        },
        "prologue" : {
            "id" : "prologue",
            "items": [
                {
                    "id" : 1234567894,
                    "title": "Prologue item",
                    "additionalText": "Description here",
                    "category": "BOILERPLATE",
                    "type": "DISPLAY_TEXT",
                }
            ]
        }
    },
    {
        "id" : 198765434,
        "title": "My Third questionnaire",
        "published": false,
        "pages": [
            {
                "id" : 678909874,
                "title": "first page",
                "additionalText": "Description here",
                "items": [
                    {
                        "id" : 1234567895,
                        "title": "Page item 1",
                        "additionalText": "Description here",
                        "category": "QUESTION",
                        "type": "COMMENT",
                        "icon": "fa fa-commenting-o"
                    },
                    {
                        "id" : 1234567896,
                        "title": "Page item 2",
                        "additionalText": "Description here",
                        "category": "QUESTION",
                        "type": "SWITCH",
                        "icon": "fa fa-toggle-on"
                    },
                    {
                        "id" : 1234567897,
                        "title": "Page item 3",
                        "additionalText": "Description here",
                        "category": "QUESTION",
                        "type": "MULTIPLE_CHOICE",
                        "icon": "fa fa-circle-thin",
                        "options": [
                            {
                                "id": 987654321,
                                "text": "Option 1"
                            },
                            {
                                "id": 987654322,
                                "text": "Option 2"
                            }
                        ]
                    },
                    {
                        "id" : 1234567898,
                        "title": "Page item 4",
                        "additionalText": "Description here",
                        "category": "QUESTION",
                        "type": "SELECT_LIST",
                        "options": [
                            {
                                "id": 987654323,
                                "text": "Option 1"
                            },
                            {
                                "id": 987654324,
                                "text": "Option 2"
                            }
                        ]
                    },
                    {
                        "id" : 1234567899,
                        "title": "Page item 5",
                        "additionalText": "Description here",
                        "category": "QUESTION",
                        "type": "CHECKBOX",
                        "icon": "fa fa-square-o",
                        "options": [
                            {
                                "id": 987654325,
                                "text": "Option 1"
                            },
                            {
                                "id": 987654326,
                                "text": "Option 2"
                            }
                        ]
                    }
                ]
            }
        ],
        "epilogue" : {
            "id" : "epilogue",
            "items" : [
                {
                    "id" : 1234567810,
                    "title": "Epilogue item",
                    "additionalText": "Description here",
                    "category": "BOILERPLATE",
                    "type": "DISPLAY_TEXT"
                }
            ]
        },
        "prologue" : {
            "id" : "prologue",
            "items": [
                {
                    "id" : 1234567811,
                    "title": "Prologue item",
                    "additionalText": "Description here",
                    "category": "BOILERPLATE",
                    "type": "DISPLAY_TEXT"
                }
            ]
        }
    }   
];

export function getQuestionnairesData( dispatch ) {
    dispatch( actions.setQuestionnairesList( questionnaires ) );
};