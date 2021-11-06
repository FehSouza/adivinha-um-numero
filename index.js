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

$gameWrapper.appendChild($orientation);
$gameWrapper.appendChild($shot);
$gameWrapper.appendChild($buttonSend);

$container.appendChild($title);
$container.appendChild($gameExplanation);
$container.appendChild($gameWrapper);

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

const shot = [];

const getShot = () => {
  shot.push(convertShotInNumber());
  return shot;
};

const checkRestrictionsOfShots = () => {
  if (convertShotInNumber() <= 0 || convertShotInNumber() > 100) return true;
  if (shot.includes(convertShotInNumber())) return true;
  if (convertShotInNumber() % 1 !== 0) return true;
};

const deletePrintShot = () => {
  if (checkRestrictionsOfShots()) return;

  $previousShot.textContent = "";
  $shotInserted.textContent = "";
};

const printShot = () => {
  if (checkRestrictionsOfShots()) return;

  $previousShot.textContent = `Palpites anteriores: `;
  $shotInserted.textContent = getShot().join(", ");

  $previousShotWrapper.appendChild($previousShot);
  $previousShotWrapper.appendChild($shotInserted);
  $container.appendChild($previousShotWrapper);
};

const verifyShotInRandomNumber = () => {
  if (convertShotInNumber() < randomNumber) return -1;
  if (convertShotInNumber() === randomNumber) return 0;
  if (convertShotInNumber() > randomNumber) return 1;
  if (checkRestrictionsOfShots()) return false;
};

const printCheckedRandomNumber = () => {
  const checker = verifyShotInRandomNumber();

  if (checker === 0)
    $checkerShot.textContent = `Parabéns! Seu palpite está correto!`;
  if (checker === -1)
    $checkerShot.textContent = `Errado! Seu palpite está muito baixo!`;
  if (checker === 1)
    $checkerShot.textContent = `Errado! Seu palpite está muito alto!`;

  $container.appendChild($checkerShot);
};

$buttonSend.addEventListener("click", () => {
  checkRestrictionsOfShots();
  deletePrintShot();
  printShot();
  printCheckedRandomNumber();
});
console.log(randomNumber);
