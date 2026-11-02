import requests, json, datetime

# Greenhouse public API job listings
api = "https://boards-api.greenhouse.io/v1/boards/{company}/jobs"

def fetch(company):
    request = requests.get(api.format(company=company), timeout=10)
    request.raise_for_status()
    return request.json().get("jobs", [])

if __name__ == "__main__":
    company = "airbnb"  # any company that uses Greenhouse
    jobs = fetch(company)
    stamp = datetime.date.today().isoformat()
    with open(f"raw_postings_{company}_{stamp}.json", "w") as f:
        json.dump(jobs, f, indent=2)
    print(f"Saved {len(jobs)} postings from {company}")
    for j in jobs[:5]:
        print("-", j["title"], "|", j.get("location", {}).get("name"))