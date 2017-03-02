import Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validatorUser(data){
    let errors = {};

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email is required!';
    }
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid!';
    }
    if(Validator.isEmpty(data.username)){
        errors.username = 'Username is required!';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}