import { cases } from "./cases.js";
import { Storage } from "./storage.js";

window.addEventListener("DOMContentLoaded", () => {
    const $ = (id) => document.getElementById(id);

    const pageIds = ["home", "cases", "investigation", "result"];

    const suspectImages = [
        "assets/images/suspect_01.png",
        "assets/images/suspect_02.png",
        "assets/images/suspect_03.png"
    ];

    let currentCase = null;
    let selectedSuspect = null;

    // ПЕРЕМИКАННЯ СТОРІНОК

    function showPage(id) {
        pageIds.forEach((pageId) => {
            $(pageId).classList.toggle("active", pageId === id);
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // ОНОВЛЕННЯ БАЛІВ

    function updateScore() {
        $("points").textContent =
            Storage.getTotalScore() * 100;
    }

    function element(tag, className, text) {
        const node = document.createElement(tag);

        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;

        return node;
    }

    // ВІДОБРАЖЕННЯ СПРАВ

    function renderCases() {
        const list = $("caseList");

        list.replaceChildren();

        const pictures = [
            "camera_closeup.png",
            "fingerprint_closeup.png",
            "confidential_document.png"
        ];

        cases.forEach((item, index) => {
            const card = element("article", "case-card");

            const image = element("img");

            image.src =
                `assets/images/${pictures[index] || "evidence_folder.png"}`;

            image.alt = `Матеріали справи: ${item.title}`;

            card.append(
                image,
                element("p", "case-label", `СПРАВА №${item.id}`),
                element("h3", "", item.title),
                element("p", "", item.description)
            );

            const button = element(
                "button",
                "btn btn-primary",
                "Відкрити справу"
            );

            button.type = "button";

            button.addEventListener("click", () => {
                openCase(item);
            });

            card.appendChild(button);
            list.appendChild(card);
        });
    }

    // ВІДКРИТТЯ СПРАВИ

    function openCase(item) {
        currentCase = item;
        selectedSuspect = null;

        $("caseTitle").textContent = item.title;
        $("caseStory").textContent = item.description;

        document.querySelector(".case-number").textContent =
            `СПРАВА №${item.id}`;

        // Докази

        const evidenceList = $("evidenceList");

        evidenceList.replaceChildren();

        item.evidences.forEach((evidence, index) => {
            const box = element("div", "evidence-item");

            box.append(
                element(
                    "strong",
                    "",
                    `ДОКАЗ №${String(index + 1).padStart(2, "0")}`
                ),
                element("p", "", evidence)
            );

            evidenceList.appendChild(box);
        });

        // Підозрювані

        const suspectList = $("suspectList");

        suspectList.replaceChildren();

        item.suspects.forEach((suspect, index) => {
            const card = element("button", "suspect-card");

            card.type = "button";
            card.setAttribute("aria-pressed", "false");

            const image = element("img");

            image.src = suspect.image || suspectImages[index];
            image.alt = `Портрет: ${suspect.name}`;

            card.append(
                element(
                    "span",
                    "suspect-number",
                    `ПІДОЗРЮВАНИЙ №${index + 1}`
                ),
                image,
                element("h4", "", suspect.name),
                element("p", "", suspect.description)
            );

            card.addEventListener("click", () => {
                selectedSuspect = suspect.name;

                suspectList.querySelectorAll(".suspect-card")
                    .forEach((other) => {
                        const active = other === card;

                        other.classList.toggle("selected", active);

                        other.setAttribute(
                            "aria-pressed",
                            String(active)
                        );
                    });
            });

            suspectList.appendChild(card);
        });

        showPage("investigation");
    }

    // ПЕРЕВІРКА ВЕРДИКТУ

    function submitVerdict() {
        if (!currentCase) return;

        if (!selectedSuspect) {
            alert("Спочатку обери підозрюваного.");
            return;
        }

        const correct =
            selectedSuspect === currentCase.correct;

        const alreadySolved =
            Storage.getScore(currentCase.id) === true;

        if (correct && !alreadySolved) {
            Storage.saveScore(currentCase.id, true);
        }

        $("resultTitle").textContent = correct
            ? "Справу розкрито!"
            : "Версія не підтвердилася";

        $("resultTitle").style.color = correct
            ? "#65c982"
            : "#d92735";

        $("resultText").textContent = correct
            ? `${alreadySolved
                ? "Цю справу вже було зараховано. "
                : "Правильно! Ти отримуєш 100 балів. "
            }${currentCase.explanation}`
            : `Правильна відповідь: ${currentCase.correct}. ${currentCase.explanation}`;

        updateScore();

        showPage("result");
    }

    // МОДАЛЬНЕ ВІКНО

    const modal = $("featureModal");
    const modalContent = $("featureModalContent");
    const modalAction = $("featureModalAction");

    function closeModal() {
        modal.hidden = true;
    }

    function openModal(
        label,
        title,
        paragraphs,
        actionText = "",
        action = null
    ) {
        $("featureModalLabel").textContent = label;
        $("featureModalTitle").textContent = title;

        modalContent.replaceChildren();

        paragraphs.forEach((text) => {
            modalContent.appendChild(
                element("p", "feature-modal-paragraph", text)
            );
        });

        modalAction.hidden = !action;
        modalAction.textContent = actionText;

        modalAction.onclick = action
            ? () => {
                closeModal();
                action();
            }
            : null;

        modal.hidden = false;
    }

    // АНАЛІЗ ВІДБИТКІВ

    function showFingerprintAnalysis() {
        const item = cases.find((entry) => entry.id === "002");

        openModal(
            "ЛАБОРАТОРІЯ / ЕКСПЕРТИЗА 002",
            "Аналіз відбитків",
            [
                "На полиці, з якої зникла книга, виявлено сліди пальців.",

                "У матеріалах справи зазначено, що відбитки Ірини збігаються зі слідами біля полиці.",

                "Це ключова зачіпка. Перед вердиктом перевір також інші докази та свідчення."
            ],
            "Перейти до справи №002",
            () => {
                if (item) openCase(item);
            }
        );
    }

    // СЕКРЕТНІ ДОКАЗИ

    function showSecretEvidence() {
        openModal(
            "ЗАКРИТИЙ АРХІВ",
            "Секретні докази",
            [
                "Обери справу, щоб відкрити додаткову зачіпку."
            ]
        );

        const secretFiles = [
            {
                id: "001",
                name: "Зникнення телефону",
                clue: "Перевір час виходу Максима з кабінету: він збігається з проміжком, коли зник телефон."
            },
            {
                id: "002",
                name: "Крадіжка в бібліотеці",
                clue: "Відбитки на полиці — ключовий доказ. Порівняй їх зі свідченнями трьох відвідувачів."
            },
            {
                id: "003",
                name: "Зниклий гаманець",
                clue: "Зверни увагу, хто перебував поруч із потерпілим і мав можливість підійти до нього."
            }
        ];

        const buttons = element("div", "secret-case-buttons");

        const clueText = element(
            "p",
            "secret-clue",
            "Секретний матеріал ще не відкрито."
        );

        const openCaseButton = element(
            "button",
            "btn btn-secondary secret-open-case",
            "Відкрити цю справу"
        );

        openCaseButton.type = "button";
        openCaseButton.hidden = true;

        secretFiles.forEach((file) => {
            const button = element(
                "button",
                "secret-case-button",
                `СПРАВА №${file.id} — ${file.name}`
            );

            button.type = "button";

            button.addEventListener("click", () => {
                clueText.textContent = file.clue;

                buttons.querySelectorAll("button")
                    .forEach((other) => {
                        other.classList.toggle(
                            "selected",
                            other === button
                        );
                    });

                openCaseButton.hidden = false;

                openCaseButton.onclick = () => {
                    closeModal();

                    const item = cases.find(
                        (entry) => entry.id === file.id
                    );

                    if (item) openCase(item);
                };
            });

            buttons.appendChild(button);
        });

        modalContent.append(
            buttons,
            clueText,
            openCaseButton
        );
    }

    // КНОПКИ НАВІГАЦІЇ

    $("startButton").addEventListener("click", () => {
        showPage("cases");
    });

    $("homeButton").addEventListener("click", () => {
        showPage("home");
    });

    $("backToCasesButton").addEventListener("click", () => {
        showPage("cases");
    });

    $("nextCaseButton").addEventListener("click", () => {
        showPage("cases");
    });

    $("restartButton").addEventListener("click", () => {
        showPage("home");
    });

    $("submitButton").addEventListener("click", submitVerdict);

    // ТРИ ОРИГІНАЛЬНІ БЛОКИ НА ГОЛОВНІЙ

    function connectDecoration(feature, callback) {
        const card = document.querySelector(
            `[data-feature="${feature}"]`
        );

        if (!card) return;

        card.addEventListener("click", callback);

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                callback();
            }
        });
    }

    connectDecoration("fingerprints", showFingerprintAnalysis);

    connectDecoration("secret", showSecretEvidence);

    connectDecoration("investigation", () => {
        showPage("cases");
    });

    // ЗАКРИТТЯ МОДАЛЬНОГО ВІКНА

    $("closeFeatureModal").addEventListener("click", closeModal);

    $("closeFeatureModalBottom").addEventListener(
        "click",
        closeModal
    );

    modal.addEventListener("click", (event) => {
        if (event.target.classList.contains("feature-modal-backdrop")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });

    // ЗАПУСК ГРИ

    renderCases();
    updateScore();
    showPage("home");
});
