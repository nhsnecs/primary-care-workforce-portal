$(document).ready(function() {

// Hide yes/no dropdown
    $("#necs_changestopracticecontract").closest("tr").hide();

// Styling
    $("#necs_contracttypechanged, #necs_newcontracttype").parent().addClass("nhsuk-input--width-10");

// Reset values (when no selected)
    var clearAllFields = function () {
        //$("#necs_contracttypechanged").val(null);
        $("#necs_newcontracttype").val(null);
        $("#necs_newcontractenddate_date_input").val(null);
        $("#necs_contractchangedate_date_input").val(null);
        $("#necs_extensionenddate_date_input").val(null);
        $("#necs_extensionchangedate_date_input").val(null);
        $("#necs_newcontractenddate").val(null);
        $("#necs_contractchangedate").val(null);
        $("#necs_extensionenddate").val(null);
        $("#necs_extensionchangedate").val(null);
    };

// Contract changed events
    var showContractChangedElements = function () {
        if ($("#necs_contracttypechanged").val() == 348730000) {
            $("#necs_newcontracttype").closest("tr").show();
            $("#necs_newcontractenddate_date_input").closest("tr").show();
            $("#necs_contractchangedate_date_input").closest("tr").show();
            $("#necs_extensionenddate_date_input").closest("tr").show();
            $("#necs_extensionchangedate_date_input").closest("tr").show();
        } else {
            $("#necs_newcontracttype").closest("tr").hide();
            $("#necs_newcontractenddate_date_input").closest("tr").hide();
            $("#necs_contractchangedate_date_input").closest("tr").hide();
            $("#necs_extensionenddate_date_input").closest("tr").hide();
            $("#necs_extensionchangedate_date_input").closest("tr").hide();
        }
    }
    $("#necs_contracttypechanged").change(function () {
        showContractChangedElements();
    });

// Add yes/no
    $("table[role='presentation']").parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $("table[role='presentation']").parent().prepend('<span class="nhsuk-hint">Have there been any changes to your practice GMS, PMS or APMS contract?</span>');
    $("#yes").click(function () {
        $("table[role='presentation']").show();
        $("#necs_changestopracticecontract").val("348730000");
        showContractChangedElements();
    });
    $("#no").click(function () {
        $("table[role='presentation']").hide();
        $("#necs_changestopracticecontract").val("348730001");
        clearAllFields();
        showContractChangedElements();
    });

// Have there been any changes to your practice GMS, PMS or APMS contract?
    var selectedValue = $("#necs_changestopracticecontract option:selected").val();
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
    setTimeout(function () {
        showContractChangedElements();
    }, 300);

// Validation
    var minimumDate = dayjs(new Date(2020, 0, 1));
    var maximumDate = minimumDate.add(1, "year");
    var contractHasChanged = function () {
        return ($("#necs_contracttypechanged").val() == "348730000");
    };
    var rules = {
        necs_extensionenddate_date_input: { required: false },
        necs_extensionchangedate_date_input: { required: function () { return $("#necs_extensionenddate_date_input").val() != ""; } },
        necs_newcontracttype: {required: contractHasChanged },
        necs_newcontractenddate_date_input: {required: false },
        necs_contractchangedate_date_input: {required: contractHasChanged },
    };
    var messages = {
    };
    setTimeout(function () {
        setupValidationForForm(rules, messages);
    }, 500);

});