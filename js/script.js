const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const pipe2 = document.querySelector(".pipe2");
const audio = document.querySelector(".audio");
const audio_jump = document.querySelector(".audio_jump");
const audio_fail = document.querySelector(".audio_fail");
const press = document.querySelector(".press");
const press2 = document.querySelector(".press2");
const pisca = document.querySelector(".pisca");
const display = document.querySelector("#timer");
const pontos = document.querySelector("#pontos");
const nivel = document.querySelector("#nivel");

var parar = false;
var duration = 0;
var intervalo = 4;
var bonusi = 0;
var pipeid = 1;
var colidiu = false;

pipe2.style.right = "-180px";

function startTimer(duration, display, pontos) {
  var timer = duration,
    minutes,
    seconds;

  const info = setInterval(function () {
    if (parar == true) {
      clearInterval(info);
    }
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
  }, 1000);
}

function intensidade(intervalo, volta = 0) {
  var niveli = 1;
  var indice = 1;
  var dificuldade = intervalo;
  const loopIntensidade = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const pipePosition2 = pipe2.offsetLeft;
    if (parar == true) {
      clearInterval(loopIntensidade);
    }
    if (pipePosition <= -1 || pipePosition2 <= -1) {
      if (pipePosition <= 0) {
        pipeid = 1;
      } else {
        pipeid = 2;
      }
      ++volta;
      if (volta >= 3 * indice) {
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
        if (dificuldade == 1.0) {
          bonusi += 1000;
          pisca.src = "./media/images/galatico.png";
        }
        if (parar == true) {
          clearInterval(loopIntensidade);
        }
      }
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
    }, 500);
  }
});

window.onload = function () {
  startTimer(duration, display, pontos);
  intensidade(intervalo);
};
