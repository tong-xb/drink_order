import { UAParser } from 'ua-parser-js';
const parser = new UAParser();
const result = parser.getResult();

export const uaParser = () => {
  const obj = {
    // 裝置ID
    deviceId: result.device.type === 'mobile' ? '' : 'Browser',
    // OS
    deviceOs: (result.device.type === 'mobile' && result.os.name) || 'Browser',
    // 裝置型號
    deviceType: (result.device.type === 'mobile' && result.os.name) || 'Browser',
    // 裝置廠牌
    manufacturer: (result.device.type === 'mobile' && result.device.vendor) || 'Browser',
    // 裝置機型
    model: (result.device.type === 'mobile' && result.device.model) || 'Browser',
  };
  // 根據作業系統判斷,作業系統版本要帶入的Key
  if (result.device.type === 'mobile') {
    const versionKey = result.os.name === 'iOS' ? 'iosVersion' : 'androidVersion';
    obj[versionKey] = result.os.version;
  }

  return obj;
};
