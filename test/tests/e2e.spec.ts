import { test, expect } from '@playwright/test';


test.describe('Home Page tests', () => {
  test('Navbar links on Home page are correct on desktop', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');

    // Check the "About the Author" link in the desktop navbar
    const aboutAuthorLink = page.locator('.right.hide-on-med-and-down a', { hasText: 'About the Author' });
    await expect(aboutAuthorLink).toBeVisible();
    await expect(aboutAuthorLink).toHaveAttribute('href', '/aboutAuthor.html');

    // Check the "Stories" link in the desktop navbar
    const storiesLink = page.locator('.right.hide-on-med-and-down a', { hasText: 'Stories' });
    await expect(storiesLink).toBeVisible();
    await expect(storiesLink).toHaveAttribute('href', '/index.html');

    // Check the "Articles" link in the desktop navbar
    const articlesLink = page.locator('.right.hide-on-med-and-down a', { hasText: /^Articles$/ });
    await expect(articlesLink).toBeVisible();
    await expect(articlesLink).toHaveAttribute('href', '#Articles');

    // Check the "Critical Articles" link in the desktop navbar
    const criticalArticlesLink = page.locator('.right.hide-on-med-and-down a', { hasText: /^Critical Articles$/ });
    await expect(criticalArticlesLink).toBeVisible();
    await expect(criticalArticlesLink).toHaveAttribute('href', '#Critical_Articles');
    await page.screenshot({ path: 'ss/homePage1.png', fullPage: true });
  });

  test('Mobile navbar links on Home page are correct', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');

    // Check the "About the Author" link in the mobile navbar
    const aboutAuthorLinkMobile = page.locator('#nav-mobile a', { hasText: 'About the Author' });
    await expect(aboutAuthorLinkMobile).toBeVisible();
    await expect(aboutAuthorLinkMobile).toHaveAttribute('href', '/aboutAuthor.html');

    // Check the "Stories" link in the mobile navbar
    const storiesLinkMobile = page.locator('#nav-mobile a', { hasText: 'Stories' });
    await expect(storiesLinkMobile).toBeVisible();
    await expect(storiesLinkMobile).toHaveAttribute('href', '/index.html');

    // Check the "Articles" link in the mobile navbar
    const articlesLinkMobile = page.locator('#nav-mobile a', { hasText: /^Articles$/ });
    await expect(articlesLinkMobile).toBeVisible();
    await expect(articlesLinkMobile).toHaveAttribute('href', '#Articles');

    // Check the "Critical Articles" link in the mobile navbar
    const criticalArticlesLinkMobile = page.locator('#nav-mobile a', { hasText: /^Critical Articles$/ });
    await expect(criticalArticlesLinkMobile).toBeVisible();
    await expect(criticalArticlesLinkMobile).toHaveAttribute('href', '#Critical_Articles');
  });

  test('Story links are correct', async ({ page }) => {
    // Test data
    const expectedCards = [
      {
        imageUrl: 'images/story1.png',
        imageLinkHref: 'story1.html',
        cardTitle: 'Pinjre ka Qaidi',
        cardTitleHref: 'story1.html',
        cardContent: 'A collection of short stories published in 2015'
      },

      // Add more expected cards as needed
    ];

    // Test
    await page.goto('http://127.0.0.1:5500/index.html');

    // Locate all cards
    const cards = page.locator('.card');

    // Get the count of cards
    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);

      // Get the expected values for the current card
      const expectedCard = expectedCards[i];

      // Validate the image URL
      const imageUrl = await card.locator('.card-image a img').getAttribute('src');
      console.log(`Card ${i + 1} Image URL: ${imageUrl}`);
      await expect(imageUrl).toBe(expectedCard.imageUrl);  // Validate exact value

      // Validate the href in the card image link
      const imageLinkHref = await card.locator('.card-image a').getAttribute('href');
      console.log(`Card ${i + 1} Image Link Href: ${imageLinkHref}`);
      await expect(imageLinkHref).toBe(expectedCard.imageLinkHref);  // Validate exact value

      // Validate the card title text
      const cardTitle = await card.locator('.card-content .card-title a').innerText();
      console.log(`Card ${i + 1} Title: ${cardTitle}`);
      await expect(cardTitle).toBe(expectedCard.cardTitle);  // Validate exact value

      // Validate the href in the card title link
      const cardTitleHref = await card.locator('.card-content .card-title a').getAttribute('href');
      console.log(`Card ${i + 1} Title Link Href: ${cardTitleHref}`);
      await expect(cardTitleHref).toBe(expectedCard.cardTitleHref);  // Validate exact value

      // Validate the card content text
      const cardContent = await card.locator('.card-content p').innerText();
      console.log(`Card ${i + 1} Content: ${cardContent}`);
      await expect(cardContent).toBe(expectedCard.cardContent);  // Validate exact value
    }
    await page.screenshot({ path: 'ss/homePage2.png', fullPage: true });
  });

  test('Navigating to story and coming back to home page', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
    const linksToValidate = [
      { linkText: 'Pinjre ka Qaidi', expectedHref: 'story1.html' },
      // Add more objects as needed
    ];

    for (const { linkText, expectedHref } of linksToValidate) {
      // Locate the link with the specified text
      const link = page.locator('a', { hasText: linkText });

      // Ensure the link is visible
      await expect(link).toBeVisible();

      // Validate the href attribute
      const href = await link.getAttribute('href');
      console.log(`Link '${linkText}' href: ${href}`);
      await expect(href).toBe(expectedHref);

      // Click the link
      await link.click();
      await page.screenshot({ path: 'ss/storyPage1.png', fullPage: true });
      await page.getByRole('link', { name: 'Stories' }).first().click();
      await page.screenshot({ path: 'ss/storyPage2.png', fullPage: true });
    }
  });
});

