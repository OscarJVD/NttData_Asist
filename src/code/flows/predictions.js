
async function PredictionsLargeFlow(videos, config, artyom, commandsIn, buttonsYesOrNot, predictionsYes, predictionsNo, menus, menuMain, allButtons){
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
        const handleEventEndedVideo = (e)=>{
            console.log("Into when video ends, other tematic")
            handleCommingFinalQuestionVideoAnswer(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menusIn)
        };
        videos.pauseAll()
        videos.hideAll()
        videos[config.OTRA_TEMATICA].video.play()
        videos[config.OTRA_TEMATICA].video.style ="display:block"
        videos[config.OTRA_TEMATICA].video.removeEventListener("ended", handleEventEndedVideo)
        videos[config.OTRA_TEMATICA].video.addEventListener("ended", handleEventEndedVideo)

    };
    // Se ejecuta si el usuario dice que sí a otro video random por voz
    const userSayYesOverride = (artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)=>{
        const handleEndVideoEvent = ()=>{
            console.log("Into event when the user say yes to see other video")
            handleCommingFinalQuestionVideo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)
        };
        restoreNameConfirmationButtons(allButtons, config)
        resetMenuButtonsConfirmation(menus)
        videos.pauseAll()
        videos.hideAll()
        const keyRandom  = getARandomKeyModule(videos, config.STORAGE_PREDICTIONS, config.ID_RANDOM_PREDICTION)
        videos[keyRandom].video.play()
        videos[keyRandom].video.style ="display:block"
        videos[keyRandom].video.removeEventListener("ended", handleEndVideoEvent)
        videos[keyRandom].video.addEventListener("ended", handleEndVideoEvent )
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
                    userSayYesOverride(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menusIn)
                }
            },
            {
                indexes:commandsIn.negacion,
                action: (e)=> {
                    userSayNoOverride(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menusIn)
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
        const handleEndVideoPredictions = (e)=>{
            console.log("Into event finish question to ask again other video")
            handleEndVideoParticularQuestion(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menusIn)
        };
        videos.pauseAll()
        videos.hideAll()
           //video de la pregutna
        videos[config.PREDICTIONS_QUESTION_REPEAT].video.play()
        videos[config.PREDICTIONS_QUESTION_REPEAT].video.style ="display:block"
        videos[config.PREDICTIONS_QUESTION_REPEAT].video.removeEventListener("ended", handleEndVideoPredictions)
        videos[config.PREDICTIONS_QUESTION_REPEAT].video.addEventListener("ended", handleEndVideoPredictions)
    };

    const handleEndVIdeo = (artyom,commands,  buttonsYesOrNot, predictionsYes, predictionsNo, menusIn) => {
        videos.pauseAll()
        videos.hideAll()
        const handleEndVideoPredictionsRandom = (e)=>{
            console.log("Into event to reproduce random video")
            handleVideoAsking(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menusIn)
        }
        //Inmediatamente un video random
        const keyRandom  = getARandomKeyModule(videos, config.STORAGE_PREDICTIONS, config.ID_RANDOM_PREDICTION)
        videos[keyRandom].video.play()
        videos[keyRandom].video.style ="display:block"
        videos[keyRandom].video.removeEventListener("ended", handleEndVideoPredictionsRandom)
        videos[keyRandom].video.addEventListener("ended", handleEndVideoPredictionsRandom)

    }
    const commands = Commands(commandsIn, videos, config, artyom,buttonsYesOrNot, menus, menuMain, allButtons)
    const handleEndVideoMain = ()=>{
        console.log("Into event to reproduce introduction Predictions")
        handleEndVIdeo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus)
    };
    videos.pauseAll()
    videos.hideAll()
    //Introduccion
    videos[config.PREDICTIONS_INTRODUCTION].video.play()
    videos[config.PREDICTIONS_INTRODUCTION].video.style ="display:block"
    videos[config.PREDICTIONS_INTRODUCTION].video.removeEventListener("ended", handleEndVideoMain )
    videos[config.PREDICTIONS_INTRODUCTION].video.addEventListener("ended", handleEndVideoMain )
}
/**
 * @Author Andres Lobaton
 * @Description This change on the flow if for deliver a solution faster, Ideally the Predictions should be in a different flow.
 * It should has flow that allow ask if want another video or not.
*/


async function Predictions(videos, config, artyom, commandsIn, buttonsYesOrNot, actionYes, actionNo, menus, menuMain, allButtons){
    const keysConfig = {
        STORAGE: config.STORAGE_PREDICTIONS,
        ID_RANDOM: config.ID_RANDOM_PREDICTION,
        QUESTION: config.OTRA_TEMATICA_SIMPLE
    }
    commonModules(videos, config, artyom, commandsIn, buttonsYesOrNot, actionYes, actionNo, menus, menuMain, allButtons, keysConfig)
}
