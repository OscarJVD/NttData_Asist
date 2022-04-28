
window.nttdata = {} // It's a global variable
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const ID_IDLE = "DFSDFSD"
//CODIGO RARO
const showIdle = (videosIn, config) => {
  // videosIn.pauseAll();
  // videosIn.hideAll();
  videosIn[config.IDLE].video.style = "display:block";
  videosIn[config.IDLE].video.play();
  console.log("HIDEyES", videosIn[config.IDLE].video)
};
const hideIdle = (videosIn, config) => {
  try {

    videosIn[config.IDLE].video.style = "display:none";
    videosIn[config.IDLE].video.pause();
    console.log("HIDE", videosIn[config.IDLE].video)
  } catch (err) {
    console.log("Failed to pause, IDLE", err)
  }
};

const loadVideo = (key, url, isIdle = false) => {
  const video = document.createElement('video');
  video.src = url;
  video.autoplay = false;
  video.preload = 'auto';
  video.width = "500";
  video.style = "display:none"
  if (isIdle) {
    video.loop = true;
    video.id = ID_IDLE
  }
  return [key, { video }]
};

async function bootstrap() {
  const { constants, commands: commandsConfig, videos: config } = configApp();
  window.nttdata[constants.STORAGE_PREDICTIONS] = []
  window.nttdata[constants.STORAGE_SABIAS_QUE] = []
  window.nttdata[constants.STORAGE_AWS] = []
  window.nttdata[constants.STORAGE_NTTDATA] = []
  window.nttdata[constants.STORAGE_DESPEDIDA] = []
  //videos
  const videos = document.querySelector("#videos")
  //buttons
  const predictions = document.querySelector("#predictions")
  const sabiasQue = document.querySelector("#sabias-que")
  const assistant = document.querySelector("#assistant")
  const nttdata = document.querySelector("#nttdata-button")
  const qrCodeSpace = document.querySelector("#qr-code-space")
  const menuGeneral = document.querySelector("#menu-general")
  const menuConfirmation = document.querySelector("#menu-confirmacion")
  const buttonConfirmationYes = document.querySelector("#confirmacion-si")
  const buttonConfirmationNo = document.querySelector("#confirmacion-no")
  const buttonReload = document.querySelector("#reload")
  const buttonMicrophone = document.querySelector("#microphone")
  const artyomInit = ArtyomInit(constants, commandsConfig)
  const artyom = await artyomInit.createInstance();
  const menusMain = {
    predictions,
    sabiasQue,
    assistant,
    nttdata,
  }
  const menus = { menuGeneral, menuConfirmation };
  const allButtons = { ...menusMain, buttonConfirmationYes, buttonConfirmationNo, qrCodeSpace }
  qrCodeSpace.style.display = "none"
  // process
  let videlosLoaded = Object.entries(config).map(([key, value]) => {
    return loadVideo(key, value, key === constants.IDLE)
  });
  videlosLoaded = Object.fromEntries(videlosLoaded);
  Object.entries(videlosLoaded).forEach(([key, value]) => videos.appendChild(value.video))
  // init
  videlosLoaded.__proto__.pauseAll = function () {
    Object.values(this).forEach(video => {
      try {
        video.video.pause()
      } catch (err) {
        console.log("Faile to pause of all", err)
      }
    });
  }
  videlosLoaded.__proto__.hideAll = function () {
    Object.values(this).forEach(video => video.video.style = "display:none");
  }

  videlosLoaded.__proto__.addEventObey = function () {
    const handleObey = (e) => {
      Idle(videlosLoaded, constants, artyom)
      enableAllButtons({ ...menusMain, ...menus })
      artyom.obey();
      console.log("Obey activaded: ", e.type)
    };

    Object.values(this).forEach(video => {
      if (video.video.id == ID_IDLE) return;
      video.video.addEventListener("ended", handleObey)
      video.video.addEventListener("pause", handleObey)
    });
  }
  
  videlosLoaded.__proto__.addEventDontObey = function () {

    const handleEventPlay = (e) => {
      console.log("Obey unactivated: ", e.type)
      disableAllButtons({ ...menusMain, ...menus })
      artyom.dontObey();
    };

    Object.values(this).forEach(video => {
      if (video.video.id == ID_IDLE) return;
      video.video.addEventListener("playing", handleEventPlay)
    });
    videlosLoaded.__proto__.removeEventDontObey = function () {
      Object.values(this).forEach(video => {
        if (video.video.id == ID_IDLE) return;
        video.video.removeEventListener("playing", handleEventPlay)
      });
    }
  }
  videlosLoaded.addEventDontObey()
  videlosLoaded.addEventObey()
  //buttons yes - not
  menuConfirmation.style.display = "none"
  const buttonsYesOrNot = MenuYesOrNo(buttonConfirmationYes, buttonConfirmationNo, menuGeneral, menuConfirmation)
  const buttonsMenu = MenuMain(menusMain);
  await artyomInit.loadCommands(videlosLoaded, buttonsYesOrNot, menus, buttonsMenu, allButtons, buttonReload)
  console.log(menusMain)
  console.log("Videos", videlosLoaded)
  Idle(videlosLoaded, constants, artyom)
  AudioViewer().then(() => console.log("well")).catch(console.error)
  //TESTTING
  setInterval(() => {
    console.log("Id Obeying: ",
      artyom.isObeying(),
      artyom.isRecognizing(),
      artyom.getAvailableCommands().map(({ indexes }) => indexes)
    )
  }, 2000);
  //extras

  //logic microphone
  buttonMicrophone.addEventListener("click", () => {
    if (artyom.isObeying() && artyom.isRecognizing()) {
      artyom.dontObey();
    } else {
      artyom.obey();
    }
  })
  //This setTinterval is only for watch info
  setInterval(() => {
    if (artyom.isObeying() && artyom.isRecognizing()) {
      document.getElementById("microphoneIcon").classList.remove('text-white')
      document.getElementById("microphoneIcon").classList.add('text-lime')
      // buttonMicrophone.textContent = "Microphone: ON"
    } else {
      document.getElementById("microphoneIcon").classList.remove('text-lime')
      document.getElementById("microphoneIcon").classList.add('text-white')
      // buttonMicrophone.textContent = "Microphone: OFF"
    }
  }, 1000);

  setTimeout(() => {
    artyom.dontObey();
  }, 500);
}

async function init() {
  const app = document.querySelector("#app")
  const buttonStart = document.querySelector("#start-app")
  app.style.display = "none";
  let loaded = false;
  buttonStart.addEventListener("click", async () => {
    console.log("Click")
    if (!loaded) {
      loaded = true
      buttonStart.style.display = "none";
      app.style.display = "block";
      await bootstrap();
    }
  });

}

document.addEventListener("DOMContentLoaded", init)