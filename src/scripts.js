import { gsap } from "gsap";

const html = document.documentElement;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let scrollTop = 0;

const frameCount = 120;
const currentFrame = index => (
    `/img/WB_WebsiteScrollTest03_${index.toString().padStart(4, '0')}.jpg`

)

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

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
img.src = currentFrame(30);
canvas.width = 960;
canvas.height = 960;
img.onload = function () {
    context.drawImage(img, 0, 0);
}

const updateImage = index => {
    context.drawImage(images[index], 0, 0);
}


preloadImages()

let frameIndex = 30;
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

window.addEventListener('scroll', () => {

    scrollTop = html.scrollTop;
    // const maxScrollTop = html.scrollHeight - window.innerHeight;
    // const scrollFraction = scrollTop / maxScrollTop;

    // let frameIndex = Math.min(
    //     frameCount - 1,
    //     Math.ceil(scrollFraction * frameCount)
    // );

    frameIndex = Math.ceil((scrollTop / 8) % 60 + 60);

    console.clear();
    console.log('scrolling');
    console.log('scrollTop: ', scrollTop, 'maxScrollTop: ', 'frameIndex: ', frameIndex)

    requestAnimationFrame(() => updateImage(frameIndex + 1))
});


const tl = gsap.timeline();
// const text = document.getElementsByClassName("text");

tl.to(".line", { height: "100%", duration: 1, delay: 0.5 }, 0);
tl.to(".nav-line", { width: "100%", duration: 1, delay: 0.5 }, 0);
tl.to(".bottle", { opacity: 1, duration: 1, delay: 1 }, 0);
tl.to(".title", { opacity: 1, y: 20, duration: 0.4 }, 1.5);
tl.to(".logo", { opacity: 1, duration: 1.5 }, 0);
tl.from(".contact", { opacity: 0, duration: 1.5 }, 0);
tl.from(".purchase", { opacity: 0, duration: 1.5 }, 0);
tl.from(".text", { opacity: 0, y: 10, duration: 0.4 });



