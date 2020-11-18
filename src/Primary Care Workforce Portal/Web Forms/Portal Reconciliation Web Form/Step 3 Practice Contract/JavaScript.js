$(document).ready(function() {

$("#necs_changestopracticecontract").closest("tr").hide();

var hideAllFields = function () {
    $("#necs_otherpartnershipstatus").closest("tr").hide();
};

var showRelevantFields = function (selectedOption) {
    hideAllFields();
    switch (selectedOption) {
        case "348730000": // Yes
            $("#necs_newcontracttype").closest("tr").show();
            $("#necs_newcontractenddate_datepicker_description").closest("tr").show();
            break;
        case "348730001": // No
            $("#necs_newcontracttype").closest("tr").hide();
            $("#necs_newcontractenddate_datepicker_description").closest("tr").hide();
            break;
    }
};

// Partnership status dropdown -> show/hide relevant elements
showRelevantFields($("#necs_contracttypechanged").val());
$("#necs_contracttypechanged").change(function () {
    showRelevantFields($(this).val());
});

// Hide table
$("table[role='presentation']").each(function(index) {

    $(this).parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $(this).parent().prepend('<span class="nhsuk-hint">Have there been any changes to your practice GMS, PMS or APMS contract?</span>');

    $("#yes").click(function () {
        $("table[role='presentation']").show();
        $("#necs_changestopracticecontract").val("348730000");
    });
    $("#no").click(function () {
        $("table[role='presentation']").hide();
        $("#necs_changestopracticecontract").val("348730001");
        $("#NextButton").click();
    });

    var selectedValue = $("#necs_changestopracticecontract").val();
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

});