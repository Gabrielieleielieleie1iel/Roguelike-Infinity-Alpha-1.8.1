/*******************
       * GAME VARIABLES
       *******************/
      const roomSize = 110;
      const mapDiv = document.getElementById("map");
      const battleMenu = document.getElementById("battleMenu");
      const battleLog = document.getElementById("battleLog");
      const enemyInfo = document.getElementById("enemyInfo");
      const levelUpMenu = document.getElementById("levelUpMenu");
      const deathMenu = document.getElementById("deathMenu");
      const battleTint = document.getElementById("battleTint");
      const inventoryMenu = document.getElementById("inventoryMenu");
      const shopMenu = document.getElementById("shopMenu");
      const shopItemsDiv = document.getElementById("shopItems");
      const casinoMenu = document.getElementById("casinoMenu");
      const betInput = document.getElementById("betInput");
      const placeBetBtn = document.getElementById("placeBetBtn");
      const casinoGameArea = document.getElementById("casinoGameArea");
      const casinoEnemyTotalEl = document.getElementById("casinoEnemyTotal");
      const casinoPlayerTotalEl = document.getElementById("casinoPlayerTotal");
      const standBtn = document.getElementById("standBtn");
      const hitButtons = document.querySelectorAll(".hitBtn");
	  const TITLE_MUSIC_BPM = 120;
	  const BEAT_INTERVAL_MS = (60 / TITLE_MUSIC_BPM) * 1000;
	  const bgmTracks = {
  "Deep Forests": { audio: new Audio("forest.mp3"), savedTime: 0 },
  "Abandoned Graveyard": { audio: new Audio("graveyard.mp3"), savedTime: 0 },
  "Deathly Cliffs": { audio: new Audio("cliffs.mp3"), savedTime: 0 },
  "Bone Castle": { audio: new Audio("castle.mp3"), savedTime: 0 },
  "Silkwoven Caverns": { audio: new Audio("spider.mp3"), savedTime: 0 },
  "Arcane Swamps": { audio: new Audio("swamp.mp3"), savedTime: 0 },
  "Shi Mountains": { audio: new Audio("mountains.mp3"), savedTime: 0 },
  "Archaic Caverns": { audio: new Audio("archaic.mp3"), savedTime: 0 },
  "Scorching Desert": { audio: new Audio("desert.mp3"), savedTime: 0 },
  "Never-Ending Tunnels": { audio: new Audio("Wind.mp3"), savedTime: 0 },
  "Freezing Tundra": { audio: new Audio("Tundra.mp3"), savedTime: 0 },
  "The Black Sea": { audio: new Audio("sea.mp3"), savedTime: 0 },
  "Vast Ocean": { audio: new Audio("ocean.mp3"), savedTime: 0 },
  "Sky Dimension": { audio: new Audio("sky.mp3"), savedTime: 0 },
  "Future Megalopolis": { audio: new Audio("tech.mp3"), savedTime: 0 },
  "Ancient Kingdom": { audio: new Audio("kingdom.mp3"), savedTime: 0 },
  "Shinjuku": { audio: new Audio("HeavenAndEarth.mp3"), savedTime: 0 },
  "Molten Treasure Trove": { audio: new Audio("cool.mp3"), savedTime: 0 },
  "Shadow Realm": { audio: new Audio("shadow.mp3"), savedTime: 0 },
  "The Beyond": { audio: new Audio("beyond.mp3"), savedTime: 0 },
  "Realm Of The Gods": { audio: new Audio("bossmusic.mp3"), savedTime: 0 },
};
const titleMusic = new Audio("fire.mp3");
titleMusic.loop = true;
const ambushTrack = new Audio("battlemusic.mp3");
const bossTrack = new Audio("bossmusic.mp3");
const secTrack = new Audio("Judas.mp3");
const omniTrack = new Audio("Omni.mp3");
const casinoMusic = new Audio("gambling.mp3");
ambushTrack.loop = true;
ambushTrack.currentTime = 0;
bossTrack.loop = true;
bossTrack.currentTime = 0;
secTrack.loop = true;
secTrack.currentTime = 0;
omniTrack.loop = true;
casinoMusic.loop = true;

      let ambushEnemiesQueue = null;
	  let beatTimer = null;
      let shopCooldown = 0;
      let allowedMoves = [];
      let floorCount = 1;
      let roomMoves = 0;
      let roomsThisFloor = 0;
      let lastAltarFloor = 0;
	  let secretAmbush = false;
	  let turnNumber = 1;
	  let actionsLocked = false;
	  let currentWorld = "";
	  let currentBGM = null;
	  let battleAudio = null;
	  let ambushCompleteCallback = null;
	  
	  let trapCount = 0;

      let bossRoomGenerated = false;
      let player = {
        x: 0,
        y: 0,
        hp: 100,
        maxHp: 100,
        attack: 3,
        magic: 3,
        defense: 3,
        money: 10,
        exp: 0,
        level: 1,
        expToLevel: 5,
        inventory: new Array(10).fill(null),
        rage: false,
        iron: false,
        dodgeChance: 0.2,
        neverMiss: false,
        critMultiplier: 1,
        agility: 1,
        perception: 1,
        potential: 1,
      };
      let map = {};
      const ROOM_TYPES = {
        BATTLE: "battle",
        HEALING: "healing",
        SHOP: "shop",
        EMPTY: "empty",
        BOSS: "boss",
        ALTAR: "altar",
        CASINO: "casino",
        AMBUSH: "ambush",
        LOOT: "loot",
		TRAP: "trap",
      };
      const roomIcons = {
        battle: "battle.png",
        healing: "heal.png",
        shop: "shop.png",
        boss: "skull.png",
        altar: "altar.png",
        casino: "casino.png",
        ambush: "ambush.png",
        loot: "loot.png",
		trap: "trap.png",
      };
      const enemies = [{
        name: "Monster Crow",
        hp: 20,
        damageRange: [3, 7],
        expReward: [1, 4],
        moneyReward: [2, 4]
      }, {
        name: "Goblin",
        hp: 25,
        damageRange: [4, 10],
        expReward: [2, 4],
        moneyReward: [5, 6]
      }, {
        name: "Wolf",
        hp: 30,
        damageRange: [6, 13],
        expReward: [3, 5],
        moneyReward: [3, 5]
      }, {
        name: "Bear",
        hp: 40,
        damageRange: [5, 11],
        expReward: [4, 6],
        moneyReward: [4, 6]
      }, {
        name: "Zombie",
        hp: 35,
        damageRange: [4, 8],
        expReward: [3, 4],
        moneyReward: [3, 5],
        reductionAttack: 0.5
      }, {
        name: "Skeleton",
        hp: 25,
        damageRange: [6, 11],
        expReward: [3, 4],
        moneyReward: [3, 6]
      }, {
        name: "Ghoul",
        hp: 20,
        damageRange: [8, 14],
        expReward: [1, 3],
        moneyReward: [2, 4],
        reductionAll: 0.33
      }, {
        name: "Giant Spider",
        hp: 25,
        damageRange: [7, 9],
        expReward: [3, 5],
        moneyReward: [3, 5]
      }, {
        name: "Demon Bat",
        hp: 15,
        damageRange: [5, 8],
        expReward: [2, 4],
        moneyReward: [2, 4]
      }, {
        name: "Shark",
        hp: 40,
        damageRange: [6, 9],
        expReward: [4, 6],
        moneyReward: [3, 6]
      }, {
        name: "Piranha",
        hp: 15,
        damageRange: [5, 10],
        expReward: [3, 4],
        moneyReward: [3, 5]
      }, {
        name: "Giant Albatross",
        hp: 35,
        damageRange: [4, 8],
        expReward: [3, 5],
        moneyReward: [3, 5],
        reductionAttack: 0.33
      }, {
        name: "Golem",
        hp: 100,
        damageRange: [9, 12],
        expReward: [6, 10],
        moneyReward: [5, 10],
        reductionAttack: 0.5
      }, {
        name: "Ice Golem",
        hp: 80,
        damageRange: [11, 16],
        expReward: [6, 11],
        moneyReward: [6, 10],
        reductionMagic: 0.5
      }, {
        name: "Ice Spirit",
        hp: 40,
        damageRange: [7, 12],
        expReward: [4, 6],
        moneyReward: [2, 4],
        reductionAll: 0.33
      }, {
        name: "Giant Scorpion",
        hp: 35,
        damageRange: [6, 10],
        expReward: [3, 5],
        moneyReward: [3, 5],
        reductionAll: 0.33
      }, {
        name: "Sandworm",
        hp: 40,
        damageRange: [8, 13],
        expReward: [3, 6],
        moneyReward: [2, 5]
      }, {
        name: "Vulture",
        hp: 35,
        damageRange: [4, 9],
        expReward: [3, 5],
        moneyReward: [3, 5],
        reductionAttack: 0.33
      }, {
        name: "Possessed Armor",
        hp: 80,
        damageRange: [11, 14],
        expReward: [5, 7],
        moneyReward: [5, 6],
        reductionAttack: 0.5
      }, {
        name: "Cursed Spirit",
        hp: 60,
        damageRange: [11, 15],
        expReward: [6, 8],
        moneyReward: [4, 5],
        reductionAll: 0.33
      }, {
        name: "Cyborg Guard",
        hp: 70,
        damageRange: [11, 14],
        expReward: [6, 8],
        moneyReward: [5, 6]
      }, {
	name: "Giant Robot",
        hp: 80,
        damageRange: [16, 17],
        expReward: [9, 10],
        moneyReward: [8, 9]
      }, {
		name: "Drone",
        hp: 50,
        damageRange: [13, 17],
        expReward: [8, 10],
        moneyReward: [8, 9]
      }, {
		name: "Sorcerer",
        hp: 70,
        damageRange: [17, 18],
        expReward: [9, 10],
        moneyReward: [9, 10]
      }, {
		name: "Shikigami",
        hp: 90,
        damageRange: [13, 17],
        expReward: [8, 9],
        moneyReward: [6, 8]
      }, {
    name: "Goblin King",
    hp: 100,
    damageRange: [20, 30],
    expReward: [30, 30],
    moneyReward: [30, 30]
  },
  {
    name: "Zombie Mutant",
    hp: 120,
    damageRange: [25, 55],
    expReward: [70, 70],
    moneyReward: [70, 70]
  },
  {
    name: "Giant Lord",
    hp: 250,
    damageRange: [30, 65],
    expReward: [100, 100],
    moneyReward: [100, 100],
    resistAttack: true
  },
  {
    name: "Skeleton King",
    hp: 110,
    damageRange: [40, 80],
    expReward: [120, 120],
    moneyReward: [120, 120]
  },
  {
    name: "Spider Queen",
    hp: 140,
    damageRange: [45, 75],
    expReward: [150, 150],
    moneyReward: [150, 150]
  },
  {
    name: "The Witch",
    hp: 120,
    damageRange: [50, 100],
    expReward: [180, 180],
    moneyReward: [180, 180],
    resistMagic: true
  },
  {
    name: "Titan Golem",
    hp: 350,
    damageRange: [50, 80],
    expReward: [210, 210],
    moneyReward: [210, 210],
    resistAll: true
  },
  {
    name: "Wyvern",
    hp: 200,
    damageRange: [50, 90],
    expReward: [240, 240],
    moneyReward: [240, 240],
    resistAttack: true
  },
  {
    name: "Giant Sandworm",
    hp: 150,
    damageRange: [60, 100],
    expReward: [250, 250],
    moneyReward: [250, 250]
  },
  {
    name: "Titanoboa Lord",
    hp: 170,
    damageRange: [60, 100],
    expReward: [280, 280],
    moneyReward: [280, 280]
  },
  {
    name: "Abominable Snowman",
    hp: 190,
    damageRange: [70, 120],
    expReward: [300, 300],
    moneyReward: [300, 300]
  },
  {
    name: "Omegalodon",
    hp: 200,
    damageRange: [50, 120],
    expReward: [320, 320],
    moneyReward: [320, 320],
    resistAttack: true
  },
  {
    name: "Leviathan",
    hp: 300,
    damageRange: [60, 140],
    expReward: [360, 360],
    moneyReward: [360, 360],
    resistAttack: true
  },
  {
    name: "Angel",
    hp: 320,
    damageRange: [60, 150],
    expReward: [400, 400],
    moneyReward: [400, 400],
    resistMagic: true
  },
  {
    name: "Mega Meta Mecha Annihilator - Model: Ultima",
    hp: 600,
    damageRange: [80, 160],
    expReward: [420, 420],
    moneyReward: [500, 500],
    resistAttack: true
  },
  {
    name: "Grand Knight",
    hp: 800,
    damageRange: [60, 150],
    expReward: [480, 480],
    moneyReward: [480, 480],
    resistAll: true
  },
  {
    name: "Six-Eyed Calamity",
    hp: 500,
    damageRange: [90, 180],
    expReward: [600, 600],
    moneyReward: [560, 560],
    resistAll: true
  },
  {
    name: "Dragon King",
    hp: 800,
    damageRange: [80, 160],
    expReward: [900, 900],
    moneyReward: [800, 800],
    resistAttack: true
  },
  {
    name: "The Black King",
    hp: 900,
    damageRange: [90, 170],
    expReward: [950, 950],
    moneyReward: [900, 900],
    resistMagic: true
  },
  {
    name: "Omni",
    hp: 1000,
    damageRange: [75, 150],
    expReward: [1000, 1000],
    moneyReward: [1000, 1000],
    resistAttack: true,
    resistMagic: true
  }
];

      function getBossForFloor(floor) {
        let bossFloor = floor % 100;
        if (bossFloor === 0) bossFloor = 100;
        const bosses = {
          20: {
            name: "Goblin King",
            hp: 100,
            damageRange: [20, 30],
            expReward: [30, 30],
            moneyReward: [30, 30]
          },
          40: {
            name: "Zombie Mutant",
            hp: 120,
            damageRange: [25, 55],
            expReward: [70, 70],
            moneyReward: [70, 70]
          },
          60: {
            name: "Giant Lord",
            hp: 250,
            damageRange: [30, 65],
            expReward: [100, 100],
            moneyReward: [100, 100],
            resistAttack: true
          },
          80: {
            name: "Skeleton King",
            hp: 110,
            damageRange: [40, 80],
            expReward: [120, 120],
            moneyReward: [120, 120]
          },
          100: {
            name: "Spider Queen",
            hp: 140,
            damageRange: [45, 75],
            expReward: [150, 150],
            moneyReward: [150, 150]
          },
          120: {
            name: "The Witch",
            hp: 120,
            damageRange: [50, 100],
            expReward: [180, 180],
            moneyReward: [180, 180],
            resistMagic: true
          },
          140: {
            name: "Titan Golem",
            hp: 350,
            damageRange: [50, 80],
            expReward: [210, 210],
            moneyReward: [210, 210],
            resistAll: true
          },
          160: {
            name: "Wyvern",
            hp: 200,
            damageRange: [50, 90],
            expReward: [240, 240],
            moneyReward: [240, 240],
			resistAttack: true
          },
          180: {
            name: "Giant Sandworm",
            hp: 150,
            damageRange: [60, 100],
            expReward: [250, 250],
            moneyReward: [250, 250]
          },
          200: {
            name: "Titanoboa Lord",
            hp: 170,
            damageRange: [60, 100],
            expReward: [280, 280],
            moneyReward: [280, 280]
          },
          220: {
            name: "Abominable Snowman",
            hp: 190,
            damageRange: [70, 120],
            expReward: [300, 300],
            moneyReward: [300, 300]
          },
          240: {
            name: "Omegalodon",
            hp: 200,
            damageRange: [50, 120],
            expReward: [320, 320],
            moneyReward: [320, 320],
            resistAttack: true
          },
          260: {
            name: "Leviathan",
            hp: 300,
            damageRange: [60, 140],
            expReward: [360, 360],
            moneyReward: [360, 360],
            resistAttack: true
          },
          280: {
            name: "Angel",
            hp: 320,
            damageRange: [60, 150],
            expReward: [400, 400],
            moneyReward: [400, 400],
            resistMagic: true
          },
          300: {
            name: "Mega Meta Mecha Annihilator - Model: Ultima",
            hp: 600,
            damageRange: [80, 160],
            expReward: [420, 420],
            moneyReward: [500, 500],
			resistAttack: true
          },
          320: {
            name: "Grand Knight",
            hp: 800,
            damageRange: [60, 150],
            expReward: [480, 480],
            moneyReward: [480, 480],
            resistAll: true
          },
          340: {
            name: "Six-Eyed Calamity",
            hp: 500,
            damageRange: [90, 180],
            expReward: [600, 600],
            moneyReward: [560, 560],
            resistAll: true
		  },
          360: {
            name: "Dragon King",
            hp: 800,
            damageRange: [80, 160],
            expReward: [900, 900],
            moneyReward: [800, 800],
			resistAttack: true
          },
          380: {
            name: "The Black King",
            hp: 900,
            damageRange: [90, 170],
            expReward: [950, 950],
            moneyReward: [900, 900],
			resistMagic: true
          },
          400: {
            name: "Omni",
            hp: 1000,
            damageRange: [75, 150],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			resistAttack: true,
			resistMagic: true
          },
	  420: {
            name: "Goblin King",
            hp: 100,
            damageRange: [20, 30],
            expReward: [30, 30],
            moneyReward: [30, 30]
          },
          440: {
            name: "Zombie Mutant",
            hp: 120,
            damageRange: [25, 55],
            expReward: [70, 70],
            moneyReward: [70, 70]
          },
          460: {
            name: "Giant Lord",
            hp: 250,
            damageRange: [30, 65],
            expReward: [100, 100],
            moneyReward: [100, 100],
            resistAttack: true
          },
          480: {
            name: "Skeleton King",
            hp: 110,
            damageRange: [40, 80],
            expReward: [120, 120],
            moneyReward: [120, 120]
          },
          500: {
            name: "Spider Queen",
            hp: 140,
            damageRange: [45, 75],
            expReward: [150, 150],
            moneyReward: [150, 150]
          },
          520: {
            name: "The Witch",
            hp: 120,
            damageRange: [50, 100],
            expReward: [180, 180],
            moneyReward: [180, 180],
            resistMagic: true
          },
          140: {
            name: "Titan Golem",
            hp: 350,
            damageRange: [50, 80],
            expReward: [210, 210],
            moneyReward: [210, 210],
            resistAll: true
          },
          560: {
            name: "Wyvern",
            hp: 200,
            damageRange: [50, 90],
            expReward: [240, 240],
            moneyReward: [240, 240],
			resistAttack: true
          },
          580: {
            name: "Giant Sandworm",
            hp: 150,
            damageRange: [60, 100],
            expReward: [250, 250],
            moneyReward: [250, 250]
          },
          600: {
            name: "Titanoboa Lord",
            hp: 170,
            damageRange: [60, 100],
            expReward: [280, 280],
            moneyReward: [280, 280]
          },
          620: {
            name: "Abominable Snowman",
            hp: 190,
            damageRange: [70, 120],
            expReward: [300, 300],
            moneyReward: [300, 300]
          },
          640: {
            name: "Omegalodon",
            hp: 200,
            damageRange: [50, 120],
            expReward: [320, 320],
            moneyReward: [320, 320],
            resistAttack: true
          },
          660: {
            name: "Leviathan",
            hp: 300,
            damageRange: [60, 140],
            expReward: [360, 360],
            moneyReward: [360, 360],
            resistAttack: true
          },
          680: {
            name: "Angel",
            hp: 320,
            damageRange: [60, 150],
            expReward: [400, 400],
            moneyReward: [400, 400],
            resistMagic: true
          },
          700: {
            name: "Mega Meta Mecha Annihilator - Model: Ultima",
            hp: 600,
            damageRange: [80, 160],
            expReward: [420, 420],
            moneyReward: [500, 500],
			resistAttack: true
          },
          720: {
            name: "Grand Knight",
            hp: 800,
            damageRange: [60, 150],
            expReward: [480, 480],
            moneyReward: [480, 480],
            resistAll: true
          },
          740: {
            name: "Six-Eyed Calamity",
            hp: 500,
            damageRange: [90, 180],
            expReward: [600, 600],
            moneyReward: [560, 560],
            resistAll: true
		  },
          760: {
            name: "Dragon King",
            hp: 800,
            damageRange: [80, 160],
            expReward: [900, 900],
            moneyReward: [800, 800],
			resistAttack: true
          },
          780: {
            name: "The Black King",
            hp: 900,
            damageRange: [90, 170],
            expReward: [950, 950],
            moneyReward: [900, 900],
			resistMagic: true
          },
          800: {
            name: "Omni",
            hp: 1000,
            damageRange: [75, 150],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			resistAttack: true,
			resistMagic: true
          },
	  820: {
            name: "Goblin King",
            hp: 100,
            damageRange: [20, 30],
            expReward: [30, 30],
            moneyReward: [30, 30]
          },
          840: {
            name: "Zombie Mutant",
            hp: 120,
            damageRange: [25, 55],
            expReward: [70, 70],
            moneyReward: [70, 70]
          },
          860: {
            name: "Giant Lord",
            hp: 250,
            damageRange: [30, 65],
            expReward: [100, 100],
            moneyReward: [100, 100],
            resistAttack: true
          },
          880: {
            name: "Skeleton King",
            hp: 110,
            damageRange: [40, 80],
            expReward: [120, 120],
            moneyReward: [120, 120]
          },
          900: {
            name: "Spider Queen",
            hp: 140,
            damageRange: [45, 75],
            expReward: [150, 150],
            moneyReward: [150, 150]
          },
          920: {
            name: "The Witch",
            hp: 120,
            damageRange: [50, 100],
            expReward: [180, 180],
            moneyReward: [180, 180],
            resistMagic: true
          },
          940: {
            name: "Titan Golem",
            hp: 350,
            damageRange: [50, 80],
            expReward: [210, 210],
            moneyReward: [210, 210],
            resistAll: true
          },
          960: {
            name: "Wyvern",
            hp: 200,
            damageRange: [50, 90],
            expReward: [240, 240],
            moneyReward: [240, 240],
			resistAttack: true
          },
          980: {
            name: "Giant Sandworm",
            hp: 150,
            damageRange: [60, 100],
            expReward: [250, 250],
            moneyReward: [250, 250]
          },
          1000: {
            name: "Titanoboa Lord",
            hp: 170,
            damageRange: [60, 100],
            expReward: [280, 280],
            moneyReward: [280, 280]
          },
          1020: {
            name: "Abominable Snowman",
            hp: 190,
            damageRange: [70, 120],
            expReward: [300, 300],
            moneyReward: [300, 300]
          },
          1040: {
            name: "Omegalodon",
            hp: 200,
            damageRange: [50, 120],
            expReward: [320, 320],
            moneyReward: [320, 320],
            resistAttack: true
          },
          1060: {
            name: "Leviathan",
            hp: 300,
            damageRange: [60, 140],
            expReward: [360, 360],
            moneyReward: [360, 360],
            resistAttack: true
          },
          1080: {
            name: "Angel",
            hp: 320,
            damageRange: [60, 150],
            expReward: [400, 400],
            moneyReward: [400, 400],
            resistMagic: true
          },
          1100: {
            name: "Mega Meta Mecha Annihilator - Model: Ultima",
            hp: 600,
            damageRange: [80, 160],
            expReward: [420, 420],
            moneyReward: [500, 500],
			resistAttack: true
          },
          1120: {
            name: "Grand Knight",
            hp: 800,
            damageRange: [60, 150],
            expReward: [480, 480],
            moneyReward: [480, 480],
            resistAll: true
          },
          1140: {
            name: "Six-Eyed Calamity",
            hp: 500,
            damageRange: [90, 180],
            expReward: [600, 600],
            moneyReward: [560, 560],
            resistAll: true
		  },
          1160: {
            name: "Dragon King",
            hp: 800,
            damageRange: [80, 160],
            expReward: [900, 900],
            moneyReward: [800, 800],
			resistAttack: true
          },
          1180: {
            name: "The Black King",
            hp: 900,
            damageRange: [90, 170],
            expReward: [950, 950],
            moneyReward: [900, 900],
			resistMagic: true
          },
          1200: {
            name: "Omni",
            hp: 1000,
            damageRange: [75, 150],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			resistAttack: true,
			resistMagic: true
          },
	  1220: {
            name: "Goblin King",
            hp: 100,
            damageRange: [20, 30],
            expReward: [30, 30],
            moneyReward: [30, 30]
          },
          1240: {
            name: "Zombie Mutant",
            hp: 120,
            damageRange: [25, 55],
            expReward: [70, 70],
            moneyReward: [70, 70]
          },
          1260: {
            name: "Giant Lord",
            hp: 250,
            damageRange: [30, 65],
            expReward: [100, 100],
            moneyReward: [100, 100],
            resistAttack: true
          },
          1280: {
            name: "Skeleton King",
            hp: 110,
            damageRange: [40, 80],
            expReward: [120, 120],
            moneyReward: [120, 120]
          },
          1300: {
            name: "Spider Queen",
            hp: 140,
            damageRange: [45, 75],
            expReward: [150, 150],
            moneyReward: [150, 150]
          },
          1320: {
            name: "The Witch",
            hp: 120,
            damageRange: [50, 100],
            expReward: [180, 180],
            moneyReward: [180, 180],
            resistMagic: true
          },
          1340: {
            name: "Titan Golem",
            hp: 350,
            damageRange: [50, 80],
            expReward: [210, 210],
            moneyReward: [210, 210],
            resistAll: true
          },
          1360: {
            name: "Wyvern",
            hp: 200,
            damageRange: [50, 90],
            expReward: [240, 240],
            moneyReward: [240, 240],
			resistAttack: true
          },
          1380: {
            name: "Giant Sandworm",
            hp: 150,
            damageRange: [60, 100],
            expReward: [250, 250],
            moneyReward: [250, 250]
          },
          1400: {
            name: "Titanoboa Lord",
            hp: 170,
            damageRange: [60, 100],
            expReward: [280, 280],
            moneyReward: [280, 280]
          },
          1420: {
            name: "Abominable Snowman",
            hp: 190,
            damageRange: [70, 120],
            expReward: [300, 300],
            moneyReward: [300, 300]
          },
          1440: {
            name: "Omegalodon",
            hp: 200,
            damageRange: [50, 120],
            expReward: [320, 320],
            moneyReward: [320, 320],
            resistAttack: true
          },
          1460: {
            name: "Leviathan",
            hp: 300,
            damageRange: [60, 140],
            expReward: [360, 360],
            moneyReward: [360, 360],
            resistAttack: true
          },
          1480: {
            name: "Angel",
            hp: 320,
            damageRange: [60, 150],
            expReward: [400, 400],
            moneyReward: [400, 400],
            resistMagic: true
          },
          1500: {
            name: "Mega Meta Mecha Annihilator - Model: Ultima",
            hp: 600,
            damageRange: [80, 160],
            expReward: [420, 420],
            moneyReward: [500, 500],
			resistAttack: true
          },
          1520: {
            name: "Grand Knight",
            hp: 800,
            damageRange: [60, 150],
            expReward: [480, 480],
            moneyReward: [480, 480],
            resistAll: true
          },
          1540: {
            name: "Six-Eyed Calamity",
            hp: 500,
            damageRange: [90, 180],
            expReward: [600, 600],
            moneyReward: [560, 560],
            resistAll: true
		  },
          1560: {
            name: "Dragon King",
            hp: 800,
            damageRange: [80, 160],
            expReward: [900, 900],
            moneyReward: [800, 800],
			resistAttack: true
          },
          1580: {
            name: "The Black King",
            hp: 900,
            damageRange: [90, 170],
            expReward: [950, 950],
            moneyReward: [900, 900],
			resistMagic: true
          },
          1600: {
            name: "Omni",
            hp: 1000,
            damageRange: [75, 150],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			resistAttack: true,
			resistMagic: true
          },
		  1620: {
            name: "Goblin King",
            hp: 100,
            damageRange: [20, 30],
            expReward: [30, 30],
            moneyReward: [30, 30]
          },
          1640: {
            name: "Zombie Mutant",
            hp: 120,
            damageRange: [25, 55],
            expReward: [70, 70],
            moneyReward: [70, 70]
          },
          1660: {
            name: "Giant Lord",
            hp: 250,
            damageRange: [30, 65],
            expReward: [100, 100],
            moneyReward: [100, 100],
            resistAttack: true
          },
          1680: {
            name: "Skeleton King",
            hp: 110,
            damageRange: [40, 80],
            expReward: [120, 120],
            moneyReward: [120, 120]
          },
          1700: {
            name: "Spider Queen",
            hp: 140,
            damageRange: [45, 75],
            expReward: [150, 150],
            moneyReward: [150, 150]
          },
          1720: {
            name: "The Witch",
            hp: 120,
            damageRange: [50, 100],
            expReward: [180, 180],
            moneyReward: [180, 180],
            resistMagic: true
          },
          1740: {
            name: "Titan Golem",
            hp: 350,
            damageRange: [50, 80],
            expReward: [210, 210],
            moneyReward: [210, 210],
            resistAll: true
          },
          1760: {
            name: "Wyvern",
            hp: 200,
            damageRange: [50, 90],
            expReward: [240, 240],
            moneyReward: [240, 240],
			resistAttack: true
          },
          1780: {
            name: "Giant Sandworm",
            hp: 150,
            damageRange: [60, 100],
            expReward: [250, 250],
            moneyReward: [250, 250]
          },
          1800: {
            name: "Titanoboa Lord",
            hp: 170,
            damageRange: [60, 100],
            expReward: [280, 280],
            moneyReward: [280, 280]
          },
          1820: {
            name: "Abominable Snowman",
            hp: 190,
            damageRange: [70, 120],
            expReward: [300, 300],
            moneyReward: [300, 300]
          },
          1840: {
            name: "Omegalodon",
            hp: 200,
            damageRange: [50, 120],
            expReward: [320, 320],
            moneyReward: [320, 320],
            resistAttack: true
          },
          1860: {
            name: "Leviathan",
            hp: 300,
            damageRange: [60, 140],
            expReward: [360, 360],
            moneyReward: [360, 360],
            resistAttack: true
          },
          1880: {
            name: "Angel",
            hp: 320,
            damageRange: [60, 150],
            expReward: [400, 400],
            moneyReward: [400, 400],
            resistMagic: true
          },
          1900: {
            name: "Mega Meta Mecha Annihilator - Model: Ultima",
            hp: 600,
            damageRange: [80, 160],
            expReward: [420, 420],
            moneyReward: [500, 500],
			resistAttack: true
          },
          1920: {
            name: "Grand Knight",
            hp: 800,
            damageRange: [60, 150],
            expReward: [480, 480],
            moneyReward: [480, 480],
            resistAll: true
          },
          1940: {
            name: "Six-Eyed Calamity",
            hp: 500,
            damageRange: [90, 180],
            expReward: [600, 600],
            moneyReward: [560, 560],
            resistAll: true
		  },
          1960: {
            name: "Dragon King",
            hp: 800,
            damageRange: [80, 160],
            expReward: [900, 900],
            moneyReward: [800, 800],
			resistAttack: true
          },
          1980: {
            name: "The Black King",
            hp: 900,
            damageRange: [90, 170],
            expReward: [950, 950],
            moneyReward: [900, 900],
			resistMagic: true
          },
	  2000: {
            name: "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel",
            hp: 10000,
            damageRange: [105, 210],
            expReward: [10000, 10000],
            moneyReward: [10000, 10000],
			resistAttack: true,
			resistMagic: true
          },
        };
		
        const keys = Object.keys(bosses).map(Number).sort((a, b) => a - b);
        for (let key of keys) {
          if (bossFloor <= key) return bosses[key];
        }
        return bosses[2000];
      }

      function getAllowedEnemies() {
        const nextBossFloor = Math.ceil(floorCount / 20) * 20;
        const nextBoss = getBossForFloor(nextBossFloor);
        let allowed = [];
        switch (nextBoss.name) {
          case "Goblin King":
            allowed = ["Monster Crow", "Wolf", "Bear", "Goblin"];
            break;
          case "Zombie Mutant":
            allowed = ["Zombie", "Skeleton", "Ghoul", "Demon Bat", "Monster Crow", "Giant Spider"];
            break;
          case "Giant Lord":
            allowed = ["Skeleton", "Wolf", "Goblin", "Bear", "Monster Crow"];
            break;
          case "Skeleton King":
            allowed = ["Zombie", "Skeleton", "Ghoul", "Demon Bat", "Monster Crow", "Giant Spider", "Possessed Armor"];
            break;
          case "Spider Queen":
            allowed = ["Giant Spider", "Demon Bat", "Golem", "Ghoul", "Giant Scorpion", "Goblin"];
            break;
          case "The Witch":
            allowed = ["Giant Spider", "Demon Bat", "Demon Crow", "Ghoul", "Piranha", "Skeleton", "Zombie"];
            break;
          case "Titan Golem":
            allowed = ["Golem", "Demon Bat", "Giant Crow", "Skeleton", "Wolf", "Bear", "Giant Spider"];
            break;
          case "Wyvern":
            allowed = ["Golem", "Demon Bat", "Skeleton", "Goblin", "Skeleton", "Giant Spider", "Ghoul", "Possessed Armor"];
            break;
          case "Giant Sandworm":
            allowed = ["Giant Scorpion", "Sandworm", "Skeleton", "Zombie", "Vulture"];
            break;
          case "Titanoboa Lord":
            allowed = ["Sandworm", "Goblin", "Golem", "Skeleton", "Giant Spider"];
            break;
          case "Abominable Snowman":
            allowed = ["Ice Golem", "Ice Spirit", "Possessed Armor", "Skeleton"];
            break;
          case "Omegalodon":
            allowed = ["Piranha", "Shark"];
            break;
          case "Leviathan":
            allowed = ["Piranha", "Shark", "Giant Albatross"];
            break;
          case "Angel":
            allowed = ["Giant Albatross", "Vulture", "Ghoul", "Ice Spirit", "Monster Crow", "Demon Bat"];
            break;
          case "Mega Meta Mecha Annihilator - Model: Ultima":
            allowed = ["Cyborg Guard", "Giant Robot", "Drone"];
            break;
          case "Grand Knight":
            allowed = ["Skeleton", "Wolf", "Bear", "Possessed Armor", "Golem"];
            break;
          case "Six-Eyed Calamity":
            allowed = ["Cursed Spirit", "Shikigami", "Sorcerer"];
            break;
          case "Dragon King":
            allowed = ["Goblin", "Zombie", "Skeleton", "Golem", "Monster Crow", "Wolf", "Ghoul", "Giant Spider", "Demon Bat"];
            break;
          case "The Black King":
            allowed = ["Ghoul"];
            break;
          case "Omni":
            allowed = ["Goblin", "Zombie", "Skeleton", "Golem", "Monster Crow", "Wolf", "Ghoul", "Giant Spider", "Demon Bat", "Giant Scorpion", "Ice Golem", "Ice Spirit", "Piranha", "Shark", "Giant Albatross", "Vulture", "Sandworm", "Possessed Armor", "Bear", "Drone", "Cyborg Guard", "Giant Robot", "Shikigami", "Sorcerer", "Cursed Spirit"];
            break;
	  case "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel":
            allowed = ["Goblin King", "Mutant Zombie", "Giant Lord", "Skeleton King", "Spider Queen", "The Witch", "Titan Golem", "Wyvern", "Giant Sandworm", "Titanoboa Lord", "Abominable Snowman", "Omegalodon", "Leviathan", "Angel", "Mega Meta Mecha Annihilator - Model: Ultima", "Grand Knight", "Six-Eyed Calamity", "Dragon King", "The Black King", "Omni"];
            break;
          default:
            allowed = ["Goblin", "Zombie", "Skeleton", "Golem", "Monster Crow", "Wolf", "Ghoul", "Giant Spider", "Demon Bat", "Giant Scorpion", "Ice Golem", "Ice Spirit", "Piranha", "Shark", "Giant Albatross", "Vulture", "Sandworm", "Possessed Armor", "Bear", "Drone", "Cyborg Guard", "Giant Robot", "Shikigami", "Sorcerer", "Cursed Spirit"];
        }
        return enemies.filter(e => allowed.includes(e.name));
      }
	  
	  const bossRoomEnemySequences = {
  "Goblin King": ["Goblin", "Goblin", "Goblin", "Goblin King"],
  "Mutant Zombie": ["Zombie", "Zombie", "Skeleton", "Mutant Zombie"],
  "Giant Lord": ["Goblin", "Goblin", "Golem", "Giant Lord"],
  "Skeleton King": ["Skeleton", "Skeleton", "Ghoul", "Skeleton King"],
  "Spider Queen": ["Giant Spider", "Giant Spider", "Giant Scorpion", "Spider Queen"],
  "The Witch": ["Demon Crow", "Ghoul", "Ghoul", "The Witch"],
  "Titan Golem": ["Goblin", "Goblin", "Goblin", "Titan Golem"],
  "Wyvern": ["Goblin", "Goblin", "Goblin", "Wyvern"],
  "Giant Sandworm": ["Sandworm", "Sandworm", "Giant Sandworm"],
  "Titanoboa Lord": ["Sandworm", "Giant Sandworm", "Titanoboa Lord"],
  "Abominable Snowman": ["Ice Golem", "Ice Spirit", "Ice Spirit", "Abominable Snowman"],
  "Omegalodon": ["Piranha", "Piranha", "Shark", "Omegalodon"],
  "Leviathan": ["Shark", "Shark", "Omegalodon", "Leviathan"],
  "Angel": ["Giant Albatross", "Giant Albatross", "Ghoul", "Angel"],
  "Mega Meta Mecha Annihilator - Model: Ultima": ["Goblin", "Goblin", "Goblin", "Goblin King"],
  "Grand Knight": ["Possessed Armor", "Possessed Armor", "Golem", "Goblin King"],
  "Six-Eyed Calamity": ["Cursed Spirit", "Cursed Spirit", "Sorcerer", "Shikigami", "Six-Eyed Calamity"],
  "Dragon King": ["Skeleton", "Skeleton", "Golem", "Wyvern", "Dragon King"],
  "The Black King": ["Ghoul", "Ghoul", "Possessed Armor", "Goblin King"],
  "Omni": ["Grand Knight", "Omni"],
  "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel": ["Grand Knight", "The Black King", "Omni", "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel"],
};
	  
      // Shop Items list
      const shopItemsList = [{
        name: "Healing Potion",
        cost: 50,
        type: "healing",
        usableInBattle: true,
        usableOutOfBattle: true,
        usageScope: "both"
      }, {
        name: "Rage Potion",
        cost: 100,
        type: "rage",
        usableInBattle: true,
        usableOutOfBattle: false,
        usageScope: "battle"
      }, {
        name: "Poison Potion",
        cost: 100,
        type: "poison",
        usableInBattle: true,
        usableOutOfBattle: false,
        usageScope: "battle"
      }, {
        name: "Weaken Potion",
        cost: 100,
        type: "weaken",
        usableInBattle: true,
        usableOutOfBattle: false,
        usageScope: "battle"
      }, {
        name: "Iron Potion",
        cost: 80,
        type: "iron",
        usableInBattle: true,
        usableOutOfBattle: false,
        usageScope: "battle"
      }, {
        name: "Dice",
        cost: 1000,
        type: "dice",
        usableInBattle: true,
        usableOutOfBattle: true,
        usageScope: "both"
      }, {
        name: "Armor",
        cost: 300,
        type: "equipment",
        usableInBattle: false,
        usableOutOfBattle: false,
        usageScope: "passive"
      }, {
        name: "Sword",
        cost: 360,
        type: "equipment",
        usableInBattle: false,
        usableOutOfBattle: false,
        usageScope: "passive"
      }, {
        name: "Staff",
        cost: 360,
        type: "equipment",
        usableInBattle: false,
        usableOutOfBattle: false,
        usageScope: "passive"
      }, {
        name: "Scarf",
        cost: 300,
        type: "equipment",
        usableInBattle: false,
        usableOutOfBattle: false,
        usageScope: "passive"
      }, {
        name: "Glasses",
        cost: 320,
        type: "equipment",
        usableInBattle: false,
        usableOutOfBattle: false,
        usageScope: "passive"
      }, {
        name: "Sharpener",
        cost: 360,
        type: "equipment",
        usableInBattle: false,
        usableOutOfBattle: false,
        usageScope: "passive"
      }, ];
      /*******************
       * INITIALIZATION
       *******************/
      function initGame() {
		if (titleMusic) {
			titleMusic.pause();
		}
		titleMusic.currentTime = 0;
		stopBeatZoom();
        createRoom(0, 0, ROOM_TYPES.EMPTY);
        const startRoom = map["0_0"];
        startRoom.element.innerHTML = '<div class="player"></div>';
        centerCamera();
        generateAdjacentRooms(0, 0);
      }
	  
  var playButton = document.getElementById("playButton");

