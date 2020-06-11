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

/**name, formType, fields
 * 
 */
class FormTemplate {
    name; 
    formType;
    fields;
    
    /**
     * 
     * @param {String} name 
     * @param {string} formType 
     * @param {Array} fields 
     */
    constructor(name, formType, fields) {
        this.fields = fields || [];
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

