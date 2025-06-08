import requests
from bs4 import BeautifulSoup

def fetch_wikipedia_summary(domain):
    query = domain.replace(' ', '_')
    url = f'https://en.wikipedia.org/wiki/{query}'

    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            print(f"Wikipedia page not found for {domain} (status {response.status_code})")
            print(url)
            return ""

        soup = BeautifulSoup(response.text, 'html.parser')

        content = []
        for p in soup.select('div.mw-parser-output > p'):
            text = p.get_text(strip=True)
            if text:
                content.append(text)
            if len(content) >= 5:
                break

        return ' '.join(content)
    except Exception as e:
        print(f"Error fetching Wikipedia content: {e}")
        return ""
