// Linhas
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-lines]").forEach(container => {
        const lineCount = parseInt(container.getAttribute("data-lines"), 10);

        if (!isNaN(lineCount)) {
            container.style.display = "flex";
            container.style.flexDirection = "column";

            for (let i = 0; i < lineCount; i++) {
                const line = document.createElement("div");
                line.classList.add("empty__lines");
                container.appendChild(line);
            }
        }
    });
});

// Dispositivo
document.getElementById('device-info').textContent = (() => {
    const ua = navigator.userAgent;
    const device = /mobile/i.test(ua) ? 'Mobile' : /tablet/i.test(ua) ? 'Tablet' : 'Desktop';
    const browser = /chrome/i.test(ua) ? 'Chrome' : /firefox/i.test(ua) ? 'Firefox' : /safari/i.test(ua) ? 'Safari' : /edge/i.test(ua) ? 'Edge' : /msie/i.test(ua) || /trident/i.test(ua) ? 'Internet Explorer' : 'Desconhecido';
    const os = /windows/i.test(ua) ? 'Windows' : /macintosh|mac os x/i.test(ua) ? 'macOS' : /linux/i.test(ua) ? 'Linux' : /android/i.test(ua) ? 'Android' : /iphone|ipad|ipod/i.test(ua) ? 'iOS' : 'Desconhecido';

    return `[${device}] [${browser}] [${os}]`;
  })();
