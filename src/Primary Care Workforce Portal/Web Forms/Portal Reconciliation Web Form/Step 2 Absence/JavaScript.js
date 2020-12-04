$(document).ready(function() {

$("#necs_prolongerperiodsofabsence").closest("tr").hide();

$("table[role='presentation']").each(function(index) {

    $(this).parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $(this).parent().prepend('<span class="nhsuk-hint">Are you planning to or have taken a prolonged period of absence from work, for example a sabbatical? This does not include annual leave, maternity / paternity / adoption / parental leave and/or long-term sickness.</span>');
    $("#yes").click(function () {
        $("table[role='presentation']").show();
        $("#necs_prolongerperiodsofabsence").val("348730000");
    });
    $("#no").click(function () {
        $("#necs_prolongerperiodsofabsence").val("348730001");
        $("table[role='presentation']").hide();
    });
    
    var absence = $("#necs_prolongerperiodsofabsence").val();
    switch (absence) {
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