document.getElementById("closeShopBtn").addEventListener("click", () => {
  shopMenu.style.display = "none";
  battleTint.style.display = "none";
});

function startBeatZoom() {
  const el = document.getElementById("titleScreen");
  if (!el) return;
  beatTimer = setInterval(() => {
    el.classList.add("zoom-beat");
    el.addEventListener("animationend", () => {
      el.classList.remove("zoom-beat");
    }, { once: true });
  }, BEAT_INTERVAL_MS);
}

function stopBeatZoom() {
  clearInterval(beatTimer);
  beatTimer = null;
  const el = document.getElementById("titleScreen");
  if (el) el.classList.remove("zoom-beat");
}

titleMusic.play().catch((e) => {
  console.log("Title music playback prevented:", e);
});

function initializeTitleMusic() {
  if (titleMusic.paused) {
    titleMusic.play()
      .then(() => {
        startBeatZoom();
      })
      .catch((e) =>
        console.log("Title music playback prevented:", e)
      );
  }
  document.removeEventListener("click", initializeTitleMusic);
}
document.addEventListener("click", initializeTitleMusic);

titleMusic.play().catch(function(error) {
    console.error("Error starting the music:", error);
  });

  titleMusic.addEventListener("playing", function() {
    playButton.style.display = "block";
  });

