function MenuMain({
    predictions,
    sabiasQue,
    assistant,
    nttdata,
}){
    return ({
        handleNttdata,
        handlePredictions,
        handleSabiasQue,
        handleAssistant
    }) => {
        predictions.removeEventListener("click", handlePredictions)
        predictions.addEventListener("click", handlePredictions)

        sabiasQue.removeEventListener("click", handleSabiasQue)
        sabiasQue.addEventListener("click", handleSabiasQue)

        assistant.removeEventListener("click", handleAssistant)
        assistant.addEventListener("click", handleAssistant)

        nttdata.removeEventListener("click", handleNttdata)
        nttdata.addEventListener("click", handleNttdata)

    }
}