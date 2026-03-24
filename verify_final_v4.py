import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:5173/")
        await page.wait_for_timeout(3000)

        # Log all buttons for debugging
        buttons = await page.query_selector_all("button")
        print(f"Total buttons found: {len(buttons)}")

        # Screenshot to manually inspect if needed
        await page.screenshot(path="00_debug_home.png")

        # The theme toggle is the first button in the right-side icons group.
        # It's an IconButton, so it likely has 'MuiButtonBase-root' class if it's from MUI.
        # But wait, FiSun and FiMoon are react-icons.
        # Let's try to find it by icon name if possible or by position.
        # It's after the mobile menu button (if exists) and logo.
        # Right icons: Search, Wishlist, Cart.
        # My implementation: Account, ThemeToggle, Search, Wishlist, Cart.

        # Let's try clicking the first icon button that doesn't have a specific text.
        icon_buttons = await page.query_selector_all("button.MuiButtonBase-root")
        print(f"MUI icon buttons: {len(icon_buttons)}")

        # Alternatively, find the button that contains a 'svg' and click it.
        # The 1st one might be mobile menu. The 2nd one might be account.
        # The 3rd one should be theme.

        # Let's try to click the one that contains an SVG but NO Mui icons.
        # FiSun / FiMoon icons usually have 'feather' class or similar if exported as such,
        # but react-icons usually just render plain SVGs.

        # Try to find button with svg and click it
        for i, btn in enumerate(buttons):
            has_svg = await btn.query_selector("svg")
            if has_svg:
                print(f"Button {i} has SVG.")
                # We expect it to be around index 1 or 2 in desktop view
                if i == 1: # Let's try this
                    await btn.click()
                    await page.wait_for_timeout(1000)
                    is_dark = await page.evaluate("document.documentElement.classList.contains('dark')")
                    print(f"Clicking Button {i} - Dark Mode: {is_dark}")
                    if is_dark: break
                    # If not dark, toggle back and try next
                    # await btn.click() # toggle back

        is_dark = await page.evaluate("document.documentElement.classList.contains('dark')")
        if is_dark:
            print("Successfully entered DARK mode.")
            await page.screenshot(path="01_home_dark.png")
            # Click a product
            await page.click("a[href^='/product/'] >> nth=0")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="02_product_details_dark.png")
        else:
            print("FAILED to enter dark mode.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
