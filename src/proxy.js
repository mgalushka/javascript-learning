// This is type unsfae for now
// TODO: find out how to type javascript Proxy with flow

type ProxyWrapper = {
  get: (Object, string) => string,
}

type EmptyObject = {

}

// Proxy
var handler: Proxy<Object> = {
    get: (obj: Object, prop: string): string => {
        return prop in obj ?
            obj[prop] :
            "missing";
    }
};

const inputObject: Object = {};
let p: Proxy<Object> = new Proxy(inputObject, handler);
console.log((p.someMissingProperty: string))
console.log(p.someMissingProperty === "missing")
