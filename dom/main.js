const imgs = document.querySelectorAll("img");
const svg = document.querySelector("svg");

let mousedown = false;
let startX = 0;
let startY = 0;
let clickedRect = null;
let draggedRect = null;
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

// rect 생성
svg.addEventListener("mousedown", (e) => {
    if (currentMode !== "rect") return;
    mousedown = true;
    startX = e.layerX;
    startY = e.layerY;
    draggedRect = createRect(startX, startY);
})

svg.addEventListener("mouseup", (e) => {
    mousedown = false;
    if (startX == e.layerX && startY == e.layerY) {
        svg.removeChild(draggedRect);
        return;
    }
    getRectAttribute(draggedRect);
    clickedRect = draggedRect;
})

svg.addEventListener("mousemove", (e) => {
    if (mousedown) {
        setRectAttribute(draggedRect, {
            width: e.layerX - startX,
            height: e.layerY - startY
        })
    }
})


// rect 생성
function createRect(x, y) {
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    let stroke = "#000000";
    setRectAttribute(rect, {
        x: x,
        y: y,
        width: 1,
        height: 1,
        rx: 0,
        ry: 0,
        fill: '#d8d8d8',
        stroke: '#000000',
        "stroke-width": 1
    })

    //생성된 rect element에 event listener 부착
    //mouseover event
    rect.addEventListener("mouseover", (e) => {
        if (currentMode !== "transform") return;
        stroke = rect.getAttribute("stroke");
        rect.setAttribute("stroke", "#ff0000");
    });

    //mouseout event
    rect.addEventListener("mouseout", (e) => {
        if (currentMode !== "transform") return;
        rect.setAttribute("stroke", stroke);
    });

    //mouse click event
    rect.addEventListener("click", (e) => {
        if (currentMode !== "transform") return;
        clickedRect = rect;
        rect.setAttribute("stroke", stroke)
        getRectAttribute(rect);
    });
    svg.appendChild(rect);
    return rect;
}

document.querySelector(".right").addEventListener("change", (e) => {
    console.log(e.target.value);
    let option = {};
    option[e.target.id] = e.target.value;
    setRectAttribute(clickedRect, option);
});

//  change rectangle property
function setRectAttribute(rect, option) {
    if (rect === null) return;
    for (key in option) {
        rect.setAttribute(key, option[key])
    }
}

// show rectangle property 
function getRectAttribute(rect) {
    document.querySelector("#x").value = rect.getAttribute("x");
    document.querySelector("#y").value = rect.getAttribute("y");
    document.querySelector("#width").value = rect.getAttribute("width");
    document.querySelector("#height").value = rect.getAttribute("height");
    document.querySelector("#fill").value = rect.getAttribute("fill");
    document.querySelector("#rx").value = rect.getAttribute("rx");
    document.querySelector("#ry").value = rect.getAttribute("ry");
    document.querySelector("#stroke").value = rect.getAttribute("stroke");
    document.querySelector("#stroke-width").value = rect.getAttribute("stroke-width");

}
