const item = {
    title: "",
    additionalText: "",
    category: "QUESTION"
};

const options = [
    {
        id: 9876,
        text: "Option 1"
    },
    {
        id: 9877,
        text: "Option 2"
    },
    {
        id: 9877,
        text: "Option 3"
    }
];

const templates = {
    MULTIPLE_CHOICE: {
        ...item,
        icon: "fa fa-circle-thin",
        options
    },
    CHECKBOX: {
        ...item,
        icon: "fa fa-square-o",
        options
    },
    SELECT_LIST: {
        ...item,
        icon: "",
        options
    },
    SWITCH: {
        ...item,
        icon: "fa fa-toggle-on"
    },
    COMMENT: {
        ...item,
        icon: "fa fa-commenting-o"
    },
    DISPLAY_TEXT: {
        ...item,
        category: "BOILERPLATE"
    },
    PAGE: {
        title: "",
        additionalText: "",
        items: []
    }
};

export function getItemTypeTemplate( type ) {
    let template = templates[ type ];

    template.type = type;
    
    return template;
};