document.addEventListener('DOMContentLoaded', function() {
    const contents = document.querySelector('.carousel-contents');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const slideWidth = slides[0].offsetWidth;
    let currentIndex = 0;
    let IntervalId = null;

    function goToSlide(index) {
        if(index < 0) {
            index = slides.length -1;
        }
        else if(index >= slides.length) {
            index = 0;
        }
        contents.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
    }

    nextButton.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
        resetAutoSlide();
    });

    prevButton.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
        resetAutoSlide();
    });

    function startAutoSlide() {
        if(IntervalId !== null) return;

        IntervalId = setInterval(function() {
            goToSlide(currentIndex + 1);
        }, 10000);
    }

    function stopAutoSlide() {
        clearInterval(IntervalId);
        IntervalId = null;
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    goToSlide(0);
    startAutoSlide();
});