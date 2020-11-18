$(document).ready(function() {

// SiteImprove - Form has no submit button
    $("#InsertButton").prop("type", "submit");

    $("a.btn")
        .removeClass("btn-primary")
        .removeClass("btn-default")
        .removeClass("btn")
        .addClass("nhsuk-button");

    $(".clearlookupfield").hide();
    $(".launchentitylookup").hide();

// Months
    var firstOfMonth = dayjs().startOf('month');
    var months = '';
    for (var month = -6; month < 24; month++) {
        var date = firstOfMonth.add(month, "month");
        months += "<option value='" + date.format("YYYY-MM-DDT00:00:00.0000000") + "'>" + date.format("MMMM YYYY") + "</option>";
    }
    var monthsSelect = $("<div class='nhsuk-form-group nhsuk-input--width-10'><select class='nhsuk-select' id='select-month'>" + months + "</select></div>");
    $("#necs_claimmonth").parent().append(monthsSelect);
    $("#select-month").val($("#necs_claimmonth").val());
    $("#select-month").on("change", function () {
        $("#necs_claimmonth").val($(this).val());
    });
    $("#select-month").closest("div.control").children("input[type='date']").hide();

// Weighted list size
    $("#necs_weightedlistsize").attr("type", "number");
    $("#necs_weightedlistsize").addClass("nhsuk-input--width-10");

});