$(document).ready(function() {

// SiteImprove - Form has no submit button
    $("#InsertButton").prop("type", "submit");

// Styling
    $("#necs_minimum2sessionperweek").parent().addClass("nhsuk-input--width-5");
    $("#necs_revisedagreedsessionperweek").attr("type", "number");
    $("#necs_revisedagreedsessionperweek").addClass("nhsuk-input--width-5");

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
    $("#necs_datemovedtonewpractice_datepicker_description").closest("tr").hide();
    $("#necs_datewhenleftpartnershiprole_datepicker_description").closest("tr").hide();
};

var showRelevantFields = function (selectedOption) {
    hideAllFields();
    switch (selectedOption) {
        case "348730000": // I have become a partner at a different practice
            $("#necs_odscode").closest("td").show();
            $("#necs_practicemanagername").closest("td").show();
            $("#necs_practicemanageremailaddress").closest("td").show();
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
        var hasChanged = $("#necs_contracttypechanged option:selected").val() == "348730000";
        $("#necs_newcontracttype").closest("tr").toggle(!!hasChanged);
        $("#necs_newcontractenddate_date_input").closest("tr").toggle(!!hasChanged);
        $("#necs_contractchangedate_date_input").closest("tr").toggle(!!hasChanged);
        $("#necs_extensionenddate_date_input").closest("tr").toggle(!!hasChanged);
        $("#necs_extensionchangedate_date_input").closest("tr").toggle(!!hasChanged);
    }
    $("#necs_contracttypechanged").change(function () {
        showContractChangedElements();
    });
    showContractChangedElements();

// Turn sections into dropdown options
    var selection = null;
    var sections = [];
    var options = "";
    $("fieldset").each(function(index) {
        $(this).hide();
        var title = $(this).find("legend").text();
        if (title) {
            sections.push({ title: title, section: $(this) });
            options += "<option>" + title + "</option>";
        }
    });

// Section handling
    var selectSection = $("<legend class='nhsuk-fieldset__legend nhsuk-fieldset__legend--l'>Select what's changed</legend><select id='sections' name='sections' class='form-control picklist nhsuk-select'><option selected value=''>(select an option)</option>" + options + "</select><br/>");
    sections[0].section.parent().prepend(selectSection);
    sections[0].section.parent().addClass("nhsuk-form-group");
    selectSection.change(function () {
        var selectedTitle = $(this).val();
        if (selectedTitle != "") {
            $("#sections").removeClass("nhsuk-select--error");
        }
        var selectedSection = sections.find(function (item) {
            return item.title == selectedTitle;
        });
        if (selection) {
            selection.hide();
        }
        if (selectedSection) {
            selectedSection.section.show();
            selection = selectedSection.section;
        }
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
        description = "If you joined the New to Partnership Payment scheme during your probationary period do you need to update any of the details that we hold on record for you in relation to this, for example if your probationary period has been extended or has been completed and you are now a substantive partner?";
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
        description = "Are you planning to or have taken a prolonged period of absence from work, for example a sabbatical? This does not include annual leave, maternity / paternity / adoption / parental leave and/or long-term sickness.";
        break;
    case 7:
        description = "If you have any other changes you wish to make to your personal or employment details that are not included on the other sections of this form, please document them here.";
        break;
    }
    $(this).parent().prepend('<span class="nhsuk-hint">' + description + '</span>');

});


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
    
    necs_extensionenddate_date_input: { required: false },
    necs_extensionchangedate_date_input: { required: function () { return $("#necs_extensionenddate_date_input").val() != ""; } },
    necs_newcontracttype: {required: contractHasChanged },
    necs_newcontractenddate_date_input: {required: contractHasChanged },
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
