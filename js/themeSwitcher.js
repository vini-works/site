function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const themeStylesheetLink = document.getElementById("themeStylesheetLink");
    const currentTheme = localStorage.getItem("theme") || "styleDark";

    function activateTheme(themeName) {
        themeStylesheetLink.setAttribute("href", `styles/${themeName}.css`);
    }

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            activateTheme("styleLight");
            localStorage.setItem("theme", "styleLight");
        } else {
            activateTheme("styleDark");
            localStorage.setItem("theme", "styleDark");
        }
    });

    if (currentTheme === "styleDark") {
        themeToggle.checked = false;
        activateTheme("styleDark");
    } else {
        themeToggle.checked = true;
        activateTheme("styleLight");
    }
}

initThemeToggle();
