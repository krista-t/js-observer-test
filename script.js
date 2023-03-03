const container = document.querySelector(".container");
const list = document.querySelector("nav.list");
const items = document.querySelectorAll(".list div");

const observer = new ResizeObserver((entries) => {
    //make array of all tabs width
    const tabsWidth = Array.from(items).map((item) => item.offsetWidth);
    // make array of all tabs width
    const totalWidth = tabsWidth.reduce((a, b) => a + b);

    // if width of container is less than totalWidth, add fluid class to tab that is overflowing
    if (entries[0].contentRect.width < totalWidth) {
        console.log("container is smaller than total width");
        // detect tab overflow
        items.forEach((item) => {
            if (item.offsetWidth > list.offsetWidth) {
                console.log("tab overflow");
            }
        });
    }
});

//observe
observer.observe(container);
observer.observe(list);
items.forEach((item) => observer.observe(item));

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const template = document.querySelector(".template");
        const clone = entry.target.cloneNode(true);
        if (!entry.isIntersecting) {
            //  console.log(entry.target);
            // clone element and add to container

            clone.classList.add("fluid");
            template.appendChild(clone);
        } else if (entry.isIntersecting) {
            console.log(entry.target);
            // remove clone elements that are in viewport and are same as entry.target
            const clones = document.querySelectorAll(".fluid");
            clones.forEach((clone) => {
                if (clone.textContent === entry.target.textContent) {
                    clone.remove();
                }
            });
        }
    });
});

observer2.observe(container);
items.forEach((item) => observer2.observe(item));
