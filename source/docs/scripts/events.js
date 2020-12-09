; (function ($) {
    
    // Nav links
    $('.nav-link-main').on('click', function () {
        var $this = $(this),
            $parent = $this.closest('.nav-item'),
            $collapse = $parent.find('.nav-collapse');

        if ($parent.hasClass('active')) {
            $parent.removeClass('active');
            $('.nav-collapse').hide();
        } else {
            $('.nav-collapse').hide();
            $('.nav-item').removeClass('active');
            $parent.addClass('active');
            $collapse.show();
        }
    });

    $('.nav-aside .nav-link').on('click', function () {
        $('.nav-aside .nav-link').removeClass('active');
        $(this).addClass('active');
    });

    $('[data-toggle-click]').on('click', function () {
        $('[data-toggle-elem]').toggleClass('active');
    });

    // Theme swithcer
    var $body = $('body');
    var $navLinkDark = $('[data-switcher] .nav-dark');
    var $navLinkLight = $('[data-switcher] .nav-light');

    $navLinkDark.on('click', function () {
        var $this = $(this),
            $parent = $('body');
        $parent.attr('data-theme', 'dark');
        $this.addClass('active');
        $navLinkLight.removeClass('active');
    });

    $navLinkLight.on('click', function () {
        var $this = $(this),
            $parent = $('body');
        $parent.attr('data-theme', 'light');
        $this.addClass('active');
        $navLinkDark.removeClass('active');
    });

    $('.snippet .pre-label').on('click', function () {
        $(this).parent().toggleClass('active');
    });

    // Clipboard
    $('[data-clipboard-snippet]').on('click', function () {
        var $token = $(this).closest('pre').find('.token');
        $(this).text("Copied!");
        $token.addClass('active');

        setTimeout(function () {
            $('[data-clipboard-snippet]').text("Copy");
            $('.token').removeClass('active');
        }, 1000);
    });

})(jQuery);

var clipboardSnippets = new ClipboardJS('[data-clipboard-snippet]', {
    target: function (trigger) {
        return trigger.nextElementSibling;
    }
});

clipboardSnippets.on('success', function (e) {
    e.clearSelection();
});
clipboardSnippets.on('error', function (e) {
    console.log;
});
