/* =========================================================
   LANGUAGE.JS — VERSI MINIMAL
   Cuma: Ganti Bahasa + Feedback Form
   ========================================================= */

const translations = {
    en: {        about_label:   "ABOUT THE FOOD",
        about_heading: "About Gado-Gado",
        label_tagline:     "Tagline",
        label_description: "Description",
        label_history:     "History",
        label_price:       "Price",
        about_desc: "Gado-gado is a traditional Indonesian dish consisting of various vegetables, potatoes, eggs, tempeh, and delicious peanut sauce.",
        about_history_1: "Gado-gado is a traditional Indonesian dish that has been enjoyed for generations. The dish is made from a variety of vegetables, tofu, tempeh, potatoes, eggs, and other ingredients, served with a rich and flavorful peanut sauce.",
        about_history_2: "The exact origin of gado-gado is not completely known, but it is strongly associated with Indonesian cuisine, especially in Java and Jakarta. Over time, gado-gado became popular throughout Indonesia because of its simple ingredients, delicious peanut sauce, and variety of textures.",
        page_title_about: "About Food | Gado-Gado",
        page_title_home:  "Gado-Gado | Group 5",
        nav_home:  "Home",
        nav_about: "About Food",
        nav_recipe: "Recipe",
        nav_video: "Video",
        home_group:  "PK PROJECT • GROUP 5",
        home_desc:   "Discover the delicious taste of one of Indonesia's traditional foods.",
        home_button: "Discover More",
        feedback_label:      "YOUR OPINION MATTERS",
        feedback_heading:    "Give Us Your Feedback",
        feedback_name:       "Your Name",
        feedback_name_ph:    "e.g. Budi",
        feedback_rating:     "Rating",
        feedback_message:    "Your Feedback",
        feedback_message_ph: "Tell us what you think...",
        feedback_submit:     "Send Feedback",
        feedback_recent:     "Recent Feedback",
        feedback_empty:      "No feedback yet. Be the first!",
        feedback_thanks:     "Thank you for your feedback!",
        footer_team: "PK Project • Group 5"
    },
    id: {        about_label:   "TENTANG MAKANAN",
        about_heading: "Tentang Gado-Gado",
        label_tagline:     "Slogan",
        label_description: "Deskripsi",
        label_history:     "Sejarah",
        label_price:       "Harga",
        about_desc: "Gado-gado adalah makanan tradisional Indonesia yang terdiri dari berbagai sayuran, kentang, telur, tempe, dan saus kacang yang lezat.",
        about_history_1: "Gado-gado adalah makanan tradisional Indonesia yang telah dinikmati dari generasi ke generasi. Makanan ini terbuat dari berbagai sayuran, tahu, tempe, kentang, telur, dan bahan lainnya, disajikan dengan saus kacang yang kaya rasa.",
        about_history_2: "Asal-usul pasti gado-gado tidak sepenuhnya diketahui, namun makanan ini sangat erat kaitannya dengan kuliner Indonesia, terutama di Jawa dan Jakarta. Seiring waktu, gado-gado menjadi populer di seluruh Indonesia karena bahan-bahannya yang sederhana, saus kacangnya yang lezat, dan beragam teksturnya.",
        page_title_about: "Tentang Makanan | Gado-Gado",
        page_title_home:  "Gado-Gado | Kelompok 5",
        nav_home:  "Beranda",
        nav_about: "Tentang Makanan",
        nav_recipe: "Resep",
        nav_video: "Video",
        home_group:  "PK PROJECT • KELOMPOK 5",
        home_desc:   "Temukan lezatnya salah satu makanan tradisional Indonesia.",
        home_button: "Selengkapnya",
        feedback_label:      "PENDAPAT KAMU PENTING",
        feedback_heading:    "Kasih Feedback Buat Kami",
        feedback_name:       "Nama Kamu",
        feedback_name_ph:    "contoh: Budi",
        feedback_rating:     "Rating",
        feedback_message:    "Feedback Kamu",
        feedback_message_ph: "Ceritain pendapat kamu...",
        feedback_submit:     "Kirim Feedback",
        feedback_recent:     "Feedback Terbaru",
        feedback_empty:      "Belum ada feedback. Jadi yang pertama!",
        feedback_thanks:     "Makasih buat feedback-nya!",
        footer_team: "PK Project • Kelompok 5"
    }
};

