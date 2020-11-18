console.log("Script loaded");

function OnLoad(executionContext) {
   var formContext = executionContext.getFormContext();
   console.log("OnLoad", executionContext, formContext);
}
 
function OnChange(executionContext) {
   var formContext = executionContext.getFormContext();
   console.log("OnChange", executionContext, formContext);
}
