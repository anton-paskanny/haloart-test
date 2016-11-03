$(document).ready(function() {
    var fixedFormButton = $('.fixed-form__button'),
        fixedForm = $('.fixed-form'),
        mainHeader = $('.main-header'),
        overlay = $('.overlay'),
        popupClose = $('.popup__close'),
        hamburger = $('.main-header__hamburger'),
        mobileMenu = $('.main-header__list'),
        wholePage = $('html, body'),
        // links in menu for scroll within a page
        headerLinkDescription = $('.main-header__link--description'),
        headerLinkGoal = $('.main-header__link--goal'),
        headerLinkPartners = $('.main-header__link--partners'),
        headerLinkService = $('.main-header__link--service'),
        headerLinkLocation = $('.main-header__link--location'),
        // anchors for header's links
        anchorDescription = mainHeader;
    anchorGoal = $('.divider__description'),
        anchorPartners = $('.divider__partners'),
        anchorService = $('.divider__service'),
        anchorLocation = $('.divider__location');

    // event handler for fixed-form
    fixedFormButton.on('click', function() {
        if (fixedForm.hasClass('opened')) {
            var width = fixedForm.find('.form').outerWidth() + 2; // border-width, 2px
            fixedForm.animate({
                left: -width
            }, 500, function() {
                fixedForm.removeClass('opened');
            }); // end animation close
        } else if (!fixedForm.hasClass('opened')) {
            fixedForm.animate({
                left: '0'
            }, 500, function() {
                fixedForm.addClass('opened');
            }); // end animation open
        }
    });

    // event handler for mainHeader
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            mainHeader.find('.main-header__nav').animate({
                top: 0
            }, 300);
        } else if ($(window).scrollTop() < 300) {
            mainHeader.find('.main-header__nav').stop(true).animate({
                top: '-100%'
            }, 300);

            if (hamburger.hasClass('main-header__hamburger--open')) {
                setTimeout(function() {
                    hamburger.removeClass('main-header__hamburger--open');
                }, 600)
            };

            if (mobileMenu.hasClass('main-header__list--open')) {
                setTimeout(function() {
                    mobileMenu.removeClass('main-header__list--open');
                }, 600)
            };
        }
    });

    $('form').on('submit', function(event) {
        event.preventDefault();

        var errors = false;
        var errorEmptyText = 'Поле не может быть пустым';
        var errorEmailValue = 'Неверный e-mail';
        var pattern = '^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$';

        var inputName = $(this).find("input[name='name']");
        var inputEmail = $(this).find("input[name='email']");

        if (inputName.val() === '') {
            inputName.addClass('errorForm').val('').attr('placeholder', errorEmptyText);
            errors = true;
        } else {
            inputName.removeClass('errorForm')
        };

        if (inputEmail.val() != '') {
            if (inputEmail.val().search(pattern) == 0) {
                inputEmail.removeClass('errorForm');
            } else {
                inputEmail.addClass('errorForm').val('').attr('placeholder', errorEmailValue);
                errors = true;
            }
        } else {
            inputEmail.addClass('errorForm').val('').attr('placeholder', errorEmptyText);
            errors = true;
        };

        if (!errors) {
            console.log('Form has been sent');
            inputName.removeClass('errorForm').val('').attr('placeholder', 'Имя');;
            inputEmail.removeClass('errorForm').val('').attr('placeholder', 'E-mail');;
            setPlaceHolderForIE9();
            overlay.css("display", "block");
        }
    });

    // event handler for popupClose
    popupClose.on("click", function() {
        overlay.css("display", "none");
    });

    // event handlers for links in header

    headerLinkDescription.on("click", function(event) {
        event.preventDefault();
        wholePage.animate({
            scrollTop: anchorDescription.offset().top
        }, 800);
    });

    headerLinkGoal.on("click", function(event) {
        event.preventDefault();
        wholePage.animate({
            scrollTop: anchorGoal.offset().top
        }, 800);
    });

    headerLinkPartners.on("click", function(event) {
        event.preventDefault();
        wholePage.animate({
            scrollTop: anchorPartners.offset().top
        }, 800);
    });

    headerLinkService.on("click", function(event) {
        event.preventDefault();
        wholePage.animate({
            scrollTop: anchorService.offset().top
        }, 800);
    });

    headerLinkLocation.on("click", function(event) {
        event.preventDefault();
        wholePage.animate({
            scrollTop: anchorLocation.offset().top
        }, 800);
    });

    // event handler for mobile menu
    hamburger.on("click", function() {
        $(this).toggleClass('main-header__hamburger--open');
        mobileMenu.toggleClass('main-header__list--open');
    });

    //change icon for mobile devices
    var icon = "<svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 554.625 554.625'>" +
        "<path d='M154.142 86.062c0-36.337 30.6-66.938 66.938-66.938s66.937 30.6 66.937 66.938v53.55c11.476-15.3 19.125-34.425 19.125-53.55C307.142 38.25 268.892 0 221.08 0s-86.063 38.25-86.063 86.062c0 21.038 7.65 40.163 19.125 53.55v-53.55z'/>" +
        "<path d='M450.58 229.5c-11.476 0-21.038 3.825-28.69 9.562 0-26.775-21.036-47.812-47.81-47.812-11.476 0-22.95 3.825-32.513 11.475-7.65-19.125-24.863-30.6-43.988-30.6-11.476 0-21.038 3.825-28.69 9.562V86.062c0-26.775-21.036-47.812-47.81-47.812s-47.813 21.038-47.813 47.812v170.212c-38.25-34.425-80.325-61.2-107.1-34.425-38.25 38.25 42.075 112.836 103.275 225.674 43.988 78.412 105.188 107.1 166.387 107.1 89.887 0 162.56-72.675 162.56-162.562v-114.75c0-26.774-21.036-47.812-47.81-47.812zm28.686 89.888v72.675c0 74.588-65.024 143.438-143.438 143.438-72.675 0-114.75-40.16-149.175-95.624-72.675-126.225-126.225-183.6-107.1-204.638C100.59 214.2 152.228 260.1 192.39 302.176V86.062c0-15.3 13.387-28.688 28.688-28.688 15.3 0 28.688 13.388 28.688 28.688v200.812h19.125v-66.938c0-15.3 13.39-28.688 28.69-28.688s28.687 13.388 28.687 28.688v47.812h19.125V239.06c0-15.3 13.388-28.688 28.688-28.688 15.3 0 28.688 13.388 28.688 28.688v47.812h19.125v-9.562c0-15.3 13.388-28.688 28.688-28.688 15.302 0 28.69 13.388 28.69 28.688v42.078z'/>" +
        "</svg>";

    if ($(window).width() < 321) {
        $('.divider__icon').css({
            'width': '35px',
            'height': '35px'
        }).html(icon);
        $('.divider__text').eq(0).html('<p>Листай<br>вниз');
    };

    // start styling google map
    var myLatlng = new google.maps.LatLng(58.537023, 31.266165);

    var map = new google.maps.Map($('#map')[0], {
        center: myLatlng,
        zoom: 16,
        styles: [{
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "gamma": "0.83"
            }, {
                "saturation": "-86"
            }]
        }, {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{
                "saturation": "-31"
            }, {
                "lightness": "15"
            }]
        }, {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{
                "saturation": "-99"
            }]
        }, {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [{
                "saturation": "-63"
            }, {
                "gamma": "1.14"
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{
                "gamma": "0.92"
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                "gamma": "1.29"
            }, {
                "saturation": "-6"
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "gamma": "1.00"
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
                "weight": "0.01"
            }, {
                "gamma": "0.00"
            }, {
                "lightness": "-29"
            }, {
                "saturation": "-82"
            }]
        }, {
            "featureType": "administrative.country",
            "elementType": "all",
            "stylers": [{
                "gamma": "1.00"
            }]
        }]
    });

    var svgIcon = {
        path: 'M16.734 0C9.374 0 3.408 5.966 3.408 13.325c0 11.076 13.326 20.143 13.326 20.143S30.06 23.734 30.06 13.324C30.06 5.964 24.093 0 16.734 0zm0 19.676c-3.51 0-6.354-2.844-6.354-6.352 0-3.508 2.844-6.352 6.354-6.352 3.508 0 6.352 2.845 6.352 6.353 0 3.508-2.844 6.35-6.352 6.35z',
        fillColor: '#E02D29',
        fillOpacity: 1,
        strokeColor: '#E02D29',
        scale: 1
    };

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        clickable: false,
        icon: svgIcon
    });

    marker.setMap(map);

    // hack for placeholders in ie9
    function setPlaceHolderForIE9() {
        var pos = window.navigator.userAgent.indexOf("MSIE");
        if (pos > 0) {
            if (window.navigator.userAgent.substring(pos + 5, window.navigator.userAgent.indexOf(".", pos)) < 10) {

                $("input[placeholder]").each(function() {
                    $(this).val($(this).attr("placeholder"));
                });

                $("input[placeholder]").click(function() {
                    if ($(this).val() === $(this).attr("placeholder")) {
                        $(this).val('');
                    }
                });

                $("input[placeholder]").blur(function() {

                    if ($.trim($(this).val()).length === 0) {
                        $(this).val($(this).attr("placeholder"));
                    }
                });
            }
        }
    }

    setPlaceHolderForIE9();
}); // end ready
