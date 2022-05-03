function initFlow(videos, config, artyom, isInit = true){
    const handleEndVIdeo = (videos, config, artyom, isInitIn)=>{
        artyom.dontObey();
        videos.pauseAll();
        videos.hideAll()
        const key = isInitIn ? config.PRESENTACION_INICIAL : config.PRESENTACION_INICIAL_ONLY_QUESTIONS
        videos[key].video.style ="display:block";
        videos[key].video.play();
    };
    if(!isInit){
        return handleEndVIdeo(videos, config, artyom, isInit)
    }
    const handleEventEndVideo = ()=>{
        handleEndVIdeo(videos, config, artyom, isInit)
    }
    artyom.dontObey();
    videos.pauseAll();
    videos.hideAll()
    videos[config.SALUDO].video.style ="display:block";
    videos[config.SALUDO].video.play();
    videos[config.SALUDO].video.removeEventListener("ended", handleEventEndVideo)
    videos[config.SALUDO].video.addEventListener("ended", handleEventEndVideo)
}

