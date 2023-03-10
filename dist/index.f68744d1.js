const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const frameCount = 60;
const currentFrame = (index)=>`/img/WB_WebsiteScrollTest${index.toString().padStart(4, "0")}.jpg`;
const preloadImages = ()=>{
    for(let i = 1; i < frameCount; i++){
        const img = new Image();
        img.src = currentFrame(i);
    }
};
const img = new Image();
img.src = currentFrame(1);
canvas.width = 1920;
canvas.height = 1920;
img.onload = function() {
    context.drawImage(img, 0, 0);
};
const updateImage = (index)=>{
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
};
window.addEventListener("scroll", ()=>{
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));
    requestAnimationFrame(()=>updateImage(frameIndex + 1));
});
preloadImages();

//# sourceMappingURL=index.f68744d1.js.map
