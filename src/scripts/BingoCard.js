document.addEventListener("change", (event) => {
    if (event.target.type !== "radio") return;

    let bingoCard = event.target.parentElement;
    while (bingoCard && !bingoCard.classList.contains("bingokaart")) {
        bingoCard = bingoCard.parentElement;
    }
    if (!bingoCard) return;

    bingoCard.classList.remove("state-0", "state-1", "state-2");
    bingoCard.classList.add(`state-${event.target.value}`);
});
