// src/lib/aircraft.ts
export type Aircraft = {
  name: string
  type: 'jet' | 'turbo' | 'piston'
  pax: number
  range: number   // nm
  initK: number   // $K
  fixK: number    // $K/yr
  varH: number    // $/hr
  rating: boolean // type rating required
}

export const TAS: Record<Aircraft['type'], number> = {
  jet: 450, turbo: 280, piston: 130
}

export const AC: Aircraft[] = [
  // JETS
  { name:'Cessna Citation M2 Gen2',    type:'jet',   pax:7,  range:1550, initK:5200,  fixK:130,  varH:850,  rating:true  },
  { name:'HondaJet Elite II',           type:'jet',   pax:6,  range:1437, initK:5500,  fixK:140,  varH:800,  rating:true  },
  { name:'Citation CJ3+',              type:'jet',   pax:7,  range:2040, initK:8200,  fixK:180,  varH:950,  rating:true  },
  { name:'Phenom 300E',                type:'jet',   pax:10, range:1971, initK:9800,  fixK:200,  varH:1050, rating:true  },
  { name:'Pilatus PC-24',              type:'jet',   pax:10, range:2000, initK:10500, fixK:210,  varH:1100, rating:true  },
  { name:'Citation XLS+',              type:'jet',   pax:9,  range:2100, initK:11500, fixK:220,  varH:1150, rating:true  },
  { name:'Learjet 75 Liberty',         type:'jet',   pax:9,  range:2040, initK:13000, fixK:240,  varH:1250, rating:true  },
  { name:'Gulfstream G280',            type:'jet',   pax:10, range:3600, initK:24000, fixK:450,  varH:2200, rating:true  },
  { name:'Bombardier Challenger 350',  type:'jet',   pax:10, range:3200, initK:28000, fixK:500,  varH:2500, rating:true  },
  { name:'Dassault Falcon 2000LXS',    type:'jet',   pax:10, range:4000, initK:35000, fixK:620,  varH:3000, rating:true  },
  { name:'Dassault Falcon 7X',         type:'jet',   pax:14, range:5950, initK:55000, fixK:900,  varH:4500, rating:true  },
  { name:'Gulfstream G650ER',          type:'jet',   pax:19, range:7500, initK:72000, fixK:1200, varH:6000, rating:true  },
  { name:'Bombardier Global 7500',     type:'jet',   pax:19, range:7700, initK:78000, fixK:1300, varH:6500, rating:true  },
  // TURBOPROPS
  { name:'Pilatus PC-12 NGX',          type:'turbo', pax:9,  range:1845, initK:4800,  fixK:120,  varH:650,  rating:false },
  { name:'King Air C90GTx',            type:'turbo', pax:6,  range:1120, initK:2800,  fixK:90,   varH:500,  rating:false },
  { name:'King Air 350i',              type:'turbo', pax:11, range:1806, initK:7200,  fixK:160,  varH:850,  rating:false },
  { name:'TBM 960',                    type:'turbo', pax:5,  range:1730, initK:4300,  fixK:100,  varH:600,  rating:false },
  { name:'TBM 850',                    type:'turbo', pax:5,  range:1665, initK:3200,  fixK:90,   varH:540,  rating:false },
  { name:'Piper M600/SLS',             type:'turbo', pax:5,  range:1484, initK:3200,  fixK:85,   varH:480,  rating:false },
  { name:'Daher TBM 700',              type:'turbo', pax:5,  range:1730, initK:2200,  fixK:80,   varH:450,  rating:false },
  { name:'Cessna Caravan 208B',        type:'turbo', pax:14, range:900,  initK:2600,  fixK:70,   varH:420,  rating:false },
  { name:'Piper M500',                 type:'turbo', pax:5,  range:1000, initK:2600,  fixK:75,   varH:430,  rating:false },
  // PISTONS
  { name:'Beechcraft Baron G58',       type:'piston',pax:6,  range:1480, initK:1200,  fixK:35,   varH:150,  rating:false },
  { name:'Piper Seneca V PA-34',       type:'piston',pax:6,  range:900,  initK:500,   fixK:22,   varH:100,  rating:false },
  { name:'Diamond DA42 Twin Star',     type:'piston',pax:4,  range:1000, initK:680,   fixK:22,   varH:95,   rating:false },
  { name:'Cirrus SR22T',               type:'piston',pax:4,  range:1000, initK:800,   fixK:28,   varH:120,  rating:false },
  { name:'Cirrus SR22 GTS',            type:'piston',pax:4,  range:950,  initK:700,   fixK:26,   varH:112,  rating:false },
  { name:'Beechcraft Bonanza G36',     type:'piston',pax:6,  range:1000, initK:680,   fixK:22,   varH:105,  rating:false },
  { name:'Mooney M20V Acclaim Ultra',  type:'piston',pax:4,  range:1360, initK:750,   fixK:25,   varH:110,  rating:false },
  { name:'Cessna 182T Skylane',        type:'piston',pax:4,  range:915,  initK:430,   fixK:18,   varH:85,   rating:false },
  { name:'Cessna 172S Skyhawk',        type:'piston',pax:4,  range:640,  initK:390,   fixK:16,   varH:72,   rating:false },
  { name:'Cessna 172SP',               type:'piston',pax:4,  range:640,  initK:200,   fixK:14,   varH:65,   rating:false },
  { name:'Cessna 152',                 type:'piston',pax:2,  range:415,  initK:55,    fixK:8,    varH:38,   rating:false },
  { name:'Piper Warrior III PA-28-161',type:'piston',pax:4,  range:520,  initK:125,   fixK:11,   varH:52,   rating:false },
  { name:'Piper Cherokee PA-28-180',   type:'piston',pax:4,  range:500,  initK:50,    fixK:9,    varH:45,   rating:false },
  { name:'Piper Archer III PA-28-181', type:'piston',pax:4,  range:520,  initK:170,   fixK:11,   varH:54,   rating:false },
  { name:'Diamond DA40 NG',            type:'piston',pax:4,  range:770,  initK:420,   fixK:17,   varH:78,   rating:false },
  { name:'Piper Cub PA-11',            type:'piston',pax:2,  range:250,  initK:25,    fixK:5,    varH:22,   rating:false },
  { name:'Piper Super Cub PA-18',      type:'piston',pax:2,  range:400,  initK:80,    fixK:7,    varH:28,   rating:false },
  { name:'Extra 330LX',                type:'piston',pax:2,  range:500,  initK:380,   fixK:14,   varH:60,   rating:false },
  { name:'Vans RV-7 homebuilt',        type:'piston',pax:2,  range:800,  initK:60,    fixK:9,    varH:40,   rating:false },
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
