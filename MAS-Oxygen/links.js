module.exports = async function login(page) 
{ return new Promise(async (resolve) => { 
  const fs = require('fs');
    const path = require('path');
    const { test } = require('@playwright/test');
    const { parse } = require('csv-parse/sync');

    const logins = parse(fs.readFileSync(path.join(__dirname, 'csv/login.csv')), {
      columns: true,
      skip_empty_lines: true
    });
  
    await page.goto('https://magentoqa.masholdings.com/login');
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

          //await page.goto('https://magentoqa.masholdings.com/dashboard');
      }

  resolve(true); }) 
}


// module.exports = async function login(page) {
//     const fs = require('fs');
//     const path = require('path');
//     const { test } = require('@playwright/test');
//     const { parse } = require('csv-parse/sync');

//     const logins = parse(fs.readFileSync(path.join(__dirname, 'csv/login.csv')), {
//       columns: true,
//       skip_empty_lines: true
//     });
  
//     await page.goto('https://magentoqa.masholdings.com/login');
//     const page1=await page.waitForEvent('popup')
//     await page.getByRole('button', { name: 'Sign in' }).click() 
//       for (const login of logins) {
//           await page1.getByPlaceholder('Email, phone, or Skype').click();
//           await page1.getByPlaceholder('Email, phone, or Skype').fill(login.email);
//           await page1.getByRole('button', { name: 'Next' }).click();
          
//           await page1.locator('input[name="passwd"]').fill(login.password);
//           await page1.getByRole('button', { name: 'Sign in' }).click();
          
//           await page1.getByLabel('Don\'t show this again').check();
//           await page1.getByRole('button', { name: 'Yes' }).click();

//           //await page.goto('https://magentoqa.masholdings.com/dashboard');
//       }
//       //await page.goto('https://magentoqa.masholdings.com/dashboard');
//   }

//   // module.exports = async function breakdown(page) {
//   //   await page.goto('https://magentoqa.masholdings.com/dashboard');
//   // }

  module.exports = async function teamUpdate(page) {
    await page.goto('https://magentoqa.masholdings.com/team-member-update');
  }

  module.exports = async function beaconId(page) {
    await page.goto('https://magentoqa.masholdings.com/beacon-id-update');
  }

  module.exports = async function OBupdate(page) {
    await page.goto('https://magentoqa.masholdings.com/team-member-beacon-id');
  }

  module.exports = async function moduleWise(page) {
    await page.goto('https://magentoqa.masholdings.com/module-wise-current-style-manage');
  }

  module.exports = async function moduleToBeHold(page) {
    await page.goto('https://magentoqa.masholdings.com/module-to-hold-yamazumi');
  }

  module.exports = async function takt(page) {
    await page.goto('https://magentoqa.masholdings.com/style-wise-takt-time');
  }

