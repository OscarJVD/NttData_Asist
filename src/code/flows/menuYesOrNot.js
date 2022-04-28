window. alreadyLoadedPredictions = false;
function MenuYesOrNo(buttonYes, buttonNo, menuGeneral, menuCondifirmation) {
    return (actionYesCallback)=>{
        menuGeneral.style.display = "none";
        menuCondifirmation.style.display = "block";
        const handleClickYes = (e)=>{
            actionYesCallback(true)
            // resetStateButtons()
        };
        const handleClickNo = (e)=>{
            actionYesCallback(false)
            // resetStateButtons()
        };
        if(!window. alreadyLoadedPredictions){
            window. alreadyLoadedPredictions = true;
            buttonNo.removeEventListener("click", handleClickNo)
            buttonYes.removeEventListener("click", handleClickYes)

            buttonNo.addEventListener("click", handleClickNo);
            buttonYes.addEventListener("click", handleClickYes);
        }
    };
}