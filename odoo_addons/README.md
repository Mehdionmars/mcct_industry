# MCCT Industry — Odoo : chantiers & facturation

Module Odoo 19 (Community) pour **MCCT Industry — Ingénierie industrielle · Fabrication · Construction**.
Il sert à facturer les clients selon les usages marocains et à leur donner un espace en ligne
pour suivre leurs chantiers. Tout est en **dirham marocain (MAD)** et en **unités métriques**
(m, m², m³, kg).

## Ce que fait le module

| Outil | Détail |
|---|---|
| **Chantiers** | Tableau par phase (Étude → Approvisionnement → Fabrication atelier → Traitement de surface → Livraison → Montage → Essais → Réception provisoire → Réception définitive), activité, adresse, réf. marché, montant du marché, avancement. |
| **Devis → chantier automatique** | Un devis contenant des ouvrages du catalogue crée le chantier à sa confirmation. |
| **Situations de travaux** | Métré par ligne : quantité du marché, cumul précédent, cumul à date (en quantité ou en %), montant de la période. Sections « Lot 1, Lot 2… ». PDF « Situation de travaux N°xx » en paysage avec cadres de signature. |
| **Retenue de garantie** | 10 % par défaut sur chaque situation, plafonnée à 7 % du marché (règle du CCAG-Travaux). Base TTC ou HT au choix. |
| **Avance sur travaux** | Facture d'avance (ex. 10 % du marché) puis déduction automatique au même taux sur chaque situation. |
| **Facturation** | La facture est générée depuis la situation approuvée : lignes en m / m² / kg, TVA 20 %, retenue, **net à payer**, ICE du client et **montant en lettres** (« Arrêtée la présente facture à la somme de : … dirhams »). Les quantités livrées et facturées remontent sur le devis. |
| **Rapports de chantier** | Journal quotidien : météo, effectif, heures, travaux réalisés, réserves, photos. Publication au client en un clic. |
| **Portail client « Mes chantiers »** | Le client voit la frise des phases, l'avancement, le montant du marché, le facturé, le reste à régler, la retenue détenue, ses situations (PDF + **approbation en ligne** ou demande de correction), ses factures, le journal de chantier avec photos et les documents partagés (plans, PV…). |
| **Achats et temps passés** | Les modules Achats et Feuilles de temps d'Odoo sont installés : achats de matériaux et heures sont rattachés au compte analytique du chantier. |

À l'installation sur une base neuve, le module configure aussi :

- la société **MCCT Industry** (adresse d'Aïn Harrouda, logo) si elle porte encore le nom par défaut ;
- le **plan comptable marocain** (PCGM), la devise **MAD** et la TVA 20 % ;
- les comptes de produits **712410 Travaux** et **712420 Études** sur le catalogue ;
- l'interface en **français** ;
- les unités m, m², m³, kg, t, heure et **Forfait**.

## Installation

### Option 1 — Docker (le plus simple)

```bash
cd odoo_addons
docker compose up -d
```

Ouvrez <http://localhost:8069>, créez une base (pays : **Maroc**, langue : **Français**), puis
dans **Applications**, recherchez « MCCT » et installez **MCCT Industry — Chantiers & Facturation**.
Pour une base de démonstration, cochez « Données de démonstration » à la création : un chantier
complet (devis, 2 situations, avance, factures, rapports) est créé dans la société « MCCT Industry ».

### Option 2 — Serveur Odoo 19 existant

1. Copiez le dossier `mcct_industry` dans un dossier d'addons de votre serveur
   (ou ajoutez `odoo_addons` à `addons_path`).
2. Redémarrez Odoo, puis **Applications → Mettre à jour la liste des applications**.
3. Installez **MCCT Industry — Chantiers & Facturation**.

Dépendances installées automatiquement : Ventes, Projet, Feuilles de temps, Achats, Facturation,
Portail, Maroc - Comptabilité.

> **Odoo Online** (offre standard) n'accepte pas les modules personnalisés : utilisez Odoo.sh,
> un serveur auto-hébergé ou l'image Docker ci-dessus. Pour des PDF avec en-tête et pied de page,
> wkhtmltopdf doit être la version « patched qt » (déjà incluse dans l'image Docker officielle).

## Premiers pas

1. **Chantiers → Configuration → Paramètres** : saisissez ICE, IF, RC, Patente, CNSS
   (affichés en bas des factures et situations) et les taux de retenue par défaut.
2. **Chantiers → Configuration → Ouvrages et articles** : renseignez vos prix
   (charpente au kg, bardage et couverture au m², tuyauterie et garde-corps au mètre, béton au m³…).
3. **Chantiers → Facturation → Devis** : créez le devis du client et confirmez-le.
   Le chantier est créé, avec le montant du marché repris du devis.
4. Sur le chantier, onglet **Chantier** : phase, adresse, taux d'avance, retenue.
   Bouton **Facturer l'avance** si une avance est prévue.
5. **Nouvelle situation** : les lignes du devis sont reprises. Saisissez la quantité cumulée
   (ou le %) de chaque ouvrage, puis **Envoyer au client**.
6. Le client approuve sur son portail (ou vous cliquez sur **Approuver**), puis
   **Créer la facture**. La situation suivante reprend automatiquement les cumuls.
7. **Rapports de chantier** : notez la journée, ajoutez des photos, **Publier au client**.
8. **Donner l'accès au client** : sur la fiche du contact client, menu ⚙ → **Accorder l'accès
   portail**. Le contact voit alors les chantiers de sa société dans **Mon compte → Mes chantiers**.
   Seuls les chantiers dont la visibilité est « portail » sont affichés.

## Règles de calcul

Pour chaque situation N :

```
Travaux de la période HT = Travaux cumulés HT − Travaux cumulés de la situation N−1
Déduction avance HT      = min(Travaux de la période × taux d'avance, avance facturée non encore déduite)
Total TTC                = (Travaux de la période − Déduction avance) + TVA
Retenue de garantie      = taux de retenue × Travaux de la période (TTC ou HT selon le paramètre),
                           sans que le cumul des retenues dépasse le plafond × montant du marché
Net à payer              = Total TTC − Retenue de garantie
```

La retenue reste due par le client dans son compte : la facture affiche le net à payer et le
solde correspondant à la retenue reste ouvert jusqu'à la réception définitive
(bouton **Libérer la retenue** sur le chantier).

Une situation envoyée, approuvée ou facturée est verrouillée. Seule la dernière situation d'un
chantier peut être remise en brouillon ou annulée ; annuler sa facture la rend à nouveau facturable.

## Structure

```
odoo_addons/
├── docker-compose.yml
└── mcct_industry/
    ├── models/        chantier, situations, rapports, factures, société
    ├── controllers/   portail client « Mes chantiers »
    ├── views/         écrans, menus, pages du portail
    ├── report/        PDF situation, rapport de chantier, ajouts sur la facture
    ├── data/          catalogue d'ouvrages, unités, modèle d'e-mail
    ├── tests/         tests automatisés
    └── hooks.py       configuration Maroc / MAD / français à l'installation
```

## Tests

```bash
odoo-bin -d test_mcct -i mcct_industry --test-enable --test-tags /mcct_industry --stop-after-init
```
