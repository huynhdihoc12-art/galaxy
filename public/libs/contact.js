var httpserver = $('.httpserver').text();

var contact_form_error_name = $('.contact-form-error-name').text();
var contact_form_error_company = $('.contact-form-error-company').text();
var contact_form_error_address = $('.contact-form-error-address').text();
var contact_form_error_phone = $('.contact-form-error-phone').text();
var contact_form_error_email = $('.contact-form-error-email').text();
//var contact_form_error_note = $('.contact-form-error-note').text();

var contact_form_name = $('.contact-form-name').text();
var contact_form_company = $('.contact-form-company').text();
var contact_form_address = $('.contact-form-address').text();
var contact_form_phone = $('.contact-form-phone').text();
var contact_form_email = $('.contact-form-email').text();
//var contact_form_note = $('.contact-form-note').text();


var contact_form_contact_success = $('.contact-form-contact-success').text();
var contact_form_contact_fail = $('.contact-form-contact-fail').text();
var contact_form_captcha_fail = $('.contact-form-captcha-fail').text();

function validatecontact() {
    hidemsg();
    var flag = true;
    var name = checkNull('name', contact_form_error_name, contact_form_name, '40', '-270');
    //var company = checkNull('company', contact_form_error_company, contact_form_company, '40', '-270');
    var address = checkNull('address', contact_form_error_address, contact_form_address, '40', '-270');
    var phone = checkPhone('phone', contact_form_error_phone, contact_form_phone, '40', '-270');
    var email = checkMail('email', contact_form_error_email, contact_form_email, '40', '-270');
    //var note = checkNull('note', contact_form_error_note, contact_form_note, '40', '-270');
    if (!name || !address || !phone || !email) {
        flag = false;

        //$('html, body').animate({ scrollTop: 1200 }, 1200, 'easeInOutExpo');

        setTimeout(hideerror, 5000);
    }
    return flag;
}


$('#btn-question').on('click', function (e) {
    e.preventDefault();
    if (validatecontact() == true) {
        $('#btn-question').attr('disabled', 'disabled');
        if (!$('.loadx').length) {
            $('body').append('<div class="loadx" style="display:block"></div>');
        }

        var objSend = $('#frm_contact').serialize();
        $.ajax({
            type: 'POST',
            url: httpserver + "/Contact/SendContact",
            data: objSend,
            success: function (data) {
                $('.loadx').remove();
                if (data == '1') {
                    alert("Cám ơn bạn đã hoàn tất gửi thông tin liên hệ. Chúng tôi đã tiếp nhận thông tin của bạn và sẽ phản hồi trong thời gian  ngắn nhất.");
                    window.location = httpserver + "/lien-he.html";
                } else {
                    if (data == '0') {
                        $('.overlay-dark').after("<div  class='contact-success color-red'>" + "Captcha không chính xác!" + "</div>");
                    }
                    if (data == '2') {
                        $('.overlay-dark').after("<div  class='contact-success color-red'>" + "Email đã được đăng ký!" + "</div>");
                    }
                    if (data == '3') {
                        $('.overlay-dark').after("<div  class='contact-success color-red'>" + "Gửi mail không thành! Vui lòng thử lại!" + "</div>");
                    }
                }
                grecaptcha.reset();
                $('#btn-question').removeAttr('disabled');
                setTimeout(hidemsg, 5000);
            },
            error: function () { alert("error") }
        });
    }

});

var contact_form_error_nameapply = $('.contact-form-error-nameapply').text();
var contact_form_error_phoneapply = $('.contact-form-error-phoneapply').text();
var contact_form_error_emailapply = $('.contact-form-error-emailapply').text();
var contact_form_error_fileapply = $('.contact-form-error-fileapply').text();


var contact_form_nameapply = $('.contact-form-nameapply').text();
var contact_form_phoneapply = $('.contact-form-phoneapply').text();
var contact_form_emailapply = $('.contact-form-emailapply').text();
var contact_form_fileapply = $('.contact-form-fileapply').text();


