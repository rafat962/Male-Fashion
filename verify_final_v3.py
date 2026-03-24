import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:5173/")
        await page.wait_for_timeout(3000)

        # Take initial screenshot
        await page.screenshot(path="01_home_light.png")
        print("Initial Home Screenshot taken.")

        # Locate the Theme Toggle.
        # In the right-side icons group, it's the first IconButton with react-icons (FiMoon/FiSun)
        # MUI Icons usually have 'MuiSvgIcon-root' class. Fi icons don't.
        # Let's look for a button that contains an svg WITHOUT 'MuiSvgIcon-root'
        theme_btn = page.locator("button >> svg:not(.MuiSvgIcon-root)").first
        await theme_btn.click()
        await page.wait_for_timeout(1000)

        is_dark = await page.evaluate("document.documentElement.classList.contains('dark')")
        print(f"Is dark mode active after click? {is_dark}")

        if is_dark:
            await page.screenshot(path="02_home_dark.png")

            # Navigate to product details
            await page.locator("a[href^='/product/']").first.click()
            await page.wait_for_timeout(2000)
            await page.screenshot(path="03_product_details_dark.png")

            # Navigate to Shop
            await page.goto("http://localhost:5173/shop")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="04_shop_dark.png")

            # Navigate to Cart
            await page.goto("http://localhost:5173/cart")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="05_cart_dark.png")
        else:
            print("FAILED to toggle dark mode.")
            # Let's try to find it by icon color if it failed
            print("Retrying with a different selector...")
            await page.click("button:has(.FiMoon), button:has(.FiSun)")
            await page.wait_for_timeout(1000)
            is_dark_retry = await page.evaluate("document.documentElement.classList.contains('dark')")
            print(f"Retry - Is dark mode active? {is_dark_retry}")
            if is_dark_retry:
                await page.screenshot(path="02_home_dark_retry.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
