const path = require('path');
const csv = require('csvtojson');

const getCombos = require('./combos');
const {
  renderItemsTable,
  render,
} = require('./helpers');

const FILE_NAME = process.argv[2];
if (!FILE_NAME) {
  throw new Error('File name does not exist');
}
const FILE_PATH = path.join(__dirname, `samples/${FILE_NAME}.csv`);

const DEFAULT_POST = '35miles內宅配';

(async () => {
  const combos = await getCombos();
  const source = await csv().fromFile(FILE_PATH);

  const orders = [];
  let lastOrder;
  source.forEach((data) => {
    let orderPost;
    if (data.Post === undefined) {
      orderPost = DEFAULT_POST;
    } else
    if (data.Post !== '') {
      orderPost = data.Post;
    } else
    if (lastOrder) {
      orderPost = lastOrder.customer.Post;
    }
    const matchedCombo = combos.find((combo) => combo['廠商內部代碼'] === data['廠商內部代碼'] && combo.Post === orderPost);
    if (!matchedCombo) {
      // console.log(data, { orderPost });
      throw new Error(`combo ${data['廠商內部代碼']} does not exit`);
    }
    const items = matchedCombo.items.map((i) => ({
      ...i,
      買家備註: data['買家備註'] || '',
      數量: parseInt(data['數量'], 10) * i['數量'],
    }));

    if (!data['購物人'] || data['購物人'] === '') {
      lastOrder.items = [...lastOrder.items, ...items];
    } else {
      const order = {
        customer: data,
        items,
      };

      orders.push(order);
      lastOrder = order;
    }
  });

  const htmlContents = orders.map(({ customer, items }) => (`
    ${renderItemsTable(['編號', '購物人', '收件人電話', '地址'], [customer])}
    <br/>
    ${renderItemsTable(['商品規格', '廠商內部代碼', '品項中文名稱', '品項英文名稱', '數量', '買家備註'], items)}
    <br/>
  `));

  render(htmlContents.join('<div style="break-after:page"><hr/></div>'), FILE_NAME);
})();
