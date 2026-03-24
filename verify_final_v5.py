import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.goto("http://localhost:5173/")
        await page.wait_for_timeout(3000)

        # Take a look at the icons to ensure we click the theme toggle
        # The theme toggle button contains FiSun or FiMoon.
        # Let's try finding the button by class name (IconButton is often .MuiIconButton-root)
        # and it's the 2nd one in the right group on desktop view.

        # Let's try finding it by checking which button has a child icon that isn't a Material Icon
        # Material Icons use 'MuiSvgIcon-root' class.

        icon_buttons = await page.query_selector_all("button:has(svg)")
        print(f"Total icon buttons: {len(icon_buttons)}")

        for i, btn in enumerate(icon_buttons):
            # Only try buttons that are visible
            if await btn.is_visible():
                print(f"Checking visible button {i}")
                # We know the theme toggle uses FiSun or FiMoon from 'react-icons/fi'
                # Fi icons don't typically have the 'Mui' prefix.
                is_mui = await btn.query_selector("svg.MuiSvgIcon-root")
                if not is_mui:
                    print(f"Found non-MUI icon button {i}, likely theme toggle.")
                    await btn.click()
                    await page.wait_for_timeout(1000)
                    is_dark = await page.evaluate("document.documentElement.classList.contains('dark')")
                    print(f"Dark mode active: {is_dark}")
                    if is_dark:
                        break

        is_dark = await page.evaluate("document.documentElement.classList.contains('dark')")
        if is_dark:
            print("Successfully entered DARK mode.")
            await page.screenshot(path="final_home_dark.png")
            # Navigate to product details
            await page.click("a[href^='/product/'] >> nth=0")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="final_product_dark.png")
        else:
            print("FAILED to enter dark mode.")
            await page.screenshot(path="final_failed.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())

# Run server
kill $(lsof -t -i :5173) 2>/dev/null || true
npm run dev > dev_server.log 2>&1 &
sleep 5
python3 verify_final_v5.py
