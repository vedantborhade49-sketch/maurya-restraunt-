import re
import json
import os

path = r"C:\Users\admin\.gemini\antigravity-ide\brain\25cf42ea-647e-4968-86f1-d83616a5720c\.system_generated\steps\52\content.md"

if not os.path.exists(path):
    print(f"Error: File not found at {path}")
    exit(1)

with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# Let's find all sections
sections = re.split(r'<section\s+id="section-[^"]+"\s+data-section-key="([^"]+)"', html)

menu = {}
if len(sections) > 1:
    for i in range(1, len(sections), 2):
        sec_key = sections[i]
        sec_content = sections[i+1] if i+1 < len(sections) else ""
        category = sec_key.split(":", 1)[1] if ":" in sec_key else sec_key
        category = category.strip()
        
        items = re.split(r'data-catalog-item-id="(\d+)"', sec_content)
        category_items = []
        for j in range(1, len(items), 2):
            item_id = items[j]
            item_html = items[j+1] if j+1 < len(items) else ""
            
            # Extract item details
            name_match = re.search(r'<h4[^>]*>.*?<a[^>]*>(.*?)</a></h4>', item_html, re.DOTALL)
            name = name_match.group(1).strip() if name_match else ""
            name = name.replace('&amp;', '&').replace('&quot;', '"').strip()
            
            price_match = re.search(r'₹(?:<!-- -->)?(\d+)', item_html)
            price = int(price_match.group(1)) if price_match else 0
            
            desc_match = re.search(r'<p[^>]*class="[^"]*text-neutral-400[^"]*"[^>]*>(.*?)</p>', item_html, re.DOTALL)
            desc = ""
            if desc_match:
                desc_text = desc_match.group(1)
                desc_text = re.sub(r'<[^>]+>', '', desc_text)
                desc = desc_text.replace('&amp;', '&').replace('&quot;', '"').replace('... more', '').strip()
            
            # Find all image sources in this item block
            img_matches = re.findall(r'<img\s+src="([^"]+)"', item_html)
            image_url = ""
            for img in img_matches:
                if "hashtagloyalty.com/items" in img:
                    # Replace &amp; with & in image URL
                    image_url = img.replace('&amp;', '&')
                    break
                
            if name:
                category_items.append({
                    "id": item_id,
                    "name": name,
                    "price": price,
                    "description": desc,
                    "image_url": image_url
                })
        
        if category_items:
            menu[category] = category_items

# Write output to json
output_path = "maurya_menu.json"
with open(output_path, "w", encoding="utf-8") as out:
    json.dump(menu, out, indent=2, ensure_ascii=False)

print(f"Successfully extracted menu from {len(menu)} categories with correct image URLs!")
for cat, items in menu.items():
    images_count = sum(1 for item in items if item["image_url"])
    print(f"- {cat}: {len(items)} items ({images_count} with custom images)")
