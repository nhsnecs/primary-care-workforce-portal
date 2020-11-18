$(document).ready(function () {

// SiteImprove - Form has no submit button
    $("#ContentContainer_MainContent_MainContent_ContentBottom_SubmitButton").prop("type", "submit");
    $("iframe[data-lookup-element='necs_practiceid']").attr("title", "Practice details");
    $("iframe[data-lookup-element='necs_ccgid']").attr("title", "CCG details");

// Widen the right hand column (change password / email not implemented currently)
    $(".col-md-8")
        .removeClass("col-md-8")
        .addClass("col-md-12");

// Hide the alert
    $("div.alert").hide();

});

