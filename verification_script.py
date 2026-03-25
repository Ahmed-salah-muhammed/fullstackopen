import asyncio
from playwright.async_api import async_playwright
import time

async def run_verification():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Mock the API to avoid real network requests
        await page.route("https://fakestoreapi.com/products", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='[{"id": 1, "title": "Test Product", "price": 109.95, "category": "men\'s clothing", "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800", "rating": {"rate": 4.5, "count": 120}}]'
        ))

        try:
            print("Going to Homepage...")
            await page.goto("http://localhost:5174/", wait_until="networkidle")
            await page.screenshot(path="01_home_v2.png", full_page=True)
            print("Homepage screenshot saved.")

            print("Testing Search...")
            search_input = page.get_by_placeholder("Search pieces...")
            await search_input.click()
            await search_input.fill("Test")
            await asyncio.sleep(1) # Wait for live search dropdown
            await page.screenshot(path="02_search_v2.png")
            print("Search screenshot saved.")

            print("Going to Shop...")
            await page.goto("http://localhost:5174/shop", wait_until="networkidle")
            await page.screenshot(path="03_shop_v2.png", full_page=True)
            print("Shop screenshot saved.")

            print("Going to Cart...")
            await page.goto("http://localhost:5174/cart", wait_until="networkidle")
            await page.screenshot(path="04_cart_v2.png", full_page=True)
            print("Cart screenshot saved.")

            print("Going to Profile (Login Redirect)...")
            await page.goto("http://localhost:5174/profile", wait_until="networkidle")
            await page.screenshot(path="05_login_redirect_v2.png", full_page=True)
            print("Login redirect screenshot saved.")

        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verification())
