
const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');

const breakdowns = parse(fs.readFileSync(path.join(__dirname, './csv/AddNewOpBreakDown.csv')), {
  columns: true,
  skip_empty_lines: true
});

const beacons = parse(fs.readFileSync(path.join(__dirname, './csv/BeaconId.csv')), {
  columns: true,
  skip_empty_lines: true
});

test(`TC_033 Update Beacon ID`, async ({page}) => {
  const login = require('./links.js');
  login(page);
  await page.waitForTimeout(3000);

  const beaconId = require('./links.js');
  beaconId(page);

  //await page.locator('//button[@class="btn btn-maroon"][contains(text(),"Update Beacon ID")]').click();

  await page.getByRole('button', { name: 'Update Beacon ID' }).isVisible();
  await page.getByRole('button', { name: 'Update Beacon ID' }).click();
  await page.waitForTimeout(3000);

  await page.waitForTimeout(30);
  await page.locator('.modal-content input[role="combobox"]').isVisible();
  await page.locator('.modal-content input[role="combobox"]').fill(breakdown.moduleId_svg);
  await page.locator('.modal-content input[role="combobox"]').press('Enter');
  

  for (const beacon of beacons) {
    await page.getByRole('row', { name: beacon.name }).getByRole('textbox').click();
    await page.getByRole('row', { name: beacon.name }).getByRole('textbox').fill(beacon.id);
  }

  await page.getByRole('button', { name: 'SAVE' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
})
