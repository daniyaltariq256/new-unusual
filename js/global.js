// console.log(window.location.hostname, "checking host");

if (window.location.hostname === "academy.unusual.vc") {
  // alert("");
  // window.location.href = "https://new.unusual.vc/academy";
}

function initAnimationSetup() {
  gsap.registerPlugin(
    ScrollTrigger,
    Observer,
    Flip,
    DrawSVGPlugin,
    SplitText,
    MorphSVGPlugin,
    MotionPathPlugin
  );

  //Set default duration for gsap
  gsap.defaults({
    ease: "power2.inOut",
    // ease: "power3.out",
    duration: 0.75,
  });

  // let typeSplit = new SplitText(`[text-split]`, {
  //   types: "words, chars",
  //   // tagName: "span",
  //   linesClass: "magic-line",
  //   wordsClass: "magic-word",
  // });
}

const uniqueId = function () {
  return "id-" + Math.random().toString(36).slice(2, 18);
};

setInitialSVGState = (type, name, target) => {
  let paths;
  let paths_with_dashes;
  let scale_eles = null;
  let scale_eles_no_origin = null;
  let fadein_eles;

  // return;

  let selector_name;

  if (type === "id") {
    selector_name = "#" + name;
  } else if (type === "class") {
    selector_name = "." + name;
  } else {
    selector_name = name;
  }

  if (type === undefined) {
    paths = document.querySelectorAll("svg path:not([no-draw])");
  } else if (target === undefined) {
    paths_with_dashes = $(`${selector_name} .maskReveal .dashedElement`);
    paths_with_dashes.attr("no-draw", "");

    paths = document.querySelectorAll(
      `${selector_name} path:not([no-draw]),
        ${selector_name} circle:not([no-draw]),
        ${selector_name} rect:not([no-draw]),
        ${selector_name} line:not([no-draw])`
    );
    scale_eles = document.querySelectorAll(`${selector_name} [scale-effect]`);
    fadein_eles = document.querySelectorAll(`${selector_name} [fadein-effect]`);
    scale_eles_no_origin = document.querySelectorAll(
      `${selector_name} [scale-effect-no-origin-interfere]`
    );
  } else if (target === "path") {
    paths = document.querySelectorAll(`path${selector_name}:not([no-draw])`);
  }

  if (scale_eles) {
    gsap.set(scale_eles, {
      transformOrigin: "50% 50%",
    });
  }
  if (fadein_eles) {
    gsap.set(fadein_eles, {
      opacity: 0,
    });
  }
  if (scale_eles) {
    gsap.set(scale_eles, {
      opacity: 0,
      scale: 0,
    });
  }
  if (scale_eles_no_origin) {
    gsap.set(scale_eles_no_origin, {
      opacity: 0,
      scale: 0,
    });
  }

  // return;

  try {
    //set up path, line, svg, circle with dashes
    paths_with_dashes.each(function (index) {
      //path, line, rect
      const current_ele = $(this);
      const current_MaskReveal_ele = current_ele.closest(".maskReveal");
      const current_Mask_ele = current_ele.closest("svg").find(".theMask");

      const maskId = uniqueId();
      current_Mask_ele.attr("id", maskId);
      current_MaskReveal_ele.attr("mask", `url(#${maskId})`);

      let clone = current_ele.clone();
      clone.removeAttr("stroke-dasharray");
      gsap.set(clone, { attr: { stroke: "white" }, drawSVG: 0 });
      current_Mask_ele.append(clone);
    });

    gsap.set(paths, {
      drawSVG: "0%",
    });
  } catch (error) {
    // Code to handle the error
    console.log("An error occurred:", error);
  }
};

