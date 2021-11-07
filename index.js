const $container = document.querySelector(".container");

const $title = document.createElement("h1");
$title.classList.add("title");
$title.textContent = `Adivinhe um Número!`;

const $gameExplanation = document.createElement("p");
$gameExplanation.classList.add("gameExplanation");
$gameExplanation.textContent = `Selecionamos um número aleatório entre 1 e 100. Veja se consegue adivinhar em 10 chances, ou menos, qual é esse número. Diremos se seu palpite está com valor alto ou baixo.`;

const $gameWrapper = document.createElement("div");
$gameWrapper.classList.add("gameWrapper");

const $orientation = document.createElement("span");
$orientation.classList.add("orientation");
$orientation.textContent = `Digite o seu palpite:`;

const $shot = document.createElement("input");
$shot.classList.add("shot");

const $buttonSend = document.createElement("button");
$buttonSend.classList.add("buttonSend");
$buttonSend.textContent = `Enviar palpite`;

const $previousShotWrapper = document.createElement("div");
$previousShotWrapper.classList.add("previousShotWrapper");

const $previousShot = document.createElement("span");
$previousShot.classList.add("previousShot");

const $shotInserted = document.createElement("span");
$shotInserted.classList.add("shotInserted");

const $checkerShot = document.createElement("span");
$checkerShot.classList.add("checkerShot");

const $buttonReset = document.createElement("button");
$buttonReset.classList.add("buttonReset");
$buttonReset.textContent = `Iniciar novo jogo`;

$gameWrapper.appendChild($orientation);
$gameWrapper.appendChild($shot);
$gameWrapper.appendChild($buttonSend);

$container.appendChild($title);
$container.appendChild($gameExplanation);
$container.appendChild($gameWrapper);

let shot = [];
let randomNumber = "";

const createRandomNumber = () => {
  randomNumber = Math.ceil(Math.random() * 100);
  return randomNumber;
};

createRandomNumber();

const convertShotInNumber = () => {
  const shotInNumber = Number($shot.value);
  return shotInNumber;
};

const addShot = () => {
  shot.push(convertShotInNumber());
  return shot;
};

const checkRestrictionsOfShots = () => {
  if (convertShotInNumber() <= 0 || convertShotInNumber() > 100) return true;
  if (shot.includes(convertShotInNumber())) return true;
  if (convertShotInNumber() % 1 !== 0) return true;
  return false;
};

const deletePrintShot = () => {
  $previousShot.textContent = "";
  $shotInserted.textContent = "";
};

const printShot = () => {
  $previousShot.textContent = `Palpites anteriores: `;
  $shotInserted.textContent = shot.join(", ");

  $previousShotWrapper.appendChild($previousShot);
  $previousShotWrapper.appendChild($shotInserted);
  $container.appendChild($previousShotWrapper);
};

const verifyShotInRandomNumber = () => {
  if (convertShotInNumber() < randomNumber) return -1;
  if (convertShotInNumber() === randomNumber) return 0;
  if (convertShotInNumber() > randomNumber) return 1;
};

const printCheckedRandomNumber = () => {
  const checker = verifyShotInRandomNumber();

  if (checker === 0) {
    $checkerShot.classList.remove("checkerShotError");
    $checkerShot.textContent = `Parabéns! Seu palpite está correto!`;
  }
  if (checker === -1) {
    $checkerShot.classList.add("checkerShotError");
    $checkerShot.textContent = `Errado! Seu palpite está muito baixo!`;
  }
  if (checker === 1) {
    $checkerShot.classList.add("checkerShotError");
    $checkerShot.textContent = `Errado! Seu palpite está muito alto!`;
  }
  if (checker === false) return false;

  $container.appendChild($checkerShot);
};

const verifyEndGame = () => {
  if (verifyNumberMatches() && verifyShotInRandomNumber() !== 0)
    $checkerShot.textContent = `Fim de Jogo!`;
};

const verifyNumberMatches = () => {
  if (shot.length === 10) return true;
};

const insertButtonReset = () => {
  if (verifyShotInRandomNumber() === 0 || verifyNumberMatches()) {
    $container.appendChild($buttonReset);
    disabledElement($buttonSend);
    disabledElement($shot);
  }
};

const resetGame = () => {
  randomNumber = "";
  createRandomNumber();
  shot = [];
  $shot.value = "";
  $previousShotWrapper.remove();
  $checkerShot.remove();
  $buttonReset.remove();
};

const disabledElement = (element) => {
  element.disabled = true;
};

const enableElement = (element) => {
  element.disabled = false;
};

const playGame = () => {
  if (checkRestrictionsOfShots()) return;
  deletePrintShot();
  addShot();
  printShot();
  printCheckedRandomNumber();
  verifyEndGame();
  insertButtonReset();
  $shot.value = "";
  $shot.focus();
};

$buttonSend.addEventListener("click", playGame);

$shot.addEventListener("keypress", (event) => {
  if (event.key === "Enter") playGame();
});

$buttonReset.addEventListener("click", () => {
  resetGame();
  enableElement($buttonSend);
  enableElement($shot);
});
