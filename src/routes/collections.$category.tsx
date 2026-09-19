import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ProductCard } from "@/components/site/product-card";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import {
  categories,
  getCategory,
  products,
  type Product,
} from "@/data/catalogue";

export const Route = createFileRoute("/collections/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Collection unavailable | AVISHEKK NAIYA" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.category.plural} | AVISHEKK NAIYA`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollectionPage,
});

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "bestselling", label: "Best Selling" },
] as const;

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function CollectionPage() {
  const { category } = Route.useLoaderData();
  const categoryProducts = useMemo(
    () => products.filter((product) => product.category === category.slug),
    [category.slug],
  );

  const [tab, setTab] = useState(category.tabs[0]);
  const [query, setQuery] = useState("");
  const [fabric, setFabric] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("featured");

  const fabrics = ["All", ...unique(categoryProducts.map((p) => p.fabric))];
  const occasions = ["All", ...unique(categoryProducts.map((p) => p.occasion))];

  const visible = useMemo(() => {
    const isAllTab = tab === category.tabs[0];
    const list = categoryProducts.filter((product: Product) => {
      const matchesTab = isAllTab || product.tab === tab;
      const matchesFabric = fabric === "All" || product.fabric === fabric;
      const matchesOccasion = occasion === "All" || product.occasion === occasion;
      const matchesQuery =
        query.trim() === "" ||
        `${product.name} ${product.description} ${product.fabric} ${product.color}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
      return matchesTab && matchesFabric && matchesOccasion && matchesQuery;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "bestselling") sorted.sort((a, b) => b.sales - a.sales);
    if (sort === "featured") sorted.sort((a, b) => a.featured - b.featured);
    return sorted;
  }, [categoryProducts, category.tabs, tab, fabric, occasion, query, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-3 sm:pt-5 lg:px-14">
        <div className="mb-3 flex flex-col gap-3 sm:mb-5 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <nav aria-label="Breadcrumb" className="mb-0.5 flex items-center gap-2 text-[11px] text-muted-foreground sm:mb-2 sm:text-xs">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>›</span>
              <span>{category.plural}</span>
            </nav>
            <h1 className="font-display text-2xl leading-none sm:text-4xl lg:text-5xl">{category.plural}</h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-base">{category.description}</p>
          </div>
          <label className="flex h-9 w-full items-center gap-3 rounded-md border border-input bg-background px-3 text-muted-foreground sm:h-12 sm:px-4 lg:w-[330px]">
            <Search aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only">Search {category.plural}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${category.plural.toLowerCase()}...`}
              className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
            />
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-border pb-2" role="tablist" aria-label={`${category.name} sub collections`}>
          {category.tabs.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`whitespace-nowrap rounded-sm border px-3 py-1.5 text-[11px] transition-colors sm:text-xs ${
                tab === item
                  ? "border-gold bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
          <FilterSelect label="Fabric" value={fabric} onChange={setFabric} options={fabrics} />
          <FilterSelect label="Occasion" value={occasion} onChange={setOccasion} options={occasions} />
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <p className="text-[11px] text-muted-foreground sm:text-xs">
              {visible.length} {visible.length === 1 ? "product" : "products"}
            </p>
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
              <span>Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as typeof sort)}
                className="h-8 rounded-sm border border-input bg-background px-2 text-[11px] text-foreground outline-none sm:text-xs"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {visible.length > 0 ? (
          <section aria-label={`${category.plural} products`} className="mt-4 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </section>
        ) : (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No {category.plural.toLowerCase()} match these filters yet.
          </p>
        )}

        <section aria-label="Other collections" className="mt-12 border-t border-border pt-5">
          <h2 className="font-display text-xl sm:text-2xl">Explore other collections</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories
              .filter((item) => item.slug !== category.slug)
              .map((item) => (
                <Button key={item.slug} asChild variant="outline" size="sm" className="text-xs">
                  <Link to="/collections/$category" params={{ category: item.slug }}>{item.plural}</Link>
                </Button>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 rounded-sm border border-input bg-background px-2 text-[11px] text-foreground outline-none sm:text-xs"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
