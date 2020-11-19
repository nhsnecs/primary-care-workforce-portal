// Validation
var highlightError = function (element) {
    $(element).closest('tr').addClass('nhsuk-form-group--error');
    $(element).closest('.nhsuk-form-group').addClass('nhsuk-form-group--error');
    $(element).addClass("nhsuk-input--error");
    $(element).addClass("nhsuk-select--error");
};

var unhighlightError = function (element) {
    $(element).closest('tr').removeClass('nhsuk-form-group--error');
    $(element).closest('.nhsuk-form-group').removeClass('nhsuk-form-group--error');
    $(element).removeClass("nhsuk-input--error");
    $(element).removeClass("nhsuk-select--error");
};

var validateForm = function (rules) {
    return $("form").validate({
            rules: rules,
            ignore: ':hidden',
            onkeyup : false,
            onfocusout : false,
            highlight: function(element) {
                highlightError(element);
            },
            unhighlight: function(element) {
                unhighlightError(element);
            },
            errorElement: 'span',
            errorClass: 'nhsuk-error-message',
            errorPlacement: function(error, element) {
                error.insertBefore(element);
            },
        });
};

// Setup validation for form
//      Removes existing jQuery validator
//      Takes all inputs starting with necs_, but exluding labels & descriptions
//      Sets up as required (assuming if they're visible they're required
var setupValidationForForm = function (rules) {

    // Remove existing validation
    var validator = $("form").validate();
    validator.destroy();

    // Add all necs_ elements
        $("form").find("[id^='necs_']").each(function (index) {
            var id = $(this).attr("id");
            if (!(id in rules)) {
                if (!id.contains("_label") && !id.contains("_description")) {
                    rules[id] = "required";
                }
            }
        });

    // Set names instead of ids (jQuery validator uses/relies on names)
    var rulesWithNames = {};
    Object.keys(rules).forEach(function (id) {
        var name = $("#" + id).attr("name");
        rulesWithNames[name] = rules[id];
    });

    // Setup validator
    var formValidator = validateForm(rulesWithNames);

    // Hook into existing validation
    if (typeof (entityFormClientValidate) != 'undefined') {
        var originalValidationFunction = entityFormClientValidate;
        if (originalValidationFunction && typeof (originalValidationFunction) == "function") {
            entityFormClientValidate = function() {
                originalValidationFunction.apply(this, arguments);
                var formValid = $("form").valid();
                return formValid;
            };
        }
    }

};