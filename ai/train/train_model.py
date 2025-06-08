import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression  # Replace with LSTM later maybe

# Sample training data
data = {
    'idea': [
        "online grocery delivery",
        "AI health diagnosis",
        "pet grooming services",
        "eco-friendly packaging",
        "digital marketing agency"
    ],
    'names': [
        "GrocFly",
        "MediMind",
        "FluffyCare",
        "GreenWrap",
        "DigiBlitz"
    ]
}

df = pd.DataFrame(data)

# TF-IDF Vectorizer
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['idea'])

# Dummy regressor (for now)
model = LogisticRegression()
model.fit(X, df['names'])  # We'll treat names as labels (for now)

# Save both
with open('app/model/model.pkl', 'wb') as f:
    pickle.dump((vectorizer, model), f)

print("✅ Model trained and saved.")
