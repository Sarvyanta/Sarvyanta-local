
const GA_ID = "G-987ESMD68T";

function trackEvent(name, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll("[data-track]").forEach((element) => {

    element.addEventListener("click", () => {

      const eventName = element.dataset.track;

      const params = {
        page_type: document.body.dataset.pageType || "page",
        category: element.dataset.category || "",
        service: element.dataset.service || "",
        locality: element.dataset.locality || "",
        link_text: (element.textContent || "").trim().slice(0, 100)
      };

      trackEvent(eventName, params);
    });
  });

  let maxScroll = 0;

  window.addEventListener("scroll", () => {

    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    if (scrollable <= 0) return;

    const percent =
      Math.round((window.scrollY / scrollable) * 100);

    const milestones = [25, 50, 75, 90];

    milestones.forEach((m) => {

      if (percent >= m && maxScroll < m) {

        maxScroll = m;

        trackEvent("scroll_depth", {
          percent_scrolled: m,
          page_type: document.body.dataset.pageType || "page"
        });
      }
    });
  });
});
