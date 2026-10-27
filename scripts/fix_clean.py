with open('src/App.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Check UNIVERSAL_PRESETS import
has_preset = any('UNIVERSAL_PRESETS' in l for l in lines[:50])
if not has_preset:
    for idx, l in enumerate(lines[:50]):
        if 'presetsData' in l:
            lines[idx] = "import { DONATION_TIERS, DonationTier, UNIVERSAL_PRESETS } from './data/presetsData';\n"
            print("Added UNIVERSAL_PRESETS import")
            break

# 2. Replace lines 256 to 304 (language sync block)
start_lang = -1
end_lang = -1
for idx, l in enumerate(lines):
    if 'const shortLang = siteLang.split' in l:
        start_lang = idx
    if start_lang != -1 and 'run();' in l:
        end_lang = idx
        break

if start_lang != -1 and end_lang != -1:
    new_lang_lines = [
        "    const run = async () => {\n",
        "      applyWholePageLanguage(siteLang);\n",
        "      getLocalizedSuiteSamples(siteLang).then(samples => {\n",
        "        if (cancelled) return;\n",
        "        setLocalizedSamples(samples);\n",
        "        setHeroDemoText(samples.heroDemo);\n",
        "        setFontInput(samples.fontSample);\n",
        "        setAutoInput(samples.autoSample);\n",
        "      });\n",
        "      if (siteLang === 'es') {\n",
        "        setIsSiteTranslating(false);\n",
        "      } else {\n",
        "        setIsSiteTranslating(true);\n",
        "        applyWholePageLanguage(siteLang).finally(() => {\n",
        "          if (!cancelled) setIsSiteTranslating(false);\n",
        "        });\n",
        "      }\n",
        "    };\n"
    ]
    lines[start_lang:end_lang] = new_lang_lines
    print(f"Replaced language block between lines {start_lang} and {end_lang}")
else:
    print("Could not find start/end for language block")

# 3. Replace sendToTool block
start_send = -1
end_send = -1
for idx, l in enumerate(lines):
    if 'const sendToTool = (targetId: string, textToPass: string) => {' in l:
        start_send = idx
    if start_send != -1 and "const el = document.getElementById(targetId);" in l:
        end_send = idx
        break

if start_send != -1 and end_send != -1:
    new_send_lines = [
        "  const sendToTool = (targetId: string, textToPass: string) => {\n",
        "    if (!textToPass.trim()) {\n",
        "      addToast('No hay texto de salida para enviar', 'error');\n",
        "      return;\n",
        "    }\n",
        "    recordRecentTool(targetId);\n",
        "    if (targetId === 'fuente') setFontInput(textToPass.slice(0, 500));\n",
        "    else if (targetId === 'mejorador') setImpInput(textToPass.slice(0, 8000));\n",
        "    else if (targetId === 'limpiador') setCleanInput(textToPass.slice(0, 15000));\n",
        "    else if (targetId === 'analizador') setAnInput(textToPass.slice(0, 20000));\n",
        "    else if (targetId === 'autopilot') setAutoInput(textToPass.slice(0, 15000));\n",
        "    else {\n",
        "      navigator.clipboard?.writeText(textToPass);\n",
        "      addToast('Texto copiado al portapapeles para pegar en la herramienta');\n",
        "    }\n"
    ]
    lines[start_send:end_send] = new_send_lines
    print(f"Replaced sendToTool between lines {start_send} and {end_send}")
else:
    print("Could not find start/end for sendToTool block")

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("App.tsx written successfully")
