import { arr } from "./links.js";
$.getJSON(arr.professorSlideJson, function(data) {
  
    let html = '';
    data.forEach(item => {
      html += `
        <div class="prof_each d-flex justify-content-between flex-column gap-4 align-items-start">
          <span>${item.text}</span>
          <img src="${item.img}" alt="prof">
          <p>${item.name}</p>
        </div>
      `;
    });
  
    $('.professors-slide').html(html);  




    $('.professors-slide').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: true,
      autoplay: true,
        autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 992,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 1}
        }
      ]
    });

});
