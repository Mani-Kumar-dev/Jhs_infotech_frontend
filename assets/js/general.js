//js for web header
$('#courses-menu').on('mouseover', function () {
    $(".course-dropdown").attr("data-bs-popper", "static");
    // $(".course-dropdown").show();
}).on('mouseleave', function () {
    $(".course-dropdown").removeAttr("data-bs-popper");
    // $(".course-dropdown").hide();
}).click(function () {
    $(".course-dropdown").attr("data-bs-popper", "static");
});
// For loading placed companies slider section.
var loadingPage = false;
$(window).scroll(function () {
    if ($(this).scrollTop() >= 100 && loadingPage === false) {
        loadingPage = true;
        $.ajax({
            type: "post",
            dataType: "json",
            url: $app_url + '/get-placed-companies',
            data: [],
            beforeSend: function () {
                //
            },
            success: function (data) {
                $('#placedCompaniesSection').html('');
                $('#placedCompaniesSection').html(data.html);
            }
        });
    }
});
// Placed companies ends here.
//js for mobile header
$(document).ready(function () {
    $(document).on('click', '.inqFormSubmit', function (e) {
        e.preventDefault();
        var self = $(this);
        var formDataArr = self.parents('.inqForm').serialize();
        $.ajax({
            type: "post",
            dataType: "json",
            url: $app_url + '/inquiry',
            data: formDataArr,
            beforeSend: function () {
                $.blockUI({message: '<div class="course-loader mx-auto"><svg viewBox="0 0 80 80"><circle id="test" cx="40" cy="40" r="32"></circle></svg></div>'});
            },
            success: function (data) {
                $.unblockUI();
                $('.inqAlertDiv').html('');
                self.parents('.inqForm').find('.inqAlertDiv').html(data.html);
                $('.inqForm').trigger("reset");
                if ('dl' in data) {
                    inquiryData(data.dl);
                }
                setTimeout(function () {
                    $('#inquiryForm').modal('hide')
                }, 2000);
            }
        });
    });
    $(document).on('click', '.inqFormShow', function (e) {
        var type = $(this).attr('data-type');
        var source = $(this).attr('data-source');
        var source_value = $(this).attr('data-source_value');
        var form_element = $(this).attr('data-form_element');
        var course_category = $(this).attr('data-course_category');
        getInquiryForm(type, source, source_value, course_category, form_element);
    });
    $(".navbar-toggler").click(function (e) {
        $(".navbar-collapse").toggle("slide", {direction: "right"}, 300);
        $(".navbar-collapse").toggleClass("show");
        $(".mobile-navbar-toggler-icon .fa-solid").toggleClass("fa-bars fa-xmark");

        if ($(".navbar-collapse").hasClass("show")) {
            $('body').css('overflow', 'hidden');
            //alert("hide");
        } else {
            $('body').css('overflow', 'auto');
            $('.level-2-mobile').hide();
            $('.level-3-mobile').hide();
            $('.level-1-mobile').show();
            $('body').css('overflow', 'visible');
        }
        e.stopPropagation();
    });
    $(".open-item-mobile").click(function (e) {
        $("#" + $(this).data('show_class')).show("slide", {direction: "right"}, 300);
        e.stopPropagation();
    });
    $(".back-item-mobile").click(function (e) {
        $("#" + $(this).data('hide_class')).hide("slide", {direction: "right"}, 300);
        e.stopPropagation();
    });
});

function getSearchData(data = null) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: $app_url + '/search-courses',
        data: data,
        beforeSend: function () {
            $.blockUI({message: '<div class="course-loader mx-auto"><svg viewBox="0 0 80 80"><circle id="test" cx="40" cy="40" r="32"></circle></svg></div>'});
        },
        success: function (data) {
            $.unblockUI();
            if (data.status) {
                $('#course-tabContent').empty();
                $('#course-tabContent').html(data.html);
            }
        }
    });
    return true;
}

function getInquiryForm(type, source, source_value = null, course_category = null, form_element = 'inquiryFormDiv') {
    $.ajax({
        type: "post",
        dataType: "json",
        url: $app_url + '/get-inquiry-form',
        data: {'type': type, 'source': source, 'source_value': source_value, 'form_element': form_element, 'course_category': course_category},
        success: function (data) {
            $('#' + data.form_element).html('');
            $('#' + data.form_element).html(data.html);
        }
    });
    return true;
}

function disableNullFields() {
    $('input').each(function (i) {
        var $input = $(this);
        if ($input.val() == '')
            $input.attr('disabled', 'disabled');
    });
}

function searchClearFn(searchTermInput, searchClear, isSearch = false) {
    searchTermInput.on('keyup', function () {
        ($(this).val().length > 0) ? searchClear.show() : searchClear.hide();
    });
    searchClear.on('click', function (e) {
        e.preventDefault();
        searchTermInput.val('');
        $(this).hide();
        if (isSearch) {
            getSearchData({'search': null});
        }
    });
}