document.getElementById("playButton").addEventListener("click", function () {
  titleMusic.pause();
  stopBeatZoom();
  document.getElementById("titleScreen").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  
  if (!titleMusic.paused) {
    titleMusic.pause();
    titleMusic.currentTime = 0;
  }
});
titleMusic.pause();

// Play the world background music.
function playWorldMusic(worldName) {
  // If the same world's music is already playing, do nothing.
  if (currentBGM && currentWorld === worldName) return;
  if (titleMusic) {
			titleMusic.pause();
		}
  // Pause and save the current background music if one is already playing.
  if (currentBGM) {
    currentBGM.pause();
    if (bgmTracks[currentWorld]) {
      bgmTracks[currentWorld].savedTime = currentBGM.currentTime;
    }
  }

  // Set the current world.
  currentWorld = worldName;
  let trackObj = bgmTracks[worldName];

  // Check if the track exists.
  if (!trackObj) {
    console.error("No track defined for world:", worldName);
    return;
  }

  // Retrieve and configure the audio object.
  currentBGM = trackObj.audio;
  currentBGM.currentTime = trackObj.savedTime || 0;
  currentBGM.loop = true;
  currentBGM.play();
}

// Stop the current world music and save its time.
function stopWorldMusic() {
  if (currentBGM) {
    currentBGM.pause();
    if (bgmTracks[currentWorld]) {
      bgmTracks[currentWorld].savedTime = currentBGM.currentTime;
    }
    currentBGM = null;
  }
}

