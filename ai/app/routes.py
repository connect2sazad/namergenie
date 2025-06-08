from flask import Blueprint, request, jsonify
import os, numpy as np, random, pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from app.utils.fetch_wikipedia_content import fetch_wikipedia_summary
from app.utils.extract_keywords import UNIVERSAL_SUFFIXES, extract_keywords, generate_dynamic_suffixes, generate_prefixes, generate_suffixes

bp = Blueprint('routes', __name__)

# Paths setup
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_dir = os.path.join(base_dir, 'app', 'model')
char_model_path = os.path.join(model_dir, 'char_lstm.keras')
char_tokenizer_path = os.path.join(model_dir, 'char_tokenizer.pkl')

# Load model and tokenizer
char_model = load_model(char_model_path)
with open(char_tokenizer_path, 'rb') as f:
    char_tokenizer = pickle.load(f)

# Reverse char index for generation
char_index_to_char = {v: k for k, v in char_tokenizer.word_index.items()}
char_maxlen = char_model.input_shape[1]

def sample(preds, temperature=1.0):
    preds = np.asarray(preds).astype('float64')
    preds = np.log(preds + 1e-9) / temperature
    exp_preds = np.exp(preds)
    preds = exp_preds / np.sum(exp_preds)
    return np.random.choice(len(preds), p=preds)

def is_pronounceable(word):
    vowels = 'aeiou'
    consonants = 'bcdfghjklmnpqrstvwxyz'
    count_consecutive_cons = 0
    for ch in word.lower():
        if ch in consonants:
            count_consecutive_cons += 1
            if count_consecutive_cons > 3:
                return False
        else:
            count_consecutive_cons = 0
    return 3 <= len(word) <= 8

def generate_invented_prefix(length=5, temperature=0.7):
    generated = ''
    for _ in range(length):
        seq = char_tokenizer.texts_to_sequences([generated])[-1] if generated else []
        padded = pad_sequences([seq], maxlen=char_maxlen - 1, padding='pre')
        preds = char_model.predict(padded, verbose=0)[0]
        next_index = sample(preds, temperature)
        next_char = char_index_to_char.get(next_index, '')
        if next_char == '' or not next_char.isalpha():
            break
        generated += next_char
    generated = generated.capitalize()
    return generated if is_pronounceable(generated) else generate_invented_prefix(length, temperature)

def get_live_data_for_domain(domain):
    summary = fetch_wikipedia_summary(domain)
    if not summary:
        print("No Wikipedia summary found.")
        return [], [], []

    keywords = extract_keywords(summary)
    print(f"Extracted keywords: {keywords}")

    prefixes = generate_prefixes(keywords)
    suffixes = generate_suffixes(keywords)
    print(f"Suffixes after generate_suffixes: {suffixes}")

    if not suffixes:
        suffixes = generate_dynamic_suffixes(keywords, domain)
        print(f"Suffixes after generate_dynamic_suffixes: {suffixes}")

    if not suffixes:
        suffixes = UNIVERSAL_SUFFIXES
        print(f"Suffixes fallback to UNIVERSAL_SUFFIXES: {suffixes}")

    return keywords, prefixes, suffixes




@bp.route('/generate-names', methods=['POST'])
def generate_names_api():
    data = request.get_json()
    idea = data.get('idea', '').strip().lower()
    count = int(data.get('count', 5))
    count = max(1, min(count, 20))

    if not idea:
        return jsonify({'error': 'Missing "idea" parameter'}), 400

    keywords, prefixes, suffixes = get_live_data_for_domain(idea)

    if not suffixes:
        suffixes = UNIVERSAL_SUFFIXES
        print(f"Using UNIVERSAL_SUFFIXES fallback for idea: {idea}")

    generated_names = set()
    tries = 0
    max_tries = count * 5

    while len(generated_names) < count and tries < max_tries:
        prefix = generate_invented_prefix(random.randint(4, 7), temperature=0.7)
        suffix = random.choice(suffixes)
        name = f"{prefix} {suffix}"
        if name not in generated_names:
            generated_names.add(name)
        tries += 1

    return jsonify({'suggested_names': list(generated_names)})
