$(document).ready(function () {

// Move declaration before buttons
    $("#confirmation-container").prependTo(".form-custom-actions");

// Disable approve button
    $(".form-custom-actions").find("button").first().attr("disabled", true);

// Confirm declaration sets enabled
    $("#confirm-yes").change(function () {
        var confirmed = $(this).prop("checked");
        $(".form-custom-actions").find("button").first().attr("disabled", !confirmed);
    });

});