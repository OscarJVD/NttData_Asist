window.alreadyLoaded = false;
function Commands(commands, videos, constants, artyom, buttonsYesOrNot, menus, mainMenu, allButtons){

    const questionNttdata = (e)=> addNewRecordOnStorage("Que tematica elijes?", commands.nttData[e])
    const questionPrediction = (e)=> addNewRecordOnStorage("Que tematica elijes?", commands.prediction[e])
    const questionSabiasQue = (e)=> addNewRecordOnStorage("Que tematica elijes?", commands.sabiasQue[e])
    const questionAws = (e)=> addNewRecordOnStorage("Que tematica elijes?", commands.aws[e]);

    const userSayYes = async (artyom, mainOut, menusIn)=>{
        try{
            artyom.emptyCommands();
            artyom.addCommands(mainOut);
            initFlow(videos, constants, artyom, false)
            resetMenuButtonsConfirmation(menusIn)
        }catch(err){
            console.log(err)
        }
    };
    const userSayNo = async (artyom, mainOut, menusIn, allButtons)=>{
        try{
            console.log(allButtons, "HERE")
            artyom.emptyCommands();
            artyom.addCommands(mainOut);
            Despedida(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons)
            resetMenuButtonsConfirmation(menusIn)
        }catch(err){
            console.log(err)
        }
    };
    if(!window.alreadyLoaded){
        window.alreadyLoaded = true;
        mainMenu({
                handleNttdata: (e)=>{
                console.log("nttdata")
                questionNttdata(0)
                NttData(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
            },
            handlePredictions:()=>{
                console.log("predictions")
                questionPrediction(0)
                Predictions(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
            },
            handleSabiasQue:()=>{
                console.log("sabiasQue")
                questionSabiasQue(0)
                SabiasQue(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
            },
            handleAssistant:()=>{
                console.log("assistant")
                questionAws(0)
                AsistenteAws(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
            }
        });
    }
    const mainOut = [
        {
            indexes:commands.assitenteAws,
            action:async function(e){
                try{
                    questionAws(e)
                    AsistenteAws(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:commands.nttData,
            action:async function(e){
                try{
                    questionNttdata(e)
                    NttData(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:commands.prediction,
            action:async function(e){
                try{
                    questionPrediction(e)
                    Predictions(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:commands.sabiasQue,
            action:async function(e){
                try{
                    questionSabiasQue(e)
                    SabiasQue(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes: commands.saludo,
            action:function(e){
                try{
                    addNewRecordOnStorage("Saludo",commands.saludo[e])
                    initFlow(videos, constants, artyom, commands);
                }catch(err){
                    console.log(err)
                }
            }
        }
    ]
    return {
        main: mainOut,
        yesOrNo:[
            {
                indexes:commands.confirmacion,
                action: (e)=> {
                    userSayYes(artyom, mainOut, menus)
                    addNewRecordOnStorage("Te gustaria ver otra tematica?",commands.confirmacion[e])
                },
            },
            {
                indexes:commands.negacion,
                action: (e)=> {
                    userSayNo(artyom, mainOut, menus, allButtons)
                    addNewRecordOnStorage("Te gustaria ver otra tematica?",commands.negacion[e])
                }
            }
        ]
    }
}