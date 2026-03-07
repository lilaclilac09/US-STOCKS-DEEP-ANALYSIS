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
    """Generate Markdown files for cislunar companies (placeholder)"""
    # TODO: Implement cislunar Markdown generation once data structure is finalized
    print("(Cislunar Markdown generation - TODO)")


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
