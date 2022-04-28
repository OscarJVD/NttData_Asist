
const getARandomKeyModule = (videos, keyStorage, idStartsVideos) => {
    const getKeyRandomFromAndObject = (videosRandomIn) => Object.keys(videosRandomIn)[Math.floor(Math.random() * Object.keys(videosRandomIn).length)];;
    const ID = idStartsVideos;
    const videosRandom = Object.fromEntries(Object.entries(videos).filter(([key])=> key.startsWith(ID)));
    let mustRepeat = true, keyRandom = null;
    do{
        keyRandom = getKeyRandomFromAndObject(videosRandom);
        if(window.nttdata[keyStorage].length >= Object.keys(videosRandom).length){
            window.nttdata.randomsPredictions = []
        }
        if(!window.nttdata[keyStorage].includes(keyRandom)){
            window.nttdata[keyStorage].push(keyRandom)
            mustRepeat = false
        }
    }while(mustRepeat);
    return keyRandom
}

const disableAllButtons = (buttons) => {
    Object.values(buttons).forEach(button => {
        button.disabled = true
    })
}

const enableAllButtons = (buttons) => {
    Object.values(buttons).forEach(button => {
        button.removeAttribute("disabled")
    })
}

const customizeNameConfirmationButtons = (allButtons, config)=>{
    allButtons.buttonConfirmationYes.textContent = config.BUTTONS_CONFIRM_NAME.PREDICTION.YES
    allButtons.buttonConfirmationNo.textContent = config.BUTTONS_CONFIRM_NAME.PREDICTION.NO
};
const restoreNameConfirmationButtons = (allButtons, config)=>{
    allButtons.buttonConfirmationYes.textContent = config.BUTTONS_CONFIRM_NAME.DEFAULT.YES
    allButtons.buttonConfirmationNo.textContent = config.BUTTONS_CONFIRM_NAME.DEFAULT.NO
};
const resetMenuButtonsConfirmation = (menusIn) => {
    menusIn.menuGeneral.style.display = "block"
    menusIn.menuConfirmation.style.display = "none"
}

const showQr =(menus, allButtons)=>{
    Object.values(menus).forEach(menu=> menu.style.display = "none");
    allButtons.qrCodeSpace.style.display = "block";
};

const hideQr =(menus, allButtons)=>{
    Object.values(menus).forEach(menu=> menu.style.display = "block");
    allButtons.qrCodeSpace.style.display = "none";
};


const handleEndVideo = (artyom,commands,menusIn, buttonsYesOrNotCallback, actionYes, actionNo) => {
    artyom.emptyCommands();
    artyom.addCommands(commands.yesOrNo);
    artyom.obey();
    buttonsYesOrNotCallback((button)=>{
        if(button) {
            actionYes(artyom, commands.main, menusIn)
        }else{
            actionNo(artyom, commands.main, menusIn)
        }
    })
}
const handleRandomVideo = (videos,configVideoKey, artyom,commands,menusIn, buttonsYesOrNotCallback, actionYes, actionNo)=>{
    videos.pauseAll()
    videos.hideAll()
    const video = videos[configVideoKey].video;
    video.play()
    video.style ="display:block"
    video.removeEventListener("ended", (e)=> handleEndVideo(artyom,commands,menusIn, buttonsYesOrNotCallback,  actionYes, actionNo))
    video.addEventListener("ended", (e)=> handleEndVideo(artyom,commands,menusIn, buttonsYesOrNotCallback,  actionYes, actionNo))
};


const commonModules = (videos, config, artyom, commandsIn, buttonsYesOrNot, actionYes, actionNo, menus, menuMain, allButtons, keysConfig)=>{
    const commands = Commands(commandsIn, videos, config, artyom,buttonsYesOrNot, menus, menuMain, allButtons)
    videos.pauseAll()
    videos.hideAll()
    const keyRandom  = getARandomKeyModule(videos, keysConfig.STORAGE, keysConfig.ID_RANDOM)
    const video = videos[keyRandom].video;
    video.play()
    video.style ="display:block"
    video.removeEventListener("ended", (e)=> handleRandomVideo(videos,keysConfig.QUESTION, artyom,commands,menus, buttonsYesOrNot,  actionYes, actionNo))
    video.addEventListener("ended", (e)=> handleRandomVideo(videos,keysConfig.QUESTION, artyom,commands,menus, buttonsYesOrNot,  actionYes, actionNo))
}

const addNewRecordOnStorage = async (questions, answer) => {
    try{
        const newRecord = {
            question: questions,
            answer: answer
        }
        return await fetch(`${location.origin}/api/questions`, {
            method: 'POST',
            body: JSON.stringify(newRecord),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }catch(err){
        console.log("Failed to save data",err)
    }
}
