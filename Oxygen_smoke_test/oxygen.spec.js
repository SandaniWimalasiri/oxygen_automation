const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');

//run all the test cases in serial. if one test case is failed whole test suit will be failed
test.describe.configure({ mode: 'serial' });

//login credentials are included
const logins = parse(fs.readFileSync(path.join(__dirname, 'csv/login.csv')), {
  columns: true,
_empty_lines: true
});

//contain "style","moduleId_svg","version","taktTime","workLoad","balancingLoss"
const breakdowns = parse(fs.readFileSync(path.join(__dirname, './csv/AddNewOpBreakDown.csv')), {
    columns: true,
_empty_lines: true
  });

//contain "name","id"
const beacons = parse(fs.readFileSync(path.join(__dirname, './csv/BeaconId.csv')), {
    columns: true,
_empty_lines: true
});

//contain "name","iot_ID","macSerial","machine_serial"
const updates = parse(fs.readFileSync(path.join(__dirname, './csv/OB_update.csv')), {
    columns: true,
_empty_lines: true
  });

//login 
test.beforeEach(async ({ page }) => {
    await page.goto('https://magentoqa.masholdings.com/login');
    const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'Sign in' }).click()
     ]);

    
    for (const login of logins) {
        await page1.getByPlaceholder('Email, phone, or Skype').click();
        await page1.getByPlaceholder('Email, phone, or Skype').fill(login.email);
        await page1.getByRole('button', { name: 'Next' }).click();
        
        await page1.locator('input[name="passwd"]').fill(login.password);
        await page1.getByRole('button', { name: 'Sign in' }).click();
        
        await page1.getByLabel('Don\'t show this again').check();
        await page1.getByRole('button', { name: 'Yes' }).click();
    }

});

console.log("Logged to the system");

//Add Bulk upload - operation breakdown
test(`TC_001  Add Bulk upload - operation breakdown`, async ({page}) => {
 
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Add New Operation Breakdown' }).click();
    await page.waitForTimeout(3000);

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
  
      const handle=await page.$('input[type="file"]');
      await handle.setInputFiles('excel/Operation Breakdown.xlsx');
      
      await page.getByRole('button', { name: 'SAVE' }).click();

      await page.getByRole('button', { name: 'OK' }).click();
    }
    await page.locator('.css-ackcql').click();
    await page.locator('#react-select-5-option-0').click();

    const screenshotPath = path.join(__dirname, './img/01_Add Bulk upload - operation breakdown.png');
    await page.screenshot({ path: screenshotPath });

    console.log("Add Bulk upload - operation breakdown");
  })

 
//Update through API - operation breakdown
test(`TC_002  Update through API - operation breakdown`, async ({page}) => {
    
  
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

    console.log("Update through API - operation breakdown"); 
  })
 
  
//Bulk update - Team member
test(`TC_003  Bulk update - Team member`, async ({page}) => {
    await page.waitForTimeout(3000);
    await page.goto('https://magentoqa.masholdings.com/team-member-update');
    await page.waitForTimeout(5000);

    await page.getByRole('button', { name: 'Update team members' }).isVisible();
    await page.getByRole('button', { name: 'Update team members' }).click();
    for (const breakdown of breakdowns) {
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

    await page.locator('div').filter({ hasText: /^Filter by module$/ }).nth(3).click();
    await page.getByText(breakdown.moduleId_svg, { exact: true }).click();
    }
    const screenshotPath2 = path.join(__dirname, './img/02_Bulk update - Team member.png');
    await page.screenshot({ path: screenshotPath2 });

    console.log("Bulk update - Team member"); 
  });


//Update through API - Team member
test(`TC_004  Update through API - Team member`, async ({page}) => {
    await page.waitForTimeout(3000);
    await page.goto('https://magentoqa.masholdings.com/team-member-update');
    await page.waitForTimeout(3000);
    
    await page.locator ('//button[@class="btn btn-maroon"][contains(text(),"Update team members")]').click();

    await page.waitForTimeout(30);
    await page.getByLabel('Update through API').check();

    for (const breakdown of breakdowns) {
        await page.waitForTimeout(30);
        await page.locator('.modal-content input[role="combobox"]').isVisible();
        await page.locator('.modal-content input[role="combobox"]').fill(breakdown.moduleId_svg);
        await page.locator('.modal-content input[role="combobox"]').press('Enter');
        await page.locator('.modal-content input[role="combobox"]').press('Tab');
    }

    await page.waitForTimeout(30);

    await page.getByRole('button', { name: 'SAVE' }).isVisible();
    await page.getByRole('button', { name: 'SAVE' }).click();
    await page.getByRole('button', { name: 'OK' }).isVisible();

    const screenshotPath = path.join(__dirname, './img/03_Update through API - Team member.png');
    await page.screenshot({ path: screenshotPath });

    await page.getByRole('button', { name: 'OK' }).click();

    console.log("Update through API - Team member"); 
  });
 

//Update Beacon ID
test(`TC_005 Update Beacon ID`, async ({page}) => {
    await page.waitForTimeout(3000);
    await page.goto('https://magentoqa.masholdings.com/beacon-id-update');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Update Beacon ID' }).isVisible();
    await page.getByRole('button', { name: 'Update Beacon ID' }).click();
    await page.waitForTimeout(3000);
  
    for (const breakdown of breakdowns) {
        await page.waitForTimeout(30);
        await page.locator('.modal-content input[role="combobox"]').isVisible();
        await page.locator('.modal-content input[role="combobox"]').fill(breakdown.moduleId_svg);
        await page.locator('.modal-content input[role="combobox"]').press('Enter');
    }
  
    for (const beacon of beacons) {
      await page.getByRole('row', { name: beacon.name }).getByRole('textbox').click();
      await page.getByRole('row', { name: beacon.name }).getByRole('textbox').fill(beacon.id);
    }
  
    await page.getByRole('button', { name: 'SAVE' }).click();
    await page.getByRole('button', { name: 'OK' }).click();

    for (const breakdown of breakdowns) {
        await page.locator('.css-ackcql').first().click();
        //await page.locator('#react-select-5-option-0').click();
        await page.getByText(breakdown.moduleId_svg, { exact: true }).click();
    }
    const screenshotPath2 = path.join(__dirname, './img/04_update Beacon ID.png');
    await page.screenshot({ path: screenshotPath2 });

    console.log("Update Beacon ID"); 
  })
 
  
