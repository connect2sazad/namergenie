import spacy
from collections import Counter
import re

nlp = spacy.load('en_core_web_sm')

def extract_keywords(text, top_n=15):
    doc = nlp(text.lower())
    candidate_words = [token.text for token in doc 
                       if token.pos_ in ('NOUN', 'PROPN') and len(token.text) > 2]

    freq = Counter(candidate_words)
    stopwords = set(['company', 'business', 'industry', 'service', 'product', 'group'])

    filtered = [word for word, count in freq.most_common(top_n) if word not in stopwords]

    return filtered

def generate_prefixes(keywords):
    prefixes = []
    for kw in keywords:
        prefix = kw[:5].capitalize()
        prefix = re.sub(r'[^A-Za-z]', '', prefix)
        if len(prefix) >= 3 and prefix not in prefixes:
            prefixes.append(prefix)
    return prefixes

def generate_suffixes(keywords):
    # Dynamically generate suffixes by filtering keywords that "sound" suffix-like or are popular suffix words
    suffixes = []

    # Heuristic: suffix candidates are keywords with length 3-8
    for kw in keywords:
        clean_kw = re.sub(r'[^A-Za-z]', '', kw).capitalize()
        if 3 <= len(clean_kw) <= 8 and clean_kw not in suffixes:
            suffixes.append(clean_kw)

    # Add fallback common suffixes
    common_suffixes = ['Labs', 'Tech', 'Solutions', 'Systems', 'Core', 'Works', 'Group', 'Dynamics', 'Ventures', 'Institute']
    for cs in common_suffixes:
        if cs not in suffixes:
            suffixes.append(cs)

    return suffixes

# Dynamic suffix generation based on idea and keywords
def generate_dynamic_suffixes(keywords, idea):
    keywords_lower = [k.lower() for k in keywords]
    idea_lower = idea.lower()

    # Step 1: Pick keywords containing parts of the idea
    candidates = [kw.capitalize() for kw in keywords_lower if any(term in kw for term in idea_lower.split())]

    # Step 2: Filter by suffix-like endings (optional)
    suffix_like_endings = ['ic', 'al', 'er', 'ics', 'us', 'ex', 'is', 'os', 'ix', 'us']
    filtered = []
    for c in candidates:
        if any(c.lower().endswith(end) for end in suffix_like_endings):
            filtered.append(c)

    # Step 3: If empty, fallback to first few keywords
    if not filtered:
        filtered = [kw.capitalize() for kw in keywords_lower[:5]]

    # Step 4: Add common business suffixes if not already in list
    common_suffixes = ['Labs', 'Tech', 'Solutions', 'Systems', 'Core', 'Works', 'Group', 'Ventures', 'Dynamics', 'Institute']
    for cs in common_suffixes:
        if cs not in filtered:
            filtered.append(cs)

    return filtered


UNIVERSAL_SUFFIXES = [
    'Labs', 'Tech', 'Solutions', 'Systems', 'Works', 'Dynamics', 'Networks', 'Soft', 'Logic', 'Digital', 
    'Cloud', 'Analytics', 'AI', 'Data', 'Innovations', 'Ventures', 'Studios', 'Hub',
    'Group', 'Enterprises', 'Corporation', 'Holdings', 'Partners', 'Associates', 'Consulting', 'Services',
    'Designs', 'Creative', 'Media', 'Studios', 'Factory', 'Collective',
    'Solutions', 'Systems', 'Gear', 'Works', 'Technologies', 'Concepts', 'Ideas',
    'Next', 'Future', 'Prime', 'Edge', 'Pulse', 'Quest', 'Spark',
    'Co', 'Inc', 'HQ', 'Labs', 'Forge', 'Nest', 'Point', 'Zone', 'Hive', 'Base', 'Core', 'Loop', 'Shift',
    'Advisors', 'Consulting', 'Partners', 'Associates', 'Experts', 'Strategies',
    'International', 'Global', 'Universal', 'Worldwide', 'Network', 'Solutions',
]