drawSVG = (type, name, { duration, selector, reverse } = {}) => {
  if (!duration) {
    duration = 2;
  }

  // return;

  // Get the path(s) to animate based on the type and name parameters
  let paths;
  let scale_eles;
  let scale_eles_no_origin;
  let fadein_eles;

  let selector_name;

  if (type === "id") {
    selector_name = "#" + name;
  } else if (type === "class") {
    selector_name = "." + name;
  } else {
    selector_name = name;
  }

  if (!type) {
    paths = document.querySelectorAll("svg path:not([no-draw])");
  } else if (!selector) {
    paths_with_dashes = $(`${selector_name} svg .theMask .dashedElement`);

    paths = document.querySelectorAll(
      `${selector_name} path:not([no-draw]),
        ${selector_name} circle:not([no-draw]),
        ${selector_name} rect:not([no-draw]),
        ${selector_name} line:not([no-draw])`
    );
    scale_eles = document.querySelectorAll(`${selector_name} [scale-effect]`);
    fadein_eles = document.querySelectorAll(`${selector_name} [fadein-effect]`);
    scale_eles_no_origin = document.querySelectorAll(
      `${selector_name} [scale-effect-no-origin-interfere]`
    );
  } else if (selector === "path") {
    paths = document.querySelectorAll(`path${selector_name}:not([no-draw])`);
  }
  // return;
  gsap
    .timeline()

    .add(function () {
      if (reverse) {
        gsap
          .timeline()
          .to(paths, {
            drawSVG: "0%",
            duration,
            ease: "power2.inOut",
          })
          .to(
            paths_with_dashes,
            {
              duration,
              // delay: 0.5,
              stagger: {
                amount: 0.5,
              },
              drawSVG: "0%",
            },
            ">-0.35"
          );
      } else {
        gsap
          .timeline()
          .fromTo(
            paths,
            {
              drawSVG: "0%",
            },
            {
              drawSVG: "100%",
              duration,
              ease: "power2.inOut",
            }
          )
          .to(
            paths_with_dashes,
            {
              duration,
              // delay: 0.5,
              stagger: {
                amount: 0.5,
              },
              drawSVG: "100%",
            },
            ">-0.35"
          );
      }
    });

  if (scale_eles) {
    gsap.to(scale_eles, {
      opacity: 1,
      scale: 1,
      delay: 0.5,
    });
  }
  if (scale_eles_no_origin) {
    gsap.to(scale_eles_no_origin, {
      opacity: 1,
      scale: 1,
      delay: 0.5,
    });
  }
  if (fadein_eles) {
    gsap.to(fadein_eles, {
      opacity: 1,
    });
  }
};

function drawSVGgroup() {}

function currentViewPort() {
  const windowWidth = window.innerWidth;
  let viewport;
  if (windowWidth > 991) {
    viewport = "desktop";
  }
  if (windowWidth <= 991 && windowWidth > 767) {
    viewport = "tablet";
  }
  if (windowWidth <= 767) {
    viewport = "mobile";
  }

  return viewport;
}

let currentViewport = currentViewPort();
let lastWindowWidth = window.innerWidth;

window.addEventListener("resize", () => {
  const newWindowWidth = window.innerWidth;
  const newViewport = currentViewPort();

  if (newWindowWidth !== lastWindowWidth && newViewport !== currentViewport) {
    currentViewport = newViewport;
    location.reload(); // Refresh the browser
  }
});

