word = input('Введите последовательность:')
alphabet = set("АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя")
out = alphabet.intersection(word)

print(f'Количество букв равно: {len(out)}')
print(out)
