$(document).ready(function () {

// Tooltip
    $("#necs_profession").attr("title", "Select your profession / organisational role");

// Styling
    $("#address1_line1, #address1_city, #address1_county")
        .addClass("nhsuk-input--width-20");

    $("#mobilephone, #address1_telephone1, #address1_postalcode")
        .addClass("nhsuk-input--width-10");

    $("#necs_practiceodscode, #necs_pcnodscode, #necs_ccgodscode").closest("table").find("div.info").detach();
    $("#necs_practiceodscode, #necs_pcnodscode, #necs_ccgodscode").parent().addClass("nhsuk-input--width-20");

// Profession selection -> show/hide ODS lookups
    var showHideODS = function () {
        var pcn = $("#necs_profession option:selected").text() == "PCN";
        var ccg = $("#necs_profession option:selected").text() == "CCG";
        if (pcn) {
            $("#necs_practiceodscode").closest("fieldset").show();
            $("#necs_practiceodscode").closest("fieldset").find("legend").text("Primary practice (Payee)");
            $("#necs_pcnodscode").closest("fieldset").show();
            $("#necs_ccgodscode").closest("fieldset").show();
        } else if (ccg) {
            $("#necs_practiceodscode").closest("fieldset").hide();
            $("#necs_pcnodscode").closest("fieldset").hide();
            $("#necs_ccgodscode").closest("fieldset").show();
        } else {
            $("#necs_practiceodscode").closest("fieldset").show();
            $("#necs_practiceodscode").closest("fieldset").find("legend").text("Practice");
            $("#necs_pcnodscode").closest("fieldset").hide();
            $("#necs_ccgodscode").closest("fieldset").hide();
        }
    };
    $("#necs_profession").change(function () {
        showHideODS();
    });
    showHideODS();

    $("#necs_practiceodscode").prop("readonly", null);
    $("#necs_pcnodscode").prop("readonly", null);
    $("#necs_ccgodscode").prop("readonly", null);
    $(".launchentitylookup").parent().css("vertical-align", "bottom");

});


// Setup Validation
    var rules = {
        firstname: "required",
        lastname: "required",
        necs_practiceodscode: "required",
        necs_pcnodscode: "required",
        necs_ccgodscode: "required",
        address1_telephone1: null,
        mobilephone: null
    };
    setupValidationForForm(rules);