setTimeout(function () {
  $(`[parallax-effect]`).each(function () {
    if (currentViewPort() === "desktop") {
      let elementHeight = $(this).innerHeight();
      // console.log(elementHeight);
      let parallax_type = $(this).attr("parallax-type");
      let parallax_faster = $(this).attr("parallax-faster");
      let parallax_start = $(this).attr("parallax-start");
      let parallax_end = $(this).attr("parallax-end");
      // let parallax_end_random = Math.random() * (35 - 5) + 5;
      let parallax_end_random = parallax_faster
        ? -1 * (Math.floor(Math.random() * (80 - 50 + 1)) - 80)
        : -1 * (Math.floor(Math.random() * (60 - 30 + 1)) - 60);
      let parallax_start_random = parallax_faster
        ? 80 - 50 + 50
        : Math.random() * (60 - 30) + 30;

      if (parallax_type === "image") {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: $(this),
              markers: true,
              scrub: 0.75,
            },
            defaults: {
              ease: "none",
            },
          })
          .fromTo(
            $(this),
            {
              backgroundPosition: `50% ${
                parallax_start !== undefined ? parallax_start : 100
              }%`,
            },
            {
              backgroundPosition: `50% ${
                parallax_end !== undefined ? parallax_end : 0
              }%`,
            }
          );
      } else {
        // if (elementHeight > 480) {
        //   // $(this).css("backgroundColor", "black");
        //   parallax_end_random = parallax_faster
        //     ? -1 * (Math.floor(Math.random() * (18 - 12 + 1)) - 18)
        //     : -1 * (Math.floor(Math.random() * (10 - 5 + 1)) - 10);
        //   parallax_start_random = parallax_faster
        //     ? Math.random() * (18 - 12) + 12
        //     : Math.random() * (10 - 5) + 5;
        //   // return;
        // }
        gsap
          .timeline({
            scrollTrigger: {
              trigger: $(this),
              scrub: 0.75,
              // markers: true,
              start: "0% 100%",
              end: "100% 0%",
            },
            // defaults: {
            //   ease: "none"
            // }
          })
          .fromTo(
            $(this),
            {
              y: `${
                parallax_start !== undefined
                  ? parallax_start
                  : parallax_start_random
              }`,
              // yPercent: `${parallax_start !== undefined ? parallax_start : 25}`
            },
            {
              y: `${
                parallax_end !== undefined
                  ? parallax_end
                  : parallax_end_random * -1
              }`,
            }
          );
      }
    }
  });
}, 1000);
// }, 1500);
$(`[fade-animation]`).each(function (index) {
  // if (windowViewPort !== "desktop") return;
  let triggerElement = $(this);
  let delay_duration = $(this).attr("delay-duration");
  if (delay_duration === undefined) {
    delay_duration = 0.1;
  }

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 80%",
      end: "bottom center",
      toggleActions: "play none none none",
      // markers: true
      // scrub: 1
      // once: true
    },
  });
  tl.fromTo(
    triggerElement,
    {
      opacity: 0,
      // y: 10
      // scale: 0.92,
    },
    {
      delay: delay_duration,
      // y: 0,
      // scale: 1,
      ease: "power1.inOut",
      duration: 0.75,
      opacity: 1,
    }
  );
});

function mimicElementSize(sourceSelector, targetSelector) {
  const sourceElement = document.querySelector(sourceSelector);
  const targetElement = document.querySelector(targetSelector);

  if (sourceElement && targetElement) {
    const sourceRect = sourceElement.getBoundingClientRect();

    // Set dimensions to target element
    targetElement.style.width = `${sourceRect.width}px`;
    targetElement.style.height = `${sourceRect.height}px`;
  } else {
    console.error("Source or target element not found.");
  }
}

$(`[sizes-mimic-target]`).each(function () {
  const sourceSelector = $(this).attr("sizes-mimic-target");
  const targetClasses = $(this).attr("class");
  const targetSelector = `.${targetClasses.replace(/\s+/g, ".")}`;
  console.log(sourceSelector, targetSelector);
  mimicElementSize(sourceSelector, targetSelector);
});

