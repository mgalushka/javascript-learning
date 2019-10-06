// This is type unsfae for now
// TODO: find out how to type javascript Proxy with flow

// Proxy
var handler = {
    get: function(obj: Object, prop: string) {
        return prop in obj ?
            obj[prop] :
            "missing";
    }
};

let p: Proxy<Object> = new Proxy({}, handler);
console.log(p.someMissingProperty)
console.log(p.someMissingProperty === "missing")
