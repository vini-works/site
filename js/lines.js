document.addEventListener("DOMContentLoaded", () => {
    // Primeiro container: 200 divs
    const container1 = document.getElementById("divider__container__200");
    if (container1) {
        container1.style.display = "flex";
        container1.style.flexDirection = "column";

        for (let i = 0; i < 70; i++) {
            const line = document.createElement("div");
            line.classList.add("empty__lines");
            container1.appendChild(line);
        }
    }

    // Segundo container: 3 divs
    const container2 = document.getElementById("divider__container__5");
    if (container2) {
        container2.style.display = "flex";
        container2.style.flexDirection = "column";

        for (let i = 0; i < 3; i++) {
            const line = document.createElement("div");
            line.classList.add("empty__lines");
            container2.appendChild(line);
        }
    }

    const container3 = document.getElementById("divider__container__6");
    if (container3) {
        container3.style.display = "flex";
        container3.style.flexDirection = "column";

        for (let i = 0; i < 6; i++) {
            const line = document.createElement("div");
            line.classList.add("empty__lines");
            container3.appendChild(line);
        }
    }
});
