# Curated Collections

STOP and inspect the CURRENT repository before making any further changes.

Repository:

https://github.com/Harsh02032002/avishekk-naiya-collections.git

The previous implementation did NOT follow my requested project correctly.

IMPORTANT:

This is NOT a request to create a new e-commerce website.

This is NOT a request to redesign the project.

Do NOT invent a new UI, new homepage, new product catalogue, or unrelated pages.

I need you to work from the ORIGINAL repository structure and preserve the existing project.

FIRST:

1. Inspect the entire existing repository.

2. Identify the original:

   - Home/Catalogue page

   - Header/Navbar

   - Footer

   - Product cards

   - Product data

   - Existing routes

   - Existing styling/theme

   - Existing components

3. Identify what the previous Lovable run added.

4. Separate the correct existing code from the incorrect/temporary code.

DO NOT delete the original working design.

MY REQUIRED TASK:

I already have the AVISHEKK NAIYA catalogue/home design.

The category cards are:

Kurta

Dhoti

Saree

Blouse

Sherwani

Veil

Juti

Angavastram

When the user clicks a category card, it should open that category's Product Listing page.

Required flow:

Home/Catalogue

↓

Click Kurta

↓

Kurta Product Listing

↓

Click Product

↓

Product Detail

And the same for all categories.

CATEGORY ROUTES:

/collections/kurta

/collections/dhoti

/collections/saree

/collections/blouse

/collections/sherwani

/collections/veil

/collections/juti

/collections/angavastram

If the existing repository already has a routing convention, USE THAT convention instead of blindly creating these exact routes.

PRODUCT LISTING:

Create ONE reusable Product Listing page/component.

Do NOT create 8 separate duplicated pages.

The page should receive the category dynamically and display:

- Category title

- Category description

- Search

- Category/subcategory tabs if supported by existing data

- Filters

- Product count

- Sort

- Product grid

- Existing ProductCard

Only products belonging to the selected category should appear.

DATA:

Use the existing repository product/catalogue data.

Do NOT create random unrelated mock products.

If the repository already has API/data structures, reuse them.

If product data does not contain category information, add the minimum required category mapping without destroying the existing data.

DESIGN:

The existing AVISHEKK NAIYA design is the source of truth.

Preserve:

- Existing black header

- Existing logo

- Existing typography

- Existing colors

- Existing spacing

- Existing borders

- Existing buttons

- Existing card styling

- Existing premium Indian luxury aesthetic

DO NOT redesign the Home/Catalogue page.

DO NOT change the existing visual language just to make the new page look different.

PRODUCT IMAGES:

Use portrait product images approximately 3:4 or 4:5.

The complete garment/product should be visible.

Do not aggressively crop the clothing.

Do not stretch or distort images.

PRODUCT DETAIL:

If a Product Detail page already exists in the repository, reuse it.

If it does not exist, create only the minimum Product Detail page needed so that:

Product Listing → Product Detail

works correctly.

Do NOT create duplicate product-detail logic.

CLEANUP:

The previous Lovable run created incomplete/incorrect work.

Remove or correct only the incorrect implementation.

Do NOT remove original working code.

Fix:

- broken imports

- broken routes

- temporary route errors

- incorrect links

- duplicate components

- unused temporary pages

FINAL TEST:

Test the actual navigation:

Home

→ Kurta

→ Kurta products

→ Product Detail

Home

→ Dhoti

→ Dhoti products

Home

→ Saree

→ Saree products

Home

→ Blouse

→ Blouse products

Home

→ Sherwani

→ Sherwani products

Home

→ Veil

→ Veil products

Home

→ Juti

→ Juti products

Home

→ Angavastram

→ Angavastram products

IMPORTANT:

Do not spend credits redesigning the website.

Priority order:

1. Preserve original repository

2. Correct routing

3. Category filtering

4. Reuse existing components/data

5. Product listing

6. Product detail navigation

7. Fix errors

8. Test complete flow

Do not generate unrelated features.

Do not replace the original design.

Do not start from scratch.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/82ab855c-6699-4bd9-a452-13e725952fc4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
