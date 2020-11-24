$(document).ready(function () {

// SiteImprove - Form has no submit button
    $("#ContentContainer_MainContent_MainContent_ContentBottom_SubmitButton").prop("type", "submit");
    $("iframe[data-lookup-element='necs_practiceid']").attr("title", "Practice details");
    $("iframe[data-lookup-element='necs_ccgid']").attr("title", "CCG details");

// Styling
    $("#address1_line1, #address1_city, #address1_county")
        .addClass("nhsuk-input--width-20");

    $("#mobilephone, #address1_telephone1, #address1_postalcode")
        .addClass("nhsuk-input--width-10");

// Widen the right hand column (change password / email not implemented currently)
    $(".col-md-8")
        .removeClass("col-md-8")
        .addClass("col-md-12");

// Hide the alert
    $("div.alert").hide();

});