let currentLang = "en";
const FB_KEY = "gadoGadoFeedbacks";

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getFeedbacks() {
    try {
        const raw = localStorage.getItem(FB_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveFeedbacks(list) {
    try {
        localStorage.setItem(FB_KEY, JSON.stringify(list));
    } catch (e) {}
}

function renderFeedbackList() {
    const container = document.getElementById("feedback-list");
    if (!container) return;

    const list = getFeedbacks();

    if (list.length === 0) {
        container.innerHTML = '<p class="fb-empty">' + translations[currentLang].feedback_empty + '</p>';
        return;
    }

    let html = "";
    for (let i = list.length - 1; i >= 0; i--) {
        const fb = list[i];
        const stars = "★".repeat(fb.rating) + "☆".repeat(5 - fb.rating);
        html += '<div class="fb-item">' +
                    '<div class="fb-item-top">' +
                        '<span class="fb-item-name">' + escapeHtml(fb.name) + '</span>' +
                        '<span class="fb-item-stars">' + stars + '</span>' +
                    '</div>' +
                    '<p class="fb-item-text">' + escapeHtml(fb.message) + '</p>' +
                '</div>';
    }
    container.innerHTML = html;
}

function setLanguage(lang) {
    if (!translations[lang]) lang = "en";
    currentLang = lang;

    const elements = document.querySelectorAll("[data-i18n]");
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const key = el.getAttribute("data-i18n");
        const text = translations[lang][key];
        if (text) el.textContent = text;
    }

    const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    for (let i = 0; i < placeholders.length; i++) {
        const el = placeholders[i];
        const key = el.getAttribute("data-i18n-placeholder");
        const text = translations[lang][key];
        if (text) el.setAttribute("placeholder", text);
    }

    document.documentElement.lang = lang;

    try {
        localStorage.setItem("gadoGadoLang", lang);
    } catch (e) {}

    const buttons = document.querySelectorAll(".lang-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
        if (buttons[i].getAttribute("data-lang") === lang) {
            buttons[i].classList.add("active");
        }
    }

    renderFeedbackList();
}

function initFeedbackForm() {
    const form = document.getElementById("feedback-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameEl = document.getElementById("fb-name");
        const ratingEl = document.getElementById("fb-rating");
        const messageEl = document.getElementById("fb-message");

        if (!nameEl || !ratingEl || !messageEl) return;

        const name = nameEl.value.trim();
        const rating = parseInt(ratingEl.value, 10);
        const message = messageEl.value.trim();

        if (!name || !message) return;

        const list = getFeedbacks();
        list.push({
            name: name,
            rating: rating,
            message: message,
            time: Date.now()
        });
        saveFeedbacks(list);

        const status = document.getElementById("feedback-status");
        if (status) {
            status.textContent = translations[currentLang].feedback_thanks;
            setTimeout(function () { status.textContent = ""; }, 3000);
        }

        form.reset();
        renderFeedbackList();
    });
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("lang-btn")) {
        const lang = e.target.getAttribute("data-lang");
        if (lang) setLanguage(lang);
    }
});

(function init() {
    let saved = null;
    try {
        saved = localStorage.getItem("gadoGadoLang");
    } catch (e) {}

    const browserLang = (navigator.language || "en").toLowerCase();
    const defaultLang = browserLang.indexOf("id") === 0 ? "id" : "en";

    initFeedbackForm();
    setLanguage(saved || defaultLang);
})();