$(`[parallax_effect]`).each(function () {
  if (currentViewPort() === "desktop") {
    let elementHeight = $(this).innerHeight();
    // console.log(elementHeight);
    let parallax_type = $(this).attr("parallax_type");
    let parallax_faster = $(this).attr("parallax_faster");
    let parallax_start = $(this).attr("parallax_start");
    let parallax_end = $(this).attr("parallax_end");
    // console.log("parallax effect running", parallax_start, parallax_end);
    // let parallax_end_random = Math.random() * (35 - 5) + 5;
    let parallax_end_random = parallax_faster
      ? -1 * (Math.floor(Math.random() * (50 - 45 + 1)) - 50)
      : -1 * (Math.floor(Math.random() * (30 - 20 + 1)) - 30);
    let parallax_start_random = parallax_faster
      ? 50 - 45 + 45
      : Math.random() * (30 - 20) + 20;

    switch (parallax_type) {
      case "image":
        gsap
          .timeline({
            scrollTrigger: {
              trigger: $(this),
              scrub: 0.75,
            },
            defaults: {
              ease: "none",
            },
          })
          .fromTo(
            $(this),
            {
              backgroundPosition: `50% ${
                parallax_start !== undefined ? parallax_start : 100
              }%`,
            },
            {
              backgroundPosition: `50% ${
                parallax_end !== undefined ? parallax_end : 0
              }%`,
            }
          );
        break;
      default:
        if (elementHeight > 480) {
          // $(this).css("backgroundColor", "black");
          parallax_end_random = parallax_faster
            ? -1 * (Math.floor(Math.random() * (18 - 12 + 1)) - 18)
            : -1 * (Math.floor(Math.random() * (10 - 5 + 1)) - 10);
          parallax_start_random = parallax_faster
            ? Math.random() * (18 - 12) + 12
            : Math.random() * (10 - 5) + 5;
          // return;
        }
        gsap
          .timeline({
            scrollTrigger: {
              trigger: $(this),
              scrub: 0.75,
              // markers: true,
              start: "0% 100%",
              end: "100% 0%",
            },
            // defaults: {
            //   ease: "none"
            // }
          })
          .fromTo(
            $(this),
            {
              yPercent: `${
                parallax_start !== undefined
                  ? parallax_start
                  : parallax_start_random
              }`,
              // yPercent: `${parallax_start !== undefined ? parallax_start : 25}`
            },
            {
              yPercent: `${
                parallax_end !== undefined
                  ? parallax_end
                  : parallax_end_random * -1
              }`,
            }
          );
    }
  }
});

// Define breakpoints for tablet and mobile
const BREAKPOINT_TABLET = 992;
const BREAKPOINT_MOBILE = 768;

// Initial state to keep track of current device type
let currentDevice = getDeviceType(window.innerWidth);

// Function to get the current device type
function getDeviceType(width) {
  if (width >= BREAKPOINT_TABLET) {
    return "desktop";
  } else if (width >= BREAKPOINT_MOBILE) {
    return "tablet";
  } else {
    return "mobile";
  }
}

// Callback functions for each device type
function onEnterDesktop() {
  // console.log("Entered Desktop (>= 992px)");
}

function onEnterTablet() {
  // console.log("Entered Tablet (>= 768px and < 992px)");
}

function onEnterMobile() {
  // console.log("Entered Mobile (< 768px)");
}

// Function to handle resize events
function handleResize() {
  const newDevice = getDeviceType(window.innerWidth);

  if (newDevice !== currentDevice) {
    if (newDevice === "desktop") {
      onEnterDesktop();
    } else if (newDevice === "tablet") {
      onEnterTablet();
    } else if (newDevice === "mobile") {
      onEnterMobile();
    }

    // Update the current device type
    currentDevice = newDevice;
  }
}

// Add event listener for resize event
window.addEventListener("resize", handleResize);

// Initial check
handleResize();

