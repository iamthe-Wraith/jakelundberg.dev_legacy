import { expect, type Page } from '@playwright/test';
import { openMobileNav } from './nav';

const mainMenuOptions = ['Skills', 'Secrets Found', 'Get in Touch', 'On the Web'];

export async function openMobileMainMenu(page: Page) {
  await openMobileNav(page);

  const mainMenuBtn = page.locator('.main-menu-nav-item');
  await expect(mainMenuBtn).toBeVisible();
  mainMenuBtn.click();
}

export async function openDesktopMainMenu(page: Page, method: 'escapeKey' | 'indicator' = 'escapeKey') {
  if (method === 'escapeKey') {
    await page.keyboard.press('Escape');
  }

  if (method === 'indicator') {
    const pressEscapeIndicator = page.locator('.press-escape');
    await expect(pressEscapeIndicator).toBeVisible();
    await expect(pressEscapeIndicator).toHaveText('ESC');
    pressEscapeIndicator.click();
  }
};

export async function mobileMainMenuExists(page: Page) {
  const dialog = page.locator('.dialog');
  await expect(dialog).not.toBeVisible();

  let overlay = page.locator('.main-menu-overlay');
  await expect(overlay).not.toBeVisible();

  let mainMenu = page.locator('.main-menu');
  await expect(mainMenu).not.toBeVisible();      

  await openMobileMainMenu(page);

  overlay = page.locator('.main-menu-overlay');
  await expect(overlay).not.toBeVisible();

  mainMenu = page.locator('.main-menu');
  await expect(mainMenu).toBeVisible();

  const header = mainMenu.locator('header');
  await expect(header).toBeVisible();

  const pressEscapeIndicator = page.locator('.press-escape');
  await expect(pressEscapeIndicator).not.toBeVisible();

  const title = header.locator('h2');
  await expect(title).toBeVisible();
  await expect(title).toHaveText('Main Menu');

  const desc = header.locator('.main-menu-description');
  await expect(desc).toBeDefined();
  await expect(desc).not.toBeVisible();

  const main = mainMenu.locator('main');
  await expect(main).toBeVisible();

  const options = await main.locator('.main-menu-options button').all();
  await expect(options).toHaveLength(4);

  for (let i = 0; i < options.length; i++) {
    const mainMenuOption = mainMenuOptions[i];
    const option = options[i];

    if (i === 0) await expect(option).toHaveClass(/main-menu-option-selected/);

    await expect(option).toBeVisible();
    await expect(option).toHaveText(mainMenuOption);
  }

  await mainMenuSkillsExists(page);
  await mainMenuSecretsFoundExists(page);
  await mainMenuGetInTouchExists(page);
  await mainMenuOnTheWebExists(page);
}

export async function desktopMainMenuExists(page: Page) {
  const dialog = page.locator('.dialog');
  await expect(dialog).not.toBeVisible();

  let overlay = page.locator('.main-menu-overlay');
  await expect(overlay).not.toBeVisible();

  let mainMenu = page.locator('.main-menu');
  await expect(mainMenu).not.toBeVisible();   

  const pressEscapeIndicator = page.locator('.press-escape');
  await expect(pressEscapeIndicator).toBeVisible();

  await openDesktopMainMenu(page);

  overlay = page.locator('.main-menu-overlay');
  await expect(overlay).toBeVisible();

  mainMenu = page.locator('.main-menu');
  await expect(mainMenu).toBeVisible();

  const header = mainMenu.locator('header');
  await expect(header).toBeVisible();

  const title = header.locator('h2');
  await expect(title).toBeVisible();
  await expect(title).toHaveText('Main Menu');

  const desc = header.locator('.main-menu-description');
  await expect(desc).toBeDefined();
  await expect(desc).toBeVisible();

  const main = mainMenu.locator('main');
  await expect(main).toBeVisible();

  const options = await main.locator('.main-menu-options button').all();
  await expect(options).toHaveLength(4);

  for (let i = 0; i < options.length; i++) {
    const mainMenuOption = mainMenuOptions[i];
    const option = options[i];

    if (i === 0) await expect(option).toHaveClass(/main-menu-option-selected/);

    await expect(option).toBeVisible();
    await expect(option).toHaveText(mainMenuOption);
  }

  await mainMenuSkillsExists(page);
  await mainMenuSecretsFoundExists(page);
  await mainMenuGetInTouchExists(page);
  await mainMenuOnTheWebExists(page);
}

async function mainMenuSkillsExists(page: Page) {
  const mainMenu = page.locator('.main-menu');
  const main = mainMenu.locator('main');
  await expect(main).toBeVisible();

  const options = await main.locator('.main-menu-options button').all();
  await expect(options).toHaveLength(4);

  options[0].click();

  const details = main.locator('.main-menu-selected-option-details');
  await expect(details).toBeVisible();

  const skillsHeader = details.getByRole('heading', { name: mainMenuOptions[0] });
  await expect(skillsHeader).toBeVisible();
  await expect(skillsHeader).toHaveText(mainMenuOptions[0]);

  const skills = await details.locator('.skill').all();
  await expect(skills.length).toBeGreaterThan(0);
}

async function mainMenuSecretsFoundExists(page: Page) {
  const mainMenu = page.locator('.main-menu');
  const main = mainMenu.locator('main');
  await expect(main).toBeVisible();

  const options = await main.locator('.main-menu-options button').all();
  await expect(options).toHaveLength(4);

  options[1].click();

  const details = main.locator('.main-menu-selected-option-details');
  await expect(details).toBeVisible();

  const skillsHeader = details.getByRole('heading', { name: mainMenuOptions[1] });
  await expect(skillsHeader).toBeVisible();
  await expect(skillsHeader).toHaveText(mainMenuOptions[1]);
}

async function mainMenuGetInTouchExists(page: Page) {
  const mainMenu = page.locator('.main-menu');
  const main = mainMenu.locator('main');
  await expect(main).toBeVisible();

  const options = await main.locator('.main-menu-options button').all();
  await expect(options).toHaveLength(4);

  options[2].click();

  const details = main.locator('.main-menu-selected-option-details');
  await expect(details).toBeVisible();

  const skillsHeader = details.getByRole('heading', { name: mainMenuOptions[2] });
  await expect(skillsHeader).toBeVisible();
  await expect(skillsHeader).toHaveText(mainMenuOptions[2]);
}

async function mainMenuOnTheWebExists(page: Page) {
  const mainMenu = page.locator('.main-menu');
  const main = mainMenu.locator('main');
  await expect(main).toBeVisible();

  const options = await main.locator('.main-menu-options button').all();
  await expect(options).toHaveLength(4);

  options[3].click();

  const details = main.locator('.main-menu-selected-option-details');
  await expect(details).toBeVisible();

  const skillsHeader = details.getByRole('heading', { name: mainMenuOptions[3] });
  await expect(skillsHeader).toBeVisible();
  await expect(skillsHeader).toHaveText(mainMenuOptions[3]);

  const links = await details.locator('a').all();
  await expect(links.length).toEqual(4);

  expect(links[0]).toHaveText('GitHub');

  expect(links[1]).toHaveText('LinkedIn');

  expect(links[2]).toHaveText('Mastodon');

  expect(links[3]).toHaveText('Bluesky');
}