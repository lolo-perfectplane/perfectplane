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
  gear: 'retractable' | 'tricycle' | 'tailwheel' | 'skids'
  engines: 1 | 2 | 3 | 4
  category?: 'airplane' | 'helicopter' | 'gyrocopter' | 'trike'  // absent = airplane (rétrocompat)
}

// Fallback per category (used for wind ring when no aircraft selected)
export const TAS: Record<Aircraft['type'], number> = {
  jet: 450, turbo: 280, piston: 130
}

export const AC: Aircraft[] = [
  // ── Acro Sport ────────────────────────────────────────────────────
  { name:'Acro Sport I',                          type:'piston', tas:115,  pax:1,   range:300,   initK:35,     fixK:5,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Acro Sport II',                         type:'piston', tas:120,  pax:2,   range:320,   initK:45,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Aermacchi ─────────────────────────────────────────────────────
  { name:'Aermacchi MB-326',                      type:'jet',    tas:340,  pax:2,   range:1000,  initK:400,    fixK:120,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Aermacchi MB-339',                      type:'jet',    tas:380,  pax:2,   range:1100,  initK:700,    fixK:150,   varH:2200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Aero ──────────────────────────────────────────────────────────
  { name:'Aero 145',                              type:'piston', tas:150,  pax:4,   range:850,   initK:60,     fixK:15,    varH:72,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Aero 45',                               type:'piston', tas:140,  pax:4,   range:800,   initK:50,     fixK:14,    varH:68,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Aero Commander 500',         type:'piston',tas:165, pax:5,  range:626,  initK:45,    fixK:14,   varH:72,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aero Commander 500B',        type:'piston',tas:170, pax:5,  range:642,  initK:50,    fixK:15,   varH:75,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aero Commander 500S Shrike', type:'piston',tas:190, pax:6,  range:758,  initK:75,    fixK:17,   varH:82,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aero Commander 560 Twin',    type:'piston',tas:175, pax:5,  range:669,  initK:60,    fixK:16,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aero Commander 680 Super',   type:'piston',tas:200, pax:7,  range:850, initK:90,    fixK:19,   varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aero Commander 690 Turbo',   type:'turbo', tas:260, pax:8,  range:1170, initK:350,   fixK:80,   varH:400,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Aero Boero ────────────────────────────────────────────────────
  { name:'Aero Boero AB-115',                     type:'piston', tas:95,   pax:3,   range:450,   initK:35,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aero Boero AB-180',                     type:'piston', tas:110,  pax:3,   range:500,   initK:45,     fixK:7,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Aero Divers ───────────────────────────────────────────────────
  { name:'Aero Ae-270 Ibis',                      type:'turbo',  tas:270,  pax:9,   range:1300,  initK:1500,   fixK:70,    varH:300,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Aero Vodochody ────────────────────────────────────────────────
  { name:'Aero Vodochody L-159 Alca',             type:'jet',    tas:400,  pax:1,   range:800,   initK:1500,   fixK:250,   varH:2500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Aero Vodochody L-29 Delfin',            type:'jet',    tas:300,  pax:2,   range:480,   initK:200,    fixK:90,    varH:1400,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Aero Vodochody L-39 Albatros',          type:'jet',    tas:350,  pax:2,   range:590,   initK:400,    fixK:130,   varH:1900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Aeromot ───────────────────────────────────────────────────────
  { name:'Aeromot AMT-200 Super Ximango',         type:'piston', tas:95,   pax:2,   range:540,   initK:75,     fixK:8,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Aeronca ───────────────────────────────────────────────────────
  { name:'Aeronca 11AC Chief',                    type:'piston', tas:85,   pax:2,   range:300,   initK:36,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aeronca 15AC Sedan',                    type:'piston', tas:100,  pax:4,   range:450,   initK:50,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aeronca 7AC Champion',                  type:'piston', tas:80,   pax:2,   range:270,   initK:38,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aeronca Champ 7AC',          type:'piston',tas:85,  pax:2,  range:286,  initK:25,    fixK:5,    varH:22,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aeronca Chief 11AC',         type:'piston',tas:80,  pax:2,  range:240,  initK:22,    fixK:5,    varH:20,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aeronca Defender L-16',      type:'piston',tas:90,  pax:2,  range:262,  initK:30,    fixK:6,    varH:24,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aeronca Sedan 15AC',         type:'piston',tas:105, pax:4,  range:371,  initK:38,    fixK:8,    varH:32,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Aeronca Divers ────────────────────────────────────────────────
  { name:'Aeronca 11CC Super Chief',              type:'piston', tas:90,   pax:2,   range:320,   initK:42,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aeronca 7DC Champion',                  type:'piston', tas:85,   pax:2,   range:280,   initK:40,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aeronca 7EC Traveler',                  type:'piston', tas:95,   pax:2,   range:320,   initK:45,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aeronca L-16',                          type:'piston', tas:85,   pax:2,   range:270,   initK:55,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aeronca L-3 Grasshopper',               type:'piston', tas:80,   pax:2,   range:250,   initK:50,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Aeroprakt ─────────────────────────────────────────────────────
  { name:'Aeroprakt A-20 Vista',                  type:'piston', tas:90,   pax:2,   range:450,   initK:45,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Aeroprakt A-22 Foxbat',                 type:'piston', tas:95,   pax:2,   range:500,   initK:60,     fixK:5,     varH:25,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Aeroprakt A-24 Viking',                 type:'piston', tas:100,  pax:2,   range:500,   initK:75,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Aeroprakt A-32 Vixxen',                 type:'piston', tas:110,  pax:2,   range:600,   initK:90,     fixK:6,     varH:27,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Aeroprakt Divers ──────────────────────────────────────────────
  { name:'Aeroprakt A-22LS Foxbat',               type:'piston', tas:100,  pax:2,   range:520,   initK:80,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Aeroprakt A-32 Vixxen LS',              type:'piston', tas:112,  pax:2,   range:620,   initK:100,    fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Aeropro ───────────────────────────────────────────────────────
  { name:'Aeropro Eurofox 3K',                    type:'piston', tas:110,  pax:2,   range:520,   initK:90,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aeropro Eurofox 912',                   type:'piston', tas:105,  pax:2,   range:500,   initK:75,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aeropro Eurofox Nosewheel',             type:'piston', tas:105,  pax:2,   range:500,   initK:80,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Aeros ─────────────────────────────────────────────────────────
  { name:'Aeros Nanolight ANT',                   type:'piston', tas:58,   pax:2,   range:230,   initK:38,     fixK:4,     varH:19,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },

  // ── Aerospatiale Frelon ───────────────────────────────────────────
  { name:'Aerospatiale SA321 Super Frelon',       type:'turbo',  tas:135,  pax:27,  range:450,   initK:1500,   fixK:400,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:3, category:'helicopter' },

  // ── Aerospatiale-BAC ──────────────────────────────────────────────
  { name:'Concorde',                              type:'jet',    tas:1176, pax:100, range:3900,  initK:30000,  fixK:3000,  varH:25000, rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── Aerospool ─────────────────────────────────────────────────────
  { name:'Aerospool Dynamic WT9 Club',            type:'piston', tas:130,  pax:2,   range:700,   initK:100,    fixK:6,     varH:29,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Aerospool Dynamic WT9 Speed',           type:'piston', tas:135,  pax:2,   range:750,   initK:125,    fixK:7,     varH:30,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Aerospool Dynamic WT9 Turbo',           type:'piston', tas:145,  pax:2,   range:800,   initK:160,    fixK:7,     varH:31,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Aerospool WT10 Advantic',               type:'piston', tas:140,  pax:4,   range:800,   initK:200,    fixK:10,    varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Aerosport ─────────────────────────────────────────────────────
  { name:'Aerosport Scamp',                       type:'piston', tas:85,   pax:1,   range:250,   initK:20,     fixK:3,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Aerostar ──────────────────────────────────────────────────────
  { name:'Aerostar 600',               type:'piston',tas:225, pax:5,  range:1031, initK:90,    fixK:19,   varH:92,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aerostar 601',               type:'piston',tas:228, pax:5,  range:1079, initK:95,    fixK:19,   varH:93,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aerostar 601P',              type:'piston',tas:210, pax:5,  range:1142, initK:100,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aerostar 602P',              type:'piston',tas:225, pax:5,  range:1181, initK:120,   fixK:21,   varH:98,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aerostar 700',               type:'piston',tas:230, pax:5,  range:1228, initK:140,   fixK:22,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Aerostar 700P',              type:'piston',tas:235, pax:5,  range:1274, initK:150,   fixK:23,   varH:102,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },

  // ── Aerostyle ─────────────────────────────────────────────────────
  { name:'Aerostyle Breezer Sport',               type:'piston', tas:115,  pax:2,   range:600,   initK:100,    fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Agusta-Bell ───────────────────────────────────────────────────
  { name:'Agusta-Bell AB206 JetRanger',           type:'turbo',  tas:115,  pax:5,   range:374,   initK:600,    fixK:58,    varH:390,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Agusta-Bell AB212',                     type:'turbo',  tas:100,  pax:14,  range:240,   initK:1400,   fixK:195,   varH:1580,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Agusta-Bell AB412',                     type:'turbo',  tas:122,  pax:14,  range:400,   initK:3000,   fixK:260,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Agusta-Bell AB47G',                     type:'piston', tas:75,   pax:3,   range:210,   initK:160,    fixK:21,    varH:168,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Air Command ───────────────────────────────────────────────────
  { name:'Air Command Commander Elite',           type:'piston', tas:85,   pax:2,   range:280,   initK:45,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Air Creation ──────────────────────────────────────────────────
  { name:'Air Creation Clipper',                  type:'piston', tas:55,   pax:2,   range:220,   initK:35,     fixK:4,     varH:19,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'Air Creation iXess 15',                 type:'piston', tas:55,   pax:2,   range:220,   initK:40,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'Air Creation Pixel XC',                 type:'piston', tas:50,   pax:1,   range:180,   initK:30,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'Air Creation Skypper 912',              type:'piston', tas:58,   pax:2,   range:240,   initK:50,     fixK:5,     varH:21,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'Air Creation Tanarg 912',               type:'piston', tas:60,   pax:2,   range:250,   initK:55,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'Air Creation Tanarg 912 Neo',           type:'piston', tas:62,   pax:2,   range:260,   initK:70,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },

  // ── Air Tractor ───────────────────────────────────────────────────
  { name:'Air Tractor AT-301',                    type:'piston', tas:110,  pax:1,   range:300,   initK:90,     fixK:20,    varH:110,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Air Tractor AT-401',                    type:'piston', tas:120,  pax:1,   range:350,   initK:150,    fixK:24,    varH:130,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Air Tractor AT-402B',                   type:'turbo',  tas:130,  pax:1,   range:400,   initK:450,    fixK:60,    varH:320,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Air Tractor AT-502B',                   type:'turbo',  tas:140,  pax:1,   range:450,   initK:700,    fixK:75,    varH:400,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Air Tractor AT-504',                    type:'turbo',  tas:140,  pax:2,   range:450,   initK:800,    fixK:78,    varH:410,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Air Tractor AT-602',                    type:'turbo',  tas:145,  pax:1,   range:480,   initK:900,    fixK:85,    varH:450,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Air Tractor AT-802',                    type:'turbo',  tas:190,  pax:1,   range:800,   initK:1800,   fixK:120,   varH:650,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Air Tractor AT-802A',                   type:'turbo',  tas:190,  pax:1,   range:800,   initK:1900,   fixK:125,   varH:660,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Air Tractor AT-802F Fire Boss',         type:'turbo',  tas:190,  pax:1,   range:800,   initK:2200,   fixK:135,   varH:700,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },

  // ── Airborne ──────────────────────────────────────────────────────
  { name:'Airborne Edge X',                       type:'piston', tas:55,   pax:2,   range:220,   initK:35,     fixK:4,     varH:19,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'Airborne XT-912 Tourer',                type:'piston', tas:62,   pax:2,   range:250,   initK:50,     fixK:5,     varH:21,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },

  // ── Airbus ────────────────────────────────────────────────────────
  { name:'Airbus A220-100',                       type:'jet',    tas:447,  pax:110, range:3450,  initK:35000,  fixK:900,   varH:2400,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A220-300',                       type:'jet',    tas:447,  pax:130, range:3400,  initK:40000,  fixK:950,   varH:2500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A300-600R',                      type:'jet',    tas:470,  pax:266, range:4050,  initK:3000,   fixK:1200,  varH:4500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A310-300',                       type:'jet',    tas:470,  pax:220, range:5150,  initK:2500,   fixK:1100,  varH:4200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A318',                           type:'jet',    tas:447,  pax:107, range:3100,  initK:5000,   fixK:800,   varH:2800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A319',                           type:'jet',    tas:447,  pax:124, range:3700,  initK:8000,   fixK:900,   varH:2900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A319neo',                        type:'jet',    tas:450,  pax:140, range:3750,  initK:40000,  fixK:1000,  varH:2600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A320-200',                       type:'jet',    tas:447,  pax:150, range:3300,  initK:10000,  fixK:950,   varH:2900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A320neo',                        type:'jet',    tas:450,  pax:165, range:3400,  initK:48000,  fixK:1100,  varH:2600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A321-200',                       type:'jet',    tas:447,  pax:185, range:3200,  initK:12000,  fixK:1000,  varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A321neo',                        type:'jet',    tas:450,  pax:206, range:4000,  initK:55000,  fixK:1200,  varH:2700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A321XLR',                        type:'jet',    tas:450,  pax:206, range:4700,  initK:65000,  fixK:1300,  varH:2800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A330-200',                       type:'jet',    tas:470,  pax:247, range:7250,  initK:25000,  fixK:2000,  varH:5500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A330-300',                       type:'jet',    tas:470,  pax:277, range:6350,  initK:28000,  fixK:2100,  varH:5700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A330-900neo',                    type:'jet',    tas:472,  pax:287, range:7200,  initK:90000,  fixK:2300,  varH:5200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A340-300',                       type:'jet',    tas:475,  pax:295, range:7400,  initK:8000,   fixK:2500,  varH:7500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Airbus A340-600',                       type:'jet',    tas:475,  pax:326, range:7900,  initK:12000,  fixK:2800,  varH:8500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Airbus A350-1000',                      type:'jet',    tas:488,  pax:366, range:8700,  initK:150000, fixK:2800,  varH:5800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A350-900',                       type:'jet',    tas:488,  pax:325, range:8100,  initK:130000, fixK:2600,  varH:5500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Airbus A380-800',                       type:'jet',    tas:490,  pax:555, range:8000,  initK:25000,  fixK:5000,  varH:15000, rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── Airbus Divers ─────────────────────────────────────────────────
  { name:'Airbus AS350 B3e',                      type:'turbo',  tas:132,  pax:6,   range:340,   initK:2600,   fixK:92,    varH:590,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus AS350 D Astar',                  type:'turbo',  tas:120,  pax:6,   range:330,   initK:700,    fixK:76,    varH:530,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus EC120 Colibri',                  type:'turbo',  tas:120,  pax:5,   range:380,   initK:800,    fixK:63,    varH:415,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus SA365 C Dauphin',                type:'turbo',  tas:140,  pax:10,  range:400,   initK:800,    fixK:200,   varH:1250,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Airbus H175 ───────────────────────────────────────────────────
  { name:'Airbus H175',                           type:'turbo',  tas:150,  pax:16,  range:640,   initK:16000,  fixK:400,   varH:2400,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Airbus Helicopters ────────────────────────────────────────────
  { name:'Airbus AS332 L1 Super Puma',            type:'turbo',  tas:141,  pax:19,  range:470,   initK:3500,   fixK:380,   varH:2400,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus AS332 Super Puma',               type:'turbo',  tas:141,  pax:19,  range:460,   initK:5000,   fixK:400,   varH:2500,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus AS350 B2 Ecureuil',              type:'turbo',  tas:125,  pax:6,   range:340,   initK:1200,   fixK:80,    varH:550,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus AS355 Ecureuil 2',               type:'turbo',  tas:121,  pax:6,   range:380,   initK:900,    fixK:110,   varH:750,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus AS365 N2 Dauphin',               type:'turbo',  tas:145,  pax:12,  range:420,   initK:2000,   fixK:220,   varH:1300,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus AS365 N3 Dauphin',               type:'turbo',  tas:145,  pax:12,  range:440,   initK:4000,   fixK:240,   varH:1400,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus AS550 Fennec',                   type:'turbo',  tas:133,  pax:6,   range:350,   initK:1500,   fixK:90,    varH:600,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus EC130 B4',                       type:'turbo',  tas:130,  pax:7,   range:330,   initK:1800,   fixK:90,    varH:580,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus EC135 T2+',                      type:'turbo',  tas:137,  pax:7,   range:343,   initK:2500,   fixK:170,   varH:1050,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus EC145 C2',                       type:'turbo',  tas:133,  pax:9,   range:350,   initK:4000,   fixK:240,   varH:1400,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus EC155 B1',                       type:'turbo',  tas:150,  pax:13,  range:460,   initK:3000,   fixK:260,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus EC225 Super Puma',               type:'turbo',  tas:145,  pax:19,  range:460,   initK:8000,   fixK:500,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus H120 Colibri',                   type:'turbo',  tas:120,  pax:5,   range:380,   initK:900,    fixK:65,    varH:420,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus H125',                           type:'turbo',  tas:132,  pax:6,   range:340,   initK:3200,   fixK:95,    varH:600,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus H130',                           type:'turbo',  tas:130,  pax:7,   range:330,   initK:3500,   fixK:100,   varH:620,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus H135',                           type:'turbo',  tas:137,  pax:7,   range:343,   initK:4500,   fixK:180,   varH:1100,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus H145',                           type:'turbo',  tas:133,  pax:9,   range:351,   initK:9500,   fixK:260,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus H155',                           type:'turbo',  tas:150,  pax:13,  range:460,   initK:6500,   fixK:280,   varH:1600,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus H160',                           type:'turbo',  tas:160,  pax:12,  range:475,   initK:15000,  fixK:350,   varH:1900,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus SA315B Lama',                    type:'turbo',  tas:103,  pax:4,   range:280,   initK:500,    fixK:60,    varH:480,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus SA316B Alouette III',            type:'turbo',  tas:100,  pax:7,   range:290,   initK:350,    fixK:60,    varH:480,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus SA318C Alouette II',             type:'turbo',  tas:90,   pax:5,   range:300,   initK:200,    fixK:45,    varH:380,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus SA319B Alouette III',            type:'turbo',  tas:100,  pax:7,   range:300,   initK:380,    fixK:62,    varH:490,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus SA330 Puma',                     type:'turbo',  tas:145,  pax:16,  range:300,   initK:1200,   fixK:300,   varH:2000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Airbus SA341 Gazelle',                  type:'turbo',  tas:130,  pax:4,   range:360,   initK:350,    fixK:55,    varH:450,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus SA342 Gazelle',                  type:'turbo',  tas:145,  pax:4,   range:360,   initK:400,    fixK:58,    varH:470,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Airbus SE3130 Alouette II',             type:'turbo',  tas:90,   pax:5,   range:300,   initK:180,    fixK:44,    varH:370,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Airspeed ──────────────────────────────────────────────────────
  { name:'Airspeed AS.10 Oxford',                 type:'piston', tas:160,  pax:3,   range:700,   initK:250,    fixK:25,    varH:140,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Albatros ──────────────────────────────────────────────────────
  { name:'Albatros D.Va replica',                 type:'piston', tas:95,   pax:1,   range:220,   initK:130,    fixK:10,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Alenia ────────────────────────────────────────────────────────
  { name:'Alenia G.222',                          type:'turbo',  tas:291,  pax:53,  range:1200,  initK:2000,   fixK:400,   varH:1400,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Alisport ──────────────────────────────────────────────────────
  { name:'Alisport Silent 2 Targa',               type:'piston', tas:95,   pax:1,   range:300,   initK:60,     fixK:6,     varH:22,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Alpi ──────────────────────────────────────────────────────────
  { name:'Alpi Aviation Pioneer 200',             type:'piston', tas:120,  pax:2,   range:600,   initK:80,     fixK:6,     varH:27,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Alpi Aviation Pioneer 300',             type:'piston', tas:135,  pax:2,   range:700,   initK:110,    fixK:7,     varH:30,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Alpi Divers ───────────────────────────────────────────────────
  { name:'Alpi Aviation Pioneer 400',             type:'piston', tas:145,  pax:4,   range:750,   initK:140,    fixK:8,     varH:33,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── American ──────────────────────────────────────────────────────
  { name:'American Champion 8KCAB Decathlon',   type:'piston',tas:128,pax:2,range:384,initK:150, fixK:10, varH:47,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'American Champion Citabria 7ECA',     type:'piston',tas:100,pax:2,range:375,initK:65,  fixK:9,  varH:42,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'American Champion Citabria 7GCBC',    type:'piston',tas:105,pax:2,range:391,initK:80,  fixK:9,  varH:44,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'American Champion Denali Scout 210',  type:'piston',tas:115,pax:2,range:494,initK:280, fixK:12, varH:55,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'American Champion Scout 180',         type:'piston',tas:108,pax:2,range:469,initK:220, fixK:11, varH:52,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'American Champion Super Decathlon',   type:'piston',tas:130,pax:2,range:402,initK:160, fixK:10, varH:48,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── American Aviation ─────────────────────────────────────────────
  { name:'American AA-1 Yankee',                  type:'piston', tas:115,  pax:2,   range:400,   initK:30,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'American AA-1B Trainer',                type:'piston', tas:115,  pax:2,   range:420,   initK:32,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'American AA-1C Lynx',                   type:'piston', tas:118,  pax:2,   range:430,   initK:35,     fixK:7,     varH:31,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'American AA-5A Cheetah',                type:'piston', tas:130,  pax:4,   range:600,   initK:55,     fixK:9,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Grumman GA-7 Cougar',                   type:'piston', tas:160,  pax:4,   range:900,   initK:75,     fixK:18,    varH:88,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── American Champion ─────────────────────────────────────────────
  { name:'American Champion 7AC Champ',           type:'piston', tas:80,   pax:2,   range:270,   initK:40,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'American Champion 7GCAA Adventure',     type:'piston', tas:115,  pax:2,   range:500,   initK:95,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'American Champion 7GCBC Explorer',      type:'piston', tas:110,  pax:2,   range:550,   initK:105,    fixK:9,     varH:43,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'American Champion 7KCAB Citabria',      type:'piston', tas:110,  pax:2,   range:470,   initK:70,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'American Champion 8GCBC Scout',         type:'piston', tas:110,  pax:2,   range:600,   initK:120,    fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── American Legend ───────────────────────────────────────────────
  { name:'American Legend Cub',                   type:'piston', tas:95,   pax:2,   range:400,   initK:130,    fixK:8,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'American Legend Super Legend',          type:'piston', tas:100,  pax:2,   range:450,   initK:160,    fixK:9,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'American Legend Texas Sport Cub',       type:'piston', tas:95,   pax:2,   range:420,   initK:120,    fixK:8,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── AMS Flight ────────────────────────────────────────────────────
  { name:'AMS Flight Carat A',                    type:'piston', tas:100,  pax:1,   range:400,   initK:75,     fixK:7,     varH:25,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Antonov ───────────────────────────────────────────────────────
  { name:'Antonov An-12',                         type:'turbo',  tas:350,  pax:90,  range:1900,  initK:600,    fixK:500,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Antonov An-2',                          type:'piston', tas:85,   pax:12,  range:460,   initK:120,    fixK:30,    varH:220,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Antonov An-24',                         type:'turbo',  tas:243,  pax:50,  range:1300,  initK:400,    fixK:400,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Antonov An-26',                         type:'turbo',  tas:235,  pax:40,  range:1300,  initK:500,    fixK:450,   varH:1000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Antonov An-30',                         type:'turbo',  tas:235,  pax:20,  range:1600,  initK:500,    fixK:180,   varH:950,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Antonov Airliner ──────────────────────────────────────────────
  { name:'Antonov An-124 Ruslan',                 type:'jet',    tas:430,  pax:88,  range:2800,  initK:30000,  fixK:1500,  varH:12000, rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Antonov An-140',                        type:'turbo',  tas:310,  pax:52,  range:1400,  initK:2500,   fixK:300,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Antonov An-148',                        type:'jet',    tas:450,  pax:85,  range:2100,  initK:4000,   fixK:500,   varH:1900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Antonov An-32',                         type:'turbo',  tas:260,  pax:50,  range:1300,  initK:800,    fixK:400,   varH:1200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Antonov An-72',                         type:'jet',    tas:300,  pax:52,  range:2700,  initK:2000,   fixK:400,   varH:2000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Antonov An-74',                         type:'jet',    tas:300,  pax:52,  range:2700,  initK:2500,   fixK:420,   varH:2100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Antonov Divers ────────────────────────────────────────────────
  { name:'Antonov An-14 Pchelka',                 type:'piston', tas:100,  pax:8,   range:400,   initK:90,     fixK:20,    varH:110,   rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:2 },
  { name:'Antonov An-28',                         type:'turbo',  tas:190,  pax:19,  range:700,   initK:700,    fixK:150,   varH:500,   rating:true,   fuel:'Jet-A',  gear:'tricycle',     engines:2 },
  { name:'Antonov An-3',                          type:'turbo',  tas:110,  pax:12,  range:480,   initK:400,    fixK:60,    varH:320,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },

  // ── Aquila ────────────────────────────────────────────────────────
  { name:'Aquila A210',                           type:'piston', tas:120,  pax:2,   range:590,   initK:130,    fixK:8,     varH:35,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Aquila A211',                           type:'piston', tas:125,  pax:2,   range:620,   initK:180,    fixK:9,     varH:37,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── ATEC ──────────────────────────────────────────────────────────
  { name:'ATEC 122 Zephyr',                       type:'piston', tas:120,  pax:2,   range:650,   initK:70,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'ATEC 321 Faeta',                        type:'piston', tas:130,  pax:2,   range:700,   initK:90,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Atec ──────────────────────────────────────────────────────────
  { name:'Atec Solo',                             type:'piston', tas:110,  pax:1,   range:500,   initK:55,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Atlas ─────────────────────────────────────────────────────────
  { name:'Atlas Impala Mk.II',                    type:'jet',    tas:350,  pax:1,   range:700,   initK:250,    fixK:85,    varH:1250,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── ATR ───────────────────────────────────────────────────────────
  { name:'ATR 42-500',                            type:'turbo',  tas:300,  pax:48,  range:840,   initK:6000,   fixK:500,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'ATR 42-600',                            type:'turbo',  tas:300,  pax:48,  range:800,   initK:15000,  fixK:550,   varH:850,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'ATR 72-500',                            type:'turbo',  tas:275,  pax:70,  range:800,   initK:9000,   fixK:600,   varH:1000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'ATR 72-600',                            type:'turbo',  tas:275,  pax:72,  range:825,   initK:20000,  fixK:650,   varH:950,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Auster ────────────────────────────────────────────────────────
  { name:'Auster AOP.9',                          type:'piston', tas:95,   pax:2,   range:300,   initK:60,     fixK:9,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Auster J/1 Autocrat',                   type:'piston', tas:85,   pax:3,   range:320,   initK:45,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Auster J/5 Autocar',                    type:'piston', tas:90,   pax:4,   range:350,   initK:50,     fixK:8,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── AutoGyro ──────────────────────────────────────────────────────
  { name:'AutoGyro Calidus',                      type:'piston', tas:95,   pax:2,   range:350,   initK:95,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },
  { name:'AutoGyro Cavalon',                      type:'piston', tas:95,   pax:2,   range:380,   initK:110,    fixK:7,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },
  { name:'AutoGyro Cavalon Pro',                  type:'piston', tas:100,  pax:2,   range:400,   initK:140,    fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },
  { name:'AutoGyro MTOsport 2017',                type:'piston', tas:85,   pax:2,   range:300,   initK:75,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },

  // ── Aveko ─────────────────────────────────────────────────────────
  { name:'Aveko VL-3 Sprint',                     type:'piston', tas:140,  pax:2,   range:700,   initK:180,    fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Aviasud ───────────────────────────────────────────────────────
  { name:'Aviasud Mistral',                       type:'piston', tas:80,   pax:2,   range:320,   initK:35,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Aviasud Sirocco',                       type:'piston', tas:75,   pax:2,   range:300,   initK:30,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Aviat ─────────────────────────────────────────────────────────
  { name:'Aviat Husky A-1',                       type:'piston', tas:100,  pax:2,   range:450,   initK:130,    fixK:12,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aviat Husky A-1A',           type:'piston',tas:118, pax:2,  range:562,  initK:190,   fixK:10,   varH:48,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aviat Husky A-1B',           type:'piston',tas:120, pax:2,  range:590,  initK:210,   fixK:10,   varH:50,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aviat Husky A-1B-200',                  type:'piston', tas:105,  pax:2,   range:480,   initK:190,    fixK:13,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aviat Husky A-1C Amphibian',            type:'piston', tas:105,  pax:2,   range:480,   initK:300,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aviat Husky A-1C-180',       type:'piston',tas:122, pax:2,  range:608,  initK:240,   fixK:11,   varH:52,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aviat Pitts Model 12',                  type:'piston', tas:145,  pax:2,   range:300,   initK:150,    fixK:12,    varH:72,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aviat Pitts S-1-11B Super Stinker',     type:'piston', tas:152,  pax:1,   range:250,   initK:130,    fixK:10,    varH:60,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aviat Pitts S-1S',                      type:'piston', tas:130,  pax:1,   range:300,   initK:60,     fixK:8,     varH:45,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aviat Pitts S-1T',                      type:'piston', tas:140,  pax:1,   range:265,   initK:95,     fixK:9,     varH:50,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aviat Pitts S-2A',                      type:'piston', tas:130,  pax:2,   range:280,   initK:90,     fixK:10,    varH:52,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Aviat Pitts S-2B',           type:'piston',tas:150, pax:2,  range:188,  initK:140,   fixK:11,   varH:55,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aviat Pitts S-2C',           type:'piston',tas:155, pax:2,  range:164,  initK:220,   fixK:12,   varH:58,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Aviat Pitts S-2S',                      type:'piston', tas:138,  pax:1,   range:250,   initK:130,    fixK:11,    varH:55,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Aviation Traders ──────────────────────────────────────────────
  { name:'Aviation Traders ATL-98 Carvair',       type:'piston', tas:180,  pax:22,  range:2000,  initK:350,    fixK:90,    varH:480,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:4 },

  // ── Avid ──────────────────────────────────────────────────────────
  { name:'Avid Flyer Mk IV',                      type:'piston', tas:95,   pax:2,   range:450,   initK:40,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Aviomania ─────────────────────────────────────────────────────
  { name:'Aviomania G1sb Genesis',                type:'piston', tas:85,   pax:1,   range:260,   initK:55,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Avro ──────────────────────────────────────────────────────────
  { name:'Avro Anson',                            type:'piston', tas:130,  pax:8,   range:700,   initK:250,    fixK:25,    varH:140,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Avro Lancaster',                        type:'piston', tas:165,  pax:7,   range:2200,  initK:8000,   fixK:450,   varH:3200,  rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:4 },

  // ── B&F ───────────────────────────────────────────────────────────
  { name:'B&F Funk FK12 Comet',                   type:'piston', tas:105,  pax:2,   range:400,   initK:75,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'B&F Funk FK51',                         type:'piston', tas:110,  pax:2,   range:450,   initK:85,     fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── B&F Divers ────────────────────────────────────────────────────
  { name:'B&F Funk FK9 Mk5',                      type:'piston', tas:105,  pax:2,   range:540,   initK:75,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── BAC ───────────────────────────────────────────────────────────
  { name:'BAC 1-11 500',                          type:'jet',    tas:470,  pax:119, range:1700,  initK:500,    fixK:550,   varH:2600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'BAC Jet Provost T.5',                   type:'jet',    tas:300,  pax:2,   range:700,   initK:200,    fixK:85,    varH:1300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'BAC Strikemaster Mk.80',                type:'jet',    tas:320,  pax:2,   range:800,   initK:300,    fixK:100,   varH:1600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── BAe ───────────────────────────────────────────────────────────
  { name:'BAe 146-200',                           type:'jet',    tas:425,  pax:85,  range:1600,  initK:1500,   fixK:700,   varH:2200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'BAe 146-300',                           type:'jet',    tas:425,  pax:103, range:1400,  initK:1800,   fixK:750,   varH:2300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'BAe Avro RJ100',                        type:'jet',    tas:425,  pax:100, range:1400,  initK:2800,   fixK:760,   varH:2350,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'BAe Avro RJ85',                         type:'jet',    tas:425,  pax:85,  range:1500,  initK:2500,   fixK:720,   varH:2250,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── BAe 125 ───────────────────────────────────────────────────────
  { name:'BAe 125-700',                           type:'jet',    tas:430,  pax:8,   range:2500,  initK:800,    fixK:220,   varH:2100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── BAe Hawk ──────────────────────────────────────────────────────
  { name:'BAe Hawk T.1',                          type:'jet',    tas:430,  pax:2,   range:1500,  initK:800,    fixK:150,   varH:2000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── BAe Jetstream ─────────────────────────────────────────────────
  { name:'BAe Jetstream 31',                      type:'turbo',  tas:260,  pax:19,  range:680,   initK:400,    fixK:250,   varH:550,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'BAe Jetstream 32',                      type:'turbo',  tas:264,  pax:19,  range:700,   initK:500,    fixK:260,   varH:570,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'BAe Jetstream 41',                      type:'turbo',  tas:295,  pax:29,  range:780,   initK:900,    fixK:320,   varH:680,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Bakeng ────────────────────────────────────────────────────────
  { name:'Bakeng Duce',                           type:'piston', tas:105,  pax:2,   range:350,   initK:30,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Barracuda ─────────────────────────────────────────────────────
  { name:'Buethe Barracuda',                      type:'piston', tas:200,  pax:2,   range:800,   initK:70,     fixK:8,     varH:40,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Bautek ────────────────────────────────────────────────────────
  { name:'Bautek Eagle V',                        type:'piston', tas:55,   pax:2,   range:220,   initK:35,     fixK:4,     varH:19,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'Bautek Skycruiser',                     type:'piston', tas:58,   pax:2,   range:240,   initK:42,     fixK:5,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },

  // ── Beagle ────────────────────────────────────────────────────────
  { name:'Beagle B.121 Pup 150',                  type:'piston', tas:105,  pax:2,   range:450,   initK:45,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Beagle B.206 Basset',                   type:'piston', tas:175,  pax:6,   range:1000,  initK:80,     fixK:18,    varH:90,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Beagle Classiques ─────────────────────────────────────────────
  { name:'Beagle A.109 Airedale',                 type:'piston', tas:120,  pax:4,   range:600,   initK:45,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Beagle A.61 Terrier',                   type:'piston', tas:95,   pax:3,   range:350,   initK:40,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Bearhawk ──────────────────────────────────────────────────────
  { name:'Bearhawk 4-Place',                      type:'piston', tas:130,  pax:4,   range:700,   initK:90,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Bearhawk Patrol',                       type:'piston', tas:125,  pax:2,   range:650,   initK:75,     fixK:7,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Bearhawk Divers ───────────────────────────────────────────────
  { name:'Bearhawk Companion',                    type:'piston', tas:130,  pax:2,   range:700,   initK:85,     fixK:7,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Bearhawk LSA',                          type:'piston', tas:105,  pax:2,   range:500,   initK:70,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Bede ──────────────────────────────────────────────────────────
  { name:'Bede BD-4',                             type:'piston', tas:150,  pax:4,   range:700,   initK:40,     fixK:6,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Bede BD-5B',                            type:'piston', tas:190,  pax:1,   range:400,   initK:30,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Bede BD-5J Microjet',                   type:'jet',    tas:280,  pax:1,   range:300,   initK:150,    fixK:20,    varH:220,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Beechcraft ────────────────────────────────────────────────────
  { name:'Beechcraft Baron 55',            type:'piston',tas:188, pax:5,  range:859, initK:85,    fixK:17,   varH:88,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron 56TC',          type:'piston',tas:210, pax:5,  range:942, initK:200,   fixK:24,   varH:112,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron 58',            type:'piston',tas:198, pax:5,  range:1052, initK:280,   fixK:25,   varH:110,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron 58P',                  type:'piston', tas:200,  pax:6,   range:1100,  initK:200,    fixK:30,    varH:140,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Beechcraft Baron 58P pressurized',type:'piston',tas:191,pax:5, range:870, initK:400,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron 58TC turbo',    type:'piston',tas:220, pax:5,  range:885, initK:350,   fixK:26,   varH:115,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron B55',           type:'piston',tas:190, pax:5,  range:808,  initK:95,    fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron E55',           type:'piston',tas:195, pax:5,  range:854, initK:180,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Baron G58',           type:'piston',tas:202, pax:6,  range:1328, initK:1200,  fixK:35,   varH:150,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Beechjet 400A',       type:'jet',  tas:448, pax:8,  range:1236, initK:1500,  fixK:120,  varH:780,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft Bonanza 35',          type:'piston',tas:160, pax:4,  range:580,  initK:50,    fixK:16,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza A35',         type:'piston',tas:162, pax:4,  range:598,  initK:52,    fixK:16,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza A36',                type:'piston', tas:172,  pax:6,   range:800,   initK:200,    fixK:15,    varH:68,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Beechcraft Bonanza A36TC',       type:'piston',tas:180, pax:6,  range:1065, initK:750,   fixK:24,   varH:115,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza B35',         type:'piston',tas:163, pax:4,  range:598,  initK:53,    fixK:16,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza B36TC',              type:'piston', tas:190,  pax:6,   range:900,   initK:280,    fixK:17,    varH:75,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Beechcraft Bonanza C35',         type:'piston',tas:165, pax:4,  range:616,  initK:55,    fixK:16,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza D35',         type:'piston',tas:166, pax:4,  range:616,  initK:56,    fixK:16,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza E35',         type:'piston',tas:167, pax:4,  range:625,  initK:57,    fixK:16,   varH:82,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza F33A',        type:'piston',tas:174, pax:4,  range:790,  initK:180,   fixK:18,   varH:92,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza F35',         type:'piston',tas:168, pax:4,  range:624,  initK:58,    fixK:16,   varH:82,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza G35',         type:'piston',tas:169, pax:4,  range:633,  initK:60,    fixK:17,   varH:83,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza G36',         type:'piston',tas:176, pax:6,  range:868, initK:680,   fixK:22,   varH:105,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza H35',         type:'piston',tas:170, pax:4,  range:632,  initK:62,    fixK:17,   varH:84,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza K35',         type:'piston',tas:172, pax:4,  range:651,  initK:64,    fixK:17,   varH:85,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza M35',         type:'piston',tas:173, pax:4,  range:660,  initK:66,    fixK:17,   varH:86,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza N35',         type:'piston',tas:174, pax:4,  range:670,  initK:68,    fixK:17,   varH:87,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza P35',         type:'piston',tas:175, pax:4,  range:679,  initK:70,    fixK:17,   varH:88,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza S35',         type:'piston',tas:176, pax:4,  range:688,  initK:75,    fixK:18,   varH:88,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza V35',         type:'piston',tas:178, pax:4,  range:696,  initK:80,    fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza V35A',        type:'piston',tas:179, pax:4,  range:706,  initK:85,    fixK:18,   varH:91,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Bonanza V35B',        type:'piston',tas:180, pax:4,  range:715,  initK:90,    fixK:18,   varH:92,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Debonair 33',         type:'piston',tas:170, pax:4,  range:722,  initK:70,    fixK:17,   varH:85,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Duchess 76',          type:'piston',tas:160, pax:3,  range:580,  initK:75,    fixK:14,   varH:72,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Duke B60',            type:'piston',tas:220, pax:5,  range:985, initK:220,   fixK:28,   varH:125,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air 100',        type:'turbo', tas:250, pax:8,  range:1205, initK:1200,  fixK:110,  varH:520,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air 200',        type:'turbo', tas:272, pax:9,  range:1414, initK:2000,  fixK:120,  varH:580,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air 250',        type:'turbo', tas:280, pax:9,  range:1580, initK:7400,  fixK:175,  varH:680,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air 300',        type:'turbo', tas:290, pax:9,  range:1655, initK:3500,  fixK:190,  varH:750,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air 350',               type:'turbo',  tas:312,  pax:11,  range:1806,  initK:2400,   fixK:105,   varH:420,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air 350ER',      type:'turbo', tas:312, pax:11, range:2344, initK:8200,  fixK:180,  varH:900,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air 350i',       type:'turbo', tas:310, pax:11, range:1651, initK:7200,  fixK:160,  varH:850,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air 360',               type:'turbo',  tas:312,  pax:11,  range:1806,  initK:4200,   fixK:115,   varH:440,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air 90',         type:'turbo', tas:240, pax:6,  range:1120, initK:900,   fixK:100,  varH:480,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air A100',       type:'turbo', tas:252, pax:8,  range:1224, initK:1300,  fixK:112,  varH:530,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air A90',        type:'turbo', tas:242, pax:6,  range:1139, initK:950,   fixK:102,  varH:490,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air B100',       type:'turbo', tas:255, pax:8,  range:1272, initK:1400,  fixK:115,  varH:540,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air B200',              type:'turbo',  tas:289,  pax:9,   range:1580,  initK:1400,   fixK:90,    varH:380,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air B200GT',            type:'turbo',  tas:303,  pax:9,   range:1730,  initK:2000,   fixK:95,    varH:390,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air B90',        type:'turbo', tas:244, pax:6,  range:1158, initK:1000,  fixK:104,  varH:500,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air C90A',              type:'turbo',  tas:247,  pax:7,   range:1000,  initK:700,    fixK:70,    varH:320,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air C90B',       type:'turbo', tas:222, pax:7,  range:859,  initK:1100,  fixK:80,   varH:420,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air C90GTi',            type:'turbo',  tas:270,  pax:7,   range:1200,  initK:1300,   fixK:78,    varH:340,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air C90GTx',     type:'turbo', tas:222, pax:6,  range:1009, initK:2800,  fixK:90,   varH:500,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air E90',        type:'turbo', tas:246, pax:6,  range:1177, initK:1050,  fixK:106,  varH:505,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft King Air F90',        type:'turbo', tas:260, pax:6,  range:1270, initK:1500,  fixK:120,  varH:560,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft Model 17 Staggerwing',       type:'piston', tas:175,  pax:4,   range:700,   initK:400,    fixK:20,    varH:95,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Beechcraft Model 18 Twin Beech',        type:'piston', tas:165,  pax:8,   range:800,   initK:220,    fixK:28,    varH:150,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:2 },
  { name:'Beechcraft Musketeer',                  type:'piston', tas:115,  pax:4,   range:600,   initK:40,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Beechcraft Musketeer A23',       type:'piston',tas:118, pax:4,  range:612,  initK:55,    fixK:11,   varH:60,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Beechcraft Premier 1A',          type:'jet',  tas:451, pax:6,  range:1134, initK:4000,  fixK:95,   varH:700,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft Queen Air 65',        type:'piston',tas:205, pax:9,  range:796,  initK:150,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Queen Air 80',        type:'piston',tas:210, pax:9,  range:822,  initK:165,   fixK:29,   varH:125,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Queen Air B80',       type:'piston',tas:215, pax:9,  range:839, initK:180,   fixK:30,   varH:130,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Sierra A24R',         type:'piston',tas:130, pax:4,  range:752,  initK:80,    fixK:13,   varH:68,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Beechcraft Sierra C24R',                type:'piston', tas:140,  pax:4,   range:700,   initK:70,     fixK:10,    varH:48,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Beechcraft Skipper 77',          type:'piston',tas:100, pax:2,  range:425,  initK:30,    fixK:8,    varH:42,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Beechcraft Sport 150',           type:'piston',tas:120, pax:4,  range:590,  initK:58,    fixK:11,   varH:58,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Beechcraft Staggerwing Model 17',type:'piston',tas:190, pax:4,  range:608,  initK:350,   fixK:30,   varH:130,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Beechcraft Starship 2000',       type:'turbo', tas:335, pax:8,  range:1332, initK:2500,  fixK:220,  varH:900,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Beechcraft Sundowner C23',       type:'piston',tas:120, pax:4,  range:710,  initK:65,    fixK:12,   varH:62,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Beechcraft T-34A Mentor',               type:'piston', tas:140,  pax:2,   range:690,   initK:180,    fixK:16,    varH:78,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Beechcraft T-34C Turbo Mentor',         type:'turbo',  tas:180,  pax:2,   range:708,   initK:450,    fixK:60,    varH:320,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Beechcraft Travel Air 95',       type:'piston',tas:175, pax:4,  range:769,  initK:70,    fixK:16,   varH:82,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Beechcraft Twin Bonanza D50',    type:'piston',tas:178, pax:5,  range:766,  initK:55,    fixK:15,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },

  // ── Beechcraft 1900 ───────────────────────────────────────────────
  { name:'Beechcraft 1900D',                      type:'turbo',  tas:280,  pax:19,  range:800,   initK:1800,   fixK:320,   varH:650,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Beechcraft AT-11 ──────────────────────────────────────────────
  { name:'Beechcraft AT-11 Kansan',               type:'piston', tas:165,  pax:6,   range:800,   initK:200,    fixK:27,    varH:145,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:2 },

  // ── Beechcraft Baron ──────────────────────────────────────────────
  { name:'Beechcraft Baron 58TC',                 type:'piston', tas:210,  pax:6,   range:1100,  initK:180,    fixK:30,    varH:138,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Beechcraft Baron A55',                  type:'piston', tas:180,  pax:5,   range:900,   initK:100,    fixK:21,    varH:102,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Beechcraft Baron C55',                  type:'piston', tas:185,  pax:5,   range:1000,  initK:120,    fixK:23,    varH:108,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Beechcraft Baron D55',                  type:'piston', tas:185,  pax:5,   range:1000,  initK:125,    fixK:23,    varH:108,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Beechcraft Bonanza ────────────────────────────────────────────
  { name:'Beechcraft Bonanza B36',                type:'piston', tas:170,  pax:6,   range:800,   initK:170,    fixK:15,    varH:66,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Beechcraft Bonanza E33A',               type:'piston', tas:168,  pax:4,   range:720,   initK:115,    fixK:13,    varH:59,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Beechcraft Bonanza F33C Aerobatic',     type:'piston', tas:168,  pax:4,   range:700,   initK:160,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Beechcraft Bonanza J35',                type:'piston', tas:170,  pax:4,   range:730,   initK:82,     fixK:13,    varH:58,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Beechcraft Debonair C33',               type:'piston', tas:165,  pax:4,   range:700,   initK:100,    fixK:13,    varH:58,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Beechcraft Debonair C33A',              type:'piston', tas:168,  pax:4,   range:720,   initK:110,    fixK:13,    varH:59,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Beechcraft Divers ─────────────────────────────────────────────
  { name:'Beechcraft A23 Musketeer II',           type:'piston', tas:120,  pax:4,   range:600,   initK:45,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Beechcraft B19 Sport 150',              type:'piston', tas:118,  pax:4,   range:570,   initK:44,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Beechcraft B200T Maritime',             type:'turbo',  tas:285,  pax:9,   range:1600,  initK:1300,   fixK:92,    varH:385,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft Duke A60',                   type:'piston', tas:215,  pax:6,   range:1050,  initK:160,    fixK:36,    varH:168,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Beechcraft Model 19 Sport',             type:'piston', tas:115,  pax:4,   range:550,   initK:38,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Beechcraft Model 23 Musketeer',         type:'piston', tas:118,  pax:4,   range:580,   initK:42,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Beechcraft Model 99 Airliner',          type:'turbo',  tas:245,  pax:15,  range:900,   initK:400,    fixK:90,    varH:380,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft Queen Air A65',              type:'piston', tas:175,  pax:9,   range:1250,  initK:95,     fixK:31,    varH:162,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Beechcraft King Air ───────────────────────────────────────────
  { name:'Beechcraft King Air 300LW',             type:'turbo',  tas:305,  pax:11,  range:1700,  initK:1500,   fixK:98,    varH:400,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air 350C',              type:'turbo',  tas:312,  pax:11,  range:1806,  initK:2600,   fixK:108,   varH:425,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air B200C',             type:'turbo',  tas:289,  pax:9,   range:1580,  initK:1500,   fixK:92,    varH:385,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air C90',               type:'turbo',  tas:247,  pax:7,   range:1000,  initK:500,    fixK:68,    varH:315,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Beechcraft King Air C90GT',             type:'turbo',  tas:270,  pax:7,   range:1200,  initK:1100,   fixK:76,    varH:335,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Bell ──────────────────────────────────────────────────────────
  { name:'Bell P-63 Kingcobra',                   type:'piston', tas:210,  pax:1,   range:600,   initK:1800,   fixK:120,   varH:880,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Bell Airacobra ────────────────────────────────────────────────
  { name:'Bell P-39 Airacobra',                   type:'piston', tas:200,  pax:1,   range:500,   initK:1800,   fixK:120,   varH:880,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Bell Divers ───────────────────────────────────────────────────
  { name:'Bell 206B-3 JetRanger III',             type:'turbo',  tas:115,  pax:5,   range:374,   initK:800,    fixK:62,    varH:405,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 407',                              type:'turbo',  tas:133,  pax:7,   range:330,   initK:1800,   fixK:100,   varH:660,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 47G-4A',                           type:'piston', tas:80,   pax:3,   range:220,   initK:195,    fixK:22,    varH:173,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Bell Helicopter ───────────────────────────────────────────────
  { name:'Bell 204B',                             type:'turbo',  tas:105,  pax:10,  range:250,   initK:600,    fixK:160,   varH:1200,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 205A-1',                           type:'turbo',  tas:110,  pax:14,  range:300,   initK:900,    fixK:190,   varH:1450,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 206A JetRanger',                   type:'turbo',  tas:110,  pax:5,   range:340,   initK:400,    fixK:55,    varH:380,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 206B JetRanger III',               type:'turbo',  tas:115,  pax:5,   range:374,   initK:700,    fixK:60,    varH:400,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 206L-1 LongRanger II',             type:'turbo',  tas:110,  pax:7,   range:350,   initK:700,    fixK:68,    varH:460,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 206L-3 LongRanger III',            type:'turbo',  tas:110,  pax:7,   range:360,   initK:900,    fixK:70,    varH:480,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 206L-4 LongRanger',                type:'turbo',  tas:110,  pax:7,   range:370,   initK:1200,   fixK:75,    varH:500,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 212',                              type:'turbo',  tas:100,  pax:14,  range:237,   initK:1500,   fixK:200,   varH:1600,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Bell 214B BigLifter',                   type:'turbo',  tas:130,  pax:16,  range:250,   initK:1800,   fixK:260,   varH:2100,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 222B',                             type:'turbo',  tas:130,  pax:8,   range:350,   initK:800,    fixK:170,   varH:1100,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Bell 230',                              type:'turbo',  tas:140,  pax:8,   range:400,   initK:1000,   fixK:180,   varH:1150,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Bell 407GXi',                           type:'turbo',  tas:133,  pax:7,   range:337,   initK:3500,   fixK:110,   varH:700,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 407GXP',                           type:'turbo',  tas:133,  pax:7,   range:337,   initK:3000,   fixK:108,   varH:690,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 412EPI',                           type:'turbo',  tas:122,  pax:14,  range:402,   initK:6000,   fixK:280,   varH:1900,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Bell 427',                              type:'turbo',  tas:140,  pax:7,   range:394,   initK:1800,   fixK:170,   varH:1000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Bell 429',                              type:'turbo',  tas:150,  pax:8,   range:411,   initK:7500,   fixK:220,   varH:1200,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Bell 430',                              type:'turbo',  tas:140,  pax:9,   range:350,   initK:2200,   fixK:200,   varH:1300,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Bell 47G',                              type:'piston', tas:73,   pax:3,   range:214,   initK:180,    fixK:22,    varH:170,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 47G-2',                            type:'piston', tas:73,   pax:3,   range:200,   initK:150,    fixK:21,    varH:165,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 47G-3B',                           type:'piston', tas:80,   pax:3,   range:214,   initK:190,    fixK:22,    varH:172,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 47G-5',                            type:'piston', tas:80,   pax:3,   range:220,   initK:200,    fixK:22,    varH:175,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 47J Ranger',                       type:'piston', tas:85,   pax:4,   range:250,   initK:220,    fixK:24,    varH:185,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 505 Jet Ranger X',                 type:'turbo',  tas:125,  pax:5,   range:340,   initK:1600,   fixK:70,    varH:450,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Bell 525 Relentless',                   type:'turbo',  tas:160,  pax:20,  range:580,   initK:18000,  fixK:500,   varH:2800,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Bell UH-1H Huey',                       type:'turbo',  tas:110,  pax:14,  range:275,   initK:800,    fixK:180,   varH:1400,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Bellanca ──────────────────────────────────────────────────────
  { name:'Bellanca 14-19 Cruisemaster',           type:'piston', tas:160,  pax:4,   range:700,   initK:60,     fixK:12,    varH:52,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Bellanca 17-30 Super Viking',           type:'piston', tas:175,  pax:4,   range:800,   initK:75,     fixK:13,    varH:58,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Bellanca 17-31 Turbo Viking',           type:'piston', tas:190,  pax:4,   range:850,   initK:85,     fixK:14,    varH:64,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Bellanca 7ECA Citabria',                type:'piston', tas:105,  pax:2,   range:450,   initK:45,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Bellanca 8KCAB Decathlon',              type:'piston', tas:115,  pax:2,   range:480,   initK:75,     fixK:9,     varH:45,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Bellanca Citabria',          type:'piston',tas:105, pax:2,  range:321,  initK:30,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Bellanca Cruisair',          type:'piston',tas:140, pax:4,  range:595,  initK:40,    fixK:10,   varH:52,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Bellanca Decathlon',         type:'piston',tas:128, pax:2,  range:354,  initK:45,    fixK:9,    varH:42,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Bellanca Super Viking 300',  type:'piston',tas:175, pax:4,  range:849,  initK:75,    fixK:14,   varH:70,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Bellanca Viking 300',        type:'piston',tas:170, pax:4,  range:822,  initK:65,    fixK:13,   varH:68,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Bellanca Divers ───────────────────────────────────────────────
  { name:'Bellanca 14-13 Cruisair',               type:'piston', tas:140,  pax:4,   range:600,   initK:45,     fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Bellanca 17-30A Viking 300A',           type:'piston', tas:180,  pax:4,   range:850,   initK:80,     fixK:13,    varH:60,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Bellanca 7GCBC Scout',                  type:'piston', tas:110,  pax:2,   range:550,   initK:65,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Bensen ────────────────────────────────────────────────────────
  { name:'Bensen B-8M Gyrocopter',                type:'piston', tas:60,   pax:1,   range:100,   initK:15,     fixK:3,     varH:15,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Beriev ────────────────────────────────────────────────────────
  { name:'Beriev Be-103',                         type:'piston', tas:130,  pax:5,   range:800,   initK:450,    fixK:25,    varH:120,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Beriev Be-200',                         type:'jet',    tas:380,  pax:8,   range:1600,  initK:25000,  fixK:500,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Best Off ──────────────────────────────────────────────────────
  { name:'Best Off Nynja',                        type:'piston', tas:90,   pax:2,   range:430,   initK:55,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Best Off Skyranger',                    type:'piston', tas:85,   pax:2,   range:400,   initK:40,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Best Off SkyRanger ────────────────────────────────────────────
  { name:'Best Off SkyRanger Swift',              type:'piston', tas:90,   pax:2,   range:420,   initK:55,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Binder ────────────────────────────────────────────────────────
  { name:'Binder EB28 Edition',                   type:'piston', tas:95,   pax:1,   range:450,   initK:250,    fixK:11,    varH:31,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Binder EB29',                           type:'piston', tas:95,   pax:1,   range:460,   initK:280,    fixK:11,    varH:32,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Blackshape ────────────────────────────────────────────────────
  { name:'Blackshape Gabriel BS115',              type:'piston', tas:140,  pax:2,   range:700,   initK:280,    fixK:9,     varH:36,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Blackshape Prime BS100',                type:'piston', tas:155,  pax:2,   range:750,   initK:300,    fixK:9,     varH:38,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Blackwing ─────────────────────────────────────────────────────
  { name:'Blackwing BW600 RG',                    type:'piston', tas:165,  pax:2,   range:800,   initK:250,    fixK:9,     varH:34,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Boeing ────────────────────────────────────────────────────────
  { name:'Boeing 717-200',                        type:'jet',    tas:438,  pax:106, range:2060,  initK:4000,   fixK:800,   varH:2800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 737 MAX 8',                      type:'jet',    tas:453,  pax:162, range:3550,  initK:52000,  fixK:1100,  varH:2550,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 737 MAX 9',                      type:'jet',    tas:453,  pax:178, range:3550,  initK:58000,  fixK:1150,  varH:2600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 737-300',                        type:'jet',    tas:430,  pax:140, range:2270,  initK:2000,   fixK:700,   varH:2700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 737-400',                        type:'jet',    tas:430,  pax:159, range:2160,  initK:2200,   fixK:750,   varH:2800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 737-500',                        type:'jet',    tas:430,  pax:122, range:2375,  initK:1800,   fixK:700,   varH:2650,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 737-600',                        type:'jet',    tas:450,  pax:110, range:3235,  initK:3000,   fixK:750,   varH:2700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 737-700',                        type:'jet',    tas:450,  pax:126, range:3010,  initK:8000,   fixK:850,   varH:2750,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 737-800',                        type:'jet',    tas:450,  pax:162, range:2935,  initK:12000,  fixK:900,   varH:2850,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 737-900ER',                      type:'jet',    tas:450,  pax:180, range:2950,  initK:14000,  fixK:950,   varH:2900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 747-400',                        type:'jet',    tas:490,  pax:416, range:7260,  initK:8000,   fixK:4000,  varH:12000, rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Boeing 747-8I',                         type:'jet',    tas:495,  pax:410, range:7730,  initK:60000,  fixK:4500,  varH:13000, rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Boeing 757-200',                        type:'jet',    tas:458,  pax:200, range:3915,  initK:6000,   fixK:1100,  varH:3800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 757-300',                        type:'jet',    tas:458,  pax:243, range:3400,  initK:7000,   fixK:1200,  varH:4000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 767-300ER',                      type:'jet',    tas:470,  pax:218, range:5980,  initK:8000,   fixK:1600,  varH:4800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 767-400ER',                      type:'jet',    tas:470,  pax:245, range:5625,  initK:12000,  fixK:1700,  varH:5000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 777-200ER',                      type:'jet',    tas:490,  pax:313, range:7065,  initK:15000,  fixK:2500,  varH:7000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 777-300ER',                      type:'jet',    tas:490,  pax:396, range:7370,  initK:40000,  fixK:2900,  varH:7800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 777-9',                          type:'jet',    tas:495,  pax:426, range:7285,  initK:180000, fixK:3200,  varH:7000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 787-10 Dreamliner',              type:'jet',    tas:488,  pax:336, range:6430,  initK:140000, fixK:2500,  varH:5500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 787-8 Dreamliner',               type:'jet',    tas:488,  pax:248, range:7355,  initK:90000,  fixK:2200,  varH:5000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing 787-9 Dreamliner',               type:'jet',    tas:488,  pax:296, range:7635,  initK:120000, fixK:2400,  varH:5300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Boeing Stearman N2S-3',                 type:'piston', tas:95,   pax:2,   range:400,   initK:170,    fixK:14,    varH:68,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Boeing Stearman PT-17 Kaydet',          type:'piston', tas:95,   pax:2,   range:400,   initK:180,    fixK:14,    varH:70,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Boeing Classiques ─────────────────────────────────────────────
  { name:'Boeing 707-320B',                       type:'jet',    tas:480,  pax:189, range:5000,  initK:400,    fixK:700,   varH:4200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Boeing 720B',                           type:'jet',    tas:480,  pax:149, range:3600,  initK:250,    fixK:620,   varH:3800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Boeing 727-100',                        type:'jet',    tas:470,  pax:106, range:2200,  initK:300,    fixK:500,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'Boeing 727-200 Advanced',               type:'jet',    tas:470,  pax:155, range:2400,  initK:500,    fixK:550,   varH:3200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },

  // ── Boeing Fortress ───────────────────────────────────────────────
  { name:'Boeing B-17G Flying Fortress',          type:'piston', tas:150,  pax:10,  range:1700,  initK:6000,   fixK:400,   varH:2800,  rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:4 },

  // ── Boeing Helicopter ─────────────────────────────────────────────
  { name:'Boeing CH-47D Chinook',                 type:'turbo',  tas:160,  pax:33,  range:400,   initK:15000,  fixK:700,   varH:5000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Boeing Vertol 107-II',                  type:'turbo',  tas:140,  pax:25,  range:300,   initK:2000,   fixK:400,   varH:2800,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Boisavia ──────────────────────────────────────────────────────
  { name:'Boisavia B.60 Mercurey',                type:'piston', tas:105,  pax:4,   range:450,   initK:40,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Bolkow ────────────────────────────────────────────────────────
  { name:'Bolkow Bo 208 Junior',                  type:'piston', tas:110,  pax:2,   range:480,   initK:40,     fixK:7,     varH:33,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Bolkow Bo 209 Monsun',                  type:'piston', tas:125,  pax:2,   range:540,   initK:60,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Bombardier ────────────────────────────────────────────────────
  { name:'Bombardier Challenger 300',  type:'jet',  tas:470, pax:9,  range:2865, initK:14000, fixK:300,  varH:1600, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Challenger 350',  type:'jet',  tas:470, pax:10, range:2965, initK:28000, fixK:500,  varH:2500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Challenger 604',  type:'jet',  tas:466, pax:12, range:3767, initK:9500,  fixK:400,  varH:2000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Challenger 605',  type:'jet',  tas:470, pax:12, range:3765, initK:22000, fixK:420,  varH:2100, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Challenger 650',  type:'jet',  tas:470, pax:12, range:3765, initK:26000, fixK:440,  varH:2150, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Challenger 850',  type:'jet',  tas:459, pax:14, range:2670, initK:16000, fixK:340,  varH:1750, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier CRJ-100',                    type:'jet',    tas:424,  pax:50,  range:1650,  initK:1200,   fixK:500,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Bombardier CRJ-1000',                   type:'jet',    tas:447,  pax:104, range:1620,  initK:10000,  fixK:750,   varH:2050,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Bombardier CRJ-200',                    type:'jet',    tas:424,  pax:50,  range:1700,  initK:1500,   fixK:520,   varH:1520,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Bombardier CRJ-700',                    type:'jet',    tas:447,  pax:70,  range:1650,  initK:5000,   fixK:650,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Bombardier CRJ-900',                    type:'jet',    tas:447,  pax:90,  range:1550,  initK:8000,   fixK:700,   varH:1950,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Bombardier Global 5000',     type:'jet',  tas:482, pax:14, range:4959, initK:32000, fixK:650,  varH:3400, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Global 5500',     type:'jet',  tas:488, pax:16, range:5656, initK:52000, fixK:900,  varH:4500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Global 6000',     type:'jet',  tas:488, pax:17, range:5756, initK:38000, fixK:750,  varH:3900, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Global 6500',     type:'jet',  tas:488, pax:17, range:6356, initK:58000, fixK:1000, varH:5000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Global 7500',     type:'jet',  tas:488, pax:19, range:7456, initK:78000, fixK:1300, varH:6500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Bombardier Global Express',  type:'jet',  tas:482, pax:14, range:5959, initK:26000, fixK:600,  varH:3200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Bowers ────────────────────────────────────────────────────────
  { name:'Bowers Fly Baby',                       type:'piston', tas:95,   pax:1,   range:320,   initK:22,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Brantly ───────────────────────────────────────────────────────
  { name:'Brantly B-2B',                          type:'piston', tas:90,   pax:2,   range:220,   initK:150,    fixK:22,    varH:170,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Brantly Hynes ─────────────────────────────────────────────────
  { name:'Brantly 305',                           type:'piston', tas:95,   pax:5,   range:220,   initK:200,    fixK:26,    varH:190,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Brditschka ────────────────────────────────────────────────────
  { name:'Brditschka HB-21',                      type:'piston', tas:90,   pax:2,   range:380,   initK:45,     fixK:6,     varH:24,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Brditschka HB-23 Hobbyliner',           type:'piston', tas:95,   pax:2,   range:400,   initK:50,     fixK:6,     varH:25,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Breezer ───────────────────────────────────────────────────────
  { name:'Breezer B600',                          type:'piston', tas:115,  pax:2,   range:600,   initK:110,    fixK:6,     varH:29,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Bristell ──────────────────────────────────────────────────────
  { name:'Bristell B23',                          type:'piston', tas:125,  pax:2,   range:750,   initK:250,    fixK:8,     varH:35,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Bristell B8 Turbo',                     type:'piston', tas:130,  pax:2,   range:750,   initK:180,    fixK:7,     varH:31,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Bristell LSA',                          type:'piston', tas:120,  pax:2,   range:700,   initK:140,    fixK:6,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Bristell NG5 Speed Wing',               type:'piston', tas:120,  pax:2,   range:700,   initK:150,    fixK:6,     varH:30,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Bristol ───────────────────────────────────────────────────────
  { name:'Bristol F.2B Fighter replica',          type:'piston', tas:100,  pax:2,   range:250,   initK:160,    fixK:12,    varH:58,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Bristol Freighter Mk.31',               type:'piston', tas:145,  pax:20,  range:700,   initK:250,    fixK:45,    varH:260,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },

  // ── Britten ───────────────────────────────────────────────────────
  { name:'Britten Norman Defender',    type:'piston',tas:150, pax:9,  range:788,  initK:450,   fixK:37,   varH:135,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Britten Norman Islander BN-2',type:'piston',tas:140,pax:9,  range:695,  initK:400,   fixK:35,   varH:130,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Britten Norman Trislander',  type:'piston',tas:140, pax:17, range:675,  initK:600,   fixK:45,   varH:160,  rating:true,  fuel:'AvGas',  gear:'tricycle',    engines:3 },
  { name:'Britten-Norman BN-2A Trislander',       type:'piston', tas:150,  pax:17,  range:800,   initK:200,    fixK:32,    varH:165,   rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:3 },
  { name:'Britten-Norman BN-2B Islander',         type:'piston', tas:145,  pax:9,   range:750,   initK:350,    fixK:28,    varH:140,   rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:2 },
  { name:'Britten-Norman BN-2T Turbine Islander', type:'turbo',  tas:170,  pax:9,   range:800,   initK:900,    fixK:60,    varH:260,   rating:false,  fuel:'Jet-A',  gear:'tricycle',     engines:2 },

  // ── Brugger ───────────────────────────────────────────────────────
  { name:'Brugger MB-2 Colibri',                  type:'piston', tas:95,   pax:1,   range:350,   initK:25,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Bucker ────────────────────────────────────────────────────────
  { name:'Bucker Bu 131 Jungmann',                type:'piston', tas:85,   pax:2,   range:340,   initK:130,    fixK:10,    varH:46,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Bucker Bu 133 Jungmeister',             type:'piston', tas:95,  pax:1,   range:270,   initK:260,    fixK:13,    varH:70,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Bucker Bu 181 Bestmann',                type:'piston', tas:110,  pax:2,   range:500,   initK:150,    fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── BushCat ───────────────────────────────────────────────────────
  { name:'BushCat LSA',                           type:'piston', tas:95,   pax:2,   range:480,   initK:75,     fixK:6,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Canadair ──────────────────────────────────────────────────────
  { name:'Canadair CL-13 Sabre Mk.5',             type:'jet',    tas:450,  pax:1,   range:900,   initK:1200,   fixK:180,   varH:2500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Canadair CL-215',                       type:'piston', tas:150,  pax:2,   range:1200,  initK:1500,   fixK:120,   varH:750,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Canadair CL-215T',                      type:'turbo',  tas:180,  pax:2,   range:1300,  initK:3000,   fixK:150,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Canadair CL-415',                       type:'turbo',  tas:180,  pax:2,   range:1300,  initK:8000,   fixK:180,   varH:1100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Canadair CT-133 Silver Star',           type:'jet',    tas:400,  pax:2,   range:1000,  initK:350,    fixK:100,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── CAP ───────────────────────────────────────────────────────────
  { name:'CAP 10B',                               type:'piston', tas:130,  pax:2,   range:620,   initK:90,     fixK:9,     varH:45,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'CAP 10C',                               type:'piston', tas:132,  pax:2,   range:620,   initK:185,    fixK:10,    varH:48,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'CAP 20',                                type:'piston', tas:135,  pax:1,   range:400,   initK:70,     fixK:9,     varH:50,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'CAP 21',                                type:'piston', tas:140,  pax:1,   range:350,   initK:85,     fixK:10,    varH:52,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'CAP 231',                               type:'piston', tas:150,  pax:1,   range:400,   initK:110,    fixK:11,    varH:58,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'CAP 231EX',                             type:'piston', tas:155,  pax:1,   range:380,   initK:145,    fixK:12,    varH:62,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'CAP 232',                               type:'piston', tas:160,  pax:1,   range:430,   initK:185,    fixK:13,    varH:68,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Caproni ───────────────────────────────────────────────────────
  { name:'Caproni Calif A-21SJ',                  type:'jet',    tas:120,  pax:2,   range:350,   initK:80,     fixK:9,     varH:45,    rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── CASA ──────────────────────────────────────────────────────────
  { name:'CASA C-1.131E Jungmann',                type:'piston', tas:85,   pax:2,   range:340,   initK:120,    fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'CASA C-212-400',                        type:'turbo',  tas:200,  pax:26,  range:900,   initK:1000,   fixK:300,   varH:620,   rating:true,   fuel:'Jet-A',  gear:'tricycle',     engines:2 },
  { name:'CASA C-295',                            type:'turbo',  tas:260,  pax:71,  range:2500,  initK:12000,  fixK:450,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'CASA CN-235',                           type:'turbo',  tas:245,  pax:44,  range:2100,  initK:3000,   fixK:350,   varH:1100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── CASA Aviojet ──────────────────────────────────────────────────
  { name:'CASA C-101 Aviojet',                    type:'jet',    tas:350,  pax:2,   range:800,   initK:500,    fixK:120,   varH:1700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Cassutt ───────────────────────────────────────────────────────
  { name:'Cassutt Special IIIM',                  type:'piston', tas:200,  pax:1,   range:250,   initK:35,     fixK:5,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Celier ────────────────────────────────────────────────────────
  { name:'Celier Xenon 2',                        type:'piston', tas:90,   pax:2,   range:350,   initK:85,     fixK:7,     varH:31,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Celier Xenon 4',                        type:'piston', tas:95,   pax:2,   range:380,   initK:100,    fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Cessna ────────────────────────────────────────────────────────
  { name:'Cessna 120',                 type:'piston',tas:95,  pax:2,  range:309,  initK:28,    fixK:6,    varH:30,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Cessna 140',                 type:'piston',tas:100, pax:2,  range:345,  initK:32,    fixK:6,    varH:32,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Cessna 150',                 type:'piston',tas:90,  pax:2,  range:332,  initK:30,    fixK:7,    varH:32,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 152',                 type:'piston',tas:100, pax:2,  range:340,  initK:55,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 162 Skycatcher',      type:'piston',tas:112, pax:2,  range:386,  initK:110,   fixK:9,    varH:40,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 170',                 type:'piston',tas:110, pax:4,  range:418,  initK:45,    fixK:9,    varH:48,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Cessna 172N Skyhawk',        type:'piston',tas:120, pax:4,  range:530,  initK:110,   fixK:15,   varH:68,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 172R Skyhawk',        type:'piston',tas:122, pax:4,  range:538,  initK:250,   fixK:16,   varH:70,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 172S Skyhawk',        type:'piston',tas:122, pax:4,  range:548,  initK:390,   fixK:16,   varH:72,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 172SP',               type:'piston',tas:122, pax:4,  range:548,  initK:200,   fixK:14,   varH:65,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 175 Skylark',         type:'piston',tas:118, pax:4,  range:512,  initK:60,    fixK:11,   varH:58,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 177 Cardinal',        type:'piston',tas:128, pax:4,  range:704,  initK:75,    fixK:13,   varH:65,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 177RG Cardinal',      type:'piston',tas:145, pax:4,  range:741,  initK:90,    fixK:14,   varH:70,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Cessna 180 Skywagon',        type:'piston',tas:148, pax:6,  range:809,  initK:150,   fixK:16,   varH:78,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Cessna 182 RG Skylane',      type:'piston',tas:148, pax:4,  range:889, initK:95,    fixK:16,   varH:82,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Cessna 182Q Skylane',        type:'piston',tas:143, pax:4,  range:793,  initK:110,   fixK:16,   varH:80,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 182T Skylane',        type:'piston',tas:145, pax:4,  range:806,  initK:430,   fixK:18,   varH:85,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 185 Skywagon',        type:'piston',tas:150, pax:6,  range:838,  initK:220,   fixK:19,   varH:90,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Cessna 188 AgTruck',         type:'piston',tas:110, pax:1,  range:318,  initK:65,    fixK:14,   varH:70,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Cessna 188 AgWagon',                    type:'piston', tas:100,  pax:1,   range:300,   initK:60,     fixK:15,    varH:80,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 195 Businessliner',   type:'piston',tas:150, pax:5,  range:638,  initK:180,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Cessna 205 Super Skylane',   type:'piston',tas:145, pax:6,  range:991, initK:70,    fixK:14,   varH:72,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 206H Stationair',     type:'piston',tas:145, pax:6,  range:591,  initK:480,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 207 Skywagon',        type:'piston',tas:150, pax:8,  range:668,  initK:150,   fixK:22,   varH:98,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna 210 Centurion',       type:'piston',tas:168, pax:6,  range:974, initK:140,   fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Cessna 303 Crusader',        type:'piston',tas:200, pax:6,  range:900, initK:230,   fixK:26,   varH:112,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 310R',                type:'piston',tas:195, pax:5,  range:854, initK:150,   fixK:22,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 320 Skyknight',       type:'piston',tas:200, pax:5,  range:850, initK:130,   fixK:22,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 335',                 type:'piston',tas:210, pax:6,  range:992, initK:220,   fixK:26,   varH:115,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 336 Skymaster',       type:'piston',tas:160, pax:5,  range:660,  initK:65,    fixK:15,   varH:75,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Cessna 337 Skymaster',       type:'piston',tas:167, pax:5,  range:714,  initK:80,    fixK:16,   varH:78,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 340A',                type:'piston',tas:200, pax:5,  range:950, initK:200,   fixK:25,   varH:110,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 401',                 type:'piston',tas:200, pax:8,  range:950, initK:180,   fixK:27,   varH:118,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 402C Businessliner',  type:'piston',tas:185, pax:9,  range:961, initK:250,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 404 Titan',           type:'piston',tas:210, pax:10, range:1042, initK:320,   fixK:32,   varH:135,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 411',                 type:'piston',tas:215, pax:7,  range:1089, initK:200,   fixK:29,   varH:125,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 414A Chancellor',     type:'piston',tas:200, pax:6,  range:950, initK:280,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna 421C Golden Eagle',   type:'piston',tas:210, pax:6,  range:1042, initK:350,   fixK:30,   varH:130,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna Caravan 208',         type:'turbo', tas:158, pax:9,  range:771,  initK:2100,  fixK:64,   varH:370,  rating:false, fuel:'Jet-A',  gear:'tricycle',    engines:1 },
  { name:'Cessna Caravan 208 EX',      type:'turbo', tas:165, pax:9,  range:818,  initK:2200,  fixK:65,   varH:380,  rating:false, fuel:'Jet-A',  gear:'tricycle',    engines:1 },
  { name:'Cessna Caravan 208B',        type:'turbo', tas:160, pax:14, range:820,  initK:2600,  fixK:70,   varH:420,  rating:false, fuel:'Jet-A',  gear:'tricycle',    engines:1 },
  { name:'Cessna Citation CJ1',        type:'jet',  tas:389, pax:6,  range:1306, initK:2600,  fixK:100,  varH:650,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Citation CJ2',        type:'jet',  tas:407, pax:7,  range:1409, initK:3800,  fixK:120,  varH:720,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Citation CJ2+',       type:'jet',  tas:413, pax:7,  range:1594, initK:5200,  fixK:140,  varH:780,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Citation CJ4',        type:'jet',  tas:451, pax:9,  range:1939, initK:9500,  fixK:190,  varH:980,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Citation Excel',      type:'jet',  tas:441, pax:9,  range:1680, initK:6500,  fixK:200,  varH:1000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Citation III',        type:'jet',  tas:460, pax:9,  range:2270, initK:2200,  fixK:220,  varH:1150, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Citation M2 Gen2',    type:'jet',   tas:400, pax:7,  range:1350, initK:5200,  fixK:130,  varH:850,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Citation S/II',                  type:'jet',    tas:400,  pax:8,   range:1900,  initK:700,    fixK:150,   varH:1300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna Citation Ultra',      type:'jet',  tas:432, pax:8,  range:1684, initK:2600,  fixK:135,  varH:800,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Citation V',                     type:'jet',    tas:420,  pax:8,   range:1800,  initK:900,    fixK:170,   varH:1400,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna Citation VI',                    type:'jet',    tas:440,  pax:9,   range:2400,  initK:1100,   fixK:200,   varH:1700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna Citation VII',        type:'jet',  tas:465, pax:9,  range:2588, initK:3200,  fixK:260,  varH:1300, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Conquest I 425',      type:'turbo', tas:261, pax:6,  range:970, initK:900,   fixK:75,   varH:410,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Conquest II 441',     type:'turbo', tas:293, pax:9,  range:1194, initK:1100,  fixK:85,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Cessna Grand Caravan EX',    type:'turbo', tas:175, pax:14, range:982, initK:2500,  fixK:68,   varH:390,  rating:false, fuel:'Jet-A',  gear:'tricycle',    engines:1 },
  { name:'Cessna T206H Turbo Stationair',type:'piston',tas:165,pax:6, range:676,  initK:560,   fixK:22,   varH:105,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cessna T210 Turbo Centurion',type:'piston',tas:185, pax:6,  range:1061, initK:170,   fixK:20,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Cessna T337G Pressurized Skymaster',type:'piston',tas:183,pax:5,range:996,initK:160, fixK:20,  varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Cessna U206 Stationair',     type:'piston',tas:143, pax:6,  range:573,  initK:180,   fixK:19,   varH:92,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Cessna 150 ────────────────────────────────────────────────────
  { name:'Cessna 150A',                           type:'piston', tas:90,   pax:2,   range:380,   initK:24,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 150C',                           type:'piston', tas:90,   pax:2,   range:380,   initK:25,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 150E',                           type:'piston', tas:92,   pax:2,   range:390,   initK:26,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 150G',                           type:'piston', tas:92,   pax:2,   range:400,   initK:27,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 150H',                           type:'piston', tas:92,   pax:2,   range:400,   initK:28,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 150J',                           type:'piston', tas:94,   pax:2,   range:410,   initK:29,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 150K',                           type:'piston', tas:94,   pax:2,   range:410,   initK:30,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 152 Sparrowhawk',                type:'piston', tas:100,  pax:2,   range:420,   initK:48,     fixK:7,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna A150 Aerobat',                   type:'piston', tas:94,   pax:2,   range:380,   initK:38,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna A152 Aerobat',                   type:'piston', tas:98,   pax:2,   range:400,   initK:52,     fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Cessna 172 ────────────────────────────────────────────────────
  { name:'Cessna 172A',                           type:'piston', tas:98,   pax:4,   range:480,   initK:38,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172B',                           type:'piston', tas:98,   pax:4,   range:480,   initK:40,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172C',                           type:'piston', tas:100,  pax:4,   range:480,   initK:42,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172D',                           type:'piston', tas:100,  pax:4,   range:490,   initK:43,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172E',                           type:'piston', tas:100,  pax:4,   range:490,   initK:44,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172F',                           type:'piston', tas:100,  pax:4,   range:490,   initK:45,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172G',                           type:'piston', tas:102,  pax:4,   range:500,   initK:46,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172H',                           type:'piston', tas:102,  pax:4,   range:500,   initK:47,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172I',                           type:'piston', tas:105,  pax:4,   range:510,   initK:48,     fixK:9,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172K',                           type:'piston', tas:105,  pax:4,   range:510,   initK:50,     fixK:9,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172L',                           type:'piston', tas:105,  pax:4,   range:515,   initK:52,     fixK:9,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172Q Cutlass',                   type:'piston', tas:115,  pax:4,   range:600,   initK:68,     fixK:9,     varH:41,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172RG Cutlass',                  type:'piston', tas:130,  pax:4,   range:720,   initK:75,     fixK:11,    varH:46,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna R172K Hawk XP',                  type:'piston', tas:120,  pax:4,   range:600,   initK:85,     fixK:10,    varH:44,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Cessna 177 ────────────────────────────────────────────────────
  { name:'Cessna 177A Cardinal',                  type:'piston', tas:120,  pax:4,   range:580,   initK:65,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 177RG Cardinal II',              type:'piston', tas:145,  pax:4,   range:750,   initK:85,     fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Cessna 180 ────────────────────────────────────────────────────
  { name:'Cessna 180A Skywagon',                  type:'piston', tas:135,  pax:4,   range:650,   initK:130,    fixK:12,    varH:54,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 180C Skywagon',                  type:'piston', tas:135,  pax:4,   range:660,   initK:140,    fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 180H Skywagon',                  type:'piston', tas:138,  pax:4,   range:680,   initK:160,    fixK:13,    varH:56,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 180J Skywagon',                  type:'piston', tas:140,  pax:4,   range:690,   initK:170,    fixK:13,    varH:57,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Cessna 182 ────────────────────────────────────────────────────
  { name:'Cessna 182A Skylane',                   type:'piston', tas:120,  pax:4,   range:550,   initK:58,     fixK:10,    varH:44,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182C Skylane',                   type:'piston', tas:122,  pax:4,   range:560,   initK:62,     fixK:10,    varH:45,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182E Skylane',                   type:'piston', tas:125,  pax:4,   range:580,   initK:68,     fixK:10,    varH:45,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182G Skylane',                   type:'piston', tas:125,  pax:4,   range:590,   initK:72,     fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182J Skylane',                   type:'piston', tas:127,  pax:4,   range:600,   initK:76,     fixK:11,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182K Skylane',                   type:'piston', tas:127,  pax:4,   range:610,   initK:80,     fixK:11,    varH:47,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182L Skylane',                   type:'piston', tas:128,  pax:4,   range:620,   initK:84,     fixK:11,    varH:47,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182N Skylane',                   type:'piston', tas:128,  pax:4,   range:630,   initK:88,     fixK:11,    varH:47,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182R Skylane',                   type:'piston', tas:132,  pax:4,   range:680,   initK:120,    fixK:12,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182S Skylane',                   type:'piston', tas:140,  pax:4,   range:720,   initK:180,    fixK:13,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna R182 Skylane RG',                type:'piston', tas:150,  pax:4,   range:800,   initK:125,    fixK:13,    varH:54,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna T182T Turbo Skylane',            type:'piston', tas:158,  pax:4,   range:870,   initK:320,    fixK:16,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna TR182 Turbo Skylane RG',         type:'piston', tas:160,  pax:4,   range:850,   initK:145,    fixK:14,    varH:58,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Cessna 185 ────────────────────────────────────────────────────
  { name:'Cessna 185A Skywagon',                  type:'piston', tas:145,  pax:6,   range:700,   initK:170,    fixK:14,    varH:60,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 185E Skywagon',                  type:'piston', tas:148,  pax:6,   range:720,   initK:190,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna A185F Skywagon',                 type:'piston', tas:150,  pax:6,   range:740,   initK:220,    fixK:15,    varH:64,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Cessna 206 ────────────────────────────────────────────────────
  { name:'Cessna P206 Super Skylane',             type:'piston', tas:138,  pax:6,   range:640,   initK:120,    fixK:13,    varH:58,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna TU206G Turbo Stationair',        type:'piston', tas:155,  pax:6,   range:700,   initK:175,    fixK:16,    varH:68,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna U206F Stationair',               type:'piston', tas:140,  pax:6,   range:660,   initK:135,    fixK:14,    varH:60,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna U206G Stationair',               type:'piston', tas:142,  pax:6,   range:680,   initK:150,    fixK:14,    varH:61,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Cessna 207 ────────────────────────────────────────────────────
  { name:'Cessna T207A Turbo Skywagon',           type:'piston', tas:150,  pax:8,   range:700,   initK:130,    fixK:17,    varH:72,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Cessna 210 ────────────────────────────────────────────────────
  { name:'Cessna 210C Centurion',                 type:'piston', tas:160,  pax:6,   range:850,   initK:75,     fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna 210G Centurion',                 type:'piston', tas:162,  pax:6,   range:870,   initK:85,     fixK:14,    varH:63,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna 210J Centurion',                 type:'piston', tas:163,  pax:6,   range:880,   initK:92,     fixK:15,    varH:64,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna 210M Centurion',                 type:'piston', tas:168,  pax:6,   range:920,   initK:125,    fixK:15,    varH:66,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna 210R Centurion',                 type:'piston', tas:172,  pax:6,   range:960,   initK:180,    fixK:17,    varH:70,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna P210N Pressurized Centurion',    type:'piston', tas:190,  pax:6,   range:1000,  initK:200,    fixK:20,    varH:82,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Cessna Agricole ───────────────────────────────────────────────
  { name:'Cessna A188B AgHusky',                  type:'piston', tas:110,  pax:1,   range:340,   initK:80,     fixK:17,    varH:86,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna A188B AgTruck',                  type:'piston', tas:105,  pax:1,   range:320,   initK:70,     fixK:16,    varH:82,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Cessna Airmaster ──────────────────────────────────────────────
  { name:'Cessna C-165 Airmaster',                type:'piston', tas:145,  pax:4,   range:580,   initK:200,    fixK:15,    varH:65,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna C-34 Airmaster',                 type:'piston', tas:140,  pax:4,   range:550,   initK:180,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Cessna Bobcat ─────────────────────────────────────────────────
  { name:'Cessna T-50 Bobcat',                    type:'piston', tas:160,  pax:5,   range:750,   initK:180,    fixK:24,    varH:125,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Cessna Caravan ────────────────────────────────────────────────
  { name:'Cessna 208B Grand Caravan EX',          type:'turbo',  tas:185,  pax:13,  range:964,   initK:2600,   fixK:95,    varH:420,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },

  // ── Cessna Citation Classiques ────────────────────────────────────
  { name:'Cessna Citation 500',                   type:'jet',    tas:350,  pax:7,   range:1300,  initK:400,    fixK:130,   varH:1100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna Citation 501 SP',                type:'jet',    tas:350,  pax:7,   range:1400,  initK:450,    fixK:125,   varH:1050,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna Citation 550',                   type:'jet',    tas:385,  pax:8,   range:1600,  initK:600,    fixK:145,   varH:1250,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna Citation 551',                   type:'jet',    tas:385,  pax:8,   range:1600,  initK:550,    fixK:140,   varH:1200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna Citation 560',                   type:'jet',    tas:420,  pax:8,   range:1800,  initK:900,    fixK:165,   varH:1350,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna Citation 650 III',               type:'jet',    tas:460,  pax:9,   range:2400,  initK:900,    fixK:200,   varH:1650,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna Citation 650 VII',               type:'jet',    tas:470,  pax:9,   range:2500,  initK:1300,   fixK:210,   varH:1700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Cessna Classiques ─────────────────────────────────────────────
  { name:'Cessna 170A',                           type:'piston', tas:105,  pax:4,   range:500,   initK:58,     fixK:8,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 172D Skyhawk',                   type:'piston', tas:100,  pax:4,   range:490,   initK:44,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182M Skylane',                   type:'piston', tas:128,  pax:4,   range:625,   initK:86,     fixK:11,    varH:47,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 182Q Skylane II',                type:'piston', tas:130,  pax:4,   range:660,   initK:92,     fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 190',                            type:'piston', tas:145,  pax:5,   range:700,   initK:120,    fixK:14,    varH:68,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 210B Centurion',                 type:'piston', tas:160,  pax:6,   range:860,   initK:78,     fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna 210F Centurion',                 type:'piston', tas:162,  pax:6,   range:870,   initK:84,     fixK:14,    varH:63,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna 210K Centurion',                 type:'piston', tas:165,  pax:6,   range:900,   initK:98,     fixK:15,    varH:65,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna 305 Bird Dog',                   type:'piston', tas:100,  pax:2,   range:530,   initK:70,     fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 337G Super Skymaster',           type:'piston', tas:165,  pax:6,   range:950,   initK:95,     fixK:21,    varH:102,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Cessna 402A',                           type:'piston', tas:185,  pax:8,   range:1000,  initK:100,    fixK:28,    varH:135,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Cessna 421A',                           type:'piston', tas:195,  pax:7,   range:1150,  initK:100,    fixK:29,    varH:136,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Cessna T337G Turbo Skymaster',          type:'piston', tas:185,  pax:6,   range:1000,  initK:110,    fixK:23,    varH:112,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Cessna Piston ─────────────────────────────────────────────────
  { name:'Cessna 140A',                           type:'piston', tas:90,   pax:2,   range:450,   initK:35,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 150L',                           type:'piston', tas:95,   pax:2,   range:420,   initK:30,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 150M',                           type:'piston', tas:95,   pax:2,   range:420,   initK:32,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 152 II',                         type:'piston', tas:100,  pax:2,   range:415,   initK:45,     fixK:7,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 170B',                           type:'piston', tas:105,  pax:4,   range:500,   initK:60,     fixK:8,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 172M Skyhawk',                   type:'piston', tas:105,  pax:4,   range:520,   initK:55,     fixK:9,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 172P Skyhawk',                   type:'piston', tas:108,  pax:4,   range:580,   initK:70,     fixK:9,     varH:39,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 177B Cardinal',                  type:'piston', tas:125,  pax:4,   range:600,   initK:75,     fixK:10,    varH:44,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 180K Skywagon',                  type:'piston', tas:140,  pax:4,   range:700,   initK:180,    fixK:13,    varH:58,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cessna 182P Skylane',                   type:'piston', tas:130,  pax:4,   range:650,   initK:95,     fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 206 Stationair',                 type:'piston', tas:140,  pax:6,   range:700,   initK:160,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cessna 210L Centurion',                 type:'piston', tas:165,  pax:6,   range:900,   initK:110,    fixK:15,    varH:65,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna 210N Centurion II',              type:'piston', tas:170,  pax:6,   range:950,   initK:140,    fixK:16,    varH:68,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Cessna 402C',                           type:'piston', tas:190,  pax:9,   range:1100,  initK:140,    fixK:30,    varH:145,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Cessna 425 Conquest I',                 type:'turbo',  tas:265,  pax:8,   range:1500,  initK:550,    fixK:55,    varH:250,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna 441 Conquest II',                type:'turbo',  tas:290,  pax:9,   range:1800,  initK:750,    fixK:65,    varH:290,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Cessna T210N Turbo Centurion',          type:'piston', tas:190,  pax:6,   range:1000,  initK:170,    fixK:18,    varH:75,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Cessna Twin ───────────────────────────────────────────────────
  { name:'Cessna 310B',                           type:'piston', tas:175,  pax:5,   range:900,   initK:60,     fixK:20,    varH:100,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Cessna 310J',                           type:'piston', tas:178,  pax:6,   range:950,   initK:70,     fixK:21,    varH:103,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Cessna 310Q',                           type:'piston', tas:180,  pax:6,   range:1000,  initK:85,     fixK:21,    varH:105,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Cessna 402B',                           type:'piston', tas:188,  pax:8,   range:1050,  initK:110,    fixK:29,    varH:138,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Cessna 421B Golden Eagle',              type:'piston', tas:200,  pax:7,   range:1200,  initK:130,    fixK:30,    varH:140,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── CGS ───────────────────────────────────────────────────────────
  { name:'CGS Hawk Arrow II',                     type:'piston', tas:85,   pax:2,   range:320,   initK:32,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Champion ──────────────────────────────────────────────────────
  { name:'Champion 7EC Traveler',                 type:'piston', tas:95,   pax:2,   range:320,   initK:45,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Champion 7FC Tri-Traveler',             type:'piston', tas:95,   pax:2,   range:330,   initK:42,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Champion 7GC Sky-Trac',                 type:'piston', tas:100,  pax:2,   range:380,   initK:55,     fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Chrislea ──────────────────────────────────────────────────────
  { name:'Chrislea Super Ace',                    type:'piston', tas:105,  pax:4,   range:400,   initK:45,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Christavia ────────────────────────────────────────────────────
  { name:'Christavia Mk I',                       type:'piston', tas:95,   pax:2,   range:350,   initK:30,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Christen ──────────────────────────────────────────────────────
  { name:'Christen Eagle II',                     type:'piston', tas:135,  pax:2,   range:380,   initK:85,     fixK:10,    varH:50,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Cicare ────────────────────────────────────────────────────────
  { name:'Cicare CH-14',                          type:'piston', tas:90,   pax:2,   range:220,   initK:130,    fixK:13,    varH:90,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Cirrus ────────────────────────────────────────────────────────
  { name:'Cirrus SR20',                type:'piston',tas:155, pax:4,  range:684,  initK:380,   fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cirrus SR20 G2',                        type:'piston', tas:155,  pax:4,   range:700,   initK:160,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR20 G3',                        type:'piston', tas:155,  pax:4,   range:709,   initK:190,    fixK:14,    varH:63,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR20 G6',                        type:'piston', tas:155,  pax:4,   range:709,   initK:340,    fixK:16,    varH:68,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR20 G7',                        type:'piston', tas:155,  pax:4,   range:709,   initK:500,    fixK:17,    varH:70,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR22',                type:'piston',tas:180, pax:4,  range:815,  initK:480,   fixK:22,   varH:105,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cirrus SR22 G2',                        type:'piston', tas:180,  pax:4,   range:1000,  initK:220,    fixK:17,    varH:78,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR22 G3',                        type:'piston', tas:183,  pax:4,   range:1049,  initK:280,    fixK:18,    varH:80,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR22 G5',                        type:'piston', tas:183,  pax:4,   range:1169,  initK:400,    fixK:19,    varH:84,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR22 G6',                        type:'piston', tas:183,  pax:4,   range:1169,  initK:520,    fixK:20,    varH:86,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR22 G7',                        type:'piston', tas:183,  pax:4,   range:1169,  initK:750,    fixK:22,    varH:90,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR22 GTS',            type:'piston',tas:182, pax:4,  range:814,  initK:700,   fixK:26,   varH:112,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cirrus SR22T',               type:'piston',tas:183, pax:4,  range:863, initK:800,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cirrus SR22T G5',                       type:'piston', tas:213,  pax:4,   range:1021,  initK:480,    fixK:21,    varH:92,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus SR22T G6',            type:'piston',tas:187, pax:4,  range:909, initK:920,   fixK:29,   varH:122,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Cirrus SR22T G7',                       type:'piston', tas:213,  pax:4,   range:1021,  initK:850,    fixK:24,    varH:98,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cirrus Vision Jet SF50',     type:'jet',   tas:305, pax:5,  range:1048, initK:2800,  fixK:90,   varH:580,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Cirrus Vision Jet SF50 G2',  type:'jet',   tas:311, pax:5,  range:1119, initK:3100,  fixK:95,   varH:600,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Cirrus Vision Jet SF50 G2+',            type:'jet',    tas:311,  pax:5,   range:1275,  initK:2900,   fixK:190,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Citation ──────────────────────────────────────────────────────
  { name:'Citation Bravo',             type:'jet',  tas:430, pax:8,  range:1385, initK:3200,  fixK:130,  varH:780,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation CJ3+',              type:'jet',  tas:416, pax:7,  range:1832, initK:8200,  fixK:180,  varH:950,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Encore+',           type:'jet',  tas:441, pax:8,  range:1655, initK:5500,  fixK:150,  varH:850,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation I SP',              type:'jet',  tas:350, pax:7,  range:925, initK:800,   fixK:80,   varH:600,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation II',                type:'jet',  tas:374, pax:8,  range:1013, initK:1200,  fixK:100,  varH:680,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Latitude',          type:'jet',  tas:446, pax:9,  range:2477, initK:17500, fixK:280,  varH:1350, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Longitude',         type:'jet',  tas:476, pax:12, range:3262, initK:26500, fixK:420,  varH:2000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation M2 Gen2',           type:'jet',  tas:400, pax:7,  range:1350, initK:5200,  fixK:130,  varH:800,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Mustang',           type:'jet',  tas:391, pax:4,  range:954, initK:3000,  fixK:90,   varH:600,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation Sovereign+',        type:'jet',  tas:458, pax:9,  range:2618, initK:13500, fixK:250,  varH:1250, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation V Ultra',           type:'jet',  tas:430, pax:8,  range:1385, initK:2400,  fixK:120,  varH:750,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation X+',                type:'jet',  tas:527, pax:12, range:3196, initK:23000, fixK:380,  varH:1900, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Citation XLS+',              type:'jet',  tas:441, pax:9,  range:1880, initK:11500, fixK:220,  varH:1150, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Colomban ──────────────────────────────────────────────────────
  { name:'Colomban Cri-Cri MC-15',                type:'piston', tas:100,  pax:1,   range:250,   initK:25,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:2 },
  { name:'Colomban MC-100 Ban-bi',                type:'piston', tas:145,  pax:2,   range:700,   initK:55,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Colomban Luciole ──────────────────────────────────────────────
  { name:'Colomban MC-30 Luciole',                type:'piston', tas:110,  pax:1,   range:400,   initK:30,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Columbia ──────────────────────────────────────────────────────
  { name:'Columbia 300',               type:'piston',tas:190, pax:4,  range:908, initK:230,   fixK:17,   varH:88,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Columbia 350',               type:'piston',tas:185, pax:4,  range:861, initK:250,   fixK:18,   varH:90,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Columbia 400 / Cessna TTx',  type:'piston',tas:235, pax:4,  range:924, initK:320,   fixK:20,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Comco ─────────────────────────────────────────────────────────
  { name:'Comco Ikarus C22',                      type:'piston', tas:80,   pax:2,   range:350,   initK:30,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Comco Ikarus C42B',                     type:'piston', tas:95,   pax:2,   range:470,   initK:70,     fixK:5,     varH:24,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Comco Ikarus C42C',                     type:'piston', tas:100,  pax:2,   range:500,   initK:110,    fixK:6,     varH:26,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Comco Ikarus Fox-C22',                  type:'piston', tas:82,   pax:2,   range:360,   initK:32,     fixK:4,     varH:21,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Commander ─────────────────────────────────────────────────────
  { name:'Commander 1000 Jetprop',     type:'turbo', tas:300, pax:9,  range:1450, initK:700,   fixK:110,  varH:500,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Commander 112',              type:'piston',tas:150, pax:4,  range:588,  initK:65,    fixK:12,   varH:62,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Commander 114',              type:'piston',tas:160, pax:4,  range:660,  initK:75,    fixK:13,   varH:66,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Commander 690B Jetprop',     type:'turbo', tas:286, pax:8,  range:1257, initK:400,   fixK:90,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Commander 900',              type:'turbo', tas:295, pax:9,  range:1402, initK:600,   fixK:100,  varH:480,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Commander 980',              type:'turbo', tas:305, pax:9,  range:1498, initK:750,   fixK:105,  varH:495,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Comp Air ──────────────────────────────────────────────────────
  { name:'Comp Air 7',                            type:'turbo',  tas:160,  pax:6,   range:700,   initK:300,    fixK:40,    varH:180,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Comp Air 8',                            type:'turbo',  tas:175,  pax:8,   range:800,   initK:400,    fixK:45,    varH:200,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },

  // ── Consolidated ──────────────────────────────────────────────────
  { name:'Consolidated PBY-5A Catalina',          type:'piston', tas:95,  pax:10,  range:2500,  initK:1500,   fixK:90,    varH:500,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Convair ───────────────────────────────────────────────────────
  { name:'Convair 240',                           type:'piston', tas:240,  pax:40,  range:900,   initK:120,    fixK:60,    varH:400,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Convair 340',                           type:'piston', tas:250,  pax:44,  range:1000,  initK:140,    fixK:65,    varH:430,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Convair 440 Metropolitan',              type:'piston', tas:260,  pax:52,  range:1100,  initK:160,    fixK:70,    varH:450,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Convair 580',                           type:'turbo',  tas:300,  pax:56,  range:1200,  initK:300,    fixK:150,   varH:800,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Convair 640',                           type:'turbo',  tas:300,  pax:56,  range:1300,  initK:320,    fixK:155,   varH:820,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Convair 880',                           type:'jet',    tas:490,  pax:110, range:3000,  initK:200,    fixK:500,   varH:3500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Convair 990 Coronado',                  type:'jet',    tas:510,  pax:121, range:3500,  initK:250,    fixK:550,   varH:3800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── Corben ────────────────────────────────────────────────────────
  { name:'Corben Baby Ace',                       type:'piston', tas:85,   pax:1,   range:250,   initK:25,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Corben Junior Ace',                     type:'piston', tas:90,   pax:2,   range:280,   initK:30,     fixK:4,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Corby ─────────────────────────────────────────────────────────
  { name:'Corby CJ-1 Starlet',                    type:'piston', tas:105,  pax:1,   range:300,   initK:20,     fixK:3,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Corvus ────────────────────────────────────────────────────────
  { name:'Corvus Corone Mk II',                   type:'piston', tas:120,  pax:2,   range:620,   initK:75,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Corvus Fusion',                         type:'piston', tas:130,  pax:2,   range:700,   initK:95,     fixK:7,     varH:29,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Corvus Phantom',                        type:'piston', tas:125,  pax:2,   range:650,   initK:80,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Corvus Racer 540',                      type:'piston', tas:190,  pax:1,   range:400,   initK:200,    fixK:13,    varH:70,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Cosmos ────────────────────────────────────────────────────────
  { name:'Cosmos Bidulm 50',                      type:'piston', tas:48,   pax:2,   range:190,   initK:22,     fixK:3,     varH:17,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'Cosmos Phase II',                       type:'piston', tas:50,   pax:2,   range:200,   initK:25,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },

  // ── Cozy ──────────────────────────────────────────────────────────
  { name:'Cozy Mk IV',                            type:'piston', tas:180,  pax:4,   range:1000,  initK:80,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Croses ────────────────────────────────────────────────────────
  { name:'Croses EC-6 Criquet',                   type:'piston', tas:75,   pax:2,   range:250,   initK:20,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Cub Crafters ──────────────────────────────────────────────────
  { name:'Cub Crafters Carbon Cub FX-3',          type:'piston', tas:110,  pax:2,   range:500,   initK:320,    fixK:11,    varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cub Crafters Carbon Cub SS',            type:'piston', tas:105,  pax:2,   range:480,   initK:200,    fixK:10,    varH:36,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Cub Crafters NXCub',                    type:'piston', tas:130,  pax:2,   range:800,   initK:430,    fixK:13,    varH:45,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Cub Crafters XCub',                     type:'piston', tas:130,  pax:2,   range:800,   initK:400,    fixK:13,    varH:44,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── CubCrafters ───────────────────────────────────────────────────
  { name:'CubCrafters Carbon Cub EX-3',type:'piston',tas:117, pax:2,  range:412,  initK:160,   fixK:10,   varH:44,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'CubCrafters Carbon Cub SS',  type:'piston',tas:95,  pax:2,  range:379,  initK:190,   fixK:10,   varH:45,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'CubCrafters Sport Cub S2',   type:'piston',tas:100, pax:2,  range:345,  initK:150,   fixK:9,    varH:42,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'CubCrafters Top Cub CC18',   type:'piston',tas:110, pax:2,  range:488,  initK:300,   fixK:12,   varH:50,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'CubCrafters XCub',           type:'piston',tas:135, pax:2,  range:769,  initK:420,   fixK:14,   varH:58,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Culver ────────────────────────────────────────────────────────
  { name:'Culver Cadet',                          type:'piston', tas:120,  pax:2,   range:450,   initK:55,     fixK:8,     varH:35,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Culver V',                              type:'piston', tas:130,  pax:2,   range:500,   initK:60,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Curtiss ───────────────────────────────────────────────────────
  { name:'Curtiss C-46 Commando',                 type:'piston', tas:190,  pax:40,  range:1800,  initK:350,    fixK:130,   varH:900,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },
  { name:'Curtiss P-40N Warhawk',                 type:'piston', tas:220,  pax:1,   range:650,   initK:2200,   fixK:130,   varH:950,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Curtiss Warhawk ───────────────────────────────────────────────
  { name:'Curtiss P-40E Warhawk',                 type:'piston', tas:215,  pax:1,   range:620,   initK:2100,   fixK:128,   varH:940,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Cvjetkovic ────────────────────────────────────────────────────
  { name:'Cvjetkovic CA-65',                      type:'piston', tas:130,  pax:2,   range:450,   initK:35,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Czech ─────────────────────────────────────────────────────────
  { name:'Czech Sport Aircraft PS-28 Cruiser',type:'piston',tas:115,pax:2,range:544,initK:155,  fixK:8,    varH:36,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Czech Sport Aircraft SportCruiser', type:'piston',tas:118,pax:2,range:562,initK:135,  fixK:8,    varH:35,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Czech Sport ───────────────────────────────────────────────────
  { name:'Czech Sport SportCruiser',              type:'piston', tas:120,  pax:2,   range:600,   initK:100,    fixK:7,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Daher ─────────────────────────────────────────────────────────
  { name:'Daher TBM 700',              type:'turbo', tas:300, pax:5,  range:1580, initK:2200,  fixK:80,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Daher TBM 850',              type:'turbo', tas:320, pax:5,  range:1505, initK:3200,  fixK:90,   varH:540,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Daher TBM 940',              type:'turbo', tas:330, pax:5,  range:1565, initK:4400,  fixK:100,  varH:590,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },

  // ── Dassault ──────────────────────────────────────────────────────
  { name:'Dassault Falcon 10',                    type:'jet',    tas:430,  pax:7,   range:1800,  initK:800,    fixK:150,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Dassault Falcon 10X',        type:'jet',  tas:488, pax:16, range:7256, initK:75000, fixK:1300, varH:6200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Dassault Falcon 200',                   type:'jet',    tas:430,  pax:9,   range:2500,  initK:900,    fixK:220,   varH:2300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Dassault Falcon 2000',                  type:'jet',    tas:440,  pax:8,   range:3000,  initK:3500,   fixK:380,   varH:2500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Dassault Falcon 2000EX',                type:'jet',    tas:460,  pax:8,   range:3800,  initK:6000,   fixK:420,   varH:2600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Dassault Falcon 2000LXS',    type:'jet',  tas:482, pax:10, range:3759, initK:35000, fixK:620,  varH:3000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Dassault Falcon 20F',                   type:'jet',    tas:420,  pax:9,   range:1900,  initK:700,    fixK:200,   varH:2200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Dassault Falcon 50',                    type:'jet',    tas:440,  pax:9,   range:3200,  initK:1800,   fixK:300,   varH:2600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'Dassault Falcon 50EX',       type:'jet',  tas:470, pax:8,  range:3065, initK:8000,  fixK:200,  varH:1200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:3 },
  { name:'Dassault Falcon 6X',         type:'jet',  tas:488, pax:12, range:5256, initK:47000, fixK:800,  varH:3800, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Dassault Falcon 7X',         type:'jet',  tas:482, pax:14, range:5709, initK:55000, fixK:900,  varH:4500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:3 },
  { name:'Dassault Falcon 8X',         type:'jet',  tas:488, pax:16, range:6206, initK:62000, fixK:1000, varH:4900, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:3 },
  { name:'Dassault Falcon 900B',                  type:'jet',    tas:450,  pax:12,  range:3800,  initK:3500,   fixK:400,   varH:2900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'Dassault Falcon 900EX',                 type:'jet',    tas:460,  pax:12,  range:4500,  initK:6000,   fixK:450,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'Dassault Falcon 900LX',      type:'jet',  tas:480, pax:12, range:4510, initK:38000, fixK:700,  varH:3200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:3 },

  // ── Dassault Airliner ─────────────────────────────────────────────
  { name:'Dassault Mercure',                      type:'jet',    tas:460,  pax:150, range:1100,  initK:150,    fixK:500,   varH:2900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Dassault Flamant ──────────────────────────────────────────────
  { name:'Dassault MD.312 Flamant',               type:'piston', tas:160,  pax:6,   range:750,   initK:180,    fixK:28,    varH:150,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Dassault-Dornier ──────────────────────────────────────────────
  { name:'Dassault-Dornier Alpha Jet',            type:'jet',    tas:430,  pax:2,   range:1000,  initK:600,    fixK:130,   varH:1900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── DeHavilland ───────────────────────────────────────────────────
  { name:'DeHavilland Beaver DHC-2',   type:'piston',tas:115, pax:7,  range:364,  initK:450,   fixK:25,   varH:130,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'DeHavilland Dash 8 Q100',    type:'turbo', tas:270, pax:37, range:715,  initK:8000,  fixK:350,  varH:1500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'DeHavilland Dash 8 Q400',    type:'turbo', tas:360, pax:78, range:920, initK:22000, fixK:600,  varH:2400, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'DeHavilland DH.82 Tiger Moth',          type:'piston', tas:80,   pax:2,   range:300,   initK:120,    fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'DeHavilland DHC-1 Chipmunk',            type:'piston', tas:105,  pax:2,   range:420,   initK:100,    fixK:11,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'DeHavilland Otter DHC-3',    type:'piston',tas:130, pax:10, range:542,  initK:650,   fixK:35,   varH:170,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'DeHavilland Twin Otter DHC-6',type:'turbo',tas:170, pax:19, range:735,  initK:3000,  fixK:110,  varH:520,  rating:true,  fuel:'Jet-A',  gear:'tricycle',    engines:2 },

  // ── DeHavilland Canada ────────────────────────────────────────────
  { name:'DeHavilland Canada Dash 8 Q400',        type:'turbo',  tas:360,  pax:78,  range:1100,  initK:12000,  fixK:700,   varH:1200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'DeHavilland Canada Dash 8-100',         type:'turbo',  tas:265,  pax:37,  range:1020,  initK:1500,   fixK:400,   varH:800,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'DeHavilland Canada Dash 8-200',         type:'turbo',  tas:280,  pax:37,  range:1020,  initK:2000,   fixK:420,   varH:820,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'DeHavilland Canada Dash 8-300',         type:'turbo',  tas:285,  pax:50,  range:800,   initK:3000,   fixK:480,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── DeHavilland Canada Brousse ────────────────────────────────────
  { name:'DHC-2 Turbo Beaver',                    type:'turbo',  tas:145,  pax:7,   range:600,   initK:900,    fixK:60,    varH:280,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'DHC-3T Turbine Otter',                  type:'turbo',  tas:150,  pax:11,  range:800,   initK:1500,   fixK:80,    varH:340,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },

  // ── DeHavilland Canada Militaire ──────────────────────────────────
  { name:'DHC-4 Caribou',                         type:'piston', tas:158,  pax:32,  range:1200,  initK:500,    fixK:90,    varH:600,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },
  { name:'DHC-5 Buffalo',                         type:'turbo',  tas:230,  pax:41,  range:1000,  initK:1200,   fixK:250,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'tailwheel',    engines:2 },
  { name:'DHC-7 Dash 7',                          type:'turbo',  tas:231,  pax:50,  range:700,   initK:1500,   fixK:300,   varH:1000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── DeHavilland Classiques ────────────────────────────────────────
  { name:'DeHavilland DH.104 Dove',               type:'piston', tas:165,  pax:11,  range:1000,  initK:200,    fixK:32,    varH:165,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'DeHavilland DH.114 Heron',              type:'piston', tas:160,  pax:17,  range:900,   initK:250,    fixK:40,    varH:200,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:4 },
  { name:'DeHavilland DH.80 Puss Moth',           type:'piston', tas:105,  pax:3,   range:480,   initK:250,    fixK:13,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'DeHavilland DH.85 Leopard Moth',        type:'piston', tas:110,  pax:3,   range:500,   initK:200,    fixK:13,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'DeHavilland DH.87 Hornet Moth',         type:'piston', tas:95,   pax:2,   range:480,   initK:150,    fixK:12,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'DeHavilland DH.89 Dragon Rapide',       type:'piston', tas:130,  pax:8,   range:570,   initK:400,    fixK:30,    varH:160,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },

  // ── DeHavilland Comet ─────────────────────────────────────────────
  { name:'DeHavilland Comet 4',                   type:'jet',    tas:450,  pax:81,  range:3200,  initK:300,    fixK:600,   varH:3800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── DeHavilland Mosquito ──────────────────────────────────────────
  { name:'DeHavilland DH.98 Mosquito',            type:'piston', tas:250,  pax:2,   range:1200,  initK:7000,   fixK:300,   varH:2000,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── DeHavilland Vampire ───────────────────────────────────────────
  { name:'DeHavilland DH.112 Venom',              type:'jet',    tas:380,  pax:1,   range:900,   initK:350,    fixK:95,    varH:1400,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'DeHavilland DH.115 Vampire T.11',       type:'jet',    tas:350,  pax:2,   range:700,   initK:300,    fixK:90,    varH:1300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Denney ────────────────────────────────────────────────────────
  { name:'Denney Kitfox Model 3',                 type:'piston', tas:95,   pax:2,   range:450,   initK:40,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Denney Kitfox Model 4',                 type:'piston', tas:100,  pax:2,   range:480,   initK:50,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── DG Flugzeugbau ────────────────────────────────────────────────
  { name:'DG Flugzeugbau DG-1000T',               type:'piston', tas:95,   pax:2,   range:400,   initK:160,    fixK:9,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'DG Flugzeugbau DG-1001M',               type:'piston', tas:95,   pax:2,   range:430,   initK:230,    fixK:10,    varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'DG Flugzeugbau DG-400',                 type:'piston', tas:95,   pax:1,   range:380,   initK:55,     fixK:7,     varH:24,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'DG Flugzeugbau DG-500M',                type:'piston', tas:95,   pax:2,   range:400,   initK:85,     fixK:8,     varH:27,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'DG Flugzeugbau DG-505MB',               type:'piston', tas:95,   pax:2,   range:420,   initK:100,    fixK:8,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'DG Flugzeugbau DG-600M',                type:'piston', tas:95,   pax:1,   range:400,   initK:75,     fixK:7,     varH:25,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'DG Flugzeugbau DG-800B',                type:'piston', tas:95,   pax:1,   range:430,   initK:110,    fixK:8,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'DG Flugzeugbau DG-808C',                type:'piston', tas:95,   pax:1,   range:450,   initK:150,    fixK:9,     varH:27,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Diamond ───────────────────────────────────────────────────────
  { name:'Diamond DA20 Katana',        type:'piston',tas:109, pax:2,  range:418,  initK:160,   fixK:10,   varH:50,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Diamond DA20-C1 Eclipse',               type:'piston', tas:138,  pax:2,   range:550,   initK:95,     fixK:9,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Diamond DA40 NG',            type:'piston',tas:145, pax:4,  range:661,  initK:420,   fixK:17,   varH:78,   rating:false, fuel:'Jet-A', gear:'tricycle',    engines:1 },
  { name:'Diamond DA40 XLS',           type:'piston',tas:138, pax:4,  range:646,  initK:380,   fixK:16,   varH:74,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Diamond DA40 XLT',                      type:'piston', tas:150,  pax:4,   range:720,   initK:280,    fixK:14,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Diamond DA42 Twin Star',     type:'piston',tas:175, pax:4,  range:869, initK:680,   fixK:22,   varH:95,   rating:false, fuel:'Jet-A', gear:'tricycle',    engines:2 },
  { name:'Diamond DA42-VI',                       type:'piston', tas:197,  pax:4,   range:1215,  initK:750,    fixK:40,    varH:130,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Diamond DA42-VI Twin Star',  type:'piston',tas:185, pax:3,  range:961, initK:750,   fixK:22,   varH:90,   rating:false, fuel:'Jet-A', gear:'tricycle',    engines:2 },
  { name:'Diamond DA50 RG',            type:'piston',tas:190, pax:5,  range:988, initK:900,   fixK:26,   varH:105,  rating:false, fuel:'Jet-A', gear:'retractable', engines:1 },
  { name:'Diamond DA62',               type:'piston',tas:192, pax:6,  range:876, initK:1150,  fixK:32,   varH:115,  rating:false, fuel:'Jet-A', gear:'tricycle',    engines:2 },
  { name:'Diamond DART-450',           type:'turbo', tas:180, pax:2,  range:660,  initK:1400,  fixK:60,   varH:320,  rating:false, fuel:'Jet-A',  gear:'tricycle',    engines:1 },
  { name:'Diamond HK36 Super Dimona',             type:'piston', tas:95,   pax:2,   range:540,   initK:85,     fixK:8,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Diamond HK36TTC Katana Xtreme',         type:'piston', tas:105,  pax:2,   range:600,   initK:110,    fixK:9,     varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Diamond DA40 ──────────────────────────────────────────────────
  { name:'Diamond DA20-A1 Katana',                type:'piston', tas:130,  pax:2,   range:520,   initK:75,     fixK:8,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Diamond DA40 CS',                       type:'piston', tas:150,  pax:4,   range:720,   initK:260,    fixK:13,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Diamond DA40 TDI',                      type:'piston', tas:140,  pax:4,   range:940,   initK:220,    fixK:13,    varH:40,    rating:false,  fuel:'Jet-A',  gear:'tricycle',     engines:1 },
  { name:'Diamond DA40-180 Diamond Star',         type:'piston', tas:145,  pax:4,   range:720,   initK:180,    fixK:12,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Direct Fly ────────────────────────────────────────────────────
  { name:'Direct Fly Alto 912',                   type:'piston', tas:115,  pax:2,   range:600,   initK:65,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Dornier ───────────────────────────────────────────────────────
  { name:'Dornier 328JET',                        type:'jet',    tas:405,  pax:33,  range:900,   initK:3000,   fixK:500,   varH:1100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Dornier Do 228-212',                    type:'turbo',  tas:200,  pax:19,  range:600,   initK:1200,   fixK:250,   varH:520,   rating:true,   fuel:'Jet-A',  gear:'tricycle',     engines:2 },
  { name:'Dornier Do 27',                         type:'piston', tas:105,  pax:6,   range:600,   initK:95,     fixK:16,    varH:75,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Dornier Do 28 Skyservant',              type:'piston', tas:150,  pax:12,  range:620,   initK:180,    fixK:30,    varH:160,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:2 },
  { name:'Dornier Do 328-110',                    type:'turbo',  tas:335,  pax:33,  range:900,   initK:2500,   fixK:400,   varH:800,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Dornier Seaplane ──────────────────────────────────────────────
  { name:'Dornier Do 24',                         type:'piston', tas:130,  pax:12,  range:1400,  initK:1200,   fixK:90,    varH:480,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:3 },
  { name:'Dornier Seastar',                       type:'turbo',  tas:180,  pax:12,  range:900,   initK:5000,   fixK:150,   varH:700,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Douglas ───────────────────────────────────────────────────────
  { name:'Douglas AD-4 Skyraider',                type:'piston', tas:170,  pax:1,   range:900,   initK:2200,   fixK:120,   varH:900,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Douglas C-47 Dakota',                   type:'piston', tas:160,  pax:28,  range:1600,  initK:400,    fixK:62,    varH:330,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },
  { name:'Douglas DC-3',                          type:'piston', tas:160,  pax:28,  range:1000,  initK:350,    fixK:60,    varH:320,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },

  // ── Douglas Airliner ──────────────────────────────────────────────
  { name:'Douglas DC-6B',                         type:'piston', tas:270,  pax:90,  range:2600,  initK:400,    fixK:120,   varH:750,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:4 },
  { name:'Douglas DC-7C',                         type:'piston', tas:290,  pax:105, range:3800,  initK:350,    fixK:130,   varH:800,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:4 },
  { name:'Douglas DC-8-63',                       type:'jet',    tas:480,  pax:259, range:4000,  initK:400,    fixK:700,   varH:4500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Douglas DC-8-71',                       type:'jet',    tas:480,  pax:189, range:5300,  initK:600,    fixK:650,   varH:3800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── Douglas Militaire ─────────────────────────────────────────────
  { name:'Douglas C-118 Liftmaster',              type:'piston', tas:270,  pax:76,  range:3000,  initK:350,    fixK:125,   varH:820,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:4 },
  { name:'Douglas C-54 Skymaster',                type:'piston', tas:230,  pax:50,  range:3900,  initK:300,    fixK:120,   varH:800,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:4 },

  // ── Dova ──────────────────────────────────────────────────────────
  { name:'Dova DV-1 Skylark',                     type:'piston', tas:120,  pax:2,   range:600,   initK:75,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Druine ────────────────────────────────────────────────────────
  { name:'Druine D.31 Turbulent',                 type:'piston', tas:85,   pax:1,   range:250,   initK:20,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Druine D.62 Condor',                    type:'piston', tas:95,   pax:2,   range:350,   initK:30,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Druine Turbi ──────────────────────────────────────────────────
  { name:'Druine D.5 Turbi',                      type:'piston', tas:95,   pax:2,   range:350,   initK:28,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── DTA ───────────────────────────────────────────────────────────
  { name:'DTA Combo FC',                          type:'piston', tas:55,   pax:2,   range:230,   initK:40,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'DTA Dynamic 450',                       type:'piston', tas:52,   pax:2,   range:200,   initK:32,     fixK:4,     varH:19,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'DTA J-RO',                              type:'piston', tas:60,   pax:2,   range:260,   initK:60,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'DTA Voyageur II',                       type:'piston', tas:58,   pax:2,   range:250,   initK:45,     fixK:5,     varH:21,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },

  // ── Dyke ──────────────────────────────────────────────────────────
  { name:'Dyke JD-2 Delta',                       type:'piston', tas:180,  pax:4,   range:700,   initK:50,     fixK:7,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Dyn Aero ──────────────────────────────────────────────────────
  { name:'Dyn Aero MCR-01 Club',                  type:'piston', tas:135,  pax:2,   range:700,   initK:70,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Dyn Aero MCR-01 ULC',                   type:'piston', tas:140,  pax:2,   range:750,   initK:80,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Dyn Aero MCR-4S',                       type:'piston', tas:155,  pax:4,   range:800,   initK:110,    fixK:8,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Dynali ────────────────────────────────────────────────────────
  { name:'Dynali H3 EasyFlyer',                   type:'piston', tas:85,   pax:2,   range:200,   initK:130,    fixK:12,    varH:85,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Eclipse ───────────────────────────────────────────────────────
  { name:'Eclipse 400',                type:'jet',  tas:370, pax:3,  range:940, initK:2400,  fixK:75,   varH:520,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Eclipse 500',                type:'jet',  tas:370, pax:5,  range:865, initK:2100,  fixK:78,   varH:530,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Eclipse 550',                type:'jet',  tas:375, pax:4,  range:937, initK:2950,  fixK:85,   varH:560,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Edgar Percival ────────────────────────────────────────────────
  { name:'Edgar Percival EP-9',                   type:'piston', tas:110,  pax:6,   range:500,   initK:70,     fixK:14,    varH:68,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Ekolot ────────────────────────────────────────────────────────
  { name:'Ekolot JK-05 Junior',                   type:'piston', tas:100,  pax:2,   range:480,   initK:55,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Ekolot KR-010 Elf',                     type:'piston', tas:105,  pax:1,   range:500,   initK:50,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Ekolot KR-030 Topaz',                   type:'piston', tas:115,  pax:2,   range:600,   initK:70,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Ekolot Divers ─────────────────────────────────────────────────
  { name:'Ekolot KR-030 Topaz LSA',               type:'piston', tas:118,  pax:2,   range:620,   initK:85,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── ELA Aviacion ──────────────────────────────────────────────────
  { name:'ELA Aviacion ELA 07S',                  type:'piston', tas:85,   pax:2,   range:300,   initK:65,     fixK:6,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },
  { name:'ELA Aviacion ELA 10 Eclipse',           type:'piston', tas:90,   pax:2,   range:330,   initK:85,     fixK:6,     varH:31,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },

  // ── Elixir ────────────────────────────────────────────────────────
  { name:'Elixir 100',                            type:'piston', tas:120,  pax:2,   range:600,   initK:250,    fixK:8,     varH:32,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Elixir 915iS',                          type:'piston', tas:135,  pax:2,   range:750,   initK:300,    fixK:9,     varH:35,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Elixir Divers ─────────────────────────────────────────────────
  { name:'Elixir 600',                            type:'piston', tas:125,  pax:2,   range:700,   initK:280,    fixK:8,     varH:33,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Ellipse ───────────────────────────────────────────────────────
  { name:'Ellipse Alize',                         type:'piston', tas:52,   pax:2,   range:200,   initK:28,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },

  // ── Embraer ───────────────────────────────────────────────────────
  { name:'Embraer E170',                          type:'jet',    tas:470,  pax:78,  range:2150,  initK:8000,   fixK:700,   varH:1900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer E175',                          type:'jet',    tas:470,  pax:88,  range:2200,  initK:15000,  fixK:750,   varH:2000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer E175-E2',                       type:'jet',    tas:470,  pax:90,  range:2060,  initK:35000,  fixK:800,   varH:1900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer E190',                          type:'jet',    tas:470,  pax:106, range:2450,  initK:12000,  fixK:800,   varH:2200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer E190-E2',                       type:'jet',    tas:470,  pax:106, range:2850,  initK:40000,  fixK:850,   varH:2000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer E195',                          type:'jet',    tas:470,  pax:124, range:2300,  initK:14000,  fixK:850,   varH:2300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer E195-E2',                       type:'jet',    tas:470,  pax:146, range:2600,  initK:45000,  fixK:900,   varH:2100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer ERJ-135',                       type:'jet',    tas:447,  pax:37,  range:1750,  initK:1500,   fixK:500,   varH:1400,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer ERJ-140',                       type:'jet',    tas:447,  pax:44,  range:1650,  initK:1600,   fixK:520,   varH:1450,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer ERJ-145',                       type:'jet',    tas:447,  pax:50,  range:1550,  initK:2000,   fixK:550,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Embraer Legacy 450',         type:'jet',  tas:466, pax:9,  range:2667, initK:20000, fixK:380,  varH:1800, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Legacy 500',         type:'jet',  tas:466, pax:12, range:2892, initK:23000, fixK:420,  varH:2000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Legacy 600',         type:'jet',  tas:459, pax:13, range:3170, initK:28000, fixK:500,  varH:2400, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Legacy 650E',        type:'jet',  tas:460, pax:14, range:3670, initK:32000, fixK:540,  varH:2550, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Phenom 100E',        type:'jet',  tas:389, pax:5,  range:984, initK:4500,  fixK:100,  varH:600,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Phenom 100EV',       type:'jet',  tas:390, pax:5,  range:983, initK:4900,  fixK:105,  varH:620,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Phenom 300',         type:'jet',  tas:453, pax:8,  range:1745, initK:8600,  fixK:190,  varH:1020, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Phenom 300E',        type:'jet',  tas:453, pax:8,  range:1784, initK:11500, fixK:200,  varH:1050, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Praetor 500',        type:'jet',  tas:466, pax:9,  range:3107, initK:25000, fixK:450,  varH:2100, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Embraer Praetor 600',        type:'jet',  tas:466, pax:12, range:3785, initK:31000, fixK:550,  varH:2600, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Embraer Agricole ──────────────────────────────────────────────
  { name:'Embraer EMB-201 Ipanema',               type:'piston', tas:105,  pax:1,   range:300,   initK:70,     fixK:14,    varH:70,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Embraer Brasilia ──────────────────────────────────────────────
  { name:'Embraer EMB-120 Brasilia',              type:'turbo',  tas:300,  pax:30,  range:800,   initK:1200,   fixK:350,   varH:700,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Embraer Militaire ─────────────────────────────────────────────
  { name:'Embraer EMB-312 Tucano',                type:'turbo',  tas:240,  pax:2,   range:995,   initK:1200,   fixK:80,    varH:380,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Embraer EMB-314 Super Tucano',          type:'turbo',  tas:320,  pax:2,   range:720,   initK:9000,   fixK:150,   varH:700,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Enstrom ───────────────────────────────────────────────────────
  { name:'Enstrom 280C Shark',                    type:'piston', tas:95,   pax:3,   range:250,   initK:250,    fixK:27,    varH:195,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Enstrom 280FX Shark',                   type:'piston', tas:100,  pax:3,   range:260,   initK:320,    fixK:29,    varH:205,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Enstrom 480B',                          type:'turbo',  tas:110,  pax:5,   range:380,   initK:800,    fixK:55,    varH:380,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Enstrom F-28A',                         type:'piston', tas:90,   pax:3,   range:240,   initK:200,    fixK:26,    varH:190,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Enstrom F28F Falcon',                   type:'piston', tas:95,   pax:3,   range:260,   initK:300,    fixK:28,    varH:200,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Enstrom Divers ────────────────────────────────────────────────
  { name:'Enstrom 480B-G',                        type:'turbo',  tas:112,  pax:5,   range:390,   initK:900,    fixK:57,    varH:385,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Enstrom TH-180',                        type:'piston', tas:95,   pax:2,   range:250,   initK:280,    fixK:26,    varH:185,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Epic ──────────────────────────────────────────────────────────
  { name:'Epic E1000 GX',              type:'turbo', tas:333, pax:5,  range:1434, initK:3500,  fixK:90,   varH:520,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Epic LT',                    type:'turbo', tas:325, pax:6,  range:1338, initK:2000,  fixK:85,   varH:500,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Epic Victory',               type:'jet',   tas:390, pax:5,  range:1105, initK:2800,  fixK:95,   varH:560,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:1 },

  // ── Ercoupe ───────────────────────────────────────────────────────
  { name:'Alon A-2 Aircoupe',                     type:'piston', tas:100,  pax:2,   range:420,   initK:35,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Ercoupe 415C',                          type:'piston', tas:95,   pax:2,   range:400,   initK:30,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Ercoupe 415D',                          type:'piston', tas:95,   pax:2,   range:400,   initK:32,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Europa ────────────────────────────────────────────────────────
  { name:'Europa Classic',                        type:'piston', tas:130,  pax:2,   range:700,   initK:50,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Europa XS',                             type:'piston', tas:145,  pax:2,   range:800,   initK:70,     fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Evans ─────────────────────────────────────────────────────────
  { name:'Evans VP-1 Volksplane',                 type:'piston', tas:75,   pax:1,   range:200,   initK:12,     fixK:3,     varH:14,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Evans VP-2',                            type:'piston', tas:80,   pax:2,   range:220,   initK:16,     fixK:3,     varH:16,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Evektor ───────────────────────────────────────────────────────
  { name:'Evektor Cobra',              type:'piston',tas:105, pax:2,  range:441,  initK:120,   fixK:8,    varH:33,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Evektor EuroStar SL',                   type:'piston', tas:110,  pax:2,   range:550,   initK:70,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Evektor EuroStar SLW',                  type:'piston', tas:112,  pax:2,   range:570,   initK:80,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Evektor Harmony',            type:'piston',tas:108, pax:2,  range:459,  initK:145,   fixK:8,    varH:35,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Evektor Harmony LSA',                   type:'piston', tas:115,  pax:2,   range:600,   initK:110,    fixK:7,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Evektor SportStar Max',      type:'piston',tas:100, pax:2,  range:425,  initK:140,   fixK:8,    varH:34,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Evektor SportStar RTC',                 type:'piston', tas:110,  pax:2,   range:550,   initK:95,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Express ───────────────────────────────────────────────────────
  { name:'Express S90',                           type:'piston', tas:190,  pax:4,   range:1000,  initK:100,    fixK:9,     varH:45,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Extra ─────────────────────────────────────────────────────────
  { name:'Extra 200',                  type:'piston',tas:170, pax:1,  range:252,  initK:180,   fixK:11,   varH:52,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Extra 230',                             type:'piston', tas:148,  pax:1,   range:350,   initK:90,     fixK:11,    varH:60,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Extra 260',                  type:'piston',tas:175, pax:1,  range:259,  initK:210,   fixK:11,   varH:53,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Extra 300',                             type:'piston', tas:160,  pax:2,   range:500,   initK:185,    fixK:14,    varH:70,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Extra 300L',                 type:'piston',tas:178, pax:2,  range:266,  initK:230,   fixK:12,   varH:54,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Extra 300S',                 type:'piston',tas:180, pax:1,  range:265,  initK:250,   fixK:12,   varH:55,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Extra 330LT',                           type:'piston', tas:178,  pax:2,   range:900,   initK:550,    fixK:20,    varH:95,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Extra 330LX',                type:'piston',tas:185, pax:2,  range:361,  initK:380,   fixK:14,   varH:60,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Extra 330SC',                           type:'piston', tas:168,  pax:1,   range:430,   initK:450,    fixK:18,    varH:90,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Extra NG',                   type:'piston',tas:190, pax:2,  range:378,  initK:420,   fixK:15,   varH:62,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Extra EA-500 ──────────────────────────────────────────────────
  { name:'Extra EA-500',                          type:'turbo',  tas:220,  pax:6,   range:1000,  initK:900,    fixK:60,    varH:280,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Fairchild ─────────────────────────────────────────────────────
  { name:'Fairchild C-119 Flying Boxcar',         type:'piston', tas:200,  pax:62,  range:1600,  initK:400,    fixK:150,   varH:1100,  rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },
  { name:'Fairchild C-123 Provider',              type:'piston', tas:205,  pax:61,  range:1000,  initK:500,    fixK:160,   varH:1200,  rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },
  { name:'Fairchild Merlin III',       type:'turbo', tas:295, pax:8,  range:1332, initK:320,   fixK:88,   varH:455,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Fairchild Merlin IV',        type:'turbo', tas:280, pax:11, range:1360, initK:500,   fixK:100,  varH:480,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Fairchild Metro 23',         type:'turbo', tas:300, pax:19, range:1050, initK:1100,  fixK:185,  varH:730,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Fairchild Metro III',        type:'turbo', tas:290, pax:19, range:1005, initK:850,   fixK:170,  varH:700,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Fairchild PT-19 Cornell',               type:'piston', tas:95,   pax:2,   range:400,   initK:100,    fixK:9,     varH:45,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Fairchild PT-26',                       type:'piston', tas:95,   pax:2,   range:420,   initK:110,    fixK:9,     varH:46,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Fairchild Classiques ──────────────────────────────────────────
  { name:'Fairchild 24 Argus',                    type:'piston', tas:120,  pax:4,   range:500,   initK:130,    fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Fairchild 71',                          type:'piston', tas:110,  pax:7,   range:600,   initK:350,    fixK:22,    varH:110,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Fairchild F-24R',                       type:'piston', tas:125,  pax:4,   range:520,   initK:140,    fixK:12,    varH:56,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Falco ─────────────────────────────────────────────────────────
  { name:'Falco F.8L',                            type:'piston', tas:165,  pax:2,   range:700,   initK:90,     fixK:9,     varH:45,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Falconar ──────────────────────────────────────────────────────
  { name:'Falconar F-11 Sporty',                  type:'piston', tas:115,  pax:2,   range:400,   initK:30,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Fama ──────────────────────────────────────────────────────────
  { name:'Fama Kiss 209M',                        type:'piston', tas:90,   pax:2,   range:220,   initK:120,    fixK:12,    varH:88,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Fantasy Air ───────────────────────────────────────────────────
  { name:'Fantasy Air Allegro 2000',              type:'piston', tas:110,  pax:2,   range:550,   initK:55,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Fantasy Air Allegro SW',                type:'piston', tas:115,  pax:2,   range:580,   initK:65,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Fieseler ──────────────────────────────────────────────────────
  { name:'Fieseler Fi 156 Storch',                type:'piston', tas:90,   pax:3,   range:240,   initK:800,    fixK:25,    varH:120,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Fisher ────────────────────────────────────────────────────────
  { name:'Fisher Celebrity',                      type:'piston', tas:85,   pax:2,   range:300,   initK:32,     fixK:4,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Fisher FP-202 Koala',                   type:'piston', tas:70,   pax:1,   range:220,   initK:18,     fixK:3,     varH:16,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Fisher FP-303',                         type:'piston', tas:75,   pax:1,   range:240,   initK:20,     fixK:3,     varH:17,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── FK Lightplanes ────────────────────────────────────────────────
  { name:'FK Lightplanes FK131 Jungmann',         type:'piston', tas:95,   pax:2,   range:350,   initK:120,    fixK:8,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'FK Lightplanes FK14 Polaris',           type:'piston', tas:130,  pax:2,   range:700,   initK:130,    fixK:7,     varH:31,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'FK Lightplanes FK9 ELA',                type:'piston', tas:105,  pax:2,   range:550,   initK:85,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'FK Lightplanes FK9 Mk6',                type:'piston', tas:105,  pax:2,   range:550,   initK:80,     fixK:6,     varH:27,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Flaming Air ───────────────────────────────────────────────────
  { name:'Flaming Air FA-04 Peregrine',           type:'piston', tas:120,  pax:2,   range:600,   initK:85,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Fleet ─────────────────────────────────────────────────────────
  { name:'Fleet Finch',                           type:'piston', tas:90,   pax:2,   range:300,   initK:100,    fixK:11,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Flight Design ─────────────────────────────────────────────────
  { name:'Flight Design CT2K',                    type:'piston', tas:115,  pax:2,   range:700,   initK:70,     fixK:6,     varH:28,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Flight Design CTLS',                    type:'piston', tas:120,  pax:2,   range:750,   initK:110,    fixK:7,     varH:30,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Flight Design CTLSi',                   type:'piston', tas:122,  pax:2,   range:780,   initK:140,    fixK:7,     varH:31,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Flight Design F2',                      type:'piston', tas:120,  pax:2,   range:700,   initK:200,    fixK:8,     varH:33,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Fly Synthesis ─────────────────────────────────────────────────
  { name:'Fly Synthesis Catalina NG',             type:'piston', tas:100,  pax:2,   range:500,   initK:130,    fixK:8,     varH:32,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Fly Synthesis Storch',                  type:'piston', tas:85,   pax:2,   range:450,   initK:50,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Fly Synthesis Texan Top Class',         type:'piston', tas:120,  pax:2,   range:600,   initK:75,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Fly Synthesis Wallaby',                 type:'piston', tas:90,   pax:2,   range:420,   initK:45,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Fly Synthesis Divers ──────────────────────────────────────────
  { name:'Fly Synthesis Texan 600',               type:'piston', tas:115,  pax:2,   range:580,   initK:70,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Focke-Wulf ────────────────────────────────────────────────────
  { name:'Focke-Wulf Fw 190A',                    type:'piston', tas:240,  pax:1,   range:450,   initK:3500,   fixK:160,   varH:1250,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Focke-Wulf Fw 44 Stieglitz',            type:'piston', tas:95,   pax:2,   range:400,   initK:250,    fixK:14,    varH:65,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Fokker ────────────────────────────────────────────────────────
  { name:'Fokker 100',                            type:'jet',    tas:460,  pax:107, range:1680,  initK:2500,   fixK:650,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Fokker 50',                             type:'turbo',  tas:282,  pax:50,  range:1000,  initK:2500,   fixK:480,   varH:880,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Fokker 70',                             type:'jet',    tas:460,  pax:79,  range:1840,  initK:2000,   fixK:600,   varH:1700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Fokker D.VII replica',                  type:'piston', tas:95,   pax:1,   range:220,   initK:130,    fixK:10,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Fokker Dr.I Triplane replica',          type:'piston', tas:85,   pax:1,   range:180,   initK:120,    fixK:10,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Fokker E.III Eindecker replica',        type:'piston', tas:80,   pax:1,   range:170,   initK:95,     fixK:9,     varH:46,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Fokker Classiques ─────────────────────────────────────────────
  { name:'Fokker F27 Friendship',                 type:'turbo',  tas:260,  pax:48,  range:1000,  initK:300,    fixK:240,   varH:850,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Fokker F28 Fellowship',                 type:'jet',    tas:455,  pax:85,  range:1200,  initK:400,    fixK:500,   varH:2400,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Folland ───────────────────────────────────────────────────────
  { name:'Folland Gnat T.1',                      type:'jet',    tas:400,  pax:2,   range:500,   initK:400,    fixK:100,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Fouga ─────────────────────────────────────────────────────────
  { name:'Fouga CM.170 Magister',                 type:'jet',    tas:290,  pax:2,   range:500,   initK:200,    fixK:85,    varH:1300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Found ─────────────────────────────────────────────────────────
  { name:'Found Bush Hawk XP',                    type:'piston', tas:125,  pax:4,   range:700,   initK:180,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Fournier ──────────────────────────────────────────────────────
  { name:'Fournier RF-47',                        type:'piston', tas:110,  pax:2,   range:500,   initK:70,     fixK:8,     varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Fournier RF-4D',                        type:'piston', tas:95,   pax:1,   range:400,   initK:35,     fixK:6,     varH:24,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Fournier RF-5',                         type:'piston', tas:100,  pax:2,   range:430,   initK:45,     fixK:7,     varH:27,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Fournier Motoplaneur ──────────────────────────────────────────
  { name:'Fournier RF-10',                        type:'piston', tas:110,  pax:2,   range:580,   initK:70,     fixK:7,     varH:27,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Fournier RF-9',                         type:'piston', tas:105,  pax:2,   range:550,   initK:60,     fixK:7,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Fuji ──────────────────────────────────────────────────────────
  { name:'Fuji FA-200 Aero Subaru',               type:'piston', tas:115,  pax:4,   range:550,   initK:45,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Funk ──────────────────────────────────────────────────────────
  { name:'Funk B85C',                             type:'piston', tas:95,   pax:2,   range:350,   initK:50,     fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── GAF ───────────────────────────────────────────────────────────
  { name:'GAF N24 Nomad',                         type:'turbo',  tas:168,  pax:16,  range:730,   initK:400,    fixK:120,   varH:450,   rating:true,   fuel:'Jet-A',  gear:'tricycle',     engines:2 },

  // ── Gardan ────────────────────────────────────────────────────────
  { name:'Gardan GY-80 Horizon 180',              type:'piston', tas:125,  pax:4,   range:700,   initK:50,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Gardan Minicab ────────────────────────────────────────────────
  { name:'Gardan GY-201 Minicab',                 type:'piston', tas:105,  pax:2,   range:400,   initK:30,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── General Avia ──────────────────────────────────────────────────
  { name:'General Avia F.20 Pegaso',              type:'piston', tas:200,  pax:6,   range:1100,  initK:150,    fixK:26,    varH:120,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'General Avia F.22 Pinguino',            type:'piston', tas:120,  pax:2,   range:600,   initK:70,     fixK:9,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Giles ─────────────────────────────────────────────────────────
  { name:'Giles G-200',                           type:'piston', tas:175,  pax:1,   range:400,   initK:120,    fixK:12,    varH:65,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Giles G-202',                           type:'piston', tas:165,  pax:2,   range:450,   initK:140,    fixK:13,    varH:68,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── GippsAero ─────────────────────────────────────────────────────
  { name:'GippsAero GA8 Airvan',                  type:'piston', tas:120,  pax:8,   range:730,   initK:450,    fixK:30,    varH:130,   rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Glasair ───────────────────────────────────────────────────────
  { name:'Glasair GlaStar',            type:'piston',tas:140, pax:2,  range:645,  initK:70,    fixK:10,   varH:48,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Glasair I RG',                          type:'piston', tas:195,  pax:2,   range:800,   initK:55,     fixK:7,     varH:34,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Glasair II-S RG',                       type:'piston', tas:200,  pax:2,   range:900,   initK:75,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Glasair III',                type:'piston',tas:220, pax:2,  range:1035, initK:80,    fixK:11,   varH:60,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Glasair Sportsman 2+2',      type:'piston',tas:150, pax:4,  range:888, initK:90,    fixK:12,   varH:55,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Glasair Super II FT',                   type:'piston', tas:190,  pax:2,   range:850,   initK:70,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Glasair Super II RG',        type:'piston',tas:200, pax:2,  range:900, initK:75,    fixK:11,   varH:58,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Globe ─────────────────────────────────────────────────────────
  { name:'Globe GC-1B Swift',                     type:'piston', tas:130,  pax:2,   range:420,   initK:60,     fixK:9,     varH:40,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Gloster ───────────────────────────────────────────────────────
  { name:'Gloster Meteor T.7',                    type:'jet',    tas:350,  pax:2,   range:600,   initK:500,    fixK:130,   varH:2000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Great Lakes ───────────────────────────────────────────────────
  { name:'Great Lakes 2T-1A-2',                   type:'piston', tas:90,  pax:2,   range:300,   initK:90,     fixK:9,     varH:45,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Grob ──────────────────────────────────────────────────────────
  { name:'Grob G109B',                            type:'piston', tas:100,  pax:2,   range:620,   initK:70,     fixK:8,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Grob G115',                             type:'piston', tas:115,  pax:2,   range:500,   initK:90,     fixK:10,    varH:45,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Grob G115E Tutor',                      type:'piston', tas:120,  pax:2,   range:540,   initK:125,    fixK:11,    varH:48,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Grob G120A',                            type:'piston', tas:130,  pax:2,   range:600,   initK:250,    fixK:14,    varH:60,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Grob G120TP',                           type:'turbo',  tas:175,  pax:2,   range:700,   initK:900,    fixK:60,    varH:300,   rating:false, fuel:'Jet-A',  gear:'tricycle',     engines:1 },

  // ── Grob Motoplaneur ──────────────────────────────────────────────
  { name:'Grob G102 Astir CS',                    type:'piston', tas:90,   pax:1,   range:300,   initK:25,     fixK:5,     varH:20,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Grob G103 Twin III SL',                 type:'piston', tas:95,   pax:2,   range:400,   initK:70,     fixK:7,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Groppo ────────────────────────────────────────────────────────
  { name:'Groppo Trail',                          type:'piston', tas:95,   pax:2,   range:450,   initK:60,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Groppo Divers ─────────────────────────────────────────────────
  { name:'Groppo Trail Mk2',                      type:'piston', tas:98,   pax:2,   range:470,   initK:70,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Grumman ───────────────────────────────────────────────────────
  { name:'Grumman Albatross HU-16',    type:'piston',tas:205, pax:12, range:2546, initK:200,   fixK:35,   varH:150,  rating:true,  fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Grumman American AA-1 Yankee',type:'piston',tas:120,pax:2,  range:390,  initK:28,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Grumman American AA-5 Traveler',type:'piston',tas:125,pax:4,range:466,  initK:35,    fixK:9,    varH:46,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Grumman American AA-5B Tiger',type:'piston',tas:148,pax:4,  range:489,  initK:50,    fixK:10,   varH:55,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Grumman American Cheetah AA-5A',type:'piston',tas:128,pax:4,range:454,  initK:38,    fixK:9,    varH:48,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Grumman F8F Bearcat',                   type:'piston', tas:220,  pax:1,   range:900,   initK:2800,   fixK:130,   varH:950,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Grumman G-21 Goose',                    type:'piston', tas:160,  pax:8,   range:640,   initK:900,    fixK:60,    varH:380,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Grumman G-44 Widgeon',                  type:'piston', tas:140,  pax:5,   range:800,   initK:400,    fixK:35,    varH:190,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Grumman Goose G-21',         type:'piston',tas:150, pax:8,  range:528,  initK:280,   fixK:38,   varH:165,  rating:true,  fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Grumman Mallard G-73',       type:'piston',tas:170, pax:10, range:972, initK:380,   fixK:45,   varH:190,  rating:true,  fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Grumman TBM Avenger',                   type:'piston', tas:125,  pax:3,   range:900,   initK:1400,   fixK:90,    varH:700,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Grumman Ag-Cat ────────────────────────────────────────────────
  { name:'Grumman Ag-Cat G-164',                  type:'piston', tas:95,   pax:1,   range:300,   initK:90,     fixK:14,    varH:75,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Grumman Ag-Cat G-164A',                 type:'piston', tas:95,   pax:1,   range:300,   initK:80,     fixK:13,    varH:72,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Grumman Ag-Cat G-164B',                 type:'piston', tas:100,  pax:1,   range:320,   initK:100,    fixK:15,    varH:78,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Grumman Amphibie ──────────────────────────────────────────────
  { name:'Grumman G-73 Mallard',                  type:'piston', tas:180,  pax:10,  range:1380,  initK:900,    fixK:60,    varH:320,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Grumman HU-16 Albatross',               type:'piston', tas:150,  pax:22,  range:2850,  initK:1200,   fixK:90,    varH:500,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Grumman Militaire ─────────────────────────────────────────────
  { name:'Grumman C-2 Greyhound',                 type:'turbo',  tas:260,  pax:26,  range:1000,  initK:4000,   fixK:350,   varH:1600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Guimbal ───────────────────────────────────────────────────────
  { name:'Guimbal Cabri G2',                      type:'piston', tas:100,  pax:2,   range:380,   initK:450,    fixK:28,    varH:190,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Gulfstream ────────────────────────────────────────────────────
  { name:'Gulfstream G150',            type:'jet',  tas:459, pax:8,  range:2720, initK:11000, fixK:280,  varH:1450, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G200',            type:'jet',  tas:459, pax:9,  range:3170, initK:9500,  fixK:300,  varH:1500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G280',            type:'jet',  tas:482, pax:10, range:3359, initK:24000, fixK:450,  varH:2200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G350',            type:'jet',  tas:476, pax:14, range:3562, initK:26000, fixK:520,  varH:2600, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G450',            type:'jet',  tas:476, pax:16, range:4112, initK:32000, fixK:600,  varH:3000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G500',            type:'jet',  tas:488, pax:19, range:4956, initK:47000, fixK:850,  varH:4200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G550',            type:'jet',  tas:488, pax:19, range:6506, initK:60000, fixK:1050, varH:5200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G600',            type:'jet',  tas:488, pax:19, range:6256, initK:58000, fixK:1000, varH:5000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G650',            type:'jet',  tas:488, pax:19, range:6756, initK:68000, fixK:1150, varH:5700, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G650ER',          type:'jet',  tas:488, pax:19, range:7256, initK:72000, fixK:1200, varH:6000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G700',            type:'jet',  tas:488, pax:19, range:7256, initK:82000, fixK:1350, varH:6800, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream G800',            type:'jet',  tas:488, pax:19, range:7756, initK:78000, fixK:1300, varH:6500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream GII',                        type:'jet',    tas:440,  pax:12,  range:3500,  initK:1200,   fixK:400,   varH:3500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Gulfstream GIII',                       type:'jet',    tas:442,  pax:14,  range:3650,  initK:2000,   fixK:450,   varH:3600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Gulfstream GIV',             type:'jet',  tas:476, pax:14, range:3982, initK:12000, fixK:550,  varH:2800, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Gulfstream GV',              type:'jet',  tas:488, pax:16, range:6256, initK:20000, fixK:900,  varH:4400, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── HAL ───────────────────────────────────────────────────────────
  { name:'HAL HPT-32 Deepak',                     type:'piston', tas:130,  pax:2,   range:400,   initK:80,     fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Halley ────────────────────────────────────────────────────────
  { name:'Halley Apollo Fox',                     type:'piston', tas:85,   pax:2,   range:400,   initK:50,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Handley Page ──────────────────────────────────────────────────
  { name:'Handley Page Herald',                   type:'turbo',  tas:240,  pax:56,  range:1100,  initK:200,    fixK:200,   varH:750,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Hansa ─────────────────────────────────────────────────────────
  { name:'Hansa HFB 320 Jet',                     type:'jet',    tas:440,  pax:12,  range:1400,  initK:400,    fixK:150,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Harbin ────────────────────────────────────────────────────────
  { name:'Harbin Y-12',                           type:'turbo',  tas:160,  pax:17,  range:700,   initK:800,    fixK:140,   varH:480,   rating:true,   fuel:'Jet-A',  gear:'tricycle',     engines:2 },

  // ── Harbin Divers ─────────────────────────────────────────────────
  { name:'Harbin Y-5',                            type:'piston', tas:85,   pax:12,  range:450,   initK:80,     fixK:25,    varH:200,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Hatz ──────────────────────────────────────────────────────────
  { name:'Hatz CB-1',                             type:'piston', tas:85,   pax:2,   range:300,   initK:45,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Hawker ────────────────────────────────────────────────────────
  { name:'Hawker 1000',                type:'jet',  tas:465, pax:9,  range:3048, initK:3200,  fixK:260,  varH:1350, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 125-800',             type:'jet',  tas:440, pax:8,  range:2180, initK:2000,  fixK:170,  varH:1050, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 4000',                type:'jet',  tas:475, pax:8,  range:3042, initK:6500,  fixK:300,  varH:1500, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 400XP',               type:'jet',  tas:450, pax:8,  range:955, initK:1900,  fixK:130,  varH:850,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 700',                 type:'jet',  tas:437, pax:8,  range:2132, initK:1500,  fixK:160,  varH:1000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 750',                 type:'jet',  tas:447, pax:8,  range:1887, initK:5500,  fixK:200,  varH:1150, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 800A',                           type:'jet',    tas:448,  pax:8,   range:2400,  initK:1200,   fixK:230,   varH:1750,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Hawker 800XP',               type:'jet',  tas:447, pax:8,  range:2316, initK:5800,  fixK:210,  varH:1200, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 850XP',               type:'jet',  tas:448, pax:8,  range:2418, initK:7200,  fixK:220,  varH:1250, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker 900XP',               type:'jet',  tas:448, pax:8,  range:2594, initK:8500,  fixK:240,  varH:1300, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Hawker Hunter F.58',                    type:'jet',    tas:400,  pax:1,   range:1200,  initK:900,    fixK:200,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Hawker Hurricane Mk.IIB',               type:'piston', tas:180,  pax:1,   range:500,   initK:3200,   fixK:140,   varH:1100,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Hawker Sea Fury ───────────────────────────────────────────────
  { name:'Hawker Sea Fury FB.11',                 type:'piston', tas:250,  pax:1,   range:700,   initK:2500,   fixK:140,   varH:1050,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Hawker Siddeley ───────────────────────────────────────────────
  { name:'Hawker Siddeley HS.748',                type:'turbo',  tas:240,  pax:48,  range:1000,  initK:400,    fixK:250,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Hawker Siddeley Trident 2E',            type:'jet',    tas:480,  pax:115, range:2000,  initK:250,    fixK:550,   varH:3200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },

  // ── Heli-Sport ────────────────────────────────────────────────────
  { name:'Heli-Sport CH-7 Kompress',              type:'piston', tas:90,   pax:1,   range:180,   initK:70,     fixK:8,     varH:60,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Heli-Sport CH-77 Ranabot',              type:'piston', tas:95,   pax:2,   range:200,   initK:110,    fixK:10,    varH:70,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Helicycle ─────────────────────────────────────────────────────
  { name:'Helicycle',                             type:'turbo',  tas:95,   pax:1,   range:200,   initK:100,    fixK:15,    varH:110,   rating:false,  fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Helio ─────────────────────────────────────────────────────────
  { name:'Helio H-295 Courier',                   type:'piston', tas:140,  pax:5,   range:700,   initK:180,    fixK:18,    varH:90,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Helio Courier ─────────────────────────────────────────────────
  { name:'Helio H-250 Courier',                   type:'piston', tas:130,  pax:4,   range:650,   initK:140,    fixK:16,    varH:82,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Helio H-391 Courier',                   type:'piston', tas:125,  pax:4,   range:620,   initK:120,    fixK:15,    varH:78,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Hiller ────────────────────────────────────────────────────────
  { name:'Hiller UH-12E',                         type:'piston', tas:85,   pax:3,   range:200,   initK:180,    fixK:24,    varH:190,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── HondaJet ──────────────────────────────────────────────────────
  { name:'HondaJet Elite',             type:'jet',  tas:420, pax:6,  range:1190, initK:5300,  fixK:135,  varH:790,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'HondaJet Elite II',          type:'jet',  tas:422, pax:6,  range:1226, initK:5500,  fixK:140,  varH:800,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'HondaJet Elite S',           type:'jet',  tas:425, pax:6,  range:1335, initK:5700,  fixK:142,  varH:810,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Howard ────────────────────────────────────────────────────────
  { name:'Howard DGA-15P',                        type:'piston', tas:160,  pax:5,   range:800,   initK:250,    fixK:18,    varH:90,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Howard DGA-6 Mister Mulligan',          type:'piston', tas:180,  pax:4,   range:700,   initK:400,    fixK:20,    varH:95,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Howard Divers ─────────────────────────────────────────────────
  { name:'Howard DGA-15W',                        type:'piston', tas:155,  pax:5,   range:780,   initK:230,    fixK:17,    varH:88,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── HpH ───────────────────────────────────────────────────────────
  { name:'HpH 304 Shark TS',                      type:'piston', tas:95,   pax:1,   range:380,   initK:110,    fixK:8,     varH:25,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'HpH 304S Shark MS',                     type:'piston', tas:95,   pax:1,   range:400,   initK:130,    fixK:8,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Hughes ────────────────────────────────────────────────────────
  { name:'Hughes 269A',                           type:'piston', tas:80,   pax:2,   range:190,   initK:150,    fixK:22,    varH:165,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Hughes 269C',                           type:'piston', tas:86,   pax:3,   range:200,   initK:220,    fixK:24,    varH:175,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Hughes OH-6 Cayuse',                    type:'turbo',  tas:125,  pax:4,   range:260,   initK:500,    fixK:60,    varH:440,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Humbert ───────────────────────────────────────────────────────
  { name:'Humbert Tetras',                        type:'piston', tas:90,   pax:2,   range:450,   initK:55,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Hummel ────────────────────────────────────────────────────────
  { name:'Hummel Bird',                           type:'piston', tas:90,   pax:1,   range:250,   initK:15,     fixK:3,     varH:14,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Hummel UltraCruiser',                   type:'piston', tas:85,   pax:1,   range:230,   initK:18,     fixK:3,     varH:15,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── IAI ───────────────────────────────────────────────────────────
  { name:'IAI 1125 Astra',             type:'jet',  tas:445, pax:8,  range:2478, initK:2500,  fixK:130,  varH:820,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'IAI Astra 1125SP',                      type:'jet',    tas:440,  pax:7,   range:3000,  initK:1500,   fixK:250,   varH:1900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'IAI Astra SPX',              type:'jet',  tas:450, pax:8,  range:2555, initK:3800,  fixK:140,  varH:850,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'IAI Galaxy 1125',            type:'jet',  tas:459, pax:9,  range:3220, initK:5500,  fixK:180,  varH:950,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'IAI Westwind 1123',          type:'jet',  tas:425, pax:8,  range:1688, initK:600,   fixK:95,   varH:700,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'IAI Westwind 1124',          type:'jet',  tas:430, pax:8,  range:1805, initK:800,   fixK:100,  varH:720,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── IAR ───────────────────────────────────────────────────────────
  { name:'IAR-46',                                type:'piston', tas:110,  pax:2,   range:500,   initK:60,     fixK:7,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'IAR-823',                               type:'piston', tas:145,  pax:5,   range:700,   initK:70,     fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── ICA ───────────────────────────────────────────────────────────
  { name:'ICA IS-28M2',                           type:'piston', tas:95,   pax:2,   range:400,   initK:35,     fixK:6,     varH:24,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Icon ──────────────────────────────────────────────────────────
  { name:'Icon A5 Amphibious',         type:'piston',tas:84,  pax:2,  range:364,  initK:389,   fixK:14,   varH:45,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── ICP ───────────────────────────────────────────────────────────
  { name:'ICP Savannah S',                        type:'piston', tas:95,   pax:2,   range:500,   initK:70,     fixK:5,     varH:25,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'ICP Ventura',                           type:'piston', tas:120,  pax:2,   range:650,   initK:120,    fixK:6,     varH:29,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── ICP Divers ────────────────────────────────────────────────────
  { name:'ICP Bingo 4S',                          type:'piston', tas:125,  pax:2,   range:600,   initK:90,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'ICP Savannah VG XL',                    type:'piston', tas:100,  pax:2,   range:520,   initK:80,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Ilyushin ──────────────────────────────────────────────────────
  { name:'Ilyushin Il-114',                       type:'turbo',  tas:270,  pax:64,  range:540,   initK:3000,   fixK:300,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Ilyushin Il-14',                        type:'piston', tas:170,  pax:32,  range:900,   initK:300,    fixK:55,    varH:300,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },
  { name:'Ilyushin Il-18',                        type:'turbo',  tas:340,  pax:100, range:2000,  initK:400,    fixK:350,   varH:1900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Ilyushin Il-62M',                       type:'jet',    tas:470,  pax:174, range:5200,  initK:300,    fixK:700,   varH:4500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Ilyushin Il-76TD',                      type:'jet',    tas:420,  pax:90,  range:2400,  initK:3000,   fixK:700,   varH:4200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Ilyushin Il-86',                        type:'jet',    tas:490,  pax:320, range:2200,  initK:400,    fixK:900,   varH:6000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Ilyushin Il-96-300',                    type:'jet',    tas:470,  pax:300, range:6200,  initK:3000,   fixK:1200,  varH:5500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── Interplane ────────────────────────────────────────────────────
  { name:'Interplane Skyboy',                     type:'piston', tas:95,   pax:2,   range:450,   initK:45,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Interstate ────────────────────────────────────────────────────
  { name:'Interstate L-6 Cadet',                  type:'piston', tas:90,   pax:2,   range:300,   initK:55,     fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Jabiru ────────────────────────────────────────────────────────
  { name:'Jabiru J160',                           type:'piston', tas:105,  pax:2,   range:550,   initK:60,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Jabiru J230',                           type:'piston', tas:120,  pax:2,   range:700,   initK:75,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Jabiru J430',                           type:'piston', tas:120,  pax:4,   range:700,   initK:85,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Javelin ───────────────────────────────────────────────────────
  { name:'Javelin Wichawk',                       type:'piston', tas:110,  pax:2,   range:400,   initK:45,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Jihlavan ──────────────────────────────────────────────────────
  { name:'Jihlavan KP-2U Rapid',                  type:'piston', tas:120,  pax:2,   range:600,   initK:70,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Jihlavan KP-5 Skyleader 500',           type:'piston', tas:130,  pax:2,   range:700,   initK:95,     fixK:7,     varH:29,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── JMB ───────────────────────────────────────────────────────────
  { name:'JMB VL-3 915iS',                        type:'piston', tas:155,  pax:2,   range:800,   initK:280,    fixK:8,     varH:35,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'JMB VL-3 Evolution',                    type:'piston', tas:145,  pax:2,   range:750,   initK:220,    fixK:7,     varH:32,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Jodel ─────────────────────────────────────────────────────────
  { name:'Jodel D.112 Club',                      type:'piston', tas:95,   pax:2,   range:350,   initK:30,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jodel D.117 Grand Tourisme',            type:'piston', tas:100,  pax:2,   range:400,   initK:35,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jodel D.119',                           type:'piston', tas:100,  pax:2,   range:420,   initK:35,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jodel D.140 Mousquetaire',              type:'piston', tas:125,  pax:4,   range:700,   initK:60,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jodel D.150 Mascaret',                  type:'piston', tas:115,  pax:2,   range:500,   initK:45,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jodel D.18',                            type:'piston', tas:105,  pax:1,   range:400,   initK:30,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jodel DR.1050 Ambassadeur',             type:'piston', tas:115,  pax:4,   range:600,   initK:45,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jodel DR.1051 Sicile',                  type:'piston', tas:120,  pax:4,   range:620,   initK:50,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Jodel Homebuilt ───────────────────────────────────────────────
  { name:'Jodel D.11',                            type:'piston', tas:95,   pax:2,   range:350,   initK:28,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jodel D.20',                            type:'piston', tas:110,  pax:2,   range:400,   initK:35,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jodel D.9 Bebe',                        type:'piston', tas:85,   pax:1,   range:250,   initK:22,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Jonker ────────────────────────────────────────────────────────
  { name:'Jonker JS1-C TJ',                       type:'jet',    tas:95,   pax:1,   range:400,   initK:180,    fixK:9,     varH:40,    rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Jonker JS3 Rapture RES',                type:'piston', tas:95,   pax:1,   range:420,   initK:200,    fixK:10,    varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Junkers ───────────────────────────────────────────────────────
  { name:'Junkers Ju 52/3m',                      type:'piston', tas:110,  pax:17,  range:500,   initK:1800,   fixK:90,    varH:550,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:3 },

  // ── Jurca ─────────────────────────────────────────────────────────
  { name:'Jurca MJ-2 Tempete',                    type:'piston', tas:130,  pax:1,   range:400,   initK:35,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jurca MJ-5 Sirocco',                    type:'piston', tas:145,  pax:2,   range:500,   initK:45,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Jurca MJ-77 Gnatsum',                   type:'piston', tas:200,  pax:1,   range:600,   initK:180,    fixK:12,    varH:60,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Just ──────────────────────────────────────────────────────────
  { name:'Just Aircraft Escapade',     type:'piston',tas:90,  pax:2,  range:332,  initK:52,    fixK:7,    varH:32,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Just Aircraft Highlander',   type:'piston',tas:85,  pax:2,  range:356,  initK:58,    fixK:7,    varH:33,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Just Aircraft SuperSTOL',    type:'piston',tas:78,  pax:2,  range:422,  initK:46,    fixK:7,    varH:31,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Just Aircraft SuperSTOL XL', type:'piston',tas:75,  pax:2,  range:444,  initK:48,    fixK:7,    varH:32,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Kaman ─────────────────────────────────────────────────────────
  { name:'Kaman K-1200 K-Max',                    type:'turbo',  tas:80,   pax:1,   range:267,   initK:5000,   fixK:250,   varH:2000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Kamov ─────────────────────────────────────────────────────────
  { name:'Kamov Ka-226T',                         type:'turbo',  tas:115,  pax:7,   range:320,   initK:3000,   fixK:140,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Kamov Ka-26',                           type:'piston', tas:90,   pax:6,   range:220,   initK:150,    fixK:50,    varH:400,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Kamov Ka-32A11BC',                      type:'turbo',  tas:130,  pax:16,  range:430,   initK:4000,   fixK:320,   varH:2400,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Kamov Militaire ───────────────────────────────────────────────
  { name:'Kamov Ka-27',                           type:'turbo',  tas:135,  pax:16,  range:430,   initK:2000,   fixK:300,   varH:2200,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Kappa ─────────────────────────────────────────────────────────
  { name:'Kappa 77 KP-2U Sova',                   type:'piston', tas:115,  pax:2,   range:600,   initK:60,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Kazan ─────────────────────────────────────────────────────────
  { name:'Kazan Ansat',                           type:'turbo',  tas:150,  pax:9,   range:280,   initK:3500,   fixK:160,   varH:1000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Kitfox ────────────────────────────────────────────────────────
  { name:'Kitfox Series 5',            type:'piston',tas:95,  pax:2,  range:429,  initK:38,    fixK:7,    varH:30,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Kitfox Series 5 Outback',               type:'piston', tas:100,  pax:2,   range:480,   initK:55,     fixK:6,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Kitfox Series 6',            type:'piston',tas:100, pax:2,  range:475,  initK:45,    fixK:7,    varH:32,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Kitfox Series 7 STi',        type:'piston',tas:105, pax:2,  range:521,  initK:55,    fixK:8,    varH:35,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Kitfox Series 7 Super Sport',           type:'piston', tas:115,  pax:2,   range:550,   initK:95,     fixK:7,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Kitfox Speedster',           type:'piston',tas:118, pax:2,  range:532,  initK:62,    fixK:8,    varH:36,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Kitfox STi',                            type:'piston', tas:110,  pax:2,   range:520,   initK:120,    fixK:7,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Kitfox Super Sport',         type:'piston',tas:110, pax:2,  range:498,  initK:58,    fixK:8,    varH:34,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Klemm ─────────────────────────────────────────────────────────
  { name:'Klemm Kl 35D',                          type:'piston', tas:95,   pax:2,   range:400,   initK:110,    fixK:10,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Kolb ──────────────────────────────────────────────────────────
  { name:'Kolb Firestar II',                      type:'piston', tas:70,   pax:1,   range:250,   initK:25,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Kolb Twinstar Mk III',                  type:'piston', tas:75,   pax:2,   range:280,   initK:35,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Konner ────────────────────────────────────────────────────────
  { name:'Konner K1',                             type:'turbo',  tas:105,  pax:2,   range:300,   initK:400,    fixK:40,    varH:280,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Lake ──────────────────────────────────────────────────────────
  { name:'Lake LA-200 Skimmer',        type:'piston',tas:125, pax:4,  range:456,  initK:85,    fixK:15,   varH:70,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lake LA-250 Renegade',       type:'piston',tas:130, pax:4,  range:502,  initK:120,   fixK:16,   varH:75,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lake LA-4 Buccaneer',        type:'piston',tas:120, pax:4,  range:410,  initK:65,    fixK:14,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lake LA-4-200 Buccaneer',               type:'piston', tas:120,  pax:4,   range:600,   initK:90,     fixK:12,    varH:52,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Lake Renegade 250',                     type:'piston', tas:135,  pax:6,   range:700,   initK:160,    fixK:15,    varH:62,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Lake Renegade Seafury 270',  type:'piston',tas:140, pax:4,  range:545,  initK:170,   fixK:18,   varH:82,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Lancair ───────────────────────────────────────────────────────
  { name:'Lancair 235',                           type:'piston', tas:175,  pax:2,   range:700,   initK:45,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Lancair 320',                type:'piston',tas:210, pax:2,  range:642,  initK:60,    fixK:11,   varH:55,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lancair 360',                type:'piston',tas:225, pax:2,  range:731,  initK:70,    fixK:12,   varH:58,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lancair ES',                 type:'piston',tas:230, pax:4,  range:828, initK:110,   fixK:13,   varH:60,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lancair Evolution',                     type:'turbo',  tas:290,  pax:4,   range:1500,  initK:900,    fixK:60,    varH:280,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Lancair Evolution Piston',   type:'piston',tas:270, pax:4,  range:998, initK:750,   fixK:26,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lancair Evolution Turbine',  type:'turbo', tas:300, pax:4,  range:1150, initK:1400,  fixK:80,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Lancair IV',                            type:'piston', tas:275,  pax:4,   range:1300,  initK:180,    fixK:14,    varH:70,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Lancair IV-P pressurized',   type:'piston',tas:262, pax:4,  range:1151, initK:280,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Lancair Legacy',                        type:'piston', tas:240,  pax:2,   range:1100,  initK:150,    fixK:11,    varH:55,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Lancair Legacy RG',          type:'piston',tas:240, pax:2,  range:920, initK:120,   fixK:14,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Laser ─────────────────────────────────────────────────────────
  { name:'Laser Z230',                            type:'piston', tas:155,  pax:1,   range:380,   initK:90,     fixK:10,    varH:52,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Learjet ───────────────────────────────────────────────────────
  { name:'Learjet 23',                 type:'jet',  tas:465, pax:6,  range:1268, initK:250,   fixK:110,  varH:750,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 24',                 type:'jet',  tas:465, pax:6,  range:1368, initK:280,   fixK:115,  varH:760,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 25',                 type:'jet',  tas:465, pax:8,  range:1668, initK:320,   fixK:120,  varH:790,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 25D',                           type:'jet',    tas:460,  pax:8,   range:1400,  initK:400,    fixK:130,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Learjet 28',                 type:'jet',  tas:463, pax:8,  range:1868, initK:500,   fixK:130,  varH:820,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 29 Longhorn',                   type:'jet',    tas:460,  pax:6,   range:2400,  initK:450,    fixK:140,   varH:1550,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Learjet 31A',                type:'jet',  tas:464, pax:7,  range:1252, initK:1800,  fixK:130,  varH:800,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 35A',                type:'jet',  tas:464, pax:7,  range:2292, initK:2200,  fixK:150,  varH:880,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 36',                 type:'jet',  tas:464, pax:6,  range:2668, initK:2000,  fixK:150,  varH:870,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 40',                 type:'jet',  tas:464, pax:8,  range:1488, initK:4500,  fixK:170,  varH:900,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 45XR',               type:'jet',  tas:464, pax:9,  range:1968, initK:6000,  fixK:180,  varH:950,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 54',                            type:'jet',    tas:450,  pax:8,   range:2500,  initK:500,    fixK:160,   varH:1700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Learjet 55',                            type:'jet',    tas:450,  pax:8,   range:2200,  initK:600,    fixK:170,   varH:1750,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Learjet 55C',                type:'jet',  tas:464, pax:8,  range:2418, initK:3500,  fixK:165,  varH:920,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 60XR',               type:'jet',  tas:464, pax:9,  range:2408, initK:7500,  fixK:190,  varH:1000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 65',                            type:'jet',    tas:450,  pax:8,   range:2600,  initK:700,    fixK:180,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Learjet 70',                 type:'jet',  tas:465, pax:9,  range:1828, initK:11500, fixK:220,  varH:1150, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Learjet 75 Liberty',         type:'jet',  tas:465, pax:9,  range:1808, initK:13000, fixK:240,  varH:1250, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Learjet Classiques ────────────────────────────────────────────
  { name:'Learjet 24D',                           type:'jet',    tas:460,  pax:6,   range:1400,  initK:300,    fixK:125,   varH:1450,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Learjet 28 Longhorn',                   type:'jet',    tas:460,  pax:8,   range:1500,  initK:400,    fixK:135,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Learjet 36A',                           type:'jet',    tas:460,  pax:6,   range:2800,  initK:700,    fixK:165,   varH:1700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Legal Eagle ───────────────────────────────────────────────────
  { name:'Legal Eagle XL',                        type:'piston', tas:65,   pax:1,   range:180,   initK:12,     fixK:2,     varH:12,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Leonardo ──────────────────────────────────────────────────────
  { name:'Agusta A109A',                          type:'turbo',  tas:145,  pax:7,   range:300,   initK:500,    fixK:130,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Agusta A109C',                          type:'turbo',  tas:150,  pax:7,   range:350,   initK:700,    fixK:150,   varH:1000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Agusta A109E Power',                    type:'turbo',  tas:154,  pax:7,   range:430,   initK:1800,   fixK:180,   varH:1200,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Leonardo AW09',                         type:'turbo',  tas:140,  pax:7,   range:430,   initK:3500,   fixK:120,   varH:700,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Leonardo AW101 Merlin',                 type:'turbo',  tas:150,  pax:30,  range:750,   initK:25000,  fixK:700,   varH:4000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:3, category:'helicopter' },
  { name:'Leonardo AW109 GrandNew',               type:'turbo',  tas:154,  pax:7,   range:464,   initK:4500,   fixK:200,   varH:1300,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Leonardo AW119Kx Koala',                type:'turbo',  tas:135,  pax:7,   range:500,   initK:3000,   fixK:110,   varH:700,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Leonardo AW139',                        type:'turbo',  tas:165,  pax:15,  range:573,   initK:9000,   fixK:350,   varH:2200,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Leonardo AW169',                        type:'turbo',  tas:145,  pax:10,  range:430,   initK:8500,   fixK:300,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Leonardo AW189',                        type:'turbo',  tas:150,  pax:16,  range:460,   initK:14000,  fixK:400,   varH:2600,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Let ───────────────────────────────────────────────────────────
  { name:'Let L-410 UVP-E20',                     type:'turbo',  tas:200,  pax:19,  range:700,   initK:1500,   fixK:250,   varH:500,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── LET ───────────────────────────────────────────────────────────
  { name:'LET L-200 Morava',                      type:'piston', tas:155,  pax:5,   range:900,   initK:60,     fixK:16,    varH:78,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Little Wing ───────────────────────────────────────────────────
  { name:'Little Wing LW-5',                      type:'piston', tas:85,   pax:2,   range:300,   initK:60,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Lockheed ──────────────────────────────────────────────────────
  { name:'Lockheed JetStar II',                   type:'jet',    tas:440,  pax:10,  range:3200,  initK:800,    fixK:200,   varH:2500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Lockheed T-33A Shooting Star',          type:'jet',    tas:400,  pax:2,   range:1000,  initK:350,    fixK:100,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Lockheed Airliner ─────────────────────────────────────────────
  { name:'Lockheed L-1011 TriStar',               type:'jet',    tas:480,  pax:300, range:4250,  initK:1500,   fixK:1800,  varH:7000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'Lockheed L-1049 Constellation',         type:'piston', tas:270,  pax:95,  range:4000,  initK:1200,   fixK:150,   varH:900,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:4 },
  { name:'Lockheed L-188 Electra',                type:'turbo',  tas:320,  pax:98,  range:2200,  initK:250,    fixK:200,   varH:1200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── Lockheed Hercules ─────────────────────────────────────────────
  { name:'Lockheed C-130H Hercules',              type:'turbo',  tas:320,  pax:92,  range:2050,  initK:8000,   fixK:900,   varH:4500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Lockheed L-100-30',                     type:'turbo',  tas:320,  pax:92,  range:2100,  initK:6000,   fixK:850,   varH:4200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── Loehle ────────────────────────────────────────────────────────
  { name:'Loehle 5151 Mustang',                   type:'piston', tas:100,  pax:1,   range:300,   initK:45,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Long-EZ Divers ────────────────────────────────────────────────
  { name:'Cozy Mk III',                           type:'piston', tas:175,  pax:3,   range:900,   initK:65,     fixK:8,     varH:40,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Rutan VariViggen SP',                   type:'piston', tas:155,  pax:2,   range:420,   initK:45,     fixK:6,     varH:31,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Luscombe ──────────────────────────────────────────────────────
  { name:'Luscombe 11A Sedan',                    type:'piston', tas:105,  pax:4,   range:450,   initK:50,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Luscombe 8A Silvaire',                  type:'piston', tas:95,   pax:2,   range:400,   initK:35,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Luscombe 8E Silvaire',                  type:'piston', tas:100,  pax:2,   range:420,   initK:40,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Luscombe Divers ───────────────────────────────────────────────
  { name:'Luscombe 8F Silvaire',                  type:'piston', tas:100,  pax:2,   range:430,   initK:45,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Luscombe T8F Observer',                 type:'piston', tas:95,   pax:2,   range:400,   initK:42,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Magnaghi ──────────────────────────────────────────────────────
  { name:'Magnaghi Sky Arrow 1450L',              type:'piston', tas:110,  pax:2,   range:550,   initK:110,    fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Magnaghi Sky Arrow 650',                type:'piston', tas:105,  pax:2,   range:500,   initK:85,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Magni ─────────────────────────────────────────────────────────
  { name:'Magni M16 Tandem Trainer',              type:'piston', tas:85,   pax:2,   range:270,   initK:70,     fixK:6,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },
  { name:'Magni M22 Voyager',                     type:'piston', tas:90,   pax:2,   range:300,   initK:85,     fixK:6,     varH:31,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },
  { name:'Magni M24 Orion',                       type:'piston', tas:90,   pax:2,   range:320,   initK:100,    fixK:7,     varH:33,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },

  // ── Marganski ─────────────────────────────────────────────────────
  { name:'Marganski Swift S-1 M',                 type:'piston', tas:110,  pax:1,   range:300,   initK:90,     fixK:7,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Marquart ──────────────────────────────────────────────────────
  { name:'Marquart MA-5 Charger',                 type:'piston', tas:105,  pax:2,   range:350,   initK:45,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Maule ─────────────────────────────────────────────────────────
  { name:'Maule M-4',                  type:'piston',tas:115, pax:4,  range:464,  initK:55,    fixK:10,   varH:48,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Maule M-4-210 Rocket',                  type:'piston', tas:125,  pax:4,   range:550,   initK:60,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Maule M-5-210C Lunar Rocket',           type:'piston', tas:130,  pax:4,   range:600,   initK:70,     fixK:10,    varH:45,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Maule M-5-235 Lunar Rocket', type:'piston',tas:130, pax:4,  range:552,  initK:75,    fixK:11,   varH:55,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Maule M-6',                  type:'piston',tas:128, pax:4,  range:544,  initK:80,    fixK:11,   varH:56,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Maule M-6-235 Super Rocket',            type:'piston', tas:135,  pax:4,   range:650,   initK:85,     fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Maule M-7-235 Super Rocket', type:'piston',tas:132, pax:4,  range:601,  initK:185,   fixK:12,   varH:60,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Maule M-7-235B Super Rocket',           type:'piston', tas:135,  pax:4,   range:700,   initK:120,    fixK:11,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Maule M-7-260C',                        type:'piston', tas:130,  pax:4,   range:700,   initK:180,    fixK:12,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Maule M-7-420AC Orion',                 type:'turbo',  tas:165,  pax:4,   range:700,   initK:400,    fixK:45,    varH:190,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Maule M-9',                  type:'piston',tas:135, pax:4,  range:619,  initK:220,   fixK:13,   varH:62,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Maule MT-7-235',             type:'turbo', tas:170, pax:4,  range:715,  initK:280,   fixK:22,   varH:120,  rating:false, fuel:'Jet-A',  gear:'tailwheel',   engines:1 },
  { name:'Maule MX-7-180 Star Rocket',            type:'piston', tas:125,  pax:4,   range:600,   initK:95,     fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Maule MXT-7-180A Star Rocket',type:'piston',tas:130,pax:4,  range:502,  initK:165,   fixK:11,   varH:58,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Max Holste ────────────────────────────────────────────────────
  { name:'Max Holste MH.1521 Broussard',          type:'piston', tas:115,  pax:6,   range:620,   initK:120,    fixK:20,    varH:95,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── MBB ───────────────────────────────────────────────────────────
  { name:'MBB BK 117 B2',                         type:'turbo',  tas:135,  pax:10,  range:290,   initK:1500,   fixK:160,   varH:1000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'MBB BK 117 C1',                         type:'turbo',  tas:135,  pax:10,  range:300,   initK:1800,   fixK:165,   varH:1030,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'MBB BO 105 CB',                         type:'turbo',  tas:128,  pax:5,   range:300,   initK:600,    fixK:108,   varH:740,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'MBB BO 105 CBS',                        type:'turbo',  tas:130,  pax:5,   range:310,   initK:700,    fixK:110,   varH:750,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── McDonnell Douglas ─────────────────────────────────────────────
  { name:'McDonnell Douglas DC-10-30',            type:'jet',    tas:473,  pax:270, range:5800,  initK:2500,   fixK:2300,  varH:8000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'McDonnell Douglas DC-9-30',             type:'jet',    tas:430,  pax:115, range:1700,  initK:700,    fixK:600,   varH:2700,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'McDonnell Douglas MD-11',               type:'jet',    tas:473,  pax:293, range:6840,  initK:5000,   fixK:2500,  varH:8500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'McDonnell Douglas MD-82',               type:'jet',    tas:440,  pax:155, range:2050,  initK:1200,   fixK:700,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'McDonnell Douglas MD-83',               type:'jet',    tas:440,  pax:155, range:2500,  initK:1500,   fixK:720,   varH:3050,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'McDonnell Douglas MD-87',               type:'jet',    tas:440,  pax:130, range:2900,  initK:1300,   fixK:700,   varH:2950,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'McDonnell Douglas MD-88',               type:'jet',    tas:440,  pax:155, range:2050,  initK:1400,   fixK:720,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'McDonnell Douglas MD-90',               type:'jet',    tas:440,  pax:153, range:2400,  initK:2000,   fixK:750,   varH:2900,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── MD Divers ─────────────────────────────────────────────────────
  { name:'MD 369E',                               type:'turbo',  tas:130,  pax:5,   range:260,   initK:750,    fixK:66,    varH:465,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'MD 500C',                               type:'turbo',  tas:125,  pax:5,   range:250,   initK:600,    fixK:62,    varH:450,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── MD Helicopters ────────────────────────────────────────────────
  { name:'MD 500D',                               type:'turbo',  tas:130,  pax:5,   range:260,   initK:700,    fixK:65,    varH:460,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'MD 500E',                               type:'turbo',  tas:130,  pax:5,   range:260,   initK:900,    fixK:70,    varH:480,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'MD 520N',                               type:'turbo',  tas:135,  pax:5,   range:260,   initK:1200,   fixK:80,    varH:520,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'MD 530F',                               type:'turbo',  tas:135,  pax:5,   range:230,   initK:1500,   fixK:85,    varH:540,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'MD 600N',                               type:'turbo',  tas:135,  pax:8,   range:320,   initK:1300,   fixK:100,   varH:620,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'MD 902 Explorer',                       type:'turbo',  tas:140,  pax:8,   range:300,   initK:2500,   fixK:160,   varH:1000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Messerschmitt ─────────────────────────────────────────────────
  { name:'Hispano HA-1112 Buchon',                type:'piston', tas:200,  pax:1,   range:450,   initK:3500,   fixK:150,   varH:1200,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Messerschmitt Bf 108 Taifun',           type:'piston', tas:145,  pax:4,   range:620,   initK:500,    fixK:20,    varH:90,    rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Messerschmitt Bf 109G',                 type:'piston', tas:210,  pax:1,   range:450,   initK:3500,   fixK:160,   varH:1250,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Meyers ────────────────────────────────────────────────────────
  { name:'Meyers 200D',                           type:'piston', tas:190,  pax:4,   range:900,   initK:90,     fixK:13,    varH:58,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Meyers OTW ────────────────────────────────────────────────────
  { name:'Meyers OTW-160',                        type:'piston', tas:95,   pax:2,   range:320,   initK:140,    fixK:12,    varH:58,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Mignet ────────────────────────────────────────────────────────
  { name:'Mignet HM.1000 Balerit',                type:'piston', tas:70,   pax:2,   range:250,   initK:30,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Mignet HM.14 Pou du Ciel',              type:'piston', tas:65,   pax:1,   range:180,   initK:12,     fixK:3,     varH:14,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Mignet HM.293',                         type:'piston', tas:70,   pax:1,   range:200,   initK:15,     fixK:3,     varH:15,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Mignet HM.360',                         type:'piston', tas:75,   pax:1,   range:220,   initK:18,     fixK:3,     varH:16,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Mikoyan ───────────────────────────────────────────────────────
  { name:'Mikoyan MiG-15UTI',                     type:'jet',    tas:350,  pax:2,   range:480,   initK:250,    fixK:90,    varH:1400,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Mikoyan MiG-17F',                       type:'jet',    tas:400,  pax:1,   range:700,   initK:300,    fixK:95,    varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Mikoyan MiG-21UM',                      type:'jet',    tas:450,  pax:2,   range:600,   initK:400,    fixK:120,   varH:2000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Mikoyan MiG-29UB',                      type:'jet',    tas:470,  pax:2,   range:700,   initK:2000,   fixK:300,   varH:4000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Mil ───────────────────────────────────────────────────────────
  { name:'Mil Mi-171',                            type:'turbo',  tas:135,  pax:26,  range:520,   initK:6000,   fixK:350,   varH:2400,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Mil Mi-2',                              type:'turbo',  tas:105,  pax:8,   range:310,   initK:250,    fixK:90,    varH:700,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Mil Mi-26',                             type:'turbo',  tas:125,  pax:90,  range:430,   initK:12000,  fixK:800,   varH:6000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Mil Mi-8MTV',                           type:'turbo',  tas:135,  pax:24,  range:500,   initK:2000,   fixK:300,   varH:2200,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Mil Militaire ─────────────────────────────────────────────────
  { name:'Mil Mi-14',                             type:'turbo',  tas:120,  pax:19,  range:430,   initK:800,    fixK:300,   varH:2400,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Mil Mi-24',                             type:'turbo',  tas:145,  pax:8,   range:240,   initK:3000,   fixK:350,   varH:2600,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Mil Mi-6',                              type:'turbo',  tas:135,  pax:65,  range:340,   initK:1500,   fixK:500,   varH:4000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Miles ─────────────────────────────────────────────────────────
  { name:'Miles M.14 Magister',                   type:'piston', tas:95,   pax:2,   range:380,   initK:90,     fixK:10,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Miles M.38 Messenger',                  type:'piston', tas:110,  pax:4,   range:460,   initK:80,     fixK:11,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Miles M.65 Gemini',                     type:'piston', tas:130,  pax:4,   range:700,   initK:100,    fixK:18,    varH:85,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Mitsubishi ────────────────────────────────────────────────────
  { name:'Mitsubishi Diamond I',       type:'jet',  tas:440, pax:8,  range:1680, initK:900,   fixK:115,  varH:770,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Mitsubishi Diamond IA',      type:'jet',  tas:445, pax:8,  range:1778, initK:1100,  fixK:120,  varH:780,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Mitsubishi MU-2 Mariner',    type:'turbo', tas:290, pax:6,  range:1005, initK:180,   fixK:62,   varH:350,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Mitsubishi MU-2 Marquise',   type:'turbo', tas:300, pax:8,  range:1150, initK:250,   fixK:70,   varH:380,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Mitsubishi MU-2 Solitaire',  type:'turbo', tas:295, pax:6,  range:1052, initK:200,   fixK:65,   varH:360,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Mitsubishi MU-2B-25 Solitaire',         type:'turbo',  tas:280,  pax:7,   range:1400,  initK:280,    fixK:58,    varH:265,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Mitsubishi MU-2B-36 Marquise',          type:'turbo',  tas:290,  pax:9,   range:1500,  initK:350,    fixK:62,    varH:280,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Mitsubishi MU-2B-60',        type:'turbo', tas:310, pax:8,  range:1195, initK:270,   fixK:72,   varH:390,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Mitsubishi Zero ───────────────────────────────────────────────
  { name:'Mitsubishi A6M Zero',                   type:'piston', tas:180,  pax:1,   range:900,   initK:3000,   fixK:150,   varH:1150,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Mong ──────────────────────────────────────────────────────────
  { name:'Mong Sport MS-1',                       type:'piston', tas:115,  pax:1,   range:280,   initK:28,     fixK:4,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Monocoupe ─────────────────────────────────────────────────────
  { name:'Monocoupe 110 Special',                 type:'piston', tas:165,  pax:2,   range:450,   initK:250,    fixK:16,    varH:78,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Monocoupe 90A',                         type:'piston', tas:130,  pax:2,   range:500,   initK:120,    fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Mooney ────────────────────────────────────────────────────────
  { name:'Mooney M20 Mark 21',         type:'piston',tas:148, pax:4,  range:739,  initK:38,    fixK:10,   varH:56,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20A',                           type:'piston', tas:145,  pax:4,   range:700,   initK:38,     fixK:10,    varH:45,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Mooney M20B',                           type:'piston', tas:145,  pax:4,   range:700,   initK:40,     fixK:10,    varH:45,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Mooney M20C Ranger',         type:'piston',tas:150, pax:4,  range:788,  initK:45,    fixK:11,   varH:60,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20D Master',                    type:'piston', tas:145,  pax:4,   range:700,   initK:42,     fixK:10,    varH:45,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Mooney M20E Chaparral',      type:'piston',tas:165, pax:4,  range:826,  initK:60,    fixK:12,   varH:64,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20F Executive',      type:'piston',tas:168, pax:4,  range:854,  initK:65,    fixK:12,   varH:66,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20G Statesman',                 type:'piston', tas:150,  pax:4,   range:750,   initK:52,     fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Mooney M20J 201',            type:'piston',tas:175, pax:4,  range:869, initK:120,   fixK:14,   varH:75,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20J 205',                       type:'piston', tas:175,  pax:4,   range:900,   initK:110,    fixK:13,    varH:55,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Mooney M20K 231',            type:'piston',tas:200, pax:4,  range:900, initK:150,   fixK:16,   varH:80,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20K 252 TSE',                   type:'piston', tas:195,  pax:4,   range:1000,  initK:130,    fixK:15,    varH:62,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Mooney M20K Encore',                    type:'piston', tas:197,  pax:4,   range:1000,  initK:150,    fixK:15,    varH:63,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Mooney M20L PFM',                       type:'piston', tas:180,  pax:4,   range:900,   initK:90,     fixK:14,    varH:58,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Mooney M20M Bravo',          type:'piston',tas:195, pax:4,  range:954, initK:280,   fixK:18,   varH:88,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20R Ovation 3',      type:'piston',tas:195, pax:4,  range:1054, initK:420,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20S Eagle',          type:'piston',tas:190, pax:4,  range:1008, initK:350,   fixK:19,   varH:92,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20TN Acclaim',                  type:'piston', tas:237,  pax:4,   range:1445,  initK:350,    fixK:20,    varH:82,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Mooney M20TN Acclaim S',     type:'piston',tas:220, pax:4,  range:1135, initK:680,   fixK:23,   varH:105,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Mooney M20U Ovation Ultra',             type:'piston', tas:197,  pax:4,   range:1100,  initK:600,    fixK:20,    varH:76,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Mooney M20V Acclaim Ultra',  type:'piston',tas:242, pax:4,  range:1178, initK:750,   fixK:25,   varH:110,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Morane-Saulnier ───────────────────────────────────────────────
  { name:'Morane-Saulnier MS.733 Alcyon',         type:'piston', tas:120,  pax:3,   range:500,   initK:90,     fixK:14,    varH:60,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Morane-Saulnier Rallye ────────────────────────────────────────
  { name:'Morane-Saulnier MS.880B Rallye Club',   type:'piston', tas:100,  pax:3,   range:480,   initK:30,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Morane-Saulnier MS.885 Super Rallye',   type:'piston', tas:105,  pax:4,   range:500,   initK:35,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Morane-Saulnier MS.893 Commodore',      type:'piston', tas:120,  pax:4,   range:600,   initK:45,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Morane-Saulnier MS.894 Minerva',        type:'piston', tas:125,  pax:4,   range:620,   initK:50,     fixK:8,     varH:40,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Mosquito ──────────────────────────────────────────────────────
  { name:'Mosquito XE',                           type:'piston', tas:75,   pax:1,   range:120,   initK:40,     fixK:6,     varH:50,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Mosquito XEL',                          type:'piston', tas:70,   pax:1,   range:100,   initK:35,     fixK:5,     varH:45,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Murphy ────────────────────────────────────────────────────────
  { name:'Murphy Elite',                          type:'piston', tas:115,  pax:2,   range:650,   initK:65,     fixK:6,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Murphy Maverick',                       type:'piston', tas:85,   pax:2,   range:380,   initK:45,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Murphy Moose',                          type:'piston', tas:130,  pax:5,   range:750,   initK:95,     fixK:8,     varH:40,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Murphy Rebel',                          type:'piston', tas:105,  pax:2,   range:600,   initK:55,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Murphy Renegade Spirit',                type:'piston', tas:90,   pax:2,   range:350,   initK:40,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Murphy Divers ─────────────────────────────────────────────────
  { name:'Murphy Radical',                        type:'piston', tas:140,  pax:2,   range:600,   initK:85,     fixK:7,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Murphy Super Rebel',                    type:'piston', tas:135,  pax:4,   range:700,   initK:110,    fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Mustang II ────────────────────────────────────────────────────
  { name:'Bushby Midget Mustang',                 type:'piston', tas:175,  pax:1,   range:400,   initK:40,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Bushby Mustang II',                     type:'piston', tas:180,  pax:2,   range:500,   initK:55,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── MX Aircraft ───────────────────────────────────────────────────
  { name:'MX Aircraft MX2',                       type:'piston', tas:172,  pax:2,   range:450,   initK:385,    fixK:17,    varH:88,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'MX Aircraft MXS',                       type:'piston', tas:175,  pax:1,   range:400,   initK:400,    fixK:17,    varH:90,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'MX Aircraft MXS-R',                     type:'piston', tas:180,  pax:1,   range:380,   initK:450,    fixK:18,    varH:95,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── NAMC ──────────────────────────────────────────────────────────
  { name:'NAMC YS-11',                            type:'turbo',  tas:250,  pax:60,  range:1000,  initK:250,    fixK:250,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Nanchang ──────────────────────────────────────────────────────
  { name:'Nanchang CJ-6A',                        type:'piston', tas:120,  pax:2,   range:380,   initK:150,    fixK:14,    varH:78,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Nando Groppo ──────────────────────────────────────────────────
  { name:'Nando Groppo Gitane',                   type:'piston', tas:95,   pax:2,   range:450,   initK:55,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Nardi ─────────────────────────────────────────────────────────
  { name:'Nardi FN.333 Riviera',                  type:'piston', tas:135,  pax:4,   range:600,   initK:70,     fixK:11,    varH:52,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Naval Aircraft Factory ────────────────────────────────────────
  { name:'Naval Aircraft Factory N3N',            type:'piston', tas:90,   pax:2,   range:350,   initK:180,    fixK:14,    varH:70,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Navion ────────────────────────────────────────────────────────
  { name:'Ryan Navion A',                         type:'piston', tas:150,  pax:4,   range:700,   initK:55,     fixK:11,    varH:50,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Ryan Navion Rangemaster',               type:'piston', tas:160,  pax:5,   range:1200,  initK:70,     fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Neiva ─────────────────────────────────────────────────────────
  { name:'Neiva P-56 Paulistinha',                type:'piston', tas:85,   pax:2,   range:300,   initK:30,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Neiva Divers ──────────────────────────────────────────────────
  { name:'Neiva N621 Universal',                  type:'piston', tas:140,  pax:4,   range:600,   initK:60,     fixK:12,    varH:52,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Nemesis ───────────────────────────────────────────────────────
  { name:'Nemesis NXT',                           type:'piston', tas:300,  pax:1,   range:700,   initK:250,    fixK:14,    varH:65,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Nesmith ───────────────────────────────────────────────────────
  { name:'Nesmith Cougar',                        type:'piston', tas:140,  pax:2,   range:450,   initK:32,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── NHI ───────────────────────────────────────────────────────────
  { name:'NHIndustries NH90',                     type:'turbo',  tas:160,  pax:20,  range:430,   initK:20000,  fixK:500,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Nicollier ─────────────────────────────────────────────────────
  { name:'Nicollier HN-433 Menestrel',            type:'piston', tas:95,   pax:1,   range:350,   initK:22,     fixK:4,     varH:19,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Nicollier HN-434 Super Menestrel',      type:'piston', tas:105,  pax:1,   range:380,   initK:26,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Nicollier HN-700 Menestrel II',         type:'piston', tas:105,  pax:1,   range:400,   initK:28,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Nieuport ──────────────────────────────────────────────────────
  { name:'Nieuport 11 Bebe replica',              type:'piston', tas:85,   pax:1,   range:200,   initK:90,     fixK:9,     varH:45,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Nieuport 17 replica',                   type:'piston', tas:90,   pax:1,   range:220,   initK:100,    fixK:9,     varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Nieuport 28 replica',                   type:'piston', tas:95,   pax:1,   range:230,   initK:120,    fixK:10,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Niki Rotor ────────────────────────────────────────────────────
  { name:'Niki Rotor Kallithea',                  type:'piston', tas:90,   pax:2,   range:300,   initK:80,     fixK:6,     varH:31,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },

  // ── Noorduyn ──────────────────────────────────────────────────────
  { name:'Noorduyn Norseman',                     type:'piston', tas:130,  pax:9,   range:900,   initK:250,    fixK:25,    varH:130,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Nord ──────────────────────────────────────────────────────────
  { name:'Nord 1002 Pingouin',                    type:'piston', tas:145,  pax:4,   range:560,   initK:90,     fixK:13,    varH:58,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Nord 1101 Noralpha',                    type:'piston', tas:155,  pax:4,   range:700,   initK:100,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Nord 3202',                             type:'piston', tas:110,  pax:2,   range:480,   initK:85,     fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Nord Airliner ─────────────────────────────────────────────────
  { name:'Nord 262',                              type:'turbo',  tas:215,  pax:29,  range:600,   initK:250,    fixK:180,   varH:620,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Nord Classiques ───────────────────────────────────────────────
  { name:'Nord 1203 Norecrin',                    type:'piston', tas:130,  pax:4,   range:600,   initK:40,     fixK:8,     varH:40,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── North American ────────────────────────────────────────────────
  { name:'North American F-86 Sabre',             type:'jet',    tas:450,  pax:1,   range:900,   initK:1200,   fixK:180,   varH:2500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'North American Harvard Mk.IV',          type:'piston', tas:140,  pax:2,   range:730,   initK:320,    fixK:22,    varH:128,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'North American P-51D Mustang',          type:'piston', tas:250,  pax:1,   range:1000,  initK:3000,   fixK:150,   varH:1200,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'North American Sabreliner 40',          type:'jet',    tas:430,  pax:7,   range:1600,  initK:400,    fixK:130,   varH:1600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'North American Sabreliner 60',          type:'jet',    tas:430,  pax:9,   range:1700,  initK:450,    fixK:140,   varH:1650,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'North American Sabreliner 65',          type:'jet',    tas:440,  pax:10,  range:2400,  initK:600,    fixK:160,   varH:1750,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'North American Sabreliner 80',          type:'jet',    tas:440,  pax:10,  range:2000,  initK:700,    fixK:170,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'North American SNJ-5',                  type:'piston', tas:140,  pax:2,   range:730,   initK:340,    fixK:22,    varH:128,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'North American T-6G Texan',             type:'piston', tas:140,  pax:2,   range:730,   initK:350,    fixK:22,    varH:130,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── North American Mitchell ───────────────────────────────────────
  { name:'North American B-25J Mitchell',         type:'piston', tas:190,  pax:6,   range:1350,  initK:2000,   fixK:130,   varH:900,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },

  // ── Northwing ─────────────────────────────────────────────────────
  { name:'Northwing Navajo Trike',                type:'piston', tas:60,   pax:2,   range:200,   initK:30,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── One Design ────────────────────────────────────────────────────
  { name:'One Design DR-107',                     type:'piston', tas:155,  pax:1,   range:400,   initK:70,     fixK:9,     varH:48,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Orlican ───────────────────────────────────────────────────────
  { name:'Orlican L-40 Meta Sokol',               type:'piston', tas:125,  pax:4,   range:600,   initK:35,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Osprey ────────────────────────────────────────────────────────
  { name:'Osprey II',                             type:'piston', tas:130,  pax:2,   range:400,   initK:35,     fixK:5,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── P&M Aviation ──────────────────────────────────────────────────
  { name:'P&M Aviation GT450',                    type:'piston', tas:65,   pax:2,   range:240,   initK:40,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'P&M Aviation Pegasus Quantum',          type:'piston', tas:55,   pax:2,   range:220,   initK:28,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'P&M Aviation Quik R',                   type:'piston', tas:70,   pax:2,   range:250,   initK:45,     fixK:5,     varH:21,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },
  { name:'P&M Aviation QuikR 912S',               type:'piston', tas:72,   pax:2,   range:260,   initK:50,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'trike' },

  // ── Pacific Aerospace ─────────────────────────────────────────────
  { name:'Pacific Aerospace P-750 XSTOL',         type:'turbo',  tas:145,  pax:9,   range:1000,  initK:1400,   fixK:90,    varH:420,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },

  // ── Partenavia ────────────────────────────────────────────────────
  { name:'Partenavia P.68B Victor',               type:'piston', tas:165,  pax:6,   range:1000,  initK:110,    fixK:22,    varH:105,   rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:2 },
  { name:'Partenavia P.68C',                      type:'piston', tas:170,  pax:6,   range:1100,  initK:160,    fixK:24,    varH:110,   rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:2 },

  // ── Partenavia Classiques ─────────────────────────────────────────
  { name:'Partenavia P.64 Oscar',                 type:'piston', tas:115,  pax:4,   range:550,   initK:40,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Partenavia P.66 Oscar 150',             type:'piston', tas:120,  pax:4,   range:580,   initK:45,     fixK:8,     varH:40,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Payne ─────────────────────────────────────────────────────────
  { name:'Payne Knight Twister',                  type:'piston', tas:145,  pax:1,   range:300,   initK:35,     fixK:5,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Percival ──────────────────────────────────────────────────────
  { name:'Percival Prentice',                     type:'piston', tas:110,  pax:3,   range:400,   initK:70,     fixK:11,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Percival Proctor',                      type:'piston', tas:130,  pax:4,   range:500,   initK:70,     fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Percival Provost T.1',                  type:'piston', tas:120,  pax:2,   range:650,   initK:180,    fixK:16,    varH:80,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Percival Vega Gull',                    type:'piston', tas:145,  pax:4,   range:600,   initK:150,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Phenom ────────────────────────────────────────────────────────
  { name:'Phenom 100',                 type:'jet',  tas:389, pax:5,  range:984, initK:4200,  fixK:98,   varH:600,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Phenom 300E',                type:'jet',  tas:453, pax:10, range:1745, initK:9800,  fixK:200,  varH:1050, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },

  // ── Piaggio ───────────────────────────────────────────────────────
  { name:'Piaggio P.149D',                        type:'piston', tas:140,  pax:4,   range:660,   initK:70,     fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piaggio P.166',                         type:'piston', tas:180,  pax:8,   range:1000,  initK:200,    fixK:35,    varH:190,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piaggio P.180 Avanti II',               type:'turbo',  tas:400,  pax:7,   range:1720,  initK:3200,   fixK:260,   varH:1100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Piel ──────────────────────────────────────────────────────────
  { name:'Piel CP.1310 Super Emeraude',           type:'piston', tas:115,  pax:2,   range:470,   initK:38,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piel CP.301 Emeraude',                  type:'piston', tas:105,  pax:2,   range:430,   initK:30,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Piel Homebuilt ────────────────────────────────────────────────
  { name:'Piel CP.150 Onyx',                      type:'piston', tas:110,  pax:2,   range:400,   initK:32,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piel CP.60 Diamant',                    type:'piston', tas:130,  pax:3,   range:500,   initK:38,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piel CP.80 Zef',                        type:'piston', tas:150,  pax:1,   range:300,   initK:28,     fixK:4,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Pietenpol ─────────────────────────────────────────────────────
  { name:'Pietenpol Air Camper',                  type:'piston', tas:75,   pax:2,   range:250,   initK:25,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Pietenpol Divers ──────────────────────────────────────────────
  { name:'Pietenpol Sky Scout',                   type:'piston', tas:70,   pax:1,   range:200,   initK:20,     fixK:3,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Pilatus ───────────────────────────────────────────────────────
  { name:'Pilatus P-2',                           type:'piston', tas:130,  pax:2,   range:480,   initK:220,    fixK:16,    varH:85,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Pilatus P-3',                           type:'piston', tas:135,  pax:2,   range:570,   initK:180,    fixK:16,    varH:82,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Pilatus PC-12',              type:'turbo', tas:280, pax:9,  range:1560, initK:3800,  fixK:110,  varH:600,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Pilatus PC-12 NG',           type:'turbo', tas:283, pax:9,  range:1658, initK:4300,  fixK:115,  varH:625,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Pilatus PC-12 NGX',          type:'turbo', tas:285, pax:9,  range:1703, initK:4800,  fixK:120,  varH:650,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Pilatus PC-21',              type:'turbo', tas:270, pax:2,  range:615,  initK:12000, fixK:250,  varH:1100, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Pilatus PC-24',              type:'jet',   tas:440, pax:10, range:1780, initK:10500, fixK:210,  varH:1100, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Pilatus PC-6 Porter',        type:'turbo', tas:130, pax:10, range:535,  initK:1400,  fixK:80,   varH:420,  rating:false, fuel:'Jet-A',  gear:'tailwheel',   engines:1 },
  { name:'Pilatus PC-6 Turbo Porter',             type:'turbo',  tas:125,  pax:10,  range:500,   initK:900,    fixK:55,    varH:260,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Pilatus PC-7',               type:'turbo', tas:270, pax:2,  range:665,  initK:2200,  fixK:100,  varH:520,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Pilatus PC-9',               type:'turbo', tas:310, pax:2,  range:745,  initK:3500,  fixK:130,  varH:620,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Pilatus PC-9M',                         type:'turbo',  tas:230,  pax:2,   range:800,   initK:1500,   fixK:80,    varH:380,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Pilatus PC-7 ──────────────────────────────────────────────────
  { name:'Pilatus PC-7 Turbo Trainer',            type:'turbo',  tas:210,  pax:2,   range:700,   initK:900,    fixK:70,    varH:340,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Piper ─────────────────────────────────────────────────────────
  { name:'Piper Aerostar 601P',                   type:'piston', tas:220,  pax:6,   range:1200,  initK:150,    fixK:28,    varH:135,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper Apache PA-23',         type:'piston',tas:130, pax:3,  range:602,  initK:28,    fixK:12,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Archer III PA-28-181', type:'piston',tas:122, pax:4,  range:428,  initK:170,   fixK:11,   varH:54,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Arrow II PA-28R-200',  type:'piston',tas:140, pax:4,  range:615,  initK:95,    fixK:12,   varH:62,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Arrow III PA-28R-201', type:'piston',tas:143, pax:4,  range:633,  initK:110,   fixK:13,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Arrow IV PA-28R-201',  type:'piston',tas:145, pax:4,  range:641,  initK:120,   fixK:13,   varH:68,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Aztec F PA-23-250',    type:'piston',tas:175, pax:5,  range:999, initK:120,   fixK:22,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Cherokee 140 PA-28-140',type:'piston',tas:112, pax:4, range:396,  initK:42,    fixK:8,    varH:42,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Cherokee 180 PA-28-180',type:'piston',tas:118, pax:4, range:412,  initK:50,    fixK:9,    varH:45,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Cherokee 235 PA-28-235',          type:'piston', tas:130,  pax:4,   range:700,   initK:75,     fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Cherokee 235 PA-32-260',type:'piston',tas:145, pax:6, range:791,  initK:75,    fixK:15,   varH:75,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Cherokee Six 300 PA-32-300',      type:'piston', tas:140,  pax:6,   range:750,   initK:85,     fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Cherokee Six PA-32',   type:'piston',tas:140, pax:6,  range:745,  initK:70,    fixK:14,   varH:72,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Cheyenne 400LS',       type:'turbo', tas:320, pax:9,  range:1900, initK:1400,  fixK:130,  varH:580,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Piper Cheyenne I PA-31T',    type:'turbo', tas:249, pax:7,  range:1076, initK:400,   fixK:75,   varH:400,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Piper Cheyenne II XL',       type:'turbo', tas:283, pax:7,  range:1258, initK:600,   fixK:85,   varH:440,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Piper Cheyenne III PA-42',              type:'turbo',  tas:280,  pax:9,   range:1600,  initK:700,    fixK:70,    varH:300,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Piper Cheyenne IIIA',        type:'turbo', tas:290, pax:9,  range:1755, initK:900,   fixK:110,  varH:520,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Piper Colt PA-22-108',       type:'piston',tas:100, pax:2,  range:325,  initK:22,    fixK:6,    varH:28,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Comanche 260 PA-24-260',          type:'piston', tas:165,  pax:4,   range:900,   initK:80,     fixK:13,    varH:58,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piper Comanche 400 PA-24-400',          type:'piston', tas:190,  pax:4,   range:1000,  initK:120,    fixK:16,    varH:75,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piper Comanche PA-24',       type:'piston',tas:155, pax:4,  range:784,  initK:65,    fixK:12,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Cub PA-11',            type:'piston',tas:75,  pax:2,  range:194,  initK:25,    fixK:5,    varH:22,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Piper Dakota PA-28-236',     type:'piston',tas:140, pax:4,  range:645,  initK:78,    fixK:14,   varH:70,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Lance II PA-32RT-300',            type:'piston', tas:150,  pax:6,   range:800,   initK:100,    fixK:13,    varH:58,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piper Lance PA-32R',         type:'piston',tas:148, pax:6,  range:689,  initK:90,    fixK:15,   varH:78,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper M350',                            type:'piston', tas:213,  pax:6,   range:1343,  initK:1200,   fixK:30,    varH:105,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piper M500',                 type:'turbo', tas:260, pax:5,  range:870, initK:2600,  fixK:75,   varH:430,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Piper M600/SLS',             type:'turbo', tas:274, pax:5,  range:1347, initK:3200,  fixK:85,   varH:480,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Piper M700 Fury',                       type:'turbo',  tas:301,  pax:6,   range:1852,  initK:4200,   fixK:90,    varH:350,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Piper Malibu Matrix PA-46',  type:'piston',tas:190, pax:6,  range:858, initK:850,   fixK:26,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Malibu Mirage PA-46',  type:'piston',tas:213, pax:6,  range:1183, initK:1100,  fixK:30,   varH:135,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Malibu PA-46-310P',    type:'piston',tas:200, pax:6,  range:1050, initK:650,   fixK:26,   varH:118,  rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Navajo Chieftain PA-31-350',type:'piston',tas:175,pax:9,range:669,initK:300,   fixK:28,   varH:120,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Navajo PA-31-310',     type:'piston',tas:207, pax:7,  range:857, initK:120,   fixK:24,   varH:110,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Navajo Pressurized PA-31P',type:'piston',tas:215,pax:7,range:989,initK:200,   fixK:27,   varH:118,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper PA-12 Super Cruiser',             type:'piston', tas:95,   pax:3,   range:500,   initK:60,     fixK:8,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-14 Family Cruiser',            type:'piston', tas:100,  pax:4,   range:480,   initK:70,     fixK:8,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-16 Clipper',                   type:'piston', tas:95,   pax:2,   range:450,   initK:45,     fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-25 Pawnee',                    type:'piston', tas:100,  pax:1,   range:300,   initK:50,     fixK:10,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-36 Pawnee Brave',              type:'piston', tas:110,  pax:1,   range:350,   initK:70,     fixK:12,    varH:58,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper Pacer PA-20',          type:'piston',tas:105, pax:4,  range:371,  initK:38,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Piper Saratoga PA-32R-301',  type:'piston',tas:155, pax:6,  range:734,  initK:180,   fixK:18,   varH:85,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Saratoga Turbo PA-32R-301T',type:'piston',tas:175,pax:6,range:869,initK:220,  fixK:20,   varH:92,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Seminole PA-44',       type:'piston',tas:150, pax:3,  range:588,  initK:170,   fixK:16,   varH:75,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Seneca I PA-34-200',   type:'piston',tas:170, pax:6,  range:672,  initK:110,   fixK:19,   varH:88,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Seneca II PA-34-200T', type:'piston',tas:180, pax:6,  range:715,  initK:150,   fixK:20,   varH:92,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Seneca III PA-34-220T',type:'piston',tas:185, pax:6,  range:741,  initK:280,   fixK:21,   varH:96,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Seneca IV PA-34-220T',            type:'piston', tas:175,  pax:6,   range:900,   initK:180,    fixK:24,    varH:115,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper Seneca V PA-34',       type:'piston',tas:190, pax:6,  range:758,  initK:500,   fixK:22,   varH:100,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Super Cub PA-18',      type:'piston',tas:100, pax:2,  range:325,  initK:80,    fixK:7,    varH:28,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Piper Tomahawk PA-38',       type:'piston',tas:100, pax:2,  range:375,  initK:28,    fixK:7,    varH:35,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Tri-Pacer PA-22',      type:'piston',tas:108, pax:4,  range:399,  initK:42,    fixK:8,    varH:40,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Piper Turbo Arrow PA-28RT-201T',type:'piston',tas:158,pax:4,range:682,  initK:130,   fixK:14,   varH:72,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Piper Twin Comanche C PA-30',           type:'piston', tas:165,  pax:4,   range:900,   initK:75,     fixK:18,    varH:88,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper Twin Comanche PA-30',  type:'piston',tas:165, pax:3,  range:646,  initK:60,    fixK:14,   varH:70,   rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Piper Vagabond PA-15',       type:'piston',tas:90,  pax:2,  range:232,  initK:20,    fixK:5,    varH:22,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Piper Warrior II PA-28-161',            type:'piston', tas:110,  pax:4,   range:520,   initK:70,     fixK:9,     varH:40,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Warrior III PA-28-161',type:'piston',tas:110, pax:4,  range:438,  initK:125,   fixK:11,   varH:52,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Piper Agricole ────────────────────────────────────────────────
  { name:'Piper PA-25-235 Pawnee',                type:'piston', tas:105,  pax:1,   range:300,   initK:55,     fixK:11,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-25-260 Pawnee D',              type:'piston', tas:110,  pax:1,   range:320,   initK:65,     fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-36-300 Brave',                 type:'piston', tas:115,  pax:1,   range:350,   initK:75,     fixK:13,    varH:60,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-36-375 Brave',                 type:'piston', tas:120,  pax:1,   range:380,   initK:85,     fixK:14,    varH:65,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Piper Classiques ──────────────────────────────────────────────
  { name:'Piper 6X PA-32-301FT',                  type:'piston', tas:155,  pax:6,   range:700,   initK:250,    fixK:15,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper 6XT PA-32-301XTC',                type:'piston', tas:175,  pax:6,   range:750,   initK:290,    fixK:17,    varH:70,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Comanche 180 PA-24-180',          type:'piston', tas:145,  pax:4,   range:750,   initK:60,     fixK:12,    varH:52,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piper Comanche 250 PA-24-250',          type:'piston', tas:160,  pax:4,   range:850,   initK:70,     fixK:13,    varH:56,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piper J-3 Cub',                         type:'piston', tas:75,   pax:2,   range:220,   initK:55,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper J-5 Cub Cruiser',                 type:'piston', tas:80,   pax:3,   range:280,   initK:50,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper Malibu Meridian PA-46-500TP',     type:'turbo',  tas:260,  pax:6,   range:1000,  initK:900,    fixK:65,    varH:280,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Piper PA-17 Vagabond',                  type:'piston', tas:85,   pax:2,   range:300,   initK:38,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-22-150 Tri-Pacer',             type:'piston', tas:105,  pax:4,   range:480,   initK:45,     fixK:8,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper PA-22-160 Tri-Pacer',             type:'piston', tas:110,  pax:4,   range:500,   initK:48,     fixK:8,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Saratoga II HP PA-32-301',        type:'piston', tas:160,  pax:6,   range:800,   initK:180,    fixK:15,    varH:65,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Saratoga II TC PA-32-301T',       type:'piston', tas:180,  pax:6,   range:850,   initK:220,    fixK:17,    varH:72,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Piper PA-18 ───────────────────────────────────────────────────
  { name:'Piper PA-18-105 Super Cub',             type:'piston', tas:88,   pax:2,   range:360,   initK:75,     fixK:8,     varH:33,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-18-125 Super Cub',             type:'piston', tas:92,   pax:2,   range:380,   initK:85,     fixK:9,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-18-135 Super Cub',             type:'piston', tas:95,   pax:2,   range:400,   initK:95,     fixK:9,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-18-150 Super Cub',             type:'piston', tas:100,  pax:2,   range:460,   initK:140,    fixK:10,    varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-18-95 Super Cub',              type:'piston', tas:85,   pax:2,   range:350,   initK:70,     fixK:8,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-18A-150 Super Cub',            type:'piston', tas:100,  pax:2,   range:460,   initK:130,    fixK:10,    varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Piper PA-28 ───────────────────────────────────────────────────
  { name:'Piper Archer DX PA-28-181',             type:'piston', tas:125,  pax:4,   range:800,   initK:480,    fixK:14,    varH:38,    rating:false,  fuel:'Jet-A',  gear:'tricycle',     engines:1 },
  { name:'Piper Archer II PA-28-181',             type:'piston', tas:120,  pax:4,   range:550,   initK:85,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Archer LX PA-28-181',             type:'piston', tas:128,  pax:4,   range:522,   initK:450,    fixK:14,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Arrow 200 PA-28R-200',            type:'piston', tas:140,  pax:4,   range:700,   initK:75,     fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piper Arrow III Turbo PA-28R-201T',     type:'piston', tas:155,  pax:4,   range:800,   initK:95,     fixK:12,    varH:54,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piper Cherokee 150 PA-28-150',          type:'piston', tas:108,  pax:4,   range:500,   initK:45,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Cherokee 160 PA-28-160',          type:'piston', tas:110,  pax:4,   range:520,   initK:48,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Cherokee 235 PA-28-235B',         type:'piston', tas:132,  pax:4,   range:720,   initK:72,     fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Cherokee Cruiser PA-28-140',      type:'piston', tas:108,  pax:4,   range:500,   initK:42,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Pilot 100i PA-28-161',            type:'piston', tas:115,  pax:4,   range:522,   initK:320,    fixK:12,    varH:44,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Turbo Dakota PA-28-201T',         type:'piston', tas:145,  pax:4,   range:700,   initK:85,     fixK:12,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper Warrior PA-28-151',               type:'piston', tas:108,  pax:4,   range:500,   initK:55,     fixK:9,     varH:39,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Piper Twins ───────────────────────────────────────────────────
  { name:'Piper PA-11 Cub Special',               type:'piston', tas:85,   pax:2,   range:300,   initK:60,     fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-15 Vagabond',                  type:'piston', tas:85,   pax:2,   range:250,   initK:35,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-20 Pacer',                     type:'piston', tas:105,  pax:4,   range:450,   initK:48,     fixK:8,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Piper PA-23-150 Apache',                type:'piston', tas:150,  pax:4,   range:800,   initK:55,     fixK:17,    varH:82,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-23-160 Apache',                type:'piston', tas:155,  pax:4,   range:850,   initK:60,     fixK:18,    varH:85,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-23-235 Apache',                type:'piston', tas:165,  pax:5,   range:900,   initK:70,     fixK:19,    varH:92,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-23-250 Aztec C',               type:'piston', tas:175,  pax:6,   range:1000,  initK:85,     fixK:22,    varH:105,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-23-250 Aztec E',               type:'piston', tas:178,  pax:6,   range:1050,  initK:95,     fixK:23,    varH:108,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-23-250 Aztec F',               type:'piston', tas:180,  pax:6,   range:1100,  initK:110,    fixK:24,    varH:112,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-28-236 Dakota',                type:'piston', tas:140,  pax:4,   range:750,   initK:95,     fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Piper PA-28RT-201 Arrow IV',            type:'piston', tas:145,  pax:4,   range:800,   initK:100,    fixK:12,    varH:52,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Piper PA-31 Navajo',                    type:'piston', tas:200,  pax:8,   range:1000,  initK:130,    fixK:32,    varH:155,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-31-325 Navajo C/R',            type:'piston', tas:205,  pax:8,   range:1050,  initK:145,    fixK:33,    varH:160,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-31-350 Chieftain',             type:'piston', tas:210,  pax:10,  range:1100,  initK:170,    fixK:35,    varH:170,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-31P Pressurized Navajo',       type:'piston', tas:220,  pax:8,   range:1200,  initK:150,    fixK:38,    varH:180,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-31T Cheyenne II',              type:'turbo',  tas:260,  pax:8,   range:1300,  initK:500,    fixK:60,    varH:265,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Piper PA-31T1 Cheyenne I',              type:'turbo',  tas:250,  pax:7,   range:1200,  initK:420,    fixK:56,    varH:250,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Piper PA-31T2 Cheyenne IIXL',           type:'turbo',  tas:265,  pax:8,   range:1350,  initK:560,    fixK:62,    varH:270,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Piper PA-34-200 Seneca I',              type:'piston', tas:165,  pax:6,   range:800,   initK:75,     fixK:21,    varH:100,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-34-200T Seneca II',            type:'piston', tas:170,  pax:6,   range:850,   initK:95,     fixK:22,    varH:105,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-34-220T Seneca III',           type:'piston', tas:175,  pax:6,   range:880,   initK:130,    fixK:23,    varH:110,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-34-220T Seneca V',             type:'piston', tas:180,  pax:6,   range:900,   initK:320,    fixK:26,    varH:118,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-44-180 Seminole',              type:'piston', tas:155,  pax:4,   range:700,   initK:220,    fixK:20,    varH:92,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-60 Aerostar 600',              type:'piston', tas:210,  pax:6,   range:1100,  initK:120,    fixK:26,    varH:128,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Piper PA-60 Aerostar 700P',             type:'piston', tas:230,  pax:6,   range:1200,  initK:180,    fixK:30,    varH:142,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },

  // ── Pipistrel ─────────────────────────────────────────────────────
  { name:'Pipistrel Alpha Trainer',    type:'piston',tas:108, pax:2,  range:369,  initK:100,   fixK:7,    varH:26,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Pipistrel Apis',             type:'piston',tas:95,  pax:1,  range:329,  initK:60,    fixK:5,    varH:20,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Pipistrel Explorer',                    type:'piston', tas:130,  pax:2,   range:650,   initK:150,    fixK:7,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Pipistrel Panthera',         type:'piston',tas:200, pax:4,  range:850, initK:380,   fixK:14,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Pipistrel Sinus 912',        type:'piston',tas:118, pax:2,  range:712,  initK:140,   fixK:8,    varH:30,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Pipistrel Taurus',           type:'piston',tas:115, pax:2,  range:664,  initK:150,   fixK:8,    varH:29,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Pipistrel Virus SW 121',     type:'piston',tas:130, pax:2,  range:602,  initK:170,   fixK:9,    varH:35,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },

  // ── Pipistrel Divers ──────────────────────────────────────────────
  { name:'Pipistrel Taurus 503',                  type:'piston', tas:95,   pax:2,   range:400,   initK:70,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Pober ─────────────────────────────────────────────────────────
  { name:'Pober P-9 Pixie',                       type:'piston', tas:85,   pax:1,   range:260,   initK:22,     fixK:4,     varH:19,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Polikarpov ────────────────────────────────────────────────────
  { name:'Polikarpov I-16',                       type:'piston', tas:240,  pax:1,   range:400,   initK:1500,   fixK:90,    varH:600,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Polikarpov Po-2',                       type:'piston', tas:70,   pax:2,   range:350,   initK:150,    fixK:14,    varH:70,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Porterfield ───────────────────────────────────────────────────
  { name:'Porterfield Collegiate',                type:'piston', tas:90,   pax:2,   range:320,   initK:45,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Pottier ───────────────────────────────────────────────────────
  { name:'Pottier P.130UL',                       type:'piston', tas:105,  pax:1,   range:400,   initK:30,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Pottier P.220S Koala',                  type:'piston', tas:120,  pax:2,   range:550,   initK:45,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Procaer ───────────────────────────────────────────────────────
  { name:'Procaer F.15 Picchio',                  type:'piston', tas:155,  pax:4,   range:700,   initK:55,     fixK:11,    varH:52,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Progressive Aerodyne ──────────────────────────────────────────
  { name:'Progressive Aerodyne SeaRey LSX',       type:'piston', tas:95,   pax:2,   range:450,   initK:130,    fixK:8,     varH:32,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Pulsar ────────────────────────────────────────────────────────
  { name:'Pulsar III',                            type:'piston', tas:150,  pax:2,   range:750,   initK:55,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Pulsar XP',                             type:'piston', tas:140,  pax:2,   range:700,   initK:45,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── PZL ───────────────────────────────────────────────────────────
  { name:'PZL M18 Dromader',                      type:'piston', tas:105,  pax:1,   range:300,   initK:180,    fixK:35,    varH:180,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'PZL-104 Wilga 35A',                     type:'piston', tas:95,   pax:4,   range:340,   initK:70,     fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── PZL Agricole ──────────────────────────────────────────────────
  { name:'PZL M18A Dromader',                     type:'piston', tas:105,  pax:1,   range:300,   initK:160,    fixK:33,    varH:175,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'PZL M18B Dromader',                     type:'piston', tas:105,  pax:1,   range:320,   initK:200,    fixK:36,    varH:185,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'PZL-101 Gawron',                        type:'piston', tas:90,   pax:4,   range:400,   initK:40,     fixK:9,     varH:45,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── PZL Bielsko ───────────────────────────────────────────────────
  { name:'PZL SZD-45 Ogar',                       type:'piston', tas:90,   pax:2,   range:400,   initK:35,     fixK:6,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'PZL SZD-50 Puchacz',                    type:'piston', tas:85,   pax:2,   range:300,   initK:30,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── PZL Divers ────────────────────────────────────────────────────
  { name:'PZL Wilga 2000',                        type:'piston', tas:105,  pax:4,   range:400,   initK:120,    fixK:14,    varH:60,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'PZL-105 Flaming',                       type:'piston', tas:110,  pax:5,   range:450,   initK:70,     fixK:12,    varH:58,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── PZL Helicoptery ───────────────────────────────────────────────
  { name:'PZL SW-4 Puszczyk',                     type:'turbo',  tas:130,  pax:5,   range:480,   initK:900,    fixK:70,    varH:480,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── PZL Iskra ─────────────────────────────────────────────────────
  { name:'PZL TS-11 Iskra',                       type:'jet',    tas:320,  pax:2,   range:500,   initK:200,    fixK:80,    varH:1200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── PZL Mielec ────────────────────────────────────────────────────
  { name:'PZL M28 Skytruck',                      type:'turbo',  tas:190,  pax:19,  range:780,   initK:1500,   fixK:180,   varH:520,   rating:true,   fuel:'Jet-A',  gear:'tricycle',     engines:2 },

  // ── Quad City ─────────────────────────────────────────────────────
  { name:'Quad City Challenger II',               type:'piston', tas:75,   pax:2,   range:300,   initK:28,     fixK:4,     varH:19,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Quest ─────────────────────────────────────────────────────────
  { name:'Quest Kodiak 100',                      type:'turbo',  tas:174,  pax:9,   range:1132,  initK:2200,   fixK:110,   varH:500,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },

  // ── Questair ──────────────────────────────────────────────────────
  { name:'Questair Venture',                      type:'piston', tas:250,  pax:2,   range:900,   initK:90,     fixK:9,     varH:44,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Quicksilver ───────────────────────────────────────────────────
  { name:'Quicksilver GT500',                     type:'piston', tas:75,   pax:2,   range:300,   initK:35,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Quicksilver MX Sprint',                 type:'piston', tas:55,   pax:1,   range:180,   initK:18,     fixK:3,     varH:15,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Quicksilver Sport 2S',                  type:'piston', tas:65,   pax:2,   range:250,   initK:28,     fixK:4,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Raj Hamsa ─────────────────────────────────────────────────────
  { name:'Raj Hamsa X-Air F',                     type:'piston', tas:75,   pax:2,   range:300,   initK:30,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Raj Hamsa X-Air H',                     type:'piston', tas:80,   pax:2,   range:320,   initK:38,     fixK:4,     varH:21,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Rand ──────────────────────────────────────────────────────────
  { name:'Rand KR-1',                             type:'piston', tas:150,  pax:1,   range:500,   initK:20,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Rand KR-2',                             type:'piston', tas:145,  pax:2,   range:550,   initK:28,     fixK:4,     varH:22,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Rand Robinson ─────────────────────────────────────────────────
  { name:'Rand Robinson KR-2S',                   type:'piston', tas:150,  pax:2,   range:600,   initK:32,     fixK:4,     varH:23,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Rans ──────────────────────────────────────────────────────────
  { name:'Rans S-12 Airaile',                     type:'piston', tas:85,   pax:2,   range:400,   initK:38,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Rans S-14 Airaile',                     type:'piston', tas:90,   pax:1,   range:380,   initK:32,     fixK:4,     varH:21,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Rans S-17 Stinger',                     type:'piston', tas:85,   pax:1,   range:300,   initK:28,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Rans S-19 Venterra',                    type:'piston', tas:125,  pax:2,   range:700,   initK:80,     fixK:6,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Rans S-20 Raven',                       type:'piston', tas:110,  pax:2,   range:600,   initK:70,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Rans S-21 Outbound',                    type:'piston', tas:120,  pax:2,   range:650,   initK:95,     fixK:7,     varH:31,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Rans S-6 Coyote II',                    type:'piston', tas:90,   pax:2,   range:450,   initK:45,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Rans S-7 Courier',                      type:'piston', tas:95,   pax:2,   range:480,   initK:60,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Rearwin ───────────────────────────────────────────────────────
  { name:'Rearwin Cloudster',                     type:'piston', tas:110,  pax:3,   range:450,   initK:75,     fixK:9,     varH:40,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Rearwin Sportster',                     type:'piston', tas:95,   pax:2,   range:350,   initK:60,     fixK:8,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Reims ─────────────────────────────────────────────────────────
  { name:'Reims F150',                            type:'piston', tas:95,   pax:2,   range:420,   initK:32,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Reims F152',                            type:'piston', tas:100,  pax:2,   range:415,   initK:46,     fixK:7,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Reims F172 Skyhawk',                    type:'piston', tas:105,  pax:4,   range:520,   initK:58,     fixK:9,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Reims F182 Skylane',                    type:'piston', tas:130,  pax:4,   range:650,   initK:100,    fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Reims F406 Caravan II',                 type:'turbo',  tas:246,  pax:12,  range:1150,  initK:900,    fixK:90,    varH:380,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Reims FR172 Reims Rocket',              type:'piston', tas:125,  pax:4,   range:600,   initK:75,     fixK:10,    varH:44,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Remos ─────────────────────────────────────────────────────────
  { name:'Remos G3 Mirage',                       type:'piston', tas:110,  pax:2,   range:550,   initK:65,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Remos GX',                              type:'piston', tas:115,  pax:2,   range:600,   initK:90,     fixK:6,     varH:28,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Republic ──────────────────────────────────────────────────────
  { name:'Republic P-47D Thunderbolt',            type:'piston', tas:250,  pax:1,   range:800,   initK:2800,   fixK:150,   varH:1150,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Republic RC-3 Seabee',                  type:'piston', tas:105,  pax:4,   range:500,   initK:130,    fixK:14,    varH:70,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Risen ─────────────────────────────────────────────────────────
  { name:'Risen Superveloce',                     type:'piston', tas:165,  pax:2,   range:900,   initK:250,    fixK:8,     varH:35,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Robin ─────────────────────────────────────────────────────────
  { name:'Robin DR221 Dauphin',                   type:'piston', tas:110,  pax:3,   range:480,   initK:40,     fixK:7,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Robin DR253 Regent',                    type:'piston', tas:125,  pax:4,   range:640,   initK:50,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Robin DR300/108 2+2',                   type:'piston', tas:110,  pax:3,   range:500,   initK:42,     fixK:7,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Robin DR315 Petit Prince',              type:'piston', tas:115,  pax:4,   range:540,   initK:45,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Robin DR360 Chevalier',                 type:'piston', tas:120,  pax:4,   range:580,   initK:48,     fixK:8,     varH:39,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Robin DR400/120 Dauphin 2+2',type:'piston',tas:118, pax:4,  range:562,  initK:95,    fixK:11,   varH:52,   rating:false, fuel:'AvGas',  gear:'tricycle',   engines:1 },
  { name:'Robin DR400/140B Major',     type:'piston',tas:125, pax:4,  range:606,  initK:130,   fixK:12,   varH:56,   rating:false, fuel:'AvGas',  gear:'tricycle',   engines:1 },
  { name:'Robin DR400/155CDI Diesel',             type:'piston', tas:135,  pax:4,   range:900,   initK:180,    fixK:12,    varH:40,    rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Robin DR400/160 Chevalier',  type:'piston',tas:130, pax:4,  range:652,  initK:150,   fixK:13,   varH:60,   rating:false, fuel:'AvGas',  gear:'tricycle',   engines:1 },
  { name:'Robin DR400/180 Regent',     type:'piston',tas:135, pax:4,  range:699,  initK:175,   fixK:14,   varH:64,   rating:false, fuel:'AvGas',  gear:'tricycle',   engines:1 },
  { name:'Robin DR400/180R Remorqueur',           type:'piston', tas:130,  pax:4,   range:620,   initK:95,     fixK:11,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Robin DR400/200R Remo 200',             type:'piston', tas:135,  pax:4,   range:640,   initK:140,    fixK:12,    varH:54,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Robin DR401',                type:'piston',tas:132, pax:4,  range:681,  initK:190,   fixK:14,   varH:63,   rating:false, fuel:'AvGas',  gear:'tricycle',   engines:1 },
  { name:'Robin DR500 President',      type:'piston',tas:140, pax:4,  range:745,  initK:230,   fixK:15,   varH:68,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Robin HR100/210 Safari',                type:'piston', tas:150,  pax:4,   range:800,   initK:60,     fixK:11,    varH:55,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Robin HR200',                type:'piston',tas:120, pax:2,  range:410,  initK:105,   fixK:10,   varH:48,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Robin R1180T Aiglon',        type:'piston',tas:145, pax:4,  range:711,  initK:110,   fixK:13,   varH:58,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Robin R2160 Alpha Sport',    type:'piston',tas:128, pax:2,  range:454,  initK:98,    fixK:10,   varH:46,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Robin R3000',                type:'piston',tas:130, pax:2,  range:502,  initK:100,   fixK:10,   varH:47,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Robinson ──────────────────────────────────────────────────────
  { name:'Robinson R22 Beta II',                  type:'piston', tas:96,   pax:2,   range:240,   initK:350,    fixK:25,    varH:180,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Robinson R44 Astro',                    type:'piston', tas:105,  pax:4,   range:290,   initK:300,    fixK:33,    varH:240,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Robinson R44 Cadet',                    type:'piston', tas:109,  pax:2,   range:300,   initK:420,    fixK:32,    varH:240,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Robinson R44 Clipper II',               type:'piston', tas:109,  pax:4,   range:300,   initK:550,    fixK:40,    varH:270,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Robinson R44 Raven I',                  type:'piston', tas:109,  pax:4,   range:300,   initK:400,    fixK:35,    varH:250,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Robinson R44 Raven II',                 type:'piston', tas:109,  pax:4,   range:300,   initK:500,    fixK:38,    varH:260,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Robinson R66 Marine',                   type:'turbo',  tas:110,  pax:5,   range:350,   initK:1100,   fixK:62,    varH:410,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Robinson R66 Turbine',                  type:'turbo',  tas:110,  pax:5,   range:350,   initK:1000,   fixK:60,    varH:400,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Robinson Divers ───────────────────────────────────────────────
  { name:'Robinson R44 Newscopter',               type:'piston', tas:109,  pax:3,   range:300,   initK:480,    fixK:38,    varH:260,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Robinson R44 Raven',                    type:'piston', tas:109,  pax:4,   range:300,   initK:380,    fixK:34,    varH:245,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Robinson Mariner ──────────────────────────────────────────────
  { name:'Robinson R22 Mariner',                  type:'piston', tas:96,   pax:2,   range:240,   initK:380,    fixK:27,    varH:190,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Rockwell ──────────────────────────────────────────────────────
  { name:'Rockwell Commander 112',     type:'piston',tas:148, pax:4,  range:589,  initK:55,    fixK:11,   varH:58,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Rockwell Commander 112TC',   type:'piston',tas:168, pax:4,  range:724,  initK:80,    fixK:13,   varH:68,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Rockwell Commander 114',     type:'piston',tas:158, pax:4,  range:682,  initK:70,    fixK:12,   varH:65,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Rockwell Commander 114B',    type:'piston',tas:162, pax:4,  range:698,  initK:85,    fixK:13,   varH:67,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Rockwell Commander 114TC',   type:'piston',tas:180, pax:4,  range:765,  initK:110,   fixK:14,   varH:72,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Rockwell Commander 685',     type:'piston',tas:225, pax:8,  range:1181, initK:200,   fixK:24,   varH:110,  rating:false, fuel:'AvGas',  gear:'retractable', engines:2 },
  { name:'Rockwell Turbo Commander 1000',         type:'turbo',  tas:285,  pax:7,   range:1450,  initK:950,    fixK:54,    varH:245,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Rockwell Turbo Commander 690A',         type:'turbo',  tas:260,  pax:7,   range:1200,  initK:500,    fixK:45,    varH:220,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Rockwell Turbo Commander 690B',         type:'turbo',  tas:265,  pax:7,   range:1250,  initK:600,    fixK:46,    varH:225,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Rockwell Turbo Commander 840',          type:'turbo',  tas:270,  pax:7,   range:1300,  initK:700,    fixK:48,    varH:230,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Rockwell Turbo Commander 900',          type:'turbo',  tas:275,  pax:7,   range:1350,  initK:750,    fixK:50,    varH:235,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Rockwell Turbo Commander 980',          type:'turbo',  tas:280,  pax:7,   range:1400,  initK:850,    fixK:52,    varH:240,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Rockwell Commander ────────────────────────────────────────────
  { name:'Commander 115',                         type:'piston', tas:164,  pax:4,   range:800,   initK:180,    fixK:15,    varH:60,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Roko ──────────────────────────────────────────────────────────
  { name:'Roko Aero NG4 UL',                      type:'piston', tas:120,  pax:2,   range:620,   initK:75,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Roko Aero ─────────────────────────────────────────────────────
  { name:'Roko Aero NG6 UL',                      type:'piston', tas:125,  pax:2,   range:650,   initK:85,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Roland ────────────────────────────────────────────────────────
  { name:'Roland Aircraft Z-602',                 type:'piston', tas:110,  pax:2,   range:550,   initK:70,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Rotary Air Force ──────────────────────────────────────────────
  { name:'Rotary Air Force RAF 2000',             type:'piston', tas:90,   pax:2,   range:300,   initK:50,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Rotorvox ──────────────────────────────────────────────────────
  { name:'Rotorvox C2A',                          type:'piston', tas:100,  pax:2,   range:400,   initK:160,    fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Rotorway ──────────────────────────────────────────────────────
  { name:'Rotorway A600 Talon',                   type:'piston', tas:100,  pax:2,   range:200,   initK:110,    fixK:13,    varH:95,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Rotorway Exec 162F',                    type:'piston', tas:95,   pax:2,   range:180,   initK:80,     fixK:12,    varH:90,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Rotorway Divers ───────────────────────────────────────────────
  { name:'Rotorway Scorpion 133',                 type:'piston', tas:85,   pax:1,   range:150,   initK:45,     fixK:9,     varH:75,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Royal Aircraft Factory ────────────────────────────────────────
  { name:'Royal Aircraft Factory SE5a replica',   type:'piston', tas:95,   pax:1,   range:250,   initK:130,    fixK:10,    varH:52,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Rutan ─────────────────────────────────────────────────────────
  { name:'Berkut 360',                            type:'piston', tas:200,  pax:2,   range:1200,  initK:130,    fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Rutan Defiant',                         type:'piston', tas:190,  pax:4,   range:1000,  initK:90,     fixK:12,    varH:60,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Rutan Long-EZ',                         type:'piston', tas:160,  pax:2,   range:1100,  initK:50,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Rutan Quickie Q2',                      type:'piston', tas:150,  pax:2,   range:600,   initK:30,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Rutan Vari-Viggen',                     type:'piston', tas:150,  pax:2,   range:400,   initK:40,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Rutan VariEze',                         type:'piston', tas:155,  pax:2,   range:800,   initK:40,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Ryan ──────────────────────────────────────────────────────────
  { name:'Ryan PT-22 Recruit',                    type:'piston', tas:100,  pax:2,   range:350,   initK:120,    fixK:10,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Ryan Classiques ───────────────────────────────────────────────
  { name:'Ryan SCW-145',                          type:'piston', tas:145,  pax:3,   range:550,   initK:250,    fixK:15,    varH:68,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Ryan ST-A',                             type:'piston', tas:125,  pax:2,   range:400,   initK:300,    fixK:16,    varH:75,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Saab ──────────────────────────────────────────────────────────
  { name:'Saab 2000',                             type:'turbo',  tas:370,  pax:50,  range:1200,  initK:3000,   fixK:500,   varH:950,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Saab 340B',                             type:'turbo',  tas:282,  pax:34,  range:940,   initK:1500,   fixK:380,   varH:750,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Saab Classiques ───────────────────────────────────────────────
  { name:'Saab 91 Safir',                         type:'piston', tas:130,  pax:4,   range:500,   initK:70,     fixK:11,    varH:50,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Saab Sk 60',                            type:'jet',    tas:350,  pax:2,   range:800,   initK:350,    fixK:110,   varH:1600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Saab Militaire ────────────────────────────────────────────────
  { name:'Saab 105',                              type:'jet',    tas:350,  pax:2,   range:800,   initK:350,    fixK:110,   varH:1600,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Saab 35 Draken',                        type:'jet',    tas:500,  pax:1,   range:1000,  initK:800,    fixK:200,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Saab 37 Viggen',                        type:'jet',    tas:500,  pax:1,   range:1200,  initK:1200,   fixK:250,   varH:3500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Safari ────────────────────────────────────────────────────────
  { name:'Safari 400',                            type:'piston', tas:95,   pax:2,   range:200,   initK:90,     fixK:12,    varH:90,    rating:false,  fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Sauper ────────────────────────────────────────────────────────
  { name:'Sauper J.300 Joker',                    type:'piston', tas:85,   pax:2,   range:400,   initK:50,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Scheibe ───────────────────────────────────────────────────────
  { name:'Scheibe SF.25C Falke',                  type:'piston', tas:85,   pax:2,   range:430,   initK:45,     fixK:6,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Scheibe SF.28 Tandem Falke',            type:'piston', tas:90,   pax:2,   range:450,   initK:50,     fixK:7,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Scheibe Motoplaneur ───────────────────────────────────────────
  { name:'Scheibe SF-25E Super Falke',            type:'piston', tas:90,   pax:2,   range:450,   initK:55,     fixK:6,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Scheibe SF-34 Delphin',                 type:'piston', tas:95,   pax:2,   range:420,   initK:50,     fixK:6,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Scheibe SF-36',                         type:'piston', tas:100,  pax:2,   range:450,   initK:55,     fixK:7,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Schempp-Hirth ─────────────────────────────────────────────────
  { name:'Schempp-Hirth Arcus M',                 type:'piston', tas:95,   pax:2,   range:400,   initK:220,    fixK:10,    varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Arcus T',                 type:'piston', tas:95,   pax:2,   range:380,   initK:180,    fixK:9,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Discus 2cT',              type:'piston', tas:95,   pax:1,   range:380,   initK:110,    fixK:8,     varH:25,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Duo Discus T',            type:'piston', tas:95,   pax:2,   range:400,   initK:130,    fixK:9,     varH:27,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Duo Discus XLT',          type:'piston', tas:95,   pax:2,   range:420,   initK:160,    fixK:9,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Janus CM',                type:'piston', tas:95,   pax:2,   range:380,   initK:90,     fixK:8,     varH:27,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Nimbus 3DM',              type:'piston', tas:95,   pax:2,   range:420,   initK:130,    fixK:9,     varH:29,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Nimbus 4DM',              type:'piston', tas:95,   pax:2,   range:450,   initK:180,    fixK:10,    varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Quintus M',               type:'piston', tas:95,   pax:1,   range:430,   initK:220,    fixK:10,    varH:29,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Ventus 2cxM',             type:'piston', tas:95,   pax:1,   range:400,   initK:150,    fixK:9,     varH:27,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Ventus 2cxT',             type:'piston', tas:95,   pax:1,   range:380,   initK:120,    fixK:8,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schempp-Hirth Ventus 3M',               type:'piston', tas:95,   pax:1,   range:380,   initK:190,    fixK:9,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Schleicher ────────────────────────────────────────────────────
  { name:'Schleicher ASG 32Mi',                   type:'piston', tas:95,   pax:2,   range:430,   initK:230,    fixK:10,    varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schleicher ASH 25M',                    type:'piston', tas:95,   pax:2,   range:400,   initK:160,    fixK:9,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schleicher ASH 25Mi',                   type:'piston', tas:95,   pax:2,   range:420,   initK:180,    fixK:9,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schleicher ASH 26E',                    type:'piston', tas:95,   pax:1,   range:400,   initK:130,    fixK:8,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schleicher ASH 30Mi',                   type:'piston', tas:95,   pax:2,   range:450,   initK:280,    fixK:11,    varH:32,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schleicher ASH 31Mi',                   type:'piston', tas:95,   pax:1,   range:420,   initK:200,    fixK:9,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schleicher ASK 21Mi',                   type:'piston', tas:90,   pax:2,   range:350,   initK:150,    fixK:9,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schleicher ASW 22BLE',                  type:'piston', tas:95,   pax:1,   range:400,   initK:120,    fixK:8,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schleicher ASW 24E',                    type:'piston', tas:90,   pax:1,   range:350,   initK:75,     fixK:7,     varH:24,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Schleicher ASW 27B FES',                type:'piston', tas:95,   pax:1,   range:380,   initK:130,    fixK:8,     varH:25,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Schweizer ─────────────────────────────────────────────────────
  { name:'Schweizer 300C',                        type:'piston', tas:86,   pax:3,   range:200,   initK:250,    fixK:25,    varH:180,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Schweizer 300CBi',                      type:'piston', tas:86,   pax:2,   range:210,   initK:280,    fixK:26,    varH:185,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Schweizer 333',                         type:'turbo',  tas:105,  pax:4,   range:300,   initK:600,    fixK:50,    varH:350,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Schweizer Divers ──────────────────────────────────────────────
  { name:'Schweizer 269D',                        type:'turbo',  tas:105,  pax:4,   range:300,   initK:550,    fixK:48,    varH:340,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Scintex ───────────────────────────────────────────────────────
  { name:'Scintex CP.1310 Super Emeraude',        type:'piston', tas:118,  pax:2,   range:480,   initK:40,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Scoda ─────────────────────────────────────────────────────────
  { name:'Scoda Super Petrel LS',                 type:'piston', tas:95,   pax:2,   range:400,   initK:180,    fixK:9,     varH:34,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Scoda Divers ──────────────────────────────────────────────────
  { name:'Scoda Super Petrel XP',                 type:'piston', tas:100,  pax:2,   range:450,   initK:220,    fixK:10,    varH:36,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Scottish Aviation ─────────────────────────────────────────────
  { name:'Scottish Aviation Bulldog',             type:'piston', tas:115,  pax:2,   range:620,   initK:90,     fixK:11,    varH:50,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Scottish Aviation Pioneer',             type:'piston', tas:110,  pax:5,   range:400,   initK:120,    fixK:16,    varH:82,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Scottish Aviation Twin Pioneer',        type:'piston', tas:120,  pax:16,  range:700,   initK:200,    fixK:35,    varH:180,   rating:true,   fuel:'AvGas',  gear:'tailwheel',    engines:2 },

  // ── SeaMax ────────────────────────────────────────────────────────
  { name:'SeaMax M-22',                           type:'piston', tas:100,  pax:2,   range:450,   initK:160,    fixK:8,     varH:32,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Seawind ───────────────────────────────────────────────────────
  { name:'Seawind 3000',                          type:'piston', tas:165,  pax:4,   range:1000,  initK:180,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Sequoia ───────────────────────────────────────────────────────
  { name:'Sequoia F.8L Falco',                    type:'piston', tas:165,  pax:2,   range:700,   initK:95,     fixK:9,     varH:45,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Shark ─────────────────────────────────────────────────────────
  { name:'Shark Aero Shark UL',                   type:'piston', tas:160,  pax:2,   range:800,   initK:180,    fixK:7,     varH:33,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── ShinMaywa ─────────────────────────────────────────────────────
  { name:'ShinMaywa US-2',                        type:'turbo',  tas:260,  pax:20,  range:2500,  initK:60000,  fixK:700,   varH:4000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── Shorts ────────────────────────────────────────────────────────
  { name:'Shorts 330',                            type:'turbo',  tas:190,  pax:30,  range:500,   initK:400,    fixK:260,   varH:600,   rating:true,   fuel:'Jet-A',  gear:'tricycle',     engines:2 },
  { name:'Shorts 360',                            type:'turbo',  tas:210,  pax:36,  range:570,   initK:600,    fixK:300,   varH:650,   rating:true,   fuel:'Jet-A',  gear:'tricycle',     engines:2 },
  { name:'Shorts Skyvan',                         type:'turbo',  tas:175,  pax:19,  range:600,   initK:500,    fixK:200,   varH:550,   rating:true,   fuel:'Jet-A',  gear:'tricycle',     engines:2 },

  // ── SIAI-Marchetti ────────────────────────────────────────────────
  { name:'SIAI-Marchetti S.211',                  type:'jet',    tas:350,  pax:2,   range:900,   initK:500,    fixK:110,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'SIAI-Marchetti SF.260',                 type:'piston', tas:170,  pax:3,   range:900,   initK:250,    fixK:20,    varH:110,   rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── SIAI-Marchetti Classiques ─────────────────────────────────────
  { name:'SIAI-Marchetti S.205',                  type:'piston', tas:140,  pax:4,   range:700,   initK:50,     fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'SIAI-Marchetti S.208',                  type:'piston', tas:160,  pax:5,   range:800,   initK:65,     fixK:12,    varH:55,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Sikorsky ──────────────────────────────────────────────────────
  { name:'Sikorsky S-300CBi',                     type:'piston', tas:86,   pax:2,   range:210,   initK:290,    fixK:26,    varH:185,   rating:true,   fuel:'AvGas',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Sikorsky S-58T',                        type:'turbo',  tas:110,  pax:16,  range:250,   initK:500,    fixK:150,   varH:1300,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Sikorsky S-61N',                        type:'turbo',  tas:120,  pax:26,  range:400,   initK:1500,   fixK:350,   varH:2600,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Sikorsky S-64 Skycrane',                type:'turbo',  tas:90,   pax:3,   range:200,   initK:8000,   fixK:600,   varH:4500,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Sikorsky S-76A',                        type:'turbo',  tas:145,  pax:13,  range:350,   initK:700,    fixK:200,   varH:1400,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Sikorsky S-76B',                        type:'turbo',  tas:150,  pax:13,  range:380,   initK:1200,   fixK:220,   varH:1500,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Sikorsky S-76C+',                       type:'turbo',  tas:155,  pax:13,  range:400,   initK:2000,   fixK:250,   varH:1650,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Sikorsky S-76C++',                      type:'turbo',  tas:155,  pax:13,  range:400,   initK:3500,   fixK:280,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Sikorsky S-92A',                        type:'turbo',  tas:151,  pax:19,  range:539,   initK:12000,  fixK:600,   varH:3500,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Sikorsky UH-60A Black Hawk',            type:'turbo',  tas:140,  pax:14,  range:320,   initK:6000,   fixK:400,   varH:2800,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Sikorsky S-434 ────────────────────────────────────────────────
  { name:'Sikorsky S-434',                        type:'turbo',  tas:135,  pax:5,   range:260,   initK:1400,   fixK:82,    varH:530,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Silverlight ───────────────────────────────────────────────────
  { name:'Silverlight AR-1',                      type:'piston', tas:90,   pax:2,   range:320,   initK:75,     fixK:6,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── SIPA ──────────────────────────────────────────────────────────
  { name:'SIPA S.90',                             type:'piston', tas:110,  pax:2,   range:400,   initK:35,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'SIPA S.903',                            type:'piston', tas:115,  pax:2,   range:420,   initK:38,     fixK:7,     varH:33,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Skyleader ─────────────────────────────────────────────────────
  { name:'Skyleader 200',                         type:'piston', tas:115,  pax:2,   range:600,   initK:85,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Skyleader 600',                         type:'piston', tas:125,  pax:2,   range:700,   initK:110,    fixK:6,     varH:29,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Skyleader GP One',                      type:'piston', tas:130,  pax:2,   range:700,   initK:120,    fixK:7,     varH:29,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Slick ─────────────────────────────────────────────────────────
  { name:'Slick 360',                             type:'piston', tas:160,  pax:1,   range:380,   initK:180,    fixK:13,    varH:70,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Sling ─────────────────────────────────────────────────────────
  { name:'Sling 2',                               type:'piston', tas:115,  pax:2,   range:700,   initK:100,    fixK:6,     varH:29,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Sling 4',                               type:'piston', tas:120,  pax:4,   range:750,   initK:150,    fixK:8,     varH:34,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Sling High Wing',                       type:'piston', tas:125,  pax:4,   range:750,   initK:250,    fixK:10,    varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Sling TSi',                             type:'piston', tas:140,  pax:4,   range:800,   initK:200,    fixK:9,     varH:38,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Slingsby ──────────────────────────────────────────────────────
  { name:'Slingsby T67 Firefly',                  type:'piston', tas:120,  pax:2,   range:500,   initK:90,     fixK:10,    varH:50,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Slingsby T67 ──────────────────────────────────────────────────
  { name:'Slingsby T67M260 Firefly',              type:'piston', tas:130,  pax:2,   range:500,   initK:130,    fixK:11,    varH:54,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Smith ─────────────────────────────────────────────────────────
  { name:'Smith DSA-1 Miniplane',                 type:'piston', tas:110,  pax:1,   range:280,   initK:28,     fixK:4,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Socata ────────────────────────────────────────────────────────
  { name:'Socata MS-880 Rallye Club',  type:'piston',tas:110, pax:4,  range:418,  initK:28,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Socata Rallye 100ST',                   type:'piston', tas:105,  pax:4,   range:500,   initK:32,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Socata Rallye 150ST',                   type:'piston', tas:115,  pax:4,   range:550,   initK:38,     fixK:8,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Socata Rallye 180T Galopin',            type:'piston', tas:125,  pax:4,   range:600,   initK:48,     fixK:9,     varH:40,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Socata Rallye 235 Gabier',              type:'piston', tas:130,  pax:4,   range:650,   initK:55,     fixK:10,    varH:44,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Socata Rallye 235E',         type:'piston',tas:125, pax:4,  range:506,  initK:35,    fixK:9,    varH:45,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Socata TB-10 Tobago',        type:'piston',tas:125, pax:4,  range:606,  initK:60,    fixK:11,   varH:55,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Socata TB-10 Tobago GT',                type:'piston', tas:130,  pax:4,   range:700,   initK:110,    fixK:11,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Socata TB-20 Trinidad',      type:'piston',tas:165, pax:4,  range:876, initK:130,   fixK:15,   varH:70,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Socata TB-20 Trinidad GT',              type:'piston', tas:165,  pax:5,   range:1000,  initK:190,    fixK:14,    varH:60,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Socata TB-200 Tobago XL',    type:'piston',tas:132, pax:4,  range:621,  initK:75,    fixK:12,   varH:58,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Socata TB-21 Trinidad TC',   type:'piston',tas:185, pax:4,  range:961, initK:150,   fixK:16,   varH:78,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Socata TB-30 Epsilon',                  type:'piston', tas:170,  pax:2,   range:700,   initK:180,    fixK:16,    varH:78,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Socata TB-9 Tampico',        type:'piston',tas:118, pax:4,  range:562,  initK:52,    fixK:10,   varH:50,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Socata TBM 900',             type:'turbo', tas:330, pax:5,  range:1565, initK:4000,  fixK:95,   varH:560,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'Socata TBM 930',             type:'turbo', tas:330, pax:5,  range:1565, initK:4200,  fixK:98,   varH:580,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },

  // ── Soko ──────────────────────────────────────────────────────────
  { name:'Soko G-2 Galeb',                        type:'jet',    tas:350,  pax:2,   range:670,   initK:200,    fixK:80,    varH:1200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },
  { name:'Soko J-21 Jastreb',                     type:'jet',    tas:380,  pax:1,   range:800,   initK:250,    fixK:90,    varH:1300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:1 },

  // ── Sonaca ────────────────────────────────────────────────────────
  { name:'Sonaca 200 Trainer Pro',                type:'piston', tas:115,  pax:2,   range:600,   initK:180,    fixK:9,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Sonerai ───────────────────────────────────────────────────────
  { name:'Sonerai I',                             type:'piston', tas:130,  pax:1,   range:300,   initK:22,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sonerai II',                            type:'piston', tas:130,  pax:2,   range:350,   initK:28,     fixK:4,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sonerai IIL',                           type:'piston', tas:125,  pax:2,   range:380,   initK:30,     fixK:4,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Sonex ─────────────────────────────────────────────────────────
  { name:'Sonex Onex',                            type:'piston', tas:115,  pax:1,   range:450,   initK:35,     fixK:4,     varH:20,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sonex Sonex',                           type:'piston', tas:120,  pax:2,   range:500,   initK:40,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sonex SubSonex JSX-2',                  type:'jet',    tas:170,  pax:1,   range:300,   initK:160,    fixK:18,    varH:200,   rating:false,  fuel:'Jet-A',  gear:'tricycle',     engines:1 },
  { name:'Sonex Waiex',                           type:'piston', tas:120,  pax:2,   range:500,   initK:42,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Sonex Divers ──────────────────────────────────────────────────
  { name:'Sonex B Model',                         type:'piston', tas:125,  pax:2,   range:550,   initK:55,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sonex Xenos Motorglider',               type:'piston', tas:100,  pax:2,   range:500,   initK:40,     fixK:5,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Sopwith ───────────────────────────────────────────────────────
  { name:'Sopwith Camel replica',                 type:'piston', tas:90,   pax:1,   range:200,   initK:140,    fixK:11,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sopwith Pup replica',                   type:'piston', tas:85,   pax:1,   range:190,   initK:110,    fixK:10,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sopwith Triplane replica',              type:'piston', tas:90,   pax:1,   range:190,   initK:150,    fixK:11,    varH:56,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Sorrell ───────────────────────────────────────────────────────
  { name:'Sorrell SNS-7 Hiperbipe',               type:'piston', tas:130,  pax:2,   range:450,   initK:50,     fixK:6,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Spartan ───────────────────────────────────────────────────────
  { name:'Spartan 7W Executive',                  type:'piston', tas:185,  pax:5,   range:900,   initK:900,    fixK:30,    varH:140,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Sport Copter ──────────────────────────────────────────────────
  { name:'Sport Copter Lightning',                type:'piston', tas:90,   pax:2,   range:300,   initK:70,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Sport Copter Vortex',                   type:'piston', tas:85,   pax:1,   range:250,   initK:45,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Sportavia ─────────────────────────────────────────────────────
  { name:'Sportavia RF-5B Sperber',               type:'piston', tas:105,  pax:2,   range:500,   initK:50,     fixK:7,     varH:26,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Sportavia RS-180 Sportsman',            type:'piston', tas:130,  pax:4,   range:650,   initK:55,     fixK:9,     varH:40,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Sportine Aviacija ─────────────────────────────────────────────
  { name:'Sportine LAK-17B MS',                   type:'piston', tas:95,   pax:1,   range:400,   initK:100,    fixK:8,     varH:25,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Sportine LAK-19T',                      type:'piston', tas:95,   pax:1,   range:380,   initK:90,     fixK:7,     varH:24,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Sportsman ─────────────────────────────────────────────────────
  { name:'Glasair Sportsman GS-2',                type:'piston', tas:140,  pax:4,   range:800,   initK:180,    fixK:10,    varH:42,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Stampe ────────────────────────────────────────────────────────
  { name:'Stampe SV.4',                           type:'piston', tas:80,   pax:2,   range:300,   initK:95,     fixK:10,    varH:48,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Staudacher ────────────────────────────────────────────────────
  { name:'Staudacher S-300',                      type:'piston', tas:160,  pax:1,   range:400,   initK:120,    fixK:11,    varH:60,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Steen ─────────────────────────────────────────────────────────
  { name:'Steen Skybolt',                         type:'piston', tas:130,  pax:2,   range:350,   initK:60,     fixK:7,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Stemme ────────────────────────────────────────────────────────
  { name:'Stemme S10-VT',                         type:'piston', tas:120,  pax:2,   range:700,   initK:200,    fixK:12,    varH:38,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Stemme S12',                            type:'piston', tas:130,  pax:2,   range:750,   initK:350,    fixK:14,    varH:42,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Stephens ──────────────────────────────────────────────────────
  { name:'Stephens Akro',                         type:'piston', tas:145,  pax:1,   range:350,   initK:60,     fixK:9,     varH:48,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Stern ─────────────────────────────────────────────────────────
  { name:'Stern ST-80 Balade',                    type:'piston', tas:105,  pax:2,   range:400,   initK:30,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Stinson ───────────────────────────────────────────────────────
  { name:'Stinson 108 Voyager',                   type:'piston', tas:105,  pax:4,   range:500,   initK:55,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Stinson 108-3 Voyager',      type:'piston',tas:108, pax:4,  range:419,  initK:35,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Stinson 10A Voyager',        type:'piston',tas:100, pax:2,  range:325,  initK:28,    fixK:6,    varH:30,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Stinson L-5 Sentinel',       type:'piston',tas:95,  pax:2,  range:329,  initK:30,    fixK:7,    varH:32,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Stinson Reliant SR-10',      type:'piston',tas:135, pax:5,  range:499,  initK:120,   fixK:16,   varH:70,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Stinson Classiques ────────────────────────────────────────────
  { name:'Stinson 108-2 Voyager',                 type:'piston', tas:105,  pax:4,   range:500,   initK:58,     fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Stinson 108-3 Station Wagon',           type:'piston', tas:108,  pax:4,   range:520,   initK:62,     fixK:8,     varH:37,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Stinson Reliant ───────────────────────────────────────────────
  { name:'Stinson SR-9 Reliant',                  type:'piston', tas:140,  pax:5,   range:600,   initK:250,    fixK:18,    varH:85,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Stinson V-77 Reliant',                  type:'piston', tas:140,  pax:5,   range:650,   initK:220,    fixK:18,    varH:84,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Stolp ─────────────────────────────────────────────────────────
  { name:'Stolp Acroduster Too',                  type:'piston', tas:140,  pax:2,   range:380,   initK:60,     fixK:7,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Stolp Starduster Too SA300',            type:'piston', tas:130,  pax:2,   range:400,   initK:55,     fixK:7,     varH:34,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Stolp Starlet SA500',                   type:'piston', tas:105,  pax:1,   range:300,   initK:32,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Storm Aircraft ────────────────────────────────────────────────
  { name:'Storm Aircraft Storm 300',              type:'piston', tas:120,  pax:2,   range:600,   initK:70,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Storm Aircraft Storm Century',          type:'piston', tas:130,  pax:4,   range:700,   initK:95,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Sud Aviation ──────────────────────────────────────────────────
  { name:'Sud Caravelle 10B',                     type:'jet',    tas:440,  pax:99,  range:1700,  initK:300,    fixK:500,   varH:2800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Sud Djinn ─────────────────────────────────────────────────────
  { name:'Sud-Ouest SO.1221 Djinn',               type:'turbo',  tas:60,   pax:2,   range:130,   initK:120,    fixK:30,    varH:250,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Sukhoi ────────────────────────────────────────────────────────
  { name:'Sukhoi Su-26M',                         type:'piston', tas:150,  pax:1,   range:430,   initK:150,    fixK:16,    varH:95,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sukhoi Su-29',                          type:'piston', tas:146,  pax:2,   range:640,   initK:180,    fixK:17,    varH:100,   rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sukhoi Su-31',                          type:'piston', tas:150,  pax:1,   range:340,   initK:200,    fixK:18,    varH:105,   rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Sukhoi Superjet 100',                   type:'jet',    tas:447,  pax:98,  range:1650,  initK:12000,  fixK:800,   varH:2100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Sukhoi Divers ─────────────────────────────────────────────────
  { name:'Sukhoi Su-38L',                         type:'piston', tas:110,  pax:1,   range:350,   initK:90,     fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Supermarine ───────────────────────────────────────────────────
  { name:'Supermarine Spitfire Mk.IX',            type:'piston', tas:215,  pax:1,   range:450,   initK:4000,   fixK:160,   varH:1300,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Supermarine Spitfire Mk.XVI',           type:'piston', tas:215,  pax:1,   range:450,   initK:3800,   fixK:160,   varH:1300,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Swearingen ────────────────────────────────────────────────────
  { name:'Swearingen Merlin IIB',      type:'turbo', tas:280, pax:6,  range:1210, initK:220,   fixK:75,   varH:410,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Swearingen Merlin III',      type:'turbo', tas:300, pax:8,  range:1390, initK:350,   fixK:90,   varH:460,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Swearingen SA-226 Metro',    type:'turbo', tas:290, pax:19, range:1005, initK:800,   fixK:165,  varH:690,  rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Swearingen SJ30',            type:'jet',   tas:490, pax:6,  range:2255, initK:7500,  fixK:190,  varH:1000, rating:true,  fuel:'Jet-A',  gear:'retractable', engines:2 },
  { name:'Swearingen SX-300',                     type:'piston', tas:250,  pax:2,   range:800,   initK:120,    fixK:10,    varH:50,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Swearingen Metro ──────────────────────────────────────────────
  { name:'Swearingen Merlin IIIB',                type:'turbo',  tas:270,  pax:8,   range:1400,  initK:300,    fixK:65,    varH:290,   rating:false,  fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Swearingen Merlin IVA',                 type:'turbo',  tas:275,  pax:12,  range:1300,  initK:350,    fixK:90,    varH:380,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Swearingen Metro II',                   type:'turbo',  tas:250,  pax:19,  range:700,   initK:350,    fixK:120,   varH:480,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Tailwind Divers ───────────────────────────────────────────────
  { name:'Wittman Buttercup',                     type:'piston', tas:120,  pax:2,   range:450,   initK:35,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Tarragon ──────────────────────────────────────────────────────
  { name:'Tarragon',                              type:'piston', tas:165,  pax:2,   range:800,   initK:220,    fixK:8,     varH:34,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Taylor ────────────────────────────────────────────────────────
  { name:'Taylor JT-1 Monoplane',                 type:'piston', tas:95,   pax:1,   range:250,   initK:20,     fixK:3,     varH:18,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Taylor JT-2 Titch',                     type:'piston', tas:130,  pax:1,   range:300,   initK:25,     fixK:4,     varH:22,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Taylorcraft ───────────────────────────────────────────────────
  { name:'Taylorcraft BC-12D',                    type:'piston', tas:85,   pax:2,   range:380,   initK:30,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Taylorcraft BC12-D',         type:'piston',tas:85,  pax:2,  range:236,  initK:18,    fixK:4,    varH:18,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Taylorcraft F-19 Sportsman',            type:'piston', tas:95,   pax:2,   range:400,   initK:40,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Taylorcraft F-21B',                     type:'piston', tas:100,  pax:2,   range:420,   initK:50,     fixK:6,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Taylorcraft F19 Sportsman',  type:'piston',tas:105, pax:2,  range:301,  initK:48,    fixK:6,    varH:26,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Taylorcraft F21B',           type:'piston',tas:110, pax:2,  range:318,  initK:55,    fixK:7,    varH:28,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Taylorcraft Divers ────────────────────────────────────────────
  { name:'Taylorcraft 20',                        type:'piston', tas:105,  pax:3,   range:400,   initK:50,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Taylorcraft L-2 Grasshopper',           type:'piston', tas:80,   pax:2,   range:250,   initK:50,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── TBM ───────────────────────────────────────────────────────────
  { name:'TBM 700',                    type:'turbo', tas:300, pax:5,  range:1580, initK:2200,  fixK:80,   varH:450,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 850',                    type:'turbo', tas:320, pax:5,  range:1505, initK:3200,  fixK:90,   varH:540,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 900',                    type:'turbo', tas:330, pax:5,  range:1565, initK:4000,  fixK:95,   varH:560,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 910',                    type:'turbo', tas:332, pax:5,  range:1417, initK:4150,  fixK:96,   varH:565,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 930',                    type:'turbo', tas:330, pax:5,  range:1565, initK:4200,  fixK:98,   varH:580,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 940',                    type:'turbo', tas:330, pax:5,  range:1565, initK:4400,  fixK:100,  varH:590,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },
  { name:'TBM 960',                    type:'turbo', tas:330, pax:5,  range:1565, initK:4300,  fixK:100,  varH:600,  rating:false, fuel:'Jet-A',  gear:'retractable', engines:1 },

  // ── Team Aircraft ─────────────────────────────────────────────────
  { name:'Team Mini-Max',                         type:'piston', tas:70,   pax:1,   range:200,   initK:15,     fixK:3,     varH:14,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Tecnam ────────────────────────────────────────────────────────
  { name:'Tecnam P2002 Sierra',        type:'piston',tas:118, pax:2,  range:512,  initK:150,   fixK:9,    varH:36,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Tecnam P2004 Bravo',         type:'piston',tas:100, pax:2,  range:425,  initK:110,   fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Tecnam P2006T',              type:'piston',tas:140, pax:3,  range:645,  initK:250,   fixK:14,   varH:65,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Tecnam P2008 JC',            type:'piston',tas:120, pax:2,  range:560,  initK:200,   fixK:10,   varH:44,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Tecnam P2010 MkII',          type:'piston',tas:140, pax:4,  range:610,  initK:370,   fixK:16,   varH:72,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Tecnam P2010 TDI Diesel',    type:'piston',tas:136, pax:4,  range:948, initK:412,   fixK:17,   varH:68,   rating:false, fuel:'Jet-A', gear:'tricycle',    engines:1 },
  { name:'Tecnam P2012 Traveller',     type:'piston',tas:175, pax:11, range:719,  initK:2400,  fixK:110,  varH:480,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Tecnam P92 Eaglet',          type:'piston',tas:105, pax:2,  range:521,  initK:130,   fixK:9,    varH:42,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Tecnam P96 Golf',            type:'piston',tas:108, pax:2,  range:499,  initK:100,   fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Tecnam ULM ────────────────────────────────────────────────────
  { name:'Tecnam Astore',                         type:'piston', tas:120,  pax:2,   range:600,   initK:130,    fixK:7,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Tecnam P92 Echo Classic',               type:'piston', tas:110,  pax:2,   range:550,   initK:70,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Tecnam P92 Echo Super',                 type:'piston', tas:115,  pax:2,   range:580,   initK:90,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Tecnam P96 Golf 100',                   type:'piston', tas:115,  pax:2,   range:570,   initK:80,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Thorp ─────────────────────────────────────────────────────────
  { name:'Thorp T-18 Tiger',                      type:'piston', tas:165,  pax:2,   range:550,   initK:45,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Thorp T-211 Sky Skooter',               type:'piston', tas:105,  pax:2,   range:450,   initK:50,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Thrush ────────────────────────────────────────────────────────
  { name:'Thrush 510G',                type:'turbo', tas:145, pax:1,  range:428,  initK:1100,  fixK:65,   varH:380,  rating:false, fuel:'Jet-A',  gear:'tailwheel',   engines:1 },
  { name:'Thrush 550',                            type:'turbo',  tas:165,  pax:1,   range:550,   initK:1400,   fixK:95,    varH:470,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },
  { name:'Thrush Commander S2R',       type:'piston',tas:135, pax:1,  range:349,  initK:650,   fixK:45,   varH:280,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Thrush S2R-600',                        type:'piston', tas:125,  pax:1,   range:350,   initK:180,    fixK:26,    varH:140,   rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Thrush S2R-T34',                        type:'turbo',  tas:155,  pax:1,   range:450,   initK:700,    fixK:72,    varH:380,   rating:false,  fuel:'Jet-A',  gear:'tailwheel',    engines:1 },

  // ── Thunder Mustang ───────────────────────────────────────────────
  { name:'Thunder Mustang',                       type:'piston', tas:280,  pax:2,   range:900,   initK:350,    fixK:20,    varH:110,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Titan ─────────────────────────────────────────────────────────
  { name:'Titan T-51 Mustang',                    type:'piston', tas:155,  pax:1,   range:500,   initK:120,    fixK:9,     varH:45,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Titan Tornado II',                      type:'piston', tas:110,  pax:2,   range:400,   initK:38,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Titanium ──────────────────────────────────────────────────────
  { name:'Titanium Explorer',                     type:'piston', tas:95,   pax:2,   range:350,   initK:90,     fixK:7,     varH:31,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── TL Ultralight ─────────────────────────────────────────────────
  { name:'TL Ultralight Sparker',                 type:'piston', tas:145,  pax:2,   range:700,   initK:140,    fixK:7,     varH:31,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'TL Ultralight Sting S4',                type:'piston', tas:135,  pax:2,   range:700,   initK:120,    fixK:7,     varH:30,    rating:false, fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'TL Ultralight Stream',                  type:'piston', tas:150,  pax:2,   range:750,   initK:180,    fixK:7,     varH:33,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'TL Ultralight TL-232 Condor',           type:'piston', tas:110,  pax:2,   range:550,   initK:55,     fixK:5,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'TL Ultralight TL-96 Star',              type:'piston', tas:120,  pax:2,   range:600,   initK:70,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Tomark ────────────────────────────────────────────────────────
  { name:'Tomark Viper SD-4',                     type:'piston', tas:125,  pax:2,   range:650,   initK:85,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Transall ──────────────────────────────────────────────────────
  { name:'Transall C-160',                        type:'turbo',  tas:275,  pax:93,  range:1000,  initK:3000,   fixK:700,   varH:3500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Transavia ─────────────────────────────────────────────────────
  { name:'Transavia PL-12 Airtruk',               type:'piston', tas:105,  pax:2,   range:300,   initK:45,     fixK:11,    varH:55,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Trixy ─────────────────────────────────────────────────────────
  { name:'Trixy G4-2R',                           type:'piston', tas:90,   pax:2,   range:300,   initK:95,     fixK:7,     varH:33,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1, category:'gyrocopter' },

  // ── Tupolev ───────────────────────────────────────────────────────
  { name:'Tupolev Tu-134',                        type:'jet',    tas:420,  pax:76,  range:1500,  initK:500,    fixK:500,   varH:2200,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Tupolev Tu-154M',                       type:'jet',    tas:460,  pax:180, range:2600,  initK:800,    fixK:900,   varH:4500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'Tupolev Tu-204',                        type:'jet',    tas:460,  pax:210, range:3500,  initK:8000,   fixK:900,   varH:3500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Tupolev Tu-204-100',                    type:'jet',    tas:450,  pax:210, range:2400,  initK:4000,   fixK:800,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },
  { name:'Tupolev Tu-214',                        type:'jet',    tas:450,  pax:210, range:3500,  initK:6000,   fixK:850,   varH:3100,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Ultravia ──────────────────────────────────────────────────────
  { name:'Ultravia Pelican PL',                   type:'piston', tas:115,  pax:2,   range:600,   initK:60,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Ultravia Pelican Sport 600',            type:'piston', tas:120,  pax:2,   range:620,   initK:75,     fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Urban Air ─────────────────────────────────────────────────────
  { name:'Urban Air Samba XXL',                   type:'piston', tas:115,  pax:2,   range:550,   initK:60,     fixK:6,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Urban Air UFM-13 Lambada',              type:'piston', tas:105,  pax:2,   range:550,   initK:60,     fixK:6,     varH:25,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Utva ──────────────────────────────────────────────────────────
  { name:'Utva 66',                               type:'piston', tas:115,  pax:4,   range:450,   initK:50,     fixK:10,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Utva 75',                               type:'piston', tas:120,  pax:2,   range:500,   initK:55,     fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Valentin ──────────────────────────────────────────────────────
  { name:'Valentin Taifun 17E',                   type:'piston', tas:110,  pax:2,   range:600,   initK:70,     fixK:8,     varH:28,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Vans ──────────────────────────────────────────────────────────
  { name:'Vans RV-10',                 type:'piston',tas:175, pax:4,  range:869, initK:80,    fixK:11,   varH:52,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-10 Deluxe',                     type:'piston', tas:175,  pax:4,   range:900,   initK:200,    fixK:11,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Vans RV-12',                 type:'piston',tas:105, pax:2,  range:421,  initK:45,    fixK:8,    varH:35,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-12iS',                          type:'piston', tas:115,  pax:2,   range:600,   initK:110,    fixK:6,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Vans RV-14',                 type:'piston',tas:190, pax:2,  range:908, initK:90,    fixK:10,   varH:48,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-14A',                           type:'piston', tas:175,  pax:2,   range:850,   initK:180,    fixK:9,     varH:40,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Vans RV-15',                            type:'piston', tas:140,  pax:2,   range:700,   initK:150,    fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Vans RV-3',                  type:'piston',tas:175, pax:1,  range:519,  initK:38,    fixK:7,    varH:36,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Vans RV-3B',                            type:'piston', tas:175,  pax:1,   range:550,   initK:55,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Vans RV-4',                  type:'piston',tas:165, pax:2,  range:576,  initK:42,    fixK:8,    varH:37,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Vans RV-4 Tailwheel',                   type:'piston', tas:170,  pax:2,   range:700,   initK:65,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Vans RV-4A',                            type:'piston', tas:170,  pax:2,   range:700,   initK:70,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Vans RV-6',                  type:'piston',tas:160, pax:2,  range:580,  initK:40,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-6 Tailwheel',                   type:'piston', tas:165,  pax:2,   range:700,   initK:70,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Vans RV-6A',                            type:'piston', tas:165,  pax:2,   range:700,   initK:75,     fixK:7,     varH:33,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Vans RV-7 homebuilt',        type:'piston',tas:170, pax:2,  range:672,  initK:60,    fixK:9,    varH:40,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-7A',                            type:'piston', tas:175,  pax:2,   range:750,   initK:95,     fixK:7,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Vans RV-8',                  type:'piston',tas:180, pax:2,  range:665,  initK:55,    fixK:9,    varH:42,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Vans RV-8 Tailwheel',                   type:'piston', tas:180,  pax:2,   range:800,   initK:95,     fixK:8,     varH:35,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Vans RV-8A',                            type:'piston', tas:180,  pax:2,   range:800,   initK:100,    fixK:8,     varH:36,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Vans RV-9',                  type:'piston',tas:155, pax:2,  range:734,  initK:58,    fixK:8,    varH:38,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vans RV-9 Tailwheel',                   type:'piston', tas:160,  pax:2,   range:800,   initK:80,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Vans RV-9A',                            type:'piston', tas:160,  pax:2,   range:800,   initK:85,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Vashon ────────────────────────────────────────────────────────
  { name:'Vashon Ranger R7',                      type:'piston', tas:110,  pax:2,   range:500,   initK:120,    fixK:7,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Velocity ──────────────────────────────────────────────────────
  { name:'Velocity SE',                           type:'piston', tas:175,  pax:4,   range:900,   initK:110,    fixK:9,     varH:46,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Velocity V-Twin',                       type:'piston', tas:190,  pax:4,   range:1000,  initK:200,    fixK:16,    varH:80,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:2 },
  { name:'Velocity XL-RG',                        type:'piston', tas:190,  pax:4,   range:1100,  initK:160,    fixK:11,    varH:55,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── VFW ───────────────────────────────────────────────────────────
  { name:'VFW-Fokker 614',                        type:'jet',    tas:380,  pax:44,  range:1200,  initK:150,    fixK:350,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Vickers ───────────────────────────────────────────────────────
  { name:'Vickers Vanguard',                      type:'turbo',  tas:370,  pax:139, range:1800,  initK:200,    fixK:350,   varH:1800,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Vickers VC10',                          type:'jet',    tas:480,  pax:150, range:4700,  initK:400,    fixK:700,   varH:4500,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },
  { name:'Vickers Viscount 800',                  type:'turbo',  tas:300,  pax:65,  range:1300,  initK:300,    fixK:300,   varH:1400,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:4 },

  // ── Vidor ─────────────────────────────────────────────────────────
  { name:'Vidor Asso V Champion',                 type:'piston', tas:105,  pax:2,   range:450,   initK:40,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Vidor Asso VI Junior',                  type:'piston', tas:100,  pax:1,   range:400,   initK:32,     fixK:4,     varH:21,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Viking ────────────────────────────────────────────────────────
  { name:'Viking DHC-6 Twin Otter 400',           type:'turbo',  tas:170,  pax:19,  range:775,   initK:6500,   fixK:300,   varH:950,   rating:true,   fuel:'Jet-A',  gear:'tailwheel',    engines:2 },

  // ── Volmer ────────────────────────────────────────────────────────
  { name:'Volmer VJ-22 Sportsman',                type:'piston', tas:85,   pax:2,   range:300,   initK:40,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Vought ────────────────────────────────────────────────────────
  { name:'Vought F4U Corsair',                    type:'piston', tas:200,  pax:1,   range:900,   initK:3000,   fixK:145,   varH:1100,  rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Vulcanair ─────────────────────────────────────────────────────
  { name:'Vulcanair A-Viator',         type:'piston',tas:150, pax:4,  range:688,  initK:340,   fixK:17,   varH:72,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Vulcanair P.68 Observer 2',  type:'piston',tas:155, pax:6,  range:784,  initK:650,   fixK:22,   varH:95,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Vulcanair P.68 TC',          type:'piston',tas:175, pax:6,  range:869, initK:750,   fixK:24,   varH:102,  rating:false, fuel:'AvGas',  gear:'tricycle',    engines:2 },
  { name:'Vulcanair V.1.0',            type:'piston',tas:145, pax:4,  range:641,  initK:320,   fixK:16,   varH:70,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },

  // ── Vultee ────────────────────────────────────────────────────────
  { name:'Vultee BT-13 Valiant',                  type:'piston', tas:130,  pax:2,   range:700,   initK:120,    fixK:15,    varH:78,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Waco ──────────────────────────────────────────────────────────
  { name:'Waco ATO Taperwing',                    type:'piston', tas:105,  pax:2,   range:350,   initK:300,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Waco Classic YMF-5',         type:'piston',tas:110, pax:3,  range:318,  initK:380,   fixK:24,   varH:110,  rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Waco UPF-7',                 type:'piston',tas:100, pax:2,  range:305,  initK:220,   fixK:20,   varH:95,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Waco YMF-5D',                           type:'piston', tas:105,  pax:3,   range:400,   initK:350,    fixK:14,    varH:62,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Waco Cabin ────────────────────────────────────────────────────
  { name:'Waco YKS-7',                            type:'piston', tas:120,  pax:5,   range:500,   initK:250,    fixK:16,    varH:72,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Waco ZKS-7',                            type:'piston', tas:130,  pax:5,   range:520,   initK:280,    fixK:17,    varH:75,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Wag-Aero ──────────────────────────────────────────────────────
  { name:'Wag-Aero CUBy',                         type:'piston', tas:85,   pax:2,   range:300,   initK:42,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Wag-Aero Sport Trainer',                type:'piston', tas:85,   pax:2,   range:300,   initK:40,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── War Aircraft Replicas ─────────────────────────────────────────
  { name:'WAR FW-190 Replica',                    type:'piston', tas:130,  pax:1,   range:350,   initK:50,     fixK:6,     varH:32,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Wassmer ───────────────────────────────────────────────────────
  { name:'Wassmer WA-40 Super IV',                type:'piston', tas:130,  pax:4,   range:700,   initK:40,     fixK:8,     varH:40,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Wassmer WA-41 Baladou',                 type:'piston', tas:125,  pax:4,   range:650,   initK:38,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Wassmer WA-51 Pacific',                 type:'piston', tas:125,  pax:4,   range:620,   initK:40,     fixK:8,     varH:38,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Wassmer WA-54 Atlantic',                type:'piston', tas:135,  pax:4,   range:700,   initK:50,     fixK:9,     varH:42,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Weatherly ─────────────────────────────────────────────────────
  { name:'Weatherly 620B',                        type:'piston', tas:110,  pax:1,   range:320,   initK:90,     fixK:18,    varH:90,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Weedhopper ────────────────────────────────────────────────────
  { name:'Weedhopper AX-3',                       type:'piston', tas:55,   pax:2,   range:200,   initK:15,     fixK:3,     varH:15,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Westland ──────────────────────────────────────────────────────
  { name:'Westland Lynx',                         type:'turbo',  tas:125,  pax:10,  range:280,   initK:1500,   fixK:250,   varH:1700,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },
  { name:'Westland Scout AH.1',                   type:'turbo',  tas:105,  pax:4,   range:280,   initK:280,    fixK:68,    varH:490,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },
  { name:'Westland Wasp HAS.1',                   type:'turbo',  tas:100,  pax:4,   range:260,   initK:300,    fixK:70,    varH:500,   rating:true,   fuel:'Jet-A',  gear:'skids',        engines:1, category:'helicopter' },

  // ── Westland Sea King ─────────────────────────────────────────────
  { name:'Westland Sea King HAR.3',               type:'turbo',  tas:112,  pax:22,  range:660,   initK:1200,   fixK:380,   varH:2800,  rating:true,   fuel:'Jet-A',  gear:'skids',        engines:2, category:'helicopter' },

  // ── Wittman ───────────────────────────────────────────────────────
  { name:'Wittman Tailwind W-8',                  type:'piston', tas:150,  pax:2,   range:600,   initK:40,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Wittman Homebuilt ─────────────────────────────────────────────
  { name:'Wittman O&O Special',                   type:'piston', tas:150,  pax:1,   range:400,   initK:35,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Wittman Tailwind W-10',                 type:'piston', tas:155,  pax:2,   range:650,   initK:45,     fixK:5,     varH:27,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Xian ──────────────────────────────────────────────────────────
  { name:'Xian MA60',                             type:'turbo',  tas:270,  pax:60,  range:800,   initK:3000,   fixK:300,   varH:950,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── Xian Divers ───────────────────────────────────────────────────
  { name:'Xian Y-7',                              type:'turbo',  tas:250,  pax:52,  range:1200,  initK:1500,   fixK:250,   varH:900,   rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:2 },

  // ── XtremeAir ─────────────────────────────────────────────────────
  { name:'XtremeAir XA41 Sbach 300',              type:'piston', tas:165,  pax:1,   range:430,   initK:350,    fixK:16,    varH:85,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'XtremeAir XA42 Sbach 342',              type:'piston', tas:165,  pax:2,   range:540,   initK:400,    fixK:17,    varH:88,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Yakovlev ──────────────────────────────────────────────────────
  { name:'Yakovlev Yak-11',                       type:'piston', tas:180,  pax:2,   range:700,   initK:450,    fixK:35,    varH:220,   rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Yakovlev Yak-18T',                      type:'piston', tas:130,  pax:4,   range:480,   initK:60,     fixK:12,    varH:75,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Yakovlev Yak-3M',                       type:'piston', tas:190,  pax:1,   range:480,   initK:900,    fixK:60,    varH:400,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Yakovlev Yak-40',                       type:'jet',    tas:297,  pax:32,  range:970,   initK:300,    fixK:350,   varH:1300,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'Yakovlev Yak-42',                       type:'jet',    tas:405,  pax:120, range:1700,  initK:600,    fixK:700,   varH:3000,  rating:true,   fuel:'Jet-A',  gear:'retractable',  engines:3 },
  { name:'Yakovlev Yak-50',                       type:'piston', tas:160,  pax:1,   range:270,   initK:90,     fixK:14,    varH:85,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Yakovlev Yak-52',            type:'piston',tas:130, pax:2,  range:352,  initK:95,    fixK:14,   varH:75,   rating:false, fuel:'AvGas',  gear:'retractable', engines:1 },
  { name:'Yakovlev Yak-54',                       type:'piston', tas:146,  pax:2,   range:350,   initK:150,    fixK:16,    varH:95,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Yakovlev Yak-55',            type:'piston',tas:150, pax:1,  range:288,  initK:140,   fixK:15,   varH:80,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Yakovlev Yak-9U',                       type:'piston', tas:190,  pax:1,   range:520,   initK:850,    fixK:58,    varH:390,   rating:true,   fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Yakovlev Divers ───────────────────────────────────────────────
  { name:'Yakovlev Yak-12',                       type:'piston', tas:95,   pax:4,   range:500,   initK:60,     fixK:10,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Yakovlev Yak-18A',                      type:'piston', tas:130,  pax:2,   range:450,   initK:55,     fixK:12,    varH:70,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Yakovlev Yak-58',                       type:'piston', tas:140,  pax:5,   range:700,   initK:90,     fixK:16,    varH:82,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Zenair ────────────────────────────────────────────────────────
  { name:'Zenair CH-601 Zodiac',                  type:'piston', tas:105,  pax:2,   range:500,   initK:45,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Zenair CH-650',                         type:'piston', tas:120,  pax:2,   range:600,   initK:60,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Zenair CH-701 STOL',                    type:'piston', tas:80,   pax:2,   range:400,   initK:45,     fixK:5,     varH:23,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zenair CH-750 Cruzer',                  type:'piston', tas:100,  pax:2,   range:500,   initK:65,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Zenair CH-801',                         type:'piston', tas:95,   pax:4,   range:500,   initK:75,     fixK:7,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Zenair Divers ─────────────────────────────────────────────────
  { name:'Zenair CH-200',                         type:'piston', tas:135,  pax:2,   range:500,   initK:35,     fixK:5,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Zenair CH-250',                         type:'piston', tas:140,  pax:2,   range:550,   initK:40,     fixK:6,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Zenair CH-300 Tri-Z',                   type:'piston', tas:145,  pax:3,   range:600,   initK:45,     fixK:6,     varH:30,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Zenith ────────────────────────────────────────────────────────
  { name:'Zenith CH 601 XL',           type:'piston',tas:95,  pax:2,  range:529,  initK:28,    fixK:6,    varH:26,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Zenith CH 650',              type:'piston',tas:105, pax:2,  range:571,  initK:42,    fixK:7,    varH:29,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Zenith CH 750 Cruzer',       type:'piston',tas:100, pax:2,  range:475,  initK:48,    fixK:7,    varH:31,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Zenith CH-640',                         type:'piston', tas:130,  pax:4,   range:700,   initK:75,     fixK:7,     varH:32,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Zenith CH-750 Super Duty',              type:'piston', tas:105,  pax:2,   range:550,   initK:85,     fixK:7,     varH:29,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zenith STOL CH 701',         type:'piston',tas:75,  pax:2,  range:344,  initK:35,    fixK:6,    varH:28,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Zenith STOL CH 750',         type:'piston',tas:80,  pax:2,  range:440,  initK:38,    fixK:7,    varH:30,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },

  // ── Zivko ─────────────────────────────────────────────────────────
  { name:'Zivko Edge 540',                        type:'piston', tas:170,  pax:1,   range:430,   initK:350,    fixK:17,    varH:90,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zivko Edge 540T',                       type:'piston', tas:168,  pax:2,   range:470,   initK:385,    fixK:18,    varH:92,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Zlin ──────────────────────────────────────────────────────────
  { name:'Zlin Z-142',                 type:'piston',tas:120, pax:2,  range:360,  initK:85,    fixK:11,   varH:52,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Zlin Z-226 Trener',                     type:'piston', tas:110,  pax:2,   range:400,   initK:55,     fixK:9,     varH:48,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zlin Z-242L',                type:'piston',tas:135, pax:2,  range:379,  initK:180,   fixK:13,   varH:62,   rating:false, fuel:'AvGas',  gear:'tricycle',    engines:1 },
  { name:'Zlin Z-326 Trener Master',              type:'piston', tas:115,  pax:2,   range:430,   initK:60,     fixK:10,    varH:50,    rating:false,  fuel:'AvGas',  gear:'retractable',  engines:1 },
  { name:'Zlin Z-50LS',                           type:'piston', tas:140,  pax:1,   range:350,   initK:90,     fixK:11,    varH:58,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zlin Z-526',                 type:'piston',tas:125, pax:2,  range:326,  initK:70,    fixK:10,   varH:48,   rating:false, fuel:'AvGas',  gear:'tailwheel',   engines:1 },
  { name:'Zlin Z-526AFS Akrobat',                 type:'piston', tas:125,  pax:1,   range:350,   initK:60,     fixK:9,     varH:50,    rating:false, fuel:'AvGas',  gear:'retractable',  engines:1 },

  // ── Zlin Agricole ─────────────────────────────────────────────────
  { name:'Zlin Z-37 Cmelak',                      type:'piston', tas:95,   pax:1,   range:300,   initK:50,     fixK:12,    varH:65,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Zlin Aviation ─────────────────────────────────────────────────
  { name:'Zlin Aviation Savage Bobber',           type:'piston', tas:85,   pax:2,   range:380,   initK:70,     fixK:5,     varH:24,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zlin Aviation Savage Classic',          type:'piston', tas:90,   pax:2,   range:400,   initK:75,     fixK:6,     varH:25,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zlin Aviation Savage Cruiser',          type:'piston', tas:95,   pax:2,   range:450,   initK:85,     fixK:6,     varH:26,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zlin Aviation Savage Cub',              type:'piston', tas:90,   pax:2,   range:400,   initK:90,     fixK:6,     varH:26,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zlin Aviation Savage Norden',           type:'piston', tas:95,   pax:2,   range:480,   initK:110,    fixK:7,     varH:28,    rating:false,  fuel:'AvGas',  gear:'tailwheel',    engines:1 },
  { name:'Zlin Aviation Shock Cub',               type:'piston', tas:95,   pax:2,   range:450,   initK:140,    fixK:7,     varH:28,    rating:false, fuel:'AvGas',  gear:'tailwheel',    engines:1 },

  // ── Zlin Divers ───────────────────────────────────────────────────
  { name:'Zlin Z-143L',                           type:'piston', tas:130,  pax:4,   range:700,   initK:90,     fixK:10,    varH:46,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Zlin Z-242L Guru',                      type:'piston', tas:130,  pax:2,   range:550,   initK:95,     fixK:10,    varH:48,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

  // ── Zlin Trener ───────────────────────────────────────────────────
  { name:'Zlin Z-42M',                            type:'piston', tas:115,  pax:2,   range:400,   initK:40,     fixK:8,     varH:40,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },
  { name:'Zlin Z-43',                             type:'piston', tas:125,  pax:4,   range:550,   initK:50,     fixK:9,     varH:44,    rating:false,  fuel:'AvGas',  gear:'tricycle',     engines:1 },

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
