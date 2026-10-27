import glob, re

files = glob.glob('src/components/suites/*.tsx') + glob.glob('src/components/layout/*.tsx') + ['src/App.tsx']

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        code = f.read()

    orig_code = code

    # 1. Replace text-[#38E8FF] with text-[var(--brand2)]
    code = code.replace('text-[#38E8FF]', 'text-[var(--brand2)]')
    code = code.replace('hover:border-[#38E8FF]', 'hover:border-[var(--brand2)]')
    code = code.replace('border-[#38E8FF]', 'border-[var(--brand2)]')

    # 2. Replace text-[#8ab4f8] in Google SERP preview
    code = code.replace('text-[#8ab4f8]', 'text-[#1a0dab] dark:text-[#8ab4f8]')

    # 3. Replace text-[#061018] on teal buttons
    code = code.replace("text-[#061018]'", "text-white dark:text-[#061018]'")

    if code != orig_code:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(code)
        print(f"Updated light mode contrast in {fpath}")

print("Contrast pass completed successfully")
