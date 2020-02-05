import is from "is_js";

export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    };
};

export function validate(value, validation) {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if(validation.email){
        isValid = is.email(value) && isValid;

    }

    if(validation.minLength){
        isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
};

export function validateForm(formControl) {
    let isFormValid = true;

    Object.keys(formControl).forEach((name) => {
        isFormValid = formControl[name].valid && isFormValid
    });

    return isFormValid;
};