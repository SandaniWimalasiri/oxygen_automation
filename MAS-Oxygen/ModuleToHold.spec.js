const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');

const breakdowns = parse(fs.readFileSync(path.join(__dirname, './csv/AddNewOpBreakDown.csv')), {
  columns: true,
  skip_empty_lines: true
});

test(`TC_036 Module to be hold for Yamazumi`, async ({page}) => {
    const login = require('./links.js');
    login(page);
    await page.waitForTimeout(3000);
   
    const moduleToBeHold = require('./links.js');
    moduleToBeHold(page);

    await page.waitForTimeout(30);
    await page.locator('.modal-content input[role="combobox"]').isVisible();
    await page.locator('.modal-content input[role="combobox"]').fill(breakdown.moduleId_svg);
    await page.locator('.modal-content input[role="combobox"]').press('Enter');
    
    await page.locator('button').click();


});