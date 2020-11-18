$(document).ready(function() {

$("#necs_probationaryormutualassessmentperiod").closest("tr").hide();

$("table[role='presentation']").each(function(index) {

    $(this).parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $(this).parent().prepend('<span class="nhsuk-hint">If you joined the New to Partnership Payment scheme during your probationary period do you need to update any of the details that we hold on record for you in relation to this, for example if your probationary period has been extended or has been completed and you are now a substantive partner?</span>');

    $("#yes").click(function () {
        $("table[role='presentation']").show();
        $("#necs_probationaryormutualassessmentperiod").val("348730000");
    });
    $("#no").click(function () {
        $("table[role='presentation']").hide();
        $("#necs_probationaryormutualassessmentperiod").val("348730001");
        $("#NextButton").click();
    });

});

});