// Resume the world music after a battle.
function resumeWorldMusicAfterBattle() {
  if (currentWorld) {
    let trackObj = bgmTracks[currentWorld];
    if (!trackObj) {
      console.error("No track defined for current world:", currentWorld);
      return;
    }
    currentBGM = trackObj.audio;
    currentBGM.currentTime = trackObj.savedTime || 0;
    currentBGM.loop = true;
    currentBGM.play();
  }
}

      /*******************
       * ROOM FUNCTIONS
       *******************/
      function createRoom(x, y, type, options = {}) {
		const { disguised = false } = options;
        const key = x + "_" + y;
        if (map[key] && map[key].locked) return;
        const roomDiv = document.createElement("div");
        roomDiv.classList.add("room");
        roomDiv.style.left = x * roomSize + "px";
        roomDiv.style.top = y * roomSize + "px";
        roomDiv.dataset.x = x;
        roomDiv.dataset.y = y;
        roomDiv.dataset.type = type;
		roomDiv.dataset.disguised = disguised;
        if ((type === ROOM_TYPES.TRAP && !disguised) || ([ROOM_TYPES.BATTLE, ROOM_TYPES.HEALING, ROOM_TYPES.SHOP, ROOM_TYPES.BOSS, ROOM_TYPES.ALTAR, ROOM_TYPES.CASINO, ROOM_TYPES.LOOT].includes(type))) {
          const img = document.createElement("img");
          img.src = roomIcons[type];
          img.alt = type;
          img.style.width = "80%";
          roomDiv.appendChild(img);
        }
        roomDiv.addEventListener("click", () => moveToRoom(x, y));
        mapDiv.appendChild(roomDiv);
        map[key] = {
          x,
          y,
          type,
          element: roomDiv,
		  disguisedTrap: disguised,
          secretAmbush
        };
      }

      function generateAdjacentRooms(cx, cy) {
  if (floorCount % 20 === 0 && !bossRoomGenerated) {
    allowedMoves = [];
    const pos = { x: cx, y: cy - 1 };
    createRoom(pos.x, pos.y, ROOM_TYPES.BOSS);
    allowedMoves.push(pos.x + "_" + pos.y);
    bossRoomGenerated = true;
  } else {
    const positions = [
      { x: cx - 1, y: cy - 1 },
      { x: cx, y: cy - 1 },
      { x: cx + 1, y: cy - 1 }
    ];
    let battleCount = 0;
    // Object to keep track of which non-battle types have been used in this generation.
    let usedNonBattleTypes = {};
    // Define the list of allowed non-battle types.
    const nonBattleTypes = [
      ROOM_TYPES.HEALING,
      ROOM_TYPES.ALTAR,
      ROOM_TYPES.CASINO,
      ROOM_TYPES.SHOP,
      ROOM_TYPES.LOOT,
      ROOM_TYPES.EMPTY,
      ROOM_TYPES.AMBUSH,
    ];
    allowedMoves = [];
    for (let i = 0; i < positions.length; i++) {
      let type;
	  let disguised = false;
      let secretAmbush = false;
      
      if (trapCount < 2 && Math.random() < 0.05) {
      type = ROOM_TYPES.TRAP;
      trapCount++;
      if (Math.random() < 0.5) disguised = true;
    } 
	  if (battleCount < 2 && Math.random() < 0.5) {
        type = ROOM_TYPES.BATTLE;
        battleCount++;
      } else if (floorCount % 2 === 0) {
        type = ROOM_TYPES.HEALING;
      } else if ((floorCount - lastAltarFloor) >= 5 && Math.random() < 0.2) {
        type = ROOM_TYPES.ALTAR;
        lastAltarFloor = floorCount;
      } else {
        const rand = Math.random() * 100;
        if (shopCooldown > 0) {
          type = rand < 50 ? ROOM_TYPES.HEALING : ROOM_TYPES.EMPTY;
          shopCooldown--;
        } else {
          if (rand < 15) {
            type = ROOM_TYPES.CASINO;
          } else if (rand < 25) {
            type = ROOM_TYPES.SHOP;
          } else if (rand < 40) {
            type = ROOM_TYPES.LOOT;
          } else if (rand < 65) {
            type = ROOM_TYPES.HEALING;
          } else {
            type = ROOM_TYPES.EMPTY;
          }
        }
      }
	  
      if (type === ROOM_TYPES.BATTLE || type === ROOM_TYPES.HEALING || type === ROOM_TYPES.EMPTY) {
        if (Math.random() < 0.1) {
          type = ROOM_TYPES.AMBUSH;
        }
      }
      
      // If the room isn't a battle room, ensure its type hasn't already been generated.
      if (type !== ROOM_TYPES.BATTLE) {
        if (usedNonBattleTypes[type]) {
          // Pick an alternative from nonBattleTypes that hasn't been used yet.
          let available = nonBattleTypes.filter(t => !usedNonBattleTypes[t]);
          if (available.length > 0) {
            type = available[Math.floor(Math.random() * available.length)];
          }
          // Otherwise, if none available, the current type is retained.
        }
        usedNonBattleTypes[type] = true;
      }
      
      createRoom(positions[i].x, positions[i].y, type);
      allowedMoves.push(positions[i].x + "_" + positions[i].y);
    }
  }
}
      function shuffle(array) {
        let currentIndex = array.length,
          temporaryValue, randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
	  
	  function lockActions() {
		actionsLocked = true;
	  }

	  function unlockActions() {
		actionsLocked = false;
	  }

	  function newTurn() {
		turnNumber++;
		logBattle("----------Turn " + turnNumber + "----------");
		setTimeout(() => {
			unlockActions();
		}, 125);
	  }

      function handleLootRoom() {
  // Randomly decide: 50% chance for an item drop, 50% for money.
  if (Math.random() < 0.5) {
    // Item drop.
    let droppedItem = getLootItem();
    if (droppedItem) {
      // Find first free slot.
      const freeIndex = player.inventory.findIndex(slot => slot === null);
      if (freeIndex !== -1) {
        player.inventory[freeIndex] = { ...droppedItem };
        logBattle(`Loot found: ${droppedItem.name} added to inventory!`);
        // Apply passive effect immediately if it's equipment.
        if (droppedItem.type === "equipment") {
          if (droppedItem.name === "Armor") {
            player.defense += 10;
          }
          if (droppedItem.name === "Sword") {
            player.attack += 5;
          }
          if (droppedItem.name === "Staff") {
            player.magic += 5;
          }
          if (droppedItem.name === "Scarf") {
            player.dodgeChance += 0.1;
          }
          if (droppedItem.name === "Glasses") {
            player.neverMiss = true;
          }
          if (droppedItem.name === "Sharpener") {
            player.critMultiplier = 2;
          }
          alert(`${droppedItem.name}'s passive effect has been activated!`);
        }
      } else {
        logBattle("Loot found, but inventory is full!");
      }
    } else {
      // Fallback: if no valid item was found, give money.
      let moneyGained = Math.floor(Math.random() * 51) + 50;
      player.money += moneyGained;
      logBattle(`Loot found: Gained $${moneyGained}!`);
    }
  } else {
    // Money drop.
    let moneyGained = Math.floor(Math.random() * 51) + 50;
    player.money += moneyGained;
    logBattle(`Loot found: Gained $${moneyGained}!`);
  }
  updateStats();
}
      // Returns a valid loot item. If the drop is an equipment and player already has it, re-run the drop.
      function getLootItem(attempts = 0) {
        // Prevent infinite loops – try up to 5 times.
        if (attempts > 5) return null;
        const randomIndex = Math.floor(Math.random() * shopItemsList.length);
        const item = shopItemsList[randomIndex];
        // If the item is equipment (unique) and the player already has it, try again.
        if (item.type === "equipment" && hasItem(item.name)) {
          return getLootItem(attempts + 1);
        }
        return item;
      }
      /*******************
       * MOVEMENT & CAMERA
       *******************/
      function moveToRoom(x, y) {
  const key = x + "_" + y;
  if (!allowedMoves.includes(key)) {
    console.log("Invalid move. Please choose one of the newly generated rooms.");
    return;
  }
  // Remove player from old room.
  const oldKey = player.x + "_" + player.y;
  if (map[oldKey]) {
    map[oldKey].element.innerHTML = "";
    if (["battle", "healing", "shop", "boss", "ambush", "loot", "trap"].includes(map[oldKey].type)) {
      const img = document.createElement("img");
      img.src = roomIcons[map[oldKey].type];
      img.alt = map[oldKey].type;
      img.style.width = "80%";
      map[oldKey].element.appendChild(img);
    }
  }
  // Update player's position.
  player.x = x;
  player.y = y;
  map[key].element.innerHTML = '<div class="player"></div>';
  centerCamera();

  // Trigger the room event.
  if (map[key].secretAmbush) {
    map[key].secretAmbush = false;
    // Show ambush icon (if needed) then start ambush battle.
    const img = document.createElement("img");
    img.src = roomIcons[ROOM_TYPES.AMBUSH];
    img.alt = ROOM_TYPES.AMBUSH;
    img.style.width = "80%";
    map[key].element.appendChild(img);
    // Start ambush battle and then finalize the room when done.
    startAmbushBattle(() => finalizeRoom(key));
    return;
  }
  if (map[key].type === ROOM_TYPES.BATTLE) {
    startBattle();
  } else if (map[key].type === ROOM_TYPES.HEALING) {
    healPlayer();
  } else if (map[key].type === ROOM_TYPES.SHOP) {
    shopCooldown = 6;
    openShopMenu();
  } else if (map[key].type === ROOM_TYPES.BOSS) {
    startBossBattle();
  } else if (map[key].type === ROOM_TYPES.ALTAR) {
    initiateLevelUp(3);
  } else if (map[key].type === ROOM_TYPES.CASINO) {
    openCasino(() => finalizeRoom(key)); // Pass a callback to finalize when casino play is done.
    return; // Exit here – the casino callback will finalize.
  } else if (map[key].type === ROOM_TYPES.AMBUSH) {
    startAmbushBattle(() => finalizeRoom(key));
    return; // Exit here – ambush callback finalizes after completion.
  } else if (map[key].type === ROOM_TYPES.LOOT) {
    handleLootRoom();
  } else if (map[key].type === ROOM_TYPES.TRAP) {
    handleTrapRoom();
  }
  
  // Finalize the room if none of the above events delay room completion.
  finalizeRoom(key);
}

function finalizeRoom(key) {
  // Mark the room as consumed.
  map[key].type = ROOM_TYPES.EMPTY;
  map[key].element.innerHTML = '<div class="player"></div>';
  
  // Update move counters and generate adjacent rooms.
  roomMoves++;
  roomsThisFloor++;
  if (roomsThisFloor >= 3) {
    floorCount++;
    roomsThisFloor = 0;
    bossRoomGenerated = false;
  }
  generateAdjacentRooms(player.x, player.y);
  updateBackgroundColor();
}

      function centerCamera() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = centerX - player.x * roomSize - roomSize / 2;
        const offsetY = centerY - player.y * roomSize - roomSize / 2;
        mapDiv.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
      /*******************
       * ROOM EFFECTS
       *******************/
      function healPlayer() {
        player.hp = player.maxHp;
        updateStats();
      }
      /*******************
       * STATS UI
       *******************/
      function updateStats() {
        document.getElementById("hpText").textContent = player.hp + "/" + player.maxHp;
        const hpPercent = (player.hp / player.maxHp) * 100;
        document.getElementById("hpBarInner").style.width = hpPercent + "%";
        document.getElementById("expText").textContent = player.exp + "/" + player.expToLevel;
        const expPercent = (player.exp / player.expToLevel) * 100;
        document.getElementById("expBarInner").style.width = expPercent + "%";
        document.getElementById("attackStat").textContent = player.attack;
        document.getElementById("defenseStat").textContent = player.defense;
        document.getElementById("magicStat").textContent = player.magic;
        document.getElementById("agilityStat").textContent = player.agility;
        document.getElementById("perceptionStat").textContent = player.perception;
        document.getElementById("potentialStat").textContent = player.potential;
        document.getElementById("moneyStat").textContent = player.money;
        document.getElementById("playerLevel").textContent = "Player Level: " + player.level;
        updateInventoryDisplay();
      }

      function updateInventoryDisplay() {
        const slots = document.querySelectorAll("#inventorySlots .inventorySlot");
        for (let i = 0; i < slots.length; i++) {
          const item = player.inventory[i];
          slots[i].textContent = item ? item.name : "";
        }
      }
      /*******************
       * BATTLE MECHANICS
       *******************/
      const enemyDodgeChance = 0.05;

      function startBattle() {
        battleLog.innerHTML = "";
        battleLog.style.display = "block";
        battleTint.style.display = "block";
		turnNumber = 1;
		logBattle("----------Turn " + turnNumber + "----------");
		unlockActions();
        let allowedEnemies = getAllowedEnemies();
        currentEnemy = JSON.parse(JSON.stringify(allowedEnemies[Math.floor(Math.random() * allowedEnemies.length)]));
        let floorBonus = Math.floor(floorCount / 10);
        currentEnemy.hp += 15 * floorBonus;
        currentEnemy.damageRange = [
          currentEnemy.damageRange[0] + 2 * floorBonus,
          currentEnemy.damageRange[1] + 2 * floorBonus,
        ];
        let rewardMultiplier = Math.pow(2, floorBonus);
        currentEnemy.expReward = [currentEnemy.expReward[0] * rewardMultiplier, currentEnemy.expReward[1] * rewardMultiplier];
        currentEnemy.moneyReward = [currentEnemy.moneyReward[0] * rewardMultiplier, currentEnemy.moneyReward[1] * rewardMultiplier];
        currentEnemy.poison = false;
        currentEnemy.weaken = false;
        player.rage = false;
        player.iron = false;
        updateEnemyInfo();
        battleMenu.style.display = "block";
      }

      function startBossBattle() {
  alert("You have entered a Boss Room. Be careful.");
  stopWorldMusic();
  if (currentEnemy === "Omni") {
	  omniTrack.play();
  } else if (currentEnemy === "Six-Eyed Calamity") {
	  secTrack.play();
  } else {
	  bossTrack.play();
  }
  battleLog.innerHTML = "";
  battleLog.style.display = "block";
  battleTint.style.display = "block";
  let floorBonus = Math.floor(floorCount / 10);
  let bossData = getBossForFloor(floorCount);
  bossData.hp += 15 * floorBonus;
  bossData.damageRange = [
    bossData.damageRange[0] + 2 * floorBonus,
    bossData.damageRange[1] + 2 * floorBonus,
  ];
  let rewardMultiplier = Math.pow(2, floorBonus);
  bossData.expReward = bossData.expReward[0] * rewardMultiplier;
  bossData.moneyReward = bossData.moneyReward[0] * rewardMultiplier;
  currentEnemy = JSON.parse(JSON.stringify(bossData));
  currentEnemy.boss = true;
  currentEnemy.poison = false;
  currentEnemy.weaken = false;
  currentEnemy.maxHp = currentEnemy.hp;
  player.rage = false;
  player.iron = false;
  updateEnemyInfo();
  battleMenu.style.display = "block";
  
  // Instead of simply unlocking actions, call the enemy turn wrapper after a delay
  setTimeout(enemyTurnWrapper, 250);
}
      /*******************
       * AMBUSH BATTLE SYSTEM
       *******************/
      function startAmbushBattle(onComplete) {
  // store the finalizeRoom callback
  ambushCompleteCallback = onComplete || null;
  stopWorldMusic();
  ambushTrack.play();
  battleLog.innerHTML = "";
  battleLog.style.display = "block";
  battleTint.style.display = "block";
  alert("You were ambushed!");

  // spawn 2–6 enemies
  const enemyCount = Math.floor(Math.random() * 5) + 2; 
  ambushEnemiesQueue = [];

  for (let i = 0; i < enemyCount; i++) {
    const allowed = getAllowedEnemies();
    const e = JSON.parse(JSON.stringify(
      allowed[Math.floor(Math.random() * allowed.length)]
    ));
    const bonus = Math.floor(floorCount / 10);
    e.hp += 15 * bonus;
    e.damageRange = [
      e.damageRange[0] + 2 * bonus,
      e.damageRange[1] + 2 * bonus
    ];
    const mult = Math.pow(2, bonus);
    e.expReward   = [e.expReward[0]   * mult, e.expReward[1]   * mult];
    e.moneyReward = [e.moneyReward[0] * mult, e.moneyReward[1] * mult];
    e.poison = false;
    e.weaken = false;
    ambushEnemiesQueue.push(e);
  }

  // start with the first enemy
  currentEnemy = ambushEnemiesQueue.shift();
  updateEnemyInfo();
  battleMenu.style.display = "block";
  unlockActions();
}

function getEnemyByName(enemyName) {
  return enemies.find(e => e.name.toLowerCase() === enemyName.toLowerCase());
}

      function updateEnemyInfo() {
        let name = currentEnemy.name;
        if (currentEnemy.poison) name += "-Poisoned";
        if (currentEnemy.weaken) name += "-Weakened";
        enemyInfo.innerHTML = `
					<h3>${name}</h3>
					<p>HP: ${currentEnemy.hp}</p>`;
      }

      function endBattle() {
  battleMenu.style.display = "none";
  battleLog.style.display = "none";
  battleTint.style.display = "none";
  inventoryMenu.style.display = "none";

  // reward the player if the enemy died
  if (currentEnemy && currentEnemy.hp <= 0) {
    let gainedExp, gainedMoney;
    if (currentEnemy.boss) {
      gainedExp  = currentEnemy.expReward;
      gainedMoney = currentEnemy.moneyReward;
    } else {
      const [minE, maxE] = currentEnemy.expReward;
      gainedExp  = Math.floor(Math.random() * (maxE - minE + 1)) + minE;
      const [minM, maxM] = currentEnemy.moneyReward;
      gainedMoney = Math.floor(Math.random() * (maxM - minM + 1)) + minM;
    }
    logBattle(`Player won and gained ${gainedExp} EXP!`);
    addExp(gainedExp);
    player.money += gainedMoney;
    logBattle(`Player gained ${gainedMoney} money!`);
    updateStats();
  }

  // if more ambush enemies remain, queue the next one
  if (ambushEnemiesQueue && ambushEnemiesQueue.length > 0) {
    currentEnemy = ambushEnemiesQueue.shift();
    logBattle("Next enemy appears!");
    updateEnemyInfo();
    battleMenu.style.display = "block";
    battleLog.style.display = "block";
    battleTint.style.display = "block";
    unlockActions();
    return;
  }

  // if this was an ambush, fire the finalizeRoom callback
  if (ambushCompleteCallback) {
    const cb = ambushCompleteCallback;
    ambushCompleteCallback = null;
    ambushEnemiesQueue = null;
	ambushTrack.pause();
	ambushTrack.currentTime = 0;
	resumeWorldMusicAfterBattle();
    cb();
    return;
  }
  
  // otherwise, normal battle cleanup
  currentEnemy = null;
  ambushTrack.pause();
  ambushTrack.currentTime = 0;
  bossTrack.pause();
  bossTrack.currentTime = 0;
  secTrack.pause();
  secTrack.currentTime = 0;
  omniTrack.pause();
  omniTrack.currentTime = 0;
  if (!currentBGM) {
	  resumeWorldMusicAfterBattle();
  }
}



      function playerAttack(moveType) {
        if (!currentEnemy) return;
        if (!player.neverMiss && Math.random() < enemyDodgeChance) {
          logBattle(`${currentEnemy.name} dodged the Player's attack!`);
		  setTimeout(enemyTurnWrapper, 0);
          enemyTurn();
          return;
        }
        let baseDamage;
        if (moveType === "attack") {
          const multiplier = Math.random() * (1.15 - 0.85) + 0.85;
          baseDamage = Math.floor(multiplier * player.attack);
        } else if (moveType === "magic") {
          const multiplier = Math.random() * (2 - 1) + 1;
          baseDamage = Math.floor(multiplier * player.magic);
        }
        let damage = Math.round(baseDamage);
        if (damage < 1) damage = 1;
        let resisted = false;
        if (currentEnemy.reductionAll) {
          damage = Math.round(damage * (1 - currentEnemy.reductionAll));
          resisted = true;
        }
        if (moveType === "attack" && currentEnemy.reductionAttack) {
          damage = Math.round(damage * (1 - currentEnemy.reductionAttack));
          resisted = true;
        }
        if (moveType === "magic" && currentEnemy.reductionMagic) {
          damage = Math.round(damage * (1 - currentEnemy.reductionMagic));
          resisted = true;
        }
        let isCritical = false;
		let critMulValue = Math.round((player.perception / 20) + 2);
        if (moveType === "attack") {
          if (Math.random() < 0.05 + (player.perception - 1) * 0.001) {
            damage = Math.round(damage * critMulValue);
            isCritical = true;
			if (player.rage) {
				damage = Math.round(damage * 2);
			}
          }
        }
        if (isCritical) {
          logBattle(`Player attacked and dealt ${damage} critical damage!`);
        } else if (resisted) {
          logBattle(`Player ${moveType === "attack" ? "attacked" : "cast magic"} and dealt ${damage} resisted damage.`);
        } else {
          logBattle(`Player ${moveType === "attack" ? "attacked" : "cast magic"} and dealt ${damage} damage.`);
        }
		if (player.rage) {
			damage = Math.round(damage * 2);
		}
        currentEnemy.hp -= damage;
        if (currentEnemy.hp < 0) currentEnemy.hp = 0;
        updateEnemyInfo();
        if (currentEnemy.hp <= 0) {
          alert(`${currentEnemy.name} defeated!`);
          endBattle();
          return;
        }
		if (damage < 1) damage = 1;
		setTimeout(enemyTurnWrapper, 250);
      }
	  
	  function enemyTurnWrapper() {
  enemyTurn();
  // If the enemy is still alive and not defeated during its turn...
  if (currentEnemy && currentEnemy.hp > 0) {
    // Process poison damage if the enemy is poisoned:
    if (currentEnemy.poison) {
      const poisonDamage = Math.max(Math.round(currentEnemy.hp * 0.02), 1);
      logBattle(`${currentEnemy.name} took ${poisonDamage} Poison Damage!`);
      currentEnemy.hp -= poisonDamage;
      if (currentEnemy.hp < 0) currentEnemy.hp = 0;
      updateEnemyInfo();
    }
    // Check if the enemy died after poison damage.
    if (currentEnemy.hp <= 0) {
      alert(`${currentEnemy.name} defeated!`);
      endBattle();
      return;
    }
  }
  setTimeout(newTurn, 250);
}

      function enemyTurn() {
        if (Math.random() < player.dodgeChance + (player.agility - 1) * 0.001) {
          logBattle("Player dodged the enemy attack!");
          updateStats();
          return;
        }
        const [minD, maxD] = currentEnemy.damageRange;
        let enemyDamage = Math.floor(Math.random() * (maxD - minD + 1)) + minD;
        enemyDamage -= Math.floor(enemyDamage * (player.defense / 100));
        if (enemyDamage < 0) enemyDamage = 1;
        enemyDamage = Math.floor(enemyDamage / 2);
        let enemyCritical = false;
        if (Math.random() < 0.05) {
          enemyDamage *= 2;
          enemyCritical = true;
        }
        if (player.iron) {
          enemyDamage = Math.floor(enemyDamage / 2);
        }
        player.hp -= enemyDamage;
        if (player.hp < 0) player.hp = 0;
        if (enemyCritical) {
          logBattle(`${currentEnemy.name} attacked and dealt ${enemyDamage} critical damage!`);
        } else {
          logBattle(`${currentEnemy.name} attacked and dealt ${enemyDamage} damage.`);
        }
        updateStats();
        if (player.hp <= 0) {
          showDeathMenu();
        }
		if (currentEnemy.boss && Math.random() < 0.10) {
    const healAmt = Math.ceil(currentEnemy.maxHp * 0.10);
    currentEnemy.hp = Math.min(currentEnemy.hp + healAmt, currentEnemy.maxHp);
    logBattle(`${currentEnemy.name} healed ${healAmt} HP!`);
    updateEnemyInfo();
    return;
  }
      }

      function attemptRun() {
        if (ambushEnemiesQueue && ambushEnemiesQueue.length > 0) {
          logBattle("Cannot run during ambushes!");
		  setTimeout(enemyTurnWrapper, 250);
          return;
        }
        if (currentEnemy && currentEnemy.boss) {
          logBattle("Cannot run from boss fights!");
		  setTimeout(enemyTurnWrapper, 250);
          return;
        }
        if (Math.random() < 0.5) {
          logBattle("Player attempted to run and succeeded!");
          alert("Successfully escaped!");
		  setTimeout(enemyTurnWrapper, 250);
		  endBattle();
        } else {
          logBattle("Player attempted to run and failed!");
		  setTimeout(enemyTurnWrapper, 250);
        }
      }
      /*******************
       * BACKGROUND COLOR UPDATE
       *******************/
      function updateBackgroundColor() {
  const nextBossFloor = Math.ceil(floorCount / 20) * 20;
  const nextBoss = getBossForFloor(nextBossFloor);
  let bgColor = "black";
  let worldNum = 0;
  let worldName = "";
  switch (nextBoss.name) {
    case "Goblin King":
      bgColor = "#113b00";
      worldNum = 1;
      worldName = "Deep Forests";
      break;
    case "Zombie Mutant":
      bgColor = "#2a5e31";
      worldNum = 2;
      worldName = "Abandoned Graveyard";
      break;
    case "Giant Lord":
      bgColor = "#5c2c00";
      worldNum = 3;
      worldName = "Deathly Cliffs";
      break;
    case "Skeleton King":
      bgColor = "#8a8a8a";
      worldNum = 4;
      worldName = "Bone Castle";
      break;
    case "Spider Queen":
      bgColor = "#202421";
      worldNum = 5;
      worldName = "Silkwoven Caverns";
      break;
    case "The Witch":
      bgColor = "#1e0033";
      worldNum = 6;
      worldName = "Arcane Swamps";
      break;
    case "Titan Golem":
      bgColor = "#242424";
      worldNum = 7;
      worldName = "Shi Mountains";
      break;
    case "Wyvern":
      bgColor = "#a32c00";
      worldNum = 8;
      worldName = "Archaic Caverns";
      break;
    case "Giant Sandworm":
      bgColor = "#ffe863";
      worldNum = 9;
      worldName = "Scorching Desert";
      break;
    case "Titanoboa Lord":
      bgColor = "#1c0a00";
      worldNum = 10;
      worldName = "Never-Ending Tunnels";
      break;
    case "Abominable Snowman":
      bgColor = "#cedede";
      worldNum = 11;
      worldName = "Freezing Tundra";
      break;
    case "Omegalodon":
      bgColor = "#2954a3";
      worldNum = 12;
      worldName = "The Black Sea";
      break;
    case "Leviathan":
      bgColor = "#0300a1";
      worldNum = 13;
      worldName = "Vast Ocean";  // Adjusted the world name to match the bgmTracks key.
      break;
    case "Angel":
      bgColor = "#ffffff";
      worldNum = 14;
      worldName = "Sky Dimension";
      break;
    case "Mega Meta Mecha Annihilator - Model: Ultima":
      bgColor = "#7bb8c7";
      worldNum = 15;
      worldName = "Future Megalopolis";
      break;
    case "Grand Knight":
      bgColor = "#260d00";
      worldNum = 16;
      worldName = "Ancient Kingdom";
      break;
    case "Six-Eyed Calamity":
      bgColor = "#b700ff";
      worldNum = 17;
      worldName = "Shinjuku";
      break;
    case "Dragon King":
      bgColor = "#ba0000";
      worldNum = 18;
      worldName = "Molten Treasure Trove";
      break;
    case "The Black King":
      bgColor = "#000000";
      worldNum = 19;
      worldName = "Shadow Realm";
      break;
    case "Omni":
      bgColor = "#fcd928";
      worldNum = 20;
      worldName = "The Beyond";
      break;
    case "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel":
      bgColor = "#fcf3dc";
      worldNum = 0;
      worldName = "Realm Of The Gods";
      break;
    default:
      bgColor = "black";
      worldName = "Welcome to Roguelike!"; // Fallback: no music change if no match.
  }
  document.body.style.background = bgColor;
  const worldCounterEl = document.getElementById("worldCounter");
  if (worldCounterEl) {
    worldCounterEl.textContent = worldName + " " + worldNum + "-" + Math.floor(roomMoves);
  }
  
  // FIX: Trigger playing of the appropriate world music.
  if (worldName) {
    playWorldMusic(worldName);
  }
}

      /*******************
       * ITEM USAGE IN BATTLE
       *******************/
      function showInventoryMenu(battleMode) {
  inventoryMenu.style.display = "block";
  inventoryMenu.innerHTML = "<h3>Choose an item: </h3>";
  let hasUsableItem = false;
  player.inventory.forEach((item, index) => {
    if (item) {
      if (battleMode && !item.usableInBattle) return;
      if (!battleMode && !item.usableOutOfBattle) return;
      hasUsableItem = true;
      const btn = document.createElement("button");
      btn.textContent = item.name;
      btn.addEventListener("click", () => {
        useItem(item, index, battleMode);
      });
      inventoryMenu.appendChild(btn);
    }
  });
  
  if (!hasUsableItem) {
    inventoryMenu.innerHTML += '<p>No usable items available.</p>';
    setTimeout(() => {
      unlockActions();
    }, 250);
  }
}



      function useItem(item, index, battleMode) {
        // Check if the item can be used in the current context.
        if (battleMode && !item.usableInBattle) {
          alert(item.name + " cannot be used in battle!");
          return;
        }
        if (!battleMode && !item.usableOutOfBattle) {
          alert(item.name + " cannot be used out of battle!");
          return;
        }
        if (item.usageScope === "passive") {
          alert(item.name + " is a passive item and cannot be used.");
          return;
        }
        inventoryMenu.style.display = "none";
        if (battleMode) {
          // Effects when used in battle:
          switch (item.name) {
            case "Healing Potion":
              player.hp = Math.min(player.hp + (Math.round(player.maxHP * 0.25)), player.maxHp);
              logBattle("Player used Healing Potion and healed 25% HP.");
              break;
            case "Rage Potion":
              player.rage = true;
              logBattle("Player used Rage Potion. Damage doubled this battle!");
              break;
            case "Poison Potion":
              currentEnemy.poison = true;
              logBattle(`Player poisoned ${currentEnemy.name}.`);
              break;
            case "Weaken Potion":
              currentEnemy.weaken = true;
              logBattle(`Player weakened ${currentEnemy.name}.`);
              break;
            case "Iron Potion":
              player.iron = true;
              logBattle("Player used Iron Potion. Enemy damage halved this battle!");
              break;
              // Dice and others can have custom battle logic if needed.
            default:
              alert(item.name + " has no effect in battle.");
              return;
          }
          // Continue with enemy's turn if applicable.
		  unlockActions();
		  setTimeout(enemyTurnWrapper, 250);
        } else {
          // Effects when used out-of-battle:
          switch (item.name) {
            case "Healing Potion":
              player.hp = Math.min(player.hp + (Math.round(player.maxHP * 0.25)), player.maxHp);
              alert("Used Healing Potion. Healed 25% HP.");
              break;
              // Items meant for battle should not be used here.
            case "Rage Potion":
            case "Poison Potion":
            case "Weaken Potion":
            case "Iron Potion":
              alert(item.name + " can only be used in battle!");
              return;
            case "Dice":
              alert("Dice have no use here.");
              return;
            default:
              alert(item.name + " has no effect.");
              return;
          }
        }
        player.inventory[index] = null;
        updateInventoryDisplay();
        updateStats();
		setTimeout(enemyTurnWrapper, 250);
		unlockActions();
      }
      /*******************
       * SHOP SYSTEM
       *******************/
      function openShopMenu() {
        const shuffled = shuffle([...shopItemsList]);
        const selectedItems = shuffled.slice(0, 3);
        shopItemsDiv.innerHTML = "";
        selectedItems.forEach((item) => {
          const btn = document.createElement("button");
          btn.textContent = `${item.name} - $${item.cost}`;
          btn.addEventListener("click", () => {
            buyItem(item);
          });
          shopItemsDiv.appendChild(btn);
        });
        shopMenu.style.display = "block";
		battleTint.style.display = "block";
      }

      function hasItem(name) {
        return player.inventory.some(i => i && i.name === name);
      }

      function buyItem(item) {
        if (item.type === "equipment" && hasItem(item.name)) {
          alert("You can only buy one " + item.name + "!");
          return;
        }
        const freeIndex = player.inventory.findIndex(slot => slot === null);
        if (freeIndex === -1) {
          alert("Inventory full! Cannot buy more items.");
          return;
        }
        if (player.money < item.cost) {
          alert("Not enough money!");
          return;
        }
        player.money -= item.cost;
        player.inventory[freeIndex] = {
          ...item
        };
        if (item.name === "Armor") {
          player.defense += 10;
        }
        if (item.name === "Sword") {
          player.attack += 5;
        }
        if (item.name === "Staff") {
          player.magic += 5;
        }
        if (item.name === "Scarf") {
          player.dodgeChance += 0.1;
        }
        if (item.name === "Glasses") {
          player.neverMiss = true;
        }
        if (item.name === "Sharpener") {
          player.critMultiplier = 2;
        }
        updateStats();
        alert(`${item.name} purchased!`);
      }
      document.getElementById("closeShopBtn").addEventListener("click", () => {
        shopMenu.style.display = "none";
		battleTint.style.display = "none";
      });
      /*******************
       * EXP & LEVEL UP
       *******************/
      function addExp(amount) {
        let multiplier = 1 + (player.potential - 1) * 0.08;
        player.exp += Math.floor(amount * multiplier);
        updateStats();
        if (player.exp >= player.expToLevel) {
          levelUp();
        }
      }
      let upgradesRemaining = 0;

      function levelUp() {
        player.level += 1;
        player.exp -= player.expToLevel;
        player.expToLevel += Math.round(Math.pow(5, 1 + player.level * 0.008));
        updateStats();
        let currentRoomType = map[player.x + "_" + player.y].type;
        upgradesRemaining = (currentRoomType === ROOM_TYPES.ALTAR ? 3 : 1);
        levelUpMenu.style.display = "block";
      }

      function initiateLevelUp(upgradeCount) {
        upgradesRemaining = upgradeCount;
        levelUpMenu.style.display = "block";
      }
      levelUpMenu.addEventListener("click", function(e) {
        if (e.target.tagName.toLowerCase() === "button") {
          const stat = e.target.getAttribute("data-stat");
          if (stat === "hp") {
            player.maxHp += 20 + Math.round((player.level / player.maxHp) + (player.attack / player.maxHp));
            player.hp = player.maxHp;
          } else {
            player[stat] += 1;
          }
          updateStats();
          upgradesRemaining--;
          logBattle(`Player leveled up! ${stat.toUpperCase()} increased.`);
          if (upgradesRemaining <= 0) {
            levelUpMenu.style.display = "none";
          }
        }
      });
      /*******************
       * BATTLE LOG UTILS
       *******************/
      function logBattle(message) {
        const p = document.createElement("p");
        p.textContent = message;
        battleLog.appendChild(p);
        battleLog.scrollTop = battleLog.scrollHeight;
      }
      /*******************
       * DEATH HANDLING
       *******************/
      function showDeathMenu() {
        battleMenu.style.display = "none";
        battleLog.style.display = "none";
        battleTint.style.display = "block";
        inventoryMenu.style.display = "none";
        deathMenu.style.display = "block";
      }
      document.getElementById("retryBtn").addEventListener("click", function() {
        location.reload();
      });
	  
	  function showOverlay() {
  // Check if an overlay element already exists; if not, create one.
  let overlay = document.getElementById('overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'overlay';
    // Style the overlay to cover the entire viewport.
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.5)'; // semi-transparent black
    overlay.style.zIndex = '400';  // Adjust z-index to be beneath modal menus
    document.body.appendChild(overlay);
  }
  // Display the overlay.
  overlay.style.display = 'block';
}

