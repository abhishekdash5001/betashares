import {Security} from '../types/security'

// I have manually added the price to the objects for now. In a real scenario, these values will be retrieved 
// from the database. The last trading price will be stored in the database, and before the market opens the 
// next day, I will fetch and update the prices accordingly.

export let topASXSecurities: Security[] = [
    { symbol: "BHP", name: "BHP Group", price: 100 },
  { symbol: "CBA", name: "Commonwealth Bank", price: 100 },
  { symbol: "CSL", name: "CSL Limited", price: 100 },
  { symbol: "WBC", name: "Westpac Banking Corp", price: 100 },
  { symbol: "NAB", name: "National Australia Bank", price: 100 },
  { symbol: "ANZ", name: "Australia and New Zealand Banking Group", price: 100 },
  { symbol: "WOW", name: "Woolworths Group", price: 100 },
  { symbol: "WES", name: "Wesfarmers", price: 100 },
  { symbol: "MQG", name: "Macquarie Group", price: 100 },
  { symbol: "TLS", name: "Telstra Corporation", price: 100 },
  { symbol: "RIO", name: "Rio Tinto", price: 100 },
  { symbol: "WPL", name: "Woodside Petroleum", price: 100 },
  { symbol: "GMG", name: "Goodman Group", price: 100 },
  { symbol: "SCG", name: "Scentre Group", price: 100 },
  { symbol: "QAN", name: "Qantas Airways", price: 100 },
  { symbol: "ORG", name: "Origin Energy", price: 100 },
  { symbol: "STO", name: "Santos", price: 100 },
  { symbol: "S32", name: "South32", price: 100 },
  { symbol: "TCL", name: "Transurban Group", price: 100 },
  { symbol: "SGP", name: "Stockland", price: 100 }
  ];

  export const updateTopASXSecurities=(topASXSecuritiesArgs:Security[]):Security[]=>{
   
    topASXSecurities = topASXSecuritiesArgs;
    return topASXSecurities
  }