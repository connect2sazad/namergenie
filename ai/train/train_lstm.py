import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense
from keras.utils import to_categorical
import os

# Load names
with open('train/names.txt', 'r') as f:
    text = f.read().lower()

chars = sorted(list(set(text)))
char_to_idx = {ch: i for i, ch in enumerate(chars)}
idx_to_char = {i: ch for ch, i in char_to_idx.items()}

# Create sequences
seq_length = 10
X, y = [], []

for i in range(0, len(text) - seq_length):
    seq = text[i:i+seq_length]
    target = text[i+seq_length]
    X.append([char_to_idx[c] for c in seq])
    y.append(char_to_idx[target])

# One-hot encode
X_encoded = to_categorical(X)
y_encoded = to_categorical(y)

# Model
model = Sequential()
model.add(LSTM(128, input_shape=(seq_length, len(chars))))
model.add(Dense(len(chars), activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam')
model.fit(X_encoded, y_encoded, epochs=20, batch_size=128)

# Save model and mappings
os.makedirs('app/model', exist_ok=True)
model.save('app/model/lstm_namegen.h5')
np.save('app/model/char_map.npy', [char_to_idx, idx_to_char])
