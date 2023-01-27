
$(document).ready(function () {

    $(".triangle_right").click (() =>{
        $(".block_arrow").animate(
            {
              width: "100vw",
              left: "0"
            },
          );
         $(".right").animate({
          width: "100vw",
          left: "0"
         })
         $(".right_scroll").animate({
          width: "100vw",
          left: "0"
         })
          $(".triangle_left").css("display", "block");
          $(".triangle_right").css("display", "none")
    })

    $(".triangle_left").click (() =>{
      $(".block_arrow").animate(
        {
          width: "60vw",
          left: "40vw"
        },
      );
      $(".right").animate({
        width: "60vw",
       })
       $(".right_scroll").animate({
        width: "60vw",
       })
          $(".triangle_right").css("display", "block");
          $(".triangle_left").css("display", "none");
    })



    $(".left").draggable({
      containment: '.border_left',
      cursor: 'move',
      snap: '.border_left',
    })

    $(".right").draggable({
      containment: '.border_right',
      cursor: 'move',
      snap: '.border_right',
    })
    

    })