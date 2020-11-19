$(document).ready(function () {

// SiteImprove - Form has no submit button
    $("#InsertButton").prop("type", "submit");

    $("#necs_name").val(userName);
    $("#necs_name").addClass("nhsuk-input--width-20");
    $("#necs_amount").attr("type", "number");
    $("#necs_amount").addClass("nhsuk-input--width-5");
 
// Setup Validation
    var rules = {};
    setupValidationForForm(rules);

});