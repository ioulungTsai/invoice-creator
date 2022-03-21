const path = require('path');
const csv = require('csvtojson');

const FILE_NAME = 'combos';
const FILE_PATH = path.join(__dirname, `samples/${FILE_NAME}.csv`);

module.exports = async () => {
  const source = await csv().fromFile(FILE_PATH);
  const comboMappings = {};
  source.forEach((item) => {
    const key = item['廠商內部代碼'];
    comboMappings[key] = comboMappings[key] || {
      Post: item.Post,
      KS開團代碼: item['KS開團代碼'],
      廠商內部代碼: item['廠商內部代碼'],
      items: [],
    };
    comboMappings[key].items.push({
      商品規格: item['KS開團代碼'],
      KS開團代碼: item['KS開團代碼'],
      廠商內部代碼: item['廠商內部代碼'],
      品項中文名稱: item['品項中文名稱'],
      品項英文名稱: item['品項英文名稱'],
      規格: item['規格'],
    });
  });

  return Object.keys(comboMappings).map((key) => comboMappings[key]);
};
