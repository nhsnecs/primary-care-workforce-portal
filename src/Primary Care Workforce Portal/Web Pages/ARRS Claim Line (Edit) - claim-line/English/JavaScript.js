$(document).ready(function () {

// Styling / Input types (commas cause in issue)
    /*$("#necs_monthlysalary, #necs_monthlyemployersni, #necs_monthlyemployerspension, #necs_monthlyfees, #necs_hoursworkedperweek")
        .prop("type", "number");*/

// Add guidance for meets training requirements
    var guidance = $("<p class='guidance'>Where a PCN employs or engages a Clinical Pharmacist under the Additional Roles Reimbursement Scheme, the PCN must ensure that the Clinical Pharmacist is enrolled in, or has qualified from, an approved 18-month training pathway or equivalent that equips the Clinical Pharmacist to:<ol><li>be able to practice and prescribe safely and effectively in a primary care setting (for example, the CPPE Clinical Pharmacist training pathways 74,75);</li><span class='guidance-and'>and</span><li>deliver the key responsibilities set out in the job description</li></ol></p>");
    $("#necs_meetstrainingrequirements").parent().prepend(guidance);

// Start & end date tooltips
    var addTooltipToElement = function (id, title) {
        $("#" + id).attr("data-toggle", "tooltip");
        $("#" + id).attr("data-placement", "right");
        $("#" + id).attr("title", title);
    };
    addTooltipToElement("necs_startedon_label", "You must populate the start date of the employee");
    addTooltipToElement("necs_lefton_label", "If there is no change in-month, please leave this field blank");
    $('[data-toggle="tooltip"]').tooltip();

// Only show reasons input when Yes selected
    var showReasonsNotMet = function() {
        if ($("#necs_meetstrainingrequirements_1").is(":checked")) {
            $("#necs_reasonstrainingnotmet").closest("td").hide();
        } else {
            $("#necs_reasonstrainingnotmet").closest("td").show();
        }
    };
    showReasonsNotMet();
    $("#necs_meetstrainingrequirements_0, #necs_meetstrainingrequirements_1").change(function () {
        showReasonsNotMet();
    });

// Monthly fees only available for 'Social Prescribing Link Worker' (57ab0870-6eec-ea11-a815-000d3a86a78c)
    var showHideMonthlyFeesAndPharmacyFields = function () {
        var selected = $("#necs_professionid option:selected").val();
        if (selected == '57ab0870-6eec-ea11-a815-000d3a86a78c') {
            $("#necs_monthlyfees").closest("tr").show();
        } else {
            $("#necs_monthlyfees").closest("tr").hide();
        }
        // Clinical pharmacist section
        if (selected == '4e48fb82-6dec-ea11-a815-0022481a236c' || selected == "14103721-6eec-ea11-a815-000d3a86a78c") {
            $("table[data-name='tab_details_section_pharmacy']").closest("fieldset").show();
        } else {
            $("table[data-name='tab_details_section_pharmacy']").closest("fieldset").hide();
        }
    };
    $("#necs_monthlyfees").closest("tr").hide();
    $("#necs_professionid").on("change", function () {
        showHideMonthlyFeesAndPharmacyFields();
    });
    showHideMonthlyFeesAndPharmacyFields();

// Setup Validation
    var rules = {
        necs_monthlysalary: { required: true, number: true, max: 10000, min: 0 },
        necs_monthlyemployersni: { required: true, number: true, max: 1000, min: 0 },
        necs_monthlyemployerspension: { required: true, number: true, max: 10000, min: 0 },
        necs_monthlyfees: { required: true, number: true, max: 1000, min: 0 },
        necs_hoursworkedperweek: { required: true, number: true, max: 40, min: 1 },
        necs_employeeid: null,
        necs_lefton_date_input: null,
        necs_totalcost: null,
        necs_maxreimbursement: null,
        necs_maxadjustedreimbursement: null
        };
    setupValidationForForm(rules);


});