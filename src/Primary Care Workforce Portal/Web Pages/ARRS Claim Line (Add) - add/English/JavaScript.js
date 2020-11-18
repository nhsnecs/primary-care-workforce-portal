$(document).ready(function () {

    var guidance = $("<p class='guidance'>Where a PCN employs or engages a Clinical Pharmacist under the Additional Roles Reimbursement Scheme, the PCN must ensure that the Clinical Pharmacist is enrolled in, or has qualified from, an approved 18-month training pathway or equivalent that equips the Clinical Pharmacist to:<ol><li>be able to practice and prescribe safely and effectively in a primary care setting (for example, the CPPE Clinical Pharmacist training pathways74,75);</li><span class='guidance-and'>and</span><li>deliver the key responsibilities set out in the job description</li></ol></p>");
    $("#necs_meetstrainingrequirements").parent().prepend(guidance);

});