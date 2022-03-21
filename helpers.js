const fs = require('fs');
const path = require('path');

module.exports = {
  renderItemsTable(keys, items) {
    return `
      <table>
        <tr>
          ${keys.map((key) => `<th>${key}</th>`).join('')}
        </tr>
        ${items.map((data) => `
          <tr>
            ${keys.map((key) => `<td>${data[key]}</td>`).join('')}
          </tr>
        `).join('')}
      </table>
    `;
  },
  render(dom, output) {
    const html = `
    <html>
      <head>
        <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 5px
          }
          body {
            font-size: 14px;
          }
        </style>
      </head>
      <body>
       ${dom}
      </body>
    </html>
    `;
    fs.writeFileSync(path.join(__dirname, `${output}.html`), html);
  },
};
