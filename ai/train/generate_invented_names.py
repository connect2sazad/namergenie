import os

input_path = 'names.txt'
invented_output = 'invented_names.txt'

with open(input_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

invented_names = []
for name in lines:
    name = name.strip()
    if 1 <= len(name.split()) <= 2 and len(name) <= 15:
        if all(char.isalpha() or char.isspace() for char in name):
            invented_names.append(name)

with open(invented_output, 'w', encoding='utf-8') as f:
    f.write('\n'.join(invented_names))

print(f"[✅] Saved {len(invented_names)} invented-style names to {invented_output}")
