import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle, os

# Load data
with open('train/invented_names.txt', 'r', encoding='utf-8') as f:
    names = [name.lower() for name in f.read().splitlines() if name]

tokenizer = Tokenizer(char_level=True)
tokenizer.fit_on_texts(names)

sequences = []
for name in names:
    encoded = tokenizer.texts_to_sequences([name])[0]
    for i in range(1, len(encoded)):
        seq = encoded[:i+1]
        sequences.append(seq)

max_len = max(len(s) for s in sequences)
sequences = pad_sequences(sequences, maxlen=max_len, padding='pre')

X = sequences[:, :-1]
y = to_categorical(sequences[:, -1], num_classes=len(tokenizer.word_index)+1)

model = Sequential([
    Embedding(input_dim=len(tokenizer.word_index)+1, output_dim=32, input_length=max_len-1),
    LSTM(128),
    Dense(len(tokenizer.word_index)+1, activation='softmax')
])

model.compile(loss='categorical_crossentropy', optimizer='adam')
model.fit(X, y, epochs=30, batch_size=128)

# Save model and tokenizer
model_dir = os.path.join(os.path.dirname(__file__), '..', 'app', 'model')
os.makedirs(model_dir, exist_ok=True)

model.save(os.path.join(model_dir, 'char_lstm.keras'))
with open(os.path.join(model_dir, 'char_tokenizer.pkl'), 'wb') as f:
    pickle.dump(tokenizer, f)
