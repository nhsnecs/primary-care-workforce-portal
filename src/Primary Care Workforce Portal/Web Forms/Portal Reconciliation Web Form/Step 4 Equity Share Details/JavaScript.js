$(document).ready(function() {

// Hide yes/no dropdown
    $("#necs_continuedequitysharepartner").closest("tr").hide();

// Styling
    $("#necs_workingcapacity").parent().addClass("nhsuk-input--width-20");

// Show hide for Other
    var showHideOther = function () {
        if ($("#necs_workingcapacity").val() == "348730003") {
            $("#necs_workingcapacityother").closest("tr").show();
        } else {
            $("#necs_workingcapacityother").closest("tr").hide();
        }
    };
    $("#necs_workingcapacity").change(function () {
        showHideOther();
    });
    showHideOther();

// Reset values (when no selected)
    var clearAllFields = function () {
        $("#necs_workingcapacity").val(null);
        $("#necs_workingcapacityother").val(null);
        $("#necs_dateofequitysharechange").val(null);
        $("#necs_dateofequitysharechange_date_input").val(null);
        showHideOther();
    };

// Hide table
    $("table[role='presentation']").parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $("table[role='presentation']").parent().prepend('<span class="nhsuk-hint">Have you have continued to work as a partner but no longer hold an equity share?</span>');

// Yes/No handlers
    $("#yes").click(function () {
        $("table[role='presentation']").show();
        $("#necs_continuedequitysharepartner").val("348730000");
    });
    $("#no").click(function () {
        $("table[role='presentation']").hide();
        $("#necs_continuedequitysharepartner").val("348730001");
        clearAllFields();
    });

// Existing yes/no value
    var selectedValue = $("#necs_continuedequitysharepartner").val();
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