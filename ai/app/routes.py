from flask import Blueprint, request, jsonify
import pickle
import os
import random
from keras.models import load_model

bp = Blueprint('routes', __name__)

import numpy as np

model = load_model('app/model/lstm_namegen.h5')
char_to_idx, idx_to_char = np.load('app/model/char_map.npy', allow_pickle=True)

def generate_name(seed='eco', length=8):
    seed = seed.lower()[:10].rjust(10)
    name = seed

    for _ in range(length):
        x = np.zeros((1, 10, len(char_to_idx)))
        for t, ch in enumerate(name[-10:]):
            if ch in char_to_idx:
                x[0, t, char_to_idx[ch]] = 1
        preds = model.predict(x, verbose=0)[0]
        next_index = np.argmax(preds)
        next_char = idx_to_char[next_index]
        name += next_char

    return name.strip().title()


@bp.route('/generate-name', methods=['POST'])
def generate_name_api():
    data = request.get_json()
    idea = data.get('idea', '')

    if not idea:
        return jsonify({'error': 'Missing business idea'}), 400

    name = generate_name(seed=idea)
    return jsonify({'suggested_name': name})
