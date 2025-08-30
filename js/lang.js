async function loadLang(lang) {
      try {
        const res = await fetch(`lang/${lang}.json`);
        const dict = await res.json();

        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          if (dict[key]) el.textContent = dict[key];
        });

        if (dict.title) document.getElementById("page-title").textContent = dict.title;
        if (dict.description) {
          document.getElementById("page-desc").setAttribute("content", dict.description);
        }

        document.documentElement.lang = lang;
        localStorage.setItem("siteLang", lang);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    function setLang(lang) {
      loadLang(lang);
    }

    function detectLang() {
      const saved = localStorage.getItem("siteLang");
      if (saved) return saved;
      const userLang = navigator.language || navigator.userLanguage;
      return userLang.startsWith("uk") ? "uk" : "en";
    }

    loadLang(detectLang());