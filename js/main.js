// Hamburger menu script
function clickNav() {
  document.querySelector(".button-container").classList.toggle("active"); // When this is clicked it will toggle the active class
  document.querySelector("#overlay").classList.toggle("open"); //When this is clicked it will toggle the overlay class
}

//Wait till document loads before running the script
document.addEventListener("DOMContentLoaded", function() {
  // When the user scrolls the page, execute myFunction
  window.onscroll = function() {
    scrollSubNav();
  };

  // Get the navbar
  const navbar = document.querySelector("#sub-nav");

  const navbarAnchor = document.querySelector(".sub-nav li");

  const maps = document.querySelector("#maps");

  //Get the sticky header
  const stickyHeader = document.querySelector(".header-sticky");
  // Get the sticky header img/logo
  const stickyHeaderImg = document.querySelector(".header-sticky img");
  // Get the offset position of the navbar
  const sticky = navbar.offsetTop - 100;
  const stickyMap = maps.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function scrollSubNav() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
      stickyHeader.style.background = "rgb(0, 0, 0, 0.9)";
      stickyHeaderImg.classList.add("fadeInDown", "active");
    } else {
      navbar.classList.remove("sticky");
      stickyHeader.style.background = "rgb(0, 0, 0, 0.5)";
      stickyHeaderImg.classList.remove("fadeInDown", "active");
    }

    // if (window.pageYOffset >= stickyMap) {
    //   navbarAnchor.classList.add("active");
    // } else {
    //   navbarAnchor.classList.remove("active");
    // }
  }

  //Get all the cuisine box class name
  const cuisine = document.getElementsByClassName("cuisine-box");
  // const cuisine = document.getElementsByClassName('activate-filter');
  console.log(cuisine);
  for (var i = 0; i < cuisine.length; i++) {
    cuisine[i].addEventListener("click", foodHidden, false); //listens for a click function of each array
  }

  function foodHidden(e) {
    e.preventDefault(); //Precent from the default action

    const circleBox = this.querySelector(".circle-box"); //Get the selected circle box from a click listener
    const cuisineBox = this.querySelector(".cuisine-box"); //Get the selected cuisine box from a click listener
    const containFilter = this.classList.contains("activate-filter"); //Check if it contains activate-filter class
    // console.log(containFilter);
    document.querySelectorAll("figure").forEach(function(figure) {
      //Do a for each loop to check for figure and add the activate filter if it doesn't have it
      figure.classList.add("activate-filter");
    });
    this.classList.remove("activate-filter"); //Remove the class when the DOM listens for the click

    const iconID = this.getAttribute("data-id"); //Get data id atrribute
    // console.log(iconID);
    const showFood = document.querySelector("#food-" + iconID);
    // console.log(showFood);

    document.querySelectorAll("article").forEach(function(article) {
      //Checks every article and if it's missing a hidden class --> Add it
      article.classList.add("hidden");
    });
    //Removes the class hidden
    document.querySelector("#food-" + iconID).classList.remove("hidden");

    if (containFilter === false) {
      //Checks if this class doesn't exist
      this.classList.add("activate-filter");
      document.querySelector("#food-" + iconID).classList.add("hidden");
    }

    // const prev = document.querySelector('#food-'+ iconID).previousElementSibling; // #foo1
    // console.log(prev);

    // const next = document.querySelector('#food-'+ iconID).nextElementSibling; // #foo3
    // console.log(next);
  }
});

$(document).ready(function() {
  //Form Trigger Javascript
  $(".form")
    .find("input, textarea")
    .on("keyup blur focus", function(e) {
      var $this = $(this),
        label = $this.prev("label");

      if (e.type === "keyup") {
        if ($this.val() === "") {
          label.removeClass("active highlight");
        } else {
          label.addClass("active highlight");
        }
      } else if (e.type === "blur") {
        if ($this.val() === "") {
          label.removeClass("active highlight");
        } else {
          label.removeClass("highlight");
        }
      } else if (e.type === "focus") {
        if ($this.val() === "") {
          label.removeClass("highlight");
        } else if ($this.val() !== "") {
          label.addClass("highlight");
        }
      }
    });

  $(".tab a").on("click", function(e) {
    e.preventDefault();

    $(this)
      .parent()
      .addClass("active");
    $(this)
      .parent()
      .siblings()
      .removeClass("active");

    target = $(this).attr("href");

    $(".tab-content > div")
      .not(target)
      .hide();

    $(target).fadeIn(600);
  });

  //Pizza map hover functions and effects

  $(".first-dot").hover(function() {
    $("#map-1").toggleClass("faded");
  });

  $(".second-dot").hover(function() {
    $("#map-2").toggleClass("faded");
  });

  $(".third-dot").hover(function() {
    $("#map-3").toggleClass("faded");
  });

  $(".fourth-dot").hover(function() {
    $("#map-4").toggleClass("faded");
  });

  // Jquery method to add filter if it's not being selected
  // $('.cuisine-box').click(function() {
  //     $('.cuisine-box').not(this).addClass('activate-filter')
  //     // $(this).toggleClass('activate-filter')
  //     // $('.food-list').addClass('hidden');
  //     const sib = $('.food-list').siblings()
  //     console.log(sib);
  // })

  $(window).scroll(function() {
    const calculation = ($(window).scrollTop() / $(document).height()) * 720;
    const calculationNegative =
      ($(window).scrollTop() / $(document).height()) * 720;
    $(
      ".mushroom-icon img, .cheese-icon img, .tomato-icon img, .salami-icon img"
    ).css("transform", "rotate(" + calculation + "deg)");
    $(".mushroom-icon, .tomato-icon").css(
      "transform",
      "translateY(" + calculation + "px)"
    );
    $(".cheese-icon, .salami-icon").css(
      "transform",
      "translateY(" + -calculationNegative + "px)"
    );

    // transform: translateY(200px);
  });
});

// menu change as you scroll down

// Cache selectors
var lastId,
  topMenu = $("#sub-nav"),
  topMenuHeight = topMenu.outerHeight() + 1,
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e) {
  var href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: offsetTop
      },
      850
    );
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function() {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function() {
    if ($(this).offset().top < fromTop) return this;
  });
  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
    menuItems
      .parent()
      .removeClass("active")
      .end()
      .filter("[href='#'" + id + "]")
      .parent()
      .addClass("active");
  }
});
