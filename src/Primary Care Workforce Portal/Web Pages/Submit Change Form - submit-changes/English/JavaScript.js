$(document).ready(function() {

// SiteImprove - Form has no submit button
    $("#InsertButton").prop("type", "submit");

// Styling
    $("#necs_minimum2sessionperweek").parent().addClass("nhsuk-input--width-5");
    $("#necs_revisedagreedsessionperweek").attr("type", "number");
    $("#necs_revisedagreedsessionperweek").addClass("nhsuk-input--width-5");
    $("#necs_agreedsessionschanged").parent().addClass("nhsuk-input--width-10");
    $("#necs_odscode").addClass("nhsuk-input--width-5");
    $("#necs_nameofpractice").addClass("nhsuk-input--width-20");
    $("#necs_practicemanagername").addClass("nhsuk-input--width-20");
    $("#necs_practicemanageremailaddress").addClass("nhsuk-input--width-20");
    $("#necs_practicestreetbuilding").addClass("nhsuk-input--width-20");
    $("#necs_practicetownorcity").addClass("nhsuk-input--width-20");
    $("#necs_practicecountycode_name").parent().addClass("nhsuk-input--width-20");
    $("#necs_practicepostcode").addClass("nhsuk-input--width-10");

// Personal details styling
    $("#necs_firstnames, #necs_surname, #necs_personalstreetbuilding, #necs_personaltownorcity")
        .addClass("nhsuk-input--width-20");
    $("#necs_hometel, #necs_worktel, #necs_mobileno, #necs_personalpostcode")
        .addClass("nhsuk-input--width-10");
    $("#necs_personalcountycode_name")
        .parent()
        .addClass("nhsuk-input--width-20");
    $("#necs_contracttypechanged, #necs_newcontracttype")
        .parent()
        .addClass("nhsuk-input--width-5");

// Personal details placeholders
    $("#necs_firstnames").attr("placeholder", firstnames);
    $("#necs_surname").attr("placeholder", surname);
    $("#necs_personalstreetbuilding").attr("placeholder", personalstreetbuilding);
    $("#necs_personaltownorcity").attr("placeholder", personaltownorcity);
    $("#necs_personalpostcode").attr("placeholder", personalpostcode);
    $("#necs_hometel").attr("placeholder", hometel);
    $("#necs_worktel").attr("placeholder", worktel);
    $("#necs_mobileno").attr("placeholder", mobileno);
    $("#necs_email").attr("placeholder", email);
    setTimeout(function () {
        $("#necs_personalcountycode_name").val(personalcountycode_name);
    }, 500);

// Hide unneeded fields
var hideAllFields = function () {
    $("#necs_otherpartnershipstatus").closest("tr").hide();
    $("#necs_nameofpractice").closest("td").hide();
    $("#necs_odscode").closest("td").hide();
    $("#necs_practicestreetbuilding").closest("td").hide();
    $("#necs_practicetownorcity").closest("td").hide();
    $("#necs_practicecountycode_name").closest("td").hide();
    $("#necs_practicepostcode").closest("td").hide();
    $("#necs_practicemanagername").closest("td").hide();
    $("#necs_practicemanageremailaddress").closest("td").hide();
    $("#necs_practicestreetbuilding").closest("td").hide();
    $("#necs_practicetownorcity").closest("td").hide();
    $("#necs_practicecountycode_name").closest("td").hide();
    $("#necs_practicepostcode").closest("td").hide();
    $("#necs_datemovedtonewpractice_datepicker_description").closest("tr").hide();
    $("#necs_datewhenleftpartnershiprole_datepicker_description").closest("tr").hide();
};

var showRelevantFields = function (selectedOption) {
    hideAllFields();
    switch (selectedOption) {
        case "348730000": // I have become a partner at a different practice
            $("#necs_odscode").closest("td").show();
            $("#necs_nameofpractice").closest("td").show();
            $("#necs_practicemanagername").closest("td").show();
            $("#necs_practicemanageremailaddress").closest("td").show();
            $("#necs_practicestreetbuilding").closest("td").show();
            $("#necs_practicetownorcity").closest("td").show();
            $("#necs_practicecountycode_name").closest("td").show();
            $("#necs_practicepostcode").closest("td").show();
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
    });

// Move attach file into changes to contract section
    var attachFile = $("#AttachFile").closest("div.tr").detach();
    $("table[data-name='section_practice_contract']").parent().append(attachFile);

// Equity share -> Working capacity other
    var showEquityShareOther = function (value) {
        if (value == "348730003") {
            $("#necs_workingcapacityother").closest("tr").show();
        } else {
            $("#necs_workingcapacityother").closest("tr").hide();
        }
    };
    $("#necs_workingcapacity").change(function () {
        showEquityShareOther($(this).val());
    });
    showEquityShareOther($("#necs_workingcapacity").val());

// Contract changed events
    var showContractChangedElements = function () {
        var changes = $("#necs_contracttypechanged").val();
        if (changes == "348730000") {
            $("#AttachFile").closest(".tr").show();
            $("#necs_newcontracttype").closest("tr").show();
            $("#necs_newcontractenddate_date_input").closest("tr").show();
            $("#necs_contractchangedate_date_input").closest("tr").show();
            $("#necs_extensionenddate_date_input").closest("tr").show();
            $("#necs_extensionchangedate_date_input").closest("tr").show();
        } else {
            $("#AttachFile").closest(".tr").hide();
            $("#necs_newcontracttype").closest("tr").hide();
            $("#necs_newcontractenddate_date_input").closest("tr").hide();
            $("#necs_contractchangedate_date_input").closest("tr").hide();
            $("#necs_extensionenddate_date_input").closest("tr").hide();
            $("#necs_extensionchangedate_date_input").closest("tr").hide();
        }
    };
    showContractChangedElements();
    $("#necs_contracttypechanged").change(function () {
        showContractChangedElements();
    });

// Turn sections into dropdown options
    var sections = [];
    var options = "";
    $("fieldset:not(#confirmation-fieldset)").each(function(index) {
        $(this).hide();
        var title = $(this).find("legend").text();
        if (title) {
            sections.push({ title: title, section: $(this), visible: false });
            options += "<option>" + title + "</option>";
        }
    });
    $("#confirmation-container").hide();

// Section handling
    var selectSection = $("<legend class='nhsuk-fieldset__legend nhsuk-fieldset__legend--l'>Select what's changed</legend><select id='sections' name='sections' class='form-control picklist nhsuk-select' multiple='multiple'>" + options + "</select><br/>");
    sections[0].section.parent().prepend(selectSection);
    sections[0].section.parent().addClass("nhsuk-form-group");
    $("#sections").select2({ placeholder: "Select one or more sections" });

    selectSection.change(function () {
        var selectedTitles = $(this).val();
        if (!selectedTitles || selectedTitles.length == 0) {
            $("#confirmation-container").hide();
            $("#confirm-yes").prop("checked", false);
            $("#InsertButton").attr("disabled", true);
        } else {
            $("#confirmation-container").show();
        }
        for (var index = 0; index < selectedTitles.length; index++) {
            var selectedTitle = selectedTitles[index];
            if (selectedTitle != "") {
                $("#sections").removeClass("nhsuk-select--error");
            }
            var selectedSection = sections.find(function (item) {
                return item.title == selectedTitle;
            });
            if (selectedSection) {
                selectedSection.section.show();
                if (!selectedSection.visible) {
                    selectedSection.visible = true;
                    $([document.documentElement, document.body]).animate({ scrollTop: selectedSection.section.offset().top }, 1000);
                }
            }
        }
    });

    var isOpen = false;
    var preventOpen = false;
    $("#sections").on("select2:unselect", function (e) {
        preventOpen = !isOpen;
        var selectedTitle = e.params.data.text;
        var selectedSection = sections.find(function (item) {
            return item.title == selectedTitle;
        });
        if (selectedSection) {
            selectedSection.section.hide();
            selectedSection.visible = false;
        }
    });
    $("#sections").on("select2:opening", function (e) {
        if (preventOpen) {
            preventOpen = false;
            return false;
        }
    });
    $("#sections").on("select2:open", function (e) {
        isOpen = true;
    });
    $("#sections").on("select2:close", function (e) {
        isOpen = false;
    });

// Descriptions
$("table[role='presentation']").each(function(index) {

    var description = "";
    switch (index) {
    case 0:
        description = "Complete this section only if your personal details have changed";
        break;
    case 1:
        description = "Complete this section only if you have either moved practices but continued in a partnership role, or have left your partnership altogether";
        break;
    case 2:
        description = "Please provide details of the changes you wish to make to your probationary period";
        break;
    case 3:
        description = "Have you have continued to work as a partner but no longer hold an equity share?";
        break;
    case 4:
        description = "Have there been any changes to your practice GMS, PMS or APMS contract?";
        break;
    case 5:
        description = "Have there been any changes to your agreed number of working sessions that we hold on record for you?";
        break;
    case 6:
        description = "Are you planning or have taken a prolonged period of absence? (excluding: annual leave maternity / paternity / adoption leave and long term sickness) please provide details on the reason";
        break;
    case 7:
        description = "If you have any other changes you wish to make, please detail them here";
        break;
    }
    $(this).parent().prepend('<span class="nhsuk-hint">' + description + '</span>');

});

// Declaration -> enable/disable submit
    var enableDisableSubmitButton = function () {
        var confirmed = $("#confirm-yes").prop("checked");
        $("#InsertButton").attr("disabled", !confirmed);
    };

// Move declaration before buttons
    var confirmationContainer = $("#confirmation-container");
    $(".actions").prepend(confirmationContainer);
    $("#confirmation-container").hide();

// Confirm declaration sets enabled
    $("#confirm-yes").change(function () {
        enableDisableSubmitButton();
    });
    enableDisableSubmitButton();

// Setup Validation
var minimumDate = dayjs(new Date(2020, 0, 1));
var maximumDate = minimumDate.add(1, "year");
var contractHasChanged = function () {
    return $("#necs_contracttypechanged option:selected").val() == "348730000";
};
var rules = {
    sections: "required",
    necs_firstnames: { required: false },
    necs_surname: { required: false },
    necs_personalstreetbuilding: { required: false },
    necs_personaltownorcity: { required: false },
    necs_personalcountycode_name: { required: false },
    necs_personalpostcode: { required: false },
    necs_hometel: { required: false },
    necs_worktel: { required: false },
    necs_mobileno: { required: false },
    necs_email: { required: false },
    
    necs_revisedagreedsessionperweek: { digits: true, max: 9 },

    necs_extensionenddate_date_input: { required: false },
    necs_extensionchangedate_date_input: { required: function () { return $("#necs_extensionenddate_date_input").val() != ""; } },
    necs_newcontracttype: {required: contractHasChanged },
    necs_newcontractenddate_date_input: {required: false },
    necs_contractchangedate_date_input: {required: contractHasChanged },

    necs_datewhenleftpartnershiprole_date_input: { required: true, minimumDate: minimumDate, maximumDate: maximumDate },
    AttachFile: { required: function () { return $("#sections option:selected").text() == "Changes in practice contract"; } }
};
var messages = {
    necs_datewhenleftpartnershiprole_date_input: {
        minimumDate: 'Date must be on or after ' + minimumDate.format("DD/MM/YYYY"),
        maximumDate: 'Date must be before ' + maximumDate.format("DD/MM/YYYY"),
    }
};
setupValidationForForm(rules, messages);

});
