class FormField {
    fieldType;
    name;
    selectiontype;
    defaultValue;
    constructor(name, value,  fieldtype, selectiontype) {
        this.name = name;
        this.fieldtype = fieldtype;
        this.selectiontype = selectiontype;
        this.value = value;
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

        this.addField = this.addField.bind(this);
        this.addField("name", "No name", "text", "");
    } 

    addField(name, defaultValue, type, selectiontype) {
        if (selectiontype === undefined) selectiontype = "";
        let field = new FormField(name, defaultValue, type, selectiontype);
        this.fields.push(field);
    }
}
export  {FormTemplate, FormField};

