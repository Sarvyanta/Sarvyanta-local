function trackEvent(name, params = {}) {

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

}


document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll("[data-track]").forEach(function (element) {

    element.addEventListener("click", function () {

      trackEvent(
        element.dataset.track,
        {
          page_type: document.body.dataset.pageType || "page",
          category: element.dataset.category || "",
          service: element.dataset.service || "",
          locality: element.dataset.locality || "",
          link_text: (element.textContent || "")
            .trim()
            .slice(0, 100)
        }
      );

    });

  });


  let highestScroll = 0;

  window.addEventListener("scroll", function () {

    const total =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (total <= 0) {
      return;
    }

    const percentage =
      Math.round((window.scrollY / total) * 100);

    [25, 50, 75, 90].forEach(function (milestone) {

      if (
        percentage >= milestone &&
        highestScroll < milestone
      ) {

        highestScroll = milestone;

        trackEvent(
          "scroll_depth",
          {
            percent_scrolled: milestone,
            page_type:
              document.body.dataset.pageType || "page"
          }
        );

      }

    });

  });

});
