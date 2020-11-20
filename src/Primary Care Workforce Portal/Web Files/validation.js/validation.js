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

var validateForm = function (rules, messages) {
    return $("form").validate({
            rules: rules,
            ignore: ':hidden, [readonly=readonly]',
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
            messages: messages
        });
};

// Date validators (min & max)

    $.validator.addMethod('minimumDate', function (v, el, minimumDate) {
        if (this.optional(el)) {
            return true;
        }
        var selectedDate = dayjs(new Date($(el).val()));
        return selectedDate.isAfter(minimumDate);
    }, 'Date should be later than {0}.');

    $.validator.addMethod('maximumDate', function (v, el, maximumDate) {
        if (this.optional(el)) {
            return true;
        }
        var selectedDate = dayjs(new Date($(el).val()));
        return selectedDate.isBefore(maximumDate);
    }, 'Date should be earlier than {0}.');

// Setup validation for form
var setupValidationForForm = function (rules, messages) {

    // Removes existing jQuery validator
    // Takes all inputs starting with necs_, but exluding labels & descriptions
    // Sets up as required (assuming if they're visible they're required

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
    var formValidator = validateForm(rulesWithNames, messages);

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