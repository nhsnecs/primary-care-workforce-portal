$(document).ready(function() {

$("#necs_partneratpracticeinn2ppapplication").closest("tr").hide();

// Styling
    $("#necs_odscode").addClass("nhsuk-input--width-5");
    $("#necs_nameofpractice").addClass("nhsuk-input--width-20");
    $("#necs_practicemanagername").addClass("nhsuk-input--width-20");
    $("#necs_practicemanageremail").addClass("nhsuk-input--width-20");

var hideAllFields = function () {
    $("#necs_otherpartnershipstatus").closest("tr").hide();
    $("#necs_nameofpractice").closest("td").hide();
    $("#necs_odscode").closest("td").hide();
    $("#necs_practicemanagername").closest("td").hide();
    $("#necs_practicemanageremail").closest("td").hide();
    $("#necs_datemovedtonewpractice_datepicker_description").closest("tr").hide();
    $("#necs_datewhenleftpartnershiprole_datepicker_description").closest("tr").hide();
};

var clearAllFields = function () {
    $("#necs_nameofpractice").val(null);
    $("#necs_odscode").val(null);
    $("#necs_practicemanagername").val(null);
    $("#necs_practicemanageremail").val(null);
    $("#necs_datemovedtonewpractice").val("");
    $("#necs_datemovedtonewpractice_date_input").attr("value", null);
    $("#necs_datemovedtonewpractice_date_input").val(null);
    $("#necs_datewhenleftpartnershiprole").val("");
    $("#necs_datewhenleftpartnershiprole_date_input").attr("value", null);
    $("#necs_datewhenleftpartnershiprole_date_input").val(null);
    $("#necs_otherpartnershipstatus").val(null);
};

var showRelevantFields = function (selectedOption) {
    hideAllFields();
    switch (selectedOption) {
        case "348730000": // I have become a partner at a different practice
            $("#necs_odscode").closest("td").show();
            $("#necs_nameofpractice").closest("td").show();
            $("#necs_practicemanagername").closest("td").show();
            $("#necs_practicemanageremail").closest("td").show();
            $("#necs_datemovedtonewpractice_datepicker_description").closest("tr").show();
            $("#necs_datewhenleftpartnershiprole_datepicker_description").closest("tr").show();
            break;
        case "348730001": // I have left my partnership role
            $("#necs_datewhenleftpartnershiprole_datepicker_description").closest("tr").show();
            break;
        case "348730002": // I have left my role due to ill health
            $("#necs_datewhenleftpartnershiprole_datepicker_description").closest("tr").show();
            break;
        case "348730003": // Other
            $("#necs_otherpartnershipstatus").closest("tr").show();
            $("#necs_datewhenleftpartnershiprole_datepicker_description").closest("tr").show();
            break;
    }
};

// Partnership status dropdown -> show/hide relevant elements
showRelevantFields($("#necs_partnershipstatus").val());
$("#necs_partnershipstatus").change(function () {
    showRelevantFields($(this).val());
    clearAllFields();
});

// Hide table
$("table[role='presentation']").each(function(index) {

    $(this).parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $(this).parent().prepend('<span class="nhsuk-hint">Are you still a partner at the practice specified in your New to Partnership Payment Application form?</span>');
    
    var partnerAtPractice = $("#necs_partneratpracticeinn2ppapplication").val();
    switch (partnerAtPractice) {
        case "348730000": // Yes
            $("#yes").attr("checked", "checked");
            $("#necs_partnershipstatus").closest("tr").hide();
            break;
        case "348730001": // No
            $("#no").attr("checked", "checked");
            $("#necs_partnershipstatus").closest("tr").show();
            break;
        default: // Not set yet
            $(this).hide();
    }

    // Yes / No handler
    $("#yes").click(function () {
        $("#necs_partnershipstatus").closest("tr").hide();
        $("#necs_partnershipstatus").val(null);
        $("#necs_partneratpracticeinn2ppapplication").val("348730000");
        $("table[role='presentation']").hide();
        hideAllFields();
        clearAllFields();
    });
    $("#no").click(function () {
        $("#necs_partnershipstatus").closest("tr").show();
        $("#necs_partneratpracticeinn2ppapplication").val("348730001");
        $("table[role='presentation']").show();
    });
});

// Validation
    var minimumDate = dayjs(new Date(2020, 0, 1));
    var maximumDate = minimumDate.add(1, "year");
    var rules = {
        necs_partnershipstatus: "required",
        necs_odscode: "required",
        necs_nameofpractice: "required",
        necs_practicemanagername: "required",
        necs_practicemanageremail: "required",
        necs_datemovedtonewpractice_date_input: { required: true, minimumDate: minimumDate, maximumDate: maximumDate },
        necs_datewhenleftpartnershiprole_date_input: { required: true, minimumDate: minimumDate, maximumDate: maximumDate },
        necs_otherpartnershipstatus: { required: function () { return $("#necs_partnershipstatus option:selected").val() == "348730003"; } },
    };
    var messages = {
    };
    setupValidationForForm(rules, messages);

});

