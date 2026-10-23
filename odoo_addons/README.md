# MCCT Industry — Odoo : chantiers & facturation

Module Odoo 19 (Community) pour **MCCT Industry — Ingénierie industrielle · Fabrication · Construction**.
Il sert à facturer les clients selon les règles fiscales marocaines, à gérer le parc de
**matériel, d'engins et de machines** et à donner aux clients un espace en ligne pour suivre
leurs chantiers. Tout est en **dirham marocain (MAD)** et en **unités métriques** (m, m², m³, kg).

L'entreprise ne vend pas de marchandises : elle facture des **ouvrages** (travaux) et des
**prestations de services** (études, main-d'œuvre, levage).

## Ce que fait le module

| Outil | Détail |
|---|---|
| **Chantiers** | Tableau par phase (Étude → Approvisionnement → Fabrication atelier → Traitement de surface → Livraison → Montage → Essais → Réception provisoire → Réception définitive), activité, adresse, réf. marché, montant du marché, avancement. |
| **Devis → chantier automatique** | Un devis contenant des ouvrages du catalogue crée le chantier à sa confirmation. |
| **Situations de travaux** | Métré par ligne : quantité du marché, cumul précédent, cumul à date (en quantité ou en %), montant de la période. Sections « Lot 1, Lot 2… ». PDF « Situation de travaux N°xx » en paysage avec cadres de signature. |
| **Retenue de garantie** | 10 % par défaut sur chaque situation, plafonnée à 7 % du marché (règle du CCAG-Travaux). Base TTC ou HT au choix. |
| **Avance sur travaux** | Facture d'avance (ex. 10 % du marché) puis déduction automatique au même taux sur chaque situation. |
| **Échéancier de paiement** | Autre mode de facturation, au choix par chantier : les échéances prévues au marché (ex. 30 % à la commande, 40 % à la livraison, 20 % à la réception provisoire, 10 % à la réception définitive), chacune avec une date prévue ou une phase déclenchante. Facture en un clic, suivi des encaissements (à venir, à facturer, facturée, échue impayée, encaissée) et rappel au chef de projet quand une phase rend une échéance exigible. Vue globale **Facturation → Échéancier des marchés** pour le prévisionnel par mois. |
| **Facturation** | La facture est générée depuis la situation approuvée : lignes en m / m² / kg, TVA 20 %, retenue, **net à payer**, ICE du client et **montant en lettres** (« Arrêtée la présente facture à la somme de : … dirhams »). Les quantités livrées et facturées remontent sur le devis. |
| **Carte des chantiers** | Carte du Maroc (provinces du Sud incluses) : un cercle par ville avec le nombre de chantiers, en bleu (en cours), orange (en retard) ou vert (réceptionné). Zoom à la molette, déplacement à la souris. Liste des villes, montants des marchés, matériel sur site et chantiers non localisés. |
| **Matériel, engins et machines** | Parc complet (grues, nacelles, camions, pelles, plieuses, postes à souder, échafaudages…) classé en engins, machines et matériel. Planning par chantier : on fait glisser une carte d'une colonne à l'autre pour l'affecter. Historique des affectations, **coût d'immobilisation** imputé au chantier (jours × coût journalier), immatriculation, compteur horaire, opérateur, **contrôles réglementaires** (alerte à échéance), assurance et demandes de maintenance. |
| **Fiscalité marocaine** | TVA par nature (travaux immobiliers / prestations de services), régime des encaissements, **retenue à la source sur la TVA** (article 117 du CGI), exonération (article 92) et suspension (article 94), mentions de l'article 145 du CGI, délai de paiement de 60 jours (loi 69-21). Détails ci-dessous. |
| **Rapports de chantier** | Journal quotidien : météo, effectif, heures, travaux réalisés, réserves, photos. Publication au client en un clic. |
| **Portail client « Mes chantiers »** | Le client voit la frise des phases, l'avancement, le montant du marché, le facturé, le reste à régler, la retenue détenue, ses situations (PDF + **approbation en ligne** ou demande de correction) ou son échéancier de paiement (prévu, facturé, encaissé), ses factures, les engins et machines présents sur son chantier (sans les coûts), le journal de chantier avec photos et les documents partagés (plans, PV…). |
| **Achats et temps passés** | Les modules Achats et Feuilles de temps d'Odoo sont installés : achats de matériaux et heures sont rattachés au compte analytique du chantier. |

À l'installation sur une base neuve, le module configure aussi :

- la société **MCCT Industry** (adresse d'Aïn Harrouda, logo) si elle porte encore le nom par défaut ;
- le **plan comptable marocain** (PCGM) et la devise **MAD** ;
- la TVA 20 % **travaux immobiliers** (ligne 87 de la déclaration) comme TVA par défaut, et la
  TVA 20 % **prestations de services** (ligne 81) sur les études, la main-d'œuvre et le levage ;
- les comptes de produits **712410 Travaux**, **712420 Études** et **712430 Prestations de services** ;
- les positions fiscales **Exonération (article 92)** et **Suspension (article 94)** ;
- le compte **345810 État - TVA retenue à la source par les clients** ;
- le délai de paiement **60 jours (loi 69-21)** par défaut pour les nouveaux clients ;
- les familles de matériel (engins de levage, de terrassement, camions, machines d'atelier,
  postes à souder, matériel de chantier, outillage) ;
- l'interface en **français** ;
- les unités m, m², m³, kg, t, heure et **Forfait**.

## Installation

### Option 1 — Docker (le plus simple)

```bash
cd odoo_addons
docker compose up -d
```

Ouvrez <http://localhost:8069>, créez une base (pays : **Maroc**, langue : **Français**), puis
dans **Applications**, recherchez « MCCT » et activez **MCCT Industry — Chantiers & Facturation**.
Pour une base de démonstration, cochez « Données de démonstration » à la création : un chantier
complet (devis, 2 situations, avance, factures, rapports), 8 autres chantiers, le parc matériel et un
échéancier sont créés dans la société « MCCT Industry ». Après l'installation, **choisissez la société
« MCCT Industry » en haut à droite** : Odoo reste sinon sur la société par défaut, où les écrans sont vides.

Dans Odoo 19, le bouton d'installation d'une application s'appelle **Activer**. L'installation prend
quelques minutes ; le `docker-compose.yml` relève la limite de durée des requêtes d'Odoo (120 s par
défaut) pour qu'elle aille à son terme.

### Option 2 — Serveur Odoo 19 existant

1. Copiez le dossier `mcct_industry` dans un dossier d'addons de votre serveur
   (ou ajoutez `odoo_addons` à `addons_path`).
2. Redémarrez Odoo, puis **Applications → Mettre à jour la liste des applications**.
3. Installez **MCCT Industry — Chantiers & Facturation**.

Dépendances installées automatiquement : Ventes, Projet, Feuilles de temps, Achats, Maintenance,
Facturation, Portail, Maroc - Comptabilité.

Sur une base où le module est déjà installé, une mise à jour (`-u mcct_industry` ou bouton
**Mettre à jour** dans Applications) applique le paramétrage fiscal ci-dessus sans écraser les
taxes choisies à la main.

> **Odoo Online** (offre standard) n'accepte pas les modules personnalisés : utilisez Odoo.sh,
> un serveur auto-hébergé ou l'image Docker ci-dessus. Pour des PDF avec en-tête et pied de page,
> wkhtmltopdf doit être la version « patched qt » (déjà incluse dans l'image Docker officielle).

## Premiers pas

1. **Chantiers → Configuration → Paramètres** : forme juridique, capital, ICE, IF, RC (et ville
   du tribunal), Patente, CNSS (affichés en bas des factures et situations), date de la dernière
   **attestation de régularité fiscale** et taux de retenue de garantie par défaut.
2. **Chantiers → Configuration → Ouvrages et prestations** : renseignez vos prix
   (charpente au kg, bardage et couverture au m², tuyauterie et garde-corps au mètre, béton au m³…)
   et la nature fiscale de chaque ligne (travaux ou prestation de services).
3. **Fiches clients** (onglet Facturation) : cochez **Retient la TVA à la source** pour l'État, les
   établissements publics et les entreprises concernées ; choisissez le **mode de paiement** ; pour
   un client exonéré, choisissez la position fiscale et saisissez la référence de l'attestation.
4. **Chantiers → Matériel & engins** : enregistrez vos engins, machines et matériel (catégorie,
   immatriculation, coût journalier, dernier contrôle). Dans le planning, faites glisser chaque carte
   dans la colonne du chantier où il se trouve.
5. **Chantiers → Facturation → Devis** : créez le devis du client et confirmez-le.
   Le chantier est créé, avec le montant du marché repris du devis.
   Pour un marché payé par échéances, choisissez **Mode de facturation : Échéancier de paiement**
   sur le chantier, puis remplissez l'onglet **Échéancier** (bouton « Échéancier type » ou vos
   propres échéances) et facturez chaque échéance quand elle devient exigible.
6. Sur le chantier, onglet **Chantier** : phase, adresse, **ville** (elle place le chantier sur la
   carte ; à défaut, saisissez les coordonnées GPS), taux d'avance, retenue.
   Bouton **Facturer l'avance** si une avance est prévue.
7. **Nouvelle situation** : les lignes du devis sont reprises. Saisissez la quantité cumulée
   (ou le %) de chaque ouvrage, puis **Envoyer au client**.
8. Le client approuve sur son portail (ou vous cliquez sur **Approuver**), puis
   **Créer la facture**. La situation suivante reprend automatiquement les cumuls.
9. **Rapports de chantier** : notez la journée, ajoutez des photos, **Publier au client**.
10. **Donner l'accès au client** : sur la fiche du contact client, menu ⚙ → **Accorder l'accès
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
TVA retenue à la source  = TVA de la période × taux de retenue du client (voir ci-dessous)
Net à payer              = Total TTC − Retenue de garantie − TVA retenue à la source
```

La retenue reste due par le client dans son compte : la facture affiche le net à payer et le
solde correspondant à la retenue reste ouvert jusqu'à la réception définitive
(bouton **Libérer la retenue** sur le chantier).

En mode échéancier, chaque échéance vaut `% × montant du marché HT` ; la facture porte la TVA
des travaux et, le cas échéant, la retenue à la source. Une échéance facturée garde son montant
même si le marché change par avenant ; annuler sa facture la rend à nouveau facturable.

Une situation envoyée, approuvée ou facturée est verrouillée. Seule la dernière situation d'un
chantier peut être remise en brouillon ou annulée ; annuler sa facture la rend à nouveau facturable.

## Fiscalité marocaine

| Règle | Application dans le module |
|---|---|
| **TVA par nature** | Chaque ouvrage ou prestation porte une nature : *travaux immobiliers* (TVA 20 %, ligne 87 de la déclaration) ou *prestations de services* (TVA 20 %, ligne 81). La TVA est exigible à l'encaissement (régime de droit commun, géré par la localisation marocaine d'Odoo). |
| **Retenue à la source sur la TVA** (article 117 du CGI) | Pour un client marqué « Retient la TVA à la source » : avec une attestation de régularité fiscale de moins de 6 mois, retenue de **75 %** de la TVA sur les prestations de services et **0 %** sur les travaux ; sans attestation valable, **100 %** de la TVA. Le montant est figé à la validation de la facture et imprimé avec le **net à payer**. Le bouton **Constater la TVA retenue à la source** passe l'écriture (débit 345810, crédit client) et la lettre avec la facture. |
| **Exonération / suspension** (articles 92 et 94) | Positions fiscales dédiées : la TVA passe à 0 % (lignes 40 et 50 de la déclaration), la mention légale et la référence de l'attestation du client sont imprimées sur la facture. |
| **Mentions obligatoires** (article 145 du CGI) | Raison sociale, forme juridique, capital, adresse du siège, RC et tribunal, IF, ICE, TP, CNSS de l'entreprise ; ICE du client ; numérotation continue ; **mode de paiement**. |
| **Délais de paiement** (loi 69-21) | Condition « 60 jours » par défaut ; un bandeau d'alerte s'affiche si l'échéance dépasse 120 jours. |

> Les taux et la liste des clients tenus à la retenue évoluent avec les lois de finances : faites
> valider le paramétrage par votre expert-comptable.

## Structure

```
odoo_addons/
├── docker-compose.yml
└── mcct_industry/
    ├── models/        chantier, situations, échéancier, rapports, factures, société, parc matériel
    ├── controllers/   portail client « Mes chantiers »
    ├── views/         écrans, menus, pages du portail
    ├── report/        PDF situation, rapport de chantier, ajouts sur la facture
    ├── data/          catalogue d'ouvrages, familles de matériel, unités, modèle d'e-mail
    ├── static/src/chantier_map/   carte des chantiers (composant OWL + contour du Maroc)
    ├── migrations/    mise à jour des bases existantes
    ├── tests/         tests automatisés
    ├── fiscal.py      paramétrage fiscal marocain
    ├── cities.py      villes du Maroc et coordonnées pour la carte
    └── hooks.py       configuration Maroc / MAD / français à l'installation
```

## Tests

```bash
odoo-bin -d test_mcct -i mcct_industry --test-enable --test-tags /mcct_industry --stop-after-init
```
