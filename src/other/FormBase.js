class FormField {
    fieldType;
    name;
    selectiontype;
    defaultValue;

    /**
     * 
     * @param {string} name Name of the field
     * @param {string} value default value
     * @param {string} fieldtype type  of the field. example: "text"
     * @param {string} selectiontype type of listable properties for selection. Default "".
     */
    constructor(name, value,  fieldtype, selectiontype) {
        this.name = name;
        this.fieldtype = fieldtype;
        this.selectiontype = selectiontype;
        this.value = value;
    }
    toFirebase() {
        return {
            name: this.name,
            fieldtype: this.fieldType,
            selectiontype: this.selectiontype,
            value: this.value
        }
    } 
}

/**name, formType, fields
 * 
 */
class FormTemplate {
    name; 
    formtype;
    fields;
    id;
    /**
     * 
     * @param {String} name 
     * @param {string} formtype 
     * @param {Array} fields 
     */
    constructor(name, formtype, fields, id) {
        this.fields = fields || [];
        this.name = name;
        this.formtype = formtype;
        this.id = id;
        this.addField = this.addField.bind(this);
        this.toFirebase = this.toFirebase.bind(this);
        this.addField("name", "No name", "text", "");
    } 

    addField(name, defaultValue, type, selectiontype) {
        if (selectiontype === undefined) selectiontype = "";
        let field = new FormField(name, defaultValue, type, selectiontype);
        this.fields.push(field);
    }
    toFirebase() {
        let fields = [];
        for (let field of this.fields) {
            fields.push({
                name: field.name || "no name",
                fieldtype: field.fieldType || "text",
                selectiontype: field.selectiontype || "",
                value: field.value || ""
    
            });
        }
        return {
            fields: fields,
            name: this.name,
            formtype: this.formtype,
            id: this.id
        }
    }
} 
export  {FormTemplate, FormField};

