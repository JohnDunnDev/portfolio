window.onload = function () {
    // SELECTORS
    const navHome = document.querySelector(".nav__home"),
      navProjects = document.querySelector(".nav__projects"),
      navAboutMe = document.querySelector(".nav__about-me"),
      navContactMe = document.querySelector(".nav__contact-me");
  
    const typewriterText = document.querySelector(".typewriter-text"),
      heroHeading = document.querySelector(".hero__heading"),
      projectsHeading = document.querySelector(".projects__heading"),
      aboutMeHeading = document.querySelector(".about-me__heading"),
      contactMeHeading = document.querySelector(".contact-me__heading");
  
    const aboutMeAge = document.querySelector(".about-me__age");
  
    //   VARIABLES
    const phrases = ["WEB DEVELOPER 💻", "WEB DESIGNER ✏️", "PROBLEM SOLVER 🤔"];
  
    let phraseIndex = 0;
  
    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: "0.25"
    };
  
    let observer = new IntersectionObserver(navObserver, observerOptions);
  
    // FUNCTIONS
  
    // Observer
    observer.observe(heroHeading);
    observer.observe(projectsHeading);
    observer.observe(aboutMeHeading);
    observer.observe(contactMeHeading);
  
    function navChange(section) {
      const previousNav = document.querySelector(".nav__link--active");
      previousNav.classList.remove("nav__link--active");
      if (section === "home") {
        navHome.classList.add("nav__link--active");
      } else if (section === "projects") {
        navProjects.classList.add("nav__link--active");
      } else if (section === "about-me") {
        navAboutMe.classList.add("nav__link--active");
      } else if (section === "contact-me") {
        navContactMe.classList.add("nav__link--active");
      }
    }
  
    function navObserver(entries, observer) {
      // Look for each of the section headings
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If a section heading is found, make that the active selection in the nav
          if (entry.target.classList.contains("hero__heading")) {
            navChange("home");
          } else if (entry.target.classList.contains("projects__heading")) {
            navChange("projects");
          } else if (entry.target.classList.contains("about-me__heading")) {
            navChange("about-me");
          } else if (entry.target.classList.contains("contact-me__heading")) {
            navChange("contact-me");
          }
        }
      });
    }
  
    // Typing text effect
    function typeWriterTyper(phrase, wait = 150) {
      let wholePhrase = phrase.split("");
      let arr = [];
      let i = 0;
      const interval = setInterval(() => {
        // Emojis span two indices of an array
        if (arr.length === wholePhrase.length - 2) {
          arr.push(wholePhrase[i]);
          i++;
          arr.push(wholePhrase[i]);
        } else {
          arr.push(wholePhrase[i]);
          i++;
        }
        typewriterText.textContent = arr.join("");
  
        if (arr.length === wholePhrase.length) {
          clearInterval(interval);
          setTimeout(() => {
            typeWriterController();
          }, 3000);
        }
      }, wait);
    }
  
    function typeWriterBackspace(wait = 150) {
      let arr = typewriterText.textContent.split("");
      // Emojis span two indices in an array, remove two to start
      arr = arr.slice(0, arr.length - 2);
      typewriterText.textContent = arr.join("");
  
      const interval = setInterval(() => {
        arr = arr.slice(0, arr.length - 1);
        typewriterText.textContent = arr.join("");
        // When we get to the end of the phrase,
        // clear the interval and type the next one
        if (arr.length === 0) {
          clearInterval(interval);
          typeWriterTyper(phrases[phraseIndex]);
        }
      }, wait);
    }
  
    function typeWriterController() {
      phraseIndex++;
      if (phraseIndex === phrases.length) {
        phraseIndex = 0;
      }
      typeWriterBackspace();
    }
  
    setTimeout(() => typeWriterController(), 3000);
  
    // Change age in about me
    function changeAge() {
      let today = new Date(),
        birthYear = new Date(1991, 0, 29),
        currentAge = 20;
      today.getMonth() >= 1 || today.getDate() >= 30
        ? (currentAge = today.getFullYear() - birthYear.getFullYear())
        : today.getFullYear() - birthYear.getFullYear() - 1;
      aboutMeAge.innerText = currentAge;
    }
    changeAge();
  };
  