function hideOverlay() {
  // Hide the overlay if it exists.
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

      /*******************
       * BATTLE MENU EVENTS
       *******************/
      document.getElementById("attackBtn").addEventListener("click", () => {
		if (actionsLocked) return;
		lockActions();
        playerAttack("attack");
      });
      document.getElementById("magicBtn").addEventListener("click", () => {
        if (actionsLocked) return;
		lockActions();
		playerAttack("magic");
      });
      document.getElementById("itemsBtn").addEventListener("click", () => {
		showInventoryMenu();
      });
      document.getElementById("runBtn").addEventListener("click", () => {
        if (actionsLocked) return;
		lockActions();
		attemptRun();
      });
      document.getElementById("itemsBtn").addEventListener("click", () => {
		showInventoryMenu(!!currentEnemy);
      });
      let casinoBet = 0;
      let casinoPlayerTotal = 0;
      let casinoEnemyTotal = 0;

      function openCasino(onComplete) {
  casinoCompleteCallback = onComplete || null;
  // reset hit buttons
  hitButtons.forEach(btn => {
    btn.style.display = "";   // back to whatever your CSS says
  });
  stopWorldMusic()
  casinoMusic.play();
  casinoPlayerTotal = 0;
  casinoEnemyTotal = 0;
  casinoPlayerTotalEl.textContent = casinoPlayerTotal;
  casinoEnemyTotalEl.textContent = casinoEnemyTotal;
  betInput.value = 1;
  casinoGameArea.style.display = "none";
  casinoMenu.style.display = "block";
  battleTint.style.display = "block";
}
	  
	  function finalizeCasinoRound() {
  // Calculate the absolute difference from 21 for both player and enemy
  const playerDiff = Math.abs(21 - casinoPlayerTotal);
  const enemyDiff = Math.abs(21 - casinoEnemyTotal);
  let outcome;
  // Decide outcome based on totals.
  // If both bust (over 21), choose the one closer to 21.
  if (casinoPlayerTotal > 21 && casinoEnemyTotal > 21) {
    outcome = playerDiff < enemyDiff ? "win" : (playerDiff > enemyDiff ? "lose" : "push");
  } 
  // If only one of them is over 21, then that side loses.
  else if (casinoPlayerTotal > 21) {
    outcome = "lose";
  } 
  else if (casinoEnemyTotal > 21) {
    outcome = "win";
  }
  // If neither busted, compare closeness.
  else {
    outcome = playerDiff < enemyDiff ? "win" : (playerDiff > enemyDiff ? "lose" : "push");
  }
  
  if (outcome === "win") {
    player.money += casinoBet;
    alert("You win! Gained $" + casinoBet);
  } else if (outcome === "lose") {
    player.money -= casinoBet;
    alert("You lose! Lost $" + casinoBet);
  } else {
    alert("Push! No money won or lost.");
  }
  updateStats();
  casinoMenu.style.display = "none";
  battleTint.style.display = "none";
  hideOverlay();
  if (casinoCompleteCallback) {
    const cb = casinoCompleteCallback;
    casinoCompleteCallback = null;
    cb();
  }
  resumeWorldMusicAfterBattle();
}

	  
      placeBetBtn.addEventListener("click", () => {
        const bet = parseInt(betInput.value);
        if (isNaN(bet) || bet < 1) {
          alert("Please enter a valid bet amount.");
          return;
        }
        if (bet > player.money) {
          alert("You cannot bet more than you have!");
          return;
        }
        casinoBet = bet;
        casinoGameArea.style.display = "block";
      });
      hitButtons.forEach((btn) => {
  btn.addEventListener("click", function onHit() {
    // Hide this hit button once pressed.
    btn.style.display = "none";
    
    // Player draws a card.
    const card = Math.floor(Math.random() * 13) + 1;
    casinoPlayerTotal += card;
    casinoPlayerTotalEl.textContent = casinoPlayerTotal;
    
    // If player's total exceeds 21 immediately, handle bust.
    if (casinoPlayerTotal > 21) {
      alert("It's a bust! You lost.");
      concludeCasinoGame(true);
      return;
    }
	
	if (casinoEnemyTotal > 21) {
        alert("Dealer had a bust! They lost.");
        concludeCasinoGame();
        return;
      }
    
    // Dealer draws a card if below 17.
    if (casinoEnemyTotal < 17) {
      const enemyCard = Math.floor(Math.random() * 13) + 1;
      casinoEnemyTotal += enemyCard;
      casinoEnemyTotalEl.textContent = casinoEnemyTotal;
      
      // If the dealer’s total goes over 21 immediately, win for the player.
      if (casinoEnemyTotal > 21) {
        alert("Dealer had a bust! They lost.");
        concludeCasinoGame();
        return;
      }
    }
    
    // Check if no hit buttons remain visible.
    const remainingButtons = Array.from(hitButtons).filter(b => b.style.display !== "none");
    if (remainingButtons.length === 0) {
      // All hit buttons have vanished; finalize round based on closeness to 21.
      finalizeCasinoRound();
    }
  });
});

      standBtn.addEventListener("click", () => {
        while (casinoEnemyTotal < 17) {
          const enemyCard = Math.floor(Math.random() * 13) + 1;
          casinoEnemyTotal += enemyCard;
        }
        casinoEnemyTotalEl.textContent = casinoEnemyTotal;
        concludeCasinoGame();
      });
      hitButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          playerHit();
        });
      });
      // Modify the stand button event.
      standBtn.addEventListener("click", () => {
        while (casinoEnemyTotal < 17) {
          const enemyCard = Math.floor(Math.random() * 13) + 1;
          casinoEnemyTotal += enemyCard;
        }
        casinoEnemyTotalEl.textContent = casinoEnemyTotal;
        concludeCasinoGame();
      });

      function concludeCasinoGame(forcedLoss = false) {
        if (casinoPlayerTotal === 0) {
          alert("Your total is 0 – Penalty!");
          playerHit();
          return;
        }
        let playerBust = casinoPlayerTotal > 21;
        let enemyBust = casinoEnemyTotal > 21;
        let outcome;
        if (forcedLoss || playerBust) {
          outcome = "lose";
        } else if (enemyBust) {
          outcome = "win";
        } else {
          let bonus = hasItem("Dice") ? 2 : 0;
          let effectivePlayerTotal = Math.max(casinoPlayerTotal - bonus, 0);
          let playerDiff = 21 - effectivePlayerTotal;
          let enemyDiff = 21 - casinoEnemyTotal;
          if (playerDiff < 0) playerDiff = Infinity;
          if (enemyDiff < 0) enemyDiff = Infinity;
          if (playerDiff < enemyDiff) {
            outcome = "win";
          } else if (enemyDiff < playerDiff) {
            outcome = "lose";
          } else {
            outcome = "push";
          }
        }
        if (outcome === "win") {
          player.money += casinoBet;
          alert("You win! Gained $" + casinoBet);
        } else if (outcome === "lose") {
          player.money -= casinoBet;
          alert("You lose! Lost $" + casinoBet);
          if (player.money <= 0) {
            alert("You have run out of money and must leave the casino.");
          }
        } else {
          alert("Push! No money won or lost.");
        }
        updateStats();
        casinoMenu.style.display = "none";
		battleTint.style.display = "none";
		if (casinoCompleteCallback) {
    const cb = casinoCompleteCallback;
	casinoMusic.pause();
	casinoMusic.currentTime = 0;
    casinoCompleteCallback = null;
    cb();
  }
      }
	  
	  function handleTrapRoom() {
  // 67% chance it doesn’t go off
  if (Math.random() < 0.67) {
    logBattle("You sense something's off… but nothing happens.");
    return;
  }

  // 20–30% of max HP
  const minPct = 0.20, maxPct = 0.30;
  const pct = Math.random() * (maxPct - minPct) + minPct;
  let damage = Math.floor(player.maxHp * pct);

  // if it was a disguised trap, only 1/3 damage
  if (map[ player.x + "_" + player.y ].disguisedTrap) {
    damage = Math.floor(damage / 3);
    logBattle("You fell into a trap!");
  } else {
    logBattle("You stepped on a trap!");
  }

  player.hp = Math.max(player.hp - damage, 0);
  logBattle(`You take ${damage} damage.`);
  updateStats();

  if (player.hp <= 0) {
    // immediate death handling
    battleTint.style.display = "none";
    battleMenu.style.display = "none";
    deathMenu.style.display = "block";
  }
}
      /*******************
       * START THE GAME
       *******************/
      initGame();
