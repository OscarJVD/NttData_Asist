
async function SabiasQue(videos, config, artyom, commandsIn, buttonsYesOrNot, actionYes, actionNo, menus, menuMain, allButtons){
    const keysConfig = {
        STORAGE: config.STORAGE_SABIAS_QUE,
        ID_RANDOM: config.ID_RANDOM_SABIAS_QUE,
        QUESTION: config.SABIAS_QUE_CUSTOM_QUESTION
    }
    commonModules(videos, config, artyom, commandsIn, buttonsYesOrNot, actionYes, actionNo, menus, menuMain, allButtons, keysConfig)
}