function validateapply() {
    hidemsg();
    var flag = true;
    var nameapply = checkNull('nameapply', contact_form_error_nameapply, contact_form_nameapply, '40', '-270');
    var phoneapply = checkPhone('phoneapply', contact_form_error_phoneapply, contact_form_phoneapply, '40', '-270');
    var emailapply = checkMail('emailapply', contact_form_error_emailapply, contact_form_emailapply, '40', '-270');
    var fileapply = checkNull('file', contact_form_error_fileapply, contact_form_fileapply, '40', '-270');
    //if ($('input[type=file]')[0].files[0] == null) {
    //    flag = false;
    //}
    if (!nameapply || !phoneapply || !emailapply || !fileapply) {
        flag = false;

        $('html, body').animate({ scrollTop: 3500 }, 3500, 'easeInOutExpo');

        setTimeout(hideerror, 5000);
    }
    return flag;
}


$('#btn-apply').on('click', function (e) {
    e.preventDefault();
    if (validateapply() == true  ) {
        if (window.FormData === undefined) {
            alert("This browser doesn't support HTML5 file uploads!");
            return false;
        }
        var formData = new FormData();
        formData.append("nameapply", $("#nameapply").val());
        formData.append("emailapply", $("#emailapply").val()); // number 123456 is immediately converted to a string "123456"
        formData.append("phoneapply", $("#phoneapply").val());
        // HTML file input, chosen by user
        formData.append("file", $('input[type=file]')[0].files[0]);

        debugger
        $('#btn-apply').attr('disabled', 'disabled');
        if (!$('.loadx').length) {
            $('body').append('<div class="loadx" style="display:block"></div>');
        }

        var oReq = new XMLHttpRequest();

        oReq.open("POST", httpserver + "/Recruitment/SendRecruitmentApply", true);
        oReq.onload = function (oEvent) {
            if (oReq.status == 200) {
            
                var data = oReq.responseText;
                debugger
                $('.loadx').remove();
                        if (data == '1') {
                            window.location = httpserver + "/tuyen-dung.html";
                        } else {
                            if (data == '2') {
                                $('.overlay-dark').after("<div  class='contact-success color-red'>" + "Email đã được đăng ký!" + "</div>");
                            }
                            if (data == '3') {
                                $('.overlay-dark').after("<div  class='contact-success color-red'>" + "Gửi mail không thành! Vui lòng thử lại!" + "</div>");
                            }
                        }
                $('#btn-apply').removeAttr('disabled');
                setTimeout(hidemsg, 5000);
            } else {
                alert("error");
            }
        };

        oReq.send(formData);  // call server
        //var objSend = $('#frm_apply').serialize();
        //$.ajax({
        //    type: 'POST',
        //    url: httpserver + "/Recruitment/SendRecruitmentApply",
        //    data: objSend,
        //    success: function (data) {
        //        $('.loadx').remove();
        //        if (data == '1') {
        //            window.location = httpserver + "/tuyen-dung.html";
        //        } else {
        //            if (data == '2') {
        //                $('.overlay-dark').after("<div  class='contact-success color-red'>" + "Email đã được đăng ký!" + "</div>");
        //            }
        //            if (data == '3') {
        //                $('.overlay-dark').after("<div  class='contact-success color-red'>" + "Gửi mail không thành! Vui lòng thử lại!" + "</div>");
        //            }
        //        }
        //        grecaptcha.reset();
        //        $('#btn-apply').removeAttr('disabled');
        //        setTimeout(hidemsg, 5000);
        //    },
        //    error: function () { alert("error") }
        //});
    }

});






var contact_form_error_namegiohang = $('.contact-form-error-namegiohang').text();

var contact_form_error_addressgiohang = $('.contact-form-error-addressgiohang').text();
var contact_form_error_phonegiohang = $('.contact-form-error-phonegiohang').text();
var contact_form_error_emailgiohang = $('.contact-form-error-emailgiohang').text();


var contact_form_namegiohang = $('.contact-form-namegiohang').text();

var contact_form_addressgiohang = $('.contact-form-addressgiohang').text();
var contact_form_phonegiohang = $('.contact-form-phonegiohang').text();
var contact_form_emailgiohang = $('.contact-form-emailgiohang').text();




function validateOrderDetail() {
    hidemsg();
    var flag = true;
    var name_giohang = checkNull('name_giohang', contact_form_error_namegiohang, contact_form_namegiohang, '40', '-270');
    //var company = checkNull('company', contact_form_error_company, contact_form_company, '40', '-270');
    var address_giohang = checkNull('address_giohang', contact_form_error_addressgiohang, contact_form_addressgiohang, '40', '-270');
    var phone_giohang = checkPhone('phone_giohang', contact_form_error_phonegiohang, contact_form_phonegiohang, '40', '-270');
    var email_giohang = checkMail('email_giohang', contact_form_error_emailgiohang, contact_form_emailgiohang, '40', '-270');
    //var note = checkNull('note', contact_form_error_note, contact_form_note, '40', '-270');
    if (!name_giohang || !address_giohang || !phone_giohang || !email_giohang) {
        flag = false;

        //$('html, body').animate({ scrollTop: 1200 }, 1200, 'easeInOutExpo');

        setTimeout(hideerror, 5000);
    }
    return flag;
}


