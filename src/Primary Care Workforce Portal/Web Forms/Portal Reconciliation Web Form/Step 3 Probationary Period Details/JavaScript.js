$(document).ready(function() {

// Hide yes/no dropdown
    $("#necs_probationaryormutualassessmentperiod").closest("tr").hide();
    $("#confirmation-container").hide();

// Styling
    $("#necs_stayinpartnershiprole").parent().addClass("nhsuk-input--width-10");

// Reset values (when no selected)
    var clearAllFields = function () {
        $("#necs_workingcapacity").val(null);
        showHideOther();
    };

// Setup yes/no
    $("table[role='presentation']").parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no" required="required"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes" required="required"><label for="yes" class="radio-label">Yes</label></span>');
    $("table[role='presentation']").parent().prepend('<span class="nhsuk-hint">If you joined the New to Partnership Payment scheme during your probationary period do you need to update any of the details that we hold on record for you in relation to this, for example if your probationary period has been extended or has been completed and you are now a substantive partner?</span>');
    $("#yes").click(function () {
        $("table[role='presentation']").show();
        $("#necs_probationaryormutualassessmentperiod").val("348730000");
    });
    $("#no").click(function () {
        $("table[role='presentation']").hide();
        $("#necs_probationaryormutualassessmentperiod").val("348730001");
    });

// Existing yes/no value
    var selectedValue = $("#necs_probationaryormutualassessmentperiod option:selected").val();
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
    var maximumDate = minimumDate.add(5, "year");
    var rules = {
        changed: "required",
        necs_stayinpartnershiprole: null,
        necs_moredetailsstayinpartnershiprole: null,
        necs_dateofendofprobationorassessment_date_input: { required: true, minimumDate: minimumDate, maximumDate: maximumDate },
    };
    var messages = {
    };
    setTimeout(function () {
        setupValidationForForm(rules, messages);
    }, 500);


});