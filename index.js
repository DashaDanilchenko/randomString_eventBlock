
$(document).ready(function () {

    $(".triangle_right").click (() =>{
        $(".left").animate(
            {
              width: "0vw",
            },
          );
          $(".right").animate(
              {
                width: "100vw",
              },
          );
          $(".triangle_left").css("display", "block");
          $(".triangle_right").css("display", "none")
    })

    $(".triangle_left").click (() =>{
        $(".left").animate(
            {
              width: "40vw",
            },
          );
          $(".right").animate(
              {
                width: "60vw",
              },
          );
          $(".triangle_right").css("display", "block");
          $(".triangle_left").css("display", "none");
    })

    })