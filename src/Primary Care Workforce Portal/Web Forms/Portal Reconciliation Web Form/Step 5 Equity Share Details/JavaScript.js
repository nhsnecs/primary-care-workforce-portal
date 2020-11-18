$(document).ready(function() {

$("#necs_continuedequitysharepartner").closest("tr").hide();
$("#necs_workingcapacity").change(function () {
    if ($(this).val() == "348730003") {
        $("#necs_workingcapacityother").closest("tr").show();
    } else {
        $("#necs_workingcapacityother").closest("tr").hide();
    }
});

// Hide table
$("table[role='presentation']").each(function(index) {

    $(this).parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $(this).parent().prepend('<span class="nhsuk-hint">Have you have continued to work as a partner but no longer hold an equity share?</span>');

    $("#yes").click(function () {
        $("table[role='presentation']").show();
        $("#necs_continuedequitysharepartner").val("348730000");
    });
    $("#no").click(function () {
        $("table[role='presentation']").hide();
        $("#necs_continuedequitysharepartner").val("348730001");
        $("#NextButton").click();
    });

    var selectedValue = $("#necs_continuedequitysharepartner").val();
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

    if ($("#necs_workingcapacity").val() == "348730003") {
        $("#necs_workingcapacityother").closest("tr").show();
    } else {
        $("#necs_workingcapacityother").closest("tr").hide();
    }

});

});