const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');

test.describe.configure({ mode: 'parallel' });

const breakdowns = parse(fs.readFileSync(path.join(__dirname, './csv/AddNewOpBreakDown.csv')), {
  columns: true,
  skip_empty_lines: true
});

test(`TC_031  Bulk update - Team member`, async ({page}) => {
    const login = require('./links.js');
    login(page);
    await page.waitForTimeout(3000);

    const teamUpdate = require('./links.js');
    teamUpdate(page);

    await page.waitForTimeout(5000);

    await page.getByRole('button', { name: 'Update team members' }).isVisible();
    await page.getByRole('button', { name: 'Update team members' }).click();

    await page.waitForTimeout(30);
    await page.locator('.modal-content input[role="combobox"]').isVisible();
    await page.locator('.modal-content input[role="combobox"]').fill(breakdown.moduleId_svg);
    await page.locator('.modal-content input[role="combobox"]').press('Enter');
    await page.locator('.modal-content input[role="combobox"]').press('Tab');

    await page.waitForTimeout(30);
    
    await page.getByRole('heading', { name: 'Drop files here or click to upload' }).click();
    const handle=await page.$('input[type="file"]');
    await handle.setInputFiles('excel/Team Member.xlsx');

    await page.getByRole('button', { name: 'SAVE' }).isVisible();
    await page.getByRole('button', { name: 'SAVE' }).click();
    await page.getByRole('button', { name: 'OK' }).isVisible();
    await page.getByRole('button', { name: 'OK' }).click();

   
  });
  
  test(`TC_032  Update through API - Team member`, async ({page}) => {
    const login = require('./links.js');
    login(page);
    await page.waitForTimeout(3000);
    
    // const teamUpdate = require('./links.js');
    // teamUpdate(page);
    await page.locator('//div[@class="scrollbar-container main-menu-content h-100 ps"]').click();

    await page.locator('//span[@class="menu-item text-truncate t ext-small-extra"][contains(text(),"Team member update")]').click();
    await page.waitForTimeout(5000);

    // await page.getByRole('button', { name: 'Update team members' }).isVisible();
    //await page.getByRole('button', { name: 'Update team members' }).click();
    await page.locator ('//button[@class="btn btn-maroon"][contains(text(),"Update team members")]').click();

    await page.waitForTimeout(30);
    await page.getByLabel('Update through API').check();

    await page.waitForTimeout(30);
    await page.locator('.modal-content input[role="combobox"]').isVisible();
    await page.locator('.modal-content input[role="combobox"]').fill(breakdown.moduleId_svg);
    await page.locator('.modal-content input[role="combobox"]').press('Enter');
    await page.locator('.modal-content input[role="combobox"]').press('Tab');

    await page.waitForTimeout(30);

    await page.getByRole('button', { name: 'SAVE' }).isVisible();
    await page.getByRole('button', { name: 'SAVE' }).click();
    await page.getByRole('button', { name: 'OK' }).isVisible();
    await page.getByRole('button', { name: 'OK' }).click();

   
  });
  