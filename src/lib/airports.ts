// src/lib/airports.ts
// ~300 airports: major international + key tourist destinations
// Europe, North America, rest of world

export type APEntry = {
  icao: string
  name: string
  lat: number
  lon: number
  iata?: string
  fuel: 'JetA' | 'AvGas' | 'both' | 'none'
  rwy_ft: number       // longest runway in feet (approximate)
  ifr: boolean         // has published instrument approach
  customs: boolean     // international customs available
}

export const AIRPORTS: APEntry[] = [
  // ── NORTH AMERICA — USA Major Hubs ──────────────────────
  { icao:'KJFK', iata:'JFK', name:'New York JFK', lat:40.64, lon:-73.78, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KLAX', iata:'LAX', name:'Los Angeles', lat:33.94, lon:-118.41, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KORD', iata:'ORD', name:'Chicago OHare',           lat:41.97,  lon:-87.91,  fuel:'both', rwy_ft:13000, ifr:true,  customs:true  },
  { icao:'KATL', iata:'ATL', name:'Atlanta Hartsfield', lat:33.64, lon:-84.43, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KDFW', iata:'DFW', name:'Dallas Fort Worth', lat:32.90, lon:-97.04, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSFO', iata:'SFO', name:'San Francisco', lat:37.62, lon:-122.38, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KDEN', iata:'DEN', name:'Denver', lat:39.86, lon:-104.67, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMIA', iata:'MIA', name:'Miami', lat:25.80, lon:-80.29, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBOS', iata:'BOS', name:'Boston Logan', lat:42.36, lon:-71.01, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSEA', iata:'SEA', name:'Seattle Tacoma', lat:47.45, lon:-122.31, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPHX', iata:'PHX', name:'Phoenix Sky Harbor', lat:33.44, lon:-112.01, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KEWR', iata:'EWR', name:'Newark Liberty', lat:40.69, lon:-74.17, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMSP', iata:'MSP', name:'Minneapolis St Paul', lat:44.88, lon:-93.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KDTW', iata:'DTW', name:'Detroit Metro', lat:42.21, lon:-83.35, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPHL', iata:'PHL', name:'Philadelphia', lat:39.87, lon:-75.24, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KIAH', iata:'IAH', name:'Houston Intercontinental', lat:29.99, lon:-95.34, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSLC', iata:'SLC', name:'Salt Lake City', lat:40.79, lon:-111.98, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KDCA', iata:'DCA', name:'Washington Reagan', lat:38.85, lon:-77.04, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KIAD', iata:'IAD', name:'Washington Dulles', lat:38.95, lon:-77.46, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMCO', iata:'MCO', name:'Orlando', lat:28.43, lon:-81.31, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KTPA', iata:'TPA', name:'Tampa', lat:27.98, lon:-82.53, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSAN', iata:'SAN', name:'San Diego', lat:32.73, lon:-117.19, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPDX', iata:'PDX', name:'Portland', lat:45.59, lon:-122.60, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KAUS', iata:'AUS', name:'Austin Bergstrom', lat:30.20, lon:-97.67, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBNA', iata:'BNA', name:'Nashville', lat:36.12, lon:-86.68, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCLT', iata:'CLT', name:'Charlotte Douglas', lat:35.21, lon:-80.94, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMSY', iata:'MSY', name:'New Orleans', lat:29.99, lon:-90.26, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPIT', iata:'PIT', name:'Pittsburgh', lat:40.49, lon:-80.23, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KLAS', iata:'LAS', name:'Las Vegas McCarran', lat:36.08, lon:-115.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBWI', iata:'BWI', name:'Baltimore Washington', lat:39.18, lon:-76.67, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCLE', iata:'CLE', name:'Cleveland Hopkins', lat:41.41, lon:-81.85, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMKE', iata:'MKE', name:'Milwaukee Mitchell', lat:42.95, lon:-87.90, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KIND', iata:'IND', name:'Indianapolis', lat:39.72, lon:-86.29, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCMH', iata:'CMH', name:'Columbus', lat:39.99, lon:-82.89, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSTL', iata:'STL', name:'St Louis Lambert', lat:38.75, lon:-90.37, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMEM', iata:'MEM', name:'Memphis', lat:35.04, lon:-89.98, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KRDU', iata:'RDU', name:'Raleigh Durham', lat:35.88, lon:-78.79, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KRSW', iata:'RSW', name:'Fort Myers', lat:26.54, lon:-81.76, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPBI', iata:'PBI', name:'Palm Beach', lat:26.68, lon:-80.10, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSNA', iata:'SNA', name:'Orange County', lat:33.68, lon:-117.87, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KOAK', iata:'OAK', name:'Oakland', lat:37.72, lon:-122.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSJC', iata:'SJC', name:'San Jose', lat:37.36, lon:-121.93, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSMF', iata:'SMF', name:'Sacramento', lat:38.70, lon:-121.59, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KABQ', iata:'ABQ', name:'Albuquerque', lat:35.04, lon:-106.61, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KTUS', iata:'TUS', name:'Tucson', lat:32.12, lon:-110.94, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBUR', iata:'BUR', name:'Burbank Hollywood', lat:34.20, lon:-118.36, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KONT', iata:'ONT', name:'Ontario California', lat:34.06, lon:-117.60, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KFLL', iata:'FLL', name:'Fort Lauderdale', lat:26.07, lon:-80.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KJAX', iata:'JAX', name:'Jacksonville', lat:30.49, lon:-81.69, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSAV', iata:'SAV', name:'Savannah', lat:32.13, lon:-81.20, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── USA — Tourist / Leisure ──────────────────────────────
  { icao:'PHNL', iata:'HNL', name:'Honolulu', lat:21.32, lon:-157.92, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'PHOG', iata:'OGG', name:'Maui Kahului', lat:20.90, lon:-156.43, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'PHKO', iata:'KOA', name:'Kona Hawaii', lat:19.74, lon:-156.05, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'PAJN', iata:'JNU', name:'Juneau Alaska', lat:58.35, lon:-134.57, fuel:'both', rwy_ft:8456, ifr:true, customs:true },
  { icao:'PANC', iata:'ANC', name:'Anchorage', lat:61.17, lon:-149.99, fuel:'both', rwy_ft:12400, ifr:true, customs:true },
  { icao:'KASE', iata:'ASE', name:'Aspen', lat:39.22, lon:-106.87, fuel:'both', rwy_ft:8000, ifr:true, customs:false },
  { icao:'KEGE', iata:'EGE', name:'Vail Eagle County', lat:39.64, lon:-106.92, fuel:'both', rwy_ft:8266, ifr:true, customs:false },
  { icao:'KBZN', iata:'BZN', name:'Bozeman Yellowstone', lat:45.78, lon:-111.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KJAC', iata:'JAC', name:'Jackson Hole', lat:43.61, lon:-110.74, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KACK', iata:'ACK', name:'Nantucket Island', lat:41.25, lon:-70.06, fuel:'both', rwy_ft:6303, ifr:true, customs:false },
  { icao:'KMVY', iata:'MVY', name:'Marthas Vineyard',        lat:41.39,  lon:-70.61,  fuel:'both', rwy_ft:5504,  ifr:true,  customs:false },
  { icao:'KHTO', iata:'HTO', name:'East Hampton', lat:40.96, lon:-72.25, fuel:'both', rwy_ft:4255, ifr:true, customs:false },
  { icao:'KPSC', iata:'PSC', name:'Palm Springs', lat:33.83, lon:-116.51, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSAT', iata:'SAT', name:'San Antonio', lat:29.53, lon:-98.47, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KELP', iata:'ELP', name:'El Paso', lat:31.81, lon:-106.38, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── USA — Business Aviation Hubs ─────────────────────────
  { icao:'KTEB', iata:'TEB', name:'Teterboro NJ', lat:40.85, lon:-74.06, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'KVNY', iata:'VNY', name:'Van Nuys LA', lat:34.21, lon:-118.49, fuel:'both', rwy_ft:8000, ifr:true, customs:false },
  { icao:'KPDK', name:'Peachtree Atlanta', lat:33.88, lon:-84.30, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KDAL', iata:'DAL', name:'Dallas Love Field', lat:32.85, lon:-96.85, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KHOU', iata:'HOU', name:'Houston Hobby', lat:29.64, lon:-95.28, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMDW', iata:'MDW', name:'Chicago Midway', lat:41.79, lon:-87.75, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBFI', iata:'BFI', name:'Boeing Field Seattle', lat:47.53, lon:-122.30, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSQL', name:'San Carlos CA', lat:37.51, lon:-122.25, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KCCR', name:'Concord CA', lat:37.99, lon:-122.06, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KHND', name:'Henderson Executive NV', lat:35.97, lon:-115.13, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KSDL', name:'Scottsdale AZ', lat:33.62, lon:-111.91, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KDVT', name:'Phoenix Deer Valley', lat:33.69, lon:-112.08, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KCHD', name:'Chandler Municipal AZ', lat:33.27, lon:-111.81, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KGYR', name:'Phoenix Goodyear', lat:33.42, lon:-112.38, fuel:'both', rwy_ft:4000, ifr:true, customs:false },

  // ── USA — Northeast ──────────────────────────────────────
  { icao:'KBGR', iata:'BGR', name:'Bangor Maine', lat:44.81, lon:-68.83, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPWM', iata:'PWM', name:'Portland Maine', lat:43.65, lon:-70.31, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBTV', iata:'BTV', name:'Burlington Vermont', lat:44.47, lon:-73.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KALB', iata:'ALB', name:'Albany NY', lat:42.75, lon:-73.80, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBUF', iata:'BUF', name:'Buffalo NY', lat:42.94, lon:-78.73, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSYR', iata:'SYR', name:'Syracuse NY', lat:43.11, lon:-76.11, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KISP', iata:'ISP', name:'Long Island MacArthur', lat:40.80, lon:-73.10, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KFRG', name:'Farmingdale NY', lat:40.73, lon:-73.42, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KHPN', iata:'HPN', name:'Westchester NY', lat:41.07, lon:-73.71, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBDL', iata:'BDL', name:'Hartford Bradley', lat:41.94, lon:-72.68, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPVD', iata:'PVD', name:'Providence RI', lat:41.73, lon:-71.43, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KORH', iata:'ORH', name:'Worcester MA', lat:42.27, lon:-71.88, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPSM', iata:'PSM', name:'Portsmouth NH', lat:43.08, lon:-70.82, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── USA — Southeast ──────────────────────────────────────
  { icao:'KRIC', iata:'RIC', name:'Richmond Virginia', lat:37.51, lon:-77.32, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KORF', name:'Norfolk Virginia', lat:36.90, lon:-76.02, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KGRR', iata:'GRR', name:'Grand Rapids MI', lat:42.88, lon:-85.52, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCHA', iata:'CHA', name:'Chattanooga TN', lat:35.04, lon:-85.20, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KTRI', iata:'TRI', name:'Tri-Cities TN', lat:36.48, lon:-82.41, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KAVL', iata:'AVL', name:'Asheville NC', lat:35.44, lon:-82.54, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KILM', iata:'ILM', name:'Wilmington NC', lat:34.27, lon:-77.90, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCAE', iata:'CAE', name:'Columbia SC', lat:33.94, lon:-81.12, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KGSP', iata:'GSP', name:'Greenville SC', lat:34.90, lon:-82.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMGM', iata:'MGM', name:'Montgomery AL', lat:32.30, lon:-86.39, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBHM', iata:'BHM', name:'Birmingham AL', lat:33.56, lon:-86.75, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMOB', iata:'MOB', name:'Mobile AL', lat:30.69, lon:-88.24, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPNS', iata:'PNS', name:'Pensacola FL', lat:30.47, lon:-87.19, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KTLH', iata:'TLH', name:'Tallahassee FL', lat:30.40, lon:-84.35, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KGNV', iata:'GNV', name:'Gainesville FL', lat:29.69, lon:-82.27, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSPG', name:'St Petersburg FL', lat:27.77, lon:-82.63, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KSRQ', iata:'SRQ', name:'Sarasota FL', lat:27.39, lon:-82.55, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KFPR', iata:'FPR', name:'Fort Pierce FL', lat:27.50, lon:-80.37, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KOPF', name:'Opa-locka Miami', lat:25.91, lon:-80.28, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KFXE', name:'Fort Lauderdale Executive', lat:26.20, lon:-80.17, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KBCT', name:'Boca Raton FL', lat:26.38, lon:-80.11, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KHST', name:'Homestead FL', lat:25.49, lon:-80.38, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KEYW', iata:'EYW', name:'Key West FL', lat:24.56, lon:-81.76, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── USA — Midwest ────────────────────────────────────────
  { icao:'KDSM', iata:'DSM', name:'Des Moines IA', lat:41.53, lon:-93.66, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KOMA', iata:'OMA', name:'Omaha NE', lat:41.30, lon:-95.89, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KFSD', iata:'FSD', name:'Sioux Falls SD', lat:43.58, lon:-96.74, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBIS', iata:'BIS', name:'Bismarck ND', lat:46.77, lon:-100.75, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KFAR', iata:'FAR', name:'Fargo ND', lat:46.92, lon:-96.82, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KRAP', iata:'RAP', name:'Rapid City SD', lat:44.05, lon:-103.06, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCOU', iata:'COU', name:'Columbia MO', lat:38.82, lon:-92.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSGF', iata:'SGF', name:'Springfield MO', lat:37.25, lon:-93.39, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KEVV', iata:'EVV', name:'Evansville IN', lat:38.04, lon:-87.53, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSBN', iata:'SBN', name:'South Bend IN', lat:41.71, lon:-86.32, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KLUK', name:'Cincinnati Lunken OH', lat:39.10, lon:-84.42, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KCVG', iata:'CVG', name:'Cincinnati Northern KY', lat:39.05, lon:-84.67, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KDAY', iata:'DAY', name:'Dayton OH', lat:39.90, lon:-84.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KTOL', iata:'TOL', name:'Toledo OH', lat:41.59, lon:-83.81, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KLAN', iata:'LAN', name:'Lansing MI', lat:42.78, lon:-84.58, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KFLINT', name:'Flint MI', lat:42.97, lon:-83.74, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KARB', name:'Ann Arbor MI', lat:42.23, lon:-83.74, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },

  // ── USA — South Central ──────────────────────────────────
  { icao:'KBRO', iata:'BRO', name:'Brownsville TX', lat:25.91, lon:-97.43, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMFE', iata:'MFE', name:'McAllen TX', lat:26.18, lon:-98.24, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCLL', iata:'CLL', name:'College Station TX', lat:30.59, lon:-96.36, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KACT', iata:'ACT', name:'Waco TX', lat:31.61, lon:-97.23, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KABI', iata:'ABI', name:'Abilene TX', lat:32.41, lon:-99.68, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KLBB', iata:'LBB', name:'Lubbock TX', lat:33.66, lon:-101.82, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMAF', iata:'MAF', name:'Midland Odessa TX', lat:31.94, lon:-102.20, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KTXK', iata:'TXK', name:'Texarkana TX', lat:33.45, lon:-94.01, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KTYR', iata:'TYR', name:'Tyler TX', lat:32.35, lon:-95.40, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSHV', iata:'SHV', name:'Shreveport LA', lat:32.45, lon:-93.83, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBTR', iata:'BTR', name:'Baton Rouge LA', lat:30.53, lon:-91.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KLFT', iata:'LFT', name:'Lafayette LA', lat:30.21, lon:-91.99, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KLIT', iata:'LIT', name:'Little Rock AR', lat:34.73, lon:-92.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KTUL', iata:'TUL', name:'Tulsa OK', lat:36.20, lon:-95.89, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KOKC', iata:'OKC', name:'Oklahoma City', lat:35.39, lon:-97.60, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── USA — Mountain West ──────────────────────────────────
  { icao:'KBIL', iata:'BIL', name:'Billings MT', lat:45.81, lon:-108.54, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KGTF', iata:'GTF', name:'Great Falls MT', lat:47.48, lon:-111.37, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KHLN', iata:'HLN', name:'Helena MT', lat:46.61, lon:-111.98, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KGPI', iata:'FCA', name:'Glacier Park MT', lat:48.31, lon:-114.26, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KIDA', iata:'IDA', name:'Idaho Falls ID', lat:43.51, lon:-112.07, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBOI', iata:'BOI', name:'Boise ID', lat:43.56, lon:-116.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KTWF', iata:'TWF', name:'Twin Falls ID', lat:42.48, lon:-114.49, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCOD', iata:'COD', name:'Cody WY', lat:44.52, lon:-109.02, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KLAR', iata:'LAR', name:'Laramie WY', lat:41.31, lon:-105.67, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KRKS', iata:'RKS', name:'Rock Springs WY', lat:41.60, lon:-109.07, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KGJT', iata:'GJT', name:'Grand Junction CO', lat:39.12, lon:-108.53, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPUB', iata:'PUB', name:'Pueblo CO', lat:38.29, lon:-104.50, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCOS', iata:'COS', name:'Colorado Springs', lat:38.81, lon:-104.70, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KFNL', name:'Fort Collins CO', lat:40.45, lon:-105.01, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KTEX', name:'Telluride CO', lat:37.95, lon:-107.91, fuel:'AvGas', rwy_ft:6870, ifr:true, customs:false },
  { icao:'KMTJ', iata:'MTJ', name:'Montrose CO', lat:38.51, lon:-107.89, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KGUC', name:'Gunnison CO', lat:38.53, lon:-106.93, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KHDN', iata:'HDN', name:'Steamboat Springs CO', lat:40.48, lon:-107.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KLMO', name:'Longmont CO', lat:40.16, lon:-105.16, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KSGU', iata:'SGU', name:'St George UT', lat:37.09, lon:-113.51, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPVU', name:'Provo UT', lat:40.22, lon:-111.72, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KOGD', iata:'OGD', name:'Ogden UT', lat:41.19, lon:-112.01, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCDC', iata:'CDC', name:'Cedar City UT', lat:37.70, lon:-113.10, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSVE', name:'Susanville CA', lat:40.38, lon:-120.57, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KRNO', iata:'RNO', name:'Reno NV', lat:39.50, lon:-119.77, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KBFL', iata:'BFL', name:'Bakersfield CA', lat:35.43, lon:-119.06, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KFAT', iata:'FAT', name:'Fresno CA', lat:36.78, lon:-119.72, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSTS', iata:'STS', name:'Santa Rosa CA', lat:38.51, lon:-122.81, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSBA', iata:'SBA', name:'Santa Barbara CA', lat:34.43, lon:-119.84, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KSMX', iata:'SMX', name:'Santa Maria CA', lat:34.90, lon:-120.46, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KCMA', name:'Camarillo CA', lat:34.21, lon:-119.09, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KSZP', name:'Santa Paula CA', lat:34.35, lon:-119.06, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KSBP', iata:'SBP', name:'San Luis Obispo CA', lat:35.24, lon:-120.64, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KPRB', name:'Paso Robles CA', lat:35.67, lon:-120.63, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KMRY', iata:'MRY', name:'Monterey CA', lat:36.59, lon:-121.84, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KWVI', name:'Watsonville CA', lat:36.94, lon:-121.79, fuel:'both', rwy_ft:4000, ifr:true, customs:false },

  // ── USA — Pacific Northwest ──────────────────────────────
  { icao:'KBLI', iata:'BLI', name:'Bellingham WA', lat:48.79, lon:-122.54, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KOLM', iata:'OLM', name:'Olympia WA', lat:46.97, lon:-122.90, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KYKM', iata:'YKM', name:'Yakima WA', lat:46.57, lon:-120.54, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KGEG', iata:'GEG', name:'Spokane WA', lat:47.62, lon:-117.53, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KEEN', name:'Dryden WA', lat:47.40, lon:-120.34, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'KCVO', name:'Corvallis OR', lat:44.50, lon:-123.29, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KEUG', iata:'EUG', name:'Eugene OR', lat:44.12, lon:-123.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KMFR', iata:'MFR', name:'Medford OR', lat:42.37, lon:-122.87, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KRDM', iata:'RDM', name:'Redmond OR', lat:44.25, lon:-121.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KOTH', iata:'OTH', name:'North Bend OR', lat:43.42, lon:-124.25, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'KAWO', name:'Arlington WA', lat:48.16, lon:-122.16, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KPAE', name:'Paine Field Everett WA', lat:47.91, lon:-122.28, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'KSHN', iata:'SHN', name:'Shelton WA', lat:47.23, lon:-123.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── USA — Alaska ─────────────────────────────────────────
  { icao:'PAFA', iata:'FAI', name:'Fairbanks AK', lat:64.81, lon:-147.86, fuel:'both', rwy_ft:11800, ifr:true, customs:true },
  { icao:'PAKN', iata:'AKN', name:'King Salmon AK', lat:58.68, lon:-156.65, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'PADQ', iata:'ADQ', name:'Kodiak AK', lat:57.75, lon:-152.49, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'PAOM', iata:'OME', name:'Nome AK', lat:64.51, lon:-165.44, fuel:'JetA', rwy_ft:6001, ifr:true, customs:false },
  { icao:'PAOT', iata:'OTZ', name:'Kotzebue AK', lat:66.89, lon:-162.60, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'PABR', iata:'BRW', name:'Barrow AK', lat:71.29, lon:-156.77, fuel:'JetA', rwy_ft:7400, ifr:true, customs:false },
  { icao:'PADL', iata:'DLG', name:'Dillingham AK', lat:59.05, lon:-158.51, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'PABT', iata:'BTT', name:'Bettles AK', lat:66.92, lon:-151.53, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'PAKW', iata:'KWN', name:'Quinhagak AK', lat:59.76, lon:-161.85, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'PASY', iata:'SYA', name:'Shemya AK', lat:52.71, lon:174.11, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  // ── CANADA ───────────────────────────────────────────────
  { icao:'CYYZ', iata:'YYZ', name:'Toronto Pearson', lat:43.68, lon:-79.63, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYVR', iata:'YVR', name:'Vancouver', lat:49.19, lon:-123.18, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYUL', iata:'YUL', name:'Montreal Trudeau', lat:45.47, lon:-73.74, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYEG', iata:'YEG', name:'Edmonton', lat:53.31, lon:-113.58, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYYC', iata:'YYC', name:'Calgary', lat:51.13, lon:-114.01, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYOW', iata:'YOW', name:'Ottawa', lat:45.32, lon:-75.67, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYWG', iata:'YWG', name:'Winnipeg', lat:49.91, lon:-97.24, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYHZ', iata:'YHZ', name:'Halifax', lat:44.88, lon:-63.51, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYQB', iata:'YQB', name:'Quebec City', lat:46.79, lon:-71.39, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYXE', iata:'YXE', name:'Saskatoon', lat:52.17, lon:-106.70, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYZT', iata:'YZT', name:'Port Hardy BC', lat:50.68, lon:-127.37, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYXC', iata:'YXC', name:'Cranbrook BC', lat:49.61, lon:-115.78, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CZBB', iata:'ZBB', name:'Boundary Bay BC', lat:49.07, lon:-123.01, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // Canada — Colombie-Britannique
  { icao:'CYLW', iata:'YLW', name:'Kelowna BC', lat:49.96, lon:-119.38, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYKA', iata:'YKA', name:'Kamloops BC', lat:50.70, lon:-120.44, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYCD', iata:'YCD', name:'Nanaimo BC', lat:49.05, lon:-123.87, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYQQ', iata:'YQQ', name:'Comox BC', lat:49.71, lon:-124.89, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYYJ', iata:'YYJ', name:'Victoria BC', lat:48.65, lon:-123.43, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CZST', name:'Stewart BC', lat:55.94, lon:-129.98, fuel:'both', rwy_ft:3500, ifr:true, customs:false },
  { icao:'CYPR', iata:'YPR', name:'Prince Rupert BC', lat:54.29, lon:-130.44, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYXS', iata:'YXS', name:'Prince George BC', lat:53.89, lon:-122.68, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYWL', iata:'YWL', name:'Williams Lake BC', lat:52.18, lon:-122.05, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYQZ', iata:'YQZ', name:'Quesnel BC', lat:53.03, lon:-122.51, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYPW', iata:'YPW', name:'Powell River BC', lat:49.83, lon:-124.50, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYAZ', iata:'YAZ', name:'Tofino BC', lat:49.08, lon:-125.77, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Canada — Alberta
  { icao:'CYLL', iata:'YLL', name:'Lloydminster AB', lat:53.31, lon:-110.07, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYQF', iata:'YQF', name:'Red Deer AB', lat:52.18, lon:-113.89, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYLH', iata:'YLH', name:'Lethbridge AB', lat:49.63, lon:-112.80, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYMM', iata:'YMM', name:'Fort McMurray AB', lat:56.65, lon:-111.22, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYGP', iata:'YGP', name:'Grande Prairie AB', lat:55.18, lon:-118.88, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYMJ', iata:'YMJ', name:'Moose Jaw AB', lat:50.33, lon:-105.56, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Canada — Saskatchewan
  { icao:'CYPA', iata:'YPA', name:'Prince Albert SK', lat:53.21, lon:-105.67, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYQV', iata:'YQV', name:'Yorkton SK', lat:51.26, lon:-102.46, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYYN', iata:'YYN', name:'Swift Current SK', lat:50.29, lon:-107.69, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYEN', iata:'YEN', name:'Estevan SK', lat:49.21, lon:-102.97, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Canada — Manitoba
  { icao:'CYBR', iata:'YBR', name:'Brandon MB', lat:49.91, lon:-99.95, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYTH', iata:'YTH', name:'Thompson MB', lat:55.80, lon:-97.86, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CZFM', iata:'ZFM', name:'Fort McPherson NWT', lat:67.41, lon:-134.86, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Canada — Ontario
  { icao:'CYAM', iata:'YAM', name:'Sault Ste Marie ON', lat:46.48, lon:-84.51, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYTS', iata:'YTS', name:'Timmins ON', lat:48.57, lon:-81.38, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYSB', iata:'YSB', name:'Sudbury ON', lat:46.62, lon:-80.80, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYKF', iata:'YKF', name:'Waterloo ON', lat:43.46, lon:-80.38, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYHY', iata:'YHY', name:'Hay River NWT', lat:60.84, lon:-115.78, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYWK', iata:'YWK', name:'Wawa ON', lat:47.97, lon:-84.79, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYXU', iata:'YXU', name:'London ON', lat:43.03, lon:-81.15, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYQT', iata:'YQT', name:'Thunder Bay ON', lat:48.37, lon:-89.32, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYLB', iata:'YLB', name:'Lac La Biche AB', lat:54.77, lon:-112.03, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYKZ', name:'Toronto Buttonville ON', lat:43.86, lon:-79.37, fuel:'both', rwy_ft:3500, ifr:true, customs:false },
  { icao:'CYOO', iata:'YOO', name:'Oshawa ON', lat:43.92, lon:-78.89, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYHM', iata:'YHM', name:'Hamilton ON', lat:43.17, lon:-79.93, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYQA', iata:'YQA', name:'Muskoka ON', lat:44.97, lon:-79.30, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYPQ', iata:'YPQ', name:'Peterborough ON', lat:44.23, lon:-78.36, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYVV', iata:'YVV', name:'Wiarton ON', lat:44.75, lon:-81.11, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Canada — Quebec
  { icao:'CYVO', iata:'YVO', name:'Val dOr QC',              lat:48.05,  lon:-77.78,  fuel:'both', rwy_ft:8000,  ifr:true,  customs:false },
  { icao:'CYRJ', iata:'YRJ', name:'Roberval QC', lat:48.52, lon:-72.27, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYYY', iata:'YYY', name:'Mont Joli QC', lat:48.61, lon:-68.21, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYGR', iata:'YGR', name:'Iles-de-la-Madeleine QC', lat:47.42, lon:-61.78, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYSJ', iata:'YSJ', name:'Saint John NB', lat:45.32, lon:-65.89, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYCH', iata:'YCH', name:'Miramichi NB', lat:47.01, lon:-65.45, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYYG', iata:'YYG', name:'Charlottetown PEI', lat:46.29, lon:-63.12, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Canada — Maritimes & Terre-Neuve
  { icao:'CYYT', iata:'YYT', name:'St Johns Newfoundland',   lat:47.62,  lon:-52.75,  fuel:'both', rwy_ft:8500,  ifr:true,  customs:true  },
  { icao:'CYQX', iata:'YQX', name:'Gander Newfoundland', lat:48.94, lon:-54.57, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYQM', iata:'YQM', name:'Moncton NB', lat:46.11, lon:-64.68, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYFC', iata:'YFC', name:'Fredericton NB', lat:45.87, lon:-66.54, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYHF', iata:'YHF', name:'Hearst ON', lat:49.71, lon:-83.68, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Canada — Territoires du Nord
  { icao:'CYXY', iata:'YXY', name:'Whitehorse YK', lat:60.71, lon:-135.07, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYDA', iata:'YDA', name:'Dawson City YK', lat:64.04, lon:-139.13, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CZFA', iata:'ZFA', name:'Faro YK', lat:62.21, lon:-133.38, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'CYZF', iata:'YZF', name:'Yellowknife NWT', lat:62.46, lon:-114.44, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYER', iata:'YER', name:'Fort Severn ON', lat:56.02, lon:-87.68, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'CYCS', iata:'YCS', name:'Chesterfield Inlet NU', lat:63.35, lon:-90.73, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'CYCB', iata:'YCB', name:'Cambridge Bay NU', lat:69.11, lon:-105.14, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'CYEV', iata:'YEV', name:'Inuvik NWT', lat:68.30, lon:-133.48, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'CYRB', iata:'YRB', name:'Resolute Bay NU', lat:74.72, lon:-94.97, fuel:'JetA', rwy_ft:6800, ifr:true, customs:false },
  { icao:'CYCO', iata:'YCO', name:'Kugluktuk NU', lat:67.82, lon:-115.14, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'CYIO', iata:'YIO', name:'Pond Inlet NU', lat:72.68, lon:-77.97, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  { icao:'CYGZ', iata:'YGZ', name:'Grise Fiord NU', lat:76.43, lon:-82.91, fuel:'AvGas', rwy_ft:2500, ifr:false, customs:false },
  // ── MEXICO & CARIBBEAN ───────────────────────────────────
  { icao:'MMMX', iata:'MEX', name:'Mexico City', lat:19.44, lon:-99.07, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MMCUN', iata:'CUN', name:'Cancun', lat:21.04, lon:-86.87, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MMSD', iata:'SJD', name:'Los Cabos', lat:23.15, lon:-109.72, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MMPR', iata:'PVR', name:'Puerto Vallarta', lat:20.68, lon:-105.25, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MMGL', iata:'GDL', name:'Guadalajara', lat:20.52, lon:-103.31, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MMMY', iata:'MTY', name:'Monterrey', lat:25.78, lon:-100.11, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MMZH', iata:'ZIH', name:'Zihuatanejo Ixtapa', lat:17.60, lon:-101.46, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MMHO', iata:'HMO', name:'Hermosillo', lat:29.09, lon:-111.05, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MHSC', iata:'XPL', name:'Comayagua Honduras', lat:14.38, lon:-87.62, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MDSD', iata:'SDQ', name:'Santo Domingo', lat:18.43, lon:-69.67, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MDPC', iata:'PUJ', name:'Punta Cana', lat:18.57, lon:-68.36, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MKJP', iata:'KIN', name:'Kingston Jamaica', lat:17.94, lon:-76.79, fuel:'both', rwy_ft:8915, ifr:true, customs:true },
  { icao:'MSLP', iata:'SAL', name:'San Salvador', lat:13.44, lon:-89.06, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'TNCM', iata:'SXM', name:'Sint Maarten', lat:18.04, lon:-63.11, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'TFFR', iata:'PTP', name:'Pointe-a-Pitre Guadeloupe', lat:16.27, lon:-61.53, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'TFFF', iata:'FDF', name:'Fort-de-France Martinique', lat:14.59, lon:-61.00, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MBPV', iata:'PLS', name:'Providenciales Turks', lat:21.77, lon:-72.27, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MYEF', iata:'GGT', name:'George Town Bahamas', lat:23.56, lon:-75.88, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MYGF', iata:'FPO', name:'Freeport Bahamas', lat:26.56, lon:-78.70, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'TNCA', iata:'AUA', name:'Aruba', lat:12.50, lon:-70.01, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'TNCB', iata:'BON', name:'Bonaire', lat:12.13, lon:-68.27, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'MUGM', iata:'GTM', name:'Guantanamo Cuba', lat:19.91, lon:-75.21, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  // ── EUROPE — UK & Ireland ────────────────────────────────
  { icao:'EGLL', iata:'LHR', name:'London Heathrow', lat:51.48, lon:-.46, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGKK', iata:'LGW', name:'London Gatwick', lat:51.15, lon:-.19, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGLC', iata:'LCY', name:'London City', lat:51.50, lon:.05, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGSS', iata:'STN', name:'London Stansted', lat:51.89, lon:.24, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGCC', iata:'MAN', name:'Manchester', lat:53.35, lon:-2.27, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGPH', iata:'EDI', name:'Edinburgh', lat:55.95, lon:-3.37, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGPF', iata:'GLA', name:'Glasgow', lat:55.87, lon:-4.43, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EIDW', iata:'DUB', name:'Dublin', lat:53.43, lon:-6.27, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EINN', iata:'SNN', name:'Shannon', lat:52.70, lon:-8.92, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGBB', iata:'BHX', name:'Birmingham UK', lat:52.45, lon:-1.75, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGGD', iata:'BRS', name:'Bristol', lat:51.38, lon:-2.72, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGAA', iata:'BFS', name:'Belfast', lat:54.66, lon:-6.22, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGNX', iata:'EMA', name:'East Midlands', lat:52.83, lon:-1.33, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGNT', iata:'NCL', name:'Newcastle', lat:55.04, lon:-1.69, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGHH', iata:'BOH', name:'Bournemouth', lat:50.78, lon:-1.84, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGHI', iata:'SOU', name:'Southampton', lat:50.95, lon:-1.36, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // UK — Aérodromes régionaux
  { icao:'EGPB', iata:'LSI', name:'Sumburgh Shetland', lat:59.88, lon:-1.30, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGPD', iata:'ABZ', name:'Aberdeen', lat:57.20, lon:-2.20, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGPE', iata:'INV', name:'Inverness', lat:57.54, lon:-4.05, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGPC', iata:'WIC', name:'Wick', lat:58.46, lon:-3.09, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGPK', iata:'PIK', name:'Glasgow Prestwick', lat:55.51, lon:-4.59, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGNM', iata:'LBA', name:'Leeds Bradford', lat:53.87, lon:-1.66, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGNJ', iata:'HUY', name:'Humberside', lat:53.58, lon:-.35, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGYM', iata:'KNF', name:'Marham Norfolk', lat:52.65, lon:.55, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGTE', iata:'EXT', name:'Exeter', lat:50.73, lon:-3.41, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGHQ', iata:'NQY', name:'Newquay Cornwall', lat:50.44, lon:-4.99, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGHC', iata:'LEQ', name:'Lands End',               lat:50.10,  lon:-5.67,   fuel:'AvGas', rwy_ft:2297, ifr:false, customs:false },
  { icao:'EGHE', iata:'ISC', name:'Scilly Isles', lat:49.91, lon:-6.29, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGJA', iata:'ACI', name:'Alderney Channel Islands', lat:49.71, lon:-2.22, fuel:'both', rwy_ft:2887, ifr:true, customs:true },
  { icao:'EGJB', iata:'GCI', name:'Guernsey', lat:49.43, lon:-2.60, fuel:'both', rwy_ft:4800, ifr:true, customs:true },
  { icao:'EGJJ', iata:'JER', name:'Jersey', lat:49.21, lon:-2.20, fuel:'both', rwy_ft:5000, ifr:true, customs:true },
  { icao:'EGPO', iata:'SYY', name:'Stornoway Hebrides', lat:58.22, lon:-6.33, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGPU', iata:'TRE', name:'Tiree Hebrides', lat:56.50, lon:-6.87, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGEO', iata:'OBN', name:'Oban Scotland', lat:56.46, lon:-5.40, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGPN', iata:'DND', name:'Dundee', lat:56.45, lon:-3.02, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGNV', iata:'MME', name:'Durham Tees Valley', lat:54.51, lon:-1.43, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGNH', iata:'BLK', name:'Blackpool', lat:53.77, lon:-3.03, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGNR', iata:'HAW', name:'Hawarden Chester', lat:53.18, lon:-2.98, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGFH', iata:'SWS', name:'Swansea', lat:51.61, lon:-4.07, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGFF', iata:'CWL', name:'Cardiff Wales', lat:51.40, lon:-3.34, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGCK', name:'Caernarfon Wales', lat:53.10, lon:-4.34, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'EGBP', iata:'GBA', name:'Kemble Cotswolds', lat:51.67, lon:-2.06, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'EGBE', iata:'CVT', name:'Coventry', lat:52.37, lon:-1.48, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGBJ', iata:'GLO', name:'Gloucestershire', lat:51.89, lon:-2.17, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGLF', name:'Farnborough', lat:51.28, lon:-.78, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EGMD', iata:'LYX', name:'Lydd', lat:50.96, lon:.94, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EGKA', name:'Shoreham Brighton', lat:50.83, lon:-.30, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'EGKB', name:'Biggin Hill London', lat:51.33, lon:.03, fuel:'both', rwy_ft:5900, ifr:true, customs:false },
  { icao:'EGTK', name:'Oxford Kidlington', lat:51.84, lon:-1.32, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'EGBK', name:'Sywell Northampton', lat:52.31, lon:-.79, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'EGSG', name:'Stapleford Essex', lat:51.65, lon:.16, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'EGSC', iata:'CBG', name:'Cambridge', lat:52.21, lon:.18, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Irlande — régional
  { icao:'EIDL', iata:'CFN', name:'Donegal Ireland', lat:55.04, lon:-8.34, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EIKN', iata:'NOC', name:'Knock Ireland', lat:53.91, lon:-8.82, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EIWF', iata:'WAT', name:'Waterford Ireland', lat:52.19, lon:-7.09, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EIKY', iata:'KIR', name:'Kerry Ireland', lat:52.18, lon:-9.52, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── EUROPE — Netherlands, Belgium, Luxembourg ───────────
  { icao:'EHAM', iata:'AMS', name:'Amsterdam Schiphol', lat:52.31, lon:4.77, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EHBK', iata:'MST', name:'Maastricht', lat:50.91, lon:5.77, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EBBR', iata:'BRU', name:'Brussels', lat:50.90, lon:4.48, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EBOS', iata:'OST', name:'Ostend', lat:51.20, lon:2.86, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'ELLX', iata:'LUX', name:'Luxembourg', lat:49.63, lon:6.21, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  // Belgique & Pays-Bas — régional
  { icao:'EBCI', iata:'CRL', name:'Brussels Charleroi', lat:50.46, lon:4.45, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EBLG', iata:'LGG', name:'Liege', lat:50.64, lon:5.44, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EBAW', iata:'ANR', name:'Antwerp', lat:51.19, lon:4.46, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EBKT', iata:'KJK', name:'Kortrijk Wevelgem', lat:50.82, lon:3.20, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EHRD', iata:'RTM', name:'Rotterdam The Hague', lat:51.96, lon:4.44, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EHHV', name:'Hilversum Netherlands', lat:52.19, lon:5.15, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'EHLE', iata:'LEY', name:'Lelystad Netherlands', lat:52.46, lon:5.53, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EHGG', iata:'GRQ', name:'Groningen Eelde', lat:53.12, lon:6.58, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EHMZ', iata:'MST', name:'Maastricht Aachen', lat:50.91, lon:5.77, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EHTE', name:'Teuge Netherlands', lat:52.24, lon:6.05, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },

  // ── EUROPE — Switzerland & Austria ──────────────────────
  { icao:'LSZH', iata:'ZRH', name:'Zurich', lat:47.46, lon:8.55, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LSGG', iata:'GVA', name:'Geneva', lat:46.24, lon:6.11, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LSZB', iata:'BRN', name:'Bern', lat:46.91, lon:7.50, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LOWW', iata:'VIE', name:'Vienna', lat:48.11, lon:16.57, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LOWI', iata:'INN', name:'Innsbruck', lat:47.26, lon:11.34, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LOWS', iata:'SZG', name:'Salzburg', lat:47.79, lon:13.00, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LOWG', iata:'GRZ', name:'Graz', lat:46.99, lon:15.44, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LSZS', iata:'SMV', name:'Samedan St Moritz', lat:46.53, lon:9.88, fuel:'JetA', rwy_ft:5594, ifr:true, customs:false },

  // ── EUROPE — Scandinavia ─────────────────────────────────
  { icao:'ENGM', iata:'OSL', name:'Oslo Gardermoen', lat:60.19, lon:11.10, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESSA', iata:'ARN', name:'Stockholm Arlanda', lat:59.65, lon:17.92, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EKCH', iata:'CPH', name:'Copenhagen', lat:55.62, lon:12.65, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFHK', iata:'HEL', name:'Helsinki', lat:60.32, lon:24.96, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'BIRK', iata:'RKV', name:'Reykjavik', lat:64.13, lon:-21.94, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'BIKF', iata:'KEF', name:'Keflavik Iceland', lat:63.99, lon:-22.61, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENBO', iata:'BOO', name:'Bodo Norway', lat:67.27, lon:14.36, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENTC', iata:'TOS', name:'Tromso Norway', lat:69.68, lon:18.92, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESMS', iata:'MMX', name:'Malmo Sweden', lat:55.54, lon:13.37, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESGG', iata:'GOT', name:'Gothenburg', lat:57.66, lon:12.29, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENGN', iata:'GEN', name:'Geilo Norway', lat:60.49, lon:8.51, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Scandinavie — régional
  // Norvège
  { icao:'ENBR', iata:'BGO', name:'Bergen Norway', lat:60.29, lon:5.22, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENVA', iata:'TRD', name:'Trondheim Norway', lat:63.46, lon:10.93, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENZV', iata:'SVG', name:'Stavanger Norway', lat:58.88, lon:5.64, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENKR', iata:'KKN', name:'Kirkenes Norway', lat:69.73, lon:29.89, fuel:'JetA', rwy_ft:6234, ifr:true, customs:true },
  { icao:'ENOL', iata:'MOL', name:'Molde Norway', lat:62.74, lon:7.26, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENFL', iata:'FDE', name:'Forde Norway', lat:61.39, lon:5.76, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENEV', iata:'EVE', name:'Harstad Narvik', lat:68.49, lon:16.68, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENAL', iata:'AAL', name:'Aalesund Norway', lat:62.56, lon:6.12, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENSK', iata:'SKN', name:'Stokmarknes Norway', lat:68.58, lon:15.03, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENSH', iata:'SOG', name:'Sogndal Norway', lat:61.16, lon:7.14, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENNK', iata:'NVK', name:'Narvik Norway', lat:68.44, lon:17.39, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ENLK', iata:'LKL', name:'Lakselv Norway', lat:70.07, lon:24.97, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Suède
  { icao:'ESSP', iata:'NRK', name:'Norrkoping Sweden', lat:58.59, lon:16.25, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESNU', iata:'UME', name:'Umea Sweden', lat:63.79, lon:20.28, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESNQ', iata:'KRF', name:'Kramfors Sweden', lat:62.93, lon:17.77, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESND', iata:'OSD', name:'Ostersund Sweden', lat:63.20, lon:14.50, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESNX', iata:'AJR', name:'Arvidsjaur Sweden', lat:65.59, lon:19.28, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESNL', iata:'LYC', name:'Lycksele Sweden', lat:64.55, lon:18.72, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESNI', iata:'SDL', name:'Sundsvall Sweden', lat:62.52, lon:17.44, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESOK', iata:'KSD', name:'Karlstad Sweden', lat:59.44, lon:13.34, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESUP', iata:'LLA', name:'Lulea Sweden', lat:65.54, lon:22.12, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESNV', iata:'VHM', name:'Vilhelmina Sweden', lat:64.58, lon:16.83, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESKN', iata:'NYO', name:'Stockholm Skavsta', lat:58.79, lon:16.91, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESOW', iata:'VST', name:'Stockholm Vasteras', lat:59.59, lon:16.63, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'ESPA', iata:'LLA', name:'Lulea Kallax', lat:65.54, lon:22.12, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Danemark
  { icao:'EKBI', iata:'BLL', name:'Billund Denmark', lat:55.74, lon:9.15, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EKAH', iata:'AAR', name:'Aarhus Denmark', lat:56.30, lon:10.62, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EKOD', iata:'ODE', name:'Odense Denmark', lat:55.48, lon:10.33, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EKRN', iata:'RNN', name:'Bornholm Denmark', lat:55.06, lon:14.76, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EKSB', iata:'SGD', name:'Sonderborg Denmark', lat:54.96, lon:9.79, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EKYT', iata:'AAL', name:'Aalborg Denmark', lat:57.09, lon:9.85, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EKKA', iata:'KRP', name:'Karup Denmark', lat:56.30, lon:9.12, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Finlande
  { icao:'EFTU', iata:'TKU', name:'Turku Finland', lat:60.51, lon:22.26, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFOU', iata:'OUL', name:'Oulu Finland', lat:64.93, lon:25.35, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFTP', iata:'TMP', name:'Tampere Finland', lat:61.41, lon:23.60, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFVA', iata:'VAA', name:'Vaasa Finland', lat:63.05, lon:21.76, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFKU', iata:'KUO', name:'Kuopio Finland', lat:63.01, lon:27.80, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFRO', iata:'RVN', name:'Rovaniemi Finland', lat:66.56, lon:25.83, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFIV', iata:'IVL', name:'Ivalo Finland', lat:68.61, lon:27.41, fuel:'JetA', rwy_ft:8202, ifr:true, customs:false },
  { icao:'EFJY', iata:'JYV', name:'Jyvaskyla Finland', lat:62.40, lon:25.68, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFLP', iata:'LPP', name:'Lappeenranta Finland', lat:61.04, lon:28.14, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Islande — régional
  { icao:'BIHN', iata:'HFN', name:'Hornafjordur Iceland', lat:64.30, lon:-15.23, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'BIAE', iata:'AEY', name:'Akureyri Iceland', lat:65.66, lon:-18.07, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'BIIS', iata:'IFJ', name:'Isafjordur Iceland', lat:66.06, lon:-23.14, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'BIKP', iata:'OPA', name:'Kopasker Iceland', lat:66.31, lon:-16.47, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFPG', iata:'CDG', name:'Paris Charles de Gaulle', lat:49.01, lon:2.55, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFPO', iata:'ORY', name:'Paris Orly', lat:48.72, lon:2.38, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFMN', iata:'NCE', name:'Nice Cote dAzur',         lat:43.66,  lon:7.21,    fuel:'both', rwy_ft:9652,  ifr:true,  customs:true  },
  { icao:'LFML', iata:'MRS', name:'Marseille Provence', lat:43.44, lon:5.22, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFLL', iata:'LYS', name:'Lyon Saint Exupery', lat:45.72, lon:5.09, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBO', iata:'TLS', name:'Toulouse Blagnac', lat:43.63, lon:1.37, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBD', iata:'BOD', name:'Bordeaux', lat:44.83, lon:-.72, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFRN', iata:'RNS', name:'Rennes', lat:48.07, lon:-1.73, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFST', iata:'SXB', name:'Strasbourg', lat:48.54, lon:7.63, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFMK', iata:'CCF', name:'Carcassonne', lat:43.22, lon:2.31, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFKJ', iata:'AJA', name:'Ajaccio Corsica', lat:41.92, lon:8.80, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFKB', iata:'BIA', name:'Bastia Corsica', lat:42.55, lon:9.48, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFTH', iata:'TLN', name:'Toulon Hyeres', lat:43.10, lon:6.15, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFLY', iata:'LYN', name:'Lyon Bron', lat:45.73, lon:4.94, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── FRANCE — Aérodromes régionaux ────────────────────────
  // Côte d'Azur / PACA
  { icao:'LFMD', name:'Cannes Mandelieu', lat:43.55, lon:6.95, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'LFMV', name:'Avignon Caumont', lat:43.91, lon:4.90, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'LFMA', name:'Aix en Provence', lat:43.50, lon:5.37, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'LFMO', name:'Orange Caritat', lat:44.14, lon:4.87, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'LFMQ', name:'Le Castellet', lat:43.25, lon:5.78, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'LFMT', iata:'MPL', name:'Montpellier', lat:43.58, lon:3.96, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFKC', name:'Calvi Sainte Catherine', lat:42.53, lon:8.79, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'LFKF', name:'Figari Sud Corse', lat:41.50, lon:9.10, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  // Alpes
  { icao:'LFKX', name:'Megeve Altiport', lat:45.82, lon:6.65, fuel:'AvGas', rwy_ft:1500, ifr:false, customs:false },
  { icao:'LFLJ', name:'Courchevel Altiport', lat:45.40, lon:6.63, fuel:'AvGas', rwy_ft:1722, ifr:false, customs:false },
  { icao:'LFHM', name:'Megeve Mont Blanc', lat:45.82, lon:6.66, fuel:'AvGas', rwy_ft:1800, ifr:false, customs:false },
  { icao:'LFLS', iata:'GNB', name:'Grenoble Isere', lat:45.36, lon:5.33, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFLB', iata:'CMF', name:'Chambery Savoie', lat:45.64, lon:5.88, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFKZ', name:'Saint Gervais Mont Blanc', lat:45.87, lon:6.70, fuel:'AvGas', rwy_ft:1800, ifr:false, customs:false },
  // Normandie / Bretagne
  { icao:'LFRG', iata:'DOL', name:'Deauville Normandie', lat:49.36, lon:0.15, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFRS', iata:'NTE', name:'Nantes Atlantique', lat:47.15, lon:-1.61, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFRH', iata:'LRT', name:'Lorient Bretagne', lat:47.76, lon:-3.44, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFRD', iata:'DNR', name:'Dinard Pleurtuit', lat:48.59, lon:-2.08, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFRZ', iata:'SNR', name:'Saint Nazaire', lat:47.31, lon:-2.15, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFRO', iata:'LAN', name:'Lannion', lat:48.75, lon:-3.47, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFRC', iata:'CER', name:'Cherbourg Maupertus', lat:49.65, lon:-1.47, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Centre / Ouest
  { icao:'LFLW', iata:'AUR', name:'Aurillac', lat:44.89, lon:2.42, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBI', iata:'PIS', name:'Poitiers Biard', lat:46.59, lon:0.31, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFLX', iata:'CHR', name:'Chateauroux Deols', lat:46.86, lon:1.73, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBU', iata:'ANG', name:'Angouleme', lat:45.73, lon:0.22, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBX', iata:'PGX', name:'Perigueux Bassillac', lat:45.20, lon:0.82, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBA', iata:'AGF', name:'Agen La Garenne', lat:44.17, lon:0.59, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBP', iata:'PUF', name:'Pau Pyrenees', lat:43.38, lon:-0.42, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBT', iata:'LDE', name:'Tarbes Lourdes', lat:43.18, lon:-0.01, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Nord / Est
  { icao:'LFQQ', iata:'LIL', name:'Lille Lesquin', lat:50.57, lon:3.09, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFOB', iata:'BVA', name:'Paris Beauvais', lat:49.45, lon:2.11, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFPB', iata:'LBG', name:'Paris Le Bourget', lat:48.97, lon:2.44, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFOP', iata:'URO', name:'Rouen Vallee Seine', lat:49.38, lon:1.18, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFOE', iata:'EVX', name:'Evreux Fauville', lat:49.03, lon:1.22, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFQB', iata:'TRS', name:'Troyes Barberey', lat:48.32, lon:4.02, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFSB', iata:'BSL', name:'Bale Mulhouse', lat:47.59, lon:7.53, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFSM', name:'Montbeliard Courcelles', lat:47.49, lon:6.79, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  // Sud-Ouest
  { icao:'LFBH', iata:'RYN', name:'Rochefort Soubise', lat:45.89, lon:-0.97, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBN', iata:'NIT', name:'Niort Souche', lat:46.31, lon:-0.40, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFBZ', iata:'BIQ', name:'Biarritz Pays Basque', lat:43.47, lon:-1.52, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFCK', iata:'DCM', name:'Castres Mazamet', lat:43.56, lon:2.29, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFCR', iata:'RDZ', name:'Rodez Aveyron', lat:44.41, lon:2.48, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFCW', name:'Villeneuve sur Lot', lat:44.40, lon:0.76, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  // Rhone-Alpes / Bourgogne
  { icao:'LFHP', iata:'LPY', name:'Le Puy en Velay', lat:45.08, lon:3.76, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFLC', iata:'CFE', name:'Clermont Ferrand', lat:45.79, lon:3.17, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFLN', iata:'SYT', name:'Saint Yan', lat:46.41, lon:4.01, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFGJ', iata:'DLE', name:'Dole Tavaux', lat:47.04, lon:5.43, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LFLV', iata:'VHY', name:'Vichy Charmeil', lat:46.17, lon:3.40, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── EUROPE — Germany ─────────────────────────────────────
  { icao:'EDDF', iata:'FRA', name:'Frankfurt', lat:50.04, lon:8.56, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDM', iata:'MUC', name:'Munich', lat:48.35, lon:11.78, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDB', iata:'BER', name:'Berlin Brandenburg', lat:52.35, lon:13.51, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDH', iata:'HAM', name:'Hamburg', lat:53.63, lon:10.00, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDK', iata:'CGN', name:'Cologne Bonn', lat:50.87, lon:7.14, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDL', iata:'DUS', name:'Dusseldorf', lat:51.29, lon:6.77, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDS', iata:'STR', name:'Stuttgart', lat:48.69, lon:9.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDN', iata:'NUE', name:'Nuremberg', lat:49.50, lon:11.08, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDP', iata:'LEJ', name:'Leipzig Halle', lat:51.43, lon:12.24, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDC', iata:'DRS', name:'Dresden', lat:51.13, lon:13.77, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  // ── EUROPE — Spain ───────────────────────────────────────
  { icao:'LEMD', iata:'MAD', name:'Madrid Barajas', lat:40.47, lon:-3.56, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEBL', iata:'BCN', name:'Barcelona El Prat', lat:41.30, lon:2.08, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEMG', iata:'AGP', name:'Malaga', lat:36.67, lon:-4.50, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEPA', iata:'PMI', name:'Palma de Mallorca', lat:39.55, lon:2.74, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEAL', iata:'ALC', name:'Alicante', lat:38.28, lon:-0.56, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEZL', iata:'SVQ', name:'Seville', lat:37.42, lon:-5.90, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEVC', iata:'VLC', name:'Valencia', lat:39.49, lon:-0.48, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEGR', iata:'GRX', name:'Granada', lat:37.19, lon:-3.78, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEBB', iata:'BIO', name:'Bilbao', lat:43.30, lon:-2.91, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LECO', iata:'LCG', name:'A Coruna', lat:43.30, lon:-8.38, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LXGB', iata:'GIB', name:'Gibraltar', lat:36.15, lon:-5.35, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GCFV', iata:'FUE', name:'Fuerteventura', lat:28.45, lon:-13.86, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GCLP', iata:'LPA', name:'Gran Canaria', lat:27.93, lon:-15.39, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GCTS', iata:'TFS', name:'Tenerife South', lat:28.04, lon:-16.57, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GCXO', iata:'TFN', name:'Tenerife North', lat:28.48, lon:-16.34, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GCLA', iata:'SPC', name:'La Palma Canaries', lat:28.63, lon:-17.76, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GCHI', iata:'VDE', name:'El Hierro', lat:27.81, lon:-17.89, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  // Espagne — Aérodromes régionaux
  { icao:'LEIB', iata:'IBZ', name:'Ibiza', lat:38.87, lon:1.37, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEMH', iata:'MAH', name:'Menorca', lat:39.86, lon:4.22, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LESO', iata:'EAS', name:'San Sebastian', lat:43.36, lon:-1.79, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEPP', iata:'PNA', name:'Pamplona', lat:42.77, lon:-1.65, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LERS', iata:'REU', name:'Reus Tarragona', lat:41.15, lon:1.17, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEGE', iata:'GRO', name:'Girona Costa Brava', lat:41.90, lon:2.76, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LELC', iata:'MJV', name:'Murcia San Javier', lat:37.77, lon:-0.81, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEVD', iata:'VLL', name:'Valladolid', lat:41.71, lon:-4.85, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEXJ', iata:'SDR', name:'Santander', lat:43.43, lon:-3.82, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEAS', iata:'OVD', name:'Asturias', lat:43.56, lon:-6.03, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEVT', iata:'VIT', name:'Vitoria', lat:42.88, lon:-2.72, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEAB', iata:'ABC', name:'Albacete Los Llanos', lat:38.95, lon:-1.86, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEAM', iata:'LEI', name:'Almeria', lat:36.84, lon:-2.37, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LEJA', name:'Jerez de la Frontera', lat:36.74, lon:-6.06, fuel:'both', rwy_ft:4500, ifr:true, customs:false },
  { icao:'LERJ', iata:'RJL', name:'Logrono La Rioja', lat:42.46, lon:-2.32, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LECU', name:'Madrid Cuatro Vientos', lat:40.37, lon:-3.79, fuel:'both', rwy_ft:4500, ifr:true, customs:false },
  { icao:'LETO', name:'Madrid Torrejon', lat:40.49, lon:-3.45, fuel:'both', rwy_ft:4500, ifr:true, customs:false },
  { icao:'LELL', name:'Barcelona Sabadell', lat:41.52, lon:2.10, fuel:'both', rwy_ft:4500, ifr:true, customs:false },

  // ── EUROPE — Italy ───────────────────────────────────────
  { icao:'LIRF', iata:'FCO', name:'Rome Fiumicino', lat:41.80, lon:12.24, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIML', iata:'LIN', name:'Milan Linate', lat:45.45, lon:9.28, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIMC', iata:'MXP', name:'Milan Malpensa', lat:45.63, lon:8.72, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIPZ', iata:'VCE', name:'Venice Marco Polo', lat:45.50, lon:12.35, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIMF', iata:'TRN', name:'Turin', lat:45.20, lon:7.65, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIRN', iata:'NAP', name:'Naples', lat:40.88, lon:14.29, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LICJ', iata:'PMO', name:'Palermo Sicily', lat:38.18, lon:13.10, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LICC', iata:'CTA', name:'Catania Sicily', lat:37.47, lon:15.07, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIBR', iata:'BRI', name:'Bari', lat:41.14, lon:16.76, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIPE', iata:'BLQ', name:'Bologna', lat:44.53, lon:11.29, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIPB', iata:'BZO', name:'Bolzano', lat:46.46, lon:11.33, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIRA', iata:'CIA', name:'Rome Ciampino', lat:41.80, lon:12.59, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LICB', iata:'CIY', name:'Comiso Sicily', lat:36.99, lon:14.61, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  // Italie — Aérodromes régionaux
  { icao:'LIEE', iata:'CAG', name:'Cagliari Sardinia', lat:39.25, lon:9.06, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIEO', iata:'OLB', name:'Olbia Costa Smeralda', lat:40.90, lon:9.52, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIED', iata:'DCI', name:'Decimomannu Sardinia', lat:39.35, lon:8.97, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIME', iata:'BGY', name:'Bergamo Orio al Serio', lat:45.67, lon:9.70, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIMP', iata:'PMF', name:'Parma', lat:44.82, lon:10.30, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIMJ', iata:'GOA', name:'Genoa Cristoforo Colombo', lat:44.41, lon:8.84, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIRZ', iata:'PEG', name:'Perugia San Francesco', lat:43.10, lon:12.51, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIQL', iata:'TPS', name:'Trapani Birgi Sicily', lat:37.91, lon:12.49, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIPY', iata:'AOI', name:'Ancona Falconara', lat:43.62, lon:13.36, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIPQ', iata:'TRS', name:'Trieste', lat:45.83, lon:13.47, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIPX', iata:'VRN', name:'Verona Villafranca', lat:45.40, lon:10.89, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIPH', iata:'TSF', name:'Treviso Sant Angelo', lat:45.65, lon:12.19, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIBN', iata:'BDS', name:'Brindisi Papola', lat:40.66, lon:17.95, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIBC', iata:'CRV', name:'Crotone', lat:38.99, lon:17.08, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIBP', iata:'PSR', name:'Pescara', lat:42.43, lon:14.18, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIRP', iata:'PSA', name:'Pisa Galileo Galilei', lat:43.68, lon:10.40, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIRQ', iata:'FLR', name:'Florence Peretola', lat:43.81, lon:11.20, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LICG', iata:'PNL', name:'Pantelleria', lat:36.82, lon:11.97, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LICD', iata:'LMP', name:'Lampedusa', lat:35.50, lon:12.62, fuel:'both', rwy_ft:7500, ifr:true, customs:true },
  { icao:'LIPL', name:'Brescia Montichiari', lat:45.43, lon:10.33, fuel:'both', rwy_ft:3500, ifr:true, customs:false },
  { icao:'LIMN', name:'Novara Cameri', lat:45.53, lon:8.67, fuel:'both', rwy_ft:3500, ifr:true, customs:false },
  { icao:'LIVM', name:'Modena', lat:44.62, lon:10.84, fuel:'both', rwy_ft:3500, ifr:true, customs:false },

  // ── EUROPE — Portugal ────────────────────────────────────
  { icao:'LPPT', iata:'LIS', name:'Lisbon', lat:38.78, lon:-9.14, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPPR', iata:'OPO', name:'Porto', lat:41.24, lon:-8.68, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPFR', iata:'FAO', name:'Faro Algarve', lat:37.01, lon:-7.97, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPMA', iata:'FNC', name:'Funchal Madeira', lat:32.70, lon:-16.77, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPLA', iata:'TER', name:'Terceira Azores', lat:38.76, lon:-27.09, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPPD', iata:'PDL', name:'Ponta Delgada Azores', lat:37.74, lon:-25.70, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // Portugal — Aérodromes régionaux
  { icao:'LPCO', iata:'CBP', name:'Coimbra Cernache', lat:40.16, lon:-8.47, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPVR', iata:'VRL', name:'Vila Real', lat:41.27, lon:-7.72, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPBJ', iata:'BYJ', name:'Beja', lat:38.08, lon:-7.93, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPEV', iata:'AVR', name:'Evora', lat:38.53, lon:-7.89, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPCS', name:'Cascais Tires', lat:38.72, lon:-9.36, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'LPSI', iata:'SIE', name:'Setubal', lat:38.52, lon:-8.86, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPPM', iata:'PRM', name:'Portimao', lat:37.15, lon:-8.58, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPFL', iata:'FLW', name:'Flores Azores', lat:39.46, lon:-31.13, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPGR', iata:'GRW', name:'Graciosa Azores', lat:39.09, lon:-28.03, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPPICO', name:'Pico Azores', lat:38.55, lon:-28.44, fuel:'both', rwy_ft:4000, ifr:true, customs:false },
  { icao:'LPSJ', iata:'SJZ', name:'Sao Jorge Azores', lat:38.66, lon:-28.18, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPVZ', iata:'CVU', name:'Corvo Azores', lat:39.67, lon:-31.11, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPSM', iata:'SMA', name:'Santa Maria Azores', lat:36.97, lon:-25.17, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LPHR', iata:'HOR', name:'Horta Azores', lat:38.52, lon:-28.72, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  // ── EUROPE — Netherlands, Belgium, Luxembourg ───────────
  // ── EUROPE — Switzerland & Austria ──────────────────────
  // ── EUROPE — Scandinavia ─────────────────────────────────
  // ── EUROPE — Germany ─────────────────────────────────────
  // Germany — regional
  { icao:'EDDV', iata:'HAJ', name:'Hannover', lat:52.46, lon:9.69, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDE', iata:'ERF', name:'Erfurt Weimar', lat:50.98, lon:10.96, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDG', iata:'FMO', name:'Munster Osnabruck', lat:52.13, lon:7.68, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDI', iata:'SXF', name:'Berlin Schonefeld', lat:52.38, lon:13.52, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDR', iata:'SCN', name:'Saarbrucken', lat:49.21, lon:7.11, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDT', iata:'TXL', name:'Berlin Tegel', lat:52.56, lon:13.29, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDDW', iata:'BRE', name:'Bremen', lat:53.05, lon:8.79, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDNY', iata:'FDH', name:'Friedrichshafen', lat:47.67, lon:9.51, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDJA', iata:'FMM', name:'Memmingen Allgau', lat:47.99, lon:10.24, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDNX', name:'Oberpfaffenhofen Munich', lat:48.08, lon:11.28, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },
  { icao:'EDMA', iata:'AGB', name:'Augsburg', lat:48.43, lon:10.93, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDMO', name:'Oberschleissheim Germany', lat:48.23, lon:11.56, fuel:'both', rwy_ft:3500, ifr:true, customs:false },
  { icao:'EDQC', name:'Coburg Brandensteinsebene', lat:50.20, lon:10.96, fuel:'both', rwy_ft:3500, ifr:true, customs:false },
  { icao:'EDQD', iata:'BYU', name:'Bayreuth', lat:49.98, lon:11.64, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDRY', iata:'GHF', name:'Giebelstadt Germany', lat:49.65, lon:9.97, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDTL', iata:'LHA', name:'Lahr Germany', lat:48.37, lon:7.83, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDTF', name:'Freiburg Germany', lat:48.03, lon:7.83, fuel:'both', rwy_ft:3500, ifr:true, customs:false },
  { icao:'ETSH', iata:'GUT', name:'Gutersloh Germany', lat:51.92, lon:8.31, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDWI', iata:'WVN', name:'Wilhelmshaven Germany', lat:53.50, lon:8.05, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDXW', iata:'GWT', name:'Sylt Island Germany', lat:54.91, lon:8.34, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDXF', iata:'FLF', name:'Flensburg Germany', lat:54.77, lon:9.38, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDVK', iata:'KSF', name:'Kassel Calden', lat:51.41, lon:9.38, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EDAZ', name:'Schonhagen Germany', lat:52.20, lon:12.99, fuel:'AvGas', rwy_ft:3000, ifr:false, customs:false },

  // ── EUROPE — Poland ──────────────────────────────────────
  { icao:'EPWA', iata:'WAW', name:'Warsaw Chopin', lat:52.17, lon:20.97, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPKK', iata:'KRK', name:'Krakow', lat:50.08, lon:19.78, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPGD', iata:'GDN', name:'Gdansk', lat:54.38, lon:18.47, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPWR', iata:'WRO', name:'Wroclaw', lat:51.10, lon:16.89, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPPO', iata:'POZ', name:'Poznan', lat:52.42, lon:16.83, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPKT', iata:'KTW', name:'Katowice', lat:50.47, lon:19.08, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPRZ', iata:'RZE', name:'Rzeszow', lat:50.11, lon:22.02, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPLL', iata:'LCJ', name:'Lodz', lat:51.72, lon:19.40, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPBY', iata:'BZG', name:'Bydgoszcz', lat:53.10, lon:17.98, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPSC', iata:'SZZ', name:'Szczecin', lat:53.58, lon:14.90, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPLU', iata:'LUZ', name:'Lublin', lat:51.24, lon:22.71, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPZG', iata:'IEG', name:'Zielona Gora', lat:52.14, lon:15.80, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EPRA', iata:'RDO', name:'Radom', lat:51.39, lon:21.21, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── EUROPE — Czech Republic ──────────────────────────────
  { icao:'LKPR', iata:'PRG', name:'Prague', lat:50.10, lon:14.26, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LKTB', iata:'BRQ', name:'Brno', lat:49.15, lon:16.69, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LKOS', iata:'OSR', name:'Ostrava', lat:49.70, lon:18.11, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LKKV', iata:'KLV', name:'Karlovy Vary', lat:50.20, lon:12.91, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LKPD', iata:'PED', name:'Pardubice', lat:50.01, lon:15.74, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LKLN', iata:'PLZ', name:'Plzen Linas', lat:49.68, lon:13.27, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LKCB', name:'Ceske Budejovice', lat:48.94, lon:14.43, fuel:'both', rwy_ft:4000, ifr:true, customs:false },

  // ── EUROPE — Slovakia ────────────────────────────────────
  { icao:'LZIB', iata:'BTS', name:'Bratislava', lat:48.17, lon:17.21, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LZKZ', iata:'KSC', name:'Kosice', lat:48.66, lon:21.24, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LZPP', iata:'PZY', name:'Piestany', lat:48.63, lon:17.83, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LZSL', iata:'SLD', name:'Sliac', lat:48.64, lon:19.13, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LZPW', iata:'POV', name:'Presov', lat:49.03, lon:21.32, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── EUROPE — Hungary ─────────────────────────────────────
  { icao:'LHBP', iata:'BUD', name:'Budapest', lat:47.43, lon:19.26, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LHDC', iata:'DEB', name:'Debrecen', lat:47.49, lon:21.62, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LHPE', iata:'PEV', name:'Pecs Pogany', lat:45.99, lon:18.24, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LHSM', iata:'SOB', name:'Sarmellek Hungary', lat:46.69, lon:17.16, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── EUROPE — Romania ─────────────────────────────────────
  { icao:'LROP', iata:'OTP', name:'Bucharest Otopeni', lat:44.57, lon:26.10, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LRCL', iata:'CLJ', name:'Cluj Napoca', lat:46.79, lon:23.69, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LRTM', iata:'TGM', name:'Targu Mures', lat:46.47, lon:24.41, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LRSB', iata:'SBZ', name:'Sibiu Romania', lat:45.79, lon:24.09, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LRTC', iata:'TCE', name:'Tulcea Romania', lat:45.06, lon:28.71, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LRIA', iata:'IAS', name:'Iasi Romania', lat:47.18, lon:27.62, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LRBS', iata:'BBU', name:'Bucharest Baneasa', lat:44.50, lon:26.10, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LRTR', iata:'TSR', name:'Timisoara Romania', lat:45.81, lon:21.34, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LRCK', iata:'CND', name:'Constanta Romania', lat:44.36, lon:28.49, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LROD', iata:'OMR', name:'Oradea Romania', lat:47.03, lon:21.90, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LRBM', iata:'BAY', name:'Baia Mare Romania', lat:47.66, lon:23.47, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── EUROPE — Bulgaria ────────────────────────────────────
  { icao:'LBSF', iata:'SOF', name:'Sofia', lat:42.70, lon:23.41, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LBBG', iata:'BOJ', name:'Burgas Bulgaria', lat:42.57, lon:27.52, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LBWN', iata:'VAR', name:'Varna Bulgaria', lat:43.23, lon:27.83, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LBPD', iata:'PDV', name:'Plovdiv Bulgaria', lat:42.07, lon:24.85, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LBGO', iata:'GOZ', name:'Gorna Oryahovitsa', lat:43.15, lon:25.71, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── EUROPE — Baltic States ────────────────────────────────
  { icao:'EVRA', iata:'RIX', name:'Riga Latvia', lat:56.92, lon:23.97, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EVLA', iata:'LPX', name:'Liepaja Latvia', lat:56.52, lon:21.10, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EVVA', iata:'VNT', name:'Ventspils Latvia', lat:57.36, lon:21.54, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EYVI', iata:'VNO', name:'Vilnius', lat:54.63, lon:25.29, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EYPA', iata:'PLQ', name:'Palanga Lithuania', lat:55.97, lon:21.09, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EYKA', iata:'KUN', name:'Kaunas Lithuania', lat:54.96, lon:24.08, fuel:'JetA', rwy_ft:8000, ifr:true, customs:false },
  { icao:'EETN', iata:'TLL', name:'Tallinn', lat:59.41, lon:24.83, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EEKA', iata:'URE', name:'Kuressaare Estonia', lat:58.23, lon:22.51, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'EEEI', iata:'EPU', name:'Parnu Estonia', lat:58.42, lon:24.47, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── EUROPE — Ukraine ─────────────────────────────────────
  { icao:'UKBB', iata:'KBP', name:'Kyiv Boryspil', lat:50.35, lon:30.89, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'UKKK', iata:'IEV', name:'Kyiv Zhuliany', lat:50.40, lon:30.45, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'UKLL', iata:'LWO', name:'Lviv Ukraine', lat:49.81, lon:23.96, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'UKOO', iata:'ODS', name:'Odessa Ukraine', lat:46.43, lon:30.68, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'UKHH', iata:'HRK', name:'Kharkiv Ukraine', lat:49.92, lon:36.29, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'UKDD', iata:'DNK', name:'Dnipro Ukraine', lat:48.36, lon:35.10, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── EUROPE — Belarus ─────────────────────────────────────
  { icao:'UMMS', iata:'MSQ', name:'Minsk', lat:53.88, lon:28.03, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'UMGV', iata:'GME', name:'Gomel Belarus', lat:52.53, lon:31.02, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'UMBB', iata:'BQT', name:'Brest Belarus', lat:52.11, lon:23.90, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── EUROPE — Moldova ─────────────────────────────────────
  { icao:'LUKK', iata:'KIV', name:'Chisinau Moldova', lat:46.93, lon:28.93, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── EUROPE — Finland supplement ──────────────────────────
  { icao:'EFKT', iata:'KTT', name:'Kittila Finland', lat:67.70, lon:24.85, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFKS', iata:'KAO', name:'Kuusamo Finland', lat:65.99, lon:29.24, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFSI', iata:'SJY', name:'Seinajoki Finland', lat:62.69, lon:22.83, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFJO', iata:'JOE', name:'Joensuu Finland', lat:62.66, lon:29.61, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFMI', iata:'MIK', name:'Mikkeli Finland', lat:61.69, lon:27.20, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'EFMA', iata:'MHQ', name:'Mariehamn Aland', lat:60.12, lon:19.90, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── EUROPE — Greece supplement ───────────────────────────
  { icao:'LGAV', iata:'ATH', name:'Athens', lat:37.94, lon:23.94, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGTS', iata:'SKG', name:'Thessaloniki', lat:40.52, lon:22.97, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGIR', iata:'HER', name:'Heraklion Crete', lat:35.34, lon:25.18, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGKR', iata:'CFU', name:'Corfu', lat:39.60, lon:19.91, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGKF', iata:'EFL', name:'Kefalonia', lat:38.12, lon:20.50, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGRP', iata:'RHO', name:'Rhodes', lat:36.41, lon:28.09, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGMK', iata:'JMK', name:'Mykonos', lat:37.43, lon:25.35, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGSR', iata:'JTR', name:'Santorini', lat:36.40, lon:25.48, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGSK', iata:'JSI', name:'Skiathos', lat:39.18, lon:23.51, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGZA', iata:'ZTH', name:'Zakynthos', lat:37.75, lon:20.88, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LCPH', iata:'PFO', name:'Paphos Cyprus', lat:34.72, lon:32.48, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LCLK', iata:'LCA', name:'Larnaca Cyprus', lat:34.87, lon:33.62, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGKJ', iata:'KIT', name:'Kithira Greece', lat:36.27, lon:23.02, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGKP', iata:'GPA', name:'Patras Greece', lat:38.15, lon:21.43, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGSA', iata:'CHQ', name:'Chania Crete', lat:35.53, lon:24.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGST', iata:'JSH', name:'Sitia Crete', lat:35.22, lon:26.10, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGKL', iata:'KLX', name:'Kalamata Greece', lat:37.07, lon:22.03, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGKV', iata:'KVA', name:'Kavala Greece', lat:40.91, lon:24.62, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGIO', iata:'IOA', name:'Ioannina Greece', lat:39.70, lon:20.82, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGTP', iata:'PYR', name:'Tripolis Greece', lat:37.53, lon:22.40, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── EUROPE — Turkey supplement ───────────────────────────
  { icao:'LTFM', iata:'IST', name:'Istanbul', lat:41.27, lon:28.74, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTAI', iata:'AYT', name:'Antalya', lat:36.90, lon:30.80, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTBA', iata:'SAW', name:'Istanbul Sabiha', lat:40.90, lon:29.31, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTBJ', iata:'ADB', name:'Izmir', lat:38.29, lon:27.16, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTFE', iata:'BJV', name:'Bodrum', lat:37.25, lon:27.66, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTBS', iata:'DLM', name:'Dalaman', lat:36.71, lon:28.79, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTAZ', iata:'GZP', name:'Gazipasa Turkey', lat:36.30, lon:32.30, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTCC', iata:'DIY', name:'Diyarbakir Turkey', lat:37.89, lon:40.20, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTCE', iata:'EZS', name:'Elazig Turkey', lat:38.61, lon:39.29, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTCG', iata:'TZX', name:'Trabzon Turkey', lat:40.99, lon:39.79, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTAN', iata:'KYA', name:'Konya Turkey', lat:37.98, lon:32.56, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTAS', iata:'SZF', name:'Samsun Turkey', lat:41.25, lon:36.56, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTCN', iata:'KCM', name:'Kahramanmaras Turkey', lat:37.54, lon:36.95, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LTBY', iata:'ESB', name:'Ankara Esenboga', lat:40.13, lon:32.99, fuel:'both', rwy_ft:8000, ifr:true, customs:true },

  // ── EUROPE — Kosovo ──────────────────────────────────────
  { icao:'BKPR', iata:'PRN', name:'Pristina Kosovo', lat:42.57, lon:21.04, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LDSP', iata:'SPU', name:'Split', lat:43.54, lon:16.30, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LDDU', iata:'DBV', name:'Dubrovnik', lat:42.56, lon:18.27, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LDZD', iata:'ZAD', name:'Zadar', lat:44.10, lon:15.35, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LDPL', iata:'PUY', name:'Pula', lat:44.89, lon:13.92, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LDRI', iata:'RJK', name:'Rijeka', lat:45.22, lon:14.57, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LDBR', iata:'BWK', name:'Brac Island', lat:43.29, lon:16.68, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LDLO', iata:'LSZ', name:'Losinj Island', lat:44.57, lon:14.39, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LDOB', iata:'OSI', name:'Osijek', lat:45.46, lon:18.81, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LDVA', name:'Varazdin', lat:46.29, lon:16.38, fuel:'both', rwy_ft:4000, ifr:true, customs:false },

  // ── ADRIATIQUE — Slovénie ────────────────────────────────
  { icao:'LJPZ', iata:'POW', name:'Portoroz Slovenia', lat:45.47, lon:13.62, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LJMB', name:'Maribor Slovenia', lat:46.48, lon:15.69, fuel:'both', rwy_ft:4000, ifr:true, customs:false },

  // ── ADRIATIQUE — Bosnie-Herzégovine ─────────────────────
  { icao:'LQSA', iata:'SJJ', name:'Sarajevo', lat:43.82, lon:18.33, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LQMO', iata:'OMO', name:'Mostar', lat:43.28, lon:17.84, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LQBK', iata:'BNX', name:'Banja Luka', lat:44.94, lon:17.30, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── ADRIATIQUE — Monténégro ──────────────────────────────
  { icao:'LYPG', iata:'TGD', name:'Podgorica Montenegro', lat:42.36, lon:19.25, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LYTV', iata:'TIV', name:'Tivat Montenegro', lat:42.40, lon:18.72, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── ADRIATIQUE — Albanie ─────────────────────────────────
  { icao:'LATI', iata:'TIA', name:'Tirana Albania', lat:41.41, lon:19.72, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LAGJ', iata:'GJA', name:'Gjader Albania', lat:41.83, lon:19.72, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LAVL', iata:'VAL', name:'Vlore Albania', lat:40.48, lon:19.47, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── ADRIATIQUE — Serbie ──────────────────────────────────
  { icao:'LYBE', iata:'BEG', name:'Belgrade', lat:44.82, lon:20.29, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LYNI', iata:'INI', name:'Nis Serbia', lat:43.34, lon:21.85, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── ADRIATIQUE — Macédoine du Nord ──────────────────────
  { icao:'LWSK', iata:'SKP', name:'Skopje', lat:41.96, lon:21.62, fuel:'both', rwy_ft:7000, ifr:true, customs:true },
  { icao:'LWOH', iata:'OHD', name:'Ohrid Macedonia', lat:41.18, lon:20.74, fuel:'both', rwy_ft:7000, ifr:true, customs:true },

  // ── ADRIATIQUE — Grèce (Ionienne + Adriatique) ──────────
  { icao:'LGPZ', iata:'PVK', name:'Preveza Aktio', lat:38.93, lon:20.77, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGKC', iata:'KZS', name:'Kithira Greece', lat:36.27, lon:23.02, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGHI', iata:'JKH', name:'Chios Greece', lat:38.34, lon:26.14, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGLM', iata:'LXS', name:'Lemnos Greece', lat:39.92, lon:25.24, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGSY', iata:'SMI', name:'Samos Greece', lat:37.69, lon:26.91, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGKO', iata:'KGS', name:'Kos Greece', lat:36.79, lon:27.09, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGAX', iata:'AXD', name:'Alexandroupolis Greece', lat:40.86, lon:25.96, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGAD', iata:'PYR', name:'Andravida Greece', lat:37.92, lon:21.29, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGKZ', iata:'KZI', name:'Kozani Greece', lat:40.29, lon:21.84, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGMT', iata:'MJT', name:'Mytilene Lesbos', lat:39.06, lon:26.60, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGNX', iata:'JNX', name:'Naxos Greece', lat:37.08, lon:25.37, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGPA', iata:'PAS', name:'Paros Greece', lat:37.01, lon:25.13, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGSP', iata:'SPJ', name:'Sparti Greece', lat:37.07, lon:22.53, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LGSM', iata:'SMI', name:'Ikaria Greece', lat:37.68, lon:26.35, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  // ── EUROPE — Greece & Cyprus ─────────────────────────────
  // ── EUROPE — Turkey ──────────────────────────────────────
  // ── MIDDLE EAST ──────────────────────────────────────────
  { icao:'OMDB', iata:'DXB', name:'Dubai', lat:25.25, lon:55.36, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OMAA', iata:'AUH', name:'Abu Dhabi', lat:24.44, lon:54.65, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OTHH', iata:'DOH', name:'Doha Hamad', lat:25.27, lon:51.61, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OERK', iata:'RUH', name:'Riyadh', lat:24.96, lon:46.70, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OEDF', iata:'DMM', name:'Dammam', lat:26.47, lon:49.80, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OEJN', iata:'JED', name:'Jeddah', lat:21.68, lon:39.16, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'LLBG', iata:'TLV', name:'Tel Aviv Ben Gurion', lat:32.01, lon:34.89, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OKBK', iata:'KWI', name:'Kuwait City', lat:29.23, lon:47.97, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OBBI', iata:'BAH', name:'Bahrain', lat:26.27, lon:50.63, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OOMS', iata:'MCT', name:'Muscat Oman', lat:23.59, lon:58.28, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OYAA', iata:'ADE', name:'Aden Yemen', lat:12.83, lon:45.03, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OLBA', iata:'BEY', name:'Beirut', lat:33.82, lon:35.49, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'ORBI', iata:'BGW', name:'Baghdad', lat:33.26, lon:44.23, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'OIIE', iata:'IKA', name:'Tehran Imam Khomeini', lat:35.41, lon:51.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  // ── ASIA PACIFIC ─────────────────────────────────────────
  { icao:'RJTT', iata:'HND', name:'Tokyo Haneda', lat:35.55, lon:139.78, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'RJAA', iata:'NRT', name:'Tokyo Narita', lat:35.76, lon:140.39, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'VHHH', iata:'HKG', name:'Hong Kong', lat:22.31, lon:113.92, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'ZBAA', iata:'PEK', name:'Beijing Capital', lat:40.08, lon:116.60, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'ZBAD', iata:'PKX', name:'Beijing Daxing', lat:39.51, lon:116.41, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'ZSPD', iata:'PVG', name:'Shanghai Pudong', lat:31.14, lon:121.81, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'ZSSS', iata:'SHA', name:'Shanghai Hongqiao', lat:31.20, lon:121.34, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'WSSS', iata:'SIN', name:'Singapore Changi', lat:1.36, lon:103.99, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'VIDP', iata:'DEL', name:'Delhi IGI', lat:28.56, lon:77.10, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'VABB', iata:'BOM', name:'Mumbai', lat:19.09, lon:72.87, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'RKSI', iata:'ICN', name:'Seoul Incheon', lat:37.47, lon:126.45, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'VTBS', iata:'BKK', name:'Bangkok Suvarnabhumi', lat:13.69, lon:100.75, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'WMKK', iata:'KUL', name:'Kuala Lumpur', lat:2.75, lon:101.71, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'WIII', iata:'CGK', name:'Jakarta Soekarno', lat:-6.13, lon:106.65, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'RPLL', iata:'MNL', name:'Manila', lat:14.51, lon:121.02, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'VVTS', iata:'SGN', name:'Ho Chi Minh City', lat:10.82, lon:106.66, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'VVNB', iata:'HAN', name:'Hanoi', lat:21.22, lon:105.81, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'RCTP', iata:'TPE', name:'Taipei Taoyuan', lat:25.08, lon:121.23, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'YSSY', iata:'SYD', name:'Sydney', lat:-33.95, lon:151.18, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'YMML', iata:'MEL', name:'Melbourne', lat:-37.67, lon:144.84, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'YBBN', iata:'BNE', name:'Brisbane', lat:-27.38, lon:153.12, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'YPPH', iata:'PER', name:'Perth', lat:-31.94, lon:115.97, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'NZAA', iata:'AKL', name:'Auckland', lat:-37.01, lon:174.79, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'NZCH', iata:'CHC', name:'Christchurch', lat:-43.49, lon:172.53, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'NZWN', iata:'WLG', name:'Wellington', lat:-41.33, lon:174.81, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  // ── AFRICA ───────────────────────────────────────────────
  { icao:'FAOR', iata:'JNB', name:'Johannesburg OR Tambo', lat:-26.14, lon:28.24, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'FACT', iata:'CPT', name:'Cape Town', lat:-33.96, lon:18.60, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'HECA', iata:'CAI', name:'Cairo', lat:30.12, lon:31.41, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'HAAB', iata:'ADD', name:'Addis Ababa', lat:8.98, lon:38.80, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'DNMM', iata:'LOS', name:'Lagos', lat:6.58, lon:3.32, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'DGAA', iata:'ACC', name:'Accra', lat:5.60, lon:-0.17, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'DTTA', iata:'TUN', name:'Tunis Carthage', lat:36.85, lon:10.23, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GMMN', iata:'CMN', name:'Casablanca', lat:33.37, lon:-7.59, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GMME', iata:'RBA', name:'Rabat', lat:34.05, lon:-6.75, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GMAD', iata:'AGA', name:'Agadir', lat:30.38, lon:-9.41, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'GMFN', iata:'NDR', name:'Nador', lat:34.99, lon:-3.03, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'FMMI', iata:'TNR', name:'Antananarivo', lat:-18.80, lon:47.48, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'FMMS', iata:'MJN', name:'Mahajanga Madagascar', lat:-15.67, lon:46.35, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'FSSS', iata:'SEZ', name:'Seychelles Mahe', lat:-4.67, lon:55.52, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'FMCH', iata:'HAH', name:'Comoros Moroni', lat:-11.53, lon:43.27, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'FMCZ', iata:'DZA', name:'Dzaoudzi Mayotte', lat:-12.80, lon:45.28, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  // ── SOUTH AMERICA ────────────────────────────────────────
  { icao:'SBGR', iata:'GRU', name:'Sao Paulo Guarulhos', lat:-23.44, lon:-46.47, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SBGL', iata:'GIG', name:'Rio de Janeiro Galeao', lat:-22.81, lon:-43.25, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SBBR', iata:'BSB', name:'Brasilia', lat:-15.87, lon:-47.92, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SAEZ', iata:'EZE', name:'Buenos Aires Ezeiza', lat:-34.82, lon:-58.54, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SCEL', iata:'SCL', name:'Santiago', lat:-33.39, lon:-70.79, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SKBO', iata:'BOG', name:'Bogota El Dorado', lat:4.70, lon:-74.15, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SEQM', iata:'UIO', name:'Quito', lat:-0.13, lon:-78.35, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SPIM', iata:'LIM', name:'Lima Jorge Chavez', lat:-12.02, lon:-77.11, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SLLP', iata:'LPB', name:'La Paz Bolivia', lat:-16.51, lon:-68.19, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SUAA', iata:'MVD', name:'Montevideo', lat:-34.84, lon:-56.03, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SGAS', iata:'ASU', name:'Asuncion Paraguay', lat:-25.24, lon:-57.52, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SVMI', iata:'CCS', name:'Caracas', lat:10.61, lon:-66.99, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SKRG', iata:'MDE', name:'Medellin', lat:6.17, lon:-75.42, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SKCL', iata:'CLO', name:'Cali Colombia', lat:3.54, lon:-76.38, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SBPA', iata:'POA', name:'Porto Alegre', lat:-29.99, lon:-51.17, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SBRF', iata:'REC', name:'Recife', lat:-8.13, lon:-34.92, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SBSV', iata:'SSA', name:'Salvador Bahia', lat:-12.91, lon:-38.33, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SBFZ', iata:'FOR', name:'Fortaleza', lat:-3.78, lon:-38.53, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SBMN', iata:'MAO', name:'Manaus', lat:-3.04, lon:-60.05, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
  { icao:'SPZO', iata:'CUZ', name:'Cusco Peru', lat:-13.54, lon:-71.94, fuel:'both', rwy_ft:8000, ifr:true, customs:true },
]

// Build lookup maps
export const AP_BY_ICAO: Record<string, APEntry> = {}
export const AP_BY_IATA: Record<string, APEntry> = {}
AIRPORTS.forEach(ap => {
  AP_BY_ICAO[ap.icao] = ap
  if (ap.iata) AP_BY_IATA[ap.iata] = ap
})

export function lookupAirport(code: string): APEntry | null {
  if (!code) return null
  const uc = code.trim().toUpperCase()
  // Try exact ICAO match first
  if (AP_BY_ICAO[uc]) return AP_BY_ICAO[uc]
  // Try exact IATA match
  if (AP_BY_IATA[uc]) return AP_BY_IATA[uc]
  // Try partial match on ICAO (e.g. "JFK" matches "KJFK")
  const byIcao = AIRPORTS.find(a => a.icao.includes(uc) || uc.includes(a.icao))
  if (byIcao) return byIcao
  // Try name search
  const byName = AIRPORTS.find(a => a.name.toUpperCase().includes(uc))
  if (byName) return byName
  return null
}

// Search airports by ICAO, IATA, or name
export function searchAirports(query: string, limit = 8): APEntry[] {
  const q = query.trim().toUpperCase()
  if (q.length < 2) return []
  return AIRPORTS.filter(ap =>
    ap.icao.startsWith(q) ||
    (ap.iata && ap.iata.startsWith(q)) ||
    ap.name.toUpperCase().includes(q)
  ).slice(0, limit)
}

// ── Great-circle geometry ────────────────────────────────────
type LatLon = { lat: number; lon: number }

export function gcDistNm(a: LatLon, b: LatLon): number {
  const P = Math.PI / 180
  const cos = Math.sin(a.lat * P) * Math.sin(b.lat * P) +
    Math.cos(a.lat * P) * Math.cos(b.lat * P) * Math.cos((b.lon - a.lon) * P)
  return Math.acos(Math.max(-1, Math.min(1, cos))) * 180 / Math.PI * 60
}

export function gcInterpolate(a: LatLon, b: LatLon, f: number): LatLon {
  const P = Math.PI / 180
  const lat1 = a.lat * P, lon1 = a.lon * P, lat2 = b.lat * P, lon2 = b.lon * P
  const d = Math.acos(Math.max(-1, Math.min(1,
    Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
  )))
  if (d === 0) return { lat: a.lat, lon: a.lon }
  const A = Math.sin((1 - f) * d) / Math.sin(d)
  const B = Math.sin(f * d) / Math.sin(d)
  const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2)
  const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2)
  const z = A * Math.sin(lat1) + B * Math.sin(lat2)
  const lat = Math.atan2(z, Math.sqrt(x * x + y * y))
  const lon = Math.atan2(y, x)
  return { lat: lat / P, lon: lon / P }
}

// ── Service-aware stopover selection ─────────────────────────
// Matches the "services" fields on each APEntry (fuel, rwy_ft, ifr, customs)
// against the requirements of the aircraft type the user has selected, so a
// piston single doesn't get routed through a jet-only Jet-A ramp with a
// 2000ft strip, and vice versa.
export type AircraftClass = 'jet' | 'turbo' | 'piston'

const MIN_RWY_FT: Record<AircraftClass, number> = { jet: 5000, turbo: 3500, piston: 2200 }
const OK_FUEL: Record<AircraftClass, APEntry['fuel'][]> = {
  jet: ['JetA', 'both'],
  turbo: ['JetA', 'both'],
  piston: ['AvGas', 'both'],
}

export function servesAircraft(ap: APEntry, aircraftType?: AircraftClass | string | null): boolean {
  if (!aircraftType) return true
  const t = aircraftType as AircraftClass
  if (!MIN_RWY_FT[t]) return true
  if (ap.fuel === 'none' || !OK_FUEL[t].includes(ap.fuel)) return false
  if (ap.rwy_ft < MIN_RWY_FT[t]) return false
  return true
}

export function findStopovers(
  from: APEntry, to: APEntry, n: 0 | 1 | 2 | 3,
  aircraftType?: AircraftClass | string | null,
): APEntry[] {
  if (n === 0) return []
  const totalNm = gcDistNm(from, to)
  const used = new Set([from.icao, to.icao])
  const stopovers: APEntry[] = []

  for (let i = 1; i <= n; i++) {
    const ideal = gcInterpolate(from, to, i / (n + 1))
    let best: APEntry | null = null
    let bestScore = -Infinity

    for (const ap of AIRPORTS) {
      if (used.has(ap.icao)) continue
      const distToIdeal = gcDistNm(ap, ideal)
      if (distToIdeal > Math.max(150, totalNm * 0.35)) continue // stay near the route

      // Airports that actually serve the selected aircraft type are strongly
      // preferred; among those, prefer closer-to-ideal, IFR-capable, longer runway.
      let score = -distToIdeal
      if (servesAircraft(ap, aircraftType)) score += 5000
      if (ap.ifr) score += 50
      if (ap.customs) score += 20
      score += Math.min(ap.rwy_ft, 12000) / 200

      if (score > bestScore) { bestScore = score; best = ap }
    }

    if (best) { stopovers.push(best); used.add(best.icao) }
  }

  return stopovers
}

export function calcLegs(from: APEntry, stopovers: APEntry[], to: APEntry): { from: APEntry; to: APEntry; dist: number }[] {
  const chain = [from, ...stopovers, to]
  const legs: { from: APEntry; to: APEntry; dist: number }[] = []
  for (let i = 0; i < chain.length - 1; i++) {
    legs.push({ from: chain[i], to: chain[i + 1], dist: Math.round(gcDistNm(chain[i], chain[i + 1])) })
  }
  return legs
}
