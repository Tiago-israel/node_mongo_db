import { isNullOrUndefined } from "util";

export default class EmpityValidator {
    constructor(data){
        if(isNullOrUndefined(data)){
            throw new Error("O dado informado está nulo.");
        }
    }
}