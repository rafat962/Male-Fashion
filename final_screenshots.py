import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1280, "height": 800})

        # 1. Product Details Light
        await page.goto("http://localhost:5173/product/1")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="final_details_light.png")
        print("Details Light taken.")

        # 2. Toggle Dark Mode (The 2nd icon button in the right-side icons group)
        # It's an IconButton from MUI wrapping a Fi icon.
        # Let's just use evaluate to click the toggle button by its class/index
        await page.evaluate('''() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const toggle = btns.find(b => b.innerHTML.includes('svg') && !b.querySelector('.MuiSvgIcon-root'));
            if (toggle) toggle.click();
        }''')
        await page.wait_for_timeout(1000)

        # 3. Product Details Dark
        await page.screenshot(path="final_details_dark.png")
        print("Details Dark taken.")

        # 4. Shop Dark
        await page.goto("http://localhost:5173/shop")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="final_shop_dark.png")
        print("Shop Dark taken.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
