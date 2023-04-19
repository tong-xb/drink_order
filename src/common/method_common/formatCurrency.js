/**
 * 將幣別代碼中文
 * @param {*} currencyCode 幣別代碼:字串、可省略(預設新臺幣)
 * @returns 幣別中文
 */
export const formatCurrencyCHT = (currencyCode = 'TWD') => {
  switch (currencyCode) {
    case 'USD':
      return '美元';
    case 'CNY':
      return '人民幣';
    case 'HKD':
      return '港幣';
    case 'JPY':
      return '日圓';
    case 'AUD':
      return '澳幣';
    case 'CAD':
      return '加幣';
    case 'CHF':
      return '瑞士法郎';
    case 'EUR':
      return '歐元';
    case 'GBP':
      return '英鎊';
    case 'NZD':
      return '紐幣';
    case 'SGD':
      return '新加坡幣';
    case 'THB':
      return '泰銖';
    case 'ZAR':
      return '南非幣';
    case 'SEK':
      return '瑞典克朗';
    case 'CHN':
      return '人民幣(離岸)';
    case 'BEF':
      return '比利時法郎';
    case 'DEM':
      return '德國馬克';
    case 'FRF':
      return '法國法郎';
    case 'INR':
      return '印度盧比';
    case 'KRW':
      return '韓元';
    case 'MXN':
      return '墨西哥比索';
    case 'MYR':
      return '馬來西亞林吉特';
    case 'NLG':
      return '荷蘭盾';
    case 'PHP':
      return '菲國比索';
    case 'IDR':
      return '印尼盾';
    case 'MOP':
      return '澳門幣';
    case 'WUN':
      return '西聯匯款';
    default: //TWD、NTD
      return '臺幣';
  }
};
