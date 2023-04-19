/**
 * 數字格式化金額
 * @param {*} number 限數值、非空
 * @param {*} maxDigits 小數位幾位數(四捨五入)、可省略(預設0)
 * @param {*} style decimal,currency,percent,unit、可省略(預設decimal)
 * @returns 格式後的數字
 */

// 台幣數值格式化
export const formatTWCurrency = (number, maxDigits = 0, style = 'decimal') => {
  const formatter = new Intl.NumberFormat('zh-TW', {
    style: style === 'currency' ? 'decimal' : style, //如果是currency formatter改成'decimal' 拿數值
    currency: 'TWD',
    maximumFractionDigits: maxDigits,
  });
  const formattedNumber = formatter.format(number);

  if (style === 'currency') {
    if (!isNaN(parseFloat(number))) {
      const formattedNumberWithSign =
        parseFloat(number) >= 0 ? `$ ${formattedNumber}` : `-$ ${formattedNumber.slice(1)}`;
      return formattedNumberWithSign;
    } else {
      return '非數值';
    }
  }

  return formattedNumber;
};

// 外幣數值格式化
export const formatUSCurrency = (number, minDigits = 0, style = 'decimal') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style,
    currency: 'USD',
    minimumFractionDigits: minDigits,
  });

  const parseNumber = parseFloat(number);
  const formattedNumber = formatter.format(parseNumber);

  if (isNaN(parseNumber)) return '非數值';

  if (style === 'currency') {
    const formattedNumberWithSign = parseNumber >= 0 ? `$ ${formattedNumber}` : `-$ ${formattedNumber.slice(1)}`;
    return formattedNumberWithSign;
  }

  return formattedNumber;
};
