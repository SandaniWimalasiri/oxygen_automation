const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');

const breakdowns = parse(fs.readFileSync(path.join(__dirname, './csv/AddNewOpBreakDown.csv')), {
  columns: true,
  skip_empty_lines: true
});

test(`TC_037 style wise takt time`, async ({page}) => {
    const login = require('./links.js');
    login(page);
    await page.waitForTimeout(3000);
   
    const takt = require('./links.js');
    takt(page);

    await page.waitForTimeout(30);
    await page.locator('.modal-content input[role="combobox"]').isVisible();
    await page.locator('.modal-content input[role="combobox"]').fill(breakdown.moduleId_svg);
    await page.locator('.modal-content input[role="combobox"]').press('Enter');

    await page.waitForTimeout(30);
    await page.locator('input[name="style"]').isVisible();
    await page.locator('input[name="style"]').click();
    await page.locator('input[name="style"]').fill(breakdown.style);
    await page.locator('input[name="style"]').press('Enter');
    
    await page.getByRole('button', { name: 'Get Data' }).click();


});