class FormField {
    fieldType;
    name;
    selectiontype;
    defaultValue;
    constructor(name, defaultValue,  fieldType, selectiontype) {
        this.name = name;
        this.fieldType = fieldType;
        this.selectiontype = selectiontype;
        this.defaultValue = defaultValue;
    }
}

class FormTemplate {
    name; 
    formType;
    fields;
    constructor(name, formType, fields) {
        this.fields = fields;
        this.name = name;
        this.formType = formType;
    } 

    addField(name, defaultValue, type, selectiontype) {
        if (selectiontype === undefined) selectiontype = "";
        let field = new FormField(name, defaultValue, type, selectiontype);
        this.fields.push(field);
    }
}
export  {FormTemplate, FormField};

