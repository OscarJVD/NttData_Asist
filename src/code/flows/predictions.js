
async function Predictions(videos, config, artyom, commandsIn, buttonsYesOrNot, predictionsYes, predictionsNo, menus, menuMain, allButtons){
    const handleCommingFinalQuestionVideoAnswer = (artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)=>{
        artyom.emptyCommands();
        artyom.addCommands(commands.yesOrNo);
        console.log("END")
        artyom.obey();
        buttonsYesOrNot((answer)=>{
            console.log("Final desicion: ", answer)
            //si responde si va otro video random
            if(answer) {
                predictionsYes(artyom, commands.mainOut, menus)
            }else{
                //si responde No va al otro video de confirmacion de si o no hacerca de la tematica
                predictionsNo(artyom, commands.mainOut, menus, allButtons)
            }
        })
    };
    const handleCommingFinalQuestionVideo = (artyom,commands,  buttonsYesOrNot, predictionsYes, predictionsNo, menusIn)=>{
        videos.pauseAll()
        videos.hideAll()
        videos[config.OTRA_TEMATICA].video.play()
        videos[config.OTRA_TEMATICA].video.style ="display:block"
        videos[config.OTRA_TEMATICA].video.removeEventListener("ended", (e)=> handleCommingFinalQuestionVideoAnswer(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
        videos[config.OTRA_TEMATICA].video.addEventListener("ended", (e)=> handleCommingFinalQuestionVideoAnswer(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))

    };
    // Se ejecuta si el usuario dice que sí a otro video random por voz
    const userSayYesOverride = (artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)=>{
        restoreNameConfirmationButtons(allButtons, config)
        resetMenuButtonsConfirmation(menus)
        videos.pauseAll()
        videos.hideAll()
        const keyRandom  = getARandomKeyModule(videos, config.STORAGE_PREDICTIONS, config.ID_RANDOM_PREDICTION)
        videos[keyRandom].video.play()
        videos[keyRandom].video.style ="display:block"
        videos[keyRandom].video.removeEventListener("ended", (e)=> handleCommingFinalQuestionVideo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
        videos[keyRandom].video.addEventListener("ended", (e)=> handleCommingFinalQuestionVideo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
    }
    // Se ejecuta si el usuario dice que No a otro video random por voz
    const userSayNoOverride = (artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)=>{
        restoreNameConfirmationButtons(allButtons, config)
        handleCommingFinalQuestionVideo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)
    };
    const handleEndVideoParticularQuestion = (artyom,commands,  buttonsYesOrNot, predictionsYes, predictionsNo, menusIn)=>{
        //Descision en caso de si o NO
        customizeNameConfirmationButtons(allButtons, config);
        artyom.emptyCommands();
        artyom.addCommands([
            {
                indexes:commandsIn.confirmacion,
                action: (e)=> {
                    addNewRecordOnStorage("Quieres ver otra prediccion?",commandsIn.confirmacion[e])
                    userSayYesOverride(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)
                }
            },
            {
                indexes:commandsIn.negacion,
                action: (e)=> {
                    userSayNoOverride(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)
                    addNewRecordOnStorage("Quieres ver otra prediccion?",commandsIn.negacion[e])
                }
            }
        ]);
        artyom.obey();
        buttonsYesOrNot((answer)=>{
            restoreNameConfirmationButtons(allButtons, config)

            //si responde si va otro video random
            if(answer) {
                resetMenuButtonsConfirmation(menus)
                userSayYesOverride(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)
            }else{
                //si responde No va al otro video de confirmacion de si o no hacerca de la tematica
                userSayNoOverride(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)
            }
        })
    };
    const handleVideoAsking = (artyom,commands,  buttonsYesOrNot, predictionsYes, predictionsNo, menusIn)=>{
        videos.pauseAll()
        videos.hideAll()
           //video de la pregutna
        videos[config.PREDICTIONS_QUESTION_REPEAT].video.play()
        videos[config.PREDICTIONS_QUESTION_REPEAT].video.style ="display:block"
        videos[config.PREDICTIONS_QUESTION_REPEAT].video.removeEventListener("ended", (e)=> handleEndVideoParticularQuestion(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
        videos[config.PREDICTIONS_QUESTION_REPEAT].video.addEventListener("ended", (e)=> handleEndVideoParticularQuestion(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
    };

    const handleEndVIdeo = (artyom,commands,  buttonsYesOrNot, predictionsYes, predictionsNo, menusIn) => {
        videos.pauseAll()
        videos.hideAll()
        //Inmediatamente un video random
        const keyRandom  = getARandomKeyModule(videos, config.STORAGE_PREDICTIONS, config.ID_RANDOM_PREDICTION)
        videos[keyRandom].video.play()
        videos[keyRandom].video.style ="display:block"
        videos[keyRandom].video.removeEventListener("ended", (e)=> handleVideoAsking(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
        videos[keyRandom].video.addEventListener("ended", (e)=> handleVideoAsking(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))

    }
    const commands = Commands(commandsIn, videos, config, artyom,buttonsYesOrNot, menus, menuMain, allButtons)
    videos.pauseAll()
    videos.hideAll()
    //Introduccion
    videos[config.PREDICTIONS_INTRODUCTION].video.play()
    videos[config.PREDICTIONS_INTRODUCTION].video.style ="display:block"
    videos[config.PREDICTIONS_INTRODUCTION].video.removeEventListener("ended", (e)=> handleEndVIdeo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
    videos[config.PREDICTIONS_INTRODUCTION].video.addEventListener("ended", (e)=> handleEndVIdeo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
}