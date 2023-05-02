const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');

const logins = parse(fs.readFileSync(path.join(__dirname, 'csv/login.csv')), {
  columns: true,
  skip_empty_lines: true
});


test(`TC_001`, async ({ page }) => { 
    await page.goto('https://magentoqa.masholdings.com/login');
    // const [page1] = await Promise.all([
   
    //  ]);

    const page1=await page.waitForEvent('popup')
    await page.getByRole('button', { name: 'Sign in' }).click() 
    for (const login of logins) {
        await page1.getByPlaceholder('Email, phone, or Skype').click();
        await page1.getByPlaceholder('Email, phone, or Skype').fill(login.email);
        await page1.getByRole('button', { name: 'Next' }).click();
        
        await page1.locator('input[name="passwd"]').fill(login.password);
        await page1.getByRole('button', { name: 'Sign in' }).click();
        
        await page1.getByLabel('Don\'t show this again').check();
        await page1.getByRole('button', { name: 'Yes' }).click();
    }

    console.log('Test 01: Login to the system');
});



