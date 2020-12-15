$(document).ready(function () {

// If submitted successfully show the feedback forms
    if ($("#MessagePanel.alert-success").length > 0) {
        $("#application-from").prev("p").hide();
        $("#MessagePanel.alert-success").find("span").html("Submission completed successfully. <strong>Please note:</strong> your practice manager will need to log in to the portal to approve your application.");
        $("#MessagePanel.alert-success").parent().append("<legend class='nhsuk-fieldset__legend nhsuk-fieldset__legend--l'>Feedback Form</legend><p>The scheme is under continuous review and we ask that you take a few moments to complete this feedback survey to aid us in understanding your journey and highlight any improvements that we could make to the scheme. This survey is anonymous and we encourage you to be as honest as possible. <a target='_blank' href='https://forms.office.com/Pages/ResponsePage.aspx?id=foPOgqPoxUK56uHkcpW6JmEE8VFhZWNCpED21G7loGdUMDhWQTJDUlpISEMwMkRNRUlSME5EVEpDVC4u'>Please click here to complete</a></p><legend class='nhsuk-fieldset__legend nhsuk-fieldset__legend--l'>Equality and Diversity Form</legend><p>We hold the principles of equality and inclusion at the heart of everything that we do and all that we stand for. This collection is not a mandatory part of the application process, but please provide as much information as you are comfortable with about yourself and your equality and diversity data.</p><p>Equality data will help the NHS to monitor new partners taking up the scheme against the characteristics given protection under the Equality Act 2010; this will be essential in responding to the Public Sector Equality Duty (PSED) part of the Equality Act 2010, ensuring that we are able to provide fair and inclusive work environments to all people, as well as striving towards a workforce and leadership that is representative of the communities that are served, within all occupations and grades.</p><p>The Equality and Diversity information that you provide will not be linked to your application form. This data is stored securely in compliance with the General Data Protection Regulation (GPDR) 2016. <a target='_blank' href='https://forms.office.com/Pages/ResponsePage.aspx?id=foPOgqPoxUK56uHkcpW6JmEE8VFhZWNCpED21G7loGdUMjY4MElFRkE2TDFUREpOVUlYM0szQUkzTy4u'>Please click here to complete</a></p>");
    }

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