test.describe('About Author Page tests', () => {
  test('Navbar links on About Author page are correct on desktop', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.getByRole('link', { name: 'About the Author' }).first().click();

    // Check the "About the Author" link in the desktop navbar
    const aboutAuthorLink = page.locator('.right.hide-on-med-and-down a', { hasText: 'About the Author' });
    await expect(aboutAuthorLink).toBeVisible();
    await expect(aboutAuthorLink).toHaveAttribute('href', '/aboutAuthor.html');

    // Check the "Stories" link in the desktop navbar
    const storiesLink = page.locator('.right.hide-on-med-and-down a', { hasText: 'Stories' });
    await expect(storiesLink).toBeVisible();
    await expect(storiesLink).toHaveAttribute('href', '/index.html');

    // Check the "Articles" link in the desktop navbar
    const articlesLink = page.locator('.right.hide-on-med-and-down a', { hasText: /^Articles$/ });
    await expect(articlesLink).toBeVisible();
    await expect(articlesLink).toHaveAttribute('href', '#Articles');

    // Check the "Critical Articles" link in the desktop navbar
    const criticalArticlesLink = page.locator('.right.hide-on-med-and-down a', { hasText: /^Critical Articles$/ });
    await expect(criticalArticlesLink).toBeVisible();
    await expect(criticalArticlesLink).toHaveAttribute('href', '#Critical_Articles');
    await page.screenshot({ path: 'ss/aboutAuthor1.png', fullPage: true });
  });

  test('Mobile navbar links on About Author page are correct', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.getByRole('link', { name: 'About the Author' }).first().click();

    // Check the "About the Author" link in the mobile navbar
    const aboutAuthorLinkMobile = page.locator('#nav-mobile a', { hasText: 'About the Author' });
    await expect(aboutAuthorLinkMobile).toBeVisible();
    await expect(aboutAuthorLinkMobile).toHaveAttribute('href', '/aboutAuthor.html');

    // Check the "Stories" link in the mobile navbar
    const storiesLinkMobile = page.locator('#nav-mobile a', { hasText: 'Stories' });
    await expect(storiesLinkMobile).toBeVisible();
    await expect(storiesLinkMobile).toHaveAttribute('href', '/index.html');

    // Check the "Articles" link in the mobile navbar
    const articlesLinkMobile = page.locator('#nav-mobile a', { hasText: /^Articles$/ });
    await expect(articlesLinkMobile).toBeVisible();
    await expect(articlesLinkMobile).toHaveAttribute('href', '#Articles');

    // Check the "Critical Articles" link in the mobile navbar
    const criticalArticlesLinkMobile = page.locator('#nav-mobile a', { hasText: /^Critical Articles$/ });
    await expect(criticalArticlesLinkMobile).toBeVisible();
    await expect(criticalArticlesLinkMobile).toHaveAttribute('href', '#Critical_Articles');
  });
});
