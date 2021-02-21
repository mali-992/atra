function convertActionTypeToName(actionType) {//SET_COMPANY_NAME
    return actionType.toLowerCase().replace(/_(\w)/g, v => v[1].toUpperCase());//setCompanyName
}

export function createReducer(state,action,hendlers){
const key=convertActionTypeToName(action.type);
const handler=hendlers[key];
if(handler){
    handler(state,action);
}
}