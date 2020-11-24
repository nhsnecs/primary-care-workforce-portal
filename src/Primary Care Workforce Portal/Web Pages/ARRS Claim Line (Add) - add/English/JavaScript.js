$(document).ready(function () {

// Add guidance for meets training requirements
    var guidance = $("<p class='guidance'>Where a PCN employs or engages a Clinical Pharmacist under the Additional Roles Reimbursement Scheme, the PCN must ensure that the Clinical Pharmacist is enrolled in, or has qualified from, an approved 18-month training pathway or equivalent that equips the Clinical Pharmacist to:<ol><li>be able to practice and prescribe safely and effectively in a primary care setting (for example, the CPPE Clinical Pharmacist training pathways 74,75);</li><span class='guidance-and'>and</span><li>deliver the key responsibilities set out in the job description</li></ol></p>");
    $("#necs_meetstrainingrequirements").parent().prepend(guidance);

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
    $("#necs_monthlyfees").val("0");
    $("#necs_monthlyfees").closest("tr").hide();
    $("#necs_professionid").on("change", function () {
        var selected = $(this).val();
        if (selected == '57ab0870-6eec-ea11-a815-000d3a86a78c') {
            $("#necs_monthlyfees").closest("tr").show();
        } else {
            $("#necs_monthlyfees").closest("tr").hide();
            $("#necs_monthlyfees").val("0");
        }
        $("#necs_employeeid").val($("#necs_professionid option:selected").text() + " 1");
    });

// Setup Validation
    var rules = { necs_employeeid: null, necs_lefton_date_input: null, necs_totalcost: null, necs_maxreimbursement: null, necs_maxadjustedreimbursement: null };
    setupValidationForForm(rules);

});