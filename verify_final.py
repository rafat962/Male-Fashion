import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:5173")
        await page.wait_for_timeout(3000)

        # Take home screenshot
        await page.screenshot(path="home_light.png")

        # Toggle dark mode
        # Finding the button with the FiMoon icon (light mode)
        await page.click("button:has(svg)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="home_dark.png")

        # Go to product details
        # We know there's a link to /product/1
        await page.goto("http://localhost:5173/product/1")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="product_details_dark.png")

        # Go to shop
        await page.goto("http://localhost:5173/shop")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="shop_dark.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())

# Run dev server
kill $(lsof -t -i :5173) 2>/dev/null || true
npm run dev > dev_server.log 2>&1 &
sleep 5
python3 verify_final.py
