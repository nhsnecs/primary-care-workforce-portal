$(document).ready(function () {
    
// SiteImprove - Form has no submit button
    $("#InsertButton").prop("type", "submit");

// Setup Validation
    var rules = {};
    setupValidationForForm(rules);

});