import Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validatorUser(data){
    let errors = {};

    if(Validator.isEmpty(data.fullname)){
        errors.fullname = 'Fullname is required!';
    }
    if(Validator.isEmpty(data.age.toString())){
        errors.age = 'Age is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}