#!/usr/bin/env python3
"""
Generate Markdown files from equity/cislunar JSON data.

Usage:
  python scripts/generate-markdown.py [--equities data/companies.json data/fundamentals.json] \\
                                       [--cislunar data/cislunar.json] \\
                                       [--output-dir content/]

Outputs:
  - content/equities/{ticker_lower}.md (one file per equity)
  - content/cislunar/tier{1,2,3}/{company_slug}.md (one file per company)
"""

import json
import sys
from datetime import datetime
from pathlib import Path


EQUITY_TEMPLATE = """---
ticker: {ticker}
name: {name}
updated: {updated}
close_price: {price}
sector: {sector}
revenue: {revenue}
net_profit: {net_profit}
eps_guidance: {eps_guidance}
---

## Business Overview

{description}

## Financial Highlights

* **Revenue**: {revenue}
* **Net Profit**: {net_profit}
* **EPS Guidance (2026)**: {eps_guidance}

## Latest Developments

{developments}

---

*Last updated: {updated}*
"""

CISLUNAR_TEMPLATE = """---
company: {company}
tier: {tier}
segment: {segment}
updated: {updated}
---

## Overview

{description}

## Cislunar Role

{cislunar_role}

## Notable Awards & Contracts

{awards}

## Target Missions

{target_missions}

---

*Last updated: {updated}*
"""


def load_json(file_path):
    """Load JSON file safely"""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"WARNING: File not found: {file_path}")
        return {}
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid JSON in {file_path}: {e}")
        return {}


def generate_equity_markdown(companies_data, fundamentals_data, output_dir):
    """Generate Markdown files for each equity"""
    equities_dir = Path(output_dir) / "equities"
    equities_dir.mkdir(parents=True, exist_ok=True)
    
    companies = companies_data.get("companies", [])
    
    for company in companies:
        ticker = company.get("symbol", "").upper()
        if not ticker:
            continue
        
        fundamentals = fundamentals_data.get(ticker, {})
        
        md_content = EQUITY_TEMPLATE.format(
            ticker=ticker,
            name=company.get("fullName", ""),
            updated=fundamentals.get("latest_update", datetime.now().isoformat()),
            price=company.get("currentPrice", "N/A"),
            sector=company.get("sector", ""),
            revenue=fundamentals.get("full_year_2025_revenue", "N/A"),
            net_profit=fundamentals.get("adjusted_eps_2025", "N/A"),
            eps_guidance=fundamentals.get("eps_guidance_2026", "N/A"),
            description=f"Growth equity in {company.get('sector', 'Unknown')} sector.",
            developments=fundamentals.get("latest_development", "No developments yet."),
        )
        
        file_path = equities_dir / f"{ticker.lower()}.md"
        with open(file_path, 'w') as f:
            f.write(md_content)
        
        print(f"✓ Generated {file_path}")


def generate_cislunar_markdown(cislunar_data, output_dir):
    """Generate Markdown files for cislunar companies and missions"""
    missions = cislunar_data.get("missions", {})
    deliveries = cislunar_data.get("deliveries", {})
    
    # Map tier structure: Tier 1 = major players, Tier 2 = delivery contractors, Tier 3 = emerging
    tier_mapping = {
        "SpaceX": ("tier1", "Launch & Cislunar Transport"),
        "Lockheed Martin": ("tier1", "Spacecraft & Infrastructure"),
        "Intuitive Machines": ("tier2", "Lunar Landers & Delivery"),
        "Firefly Aerospace": ("tier2", "Lunar Landers"),
        "Axiom Space": ("tier3", "Lunar Habitats & Modules"),
        "Draper": ("tier2", "Precision Landing"),
        "Astrobotic": ("tier2", "Lunar Logistics"),
    }
    
    # Generate markdown for each mission/company
    for company, mission_data in missions.items():
        tier_dir, segment = tier_mapping.get(company, ("tier3", "Cislunar Provider"))
        tier_path = Path(output_dir) / "cislunar" / tier_dir
        tier_path.mkdir(parents=True, exist_ok=True)
        
        # Find matching deliveries for this company
        company_deliveries = []
        for delivery_id, delivery_info in deliveries.items():
            if company.lower() in delivery_info.get("company", "").lower():
                company_deliveries.append(f"- {delivery_id}: {delivery_info.get('site', '')} ({delivery_info.get('target_date', 'TBD')})")
        
        deliveries_text = "\n".join(company_deliveries) if company_deliveries else "- Active development for lunar missions"
        
        md_content = CISLUNAR_TEMPLATE.format(
            company=company,
            tier=tier_dir.replace("tier", ""),
            segment=segment,
            updated=cislunar_data.get("last_updated", datetime.now().isoformat()),
            description=f"{company} is a key player in cislunar infrastructure and lunar delivery services.",
            cislunar_role=segment,
            awards=f"- Active CLPS or LDAC provider\n- Status: {mission_data.get('status', 'Active')}",
            target_missions=deliveries_text,
        )
        
        company_slug = company.lower().replace(" ", "-")
        file_path = tier_path / f"{company_slug}.md"
        with open(file_path, 'w') as f:
            f.write(md_content)
        
        print(f"✓ Generated {file_path}")


def main():
    companies_file = "data/companies.json"
    fundamentals_file = "data/fundamentals.json"
    cislunar_file = "data/cislunar.json"
    output_dir = "content"
    
    # Parse CLI args
    if "--equities" in sys.argv:
        idx = sys.argv.index("--equities")
        if idx + 2 < len(sys.argv):
            companies_file = sys.argv[idx + 1]
            fundamentals_file = sys.argv[idx + 2]
    
    if "--cislunar" in sys.argv:
        idx = sys.argv.index("--cislunar")
        if idx + 1 < len(sys.argv):
            cislunar_file = sys.argv[idx + 1]
    
    if "--output-dir" in sys.argv:
        idx = sys.argv.index("--output-dir")
        if idx + 1 < len(sys.argv):
            output_dir = sys.argv[idx + 1]
    
    # Load data
    companies_data = load_json(companies_file)
    fundamentals_data = load_json(fundamentals_file)
    cislunar_data = load_json(cislunar_file)
    
    # Generate Markdown
    print(f"Generating equity Markdown in {output_dir}/...")
    generate_equity_markdown(companies_data, fundamentals_data, output_dir)
    
    print(f"Generating cislunar Markdown in {output_dir}/...")
    generate_cislunar_markdown(cislunar_data, output_dir)
    
    print("✓ Markdown generation complete")


if __name__ == "__main__":
    main()
