const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');


test(`TC_038 Plant level walking time`, async ({page}) => {
    const login = require('./links.js');
    login(page);
    await page.waitForTimeout(3000);
   
    const wTime = require('./links.js');
    wTime(page);

    await page.waitForTimeout(30);
    page.getByLabel('Walking time (s)').click();
    await page.getByLabel('Walking time (s)').fill('11');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'OK' }).click();


});