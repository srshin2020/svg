const imgs = document.querySelectorAll("img");
const svg = document.querySelector("svg");

let mousedown = false;
let startX = 0;
let startY = 0;
let currentRect = null;
let currentMode = "transform";

// toolbar on top
imgs.forEach(element => {
    element.addEventListener("click", event => {
        document.querySelector("img.on").classList.remove("on");
        event.target.classList.add("on");
        if (event.target.classList.contains("rect")) {
            currentMode = "rect";
        } else if (event.target.classList.contains("transform")) {
            currentMode = "transform";
        } else {
            currentMode = "transform";
        }
    });
});

svg.addEventListener("mousedown", (e) => {
    if (currentMode !== "rect") return;
    mousedown = true;
    startX = e.layerX;
    startY = e.layerY;
    currentRect = createRect(startX, startY);
})

svg.addEventListener("mouseup", (e) => {
    mousedown = false;
})

svg.addEventListener("mousemove", (e) => {
    if (mousedown) {
        changeRect({
            width: e.layerX - startX,
            height: e.layerY - startY
        })
    }
})

//  rectangel handling
function changeRect(option) {
    for (key in option) {
        currentRect.setAttribute(key, option[key])
    }
}

function createRect(x, y) {
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    let stroke = "#000000";
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", 5);
    rect.setAttribute("height", 5);
    rect.setAttribute("rx", 0);
    rect.setAttribute("ry", 0);
    rect.setAttribute("fill", '#d8d8d8');
    rect.setAttribute("stroke", "#000000");
    rect.setAttribute("stroke-width", "1");
    rect.addEventListener("mouseover", (e) => {
        if (currentMode !== "transform") return;
        stroke = rect.getAttribute("stroke");
        rect.setAttribute("stroke", "#ff0000");

    });
    rect.addEventListener("mouseout", (e) => {
        if (currentMode !== "transform") return;
        rect.setAttribute("stroke", stroke);
    });

    rect.addEventListener("click", (e) => {
        if (currentMode !== "transform") return;
        currentRect = rect;
        document.querySelector("#x").value = rect.getAttribute("x");
        document.querySelector("#y").value = rect.getAttribute("y");
        document.querySelector("#width").value = rect.getAttribute("width");
        document.querySelector("#height").value = rect.getAttribute("height");
        document.querySelector("#fill").value = rect.getAttribute("fill");
        document.querySelector("#rx").value = rect.getAttribute("rx");
        document.querySelector("#ry").value = rect.getAttribute("ry");
        document.querySelector("#stroke").value = stroke;
        document.querySelector("#stroke-width").value = rect.getAttribute("stroke-width");
    });
    svg.appendChild(rect);
    return rect;
}

document.querySelector(".right").addEventListener("change", (e) => {
    console.log(e.target.value);
    let option = {};
    option[e.target.id] = e.target.value;
    changeRect(option);
});