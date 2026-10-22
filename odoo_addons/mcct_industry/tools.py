"""Petits utilitaires sans dépendance à l'ORM."""
from num2words import num2words

# Libellés (singulier, pluriel) par devise. Le dirham est la devise par défaut.
_CURRENCY_WORDS = {
    'MAD': (('dirham', 'dirhams'), ('centime', 'centimes')),
    'EUR': (('euro', 'euros'), ('centime', 'centimes')),
    'USD': (('dollar', 'dollars'), ('cent', 'cents')),
}


def _french_number(number):
    words = num2words(number, lang='fr')
    # « un million de dirhams », « deux milliards de dirhams »
    if words.endswith(('million', 'millions', 'milliard', 'milliards')):
        words += ' de'
    return words


def _pluralize(count, labels):
    return labels[1] if count > 1 else labels[0]


def amount_to_french_words(amount, currency_code='MAD'):
    """Montant en toutes lettres, à la française.

    >>> amount_to_french_words(120000.5)
    'Cent vingt mille dirhams et cinquante centimes'
    """
    units, subunits = _CURRENCY_WORDS.get(currency_code, _CURRENCY_WORDS['MAD'])
    cents_total = int(round(abs(amount) * 100))
    integer, cents = divmod(cents_total, 100)

    text = f"{_french_number(integer)} {_pluralize(integer, units)}"
    if cents:
        text += f" et {_french_number(cents)} {_pluralize(cents, subunits)}"
    if amount < 0:
        text = f"moins {text}"
    return text[:1].upper() + text[1:]
