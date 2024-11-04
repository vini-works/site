function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const themeStylesheetLink = document.getElementById("themeStylesheetLink");
    const currentTheme = localStorage.getItem("theme") || "styleLight";

    function activateTheme(themeName) {
        themeStylesheetLink.setAttribute("href", `styles/${themeName}.css`);
    }

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            activateTheme("styleDark");
            localStorage.setItem("theme", "styleDark");
        } else {
            activateTheme("styleLight");
            localStorage.setItem("theme", "styleLight");
        }
    });

    if (currentTheme === "styleLight") {
        themeToggle.checked = false;
        activateTheme("styleLight");
    } else {
        themeToggle.checked = true;
        activateTheme("styleDark");
    }
}

initThemeToggle();