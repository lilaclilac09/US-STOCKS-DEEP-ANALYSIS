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
        
        # Placeholder: extract providers and their contract/mission status
        # TODO: Parse actual CLPS provider sections for names, missions, awards, timelines
        missions = {}
        return missions
    except Exception as e:
        print(f"ERROR fetching CLPS missions: {e}")
        return {}


def fetch_nasa_lunar_discoveries():
    """Scrape science.nasa.gov/lunar-discovery/deliveries for specific delivery schedules"""
    try:
        url = "https://science.nasa.gov/lunar-discovery/deliveries/"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Placeholder: extract mission schedules (e.g., IM-3 Reiner Gamma 2026, Firefly Blue Ghost 2 2026 far-side)
        # TODO: Parse target dates, company names, mission designations
        deliveries = {}
        return deliveries
    except Exception as e:
        print(f"ERROR fetching lunar deliveries: {e}")
        return {}


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
