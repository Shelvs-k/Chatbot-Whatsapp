from pathlib import Path
import re

caminho = Path("src/commands/implementations")
padrao = r"export\s*{\s*(\w+)\s*}"

lista_de_exportacao = []

for arquivo in caminho.glob("*.ts"):
    resultado = re.search(padrao, arquivo.read_text("utf-8"))
    if resultado:
        lista_de_exportacao.append(f"export {{ {resultado.group(1)} }} from \"../implementations/{arquivo.stem}.js\"")

comandos_gerados = Path("src\\commands\\registry\\ComandosGerados.ts")
comandos_gerados.parent.mkdir(parents=True, exist_ok=True)

with open(comandos_gerados, "w", encoding="utf-8") as comandos:
    comandos.write("\n".join(lista_de_exportacao))