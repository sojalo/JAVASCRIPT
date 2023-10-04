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
/********************************************************************************************/ 
/* PRE: 0 <= Price <= 999999*/
function formatPrice(price) {
  if(price < 1000) return price;
  let kValue = price / 1000;
  return `${kValue}K`;
}

/********************************************************************************************/ 
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
    bitcoinPerIncrement: 10,
    description: 'Bányászok betanítását készpénzre válthatjuk.',
    amount: 0,
    price: 200,
    link: "./assets/broker_kepzes.png",
  },
  {
    skillName: 'Manager képzés',
    bitcoinPerIncrement: 25,
    description: 'Minél jobban kitanuljuk a managerek képzésének tudományát, annál több managert tudunk értékesíteni bitcoinért cserébe.',
    amount: 0,
    price: 750,
    link: "./assets/manager_kepzes.png",
  },
  {
    skillName: 'Kereskedelem',
    bitcoinPerIncrement: 100,
    description: 'BitCoinok értékesítésével profitot termelhetünk.',
    amount: 0,
    price: 4000,
    link: "./assets/kereskedelem.png",
  },
  {
    skillName: 'Tőzsde',
    bitcoinPerIncrement: 300,
    description: 'A bányászat hatását tovább erősíti és magasabb kereskedelmi tevékenységet is végezhetünk.',
    amount: 0,
    price: 15000,
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
        <p>ár: ${formatPrice(price)}</p>
      </td>
      <td class="upgrade-icon-cell">
        <img class="skill-image" src="${link}" alt="${skillName}">
      </td>
    </tr>
  `;
}

// 1. megoldás
// let rows = [];
// for(let skill of skillList){
//   rows.push(getSkill(skill));
// }
// document.querySelector(".js-skills-tbody").innerHTML = rows.join("");
  
// 2. megoldás
// let skillHtml ="";
// for(let skill of skillList){
//   skillHtml += getSkill(skill);
// }
// document.querySelector(".js-skills-tbody").innerHTML = skillHtml;

// 3. megoldás Map
document.querySelector(".js-skills-tbody").innerHTML =
  skillList
  .map(getSkill)
  .join("");
/********************************************************************************************/ 
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
    bitcoinPerSecIncrement: 5,
    description: 'Szerződéses munkatársként bányászokat tanít.',
    amount: 0,
    price: 1000,
    link: "./assets/broker_kepzo.png",
  },
  {
    employeeName: 'Manager képző',
    bitcoinPerSecIncrement: 10,
    description: 'Managereket képez ki és értékesít a piacon.',
    amount: 0,
    price: 3000,
    link: "./assets/manager_kepzo.png",
  },
  {
    employeeName: 'Kereskedő',
    bitcoinPerSecIncrement: 25,
    description: 'Blokkláncokat készít és értékesít.',
    amount: 0,
    price: 10000,
    link: "./assets/kereskedo.png",
  },
  {
    employeeName: 'Befektető Warren Buffett',
    bitcoinPerSecIncrement: 100,
    description: 'Kezeli és fialtatja a vagyonodat.',
    amount: 0,
    price: 50000,
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
      <p>ár: ${formatPrice(price)}</p>
    </td>
    <td>      
      <p><strong>${employeeName} (${bitcoinPerSecIncrement} btc / mp)</strong></p>
      <p>${description}</p>
    </td>
  </tr>
  `;
}

document.querySelector(".js-business-tbody").innerHTML = employeeList.map(getEmployee).join("");
// let businessRows = [];
// for(let employee of employeeList){
//   businessRows.push(getEmployee(employee));
// }

// document.querySelector(".js-business-tbody").innerHTML = businessRows.join("");
// let businessTemplate = getEmployee(employeeList[0]);
// document.querySelector(".js-business-tbody").innerHTML = businessTemplate;