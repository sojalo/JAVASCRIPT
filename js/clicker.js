// Állapottér
let seconds = 0;
let bitcoin = 0;
let bitcoinPerClick = 1;
let bitcoinPerSec = 0;

function getTemplate(){
  return `
    <p><strong>${seconds} másodperc</strong></p>
    <img src="./assets/bitcoin.png" alt="bitcoin clicker" />
    <p><strong>${bitcoin} bitcoin</strong></p>
    <p>${bitcoinPerClick} bitcoin / click</p>
    <p>${bitcoinPerSec} bitcoin / mp</p>
  `;
}

let clickingAreaNode = document.querySelector(".js-clicking-area-container");
clickingAreaNode.innerHTML = getTemplate();

let skillList = [
  {
    skillName: 'Bitcoin kutatás',
    bitcoinPerIncrement: 1,
    description: 'Ahol a bányászatot megváltoztatják, bitcoint találhatunk.',
    amount: 0,
    price: 10,
    link: "./assets/bitcoin_kutatas.png",
  },
  {
    skillName: 'Bróker képzés',
    bitcoinPerIncrement: 1,
    description: 'Bányászok betanítását készpénzre válthatjuk.',
    amount: 0,
    price: 10,
    link: "./assets/broker_kepzes.png",
  },
  {
    skillName: 'Manager képzés',
    bitcoinPerIncrement: 1,
    description: 'Minél jobban kitanuljuk a managerek képzésének tudományát, annál több managert tudunk értékesíteni bitcoinért cserébe.',
    amount: 0,
    price: 10,
    link: "./assets/manager_kepzes.png",
  },
  {
    skillName: 'Kereskedelem',
    bitcoinPerIncrement: 1,
    description: 'BitCoinok értékesítésével profitot termelhetünk.',
    amount: 0,
    price: 10,
    link: "./assets/kereskedelem.png",
  },
  {
    skillName: 'Tőzsde',
    bitcoinPerIncrement: 1,
    description: 'A bányászat hatását tovább erősíti és magasabb kereskedelmi tevékenységet is végezhetünk.',
    amount: 0,
    price: 10,
    link: "./assets/tozsde.png",
  },
];

function getSkill({skillName, bitcoinPerIncrement, description, amount, price, link}){
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

let skillTemplate = getSkill(skillList[0]);
// for(let elem in skillList){
//   getSkill(skillList[elem]);
// }
document.querySelector(".js-skills-tbody").innerHTML = skillTemplate;

let employeeList = [
  {
    employeeName: 'BitCoin kutató',
    bitcoinPerSecIncrement: 1,
    description: 'Bitcoint keres és talál.',
    amount: 0,
    price: 100,
    link: "./assets/bitcoin_kutato.png",
  },
  {
    employeeName: 'Bróker képző',
    bitcoinPerSecIncrement: 1,
    description: 'Szerződéses munkatársként bányászokat tanít.',
    amount: 0,
    price: 100,
    link: "./assets/broker_kepzo.png",
  },
  {
    employeeName: 'Manager képző',
    bitcoinPerSecIncrement: 1,
    description: 'Managereket képez ki és értékesít a piacon.',
    amount: 0,
    price: 100,
    link: "./assets/manager_kepzo.png",
  },
  {
    employeeName: 'Kereskedő',
    bitcoinPerSecIncrement: 1,
    description: 'Blokkláncokat készít és értékesít.',
    amount: 0,
    price: 100,
    link: "./assets/kereskedo.png",
  },
  {
    employeeName: 'Befektető Warren Buffett',
    bitcoinPerSecIncrement: 1,
    description: 'Kezeli és fialtatja a vagyonodat.',
    amount: 0,
    price: 100,
    link: "./assets/befekteto.png",
  },
];

function getEmployee({employeeName, bitcoinPerSecIncrement, description, amount, price, link}){
  return `
  <tr>
    <td class="upgrade-icon-cell">
      <img class="skill-image" src="${link}" alt="${employeeName}">
    </td>
    <td class="upgrade-stats-cell">
      <p>db: ${amount}</p>
      <p>ár: ${price}</p>
    </td>
    <td>      
      <p><strong>${employeeName} (${bitcoinPerSecIncrement} btc / mp)</strong></p>
      <p>${description}</p>
    </td>
  </tr>
  `;
}

let businessTemplate = getEmployee(employeeList[0]);
document.querySelector(".js-business-tbody").innerHTML = businessTemplate;

/*
 Házi feladat
  1. Ha ismételni való van JavaScript alapokból akkor a gyorstalpallót átnézni.
  2. A clickingAreaNode sablont jelenleg a template váltózóval rendereljük. Érjük el, hogy a template változó helyett egy függvényhívás adja meg a sablont.
  3. A skillName, bitcoinPerIncrement, description, amount, price, link változókat fogd össze egyetlen objektumba és ezt az objektumot add át a getskill függvénynek.
  4. A getskill példája alapján írd meg a getEmployee függvényt is a példaobjektummal.
 */