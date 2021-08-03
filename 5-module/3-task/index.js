function initCarousel() {
  // ваш код...
  let slides = document.querySelector('.carousel').querySelectorAll('.carousel__slide');
  let activeSlideIndex = 0;
  let slideWidth = slides[0].offsetWidth;
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let rightArrow = document.querySelector('.carousel__arrow_right');
  leftArrow.style.display = 'none';
  document.querySelector('.carousel').addEventListener('click', function(event)  {
    if (event.target.closest('div').classList.contains('carousel__arrow_right')) {
      activeSlideIndex = (activeSlideIndex + slides.length) % slides.length + 1;
      if (activeSlideIndex == slides.length - 1) {
        rightArrow.style.display = 'none';
      } else {
        leftArrow.style.display = '';
      }
      this.querySelector('.carousel__inner').style.transform = `translateX(-${slideWidth * activeSlideIndex}px)`;
    }
    else if(event.target.closest('div').classList.contains('carousel__arrow_left')) {
      activeSlideIndex = (activeSlideIndex + slides.length) % slides.length - 1;
      if (activeSlideIndex == 0) {
        leftArrow.style.display = 'none';
      } else {
        rightArrow.style.display = '';
      }
      this.querySelector('.carousel__inner').style.transform = `translateX(-${slideWidth * activeSlideIndex}px)`;
    }
    else return;
  });
}
