let header = document.querySelector(".headerContainer h1")

header.innerHTML = header.innerText
  .split("")
  .map(function (char) {
    return "<span>" + char + "<span>"
  })
  .join("")

anime.timeline({ loop: true }).add({
  targets: ".headerContainer h1 span",
  scale: [2, 1],
  duration: 1000,
  opacity: [0, 1],
  delay: function (element, i) {
    return i * 50
  },
})

//fnction random

function random(min, max) {
  return Math.random() * (max - min) + min
}

//fullpage js
//I advise you to try and find the license key and use it else you will be the one that have to face license problem not me

var myFullpage = new fullpage("#fullpage", {
  //license
  licenseKey: "55050436-1BBC426E-9D5D7FBE-0109D735",
  //Navigation
  menu: "#menu",
  lockAnchors: false,
  anchors: ["firstPage", "secondPage", "ThirdPage"],
  navigation: true,
  navigationPosition: "right",
  navigationTooltips: ["Home", "Lesson", "Interest", "Social Media"],
  showActiveTooltip: true,
  slidesNavigation: true,
  slidesNavPosition: "bottom",

  //Scrolling
  css3: true,
  scrollingSpeed: 600,
  autoScrolling: true,
  fitToSection: true,
  fitToSectionDelay: 1000,
  scrollBar: false,
  easing: "easeInBack",
  easingcss3: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
  loopBottom: true,
  loopTop: false,
  loopHorizontal: true,
  continuousVertical: false,
  continuousHorizontal: false,
  scrollHorizontally: false,
  interlockedSlides: false,
  dragAndMove: false,
  normalScrollElements: "#element1, .element2",
  touchSensitivity: 15,

  //Accessibility
  keyboardScrolling: true,
  animateAnchor: true,
  recordHistory: true,

  //Design
  controlArrows: true,
  verticalCentered: true,

  //Custom selectors
  sectionSelector: ".section",
  slideSelector: ".slide",

  lazyLoading: true,

  //events
  onLeave: function (origin, destination, direction) {
    const section = destination.item
    const title = section.querySelector("h2")
    const titleLetter = section.querySelectorAll(".bodyContainer p")
    const titleBtn = section.querySelector(".center .btn")
    const tl = new TimelineMax({ delay: 0.4 })
    const interestCard = section.querySelector(".card")
    const interestCard2 = section.querySelector("#card2")
    const interestHead = section.querySelector("h4")
    const socialHeader = section.querySelector("#socialHeader")
    const socialBtn = section.querySelector("#socialMedia")

    tl.fromTo(title, 0.5, { y: "50", opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(
        titleLetter,
        0.5,
        { y: "50", opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.4"
      )
      .fromTo(
        titleBtn,
        0.5,
        { scale: "0.1", opacity: 0 },
        { scale: 1, opacity: 1 },
        "-=0.8"
      )
      .fromTo(interestHead, 0.5, { y: "-50", opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(
        interestCard,
        0.5,
        { x: "-50", opacity: 0 },
        { x: "0", opacity: 1 },
        "-=0.5"
      )
      .fromTo(
        interestCard2,
        0.5,
        { x: "50", opacity: 0 },
        { x: "0", opacity: 1 },
        "-=0.5"
      )
      .fromTo(
        socialHeader,
        0.8,
        {
          x: random(-100, 100),
          y: random(-100, 100),
          z: random(-100, 100),
          opacity: 0,
        },
        { x: 0, y: 0, z: 0, opacity: 1 }
      )
      .fromTo(
        socialBtn,
        0.8,
        {
          x: random(-100, 100),
          y: random(-100, 100),
          z: random(-100, 100),
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          opacity: 1,
          yoyo: true,
        },
        "-=0.8"
      )
  },
  // afterLoad: function (origin, destination, direction) {},
  // afterRender: function () {},
  // afterResize: function (width, height) {},
  // afterReBuild: function () {},
  // afterResponsive: function (isResponsive) {},
  // afterSlideLoad: function (section, origin, destination, direction) {},
  // onSlideLeave: function (section, origin, destination, direction) {},
})
