$(document).ready(function() {

// Hide yes/no dropdown
    $("#necs_prolongerperiodsofabsence").closest("tr").hide();

// Reset values (when no selected)
    var clearAllFields = function () {
        $("#necs_absentfrom").val(null);
        $("#necs_absentfrom_date_input").val(null);
        $("#necs_absentto").val(null);
        $("#necs_absentto_date_input").val(null);
        $("#necs_absentreason").val(null);
    };

// Setup Yes/No
    $("table[role='presentation']").parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $("table[role='presentation']").parent().prepend('<span class="nhsuk-hint">Are you planning to or have taken a prolonged period of absence from work, for example a sabbatical? This does not include annual leave, maternity / paternity / adoption / parental leave and/or long-term sickness.</span>');
    $("#yes").click(function () {
        $("table[role='presentation']").show();
        $("#necs_prolongerperiodsofabsence").val("348730000");
    });
    $("#no").click(function () {
        $("#necs_prolongerperiodsofabsence").val("348730001");
        $("table[role='presentation']").hide();
        clearAllFields();
    });
    
// Existing Yes/No
    var absence = $("#necs_prolongerperiodsofabsence").val();
    switch (absence) {
        case "348730000": // Yes
            $("#yes").attr("checked", "checked");
            $("table[role='presentation']").show();
            break;
        case "348730001": // No
            $("#no").attr("checked", "checked");
            $("table[role='presentation']").hide();
            break;
        default: // Not set yet
            $("table[role='presentation']").hide();
    }

// Declaration -> enable/disable submit
    var enableDisableSubmitButton = function () {
        var confirmed = $("#confirm-yes").prop("checked");
        $("#NextButton").attr("disabled", !confirmed);
    };

// Move declaration before buttons
    var confirmationContainer = $("#confirmation-container");
    $(".actions").prepend(confirmationContainer);

// Confirm declaration sets enabled
    $("#confirm-yes").change(function () {
        enableDisableSubmitButton();
    });
    enableDisableSubmitButton();

// Validation
    var minimumDate = dayjs(new Date(2020, 0, 1));
    var maximumDate = minimumDate.add(1, "year");
    var rules = {
        necs_absentfrom_date_input: { required: true, minimumDate: minimumDate, maximumDate: maximumDate },
        necs_absentto_date_input: { required: true, minimumDate: minimumDate, maximumDate: maximumDate },
    };
    var messages = {
    };
    setTimeout(function () {
        setupValidationForForm(rules, messages);
    }, 500);

});
