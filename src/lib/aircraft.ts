// src/lib/aircraft.ts
export type Aircraft = {
  name: string
  type: 'jet' | 'turbo' | 'piston'
  tas: number      // kt — true airspeed cruise
  pax: number
  range: number    // nm
  initK: number    // $K
  fixK: number     // $K/yr
  varH: number     // $/hr
  rating: boolean  // type rating required
  fuel: 'Jet-A' | 'AvGas'
  gear: 'retractable' | 'tricycle' | 'tailwheel'
  engines: 1 | 2 | 3 | 4
}

// Fallback per category (used for wind ring when no aircraft selected)
export const TAS: Record<Aircraft['type'], number> = {
  jet: 450, turbo: 280, piston: 130
}

export const AC: Aircraft[] = [

  // ── Aero ─────────────────────────────────────────────────────
  { name:'Aero Commander 560 Twin',    type:'piston',tas:175, pax:5,  range:800,  initK:60,    fixK:16,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },

  // ── Aeronca ─────────────────────────────────────────────────────
  { name:'Aeronca Champ 7AC',          type:'piston',tas:85,  pax:2,  range:350,  initK:25,    fixK:5,    varH:22,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aeronca Chief 11AC',         type:'piston',tas:80,  pax:2,  range:300,  initK:22,    fixK:5,    varH:20,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Aerostar ─────────────────────────────────────────────────────
  { name:'Aerostar 601P',              type:'piston',tas:210, pax:5,  range:1300, initK:100,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aerostar 700',               type:'piston',tas:230, pax:5,  range:1400, initK:140,   fixK:22,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },

  // ── American ─────────────────────────────────────────────────────
  { name:'American Champion Citabria 7ECA',     type:'piston',tas:100,pax:2,range:450,initK:65,  fixK:9,  varH:42,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'American Champion Denali Scout 210',  type:'piston',tas:115,pax:2,range:580,initK:280, fixK:12, varH:55,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'American Champion Scout 180',         type:'piston',tas:108,pax:2,range:550,initK:220, fixK:11, varH:52,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'American Champion Super Decathlon',   type:'piston',tas:130,pax:2,range:500,initK:160, fixK:10, varH:48,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Aviat ─────────────────────────────────────────────────────
  { name:'Aviat Husky A-1C-180',       type:'piston',tas:122, pax:2,  range:700,  initK:240,   fixK:11,   varH:52,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aviat Pitts S-2B',           type:'piston',tas:150, pax:2,  range:300,  initK:140,   fixK:11,   varH:55,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aviat Pitts S-2C',           type:'piston',tas:155, pax:2,  range:280,  initK:220,   fixK:12,   varH:58,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Beechcraft ─────────────────────────────────────────────────────
  { name:'Beechcraft Baron 58',            type:'piston',tas:198, pax:5,  range:1200, initK:280,   fixK:25,   varH:110,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron 58P pressurized',type:'piston',tas:191,pax:5, range:1013, initK:400,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron 58TC turbo',    type:'piston',tas:220, pax:5,  range:1050, initK:350,   fixK:26,   varH:115,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron B55',           type:'piston',tas:190, pax:5,  range:950,  initK:95,    fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron E55',           type:'piston',tas:195, pax:5,  range:1000, initK:180,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron G58',           type:'piston',tas:202, pax:6,  range:1480, initK:1200,  fixK:35,   varH:150,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Beechjet 400A',       type:'jet',  tas:448, pax:8,  range:1460, initK:1500,  fixK:120,  varH:780,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft Bonanza A36TC',       type:'piston',tas:180, pax:6,  range:1200, initK:750,   fixK:24,   varH:115,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza G36',         type:'piston',tas:176, pax:6,  range:1000, initK:680,   fixK:22,   varH:105,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza V35B',        type:'piston',tas:172, pax:4,  range:810,  initK:120,   fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Duchess 76',          type:'piston',tas:160, pax:3,  range:700,  initK:75,    fixK:14,   varH:72,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Duke B60',            type:'piston',tas:220, pax:5,  range:1150, initK:220,   fixK:28,   varH:125,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Musketeer A23',       type:'piston',tas:118, pax:4,  range:700,  initK:55,    fixK:11,   varH:60,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Beechcraft Premier 1A',          type:'jet',  tas:451, pax:6,  range:1360, initK:4000,  fixK:95,   varH:700,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft Queen Air B80',       type:'piston',tas:215, pax:9,  range:1000, initK:180,   fixK:30,   varH:130,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Sierra A24R',         type:'piston',tas:130, pax:4,  range:850,  initK:80,    fixK:13,   varH:68,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Skipper 77',          type:'piston',tas:100, pax:2,  range:500,  initK:30,    fixK:8,    varH:42,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Beechcraft Sundowner C23',       type:'piston',tas:120, pax:4,  range:800,  initK:65,    fixK:12,   varH:62,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Beechcraft Twin Bonanza D50',    type:'piston',tas:178, pax:5,  range:900,  initK:55,    fixK:15,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },

  // ── Bellanca ─────────────────────────────────────────────────────
  { name:'Bellanca Citabria',          type:'piston',tas:105, pax:2,  range:400,  initK:30,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Bellanca Decathlon',         type:'piston',tas:128, pax:2,  range:450,  initK:45,    fixK:9,    varH:42,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Bellanca Viking 300',        type:'piston',tas:170, pax:4,  range:950,  initK:65,    fixK:13,   varH:68,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Bombardier ─────────────────────────────────────────────────────
  { name:'Bombardier Challenger 300',  type:'jet',  tas:470, pax:9,  range:3100, initK:14000, fixK:300,  varH:1600, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Challenger 350',  type:'jet',  tas:470, pax:10, range:3200, initK:28000, fixK:500,  varH:2500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Challenger 605',  type:'jet',  tas:470, pax:12, range:4000, initK:22000, fixK:420,  varH:2100, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Global 5500',     type:'jet',  tas:488, pax:16, range:5900, initK:52000, fixK:900,  varH:4500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Global 6500',     type:'jet',  tas:488, pax:17, range:6600, initK:58000, fixK:1000, varH:5000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Global 7500',     type:'jet',  tas:488, pax:19, range:7700, initK:78000, fixK:1300, varH:6500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Britten ─────────────────────────────────────────────────────
  { name:'Britten Norman Islander BN-2',type:'piston',tas:140,pax:9,  range:800,  initK:400,   fixK:35,   varH:130,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Britten Norman Trislander',  type:'piston',tas:140, pax:17, range:780,  initK:600,   fixK:45,   varH:160,  rating:true,  fuel:'AvGas',  gear:'tricycle',    engines:3 },

  // ── Cessna ─────────────────────────────────────────────────────
  { name:'Cessna 150',                 type:'piston',tas:90,  pax:2,  range:400,  initK:30,    fixK:7,    varH:32,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 152',                 type:'piston',tas:100, pax:2,  range:415,  initK:55,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 170',                 type:'piston',tas:110, pax:4,  range:500,  initK:45,    fixK:9,    varH:48,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Cessna 172S Skyhawk',        type:'piston',tas:122, pax:4,  range:640,  initK:390,   fixK:16,   varH:72,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 172SP',               type:'piston',tas:122, pax:4,  range:640,  initK:200,   fixK:14,   varH:65,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 177 Cardinal',        type:'piston',tas:128, pax:4,  range:800,  initK:75,    fixK:13,   varH:65,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 177RG Cardinal',      type:'piston',tas:145, pax:4,  range:850,  initK:90,    fixK:14,   varH:70,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Cessna 182 RG Skylane',      type:'piston',tas:148, pax:4,  range:1000, initK:95,    fixK:16,   varH:82,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Cessna 182T Skylane',        type:'piston',tas:145, pax:4,  range:915,  initK:430,   fixK:18,   varH:85,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 205 Super Skylane',   type:'piston',tas:145, pax:6,  range:1100, initK:70,    fixK:14,   varH:72,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 206H Stationair',     type:'piston',tas:145, pax:6,  range:700,  initK:480,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 210 Centurion',       type:'piston',tas:168, pax:6,  range:1100, initK:140,   fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Cessna 310R',                type:'piston',tas:195, pax:5,  range:1000, initK:150,   fixK:22,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 337 Skymaster',       type:'piston',tas:167, pax:5,  range:839,  initK:80,    fixK:16,   varH:78,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 340A',                type:'piston',tas:200, pax:5,  range:1100, initK:200,   fixK:25,   varH:110,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 402C Businessliner',  type:'piston',tas:185, pax:9,  range:1100, initK:250,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 414A Chancellor',     type:'piston',tas:200, pax:6,  range:1100, initK:280,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 421C Golden Eagle',   type:'piston',tas:210, pax:6,  range:1200, initK:350,   fixK:30,   varH:130,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna Caravan 208 EX',      type:'turbo', tas:165, pax:9,  range:900,  initK:2200,  fixK:65,   varH:380,  rating:false, fuel:'Jet-A',  gear:'tricycle',    engines:1 },
  { name:'Cessna Caravan 208B',        type:'turbo', tas:160, pax:14, range:900,  initK:2600,  fixK:70,   varH:420,  rating:false, fuel:'Jet-A',  gear:'tricycle',    engines:1 },
  { name:'Cessna Citation M2 Gen2',    type:'jet',   tas:400, pax:7,  range:1550, initK:5200,  fixK:130,  varH:850,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Conquest I 425',      type:'turbo', tas:261, pax:6,  range:1100, initK:900,   fixK:75,   varH:410,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Conquest II 441',     type:'turbo', tas:293, pax:9,  range:1340, initK:1100,  fixK:85,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Grand Caravan EX',    type:'turbo', tas:175, pax:14, range:1070, initK:2500,  fixK:68,   varH:390,  rating:false, fuel:'Jet-A',  gear:'tricycle',    engines:1 },
  { name:'Cessna T206H Turbo Stationair',type:'piston',tas:165,pax:6, range:800,  initK:560,   fixK:22,   varH:105,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna T210 Turbo Centurion',type:'piston',tas:185, pax:6,  range:1200, initK:170,   fixK:20,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Cessna T337G Pressurized Skymaster',type:'piston',tas:183,pax:5,range:1133,initK:160, fixK:20,  varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },

  // ── Cirrus ─────────────────────────────────────────────────────
  { name:'Cirrus SR20',                type:'piston',tas:155, pax:4,  range:800,  initK:380,   fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cirrus SR22',                type:'piston',tas:180, pax:4,  range:950,  initK:480,   fixK:22,   varH:105,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cirrus SR22 GTS',            type:'piston',tas:182, pax:4,  range:950,  initK:700,   fixK:26,   varH:112,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cirrus SR22T',               type:'piston',tas:183, pax:4,  range:1000, initK:800,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cirrus Vision Jet SF50',     type:'jet',   tas:305, pax:5,  range:1200, initK:2800,  fixK:90,   varH:580,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:1 },

  // ── Citation ─────────────────────────────────────────────────────
  { name:'Citation Bravo',             type:'jet',  tas:430, pax:8,  range:1600, initK:3200,  fixK:130,  varH:780,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation CJ3+',              type:'jet',  tas:416, pax:7,  range:2040, initK:8200,  fixK:180,  varH:950,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Encore+',           type:'jet',  tas:441, pax:8,  range:1875, initK:5500,  fixK:150,  varH:850,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation I SP',              type:'jet',  tas:350, pax:7,  range:1100, initK:800,   fixK:80,   varH:600,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation II',                type:'jet',  tas:374, pax:8,  range:1200, initK:1200,  fixK:100,  varH:680,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Latitude',          type:'jet',  tas:446, pax:9,  range:2700, initK:17500, fixK:280,  varH:1350, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Longitude',         type:'jet',  tas:476, pax:12, range:3500, initK:26500, fixK:420,  varH:2000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation M2 Gen2',           type:'jet',  tas:400, pax:7,  range:1550, initK:5200,  fixK:130,  varH:800,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Mustang',           type:'jet',  tas:391, pax:4,  range:1150, initK:3000,  fixK:90,   varH:600,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Sovereign+',        type:'jet',  tas:458, pax:9,  range:2847, initK:13500, fixK:250,  varH:1250, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation V Ultra',           type:'jet',  tas:430, pax:8,  range:1600, initK:2400,  fixK:120,  varH:750,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation X+',                type:'jet',  tas:527, pax:12, range:3460, initK:23000, fixK:380,  varH:1900, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation XLS+',              type:'jet',  tas:441, pax:9,  range:2100, initK:11500, fixK:220,  varH:1150, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Columbia ─────────────────────────────────────────────────────
  { name:'Columbia 350',               type:'piston',tas:185, pax:4,  range:1000, initK:250,   fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Columbia 400 / Cessna TTx',  type:'piston',tas:235, pax:4,  range:1100, initK:320,   fixK:20,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Commander ─────────────────────────────────────────────────────
  { name:'Commander 690B Jetprop',     type:'turbo', tas:286, pax:8,  range:1400, initK:400,   fixK:90,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Commander 1000 Jetprop',     type:'turbo', tas:300, pax:9,  range:1600, initK:700,   fixK:110,  varH:500,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── CubCrafters ─────────────────────────────────────────────────────
  { name:'CubCrafters Carbon Cub EX-3',type:'piston',tas:117, pax:2,  range:500,  initK:160,   fixK:10,   varH:44,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'CubCrafters Carbon Cub SS',  type:'piston',tas:95,  pax:2,  range:450,  initK:190,   fixK:10,   varH:45,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'CubCrafters Top Cub CC18',   type:'piston',tas:110, pax:2,  range:570,  initK:300,   fixK:12,   varH:50,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'CubCrafters XCub',           type:'piston',tas:135, pax:2,  range:870,  initK:420,   fixK:14,   varH:58,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Czech ─────────────────────────────────────────────────────
  { name:'Czech Sport Aircraft PS-28 Cruiser',type:'piston',tas:115,pax:2,range:630,initK:155,  fixK:8,    varH:36,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Daher ─────────────────────────────────────────────────────
  { name:'Daher TBM 700',              type:'turbo', tas:300, pax:5,  range:1730, initK:2200,  fixK:80,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },

  // ── Dassault ─────────────────────────────────────────────────────
  { name:'Dassault Falcon 2000LXS',    type:'jet',  tas:482, pax:10, range:4000, initK:35000, fixK:620,  varH:3000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Dassault Falcon 50EX',       type:'jet',  tas:470, pax:8,  range:3300, initK:8000,  fixK:200,  varH:1200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:3 },
  { name:'Dassault Falcon 7X',         type:'jet',  tas:482, pax:14, range:5950, initK:55000, fixK:900,  varH:4500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:3 },
  { name:'Dassault Falcon 900LX',      type:'jet',  tas:480, pax:12, range:4750, initK:38000, fixK:700,  varH:3200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:3 },

  // ── DeHavilland ─────────────────────────────────────────────────────
  { name:'DeHavilland Beaver DHC-2',   type:'piston',tas:115, pax:7,  range:450,  initK:450,   fixK:25,   varH:130,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'DeHavilland Dash 8 Q100',    type:'turbo', tas:270, pax:37, range:850,  initK:8000,  fixK:350,  varH:1500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'DeHavilland Twin Otter DHC-6',type:'turbo',tas:170, pax:19, range:820,  initK:3000,  fixK:110,  varH:520,  rating:true,  fuel:'Jet-A',  gear:'tricycle',    engines:2 },

  // ── Diamond ─────────────────────────────────────────────────────
  { name:'Diamond DA20 Katana',        type:'piston',tas:109, pax:2,  range:500,  initK:160,   fixK:10,   varH:50,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Diamond DA40 NG',            type:'piston',tas:145, pax:4,  range:770,  initK:420,   fixK:17,   varH:78,   rating:false, fuel:'Jet-A', gear:'tricycle',    engines:1 },
  { name:'Diamond DA40 XLS',           type:'piston',tas:138, pax:4,  range:750,  initK:380,   fixK:16,   varH:74,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Diamond DA42 Twin Star',     type:'piston',tas:175, pax:4,  range:1000, initK:680,   fixK:22,   varH:95,   rating:false, fuel:'Jet-A', gear:'tricycle',    engines:2 },
  { name:'Diamond DA42-VI Twin Star',  type:'piston',tas:185, pax:3,  range:1100, initK:750,   fixK:22,   varH:90,   rating:false, fuel:'Jet-A', gear:'tricycle',    engines:2 },
  { name:'Diamond DA62',               type:'piston',tas:192, pax:6,  range:1020, initK:1150,  fixK:32,   varH:115,  rating:false, fuel:'Jet-A', gear:'tricycle',    engines:2 },

  // ── Eclipse ─────────────────────────────────────────────────────
  { name:'Eclipse 550',                type:'jet',  tas:375, pax:4,  range:1125, initK:2950,  fixK:85,   varH:560,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Embraer ─────────────────────────────────────────────────────
  { name:'Embraer Legacy 450',         type:'jet',  tas:466, pax:9,  range:2900, initK:20000, fixK:380,  varH:1800, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Legacy 500',         type:'jet',  tas:466, pax:12, range:3125, initK:23000, fixK:420,  varH:2000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Legacy 600',         type:'jet',  tas:459, pax:13, range:3400, initK:28000, fixK:500,  varH:2400, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Phenom 100EV',       type:'jet',  tas:390, pax:5,  range:1178, initK:4900,  fixK:105,  varH:620,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Phenom 300E',        type:'jet',  tas:453, pax:8,  range:2010, initK:11500, fixK:200,  varH:1050, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Praetor 500',        type:'jet',  tas:466, pax:9,  range:3340, initK:25000, fixK:450,  varH:2100, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Praetor 600',        type:'jet',  tas:466, pax:12, range:4018, initK:31000, fixK:550,  varH:2600, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Epic ─────────────────────────────────────────────────────
  { name:'Epic E1000 GX',              type:'turbo', tas:333, pax:5,  range:1600, initK:3500,  fixK:90,   varH:520,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },

  // ── Evektor ─────────────────────────────────────────────────────
  { name:'Evektor SportStar Max',      type:'piston',tas:100, pax:2,  range:500,  initK:140,   fixK:8,    varH:34,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Extra ─────────────────────────────────────────────────────
  { name:'Extra 300S',                 type:'piston',tas:180, pax:1,  range:400,  initK:250,   fixK:12,   varH:55,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Extra 330LX',                type:'piston',tas:185, pax:2,  range:500,  initK:380,   fixK:14,   varH:60,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Fairchild ─────────────────────────────────────────────────────
  { name:'Fairchild Merlin IV',        type:'turbo', tas:280, pax:11, range:1500, initK:500,   fixK:100,  varH:480,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Glasair ─────────────────────────────────────────────────────
  { name:'Glasair III',                type:'piston',tas:220, pax:2,  range:1200, initK:80,    fixK:11,   varH:60,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Glasair Sportsman 2+2',      type:'piston',tas:150, pax:4,  range:1000, initK:90,    fixK:12,   varH:55,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Grumman ─────────────────────────────────────────────────────
  { name:'Grumman Albatross HU-16',    type:'piston',tas:205, pax:12, range:2700, initK:200,   fixK:35,   varH:150,  rating:true,  fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Grumman American AA-1 Yankee',type:'piston',tas:120,pax:2,  range:480,  initK:28,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Grumman American AA-5B Tiger',type:'piston',tas:148,pax:4,  range:600,  initK:50,    fixK:10,   varH:55,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Grumman American Cheetah AA-5A',type:'piston',tas:128,pax:4,range:550,  initK:38,    fixK:9,    varH:48,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Gulfstream ─────────────────────────────────────────────────────
  { name:'Gulfstream G280',            type:'jet',  tas:482, pax:10, range:3600, initK:24000, fixK:450,  varH:2200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G550',            type:'jet',  tas:488, pax:19, range:6750, initK:60000, fixK:1050, varH:5200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G650ER',          type:'jet',  tas:488, pax:19, range:7500, initK:72000, fixK:1200, varH:6000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G700',            type:'jet',  tas:488, pax:19, range:7500, initK:82000, fixK:1350, varH:6800, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Hawker ─────────────────────────────────────────────────────
  { name:'Hawker 400XP',               type:'jet',  tas:450, pax:8,  range:1180, initK:1900,  fixK:130,  varH:850,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 750',                 type:'jet',  tas:447, pax:8,  range:2111, initK:5500,  fixK:200,  varH:1150, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 800XP',               type:'jet',  tas:447, pax:8,  range:2540, initK:5800,  fixK:210,  varH:1200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 850XP',               type:'jet',  tas:448, pax:8,  range:2642, initK:7200,  fixK:220,  varH:1250, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 900XP',               type:'jet',  tas:448, pax:8,  range:2818, initK:8500,  fixK:240,  varH:1300, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── HondaJet ─────────────────────────────────────────────────────
  { name:'HondaJet Elite II',          type:'jet',  tas:422, pax:6,  range:1437, initK:5500,  fixK:140,  varH:800,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── IAI ─────────────────────────────────────────────────────
  { name:'IAI Astra SPX',              type:'jet',  tas:450, pax:8,  range:2780, initK:3800,  fixK:140,  varH:850,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'IAI Westwind 1124',          type:'jet',  tas:430, pax:8,  range:2020, initK:800,   fixK:100,  varH:720,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Icon ─────────────────────────────────────────────────────
  { name:'Icon A5 Amphibious',         type:'piston',tas:84,  pax:2,  range:427,  initK:389,   fixK:14,   varH:45,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Just ─────────────────────────────────────────────────────
  { name:'Just Aircraft SuperSTOL XL', type:'piston',tas:75,  pax:2,  range:500,  initK:48,    fixK:7,    varH:32,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── King ─────────────────────────────────────────────────────
  { name:'King Air 200',               type:'turbo', tas:272, pax:9,  range:1550, initK:2000,  fixK:120,  varH:580,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'King Air 250',               type:'turbo', tas:280, pax:9,  range:1720, initK:7400,  fixK:175,  varH:680,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'King Air 300',               type:'turbo', tas:290, pax:9,  range:1800, initK:3500,  fixK:190,  varH:750,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'King Air 350i',              type:'turbo', tas:310, pax:11, range:1806, initK:7200,  fixK:160,  varH:850,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'King Air C90B',              type:'turbo', tas:222, pax:7,  range:970,  initK:1100,  fixK:80,   varH:420,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'King Air C90GTx',            type:'turbo', tas:222, pax:6,  range:1120, initK:2800,  fixK:90,   varH:500,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Kitfox ─────────────────────────────────────────────────────
  { name:'Kitfox Series 7 STi',        type:'piston',tas:105, pax:2,  range:600,  initK:55,    fixK:8,    varH:35,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Lake ─────────────────────────────────────────────────────
  { name:'Lake LA-250 Renegade',       type:'piston',tas:130, pax:4,  range:600,  initK:120,   fixK:16,   varH:75,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Lancair ─────────────────────────────────────────────────────
  { name:'Lancair 320',                type:'piston',tas:210, pax:2,  range:800,  initK:60,    fixK:11,   varH:55,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lancair Evolution Turbine',  type:'turbo', tas:300, pax:4,  range:1300, initK:1400,  fixK:80,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Lancair IV-P pressurized',   type:'piston',tas:262, pax:4,  range:1347, initK:280,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lancair Legacy RG',          type:'piston',tas:240, pax:2,  range:1100, initK:120,   fixK:14,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Learjet ─────────────────────────────────────────────────────
  { name:'Learjet 31A',                type:'jet',  tas:464, pax:7,  range:1484, initK:1800,  fixK:130,  varH:800,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 35A',                type:'jet',  tas:464, pax:7,  range:2524, initK:2200,  fixK:150,  varH:880,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 45XR',               type:'jet',  tas:464, pax:9,  range:2200, initK:6000,  fixK:180,  varH:950,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 55C',                type:'jet',  tas:464, pax:8,  range:2650, initK:3500,  fixK:165,  varH:920,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 60XR',               type:'jet',  tas:464, pax:9,  range:2640, initK:7500,  fixK:190,  varH:1000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 75 Liberty',         type:'jet',  tas:465, pax:9,  range:2040, initK:13000, fixK:240,  varH:1250, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Maule ─────────────────────────────────────────────────────
  { name:'Maule M-5-235 Lunar Rocket', type:'piston',tas:130, pax:4,  range:650,  initK:75,    fixK:11,   varH:55,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Maule M-7-235 Super Rocket', type:'piston',tas:132, pax:4,  range:700,  initK:185,   fixK:12,   varH:60,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Maule MXT-7-180A Star Rocket',type:'piston',tas:130,pax:4,  range:600,  initK:165,   fixK:11,   varH:58,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Mitsubishi ─────────────────────────────────────────────────────
  { name:'Mitsubishi MU-2 Marquise',   type:'turbo', tas:300, pax:8,  range:1300, initK:250,   fixK:70,   varH:380,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Mitsubishi MU-2 Solitaire',  type:'turbo', tas:295, pax:6,  range:1200, initK:200,   fixK:65,   varH:360,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Mooney ─────────────────────────────────────────────────────
  { name:'Mooney M20C Ranger',         type:'piston',tas:150, pax:4,  range:900,  initK:45,    fixK:11,   varH:60,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20J 201',            type:'piston',tas:175, pax:4,  range:1000, initK:120,   fixK:14,   varH:75,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20M Bravo',          type:'piston',tas:195, pax:4,  range:1100, initK:280,   fixK:18,   varH:88,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20R Ovation 3',      type:'piston',tas:195, pax:4,  range:1200, initK:420,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20TN Acclaim S',     type:'piston',tas:220, pax:4,  range:1300, initK:680,   fixK:23,   varH:105,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20V Acclaim Ultra',  type:'piston',tas:242, pax:4,  range:1360, initK:750,   fixK:25,   varH:110,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Phenom ─────────────────────────────────────────────────────
  { name:'Phenom 300E',                type:'jet',  tas:453, pax:10, range:1971, initK:9800,  fixK:200,  varH:1050, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Pilatus ─────────────────────────────────────────────────────
  { name:'Pilatus PC-12 NGX',          type:'turbo', tas:285, pax:9,  range:1845, initK:4800,  fixK:120,  varH:650,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Pilatus PC-24',              type:'jet',   tas:440, pax:10, range:2000, initK:10500, fixK:210,  varH:1100, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Piper ─────────────────────────────────────────────────────
  { name:'Piper Apache PA-23',         type:'piston',tas:130, pax:3,  range:700,  initK:28,    fixK:12,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Archer III PA-28-181', type:'piston',tas:122, pax:4,  range:520,  initK:170,   fixK:11,   varH:54,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Arrow IV PA-28R-201',  type:'piston',tas:145, pax:4,  range:750,  initK:120,   fixK:13,   varH:68,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Aztec F PA-23-250',    type:'piston',tas:175, pax:5,  range:1130, initK:120,   fixK:22,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Cherokee PA-28-180',   type:'piston',tas:118, pax:4,  range:500,  initK:50,    fixK:9,    varH:45,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Cherokee Six PA-32',   type:'piston',tas:140, pax:6,  range:850,  initK:70,    fixK:14,   varH:72,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Cheyenne I PA-31T',    type:'turbo', tas:249, pax:7,  range:1200, initK:400,   fixK:75,   varH:400,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Piper Cheyenne II XL',       type:'turbo', tas:283, pax:7,  range:1400, initK:600,   fixK:85,   varH:440,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Piper Cheyenne IIIA',        type:'turbo', tas:290, pax:9,  range:1900, initK:900,   fixK:110,  varH:520,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Piper Cheyenne 400LS',       type:'turbo', tas:320, pax:9,  range:2060, initK:1400,  fixK:130,  varH:580,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Piper Comanche PA-24',       type:'piston',tas:155, pax:4,  range:900,  initK:65,    fixK:12,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Cub PA-11',            type:'piston',tas:75,  pax:2,  range:250,  initK:25,    fixK:5,    varH:22,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Piper Lance PA-32R',         type:'piston',tas:148, pax:6,  range:800,  initK:90,    fixK:15,   varH:78,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper M500',                 type:'turbo', tas:260, pax:5,  range:1000, initK:2600,  fixK:75,   varH:430,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Piper M600/SLS',             type:'turbo', tas:274, pax:5,  range:1484, initK:3200,  fixK:85,   varH:480,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Piper Navajo Chieftain PA-31-350',type:'piston',tas:175,pax:9,range:800,initK:300,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Navajo PA-31-310',     type:'piston',tas:207, pax:7,  range:1012, initK:120,   fixK:24,   varH:110,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Seminole PA-44',       type:'piston',tas:150, pax:3,  range:700,  initK:170,   fixK:16,   varH:75,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Seneca V PA-34',       type:'piston',tas:190, pax:6,  range:900,  initK:500,   fixK:22,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Super Cub PA-18',      type:'piston',tas:100, pax:2,  range:400,  initK:80,    fixK:7,    varH:28,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Piper Tomahawk PA-38',       type:'piston',tas:100, pax:2,  range:450,  initK:28,    fixK:7,    varH:35,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Twin Comanche PA-30',  type:'piston',tas:165, pax:3,  range:770,  initK:60,    fixK:14,   varH:70,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Warrior III PA-28-161',type:'piston',tas:110, pax:4,  range:520,  initK:125,   fixK:11,   varH:52,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Pipistrel ─────────────────────────────────────────────────────
  { name:'Pipistrel Panthera',         type:'piston',tas:200, pax:4,  range:1000, initK:380,   fixK:14,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Pipistrel Sinus 912',        type:'piston',tas:118, pax:2,  range:800,  initK:140,   fixK:8,    varH:30,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Pipistrel Virus SW 121',     type:'piston',tas:130, pax:2,  range:700,  initK:170,   fixK:9,    varH:35,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Rockwell ─────────────────────────────────────────────────────
  { name:'Rockwell Commander 112TC',   type:'piston',tas:168, pax:4,  range:850,  initK:80,    fixK:13,   varH:68,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Rockwell Commander 114',     type:'piston',tas:158, pax:4,  range:800,  initK:70,    fixK:12,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Socata ─────────────────────────────────────────────────────
  { name:'Socata Rallye 235E',         type:'piston',tas:125, pax:4,  range:600,  initK:35,    fixK:9,    varH:45,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Socata TB-10 Tobago',        type:'piston',tas:125, pax:4,  range:700,  initK:60,    fixK:11,   varH:55,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Socata TB-20 Trinidad',      type:'piston',tas:165, pax:4,  range:1000, initK:130,   fixK:15,   varH:70,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Socata TB-21 Trinidad TC',   type:'piston',tas:185, pax:4,  range:1100, initK:150,   fixK:16,   varH:78,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Socata TBM 900',             type:'turbo', tas:330, pax:5,  range:1730, initK:4000,  fixK:95,   varH:560,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Socata TBM 930',             type:'turbo', tas:330, pax:5,  range:1730, initK:4200,  fixK:98,   varH:580,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },

  // ── Stinson ─────────────────────────────────────────────────────
  { name:'Stinson 108-3 Voyager',      type:'piston',tas:108, pax:4,  range:500,  initK:35,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Swearingen ─────────────────────────────────────────────────────
  { name:'Swearingen Merlin III',      type:'turbo', tas:300, pax:8,  range:1540, initK:350,   fixK:90,   varH:460,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Taylorcraft ─────────────────────────────────────────────────────
  { name:'Taylorcraft BC12-D',         type:'piston',tas:85,  pax:2,  range:300,  initK:18,    fixK:4,    varH:18,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Taylorcraft F21B',           type:'piston',tas:110, pax:2,  range:400,  initK:55,    fixK:7,    varH:28,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── TBM ─────────────────────────────────────────────────────
  { name:'TBM 700',                    type:'turbo', tas:300, pax:5,  range:1730, initK:2200,  fixK:80,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 850',                    type:'turbo', tas:320, pax:5,  range:1665, initK:3200,  fixK:90,   varH:540,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 900',                    type:'turbo', tas:330, pax:5,  range:1730, initK:4000,  fixK:95,   varH:560,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 930',                    type:'turbo', tas:330, pax:5,  range:1730, initK:4200,  fixK:98,   varH:580,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 960',                    type:'turbo', tas:330, pax:5,  range:1730, initK:4300,  fixK:100,  varH:600,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },

  // ── Tecnam ─────────────────────────────────────────────────────
  { name:'Tecnam P2004 Bravo',         type:'piston',tas:100, pax:2,  range:500,  initK:110,   fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Tecnam P2006T',              type:'piston',tas:140, pax:3,  range:750,  initK:250,   fixK:14,   varH:65,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Tecnam P2010 MkII',          type:'piston',tas:140, pax:4,  range:715,  initK:370,   fixK:16,   varH:72,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Tecnam P2010 TDI Diesel',    type:'piston',tas:136, pax:4,  range:1050, initK:412,   fixK:17,   varH:68,   rating:false, fuel:'Jet-A', gear:'tricycle',    engines:1 },
  { name:'Tecnam P92 Eaglet',          type:'piston',tas:105, pax:2,  range:600,  initK:130,   fixK:9,    varH:42,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Vans ─────────────────────────────────────────────────────
  { name:'Vans RV-10',                 type:'piston',tas:175, pax:4,  range:1000, initK:80,    fixK:11,   varH:52,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-12',                 type:'piston',tas:105, pax:2,  range:500,  initK:45,    fixK:8,    varH:35,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-14',                 type:'piston',tas:190, pax:2,  range:1050, initK:90,    fixK:10,   varH:48,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-6',                  type:'piston',tas:160, pax:2,  range:700,  initK:40,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-7 homebuilt',        type:'piston',tas:170, pax:2,  range:800,  initK:60,    fixK:9,    varH:40,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-8',                  type:'piston',tas:180, pax:2,  range:800,  initK:55,    fixK:9,    varH:42,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Vulcanair ─────────────────────────────────────────────────────
  { name:'Vulcanair P.68 Observer 2',  type:'piston',tas:155, pax:6,  range:900,  initK:650,   fixK:22,   varH:95,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Vulcanair V.1.0',            type:'piston',tas:145, pax:4,  range:750,  initK:320,   fixK:16,   varH:70,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Zenith ─────────────────────────────────────────────────────
  { name:'Zenith CH 601 XL',           type:'piston',tas:95,  pax:2,  range:600,  initK:28,    fixK:6,    varH:26,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Zenith STOL CH 750',         type:'piston',tas:80,  pax:2,  range:500,  initK:38,    fixK:7,    varH:30,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

]

export function scoreAircraft(a: Aircraft, params: {
  init: number; fix: number; varH: number
  pax: number; range: number
  jet: boolean; turbo: boolean; piston: boolean
  rY: boolean; rN: boolean
}): number | null {
  if (a.type === 'jet'    && !params.jet)    return null
  if (a.type === 'turbo'  && !params.turbo)  return null
  if (a.type === 'piston' && !params.piston) return null
  if (a.rating  && !params.rY) return null
  if (!a.rating && !params.rN) return null
  if (a.pax < params.pax || a.range < params.range) return null

  let s = 100
  const cr = a.initK / params.init
  if (cr > 1.5) s -= 30 * Math.min(1, cr - 1.5); else s += 10 * (1 - cr)
  const fr = a.fixK / params.fix
  if (fr > 1.5) s -= 20 * Math.min(1, fr - 1.5); else s += 8 * (1 - fr)
  const vr = a.varH / params.varH
  if (vr > 1.5) s -= 20 * Math.min(1, vr - 1.5); else s += 8 * (1 - vr)
  s -= (a.pax - params.pax) * 1.5
  s -= (a.range - params.range) / 200
  return Math.max(0, Math.min(100, s))
}
