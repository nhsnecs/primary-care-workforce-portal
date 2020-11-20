$(document).ready(function () {

    $("a.btn")
        .removeClass("btn-primary")
        .removeClass("btn-default")
        .removeClass("btn")
        .addClass("nhsuk-button");

    $(".clearlookupfield").hide();
    $(".launchentitylookup").hide();

// Setup dates
    var today = dayjs().format("DD/MM/YYYY HH:mm");
    var firstOfMonth = dayjs().startOf('month');
    var selectedDate = dayjs($("#necs_claimmonth").val()).format("YYYY-MM-DDT00:00:00.0000000");

// Claim Month
    var months = '';
    for (var month = -6; month < 24; month++) {
        var date = firstOfMonth.add(month, "month");
        var selected = (selectedDate == date.format("YYYY-MM-DDT00:00:00.0000000")) ? ' selected' : '';
        months += "<option " + selected + " value='" + date.format("YYYY-MM-DDT00:00:00.0000000") + "'>" + date.format("MMMM YYYY") + "</option>";
    }
    var monthsSelect = $("<div class='nhsuk-form-group nhsuk-input--width-10'><select class='nhsuk-select' id='select-month'>" + months + "</select></div>");
    $("#necs_claimmonth").parent().append(monthsSelect);
    $("#select-month").on("change", function () {
        var selectedDate = $("#select-month option:selected").val();
        $("#necs_claimmonth").val(selectedDate);
    });
    $("#select-month").closest("div.control").children("input[type='date']").hide();

// Weighted list size
    $("#necs_weightedlistsize").attr("type", "number");
    $("#necs_weightedlistsize").addClass("nhsuk-input--width-10");

// Declaration -> enable/disable submit
    var enableDisableSubmitButton = function () {
        var agreed = $("#necs_isdeclarationconfirmed_1").is(":checked");
        var confirmed = $("#confirm-yes").prop("checked");
        $(".form-custom-actions").find("input[type='button'], button").attr("disabled", !(agreed && confirmed));
    };

    $("#necs_isdeclarationconfirmed_0, #necs_isdeclarationconfirmed_1").click(function () {
        enableDisableSubmitButton();
    });

// Move declaration before buttons
    $("#confirmation-container").prependTo(".form-custom-actions");

// Disable buttons
    $(".form-custom-actions").find("input[type='button'], button").attr("disabled", true);

// Confirm declaration sets enabled
    $("#confirm-yes").change(function () {
        enableDisableSubmitButton();
    });

    enableDisableSubmitButton();


// Setup Validation
    var rules = { necs_notes: null };
    setupValidationForForm(rules);

});