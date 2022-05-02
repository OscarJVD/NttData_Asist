function ArtyomInit(constants, commandsConfig){
    const artyom =  new Artyom();
    return {
        getInstance(){
            return artyom;
        },
        async createInstance(){
             await artyom.initialize({
                lang:"es-ES",// A lot of languages are supported. Read the docs !
                continuous:true,// recognize 1 command and stop listening !
                listen:true, // Start recognizing
                debug:true, // Show everything in the console
                speed:1 // talk normally
            });
            return artyom
        },
        async loadCommands(videos, buttonsYesOrNot, menus, buttonsMenu, allButtons, buttonReload, menusMain){
            const commands = Commands(commandsConfig, videos, constants, artyom, buttonsYesOrNot, menus, buttonsMenu, allButtons);
            buttonReload.addEventListener("click", ()=>{
                artyom.emptyCommands();
                artyom.addCommands(commands.main);
                Idle(videos, constants, artyom)
                resetMenuButtonsConfirmation(menus)
                enableAllButtons({ ...menusMain })
                videos.removeEventDontObey()
                videos.addEventDontObey()
                document.querySelector("#qr-code-space").style.display = "none"
                artyom.donyObey()
            })
            artyom.addCommands(commands.main);
        }
    }
};