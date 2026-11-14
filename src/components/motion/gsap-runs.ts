import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Variant = "hero" | "about" | "group";

gsap.registerPlugin(ScrollTrigger);

export function runGsap(variant: Variant, root: HTMLElement) {

  const ctx = gsap.context(() => {
    if (variant === "hero") {
      gsap.from("[data-hero-title]", {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from("[data-hero-subtitle]", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
      return;
    }

    if (variant === "about") {
      gsap.from("[data-about-image]", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-about-content]",
          start: "top 70%",
        },
      });
      gsap.from("[data-about-text]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-about-content]",
          start: "top 70%",
        },
      });
      gsap.from("[data-feature-item]", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-features-section]",
          start: "top 70%",
        },
      });
      return;
    }

    gsap.from("[data-group-image]", {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "[data-group-content]",
        start: "top 70%",
      },
    });
    gsap.from("[data-group-text]", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "[data-group-content]",
        start: "top 70%",
      },
    });
    gsap.from("[data-benefit-item]", {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "[data-benefits-section]",
        start: "top 70%",
      },
    });
  }, root);

  return () => ctx.revert();
}
