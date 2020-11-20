var applyNhsStyling = function () {

    $("button.btn, a.btn, input[type='button'].btn")
        .removeClass("btn-primary")
        .removeClass("btn-default")
        .removeClass("btn")
        .addClass("nhsuk-button");

    $("input[type='text'], input[type='number'], input[type='email'], input[type='password']")
        .addClass("nhsuk-input");

    /*
    $("input[type='checkbox']")
        .addClass("nhsuk-checkboxes__input");
    */

    $("select")
        .addClass("nhsuk-select");

    $("textarea")
        .addClass("nhsuk-textarea");

    $(".clearlookupfield, .launchentitylookup")
        .removeClass("nhsuk-button")
        .addClass("btn");

    $("legend")
        .removeClass("section-title")
        .addClass("nhsuk-fieldset__legend nhsuk-fieldset__legend--l");

    /*
    $(".section")
        .addClass("nhsuk-form-group");
    */

    $("label")
        .not(".radio-label")
        .addClass("nhsuk-label");

    // Remove .datetimepickers & replace with a native date input
    $(".datetimepicker").each(function (index) {
        var originalInput = $(this).prev();

         // Readonly on review forms (so ignore)
        if (!originalInput.attr("readonly")) {
            var id = originalInput.attr("id") + "_date_input";
            var currentValue = originalInput.val();
            if (currentValue) {
                currentValue = dayjs(currentValue).format("YYYY-MM-DD");
            }
            var dateInput = $("<input id='" + id + "' name='" + id + "' type='date' value='" + currentValue + "' class='nhsuk-input nhsuk-input--width-10'/>");
            dateInput.prependTo($(this).parent());
            dateInput.change(function () {
                if ($(this).val()) {
                    var newValue = dayjs($(this).val()).format("YYYY-MM-DDT00:00:00.0000000");
                    originalInput.val(newValue);
                } else {
                    originalInput.val("");
                }
            });
            $(this).hide();
        }

    });

    // PowerApps designer adds style attributes to home page tile links, this removes them
    $("h2 a").attr("style", "");

    // Specific styling (by id)
    $("#odsSearchCriteria").addClass("nhsuk-input");

    // Add required to email on signin page
    $("label[for='Email']").addClass("required");

};

if (window.jQuery) {
    $(document).ready(function() {
        applyNhsStyling();
    });
}

