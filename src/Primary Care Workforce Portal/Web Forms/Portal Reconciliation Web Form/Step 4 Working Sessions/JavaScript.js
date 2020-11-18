$(document).ready(function() {

$("#necs_agreedsessionschanged").closest("tr").hide();

// Hide table
$("table[role='presentation']").each(function(index) {

    $(this).parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $(this).parent().prepend('<span class="nhsuk-hint">Have there been any changes to your agreed number of working sessions that we hold on record for you?</span>');

    $("#yes").click(function () {
        $("#necs_agreedsessionschanged").val("348730000");
        $("table[role='presentation']").show();
    });
    $("#no").click(function () {
        $("#necs_agreedsessionschanged").val("348730001");
        $("table[role='presentation']").hide();
        $("#NextButton").click();
    });

    var selectedValue = $("#necs_agreedsessionschanged").val();
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