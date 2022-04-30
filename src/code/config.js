let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function configApp(){
    const BASE_URL = './static/videos/';
    const ID_RANDOM_PREDICTION = guid();
    const ID_RANDOM_DESPEDIDA = guid();
    const ID_RANDOM_SABIAS_QUE = guid();
    const ID_RANDOM_NTTDATA = guid();
    const ID_RANDOM_AWS = guid();

    const constants = {
        BUTTONS_CONFIRM_NAME:{
            DEFAULT:{
                YES:"Sí, me gustaría",
                NO: "No, gracias"
            },
            PREDICTION:{
                YES:"Sí, buena idea",
                NO: "De momento no"
            }
        },
        //ids
        ID_RANDOM_PREDICTION,
        ID_RANDOM_DESPEDIDA,
        ID_RANDOM_SABIAS_QUE,
        ID_RANDOM_NTTDATA,
        ID_RANDOM_AWS,
        //idle
        IDLE:"idle",
        OTRA_TEMATICA:"otra-tematica",
        //init part
        SALUDO:"saludo",
        PRESENTACION_INICIAL_ONLY_QUESTIONS: "presentacion-inicial-only-questions",
        PRESENTACION_INICIAL: "presentacion-inicial",

        SABIAS_QUE:"sabias-que",
        NTT_DATA:"ntt-data",
        ASSISTANT:"assistant",
        //predictions part
        PREDICTIONS_INTRODUCTION:"predicciones",
        PREDICTIONS_RANDOM_1: ID_RANDOM_PREDICTION+"#1",
        PREDICTIONS_RANDOM_2: ID_RANDOM_PREDICTION+"#2",
        PREDICTIONS_RANDOM_3: ID_RANDOM_PREDICTION+"#3",
        PREDICTIONS_RANDOM_4: ID_RANDOM_PREDICTION+"#4",
        PREDICTIONS_RANDOM_5: ID_RANDOM_PREDICTION+"#5",
        PREDICTIONS_QUESTION_REPEAT: "predicciones-question-continue",
        //sabias que part
        SABIAS_QUE_RANDOM_1: ID_RANDOM_SABIAS_QUE+"#1",
        SABIAS_QUE_RANDOM_2: ID_RANDOM_SABIAS_QUE+"#2",
        SABIAS_QUE_RANDOM_3: ID_RANDOM_SABIAS_QUE+"#3",
        SABIAS_QUE_RANDOM_4: ID_RANDOM_SABIAS_QUE+"#4",
        SABIAS_QUE_RANDOM_5: ID_RANDOM_SABIAS_QUE+"#5",
        SABIAS_QUE_CUSTOM_QUESTION: "sabias-que-custom-question",
        //aws que part
        AWS_RANDOM_1: ID_RANDOM_AWS+"#1",
        AWS_RANDOM_2: ID_RANDOM_AWS+"#2",
        AWS_RANDOM_3: ID_RANDOM_AWS+"#3",
        //nttdata que part
        NTTDATA_1: ID_RANDOM_NTTDATA+"#1",
        NTTDATA_3: ID_RANDOM_NTTDATA+"#2",
        NTTDATA_4: ID_RANDOM_NTTDATA+"#3",
        //despedida
        DESPEDIDA:"despedida",
        RH_DESPEDIDA_RANDOM_1: ID_RANDOM_DESPEDIDA+"#1",
        RH_DESPEDIDA_RANDOM_2: ID_RANDOM_DESPEDIDA+"#2",

        //storage for randoms
        STORAGE_PREDICTIONS:"STORAGE_PREDICTIONS",
        STORAGE_SABIAS_QUE:"STORAGE_SABIAS_QUE",
        STORAGE_NTTDATA:"STORAGE_NTTDATA",
        STORAGE_AWS:"STORAGE_AWS",
        STORAGE_DESPEDIDA:"STORAGE_DESPEDIDA",
    }
    const commands = {
        saludo: ['Hola', 'hola', 'Holi', 'Buenos dias', 'Buenas tardes', 'Buenas noches', 'Buenas', 'Hello', 'Hi', 'Good Morning', 'Good afternoon', 'Good night'],
        sabiasQue: ['sabias que', 'sabias', '¿Sabías que?', '¿Sabías que?', "sabias que?"],
        prediction: ["Predicciones","predicciones","prediciones","predictions"],
        assitenteAws: ["asistente","Aws", "servicios conversacionales Aws", "servicios conversacionales aws", "servicios conversacionales aws"],
        nttData: ["nttdata","ntt data", "oportunidades", "oportunidades nttdata", "oportunidades ntt data"],
        confirmacion:["Sí.","si", "dale caña", "me gustaria", "si me gustaria", "Sí, buena idea", "buena idea"],
        negacion:["No.", "no", " no, gracias", "No, gracias", "No de momento", "No, de momento"]
    }
    const folders = {
        idle: BASE_URL+"0_IDLE/",
        presentacion: BASE_URL+"2_PRESENTACIÓN_INICIAL/",
        saludo: BASE_URL+"1_SALUDOS/",
        predictions: BASE_URL+"3_PREDICCIONES/",
        despedida: BASE_URL+"8_DESPEDIDA/",
        rh: BASE_URL+"7_OFERTA_RRHH/",
        sabiasQue: BASE_URL+"4_SABIAS_QUE/",
        nttData: BASE_URL+"6_OPORTUNIDADES_NTTDATA/",
        aws: BASE_URL+"5_SERVICIOS_CONVERSACIONALES_AWS/",

    }
    return {
        commands,
        constants,
        videos:{
            [constants.IDLE]:folders.idle+"0_IDLE.mp4",
            [constants.OTRA_TEMATICA]: folders.predictions+"10_PREGUNTA_PREDICCIONES_OTRA_TEMATICA_.mp4"
            ,
            [constants.SALUDO]: folders.saludo+"1_SALUDO_INICIAL.mp4",

            [constants.PRESENTACION_INICIAL]: folders.presentacion+"2_PRESENTACIÓN_INICIAL.mp4",
            [constants.PRESENTACION_INICIAL_ONLY_QUESTIONS]: folders.presentacion+"24_PRESENTACIÓN_CUANDO_VIENE_DE_PREGUNTA.mp4",

            [constants.PREDICTIONS_INTRODUCTION]: folders.predictions+ "3_INTRODUCCIÓN_PREDICCIONES.mp4",
            [constants.PREDICTIONS_RANDOM_1] :folders.predictions+"4_PRIMERA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_RANDOM_2] :folders.predictions+"5_SEGUNDA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_RANDOM_3] :folders.predictions+"6_TERCERA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_RANDOM_4] :folders.predictions+"7_CUARTA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_RANDOM_5] :folders.predictions+"8_QUINTA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_QUESTION_REPEAT] :folders.predictions+"9_PREGUNTA_SOBRE_PREDICCIONES.mp4",

            [constants.SABIAS_QUE_RANDOM_1]: folders.sabiasQue+"11_SABIASQUE_R1.mp4",
            [constants.SABIAS_QUE_RANDOM_2]: folders.sabiasQue+"12_SABIASQUE_R2.mp4",
            [constants.SABIAS_QUE_RANDOM_3]: folders.sabiasQue+"13_SABIASQUE_R3.mp4",
            [constants.SABIAS_QUE_RANDOM_4]: folders.sabiasQue+"14_SABIASQUE_R4.mp4",
            [constants.SABIAS_QUE_RANDOM_5]: folders.sabiasQue+"15_SABIESQUE_R5.mp4",
            [constants.SABIAS_QUE_CUSTOM_QUESTION]: folders.sabiasQue+"16_SABIASQUE_PREGUNTA_OTRA_TEMATICA.mp4",

            [constants.AWS_RANDOM_1]: folders.aws+"17_SERVICIOS_CONVERSACIONALES_R1.mp4",
            [constants.AWS_RANDOM_2]: folders.aws+"18_SERVICIOS_CONVERSACIONALES_R2.mp4",
            [constants.AWS_RANDOM_3]: folders.aws+"19_SERVICIOS_CONVERSACIONALES_R3.mp4",

            [constants.NTTDATA_RANDOM_1]: folders.nttData+"21_ OPORTUNIDADES_NTTDATA_R1.mp4",
            [constants.NTTDATA_RANDOM_2]: folders.nttData+"22_ OPORTUNIDADES_NTTDATA_R2.mp4",
            [constants.NTTDATA_RANDOM_3]: folders.nttData+"23_ OPORTUNIDADES_NTTDATA_R3.mp4",

            [constants.RH_DESPEDIDA_RANDOM_1]: folders.rh+"25_OFERTA_RRHH_R1.mp4",
            [constants.RH_DESPEDIDA_RANDOM_2]: folders.rh+"26_OFERTA_RRHH_R2.mp4",

            [constants.DESPEDIDA]: folders.despedida+"27_DESPEDIDA.mp4",

        }
    }
}