$('#btn-orderdetail').on('click', function (e) {
    e.preventDefault();
    if (validateOrderDetail() == true) {
        $('#btn-orderdetail').attr('disabled', 'disabled');
        if (!$('.loadx').length) {
            $('body').append('<div class="loadx" style="display:block"></div>');
        }

        var objSend = $('#frm_orderdetail').serialize();
        $.ajax({
            type: 'POST',
            url: httpserver + "/ShoppingCart/SendOrderDetail",
            data: objSend,
            success: function (data) {
                $('.loadx').remove();
                if (data == '1') {
                   // alert("Cám ơn bạn đã hoàn tất gửi thông tin liên hệ. Chúng tôi đã tiếp nhận thông tin của bạn và sẽ phản hồi trong thời gian  ngắn nhất.");
                    //window.location = httpserver + "/lien-he.html";
                    window.location = httpserver + "/thank-you.html";
                } else {
                    if (data == '2') {
                        console.log("Đặt hàng không thành công!");
                    }
                    if (data == '3') {
                        console.log("Gửi mail không thành! Vui lòng thử lại!");
                    }
                }
                grecaptcha.reset();
                $('#btn-orderdetail').removeAttr('disabled');
                setTimeout(hidemsg, 5000);
            },
            error: function () { alert("error") }
        });
    }

});






$('#btn-question-reset').click(function () {
    hidemsg();
    hideerror();
});
$("#phone").numeric();
$('#frm_contact').keydown(function (e) {
    if (!$("textarea").is(":focus")) {
        if (e.keyCode == 13) {
            $('#btn-question').trigger('click');
        }
    }
});




jQuery(document).ready(function() {
    var hei = $(".news-desc").height();
    if (hei < 1200) {
        $('.readmore_content_exists').remove();
    }
    $('#readmore_content').click(function () {
        $('.readmore_content_exists').remove();
        $('.news-desc').css('max-height', 'inherit');
    });
    var class_id = ".news-desc";
    if ($(class_id + " h2").length || $(class_id + " h3").length || $(class_id + " h4").length) {
        var ToC = '<div class="row-collapse align-middle muc-luc" id="row-763228256">\n' +
            '    <div class="col small-12 large-5">\n' +
            '        <div class="col-inner ct-dvu muc_luc_">\n' +
            '            <a class="show-more">Hiện</a><div class="title_ml" data-line-height="s">\n' +
            '                            <span style="color: #fff;">\n' +
            '                            <div class="menu-btn-show" bis_skin_checked="1"><span class="border-style"></span><span class="border-style"></span><span class="border-style"></span></div>\n' +
            '                            Mục lục bài viết\n' +
            '                            </span>\n' +
            '            </div>\n' +
            '            <ol>';

        var newLine, el, title, link;

        $(class_id + " h2, " + class_id + " h3, " + class_id + " h4").each(function () {
            el = $(this);
            title = el.text();
            tag = el.get(0).tagName;
            link = "#" + el.attr("id");
            newLine =
                "<li class='" + tag + "'>" +
                "<a href='" + link + "'>" +
                title +
                "</a>" +
                "</li>";

            ToC += newLine;

        });


        ToC += '</ol>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '\n' +
            '</div>';
        console.log(ToC);
        $('.news-desc').prepend(ToC);
        $(".muc-luc ol li a").each(function (index) {
            $(this).click(function () {
                $(class_id + " h2, " + class_id + " h3, " + class_id + " h4").each(function (indexs) {
                    if ((index) == indexs) {
                        check = 1;
                        $("html, body").animate({
                            scrollTop: $(this).offset().top + 555
                        }, 1200);
                    }
                });
                return false;
            })
        });
    }
    $('.muc_luc_ .show-more').click(function () {
        var el  = $(this);
        el.text((el.text() === 'Hiện') ? 'Ẩn' : 'Hiện');
        el.toggleClass('up');
        $('.muc_luc_ ol').toggle();
        return false;
    });
    });