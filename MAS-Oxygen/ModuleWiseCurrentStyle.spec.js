const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');

const breakdowns = parse(fs.readFileSync(path.join(__dirname, './csv/AddNewOpBreakDown.csv')), {
  columns: true,
  skip_empty_lines: true
});

test(`TC_035 Module wise current style maintenance`, async ({page}) => {
    const login = require('./links.js');
    await login(page);
    await page.waitForTimeout(3000);
   
    const moduleWise = require('./links.js');
    await moduleWise(page);

    await page.waitForTimeout(3000);

    await page.locator('.modal-content input[role="combobox"]').isVisible();
    console.log(breakdowns);
    await page.locator('.modal-content input[role="combobox"]').fill(breakdowns[0].moduleId_svg);
    await page.locator('.modal-content input[role="combobox"]').press('Enter');
    await page.locator('.modal-content input[role="combobox"]').press('Tab');
    await page.getByRole('checkbox', { name: 'select-row-undefined' }).check();

    await page.getByRole('button', { name: 'Add to Yamazumi drawing queue' }).isVisible();
    await page.getByRole('button', { name: 'Add to Yamazumi drawing queue' }).click();
    await page.getByRole('button', { name: 'OK' }).isVisible();
    await page.getByRole('button', { name: 'OK' }).click();


});