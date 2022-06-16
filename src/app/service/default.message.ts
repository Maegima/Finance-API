export class DefaultMessage{
    static missingParameters(parameters: string[]){
        return `Missing parameter(s): [${parameters.join(", ")}].`
    }
}