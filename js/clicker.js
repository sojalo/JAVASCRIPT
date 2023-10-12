let clickingAreaNode = document.querySelector(".js-clicking-area-container");
let skillsContainerNode = document.querySelector(".js-skills-container");
let employeeContainerNode = document.querySelector(".js-employee-container");
let timerAreaNode = document.querySelector(".js-timer-area");
let goldAreaNode = document.querySelector(".js-gold-area");

const  CHANGE_TYPE = {
  SKILL: 'SKILL',
  EMPLOYEE: 'EMPLOYEE',
  TIME: 'TIME',
  GOLD: 'GOLD',
  ALL: 'ALL',
}

// Állapottér
let {
    seconds,  
    bitcoin,  
    bitcoinPerClick,  
    bitcoinPerSec, 
    skillList, 
    employeeList, 
    startTimestamp,
    skillsChanged,
    employeeChanged,
  } = getInitialState();

function getInitialState(){ 
  return {
    intervalid: setInterval(administrateTime, 200),
    startTimestamp: new Date().getTime(),
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

function administrateTime(){
  let currentTimeStamp = new Date().getTime();
  let elapsedTime = Math.floor((currentTimeStamp - startTimestamp) / 1000);
  let rewardSeconds = elapsedTime - seconds;
  if(rewardSeconds > 0){
    bitcoin += bitcoinPerSec * rewardSeconds;
    seconds = elapsedTime;
    render(CHANGE_TYPE.TIME);
  }
}

/************** click event listener **********************************************************/
function handleBitcoinClicked(event) {
  if(event.target.dataset.enable_click === "true") {
    bitcoin += bitcoinPerClick;
    render(CHANGE_TYPE.GOLD);
  }
}

function handleSkillsClicked(event){
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
    render(CHANGE_TYPE.SKILL);
  }
}

function handleEmployeeClicked(event){
  let clickIndex = event.target.dataset.index;
  if (typeof clickIndex !== "undefined") {
    let clickedEmployee = employeeList[clickIndex];
      if(bitcoin < clickedEmployee.price){
        alert("Nem áll rendelkezésedre elég bitcoin!");
      return;
    }
    bitcoin -= clickedEmployee.price;
    bitcoinPerSec += clickedEmployee.bitcoinPerSecIncrement;
    clickedEmployee.amount += 1;
    render(CHANGE_TYPE.EMPLOYEE);
  }
}

/***************** Templates *******************************************************************/ 
/* PRE: 0 <= Price <= 999999*/
function formatPrice(price) {
  if(price < 1000) return price;
  let kValue = price / 1000;
  return `${kValue}K`;
}

function getTimerAreaTemplate(){
  return `
    <p><strong>${seconds} másodperc</strong></p>
  `;
}

function getGoldAreaTemplate(){
  return `
    <p><strong>${bitcoin} bitcoin</strong></p>
    <p>${bitcoinPerClick} bitcoin / click</p>
    <p>${bitcoinPerSec} bitcoin / mp</p>
  `;
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
          src="${link}" 
          alt="${skillName}" 
          data-index="${index}" />
      </td>
    </tr>
  `;
}

/********************************************************************************************/ 

function getEmployee({employeeName, bitcoinPerSecIncrement, description, amount, price, link}, index){
  return `
  <tr>
    <td class="upgrade-icon-cell">
      <img 
        class="skill-image" 
        src="${link}" 
        alt="${employeeName}"
        data-index="${index}" />
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

function render(changeType = CHANGE_TYPE.ALL) {
  if(changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.TIME){
      timerAreaNode.innerHTML = getTimerAreaTemplate();
  }

  if(changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.SKILL){
    document.querySelector(".js-skills-tbody").innerHTML = skillList.map(getSkill).join("");
  }

  if(changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.EMPLOYEE){
    document.querySelector(".js-business-tbody").innerHTML = employeeList.map(getEmployee).join("");
  }
  goldAreaNode.innerHTML = getGoldAreaTemplate();
  disableImageDragDrop();
}

function disableImageDragDrop() {
  const imgList = document.querySelectorAll('img');

  for (let img of imgList) {
    img.ondragstart = () => false;
  }
}

function initialize(){
  let data = getInitialState();
  seconds = data.seconds;
  bitcoin = data.bitcoin;
  bitcoinPerClick = data.bitcoinPerClick;
  bitcoinPerSec = data.bitcoinPerSec;
  
  clickingAreaNode.addEventListener('click', handleBitcoinClicked);
  skillsContainerNode.addEventListener('click', handleSkillsClicked);
  employeeContainerNode.addEventListener('click', handleEmployeeClicked);
  render();
}

initialize();