$(document).ready(function() {

// Hide yes/no dropdown
    $("#necs_agreedsessionschanged").closest("tr").hide();

// Styling
    $("#necs_howagreedsessionschanged").parent().addClass("nhsuk-input--width-10");
    $("#necs_agreedsessionperweek").attr("type", "number").addClass("nhsuk-input--width-5");
    $("#necs_minimum2sessionsperweek").parent().addClass("nhsuk-input--width-10");

// Reset values (when no selected)
    var clearAllFields = function () {
        $("#necs_howagreedsessionschanged").val(null);
        $("#necs_agreedsessionperweek").val(null);
        $("#necs_minimum2sessionsperweek").val(null);
        $("#necs_agreedsessionschangedate_date_input").val(null);
    };

// Setup Yes/No
    $("table[role='presentation']").parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $("table[role='presentation']").parent().prepend('<span class="nhsuk-hint">Have there been any changes to your agreed number of working sessions that we hold on record for you?</span>');
    $("#yes").click(function () {
        $("#necs_agreedsessionschanged").val("348730000");
        $("table[role='presentation']").show();
    });
    $("#no").click(function () {
        $("#necs_agreedsessionschanged").val("348730001");
        $("table[role='presentation']").hide();
        clearAllFields();
    });

// Existing Yes/No
    var selectedValue = $("#necs_agreedsessionschanged").val();
    switch (selectedValue) {
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

// Validation
    var minimumDate = dayjs(new Date(2020, 0, 1));
    var maximumDate = minimumDate.add(1, "year");
    var rules = {
        necs_agreedsessionperweek: "required",
        necs_howagreedsessionschanged: "required",
        necs_agreedsessionschangedate_date_input: "required",
        necs_minimum2sessionsperweek: "required"
    };
    var messages = {
    };
    setTimeout(function () {
        setupValidationForForm(rules, messages);
    }, 500);

});
