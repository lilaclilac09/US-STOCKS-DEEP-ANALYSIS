#!/usr/bin/env python3
"""
Fetch cislunar mission updates from NASA CLPS and science.nasa.gov.

Usage:
  python scripts/fetch-cislunar.py [--output data/cislunar.json]

Output: JSON dict with company → {tier, segment, mission_status, notable_awards, target_missions}
"""

import json
import sys
from datetime import datetime
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("ERROR: Missing dependencies. Install with: pip install requests beautifulsoup4")
    sys.exit(1)


def fetch_clps_missions():
    """Scrape NASA CLPS providers page for mission updates"""
    try:
        url = "https://www.nasa.gov/commercial-lunar-payload-services/clps-providers"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        missions = {}
        
        # Extract provider sections (look for company names and mission info)
        sections = soup.find_all(['h2', 'h3', 'p'])
        current_company = None
        
        for section in sections:
            text = section.get_text(strip=True)
            # Identify major providers
            for company in ['Intuitive Machines', 'Firefly Aerospace', 'Axiom Space', 'SpaceX', 'Lockheed Martin']:
                if company.lower() in text.lower():
                    current_company = company
                    if current_company not in missions:
                        missions[current_company] = {
                            'name': company,
                            'tier': 'TBD',
                            'status': 'Active',
                            'latest_info': text[:100]
                        }
                    break
        
        # Default providers if not found in page
        if not missions:
            missions = {
                "Intuitive Machines": {"name": "Intuitive Machines", "tier": "2", "status": "Active", "latest_info": "IM-1, IM-2, IM-3 missions"},
                "Firefly Aerospace": {"name": "Firefly Aerospace", "tier": "2", "status": "Active", "latest_info": "Blue Ghost lunar lander"},
                "Axiom Space": {"name": "Axiom Space", "tier": "3", "status": "Development", "latest_info": "Lunar habitat modules"},
            }
        
        return missions
    except Exception as e:
        print(f"WARNING: CLPS fetch error: {e} (using fallback data)")
        # Return fallback data
        return {
            "Intuitive Machines": {"name": "Intuitive Machines", "tier": "2", "status": "Active"},
            "Firefly Aerospace": {"name": "Firefly Aerospace", "tier": "2", "status": "Active"},
        }


def fetch_nasa_lunar_discoveries():
    """Scrape science.nasa.gov/lunar-discovery/deliveries for specific delivery schedules"""
    try:
        url = "https://science.nasa.gov/lunar-discovery/deliveries/"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        deliveries = {}
        
        # Extract mission cards (look for company names, mission names, dates)
        cards = soup.find_all(['div', 'article'])
        
        for card in cards:
            card_text = card.get_text(strip=True)
            # Parse for mission information
            for company in ['Intuitive Machines', 'Firefly', 'Axiom', 'SpaceX', 'Lockheed', 'Draper']:
                if company.lower() in card_text.lower():
                    # Extract 2026 or other date mentions
                    if '2026' in card_text or '2025' in card_text:
                        mission_id = f"{company.split()[0]}-2026"
                        deliveries[mission_id] = {
                            'company': company,
                            'target_date': '2026',
                            'description': card_text[:150]
                        }
                    break
        
        # Fallback: Known 2026 missions
        if not deliveries:
            deliveries = {
                "IM-3": {
                    "company": "Intuitive Machines",
                    "target_date": "2026",
                    "site": "Reiner Gamma",
                    "description": "Polar region lunar delivery"
                },
                "Firefly-BG2": {
                    "company": "Firefly Aerospace",
                    "target_date": "2026",
                    "site": "Far-side",
                    "description": "Blue Ghost 2 far-side mission"
                },
                "Draper-SB": {
                    "company": "Draper",
                    "target_date": "2026",
                    "site": "Schrödinger Basin",
                    "description": "Lunar south pole region"
                }
            }
        
        return deliveries
    except Exception as e:
        print(f"WARNING: Lunar deliveries fetch error: {e} (using fallback data)")
        # Return fallback data
        return {
            "IM-3": {"company": "Intuitive Machines", "target_date": "2026", "site": "Reiner Gamma"},
            "Firefly-BG2": {"company": "Firefly Aerospace", "target_date": "2026", "site": "Far-side"},
        }


def main():
    output_file = "data/cislunar.json"
    if "--output" in sys.argv:
        idx = sys.argv.index("--output")
        if idx + 1 < len(sys.argv):
            output_file = sys.argv[idx + 1]
    
    print("Fetching CLPS missions...")
    missions = fetch_clps_missions()
    
    print("Fetching NASA lunar deliveries...")
    deliveries = fetch_nasa_lunar_discoveries()
    
    results = {
        "missions": missions,
        "deliveries": deliveries,
        "last_updated": datetime.now().isoformat(),
    }
    
    # Write output
    Path(output_file).parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"✓ Cislunar data saved to {output_file}")


if __name__ == "__main__":
    main()
