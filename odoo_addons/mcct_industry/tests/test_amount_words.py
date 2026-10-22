from odoo.tests import BaseCase, tagged

from odoo.addons.mcct_industry.tools import amount_to_french_words


@tagged('post_install', '-at_install')
class TestAmountWords(BaseCase):

    def test_amounts(self):
        cases = {
            0: "Zéro dirham",
            1: "Un dirham",
            2: "Deux dirhams",
            80: "Quatre-vingts dirhams",
            120000.5: "Cent vingt mille dirhams et cinquante centimes",
            1000000: "Un million de dirhams",
            2500000: "Deux millions cinq cent mille dirhams",
            0.01: "Zéro dirham et un centime",
            32400: "Trente-deux mille quatre cents dirhams",
        }
        for amount, expected in cases.items():
            with self.subTest(amount=amount):
                self.assertEqual(amount_to_french_words(amount), expected)

    def test_rounding(self):
        # 0,995 DH s'arrondit à 1 DH : jamais « cent centimes ».
        self.assertEqual(amount_to_french_words(0.999), "Un dirham")