function section_w_svgs() {
  $("[section_w_svgs]").each(function (index) {
    const id = `section_w_svgs_${index}`;
    $(this).attr("id", id);

    setInitialSVGState("id", id);

    const triggerEle = $(this);
    gsap.timeline({
      scrollTrigger: {
        trigger: triggerEle,
        start: "top 50%",
        once: true,
        onEnter: () => {
          drawSVG("id", id, { speed: 1.5, reverse: false });
        },
        // end: "+=60%",
        // markers: true,
        // scrub: true,
        // pin: triggerEle,
      },
    });
  });
}
function initNav() {
  //   $(".nav_link:not([no_hover='true'])").on(
  //     "mouseenter mouseleave",
  //     function () {
  //       const current_link = $(this);
  //       current_link.toggleClass("state_open");
  //       current_link
  //         .find(".nav_link_left,.nav_link_arrow_wrapper,.nav_link_icon")
  //         .toggleClass("state_open");
  //     }
  //   );

  let hamburger_clickable = true;
  $(".hamburger").on("click", function () {
    if (!hamburger_clickable) return;
    // return;

    // const hamburger_open = $(this).find(".hamburger_icon.open");
    // const hamburger_close = $(this).find(".hamburger_icon.close");
    const nav = $(".navigation");
    const nav_screen_section = $(".navigation_screen_section");
    const nav_open = nav.attr("is_open");
    if (nav_open !== "true") {
      nav.attr("is_open", "true");
      nav_screen_section.attr("is_open", "true");

      // if (currentViewPort() === "desktop") {
      gsap.set("body", {
        overflow: "hidden",
      });
      // }

      $(
        `.navigation_screen,
        .navigation_screen_inner`
      ).removeClass("is_closed");
      gsap
        .timeline({
          //   delay: 0.25,
          onStart: () => {
            hamburger_clickable = false;
          },
          onComplete: () => {
            hamburger_clickable = true;
          },
        })
        .fromTo(
          ".navigation_screen_bg",
          {
            x: "100%",
          },
          {
            x: "0%",
            stagger: {
              each: 0.25,
              from: "start",
            },
          }
        )
        .to(
          ".application_btn_open.desktop, .application_announcement_close, .uv_logo_page",
          {
            opacity: 0,
            pointerEvents: "none",
            y: -10,
            // scale: 0,
          },
          "<"
        )
        .fromTo(
          ".navigation_screen_inner_top, .navigation_screen_inner_bottom",
          {
            opacity: 0,
            y: 10,
            // scale: 0,
          },
          {
            opacity: 1,
            y: 0,
          },
          "<+1"
        )
        .add(function () {
          // if (currentViewPort() !== "desktop") {
          //   gsap.to(".navigation_screen_section", {
          //     backgroundColor: "white",
          //   });
          // }
        });
    } else {
      nav.attr("is_open", "false");
      nav_screen_section.attr("is_open", "false");

      gsap
        .timeline({
          onStart: () => {
            hamburger_clickable = false;
          },
          onComplete: () => {
            hamburger_clickable = true;
            gsap.set("body", {
              overflow: "unset",
            });
          },
        })
        .to(
          ".navigation_screen_inner_top, .navigation_screen_inner_bottom",

          {
            opacity: 0,
            y: -10,
          },
          "<"
        )
        .fromTo(
          ".application_btn_open.desktop, .application_announcement_close, .uv_logo_page",
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            // scale: 1,
            //   stagger: {
            //     from: "start",
            //     each: 0.25,
            //   },
          },
          "<"
        )
        .to(
          ".navigation_screen_bg",
          {
            x: "-100%",
            stagger: {
              each: 0.25,
              from: "end",
            },
          },
          "<"
        )

        .add(function () {
          $(
            `.navigation_screen,
            .navigation_screen_inner
            `
          ).addClass("is_closed");

          // gsap.to(".navigation_screen_section", {
          //   backgroundColor: "transparent",
          // });
        });
    }
  });
}

///Gradients pulsing
gsap.fromTo(
  `.gradient`,
  { scale: 0.75, opacity: 0.5 },
  {
    scale: 1.75,
    opacity: 1,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: Power0.easeNone,
  }
);

