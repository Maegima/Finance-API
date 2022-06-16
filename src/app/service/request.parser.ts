export class Parameters{
    private optional: Array<string>;
    private required: Array<string>;
    
    constructor({ optional, required }: { optional?: Array<string>, required?: Array<string> }){
        this.optional = optional ? optional : [];
        this.required = required ? required : [];
    }

    public parseBody(body: any) {
        var obj: any = {};
        var err: string[] = [];
        var keys = Object.keys(body);
        
        this.required.forEach((key) => {
            if(keys.includes(key))   
                obj[key] = body[key];
            else
                err.push(key);
        });
        
        this.optional.forEach((key) => {
            if(keys.includes(key))   
                obj[key] = body[key];
        });
    
        if(err.length > 0)
            return err;
        return obj;
    }
}