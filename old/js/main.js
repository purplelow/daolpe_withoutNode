$(function () {
  $(window).scroll(function () {
    var scroll_Value = $(document).scrollTop();
    //  console.log(scroll_Value);

    if (scroll_Value >= 250) {
      $(".main_content .main_tit").addClass("in");
    }
    if (scroll_Value >= 299) {
      $(".main_content .main_txt_list li").addClass("in");
    }
    if (scroll_Value >= 850) {
      $(".main_content2 .main_tit").addClass("in");
    }
    if (scroll_Value >= 899) {
      $(".main_content2 .main_txt_list li").addClass("in");
    }

    //  메인페이지

    //  if(scroll_Value >= cc2) {
    //     $('.content .prin_wrap .prin_desc3').addClass('in');
    //  }
    //  if(scroll_Value >= cc3) {
    //     $('.content .prin_wrap .prin_desc4').addClass('in');
    //  }
    //  if(scroll_Value >= cc4) {
    //     $('.content .prin_wrap .prin_desc5').addClass('in');
    //  }
    //  if(scroll_Value >= cc5) {
    //     $('.content .prin_wrap .prin_desc6').addClass('in');
    //  }
    //  if(scroll_Value >= cc6) {
    //     $('.content .prin_wrap .prin_desc7').addClass('in');
    //  }
    //  if(scroll_Value >= cc7) {
    //     $('.content .prin_wrap .prin_desc2 .prin_tit').addClass('in');
    //     $('.content .prin_wrap .prin_desc2 .prin_txt1').addClass('in');
    //     $('.content .prin_wrap .prin_desc2 .prin_txt2').addClass('in');
    //  }
    //  if(scroll_Value >= cc10) {
    //      $('.content .prin_wrap .prin_area .prin_txt3').addClass('in');
    //      $('.content .prin_wrap .prin_area .prin_txt4').addClass('in');
    //      $('.content .content_donw_wrap').addClass('in');
    //  }
  });
  $(".content .content_toptxt").addClass("in");
  $(".content .prin_wrap .prin_desc1").addClass("in");

  $(".content .prin_wrap .prin_desc2 .prin_tit").addClass("in");
  $(".content .prin_wrap .prin_desc2 .prin_txt1").addClass("in");
  $(".content .prin_wrap .prin_desc2 .prin_txt2").addClass("in");

  $(".content .prin_wrap .prin_desc3").addClass("in");
  $(".content .prin_wrap .prin_desc4").addClass("in");
  $(".content .prin_wrap .prin_desc5").addClass("in");
  $(".content .prin_wrap .prin_desc6").addClass("in");
  $(".content .prin_wrap .prin_desc7").addClass("in");
  $(".content .prin_wrap .prin_area .prin_txt3").addClass("in");
  $(".content .prin_wrap .prin_area .prin_txt4").addClass("in");
  $(".content .content_donw_wrap").addClass("in");

  var cc1 = $(".content .prin_wrap .prin_desc1").offset().top - 600;
  var cc2 = $(".content .prin_wrap .prin_desc3").offset().top - 600;
  var cc3 = $(".content .prin_wrap .prin_desc4").offset().top - 600;
  var cc4 = $(".content .prin_wrap .prin_desc5").offset().top - 600;
  var cc5 = $(".content .prin_wrap .prin_desc6").offset().top - 600;
  var cc6 = $(".content .prin_wrap .prin_desc7").offset().top - 600;
  var cc7 = $(".content .prin_wrap .prin_desc2").offset().top - 500;
  var cc8 = $(".content .prin_wrap .prin_area .prin_txt3").offset().top - 500;
  var cc10 = $(".content .prin_wrap .prin_area .prin_txt4").offset().top - 500;
  var cc9;
  $(".content .content_donw_wrap").offset().top - 500;

  //footer
  $(".family_main").click(function () {
    $(".family_sub").slideToggle();
    $(".family_main").toggleClass("on");
  });
  $(".footer .footer_header .footer_familysite .family_sub li a").click(
    function () {
      $(".family_sub").slideUp();
      $(".family_main").toggleClass("on");
      var cc = $(this).text();
      $(".family_main").text(cc);
    }
  );
});
// END
