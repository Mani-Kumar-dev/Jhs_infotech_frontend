$(document).ready(function () {
    var searchModule = $('#search_module').val();
    var searchTermInput = $('#searchTerm');
    var searchClear = $('#searchClear');
    $('#courseSearchForm').on('submit', function (e) {
        e.preventDefault();
        $('#courseSearchForm').on('submit', function (e) {
            e.preventDefault();
            var search = $('#searchTerm').val().trim();
            getSearchData({'search': search});
        });
    });
    searchClearFn(searchTermInput, searchClear, true);
    // For loading placement collaboration sections.
    var loadingHomePage = false;
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 150 && loadingHomePage === false) {
            loadingHomePage = true;
            $.ajax({
                type: "post",
                dataType: "json",
                url: $app_url + '/get-placement-collaboration',
                data: [],
                beforeSend: function () {
                    //
                },
                success: function (data) {
                    $('#placementCollaborationSection').html('');
                    $('#placementCollaborationSection').html(data.html);
                    if ($(window).width() >= 768) {
                        $('#collaboration-slider').owlCarousel({
                            loop: true,
                            margin: 10,
                            nav: true,
                            navText: ["<div class='nav-button owl-prev'><i class='fa-solid fa-arrow-left'></i></div>", "<div class='nav-button owl-next'><i class='fa-solid fa-arrow-right'></i></div>"],
                            items: 4,
                            dots: false,
                            mouseDrag: true,
                            touchDrag: true,
                            pullDrag: true,
                        });
                    }
                    $("#coverflow").flipster({
                        spacing: -0.5,
                        style: 'carousel',
                        buttons: true,
                        loop: true,
                    });
                    if ($(window).width() > 768) {
                        $(".flipster").css({height: 600});
                    }
                }
            });
        }
    });
    // placement collaboration sections ends here.
    $('#webinar-slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        navText: ["<div class='nav-button owl-prev'><i class='fa-solid fa-arrow-left'></i></div>", "<div class='nav-button owl-next'><i class='fa-solid fa-arrow-right'></i></div>"],
        items: 1,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
    });
    if ($(window).width() >= 768) {
        $('#testimonial-slider').owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
            navText: ["<div class='nav-button owl-prev'><i class='fa-solid fa-arrow-left'></i></div>", "<div class='nav-button owl-next'><i class='fa-solid fa-arrow-right'></i></div>"],
            dots: false,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            autoWidth: true,
        });
    }
    $('.popup-youtube').magnificPopup({
        type: 'iframe'
    });
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    $('.popup-img').magnificPopup({
        delegate: 'img',
        type: 'image',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        callbacks: {
            elementParse: function (item) {
                item.src = item.el.attr('src');
            }
        }
    });
});
