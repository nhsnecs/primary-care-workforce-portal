$(document).ready(function () {

// SiteImprove - Form has no submit button
    $("#InsertButton").prop("type", "submit");

// Setup dates
    var today = dayjs().format("DD/MM/YYYY HH:mm");
    var firstOfMonth = dayjs().startOf('month');
    var firstOfPreviousMonth = dayjs().add(-1, "month").startOf('month').format("YYYY-MM-DDT00:00:00.0000000");

// Claim Month
    var months = '';
    for (var month = -6; month < 24; month++) {
        var date = firstOfMonth.add(month, "month");
        var selected = (firstOfPreviousMonth == date.format("YYYY-MM-DDT00:00:00.0000000")) ? ' selected' : '';
        months += "<option " + selected + " value='" + date.format("YYYY-MM-DDT00:00:00.0000000") + "'>" + date.format("MMMM YYYY") + "</option>";
    }
    var monthsSelect = $("<div class='nhsuk-form-group nhsuk-input--width-10'><select class='nhsuk-select' id='select-month'>" + months + "</select></div>");
    $("#necs_claimmonth").parent().append(monthsSelect);
    $("#select-month").on("change", function () {
        var selectedDate = $("#select-month option:selected").val();
        $("#necs_claimmonth").val(selectedDate);
    });
    $("#select-month").closest("div.control").children("input[type='date']").hide();
    setTimeout(function () {
        $("#necs_claimmonth").val(firstOfPreviousMonth);
    }, 500);

// Weighted list size
    $("#necs_weightedlistsize").attr("type", "number");
    $("#necs_weightedlistsize").addClass("nhsuk-input--width-10");

// Submitted By
    $("#necs_submittedbyid_name").val(userName);
    $("#necs_submittedbyid_name").attr("disabled", true);
    $("#necs_submittedbyid").val(userId);
    $("#necs_submittedbyid_entityname").val("contact");
    $(".launchentitylookup").hide();
    $("div.text-muted").hide();

// Declaration -> enable/disable submit
    var submitButton = $("#InsertButton");
    var enableDisableSubmitButton = function () {
        var agreed = $("#necs_isdeclarationconfirmed_1").is(":checked");
        var confirmed = $("#confirm-yes").prop("checked");
        submitButton.attr("disabled", !(agreed && confirmed));
    };
    $("#necs_isdeclarationconfirmed_0, #necs_isdeclarationconfirmed_1").click(function () {
        enableDisableSubmitButton();
    });

// Move declaration before insert button
    $("#confirmation-container").prependTo("div.actions");

// Disable approve button
    $(".form-custom-actions").find("button").first().attr("disabled", true);

// Confirm declaration sets enabled
    $("#confirm-yes").change(function () {
        enableDisableSubmitButton();
    });

    enableDisableSubmitButton();

// Setup Validation
    var rules = { necs_notes: null };
    setupValidationForForm(rules);

});