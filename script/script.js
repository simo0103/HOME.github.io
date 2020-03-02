$(document).ready(function () {
  var $body = $("body"),
    $html = $('html'),
    $link = $('a[href*="#"]'),
    CLASS_ACTIVE = "active",
    CLASS_OPEN = "open",
    CLASS_FADEIN = "fadeIn",
    CLASS_NO_OVERFLOW = "overflowHidden",
    navbarHeight = 100,
    $modal = $('.modal'),
    galleryImages = $("#gallery").find('img'),
    userAgent = userAgent = navigator.userAgent || navigator.vendor || window.opera,
    isSmartphone = userAgent.match('/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i') || window.matchMedia('(max-width: 768px)').matches,
    isTablet = window.matchMedia('(max-width: 768px)').matches,
    isMobile = isSmartphone || isTablet;

  isMobile ? $body.addClass("mobileView") : $body.addClass("desktopView");

  var $hamburgerMenu = $(".hamburger"),
    $sliderContainer = $(".cover .coverSlider");

  $link.on("click", function (event) {
    $this = $(this);
    toggleClassActive($this);
    scrollIntoTheView(event);
    if (!$this.hasClass('notAlink')) {
      $hamburgerMenu.trigger("click");
    }

    isMobile && $("nav").hasClass(CLASS_OPEN) ? $("nav").removeClass(CLASS_OPEN) : "";
    $html.removeClass(CLASS_NO_OVERFLOW);
  });

  $sliderContainer.slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
  });

  $hamburgerMenu.on("click", function (e) {
    $(this).toggleClass(CLASS_ACTIVE);
    $("nav").toggleClass(CLASS_OPEN);
    $html.toggleClass(CLASS_NO_OVERFLOW);
  });

  /* ------ for menu ------- */
  $(".titleAndArrowContainer").on("click", function (event) {
    $this = $(this);
    $this.toggleClass("selected");
    $this.parent().toggleClass(CLASS_OPEN);
  });
  /* ------ end menu ------- */

  $(window).scroll(function () {
    var nav = $("nav"),
      scroll = $(window).scrollTop();
    !isMobile && scroll >= $(".coverContainer").height() - nav.height() ?
      nav.addClass("sticky") :
      nav.removeClass("sticky");

    /* ------    section gallery ---- */
    if (!isMobile) {
      $("#galleria .section").each(function () {
        var $elementPos = $(this).offset().top,
          $scrollPos = $(window).scrollTop();

        var $sectionH = $(this).height();
        var $h = $(window).height();
        var $sectionVert = $h / 2 - $sectionH / 4;

        if (
          $elementPos - $sectionVert - navbarHeight * 2 <= $scrollPos &&
          $elementPos - $sectionVert - navbarHeight * 2 + $sectionH > $scrollPos
        ) {
          $(this).addClass("animate");
        } else {
          $(this).removeClass("animate");
        }
      });
    }
    /* -------------- end gallery    ---------------*/

    galleryImages.on("click", function (event) {
      var $clickedImage = $(this),
        $src = $clickedImage.attr('src'),
        $alt = $clickedImage.attr('alt');
      $modal.css('display', 'flex');
      $html.addClass(CLASS_NO_OVERFLOW);
      $modal.find('img').attr('src', $src);

      console.log($clickedImage)

    });
    $('.modal .close').on("click", function () {
      $modal.css('display', 'none');
      $html.removeClass(CLASS_NO_OVERFLOW);

    });


    $("article").each(function () {
      var $el = $(this),
        $articlePosition = $el.offset().top,
        $articleId = $el.attr("id");

      if (
        $(window).scrollTop() + $(window).height() - navbarHeight > $articlePosition
      ) {
        var $linkClass = $("a." + $articleId);
        $("article").removeClass(CLASS_FADEIN);
        $el.addClass(CLASS_FADEIN);
        if (!$linkClass.parent().hasClass(CLASS_ACTIVE)) {
          $link.parent().removeClass(CLASS_ACTIVE);
          $linkClass.parent().addClass(CLASS_ACTIVE);
        }
      }
    });

    $link.parent().each(function () {
      var $el = $(this),
        offsetUl = $("nav ul").offset().left,
        slidingBorder = $("nav ul .slider");

      if (!isMobile && $el.hasClass(CLASS_ACTIVE)) {
        var distanceFromLeft = $el.offset().left - offsetUl;
        slidingBorder.css("left", distanceFromLeft);
      }
    });
  });
  //----------------END SCROLL ------------------//
  appendMenu();
  //carousel();

  //scroll into the view
  function scrollIntoTheView(event) {
    var $navHeight = !isMobile ? $("nav").innerHeight() : $('.hamburgerContainer').innerHeight();

    if (event.target.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var targetArticle = event.target.hash,
        articleExist = $("body").find(targetArticle).length > 0,
        top = $(targetArticle).offset().top - $navHeight;
      $('html, body').animate({
        scrollTop: top
      }, 500);
    }
  }

  function toggleClassActive($this) {
    if ($this.hasClass() != CLASS_ACTIVE) {
      $link.parent().removeClass(CLASS_ACTIVE);
      $this.parent().addClass(CLASS_ACTIVE);
    }
  }

  //SLICK
  // function carousel() {
  //   $("div.gallery").slick({
  //     slidesToShow: isMobile ? 1 : 3,
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     autoplaySpeed: isMobile ? 4000 : 2000,
  //     dots: isMobile ? true : false
  //   });
  // }
  /* ------ menu api ----------- */
  function appendMenu() {
    $.each(menu.pastadisemola, function (key, value) {
      var nomePiatto = value.name,
        $html =
          "<div class='piatto'><p>" +
          nomePiatto +
          "</p></div> ";
      $("#menu .primi .pastadisemola").append($html);
    });
    $.each(menu.pastafresca, function (key, value) {
      var nomePiatto = value.name,
        $html =
          "<div class='piatto'><p>" +
          nomePiatto +
          "</p></div> ";
      $("#menu .primi .pastafresca").append($html);
    });
    $.each(menu.secondi, function (key, value) {
      var nomePiatto = value.name,
        $html =
          "<div class='piatto'><p>" +
          nomePiatto +
          "</p></div> ";
      $("#menu .elenco .secondi").append($html);
    });

    $.each(menu.piattifreddi, function (key, value) {
      var nomePiatto = value.name,
        $html =
          "<div class='piatto'><p>" +
          nomePiatto +
          "</p></div> ";
      $("#menu .piattifreddi").append($html);
    });

    $.each(menu.contorni, function (key, value) {
      var nomePiatto = value.name,
        $html =
          "<div class='piatto'><p>" +
          nomePiatto +
          "</p></div> ";
      $("#menu .contorni").append($html);
    });

    $.each(menu.hamburger, function (key, value) {
      var nomePiatto = value.name,
        ingredienti = value.ingredienti,
        $html =
          "<div class='piatto'><p>" +
          nomePiatto +
          "</p><span class='ingredienti'>" +
          ingredienti +
          "</span></div> ";
      $("#menu .elenco .hamburger").append($html);
    });

    $.each(menu.panini, function (key, value) {
      var nomePiatto = value.name,
        ingredienti = value.ingredienti,
        $html =
          "<div class='piatto'><p>" +
          nomePiatto +
          "</p><span class='ingredienti'>" +
          ingredienti +
          "</span></div> ";
      $("#menu .elenco .panini").append($html);
    });

    $.each(bar.birreSpina, function (key, value) {
      var nomeBirra = value.name,
        categoria = value.categoria,
        vol = value.vol,
        categoryElement =
          categoria != "" ?
            "<div class='categoria'>" + categoria + "</div>" :
            "",
        $html =
          categoryElement +
          "<div class='birra'><div class='container'><span>" +
          nomeBirra +
          "</span><span class='dots'></span><span>" +
          vol +
          " %</span></div></div>";
      $("#bar .birre").append($html);
    });
    $.each(bar.birreBottiglia, function (key, value) {
      var nomeBirra = value.name,
        categoria = value.categoria,
        vol = value.vol,
        categoryElement =
          categoria != "" ?
            "<div class='categoria'>" + categoria + "</div>" :
            "",
        $html =
          categoryElement +
          "<div class='birraBottiglia'><div class='container'><span>" +
          nomeBirra +
          "</span><span class='dots'></span> <span>" +
          vol +
          " %</span></div></div>";
      $("#bar .birreInBottiglia").append($html);
    });
    $.each(bar.vini, function (key, value) {
      var nome = value.name,
        categoria = value.categoria,
        descr = value.descr,
        categoryElement =
          categoria != "" ?
            "<div class='categoria'>" + categoria + "</div>" :
            "",
        $html =
          categoryElement +
          "<div class='listaVini'><div class='containerVini'><span>" +
          nome +
          "</span> <span class='descr'>" +
          descr +
          "</span></div></div>";
      $("#bar .vini").append($html);
    });
    // $.each(bar.bibite, function(key, value) {
    //   var nome = value.name,
    //     descr = value.descr,
    //     $html =
    //       "<div class='listaBibite'><div class='container'><span>" +
    //       nome +
    //       "</span> <span>" +
    //       descr +
    //       "</span></div></div> ";
    //   $("#bar .bibite").append($html);
    // });
    // $.each(bar.amari, function(key, value) {
    //   var nome = value.name,
    //     $html = "<div class='listaAmari'><span>" + nome + "</span></div> ";
    //   $("#bar .amari").append($html);
    // });
  }
});