//OB Update with team member & IoT
test('TC_006 OB Update with team member & IoT', async ({ page }) => {

    await page.waitForTimeout(3000);
    await page.goto('https://magentoqa.masholdings.com/team-member-beacon-id');
    await page.waitForTimeout(3000);

    for (const breakdown of breakdowns) {
        await page.waitForTimeout(30);
        await page.locator('input[name="style"]').isVisible();
        await page.locator('input[name="style"]').fill(breakdown.style);
        await page.locator('input[name="style"]').press('Tab');

        await page.locator('.css-ackcql').click();
        await page.getByText(breakdown.moduleId_svg, { exact: true }).click();
    }

    await page.getByRole('button', { name: 'Get Data' }).isVisible();
    await page.getByRole('button', { name: 'Get Data' }).click();
    
    await page.getByRole('row', { name: '1 2 3OLFB CUT EXCESS .... ....' }).getByRole('button').click();
    //await page.locator('[id="cell-8-48cfcfd4-f925-45e0-a0b5-37a6825ee35a"]').getByRole('button').click();

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

    const screenshotPath1 = path.join(__dirname, './img/05_OB Update with team member & IoT.png');
    await page.screenshot({ path: screenshotPath1 });
    
    console.log('OB Update with team member & IoT');
  });
 
  
//Module wise current style maintenance
test(`TC_007 Module wise current style maintenance`, async ({page}) => {
   
    await page.waitForTimeout(3000);
   
    await page.goto('https://magentoqa.masholdings.com/module-wise-current-style-manage');

    await page.waitForTimeout(3000);
    for (const breakdown of breakdowns) {
        await page.locator(' css-ackcql').isVisible();
        await page.locator('.css-ackcql').click();
        await page.locator('#react-select-5-option-0').click();
        //await page.locator('#react-select-5-input').fill(breakdown.moduleId_svg);
        //await page.locator('#react-select-5-input').press('Enter');

        const screenshotPath1 = path.join(__dirname, './img/05_OB Update with team member & IoT.png');
        await page.screenshot({ path: screenshotPath1 });
       // await page.getByRole('checkbox', { name: 'select-row-undefined' }).check();
        await page.locator('#row-1 > div').first().click();
    
                           
    await page.getByRole('button', { name: 'Add to Yamazumi drawing queue' }).isVisible();
    await page.getByRole('button', { name: 'Add to Yamazumi drawing queue' }).click();
    await page.getByRole('button', { name: 'OK' }).isVisible();
    await page.getByRole('button', { name: 'OK' }).click();

    }
    const screenshotPath1 = path.join(__dirname, './img/06_OB Update with team member & IoT.png');
    await page.screenshot({ path: screenshotPath1 });

    console.log('Module wise current style maintenance');
});
 

//Module to be hold for Yamazumi
test(`TC_008 Module to be hold for Yamazumi`, async ({page}) => {
    
    await page.waitForTimeout(3000);
    await page.goto('https://magentoqa.masholdings.com/module-to-hold-yamazumi');

    await page.waitForTimeout(3000);
    for (const breakdown of breakdowns) {
        // await page.locator('.css-ackcql input[role="combobox"]').isVisible();
        // await page.locator('.css-ackcql input[role="combobox"]').fill(breakdown.moduleId_svg);
        // await page.locator('.css-ackcql input[role="combobox"]').press('Enter');

        await page.locator('.css-ackcql').click();
        //await page.getByText(breakdown.moduleId_svg, { exact: true }).click();
        await page.locator('#react-select-5-option-0').click();
      
    }
    await page.locator('button').click();

    const screenshotPath1 = path.join(__dirname, './img/07_Module to be hold for Yamazumi.png');
    await page.screenshot({ path: screenshotPath1 });

    console.log('Module to be hold for Yamazumi');

});


//style wise takt time
test(`TC_009 style wise takt time`, async ({page}) => {
    
    await page.waitForTimeout(3000);
    await page.goto('https://magentoqa.masholdings.com/style-wise-takt-time');

    await page.waitForTimeout(3000);
    for (const breakdown of breakdowns) {

        await page.locator('.css-ackcql').first().click();
        await page.getByText(breakdown.moduleId_svg, { exact: true }).click();
        await page.locator('.css-1s2u09g-control > .css-1d8n9bt > .css-ackcql').click();
        await page.getByText(breakdown.style, { exact: true }).click();
    }
    
    
    await page.getByRole('button', { name: 'Get Data' }).click();

    const screenshotPath1 = path.join(__dirname, './img/08_style wise takt time.png');
    await page.screenshot({ path: screenshotPath1 });

    console.log('style wise takt time');

});

//Plant level walking time
test(`TC_010 Plant level walking time`, async ({page}) => {
    
    await page.waitForTimeout(3000);
    await page.goto('https://magentoqa.masholdings.com/plant-level-walking-time');
   

    await page.waitForTimeout(3000);
    page.getByLabel('Walking time (s)').click();
    await page.getByLabel('Walking time (s)').fill('11');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'OK' }).click();

    console.log('Plant level walking time');
});