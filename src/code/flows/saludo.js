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
    artyom.dontObey();
    videos.pauseAll();
    videos.hideAll()
    videos[config.SALUDO].video.style ="display:block";
    videos[config.SALUDO].video.play();

    videos[config.SALUDO].video.removeEventListener("ended", (e)=> handleEndVIdeo(videos, config, artyom, isInit))
    videos[config.SALUDO].video.addEventListener("ended", (e)=> handleEndVIdeo(videos, config, artyom, isInit))
}


async function SabiasQue(videos, config, artyom, commandsIn, buttonsYesOrNot, predictionsYes, predictionsNo, menus, menuMain){
    const handleEndVIdeo = (artyom,commands,  buttonsYesOrNot, predictionsYes, predictionsNo, menusIn) => {
        artyom.emptyCommands();
        artyom.addCommands(commands.yesOrNo);
        artyom.obey();
        buttonsYesOrNot((button)=>{
            if(button) {
                predictionsYes(artyom, commands.main, menusIn)
            }else{
                predictionsNo(artyom, commands.main, menusIn)
            }
        })
    }
    const commands = Commands(commandsIn, videos, config, artyom,buttonsYesOrNot, menus, menuMain)
    videos.pauseAll()
    videos.hideAll()
    videos[config.SABIAS_QUE].video.play()
    videos[config.SABIAS_QUE].video.style ="display:block"
    videos[config.SABIAS_QUE].video.removeEventListener("ended", (e)=> handleEndVIdeo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
    videos[config.SABIAS_QUE].video.addEventListener("ended", (e)=> handleEndVIdeo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
}