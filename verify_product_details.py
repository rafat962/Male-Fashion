import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to home
        print("Navigating to home page...")
        await page.goto("http://localhost:5173")
        await page.wait_for_timeout(2000)

        # 1. Click on a product in HomePage (ProductTabs)
        print("Clicking a product on HomePage...")
        # Link in ProductCard: <Link to={`/product/${product.id}`} ...>
        first_product_link = page.locator("a[href^='/product/']").first
        product_name_on_home = await first_product_link.inner_text()
        print(f"Product found: {product_name_on_home}")

        await first_product_link.click()
        await page.wait_for_timeout(2000)

        # Verify URL and Name on Details Page
        print(f"Current URL: {page.url}")
        assert "/product/" in page.url

        details_name = await page.locator("h1").inner_text()
        print(f"Product name on details page: {details_name}")

        # 2. Test Dark Mode on Details Page
        print("Testing Dark Mode toggle on Details Page...")
        # Toggle button is in Navbar
        toggle_btn = page.locator("button.dark\\:text-white").first
        await toggle_btn.click()
        await page.wait_for_timeout(1000)

        is_dark = await page.evaluate("document.documentElement.classList.contains('dark')")
        print(f"Is dark mode active? {is_dark}")

        # Screenshot
        await page.screenshot(path="product_details_dark.png")
        print("Screenshot saved to product_details_dark.png")

        # 3. Navigate to Shop and check
        print("Navigating to Shop Page...")
        await page.locator("a[href='/shop']").first.click()
        await page.wait_for_timeout(2000)

        print(f"Current URL: {page.url}")
        assert "/shop" in page.url

        # Click a product in Shop
        shop_product_link = page.locator("a[href^='/product/']").first
        await shop_product_link.click()
        await page.wait_for_timeout(1000)
        assert "/product/" in page.url
        print("Successfully navigated from Shop to Product Details.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
