import { test, expect } from '@playwright/test';
import { TEST_EMAIL, createTestUser, deleteTestUser, prisma } from './utils';

const tests = () => {

  test('create user', async ({ page }) => {
    const beforeUsers = await prisma.user.count();
    await page.goto(`${process.env.BASE_URL}/admin/user`);
    await page.getByRole('button', { name: 'Add' }).click();
    await page.waitForURL(`${process.env.BASE_URL}/admin/user/new`);
    await page.fill('input[id="email"]', TEST_EMAIL);
    await page.click('button:has-text("Submit")');
    await page.waitForURL(`${process.env.BASE_URL}/admin/user/*`);
    const afterUsers = await prisma.user.count();
    const oneMoreUser = afterUsers === beforeUsers + 1;
    expect(oneMoreUser).toBeTruthy();
    await deleteTestUser();
  });

  test('read user', async ({ page }) => {
    const userId = await createTestUser();
    await page.goto(`${process.env.BASE_URL}/admin/user/${userId}`);
    const name = await page.inputValue('input[id="name"]');
    expect(name).toBe("test");
    await deleteTestUser();
  });

  test('update user', async ({ page }) => {
    const userId = await createTestUser();
    await page.goto(`${process.env.BASE_URL}/admin/user/${userId}`);
    await page.fill('input[id="name"]', 'test2');
    await page.click('button:has-text("Submit")');
    await page.waitForURL(`${process.env.BASE_URL}/admin/user/*`);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    expect(user?.name).toBe('test2');
    await deleteTestUser();
  });

  test('delete user', async ({ page }) => {
    page.on('dialog', async dialog => dialog.accept());

    const userId = await createTestUser();
    const beforeUsers = await prisma.user.count();
    await page.goto(`${process.env.BASE_URL}/admin/user/${userId}`);
    await page.click('button:has-text("Delete")');
    await page.waitForURL(`${process.env.BASE_URL}/admin/user`);
    const afterDeleteUsers = await prisma.user.count();
    const oneLessUser = afterDeleteUsers === beforeUsers - 1;
    expect(oneLessUser).toBeTruthy();
    if(!oneLessUser) {
      await deleteTestUser();
    }
  });

}

export default tests;
