const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');

const breakdowns = parse(fs.readFileSync(path.join(__dirname, './csv/AddNewOpBreakDown.csv')), {
  columns: true,
  skip_empty_lines: true
});

const updates = parse(fs.readFileSync(path.join(__dirname, './csv/OB_update.csv')), {
    columns: true,
    skip_empty_lines: true
  });

test('TC_034 OB Update with team member & IoT', async ({ page }) => {
    const login = require('./links.js');
    login(page);
    await page.waitForTimeout(3000);

    const OBupdate = require('./links.js');
    OBupdate(page);

    for (const breakdown of breakdowns) {
        await page.waitForTimeout(30);
        await page.locator('input[name="style"]').isVisible();
        //await page.locator('input[name="style"]').click();
        await page.locator('input[name="style"]').fill(breakdown.style);
        await page.locator('input[name="style"]').press('Tab');

        await page.locator('.modal-content input[role="combobox"]').isVisible();
        await page.locator('.modal-content input[role="combobox"]').fill(breakdown.moduleId_svg);
        await page.locator('.modal-content input[role="combobox"]').press('Enter');
    }

    await page.getByRole('button', { name: 'Get Data' }).isVisible();
    await page.getByRole('button', { name: 'Get Data' }).click();

    await page.getByRole('button', { name: 'OK' }).isVisible();
    await page.getByRole('button', { name: 'OK' }).click();

    
    //await page.getByRole('row', { name: '1 2 3OLFB CUT EXCESS .... ....' }).getByRole('button').click();
    await page.locator(id="cell-8-48cfcfd4-f925-45e0-a0b5-37a6825ee35a").getByRole('button').click();

    for (const update of updates) {
        await page.getByRole('dialog').locator('svg').click();
        await page.getByText(update.name, { exact: true }).click();
        await page.getByLabel('iot ID').click();
        await page.getByLabel('iot ID').fill(update.iot_ID);
        await page.locator('#macSerial').click();
        await page.locator('#macSerial').fill(update.macSerial);
        await page.getByLabel('Machine serial').click();
        await page.getByLabel('Machine serial').fill(update.machine_serial);
    }

    await page.getByRole('button', { name: 'UPDATE' }).isVisible();
    await page.getByRole('button', { name: 'UPDATE' }).click();

    await page.getByRole('button', { name: 'OK' }).isVisible();
    await page.getByRole('button', { name: 'OK' }).click();
    
  });
  