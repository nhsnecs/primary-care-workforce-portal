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
    $("table[role='presentation']").parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no" required="required"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes" required="required"><label for="yes" class="radio-label">Yes</label></span>');
    $("table[role='presentation']").parent().prepend('<span class="nhsuk-hint">Have you had any prolonged periods of absence? (excluding; Annual leave Maternity/ Paternity/Adoption leave and long term sickness) </span>');
    $("#yes").click(function () {
        $("table[role='presentation']").show();
        $("#necs_prolongerperiodsofabsence").val("348730000");
        $("#necs_submitteddate_date_input").closest("tr").hide();
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
        var nowFull = dayjs().format("YYYY-MM-DDTHH:mm:ss.0000000");
        var nowFormatted = dayjs().format("YYYY-MM-DD");
        $("#necs_submitteddate").val(nowFull);
        $("#necs_submitteddate_date_input").val(nowFormatted);
        enableDisableSubmitButton();
    });
    enableDisableSubmitButton();

// Validation
    var minimumDate = dayjs(new Date(2020, 0, 1));
    var maximumDate = minimumDate.add(1, "year");
    var getFromDateMaximum = function () {
        var toDate = $("#necs_absentto").val() || maximumDate;
        return dayjs(toDate);
    };
    var getToDateMinimum = function () {
        var fromDate = $("#necs_absentfrom").val() || minimumDate;
        return dayjs(fromDate);
    };
    var rules = {
        necs_absentfrom_date_input: { required: true, minimumDate: minimumDate, maximumDate: getFromDateMaximum },
        necs_absentto_date_input: { required: true, minimumDate: getToDateMinimum, maximumDate: maximumDate },
    };
    var messages = {
        necs_absentfrom_date_input: { maximumDate: "From date must be before To date" },
        necs_absentto_date_input: { minimumDate: "To date must be before From date" }
    };
    setTimeout(function () {
        setupValidationForForm(rules, messages);
    }, 500);

});
