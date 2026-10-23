"""Villes du Maroc et coordonnées (latitude, longitude) pour la carte des chantiers.

La ville saisie sur le chantier est comparée sans accents, tirets ni majuscules ;
un chantier dans une ville absente de la liste peut recevoir des coordonnées GPS.
"""
import re
import unicodedata

# Nom affiché : (latitude, longitude)
CITIES = {
    "Casablanca": (33.5731, -7.5898),
    "Rabat": (34.0209, -6.8416),
    "Salé": (34.0531, -6.7985),
    "Témara": (33.9287, -6.9063),
    "Skhirat": (33.8530, -7.0300),
    "Kénitra": (34.2610, -6.5802),
    "Mohammedia": (33.6866, -7.3830),
    "Aïn Harrouda": (33.6370, -7.4480),
    "Tit Mellil": (33.5580, -7.4860),
    "Bouskoura": (33.4489, -7.6486),
    "Nouaceur": (33.3670, -7.5830),
    "Had Soualem": (33.4200, -7.8500),
    "Berrechid": (33.2655, -7.5876),
    "Benslimane": (33.6100, -7.1200),
    "Settat": (33.0010, -7.6166),
    "El Jadida": (33.2316, -8.5007),
    "Jorf Lasfar": (33.1050, -8.6370),
    "Azemmour": (33.2870, -8.3420),
    "Sidi Bennour": (32.6500, -8.4300),
    "Safi": (32.2994, -9.2372),
    "Youssoufia": (32.2460, -8.5290),
    "Ben Guerir": (32.2360, -7.9540),
    "Khouribga": (32.8811, -6.9063),
    "Oued Zem": (32.8630, -6.5730),
    "Béni Mellal": (32.3373, -6.3498),
    "Fquih Ben Salah": (32.5020, -6.6880),
    "Kelaat Sraghna": (32.0580, -7.4100),
    "Khénifra": (32.9350, -5.6690),
    "Marrakech": (31.6295, -7.9811),
    "Essaouira": (31.5085, -9.7595),
    "Agadir": (30.4278, -9.5981),
    "Inezgane": (30.3550, -9.5370),
    "Aït Melloul": (30.3340, -9.4970),
    "Taroudant": (30.4703, -8.8770),
    "Tiznit": (29.6974, -9.7316),
    "Sidi Ifni": (29.3797, -10.1729),
    "Guelmim": (28.9870, -10.0574),
    "Tan-Tan": (28.4380, -11.1030),
    "Tarfaya": (27.9390, -12.9260),
    "Laâyoune": (27.1253, -13.1625),
    "Smara": (26.7384, -11.6719),
    "Boujdour": (26.1260, -14.4840),
    "Dakhla": (23.6848, -15.9579),
    "Ouarzazate": (30.9189, -6.8934),
    "Zagora": (30.3324, -5.8384),
    "Tinghir": (31.5150, -5.5330),
    "Errachidia": (31.9314, -4.4247),
    "Midelt": (32.6852, -4.7451),
    "Fès": (34.0181, -5.0078),
    "Meknès": (33.8935, -5.5473),
    "Sefrou": (33.8300, -4.8350),
    "Ifrane": (33.5228, -5.1100),
    "Azrou": (33.4340, -5.2210),
    "Khémisset": (33.8240, -6.0660),
    "Tiflet": (33.8940, -6.3060),
    "Sidi Kacem": (34.2260, -5.7070),
    "Sidi Slimane": (34.2650, -5.9250),
    "Taza": (34.2100, -4.0100),
    "Guercif": (34.2257, -3.3536),
    "Taourirt": (34.4073, -2.8973),
    "Oujda": (34.6814, -1.9086),
    "Jerada": (34.3100, -2.1600),
    "Berkane": (34.9200, -2.3200),
    "Nador": (35.1681, -2.9335),
    "Al Hoceïma": (35.2517, -3.9372),
    "Bouarfa": (32.5300, -1.9600),
    "Figuig": (32.1090, -1.2290),
    "Tanger": (35.7595, -5.8340),
    "Tanger Med": (35.8890, -5.5000),
    "Tétouan": (35.5785, -5.3684),
    "Martil": (35.6170, -5.2750),
    "Fnideq": (35.8490, -5.3570),
    "Chefchaouen": (35.1688, -5.2636),
    "Ouezzane": (34.7970, -5.5830),
    "Larache": (35.1932, -6.1557),
    "Ksar El Kébir": (35.0017, -5.9027),
    "Asilah": (35.4650, -6.0350),
}

# Autres orthographes courantes (après normalisation) -> nom de la liste.
ALIASES = {
    "casa": "Casablanca",
    "dar el beida": "Casablanca",
    "sidi bernoussi": "Casablanca",
    "ain sebaa": "Casablanca",
    "lissasfa": "Casablanca",
    "fez": "Fès",
    "tangier": "Tanger",
    "tangiers": "Tanger",
    "ksar sghir": "Tanger Med",
    "marrakesh": "Marrakech",
    "el aaiun": "Laâyoune",
    "laayoun": "Laâyoune",
    "hoceima": "Al Hoceïma",
    "el hoceima": "Al Hoceïma",
    "beni mellal": "Béni Mellal",
    "kelaa des sraghna": "Kelaat Sraghna",
    "el kelaa des sraghna": "Kelaat Sraghna",
    "ksar el kebir": "Ksar El Kébir",
    "jorf el asfar": "Jorf Lasfar",
    "tantan": "Tan-Tan",
    "assilah": "Asilah",
    "chaouen": "Chefchaouen",
    "es semara": "Smara",
    "dakhla oued eddahab": "Dakhla",
    "ad dakhla": "Dakhla",
    "benguerir": "Ben Guerir",
    "ain harrouda": "Aïn Harrouda",
    "chellalate": "Aïn Harrouda",
}


def normalize(name):
    """« Aïn-Harrouda » -> « ain harrouda »."""
    text = unicodedata.normalize('NFKD', name or '')
    text = ''.join(char for char in text if not unicodedata.combining(char))
    return re.sub(r'[^a-z0-9]+', ' ', text.lower()).strip()


_INDEX = {normalize(city): city for city in CITIES}
_INDEX.update({normalize(alias): city for alias, city in ALIASES.items()})


def find_city(name):
    """Nom de la liste correspondant à la ville saisie, ou None."""
    key = normalize(name)
    if not key:
        return None
    if key in _INDEX:
        return _INDEX[key]
    # « Casablanca - Aïn Sebaâ », « Zone industrielle de Settat »…
    for candidate, city in sorted(_INDEX.items(), key=lambda item: -len(item[0])):
        if re.search(rf'\b{re.escape(candidate)}\b', key):
            return city
    return None
