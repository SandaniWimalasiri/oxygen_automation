const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');
const { chromium } = require('playwright');
const { PlaywrightTestConfig } = require('@playwright/test');

//const parser = parse({ delimiter, columns: true, trim: true, quote: '' });
//test.describe.configure({ mode: 'serial' });

test.describe.configure({ mode: 'parallel' });

const breakdowns = parse(fs.readFileSync(path.join(__dirname, './csv/AddNewOpBreakDown.csv')), {
  columns: true,
  skip_empty_lines: true
});


    // test.beforeAll(async ({page}) => { 
    //   const login = require('./links.js');
    //   login(page);
    // }); 

    test(`TC_028  Add Bulk upload - operation breakdown`, async ({page}) => {

      //console.log('Add Bulk upload - operation breakdown');
      const login = require('./links.js');
      await login(page);
     
      await page.waitForTimeout(5000);
      await page.getByRole('button', { name: 'Add New Operation Breakdown' }).click();

      for (const breakdown of breakdowns) {
        await page.waitForTimeout(30);
        await page.locator('input[name="style"]').isVisible();
        await page.locator('input[name="style"]').click();
        await page.locator('input[name="style"]').fill(breakdown.style);
        await page.locator('input[name="style"]').press('Tab');

        await page.waitForTimeout(30);
        await page.locator('.modal-content .css-b62m3t-container input[role="combobox"]').isVisible();
        await page.locator('.modal-content .css-b62m3t-container input[role="combobox"]').fill(breakdown.moduleId_svg);
        await page.locator('.modal-content .css-b62m3t-container input[role="combobox"]').press('Enter');
        await page.locator('.modal-content .css-b62m3t-container input[role="combobox"]').press('Tab');

        await page.waitForTimeout(30);
        await page.locator('input[name="version"]').isVisible();
        await page.locator('input[name="version"]').click();
        await page.locator('input[name="version"]').fill(breakdown.version);
        await page.locator('input[name="version"]').press('Tab');

        await page.locator('input[name="taktTime"]').isVisible();
        await page.locator('input[name="taktTime"]').fill(breakdown.taktTime);
        await page.locator('input[name="taktTime"]').press('Tab');

        await page.locator('input[name="workLoad"]').isVisible();
        await page.locator('input[name="workLoad"]').fill(breakdown.workLoad);
        await page.locator('input[name="workLoad"]').press('Tab');

        await page.locator('input[name="balancingLoss"]').isVisible();
        await page.locator('input[name="balancingLoss"]').fill(breakdown.balancingLoss);

        await page.waitForTimeout(30);

        await page.getByRole('heading', { name: 'Drop files here or click to upload' }).click();
        // await page.getByRole('dialog').setInputFiles('Operation Breakdown.xlsx');

        const handle=await page.$('input[type="file"]');
        await handle.setInputFiles('excel/Operation Breakdown.xlsx');
        
        await page.getByRole('button', { name: 'SAVE' }).click();
        await page.getByRole('button', { name: 'OK' }).click();
      }

    })

    test(`TC_029  Update through API - operation breakdown`, async ({page}) => {
      //console.log('Update through API - operation breakdown');
      const login = require('./links.js');
      login(page);

      await page.waitForTimeout(5000);
      await page.getByRole('button', { name: 'Add New Operation Breakdown' }).click();

      await page.waitForTimeout(30);
      await page.getByLabel('Update through API').check();

      for (const breakdown of breakdowns) {
        await page.waitForTimeout(30);

        await page.locator('input[name="style"]').isVisible();
        await page.locator('input[name="style"]').click();
        
        await page.locator('input[name="style"]').fill(breakdown.style);
        await page.locator('input[name="style"]').press('Tab');

        await page.waitForTimeout(30);
        await page.locator('.modal-content input[role="combobox"]').isVisible();
        await page.locator('.modal-content input[role="combobox"]').fill(breakdown.moduleId_svg);
        await page.locator('.modal-content input[role="combobox"]').press('Enter');
        await page.locator('.modal-content input[role="combobox"]').press('Tab');

        await page.waitForTimeout(30);

        await page.locator('input[name="version"]').isVisible();
        await page.locator('input[name="version"]').fill(breakdown.version);
        await page.locator('input[name="version"]').press('Tab');

        await page.locator('input[name="workload"]').isVisible();
        await page.locator('input[name="workload"]').fill(breakdown.workLoad);
        await page.locator('input[name="workload"]').press('Tab');

      }
      await page.getByRole('button', { name: 'UPDATE' }).isVisible();
      await page.getByRole('button', { name: 'UPDATE' }).click();

    })

    