///Input - Newsletter
function newLetterForms() {
  setTimeout(() => {
    $(".newsletter_form_wrapper").each(function () {
      const current_form_wrapper = $(this);
      const id = current_form_wrapper.attr("id");
      const current_input = current_form_wrapper.find("input[type='email']");

      $(document).on("click", function (event) {
        // Replace '#yourElement' with target element's selector
        if (!$(event.target).closest(`#${id}`).length) {
          // Clicked outside the element
          // console.log("Clicked outside the element!");
          // console.log("Clicked outside the element!", current_input.val());
          if (current_input.val()) {
            current_form_wrapper.attr("is_active", "true");
          } else {
            current_form_wrapper.attr("is_active", "false");
          }
        }
      });

      const hubspot_email_input = current_form_wrapper.find(
        ".hubspot_newsletter_embed input[type='email']"
      );
      const hubspot_email_submit_btn_wrapper = current_form_wrapper.find(
        ".hs_submit.hs-submit"
      );
      // current_form_wrapper
      //   .find(".newsletter_btn_wrapper")
      //   .prepend(hubspot_email_submit_btn_wrapper);
      gsap.set(hubspot_email_submit_btn_wrapper, {
        pointerEvents: "none",
      });
      $('.newsletter_form_wrapper input[type="email"]').attr("placeholder", "");

      // $("form").submit(function () {
      //   $("input[type=submit]", this).attr("disabled", "disabled");
      // });

      $(".newsletter_btn_wrapper").on("click", function () {
        const current_form_wrapper = $(this).closest(".newsletter_wrapper");
        const other_form_wrapper = $(".newsletter_wrapper").not(
          current_form_wrapper
        );

        const cloned_other_form_wrapper = other_form_wrapper.clone();
        other_form_wrapper.remove();

        // setTimeout(() => {
        current_form_wrapper
          .find(".hs_submit.hs-submit input[type='submit']")
          .click();
        // }, 20);

        console.log();

        setTimeout(() => {
          if (
            current_form_wrapper.find(".submitted-message p span").length !== 0
          ) {
            current_form_wrapper
              .find(
                ".newsletter_label, .newsletter_line, .newsletter_btn_wrapper"
              )
              .css({
                opacity: 0,
                pointerEvents: "none",
                display: "none",
              });

            current_form_wrapper.find(".submitted-message p span").css({
              color: "black",
              fontSize: "1rem",
              textAlign: "start",
            });
            current_form_wrapper.find(".submitted-message p").css({
              textAlign: "start",
            });
            current_form_wrapper.find(".newsletter_input").css({
              paddingRight: "0rem",
            });

            $(".navigation_screen_section")
              .find(".newsletter_form_wrapper")
              .prepend(cloned_other_form_wrapper);
          }
        }, 700);
      });

      // $(".newsletter_form_wrapper input[type='email']").on("input", function (e) {
      //   const fake_input_value = $(this).val();

      //   console.log("Input value changed to: " + fake_input_value);

      //   $(".hubspot_newsletter_embed input[type='email']").val(fake_input_value);
      // });
    });
    $(".newsletter_form_wrapper").on("click", function () {
      const current_form_wrapper = $(this);
      current_form_wrapper.attr("is_active", "true");
    });
  }, 350);
}

function Clamp_value({ up, value, min_value, max_value, increment }) {
  if (up && value <= max_value) {
    value += increment;

    if (value >= max_value) {
      value = max_value;
      up = false;
    }
  } else {
    value -= increment;

    if (value <= min_value) {
      value = min_value;
      up = true;
    }
  }

  return { value, up };
}

function cards_fading_in() {
  $(".section").each(function (index) {
    const triggerEle = $(this);
    const fading_ele_cards = triggerEle.find("[fading_ele]");

    if (currentViewPort() === "desktop") {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: triggerEle,
            start: "top 70%",
            end: "bottom center",
            // markers: true,
            once: true,
            onEnter: () => {},
          },
        })
        .from(fading_ele_cards, {
          autoAlpha: 0,
          opacity: 0,
          y: 10,
          stagger: 0.2,
          // scale: 0.75,
        });
    } else {
      fading_ele_cards.each(function () {
        const triggerEle = $(this);
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerEle,
              start: "top 80%",
              end: "top 0%",
              // markers: true,
              // once: true,
            },
          })
          .from(triggerEle, {
            opacity: 0,
            y: 10,
          });
      });
    }
  });
}

