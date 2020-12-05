$(document).ready(function() {

// Hide yes/no dropdown
    $("#necs_personaldetailedremainedsame").closest("tr").hide();

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

// Setup Yes/No
    $("table[role='presentation']").parent().prepend('<span class="boolean-radio"><input id="no" type="radio" name="changed" value="no"><label for="no" class="radio-label">No</label><input id="yes" type="radio" name="changed" value="yes"><label for="yes" class="radio-label">Yes</label></span>');
    $("table[role='presentation']").parent().prepend('<span class="nhsuk-hint">Have your personal details remained the same since your original partnership application?</span>');
    $("#yes").click(function () {
        $("table[role='presentation']").hide();
        $("#necs_personaldetailedremainedsame").val("348730000");
    });
    $("#no").click(function () {
        $("table[role='presentation']").show();
        $("#necs_personaldetailedremainedsame").val("348730001");
    });

// Existing Yes/No
    var selected = $("#necs_personaldetailedremainedsame").val();
    switch (selected) {
        case "348730000": // Yes
            $("#yes").attr("checked", "checked");
            $("table[role='presentation']").hide();
            break;
        case "348730001": // No
            $("#no").attr("checked", "checked");
            $("table[role='presentation']").show();
            break;
        default: // Not set yet
            $("table[role='presentation']").hide();
    }

});

