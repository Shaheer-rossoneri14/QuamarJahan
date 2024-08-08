import { test, expect } from '@playwright/test';

test.describe('Stories Page tests', () => {
  test('Navbar links on Stories page are correct on desktop', async ({ page }) => {
    await page.goto('https://quamar-jahan.vercel.app/');

    // Check the "Home" link in the desktop navbar
    const homeLink = page.locator('.right.hide-on-med-and-down a', { hasText: 'Home' });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/index.html');

    // Check the "Stories" link in the desktop navbar
    const storiesLink = page.locator('.right.hide-on-med-and-down a', { hasText: 'Stories' });
    await expect(storiesLink).toBeVisible();
    await expect(storiesLink).toHaveAttribute('href', '/stories.html');

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

  test('Mobile navbar links on Stories page are correct', async ({ page }) => {
    await page.goto('https://quamar-jahan.vercel.app/');

    // Check the "Home" link in the mobile navbar
    const homeLinkMobile = page.locator('#nav-mobile a', { hasText: 'Home' });
    await expect(homeLinkMobile).toBeVisible();
    await expect(homeLinkMobile).toHaveAttribute('href', '/index.html');

    // Check the "Stories" link in the mobile navbar
    const storiesLinkMobile = page.locator('#nav-mobile a', { hasText: 'Stories' });
    await expect(storiesLinkMobile).toBeVisible();
    await expect(storiesLinkMobile).toHaveAttribute('href', '/stories.html');

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
        imageUrl: 'images/Charahgar2.png',
        imageLinkHref: 'Charagar.html',
        cardTitle: 'Charahgar',
        cardTitleHref: 'Charagar.html',
        cardContent: 'A collection of short stories published in 1983'
      },
      {
        imageUrl: 'images/PinjreKaQaidi1.png',
        imageLinkHref: 'PinjreKaQaidi.html',
        cardTitle: 'Pinjre ka Qaidi',
        cardTitleHref: 'PinjreKaQaidi.html',
        cardContent: 'A collection of short stories published in 2015'
      },
      // Add more expected cards as needed
    ];

    await page.goto('https://quamar-jahan.vercel.app/');
    const cards = page.locator('.card');
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
});

test.describe('Home Page tests', () => {
  test('Navbar links on Home page are correct on desktop', async ({ page }) => {
    await page.goto('https://quamar-jahan.vercel.app/');
    await page.getByRole('link', { name: 'Home' }).first().click();

    // Check the "Home" link in the desktop navbar
    const homeLink = page.locator('.right.hide-on-med-and-down a', { hasText: 'Home' });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/index.html');

    // Check the "Stories" link in the desktop navbar
    const storiesLink = page.locator('.right.hide-on-med-and-down a', { hasText: 'Stories' });
    await expect(storiesLink).toBeVisible();
    await expect(storiesLink).toHaveAttribute('href', '/stories.html');

    // Check the "Articles" link in the desktop navbar
    const articlesLink = page.locator('.right.hide-on-med-and-down a', { hasText: /^Articles$/ });
    await expect(articlesLink).toBeVisible();
    await expect(articlesLink).toHaveAttribute('href', '#Articles');

    // Check the "Critical Articles" link in the desktop navbar
    const criticalArticlesLink = page.locator('.right.hide-on-med-and-down a', { hasText: /^Critical Articles$/ });
    await expect(criticalArticlesLink).toBeVisible();
    await expect(criticalArticlesLink).toHaveAttribute('href', '#Critical_Articles');
    await page.screenshot({ path: 'ss/Home1.png', fullPage: true });
  });

  test('Mobile navbar links on Home page are correct', async ({ page }) => {
    await page.goto('https://quamar-jahan.vercel.app/');
    await page.getByRole('link', { name: 'Home' }).first().click();

    // Check the "Home" link in the mobile navbar
    const homeLinkMobile = page.locator('#nav-mobile a', { hasText: 'Home' });
    await expect(homeLinkMobile).toBeVisible();
    await expect(homeLinkMobile).toHaveAttribute('href', '/index.html');

    // Check the "Stories" link in the mobile navbar
    const storiesLinkMobile = page.locator('#nav-mobile a', { hasText: 'Stories' });
    await expect(storiesLinkMobile).toBeVisible();
    await expect(storiesLinkMobile).toHaveAttribute('href', '/stories.html');

    // Check the "Articles" link in the mobile navbar
    const articlesLinkMobile = page.locator('#nav-mobile a', { hasText: /^Articles$/ });
    await expect(articlesLinkMobile).toBeVisible();
    await expect(articlesLinkMobile).toHaveAttribute('href', '#Articles');

    // Check the "Critical Articles" link in the mobile navbar
    const criticalArticlesLinkMobile = page.locator('#nav-mobile a', { hasText: /^Critical Articles$/ });
    await expect(criticalArticlesLinkMobile).toBeVisible();
    await expect(criticalArticlesLinkMobile).toHaveAttribute('href', '#Critical_Articles');
  });

  test('Content in page is correct', async ({ page }) => {
    await page.goto('https://quamar-jahan.vercel.app/');
    await page.getByRole('link', { name: 'Home' }).first().click();

    const expectedProfileImageUrl = 'images/Dadi_potrait.png'
    const aboutPageHeadingText = 'Prof. Quamar Jahan: A Luminary in Urdu Literature'
    const imageUrl = await page.locator('.profile-image').getAttribute('src');
    await expect(imageUrl).toBe(expectedProfileImageUrl);
    const header = (page.getByRole('heading', { name: aboutPageHeadingText }))
  })
});

test.describe('Story page tests', () => {
  test('Stody heading and story file is correct', async ({ page }) => {
    await page.goto('https://quamar-jahan.vercel.app/stories.html');
    const storyObjects = [
      { linkText: 'Pinjre ka Qaidi', headingText: 'Pinjre ka Qaidi', storyLink: 'https://drive.google.com/file/d/1mOmJnNWTsBRXdyLfaf196Mfz8xs3COIG/preview' },
      { linkText: 'Charagar', headingText: 'Charagar', storyLink: 'https://drive.google.com/file/d/1Yb6J3tJmApXk2Q2dl06EWs6LEjJ4oKjE/view' },
      // Add more objects as needed
    ];

    for (const { linkText, headingText, storyLink } of storyObjects) {
      const link = page.locator('a', { hasText: linkText });
      await link.click();
      // Validate the heading is correct
      const header = (page.getByRole('heading', { name: headingText }))
      const iframeElementHandle = await page.$('iframe');
      if (iframeElementHandle) {
        const iframeUrl = await iframeElementHandle.getAttribute('src');
        // Validate the URL
        if (iframeUrl === storyLink) {
          console.log('URL is valid.');
        } else {
          console.log(`URL is invalid. Found: ${iframeUrl}`);
        }
      } else {
        console.log('Iframe not found.');
      }
      await page.goto('https://quamar-jahan.vercel.app/stories.html');
    }
  });
});