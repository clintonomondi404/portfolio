// Active hamburger menu
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

//remove navlist
navlist.addEventListener("click",()=>{
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.toggle("open");
});

// switch between about buttons

const buttons = document.querySelectorAll(".about-btn button");
const contents = document.querySelectorAll(".content");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        contents.forEach(content => content.style.display = "none");
        contents[index].style.display = "block";
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// portfolio filter
document.addEventListener('DOMContentLoaded', function() {
    var mixer = mixitup('.portfolio-gallery',{
        selectors: {
            target: '.portfolio-box'
        },
        animation: {
            duration: 500
        }
    });
});

//Initialize swiperjs
 var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay:{
        delay:3000,
        disableOnInteraction:false,
      },

      breakpoints:{
        576:{
            slidesPerView:2,
            spaceBetween:10,
        },

        1200:{
            slidesPerView:3,
            spaceBetween:20,
        }
      }
    });

    // Skills Progrees Bar

    const first_skill = document.querySelector(".skill:first-child");
    const sk_counters = document.querySelectorAll(".counter span");
    const progress_bars = document.querySelectorAll(".skills svg circle");

    window.addEventListener("scroll",()=>{
        skillsCounter();
    })

    function hasReached(el){
        let topPosition = el.getBoundingClientRect().top;
        if(window.innerHeight >= topPosition + el.offsetHeight)return true;
        return false;
    }

    function updateCount(num,maxNum){
        let currentNum = +num.innerText;

        if(currentNum < maxNum){
            num.innerText = currentNum + 1;
            setTimeout(()=>{
                updateCount(num,maxNum)
            },12)
        }
    }

    let skillsPlayed = false;

    function skillsCounter(){
        if(!hasReached(first_skill))return;
        skillsPlayed = true;
        sk_counters.forEach((counter,i)=>{
            let target = +counter.dataset.target;
            let strokeValue = 465 -465 * (target / 100);
            progress_bars[i].style.setProperty("--target",strokeValue);

            setTimeout(()=>{
                updateCount(counter,target);
            },400)
        });

        progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
    }

    //Active menu

    let menuLi = document.querySelectorAll("header ul li a");
    let section = document.querySelectorAll('section');

    function activeMenu(){
        let len = section.length;
        while(--len && window.scrollY + 97 < section[len].offsetTop){}
        menuLi.forEach(sec => sec.classList.remove("active"));
        menuLi[len].classList.add("active");
    }
    activeMenu();
    window.addEventListener("scroll",activeMenu);
    
    //Scroll Reveal
    ScrollReveal({ 
        distance: "90px",
        duration: 1500,
        delay: 150,
        reset: true 
    });    

    ScrollReveal().reveal('.hero-info, .main-text, .proposal, .heading', { origin: 'top' });
    ScrollReveal().reveal('.about-img, .filter-buttons, .contact-info', { origin: 'left'});
    ScrollReveal().reveal('.about-content, .skills', { origin: 'right' });
    ScrollReveal().reveal('.allServices, .portfolio-gallery, .blog-box, footer, .img-hero', { origin: 'bottom' });


    document.getElementById('blogPostForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        
        const postData = {
          title: document.getElementById('title').value,
          author: document.getElementById('author').value,
          body: document.getElementById('body').value,
        };
        
        fetch('/blog-posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
      });
      