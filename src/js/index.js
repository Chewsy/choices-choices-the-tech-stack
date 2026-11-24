document.querySelectorAll(".bingokaart").forEach((kaart) => {
    const radios = kaart.querySelectorAll('input[type="radio"]');

    radios.forEach((radio) => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                kaart.classList.remove("state-1", "state-2", "state-3");
                kaart.classList.add("state-" + radio.value);
            }
        });
    });
});
