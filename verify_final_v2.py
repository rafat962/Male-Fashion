import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # 1. Check Product Details Navigation
        print("1. Checking Product Details Navigation...")
        await page.goto("http://localhost:5173/")
        await page.wait_for_timeout(3000)

        # Click on the first product link
        product_link = page.locator("a[href^='/product/']").first
        await product_link.click()
        await page.wait_for_timeout(2000)
        print(f"Current URL after clicking: {page.url}")
        assert "/product/" in page.url

        # 2. Check Dark Mode
        print("2. Checking Dark Mode...")
        # Check if currently light mode
        is_dark_initial = await page.evaluate("document.documentElement.classList.contains('dark')")
        print(f"Initial Dark Mode: {is_dark_initial}")

        # Click theme toggle in Navbar
        # Theme button is usually after or before search icons.
        # It's an IconButton with FiSun or FiMoon.
        theme_btn = page.locator("button.dark\\:text-white, button:has(svg.text-dark), button:has(svg.text-white)").first
        await theme_btn.click()
        await page.wait_for_timeout(1000)

        is_dark_after = await page.evaluate("document.documentElement.classList.contains('dark')")
        print(f"Dark Mode After Click: {is_dark_after}")

        # Capture Screenshots
        print("3. Capturing Screenshots...")
        await page.screenshot(path="product_details_final.png")

        await page.goto("http://localhost:5173/shop")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="shop_final.png")

        await page.goto("http://localhost:5173/cart")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="cart_final.png")

        print("Verification complete.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
