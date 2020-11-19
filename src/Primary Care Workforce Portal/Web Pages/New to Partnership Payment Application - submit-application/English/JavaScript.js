$(document).ready(function () {

// SiteImprove - Form has no submit button
    $("#InsertButton").prop("type", "submit");

// Styling / Input types
    $("#necs_fulltimeequivalent, #necs_clinicalsessionsweekaverage, #necs_sessionincreasednumber")
        .prop("type", "number")
        .addClass("nhsuk-input--width-3");

    $("#necs_fulltimeequivalent, #necs_clinicalsessionsweekaverage")
        .attr("required", "required");

// Hide before GP / Nurse selected
    $("div[data-name='tab_application']").hide();
    $(".cell.file-cell").hide();
    $("#InsertButton").hide();

// Application for GP / Nurse
    $("#gp, #nurse, #other").click(function () {
        var selected = $(this).val();
        var fieldsetIndex = 1;
        switch (selected) {
            case "gp":
                $($("fieldset")[1]).show();
                $($("fieldset")[2]).hide();
                $($("fieldset")[3]).hide();
                break;
            case "nurse":
                $($("fieldset")[1]).hide();
                $($("fieldset")[2]).show();
                $($("fieldset")[3]).hide();
                break;
            case "other":
                $($("fieldset")[1]).hide();
                $($("fieldset")[2]).hide();
                $($("fieldset")[3]).show();
                break;
        }
        $("div[data-name='tab_application']").show();
        $(".cell.file-cell").show();
        $("#InsertButton").show();
    });

// Session increased No / Yes
    $("#necs_sessionincreasednumber_label").parent().parent().hide();
    $("#necs_sessionincreasedsincepartnership_0").click(function () {
        $("#necs_sessionincreasednumber_label").parent().parent().hide();
        $("#necs_sessionincreasednumber").attr("required", false);
    });
    $("#necs_sessionincreasedsincepartnership_1").click(function () {
        $("#necs_sessionincreasednumber_label").parent().parent().show();
        $("#necs_sessionincreasednumber").attr("required", "required");
    });

// Move FTE guidance
    var element = $('#fte-guidance').detach();
    $('#necs_fulltimeequivalent').closest(".control").append(element);
    $('#fte-guidance').show();

});

var setFteValue = function (value) {
    var fte = (value * 4.1666666666666667) / 37.5;
    $("#necs_clinicalsessionsweekaverage").val(value);
    $('#necs_fulltimeequivalent').val(fte.toFixed(2));
};


// Setup Validation
var rules = {};
setupValidationForForm(rules);
