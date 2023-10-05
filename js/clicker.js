let clickingAreaNode = document.querySelector(".js-clicking-area-container");
// let clickingAreaLeft = document.querySelector(".js-skills-tbody");
let inventoryContainerNode = document.querySelector(".js-inventory-container");

// Állapottér
let {seconds,  bitcoin,  bitcoinPerClick,  bitcoinPerSec, skillList, employeeList} = getInitialState();

function getInitialState(){  
  return {
    seconds: 0,
    bitcoin: 0,
    bitcoinPerClick: 1,
    bitcoinPerSec: 0,
    skillList : [
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
    ],
    employeeList : [
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
    ],
  };
}

function getClickingAreaTemplate(){
  return `
    <p><strong>${seconds} másodperc</strong></p>
    <img 
      src="./assets/bitcoin.png" 
      alt="bitcoin clicker" 
      data-enable_click="true" 
      class="bit-coin"/>
    <p><strong>${bitcoin} bitcoin</strong></p>
    <p>${bitcoinPerClick} bitcoin / click</p>
    <p>${bitcoinPerSec} bitcoin / mp</p>
  `;
}

/************** click event listener **********************************************************/
function handleBitcoinClicked(event) {
  if(event.target.dataset.enable_click === "true") {
    bitcoin += bitcoinPerClick;
    render();
  }
}

function handleInventoryClicked(event){
  let clickIndex = event.target.dataset.index;
  if (typeof clickIndex !== "undefined") {
    let clickedSkill = skillList[clickIndex];
    if(bitcoin < clickedSkill.price){
      alert("Nem áll rendelkezésedre elég bitcoin!");
      return;
    }
    bitcoin -= clickedSkill.price;
    bitcoinPerClick += clickedSkill.bitcoinPerIncrement;
    clickedSkill.amount += 1;
    render();
  }
}

/********************************************************************************************/ 
/* PRE: 0 <= Price <= 999999*/
function formatPrice(price) {
  if(price < 1000) return price;
  let kValue = price / 1000;
  return `${kValue}K`;
}

/********************************************************************************************/ 
function getSkill({skillName, bitcoinPerIncrement, description, amount, price, link}, index){
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
        <img 
          class="skill-image" 
          src="${link}" alt="${skillName}" 
          data-index="${index}" />
      </td>
    </tr>
  `;
}

/********************************************************************************************/ 


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

function render() {
  clickingAreaNode.innerHTML = getClickingAreaTemplate();
  document.querySelector(".js-skills-tbody").innerHTML = skillList.map(getSkill).join("");
  document.querySelector(".js-business-tbody").innerHTML = employeeList.map(getEmployee).join("");
}

function initialize(){
  let data = getInitialState();
  seconds = data.seconds;
  bitcoin = data.bitcoin;
  bitcoinPerClick = data.bitcoinPerClick;
  bitcoinPerSec = data.bitcoinPerSec;
  
  clickingAreaNode.addEventListener('click', handleBitcoinClicked);
  // clickingAreaLeft.addEventListener('click', handleLeftClicked);
  inventoryContainerNode.addEventListener('click', handleInventoryClicked);
  render();
}

initialize();