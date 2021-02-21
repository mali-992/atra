// export  function setUserName(name){
//     return{type:"SET_USER_NAME",payload:name}
// }
// export  function setCompanyName(name){
//     return{type:"SET_COMPANY_NAME",payload:name}
// }
function convertActionNameToType(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}
export  const actions = new Proxy(
    {},
    {
        get: function (target, prop) {
 
            return function (args) {
                if (target[prop] === undefined) {
                    target[prop] =  convertActionNameToType(prop);
                    return {
                        type:  target[prop],
                        payload: args
                    }
                }
                else return {type:target[prop],payload:args};
            }

        }
    }
)


