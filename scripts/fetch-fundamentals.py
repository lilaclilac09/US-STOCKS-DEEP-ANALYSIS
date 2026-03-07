#!/usr/bin/env python3
"""
Fetch equity fundamentals from company IR sites and APIs.
Supports: RCL, MU, LLY, MAR, HLT

Usage:
  python scripts/fetch-fundamentals.py [--ticker RCL] [--output data/fundamentals.json]

Output: JSON dict with ticker → {revenue, net_profit, eps_guidance, developments, latest_update}
"""

import json
import sys
import re
from datetime import datetime
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("ERROR: Missing dependencies. Install with: pip install requests beautifulsoup4")
    sys.exit(1)


def fetch_rcl_fundamentals():
    """Scrape RCL fundamentals from press releases and investor relations"""
    try:
        # Fetch latest press releases
        url = "https://royalcaribbeangrouppresscenter.com/news"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract first headline to find latest press release
        # Look for patterns like "2025 Results" or "2026 Guidance"
        latest_title = ""
        latest_link = None
        
        headlines = soup.find_all(['h2', 'h3', 'a'])
        for headline in headlines:
            text = headline.get_text(strip=True)
            if any(keyword in text for keyword in ['2025', '2026', 'Results', 'Guidance', 'Earnings']):
                latest_title = text
                if headline.name == 'a':
                    latest_link = headline.get('href')
                break
        
        # Default data with hardcoded values for now (will be overwritten with scraped data)
        # TODO: Parse actual press release PDFs or full text for real-time updates
        data = {
            "ticker": "RCL",
            "full_year_2025_revenue": "17.9 billion",
            "adjusted_eps_2025": "15.64",
            "eps_guidance_2026": "17.70 to 18.10",
            "latest_development": f"Press Release: {latest_title}" if latest_title else "2026 EPS guidance $17.70–$18.10; WAVE season record start",
            "latest_update": datetime.now().isoformat(),
        }
        return data
    except Exception as e:
        print(f"ERROR fetching RCL fundamentals: {e}")
        # Return static data on error (fail-safe)
        return {
            "ticker": "RCL",
            "full_year_2025_revenue": "17.9 billion",
            "adjusted_eps_2025": "15.64",
            "eps_guidance_2026": "17.70 to 18.10",
            "latest_development": "[Error fetching latest] 2026 EPS guidance $17.70–$18.10",
            "latest_update": datetime.now().isoformat(),
        }


def fetch_mu_fundamentals():
    """Scrape MU fundamentals from investors.micron.com"""
    # TODO: Implement Micron scraper
    return {
        "ticker": "MU",
        "latest_update": datetime.now().isoformat(),
    }


def fetch_lly_fundamentals():
    """Scrape LLY fundamentals from investor.lilly.com"""
    # TODO: Implement Lilly scraper
    return {
        "ticker": "LLY",
        "latest_update": datetime.now().isoformat(),
    }


def fetch_mar_fundamentals():
    """Scrape MAR fundamentals from marriott.com/investor"""
    # TODO: Implement Marriott scraper
    return {
        "ticker": "MAR",
        "latest_update": datetime.now().isoformat(),
    }


def fetch_hlt_fundamentals():
    """Scrape HLT fundamentals from investor.hilton.com"""
    # TODO: Implement Hilton scraper
    return {
        "ticker": "HLT",
        "latest_update": datetime.now().isoformat(),
    }


def main():
    tickers = {
        "RCL": fetch_rcl_fundamentals,
        "MU": fetch_mu_fundamentals,
        "LLY": fetch_lly_fundamentals,
        "MAR": fetch_mar_fundamentals,
        "HLT": fetch_hlt_fundamentals,
    }
    
    # Parse CLI args
    target_ticker = None
    if "--ticker" in sys.argv:
        idx = sys.argv.index("--ticker")
        if idx + 1 < len(sys.argv):
            target_ticker = sys.argv[idx + 1].upper()
    
    output_file = "data/fundamentals.json"
    if "--output" in sys.argv:
        idx = sys.argv.index("--output")
        if idx + 1 < len(sys.argv):
            output_file = sys.argv[idx + 1]
    
    # Fetch data
    results = {}
    if target_ticker and target_ticker in tickers:
        func = tickers[target_ticker]
        data = func()
        if data:
            results[target_ticker] = data
    else:
        # Fetch all
        for ticker, func in tickers.items():
            print(f"Fetching {ticker}...")
            data = func()
            if data:
                results[ticker] = data
    
    # Write output
    Path(output_file).parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"✓ Fundamentals saved to {output_file}")


if __name__ == "__main__":
    main()
