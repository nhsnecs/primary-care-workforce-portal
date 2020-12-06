$(document).ready(function () {

// SiteImprove - Form has no submit button
    $("#InsertButton").prop("type", "submit");

    $("#necs_name").val(userName);
    $("#necs_name").addClass("nhsuk-input--width-20");
    $("#necs_amount").attr("type", "number");
    $("#necs_amount").addClass("nhsuk-input--width-5");

// Move practice approval guidance above submit button
    var element = $("#approval-guidance").detach();
    $("#InsertButton").parent().prepend(element);

// Hide guidance if successfully submitted
    if ($(".alert-success").length > 0) {
        $(".guidance").hide();
    }

// Setup Validation
    var rules = {
        necs_amount: { number: true, max: 3000, min: 0 }
    };
    setupValidationForForm(rules);

});