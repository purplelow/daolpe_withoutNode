const x = new drawerrMultilevel({
  drawerr: "#drawerr",
});

$(function () {
  let lastScrollTop = 0;
  const delta = 15;

  $(window).scroll(function (event) {
    const st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta) return;
    if (st > lastScrollTop && lastScrollTop > 300) {
      $("#header").addClass("header_up");
    } else if (lastScrollTop < 300) {
      $("#header").removeClass("header_up");
    }
    lastScrollTop = st;
  });
});
