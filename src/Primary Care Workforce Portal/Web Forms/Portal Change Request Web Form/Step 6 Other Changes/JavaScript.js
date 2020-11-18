$(document).ready(function() {

$(".workflow-link").hide();
$("#NextButton").click(function () {
    $(".workflow-link").click();
});

$("table[role='presentation']").each(function(index) {
    $("#necs_otherchanges_label").parent().hide();
    $(this).parent().prepend('<span class="nhsuk-hint">If you have any other changes you wish to make to your personal or employment details that are not included on the other sections of this form, please document them here:</span>');
});

});