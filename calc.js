/*jslint browser */

const services = [
    {
        title: "Базовая",
        price: 1000
    },
    {
        title: "Стандарт",
        price: 2000,
        options: [
            {title: "Обычный срок (+0 ₽)", price: 0},
            {title: "Ускоренный (+500 ₽)", price: 500},
            {title: "Срочный (+1200 ₽)", price: 1200}
        ]
    },
    {
        title: "Премиум",
        price: 3000,
        property: {title: "Персональный менеджер (+1500 ₽)", price: 1500}
    }
];

function getServiceIndex() {
    "use strict";
    const checked = document.querySelector("input[name=service]:checked");
    return parseInt(checked.value, 10);
}

function updateExtras() {
    "use strict";
    const service = services[getServiceIndex()];
    const optionsBlock = document.getElementById("options-block");
    const propertyBlock = document.getElementById("property-block");
    const select = document.getElementById("options");

    optionsBlock.classList.add("hidden");
    propertyBlock.classList.add("hidden");
    document.getElementById("property").checked = false;
    select.innerHTML = "";

    if (service.options !== undefined) {
        service.options.forEach(function (option, index) {
            const element = document.createElement("option");
            element.value = String(index);
            element.textContent = option.title;
            select.appendChild(element);
        });
        optionsBlock.classList.remove("hidden");
    }

    if (service.property !== undefined) {
        document.getElementById("property-title").textContent =
                service.property.title;
        propertyBlock.classList.remove("hidden");
    }
}

function recalculate() {
    "use strict";
    const quantityText = document.getElementById("quantity").value.trim();
    const error = document.getElementById("error");
    const result = document.getElementById("result");
    const service = services[getServiceIndex()];
    let price = service.price;

    error.textContent = "";
    result.textContent = "";

    if (quantityText.match(/^\d+$/) === null) {
        error.textContent = "Ошибка: количество должно быть целым " +
                "неотрицательным числом (допустимы только цифры).";
        return;
    }

    if (service.options !== undefined) {
        const index = parseInt(document.getElementById("options").value, 10);
        price += service.options[index].price;
    }

    if (service.property !== undefined &&
            document.getElementById("property").checked) {
        price += service.property.price;
    }

    result.textContent = "Стоимость заказа: " +
            (price * parseInt(quantityText, 10)) + " ₽";
}

window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    document.getElementById("calc-form").addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
        }
    );
    document.getElementById("quantity").addEventListener("input", recalculate);
    document.getElementById("options").addEventListener("change", recalculate);
    document.getElementById("property").addEventListener(
        "change",
        recalculate
    );
    document.querySelectorAll("input[name=service]").forEach(function (radio) {
        radio.addEventListener("change", function () {
            updateExtras();
            recalculate();
        });
    });
    updateExtras();
    recalculate();
});
