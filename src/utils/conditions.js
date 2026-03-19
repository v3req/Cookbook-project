export function allFieldsCheck (data){
    for (let key in data){
        const value = data[key];
    
        if(!value){
            
            
            return false
        };
        
    }
    return true
}

export function passAndRepass (data){
    if(data.password !== data.rePass){
        
        return false;
    }
    return true;
}