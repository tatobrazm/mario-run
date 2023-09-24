const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const audio = document.querySelector(".audio");
const audio_jump = document.querySelector(".audio_jump");
const audio_fail = document.querySelector(".audio_fail");
const press = document.querySelector(".press");
const display = document.querySelector("#timer");
const pontos = document.querySelector("#pontos");
const nivel = document.querySelector("#nivel");
var parar = false;
var duration = 0;
var intervalo = 4;

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
    pontos.textContent = "Pontos: " + ganhos;
    if (++timer < 0 || parar == true) {
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
    if (pipePosition <= -1) {
      ++volta;
      if (volta >= 20 * indice) {
        ++indice;
        pipe.style.animation =
          "pipe-animation " + dificuldade + "s infinite linear";
        if ((dificuldade = (dificuldade - Number(0.1)).toFixed(1))) {
          ++niveli;
          nivel.textContent = "Dificuldade: " + niveli;
        }
        if (dificuldade == 1.0) {
          clearInterval(loopIntensidade);
        }
      }
      console.log("contagem: " +volta);
      console.log("dificuldade: " +dificuldade);
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
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  if (pipePosition <= 95 && pipePosition > 0 && marioPosition < 80) {
    parar = true;
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    audio.src = "";
    audio_fail.src = "./media/musics/smw_lost_a_life_normalizado.wav";
    mario.src = "./media/images/gameover.webp";
    mario.style.width = "80px";
    mario.style.marginLeft = "50px";

    press.src = "./media/images/pressione.png";

    setTimeout(()=>{
      clearInterval(loop);
      document.addEventListener("keydown", () => {
        window.location.reload();
      });
    }, 500);
    
  }
}, 10);

document.addEventListener("keydown", jump);

window.onload = function () {
  startTimer(duration, display, pontos);
  intensidade(intervalo);
};
