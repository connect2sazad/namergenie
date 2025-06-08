import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle, os

with open('train/descriptive_phrases.txt', 'r', encoding='utf-8') as f:
    phrases = [line.lower() for line in f.read().splitlines() if line]

tokenizer = Tokenizer()
tokenizer.fit_on_texts(phrases)

sequences = []
for line in phrases:
    tokens = tokenizer.texts_to_sequences([line])[0]
    for i in range(1, len(tokens)):
        sequences.append(tokens[:i+1])

max_len = max(len(s) for s in sequences)
sequences = pad_sequences(sequences, maxlen=max_len, padding='pre')

X = sequences[:, :-1]
y = sequences[:, -1]

vocab_size = len(tokenizer.word_index) + 1

model = Sequential([
    Embedding(input_dim=vocab_size, output_dim=64, input_length=max_len-1),
    LSTM(128),
    Dense(vocab_size, activation='softmax')
])
model.compile(loss='sparse_categorical_crossentropy', optimizer='adam')
model.fit(X, y, epochs=25, batch_size=128)

model_dir = os.path.join(os.path.dirname(__file__), '..', 'app', 'model')
os.makedirs(model_dir, exist_ok=True)
model.save(os.path.join(model_dir, 'word_lstm.keras'))
with open(os.path.join(model_dir, 'word_tokenizer.pkl'), 'wb') as f:
    pickle.dump(tokenizer, f)
