$(document).ready(function () {

// SiteImprove - Form has no submit button
    $("#InsertButton").prop("type", "submit");

// Styling / Input types
    $("#necs_fulltimeequivalent, #necs_clinicalsessionsweekaverage, #necs_sessionincreasednumber")
        .prop("type", "number")
        .addClass("nhsuk-input--width-3");

    $("#necs_otherprofession")
        .parent()
        .addClass("nhsuk-input--width-20");

    $("#necs_gmcnumber, #necs_nmcpi, #necs_registrationnumber")
        .addClass("nhsuk-input--width-10");

// Hide before GP / Nurse selected
    $("div[data-name='tab_application']").hide();
    $(".cell.file-cell").hide();
    $("#InsertButton").hide();

// Application for GP / Nurse
    $("#gp, #nurse, #other").click(function () {
        var selected = $(this).val();
        var fieldsetIndex = 1;
        var applicationFromId;
        switch (selected) {
            case "gp":
                $($("fieldset")[1]).show();
                $($("fieldset")[2]).hide();
                $($("fieldset")[3]).hide();
                applicationFromId = 348730000;
                break;
            case "nurse":
                $($("fieldset")[1]).hide();
                $($("fieldset")[2]).show();
                $($("fieldset")[3]).hide();
                applicationFromId = 348730001;
                break;
            case "other":
                $($("fieldset")[1]).hide();
                $($("fieldset")[2]).hide();
                $($("fieldset")[3]).show();
                applicationFromId = 348730002;
                break;
        }
        $("#necs_applicationfrom").val(applicationFromId);
        $("div[data-name='tab_application']").show();
        $(".cell.file-cell").show();
        $("#InsertButton").show();
        $("#confirmation-container").show();
    });

// Reload selection (if set)
    var selectedOption = $("#necs_applicationfrom").val();
    switch (selectedOption) {
        case 348730000: $("#gp").click(); break;
        case 348730001: $("#nurse").click(); break;
        case 348730002: $("#other").click(); break;
    }
    $("#necs_applicationfrom").closest("fieldset").hide();

// If saved & displaying success panel, hide selection radio buttons
    setTimeout(function () {
        if ($("#MessagePanel").length > 0) {
            $("#application-from").hide();
        }
    }, 500);

// Session increased No / Yes
    $("#necs_sessionincreasednumber_label").parent().parent().hide();
    $("#necs_sessionincreasedsincepartnership_0").click(function () {
        $("#necs_sessionincreasednumber_label").parent().parent().hide();
        $("#necs_sessionincreasednumber").attr("required", false);
        $("#necs_sessionincreasednumber").val(null);
    });
    $("#necs_sessionincreasedsincepartnership_1").click(function () {
        $("#necs_sessionincreasednumber_label").parent().parent().show();
        $("#necs_sessionincreasednumber").attr("required", "required");
    });

// Move FTE guidance
    var element = $('#fte-guidance').detach();
    $('#necs_fulltimeequivalent').parent().append(element);
    $('#fte-guidance').show();

// Move Sessions guidance
    var sessions = $("#sessions-guidance").detach();
    $('#necs_clinicalsessionsweekaverage').closest(".control").prepend(sessions);
    $('#sessions-guidance').show();

// Declaration -> enable/disable submit
    var enableDisableSubmitButton = function () {
        var confirmed = $("#confirm-yes").prop("checked");
        $("#InsertButton").attr("disabled", !confirmed);
    };

// Move declaration before buttons
    var confirmationContainer = $("#confirmation-container");
    $(".form-custom-actions").prepend(confirmationContainer);
    $("#confirmation-container").hide();

// Confirm declaration sets enabled
    $("#confirm-yes").change(function () {
        enableDisableSubmitButton();
    });
    enableDisableSubmitButton();

});

var setFteValue = function (value) {
    var fte = (value * 4.1666666666666667) / 37.5;
    $("#necs_clinicalsessionsweekaverage").val(value);
    $('#necs_fulltimeequivalent').val(fte.toFixed(2));
};

// Setup Validation
var rules = {
    AttachFile: "required",
    necs_fulltimeequivalent: { required: true, number: true, max: 1.0, min: 0.0 },
    necs_clinicalsessionsweekaverage: { required: true, digits: true, max: 9 },
    necs_applicant_address_telephone: null,
    necs_applicant_address_mobilephone: null
};
setupValidationForForm(rules);