function FaqSection() {
  $(".faq_section").each(function () {
    const faq_section_original = $(this);

    const triggerEle = $(this);
    const faq_items = triggerEle.find(".faq_accordion_item");
    gsap
      .timeline({
        scrollTrigger: {
          trigger: triggerEle,
          start: "top 85%",
          end: "bottom center",
          // markers: true,
          once: true,
          onEnter: () => {},
        },
      })
      .from(faq_items, {
        opacity: 0,
        y: 15,
        stagger: 0.15,
      });

    let faq_items_original = faq_section_original.find(".faq_accordion_item");
    faq_items_original.each(function (index) {
      $(this).attr("order", index + 1);
    });

    const faq_section_clone = faq_section_original.clone();
    gsap.set(faq_section_clone, {
      opacity: 0,
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      zIndex: -10,
    });
    faq_section_clone.attr("is_original", "false");
    faq_section_original.after(faq_section_clone);
    gsap.set(faq_section_clone, {
      backgroundColor: "rgba(247, 247, 247, 0.75)",
    });

    let faq_items_cloned = faq_section_clone.find(".faq_accordion_item");

    faq_items_original.attr("is_collapsed", "true");
    faq_items_original.each(function (index) {
      const order = index + 1;
      const current_faq_item = $(this);
      const collasped_height = current_faq_item.outerHeight();

      $(`.faq_accordion_item[order="${order}"]`).attr({
        collasped_height,
      });
    });

    faq_items_original.on("click", function () {
      const current_faq_item = $(this);
      const is_collapsed = current_faq_item.attr("is_collapsed");
      const is_disabled = current_faq_item.attr("is_disabled");
      if (is_disabled === "true" && currentViewPort() !== "mobile") return;

      const collasped_height = current_faq_item.attr("collasped_height");
      const expanded_height = current_faq_item.attr("expanded_height");
      const total_lines = current_faq_item.attr("total_lines");

      const duration_per_line = 0.05;
      const total_animation_duration = duration_per_line * total_lines;

      const animation_settings = {
        duration: total_animation_duration,
        // ease: "power2.inOut",
      };

      if (is_collapsed !== "true") {
        // faq_items_original.attr("is_collapsed", "false");
        gsap
          .timeline({
            onComplete: () => {
              current_faq_item.attr("is_collapsed", "true");
            },
          })
          .to(current_faq_item, {
            height: collasped_height,
            ...animation_settings,
          });
      } else {
        gsap
          .timeline({
            onComplete: () => {
              current_faq_item.attr("is_collapsed", "false");
            },
          })
          .to(current_faq_item, {
            height: expanded_height,
            ...animation_settings,
          });
      }
    });

    function update_line_info() {
      // console.log("updating executed");
      faq_items_cloned.each(function (index) {
        const order = index + 1;
        const current_faq_item = $(this);
        const current_height = current_faq_item.outerHeight();
        const content = current_faq_item.find(".faq_accordion_item_content");
        const current_text_pattern_line_height = parseFloat(
          content.css("line-height")
        );
        const current_marginTop = parseFloat(content.css("margin-top"));
        const current_text_pattern_height = content.height();
        const total_lines = Math.round(
          current_text_pattern_height / current_text_pattern_line_height
        );

        const faq_item_is_disabled = total_lines <= 2;

        $(`.faq_accordion_item[order="${order}"]`).attr({
          expanded_height: current_height,
          is_disabled: faq_item_is_disabled,
          total_lines,
          current_marginTop,
        });

        // console.log(
        //   current_text_pattern_line_height,
        //   current_text_pattern_height,
        //   total_lines
        // );
      });
    }

    update_line_info();

    window.addEventListener("resize", function () {
      // Your code here
      update_line_info();
    });
  });
}

function footer_section() {
  $(".footer_card_wrapper").each(function () {
    const triggerEle = $(this);
    gsap
      .timeline({
        scrollTrigger: {
          trigger: triggerEle,
          start: "top 90%",
          end: currentViewPort() === "desktop" ? "85% bottom" : "50% bottom",
          scrub: 1,
          //   markers: true,
          //   once: true,
        },
      })
      .fromTo(
        ".cta_card_line_wrapper_svg.top path",
        { drawSVG: "100% 100%" },
        { duration: 3, drawSVG: "0% 100%" }
      );
  });
}

$("document").ready(function () {
  initAnimationSetup();
  initNav();
  newLetterForms();
  cards_fading_in();
  footer_section();

  if (currentViewPort() === "desktop") {
  }
  FaqSection();
  $(window).scroll(function () {
    //check if section is on screen after scroll
  });
});
