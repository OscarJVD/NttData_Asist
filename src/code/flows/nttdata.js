async function NttData(videos, config, artyom, commandsIn, buttonsYesOrNot, actionYes, actionNo, menus, menuMain, allButtons){
    const keysConfig = {
        STORAGE: config.STORAGE_NTTDATA,
        ID_RANDOM: config.ID_RANDOM_NTTDATA,
        QUESTION: config.OTRA_TEMATICA
    }
    commonModules(videos, config, artyom, commandsIn, buttonsYesOrNot, actionYes, actionNo, menus, menuMain, allButtons, keysConfig)
}
