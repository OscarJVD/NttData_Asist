async function AsistenteAws(videos, config, artyom, commandsIn, buttonsYesOrNot, actionYes, actionNo, menus, menuMain, allButtons){
    const keysConfig = {
        STORAGE: config.STORAGE_AWS,
        ID_RANDOM: config.ID_RANDOM_AWS,
        QUESTION: config.OTRA_TEMATICA
    }
    commonModules(videos, config, artyom, commandsIn, buttonsYesOrNot, actionYes, actionNo, menus, menuMain, allButtons, keysConfig)
}
