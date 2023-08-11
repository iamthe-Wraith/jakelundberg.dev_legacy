import { expect, type Page } from '@playwright/test';
import { openMobileNav } from './nav';

const mainMenuOptions = [
  'Skills', 
  // 'Secrets Found', 
  'Get in Touch', 
  'On the Web'
];

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
  // await mainMenuSecretsFoundExists(page);
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
  // await mainMenuSecretsFoundExists(page);
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

// async function mainMenuSecretsFoundExists(page: Page) {
//   const mainMenu = page.locator('.main-menu');
//   const main = mainMenu.locator('main');
//   await expect(main).toBeVisible();

//   const options = await main.locator('.main-menu-options button').all();
//   await expect(options).toHaveLength(4);

//   options[1].click();

//   const details = main.locator('.main-menu-selected-option-details');
//   await expect(details).toBeVisible();

//   const skillsHeader = details.getByRole('heading', { name: mainMenuOptions[1] });
//   await expect(skillsHeader).toBeVisible();
//   await expect(skillsHeader).toHaveText(mainMenuOptions[1]);
// }

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

  const container = details.locator('.get-in-touch');
  await expect(container).toBeVisible();

  const form = container.locator('form');
  await expect(form).toBeVisible();

  let submit = form.locator('button[type="submit"]');
  await expect(submit).toBeVisible();
  await expect(submit).toHaveText('Send');
  await expect(submit).toBeDisabled();

  // #region email
  const emailContainer = form.locator('#email-container');
  await expect(emailContainer).toBeVisible();

  const emailLabel = emailContainer.locator('label');
  await expect(emailLabel).toBeVisible();
  await expect(emailLabel).toHaveText('Email');

  const email = emailContainer.locator('input[name="email"]');
  await expect(email).toBeVisible();

  let emailError = emailContainer.locator('#email-container .error');
  await expect(emailError).not.toBeVisible();

  await email.focus();
  await email.press('Tab');
  
  emailError = emailContainer.locator('#email-container .error');
  await expect(emailError).not.toBeVisible();

  await email.focus();
  await email.type('test');
  await email.press('Tab');

  emailError = emailContainer.locator('#email-container .error');
  await expect(emailError).not.toBeVisible();
  // #endregion

  // #region subject
  const subjectContainer = form.locator('#subject-container');
  await expect(subjectContainer).toBeVisible();

  const subjectLabel = subjectContainer.locator('label');
  await expect(subjectLabel).toBeVisible();
  await expect(subjectLabel).toHaveText('Subject');

  const subject = subjectContainer.locator('input[name="subject"]');
  await expect(subject).toBeVisible();

  let subjectError = subjectContainer.locator('#subject-container .error');
  await expect(subjectError).not.toBeVisible();

  await subject.focus();
  await subject.press('Tab');

  subjectError = subjectContainer.locator('#subject-container .error');
  await expect(subjectError).not.toBeVisible();

  await subject.focus();
  await subject.type('test');
  await subject.press('Tab');

  subjectError = subjectContainer.locator('#subject-container .error');
  await expect(subjectError).not.toBeVisible();
  // #endregion

  // #region message
  const messageContainer = form.locator('#message-container');
  await expect(messageContainer).toBeVisible();

  const messageLabel = messageContainer.locator('label');
  await expect(messageLabel).toBeVisible();
  await expect(messageLabel).toHaveText('Message');

  const message = messageContainer.locator('textarea[name="message"]');
  await expect(message).toBeVisible();

  let messageError = messageContainer.locator('#message-container .error');
  await expect(messageError).not.toBeVisible();

  await message.focus();
  await message.press('Tab');

  messageError = messageContainer.locator('#message-container .error');
  await expect(messageError).not.toBeVisible();

  await message.focus();
  await message.type('test');
  await message.press('Tab');

  messageError = messageContainer.locator('#message-container .error');
  await expect(messageError).not.toBeVisible();
  // #endregion

  const formError = form.locator('.form-error-container');
  await expect(formError).not.toBeVisible();

  submit = form.locator('button[type="submit"]');
  await expect(submit).toBeEnabled();
}

async function mainMenuOnTheWebExists(page: Page) {
  const onTheWebOptions = ['GitHub', 'LinkedIn', 'Mastodon', 'Bluesky'];

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
  await expect(links.length).toEqual(onTheWebOptions.length);

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    await expect(link).toBeVisible();
    await expect(link.getAttribute('href')).toBeDefined();

    const img = link.locator('img');
    await expect(img).toBeVisible();
    await expect(img.getAttribute('alt')).toBeDefined();
    await expect(img.getAttribute('src')).toBeDefined();

    const text = link.locator('span');
    await expect(text).toBeVisible();
    await expect(text).toHaveText(onTheWebOptions[i]);

    const svg = link.locator('svg');
    await expect(svg).toHaveCSS('opacity', '0');
    await expect(svg).toHaveCSS('position', 'absolute');
  }
}