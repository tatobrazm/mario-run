const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const pipe2 = document.querySelector(".pipe2");
const audio = document.querySelector(".audio");
const audio_jump = document.querySelector(".audio_jump");
const audio_fail = document.querySelector(".audio_fail");
const press = document.querySelector(".press");
const press2 = document.querySelector(".press2");
const seta = document.querySelector(".seta");
const pisca = document.querySelector(".pisca");
const volume1 = document.getElementById("volume1");
const volume2 = document.getElementById("volume2");
const volume3 = document.getElementById("volume2");

const nome_usu = document.querySelector("#nome_usu");
const recorde = document.querySelector("#recorde");
const display = document.querySelector("#timer");
const pontos = document.querySelector("#pontos");
const nivel = document.querySelector("#nivel");

if (localStorage.getItem("volume") === null) {
  var volumes = 0.2;
} else {
  var volumes = localStorage.getItem("volume");
}

volume1.volume = volumes;
volume2.volume = volumes;
volume3.volume = volumes;

var parar = false;
var duration = 0;
var intervalo = 4;
var bonusi = 0;
var pipeid = 1;
var colidiu = false;

pipe2.style.right = "-180px";
if (localStorage.getItem("recorde") === null) {
  localStorage.setItem("recorde", 0);
}
recorde.textContent = "Recorde: " + localStorage.getItem("recorde");

function startTimer(duration, display, pontos) {
  var timer = duration,
    minutes,
    seconds;

  const info = setInterval(function () {
    
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    ganhos = parseInt(timer, 10 + (timer, 10));
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = "Tempo: " + minutes + ":" + seconds;
    pontos.textContent = "Pontos: " + (ganhos + bonusi);
    if (++timer < 0) {
      timer = duration;
      clearInterval(info);
    }
    if (parar == true) {
      clearInterval(info);
      vlrrecor = localStorage.setItem("recorde", ganhos + bonusi);
      recorde.textContent = "Recorde: " + localStorage.getItem("recorde");
    }
  }, 1000);
}

function intensidade(intervalo, volta = 0) {
  var niveli = 1;
  var indice = 1;
  var dificuldade = intervalo;
  const loopIntensidade = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const pipePosition2 = pipe2.offsetLeft;
    if (pipePosition <= -95 || pipePosition2 <= -95) {
      if (pipePosition <= 0) {
        pipeid = 1;
      } else {
        pipeid = 2;
      }
      ++volta;
      if (volta >= 4 * indice) {
        ++indice;
        bonusi += 2 * (indice - 1);

        if (pipeid == 1) {
          pipe2.style.animation =
            "pipe-animation " + dificuldade + "s infinite linear";
          pipe2.style.right = "";
          pipe.style.animation = "none";
          pipe.style.right = "-180px";
          pipeid = 2;
        } else {
          pipe.style.right = "";
          pipe.style.animation =
            "pipe-animation " + dificuldade + "s infinite linear";
          pipe2.style.animation = "none";
          pipe2.style.right = "-180px";
          pipeid = 1;
        }

        if ((dificuldade = (dificuldade - Number(0.1)).toFixed(2))) {
          ++niveli;
          nivel.textContent = "Velocidade: " + niveli;
        }
        if (dificuldade == 0.4) {
          bonusi += 10000;
          clearInterval(loopIntensidade);
        }
        if (dificuldade <= 1.0) {
          bonusi += 1000;
          pisca.src = "./media/images/galatico.png";
        }
      }
    }
    if (parar == true) {
      if (localStorage.getItem("recorde") < ganhos + bonusi) {
        vlrrecor = localStorage.setItem("recorde", ganhos + bonusi);
        recorde.textContent = "Recorde: " + localStorage.getItem("recorde");
      }
      clearInterval(loopIntensidade);
    }
  }, 100);
}

