import os

input_path = 'names.txt'
desc_output = 'descriptive_phrases.txt'

with open(input_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

descriptive = []
for name in lines:
    name = name.strip()
    words = name.split()
    if len(words) >= 2 and all(char.isalnum() or char.isspace() for char in name):
        descriptive.append(name)

with open(desc_output, 'w', encoding='utf-8') as f:
    f.write('\n'.join(descriptive))

print(f"[✅] Saved {len(descriptive)} descriptive phrases to {desc_output}")
