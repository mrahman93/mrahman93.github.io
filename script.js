(() => {
  // year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll(".nav-links a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  // active nav link based on scroll
  const sections = Array.from(
    document.querySelectorAll("section[id]")
  ).filter((s) => s.id !== "top");
  const linkMap = new Map();
  document.querySelectorAll(".nav-links a[href^='#']").forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    if (id) linkMap.set(id, a);
  });

  if (sections.length && linkMap.size && "IntersectionObserver" in window) {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkMap.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            linkMap.forEach((l) => l.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io2.observe(s));
  }

  // subtle parallax on hero glow (skip on touch)
  const isTouch = matchMedia("(hover: none)").matches;
  if (!isTouch) {
    const glows = document.querySelectorAll(".bg-glow");
    window.addEventListener(
      "mousemove",
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 24;
        const y = (e.clientY / window.innerHeight - 0.5) * 24;
        glows.forEach((g, i) => {
          const f = (i + 1) * 0.6;
          g.style.transform = `translate3d(${x * f}px, ${y * f}px, 0)`;
        });
      },
      { passive: true }
    );
  }
})();
