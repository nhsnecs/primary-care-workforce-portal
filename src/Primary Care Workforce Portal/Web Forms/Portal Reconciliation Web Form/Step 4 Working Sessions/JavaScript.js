$(document).ready(function() {

$("#necs_agreedsessionschanged").closest("tr").hide();

// Styling
    $("#necs_howagreedsessionschanged").parent().addClass("nhsuk-input--width-10");
    $("#necs_agreedsessionperweek").attr("type", "number").addClass("nhsuk-input--width-5");
    $("#necs_minimum2sessionsperweek").parent().addClass("nhsuk-input--width-10");

// Hide table
    $("table[role='presentation']").each(function(index) {

        $(this).parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
        $(this).parent().prepend('<span class="nhsuk-hint">Have there been any changes to your agreed number of working sessions that we hold on record for you?</span>');

        $("#yes").click(function () {
            $("#necs_agreedsessionschanged").val("348730000");
            $("table[role='presentation']").show();
        });
        $("#no").click(function () {
            $("#necs_agreedsessionschanged").val("348730001");
            $("table[role='presentation']").hide();
            $("#necs_agreedsessionperweek").val(null);
            $("#necs_howagreedsessionschanged").val(null);
            $("#necs_agreedsessionschangedate_date_input").val(null);
            $("#necs_minimum2sessionsperweek").val(null);
        });

    });

// Handle yes/no
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
            $(this).hide();
    }

});

// Validation
var rules = {
    necs_agreedsessionperweek: "required",
    necs_howagreedsessionschanged: "required",
    necs_agreedsessionschangedate_date_input: "required",
    necs_minimum2sessionsperweek: "required"
};
var messages = {
};
setupValidationForForm(rules, messages);