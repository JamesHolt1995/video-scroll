import { gsap } from "gsap";

const html = document.documentElement;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const frameCount = 120;
const currentFrame = index => (
    `/img/WB_WebsiteScrollTest03_${index.toString().padStart(4, '0')}.jpg`

)

const images = [null]
const preloadImages = () => {

    for (let i = 1; i < frameCount; i++) {
        images[i] = new Image();
        images[i].src = currentFrame(i);
    }
    setTimeout(() => {
        window.requestAnimationFrame(step);
    }, 1000);
};

const img = new Image()
img.src = currentFrame(1);
canvas.width = 960;
canvas.height = 960;
img.onload = function () {
    context.drawImage(img, 0, 0);
}

const updateImage = index => {
    context.drawImage(images[index], 0, 0);
}

window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    // const maxScrollTop = html.scrollHeight - window.innerHeight;
    // const scrollFraction = scrollTop / maxScrollTop;

    // let frameIndex = Math.min(
    //     frameCount - 1,
    //     Math.ceil(scrollFraction * frameCount)
    // );

    frameIndex = Math.ceil((scrollTop / 8) % 60 + 60);

    console.clear();
    console.log('scrollTop: ', scrollTop, 'maxScrollTop: ', 'frameIndex: ', frameIndex)

    requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()

let frameIndex = 0;
const fps = 40;

function step() {
    updateImage(frameIndex + 1)
    frameIndex++;
    if (frameIndex < 60) {
        setTimeout(() => {
            window.requestAnimationFrame(step);
        }, 1000 / fps);

    }
}


const text = document.getElementsByClassName("text");

const tl = gsap.timeline();
tl.to(".bottle", { y: 0, opacity: 1, duration: 1 });
tl.to(".text", { y: 0, opacity: 1, duration: 1 });
