// Állapottér
let seconds = 0;
let bitcoin = 0;
let bitcoinPerClick = 1;
let bitcoinPerSec = 0;

let template = `
  <p><strong>${seconds} másodperc</strong></p>
  <img src="./assets/bitcoin.png" alt="bitcoin clicker" />
  <p><strong>${bitcoin} bitcoin</strong></p>
  <p>${bitcoinPerClick} bitcoin / click</p>
  <p>${bitcoinPerSec} bitcoin / mp</p>
`;

let clickingAreaNode = document.querySelector(".js-clicking-area-container");
clickingAreaNode.innerHTML = template;

// Később ebből objektum lesz
let skillName = 'Bitcoin kutatás';
let bitcoinPerIncrement = 1;
let description = 'Ahol a bányászatot megváltoztatják, bitcoint találhatunk.';
let amount = 0;
let price = 10;
let link = "./assets/bitcoin_kutatas.png"

function getSkill(skillName, bitcoinPerIncrement, description, amount, price, link){
  return `
    <tr>
      <td class="upgrade-text-cell">      
          <p><strong>${skillName} (${bitcoinPerIncrement} btc / klikk)</strong></p>
          <p>${description}</p>
      </td>
      <td class="upgrade-stats-cell">
        <p>db: ${amount}</p>
        <p>ár: ${price}</p>
      </td>
      <td class="upgrade-icon-cell">
        <img class="skill-image" src="${link}" alt="${skillName}">
      </td>
    </tr>
  `;
}

let skillTemplate = getSkill(skillName, bitcoinPerIncrement, description, amount, price, link);
document.querySelector(".js-skill-tbody").innerHTML = skillTemplate;

function getEmployee(){

}

/*
 Házi feladat
  1. Ha ismételni való van JavaScript alapokból akkor a gyorstalpallót átnézni.
  2. A clickingAreaNode sablont jelenleg a template váltózóval rendereljük. Érjük el, hogy a template változó helyett egy függvényhívás adja meg a sablont.
  3. A skillName, bitcoinPerIncrement, description, amount, price, link változókat fogd össze egyetlen objektumba és ezt az objektumot add át a getskill függvénynek.
  4. A getskill példája alapján írd meg a getEmployee függvényt is a példaobjektummal.
 */