const jump = () => {
  mario.classList.add("jump");
  audio_jump.src = "./media/musics/mb_jump_normalizado.wav";

  setTimeout(() => {
    mario.classList.remove("jump");
    audio_jump.src = "";
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const pipePosition2 = pipe2.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  if (
    (pipePosition <= 65 && pipePosition > 0 && marioPosition < 50) ||
    (pipePosition2 <= 65 && pipePosition2 > 0 && marioPosition < 50)
  ) {
    parar = true;
    colidiu = true;

    if (localStorage.getItem("recorde") < ganhos + bonusi) {
      vlrrecor = localStorage.setItem("recorde", ganhos + bonusi);
      recorde.textContent = "Recorde: " + localStorage.getItem("recorde");
    }

    seta.src = "./media/images/seta_cima.png";
    pipe.src = "./media/images/pipe_plant.png";
    pipe.style.animation = "none";
    pipe.style.right = "";
    pipe.style.left = `${pipePosition}px`;

    pipe2.style.right = "";
    pipe2.style.left = `${pipePosition2}px`;
    pipe2.src = "./media/images/pipe_plant.png";
    pipe2.style.animation = "none";

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    audio.src = "";
    audio_fail.src = "./media/musics/smw_lost_a_life_normalizado.wav";
    audio_fail.volume = volumes;
    mario.src = "./media/images/mario_zonzo.gif";
    mario.style.width = "80px";
    mario.style.marginLeft = "5px";

    press.src = "./media/images/enter_iniciar.png";
    press2.src = "./media/images/iniciar.gif";

    pisca.src = "";

    setTimeout(() => {
      clearInterval(loop);
      document.addEventListener("touchstart", () => {
        window.location.reload();
      });
    }, 500);
  }

  if (
    (pipePosition <= 75 && pipePosition > 73 && marioPosition > 79) ||
    (pipePosition2 <= 75 && pipePosition2 > 73 && marioPosition > 79)
  ) {
    bonusi += 1;
  }
}, 10);

document.body.addEventListener("touchstart", jump);
document.body.addEventListener("keydown", (event) => {
  const keyName = event.key;
  if (keyName === "Enter") {
    if (colidiu === true) {
      window.location.reload();
    }
  } else if (keyName === "ArrowUp") {
    mario.classList.add("jump");
    audio_jump.src = "./media/musics/mb_jump_normalizado.wav";
    setTimeout(() => {
      mario.classList.remove("jump");
      audio_jump.src = "";
    }, 400);
  }
});

window.onload = function () {
  if (localStorage.getItem("nome") == null) {
    var nome = window.prompt(
      "Bem vindo, informe seu nome para registrar seus records : )",
      [""]
    );
    localStorage.setItem("nome", nome);
    nome = localStorage.getItem("nome");
    nome_usu.textContent = nome;
    window.location.reload();
  } else {
    nome = localStorage.getItem("nome");
    nome_usu.textContent = nome;
  }

  startTimer(duration, display, pontos);
  intensidade(intervalo);
};

function limpaDados() {
  localStorage.removeItem("nome");
  localStorage.removeItem("recorde");
  window.location.reload();
}

function volumeMais() {
  if (Number(localStorage.getItem("volume")) <= Number(0.9)) {
    const env = (Number(localStorage.getItem("volume")) + Number(0.1));
    console.log(env);
    localStorage.setItem("volume", env);
    volume1.volume = env;
    volume2.volume = env;
    volume3.volume = env;
  }
}

function volumeMenos() {
  if (Number(localStorage.getItem("volume")) > Number(0.2)) {
    const env = (Number(localStorage.getItem("volume")) - Number(0.1));
    localStorage.setItem("volume", env);
    volume1.volume = env;
    volume2.volume = env;
    volume3.volume = env;
  }
}

function volumeMute() {
  if (Number(volume1.volume) > Number(0)) {
    volumes = 0;
    localStorage.setItem("volume", 0);
    volume1.volume = volumes;
    volume2.volume = volumes;
    volume3.volume = volumes;
  }else{
    volumes = 0.5;
    localStorage.setItem("volume", 0.5);
    volume1.volume = volumes;
    volume2.volume = volumes;
    volume3.volume = volumes;
  }
}
