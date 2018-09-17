$(window).load(function () {
    // портфель
    $("#pf-link").click(function() {
        $(".portfolio").toggle();
    });
    $("#pf-close").click(function() {
        $(".portfolio").hide();
    });

    // закрытие блока портфеля по клику в любое место экрана
    $(document).on('mouseup', function(e) {
        var container = $(".portfolio");
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            container.hide();
        }
    });

    // закрытие левых блоков.
    $(".left-block-title").click(function() {
        $(this).parent().children('.left-block-body').slideToggle('normal');
        $(this).parent().toggleClass('left-block-close');
        var al = $.cookie("leftblocks") || "";
        var wg = $(this).parent().attr("id");
        if (al.indexOf(wg) > -1) {
            al = al.replace(wg, '');
        } else {
            al = al + wg;
        }
        $.cookie("leftblocks", al);
    });

    /* bbcode: спойлер */
    $(".hidden-spoiler div").click(function() {
        if(this.style.color=='black') {
            $(this).css( "color", "F9FAFB" );
        }
        else {
            $(this).css( "color", "black" );
        }
    });

    // загловочный блок
    $('.main-info-block .main-info-block-header.block-allow-toggle').click(function() {
        //$(this).toggleClass('block-close');
        //$(this).next().toggle();
        $(this).toggleClass('block-close');
        var wg = $(this).attr("for");
        $("#"+wg).toggle();
        var al = $.cookie("autorblocks") || "";
        if (al.indexOf(wg) > -1) {
            al = al.replace(wg, '');
        } else {
            al = al + wg;
        }
        $.cookie("autorblocks", al);
    })

    // блоки ворков на странице автора
    $('.biblio-show-block .main-info-block-header.block-allow-toggle').click(function() {
        $(this).toggleClass('block-close');
        var wg = $(this).attr("for");
        $("#"+wg).toggle();
        var al = $.cookie("autorblocks") || "";
        if (al.indexOf(wg) > -1) {
            al = al.replace(wg, '');
        } else {
            al = al + wg;
        }
        $.cookie("autorblocks", al);
    })


    // Person award view all list
    $(".person-info-award-viewlist").click(function() {
        $(".person-info-award-block-second").show();
        $(".person-info-award-viewlist").hide();
    });

    $("#pubcontry_select").change(function() {
        window.location = $(this).val();
    });

    $("#translator_sort").change(function() {
        window.location = $(this).val();
    });

    $(".openedition").click(function() {
        var textarea_elem = $(this).parent().next();
        textarea_elem.toggle();
    });

    $(".bookashko-logo4-bklens1").click(function() {
        $(this).toggleClass( "bookashko-logo4-bklens2" );
    });


    // Person award sorting selector
    $("#awards_person_sort").change(function() {
        var newaction = $('#award_person_link').attr('href');
        document.location.href = newaction + "/awards?sort=" + this.value;
    });

    $("#awards_sort").change(function() {
        location.href='/awards?sort=' + $(this).val()+'&nonfant='+($("[name=nonfant]").prop("checked")?1:0);
    });

    // Adds a country to a person
    $('#btn_add_country').click(function() {
        var num     = $('.cloned-input').length;
        var newNum  = new Number(num + 1);

        var newElem = $('#select_country_' + num).clone().attr('id', 'select_country_' + newNum);

        newElem.children('label').attr('for', 'person_country_' + newNum).attr('name', 'name' + newNum);
        newElem.children('div').children('select').attr('id', 'person_country_' + newNum).attr('name', 'person_country_' + newNum);
        $('#select_country_' + num).after(newElem);

        $('#select_country_' + newNum + ' :nth-child(1)').attr('selected', 'selected');
        if (newNum == 3)
            $('#btn_add_country').prop("disabled", true);
    });


    if ($('.cloned-input').length == 3) {
       $('#btn_add_country').prop("disabled", true);
    }

    // Tool buttons
    $(".tagbutton").click(function() {
        var textarea_elem = $(this).parent().parent().next().next().children('textarea').attr("id");
        if ($(this).attr("name") == "tag_img")
        {
          image(textarea_elem);
        }
        else if ($(this).attr("name") == "tag_url")
        {
          url(textarea_elem);
        }
        else if ($(this).attr("name").substring(0,3) == "tag")
        {
          var tag_button = $(this).attr("name").replace("tag_", "");
          simpletag(tag_button, textarea_elem);
        }
        else
        {
          var str_insert = $(this).attr("value");
          doInsert(str_insert,"",false, textarea_elem);
        }
    });

    //Blog Subscription
    $("a.blog_subscribe").click(function() {
        var blog_id = $(this).prev().val() || $(this).attr('data-blog-id');
        var blog_link = '/editblog' + blog_id + 'subscriber';
        var img_elem = '#img_subscribe_blog' + blog_id;
        $(img_elem).attr('src', '/img/subscr_process.gif');

        $.ajax({
            url: blog_link,
            success: function (json) {
                if (json.is_subscribed == 'on') {
                    $(img_elem).attr('src', '/img/subscr.gif');
                } else {
                    $(img_elem).attr('src', '/img/subscr_empty.gif');

                }
            }
        });
    });

    //Topic Subscription
    $("a.topic_subscribe").click(function() {
        var topic_id = $(this).prev().val();
        var topic_link = '/edittopic' + topic_id + 'subscriber';
        var img_elem = '#img_subscribe_topic' + topic_id;
        $(img_elem).attr('src', '/img/subscr_process.gif');

        $.ajax({
            url: topic_link,
            success: function (json) {
                if (json.is_subscribed == 'on') {
                    $(img_elem).attr('src', '/img/subscr.gif');
                } else {
                    $(img_elem).attr('src', '/img/subscr_empty.gif');

                }
            }
        });
    });

    //Forum Topic Subscription
    $("a.forum_topic_subscribe").click(function() {
        var topic_id = $(this).prev().val();
        var topic_link = '/editforumtopic' + topic_id + 'subscriber';
        var img_elem = '#img_subscribe_topic' + topic_id;
        $(img_elem).attr('src', '/img/subscr_process.gif');

        $.ajax({
            url: topic_link,
            success: function (json) {
                if (json.is_subscribed == 'on') {
                    $(img_elem).attr('src', '/img/subscr.gif');
                } else {
                    $(img_elem).attr('src', '/img/subscr_empty.gif');

                }
            }
        });
    });

    //Content Subscription (Notification)
    $("a.content_subscribe").click(function() {
        var subs_id = $(this).attr('data-subs-id');
        var content_id = $(this).attr('data-content-id');
        var img_id = $(this).attr('data-img-id');
        var img_elem = '#img_subscribe_content_'+img_id;
        var data_elem = this;

        if (subs_id == '') {
            var link = '/notification/subscribe/'+content_id+'.json';
            
            $(img_elem).attr('src', '/img/subscr_process.gif');

            $.ajax({
                url: link,
                success: function (json) {
                    if (json.status == 1) {
                        $(img_elem).attr('src', '/img/subscr.gif');
                        $(data_elem).attr('data-subs-id', json.id);
                    } else {
                        $(img_elem).attr('src', '/img/subscr_empty.gif');
                    }
                }
            });
        } else {
            var link = '/notification/unsubscribe/'+subs_id+'.json';
            
            $(img_elem).attr('src', '/img/subscr_process.gif');

            $.ajax({
                url: link,
                success: function (json) {
                    if (json.status == 1) {
                        $(img_elem).attr('src', '/img/subscr_empty.gif');
                        $(data_elem).attr('data-subs-id', '');
                    } else {
                        $(img_elem).attr('src', '/img/subscr.gif');
                    };
                }
            });
        };
    });


    $("a[data-track=true]").click(function() {
        var url = "/linkmetric?url=" + $(this).attr("href");

        $.ajax({
            url: url,
            success: function (data) { }
        });
    });

    // сортировка таблицы в магазине на странице произведений
    $(".shop-offers").tablesorter();

    // bootstrap-тултипы в "личной переписке"
    $('#notice-base .pm-iconbutton-c').tooltip();
});
