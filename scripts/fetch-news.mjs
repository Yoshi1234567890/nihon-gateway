import fs from "node:fs/promises";

const sources = [
  {
    country: "germany",
    country_ja: "ドイツ",
    city: "nationwide",
    city_ja: "全国",
    category: "life",
    category_ja: "生活",
    importance: "normal",
    importance_ja: "通常",
    source_type: "media",
    source_name: "Deutsche Welle",
    rss_url: "https://rss.dw.com/xml/rss-en-ger"
  }
];

async function main() {
  const items = [];

  for (const source of sources) {
    const response = await fetch(source.rss_url);
    const xml = await response.text();

    const parsedItems = parseRssItems(xml).slice(0, 10);

    for (const item of parsedItems) {
      items.push({
        id: createId(source.source_name, item.link),
        country: source.country,
        country_ja: source.country_ja,
        city: source.city,
        city_ja: source.city_ja,
        category: source.category,
        category_ja: source.category_ja,
        topic: "general",
        topic_ja: "一般",
        importance: source.importance,
        importance_ja: source.importance_ja,
        source_type: source.source_type,
        source_name: source.source_name,
        title: item.title,
        summary: item.description,
        published_at: item.pubDate,
        url: item.link
      });
    }
  }

  await fs.mkdir("assets/data", { recursive: true });
  await fs.writeFile("assets/data/news.json", JSON.stringify(items, null, 2), "utf8");
}

function parseRssItems(xml) {
  const itemBlocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  return itemBlocks.map(match => {
    const block = match[1];

    return {
      title: cleanXml(getTag(block, "title")),
      link: cleanXml(getTag(block, "link")),
      description: cleanXml(getTag(block, "description")),
      pubDate: cleanXml(getTag(block, "pubDate")).slice(0, 16)
    };
  });
}

function getTag(block, tagName) {
  const match = block.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`));
  return match ? match[1] : "";
}

function cleanXml(value) {
  return String(value || "")
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function createId(sourceName, link) {
  return `${sourceName}-${link}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 80);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
