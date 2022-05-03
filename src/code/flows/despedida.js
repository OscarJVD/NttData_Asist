
function Despedida(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons) {
    showQr(menus, allButtons)
    console.log("En despedida")
    const handleEndFlowApp = (menus, allButtons)=>{
        hideQr(menus, allButtons)
        resetMenuButtonsConfirmation(menus)
        document.querySelector("#menu-general").style.display = "block"
        artyom.dontObey();
    };

    const handleEndVIdeo = () => {
        const handleEndEventVideo = (e)=>{
            handleEndFlowApp(menus, allButtons)
        }
        videos.pauseAll()
        videos.hideAll()
        //Inmediatamente un video random
        videos[constants.DESPEDIDA].video.play()
        videos[constants.DESPEDIDA].video.style ="display:block"
        videos[constants.DESPEDIDA].video.removeEventListener("ended", handleEndEventVideo )
        videos[constants.DESPEDIDA].video.addEventListener("ended", handleEndEventVideo )
    };

    videos.pauseAll()
    videos.hideAll()
    const keyRandom  = getARandomKeyModule(videos, constants.STORAGE_DESPEDIDA, constants.ID_RANDOM_DESPEDIDA)
    console.log(keyRandom, videos)

    videos[keyRandom].video.play()
    videos[keyRandom].video.style ="display:block"
    videos[keyRandom].video.removeEventListener("ended", handleEndVIdeo)
    videos[keyRandom].video.addEventListener("ended", handleEndVIdeo)
    /**
     * This isn't a good practice,This must be refactored on the future 2022-05-01
    */
    document.querySelector("#menu-general").style.display = "none"
    setTimeout(() => {
        document.querySelector("#menu-general").style.display = "none"
    }, 300);
}