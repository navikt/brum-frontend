# Arbeid framover

## Det viktigste

- Man burde kunne se tid for flere tidsperioder samtidig, for å kunne sammenligne disse. Det vil nok kreves at det implementeres noe annet som er viktig:
- Man burde kunne styre premissene for grafen. Altså hva som er på x-aksen og y-aksen.
- Man burde kunne se data akkumulert eller splitta på en valgt akse. For nå har sender vi akkumulert data for avdelinger på tiltak sammen med data som deler på innsatsgrupper, så man kan bare toggle mellom disse to.
- Lisens til HighCharts, dette har vi ikkje ordna, men Nav skal ha i følge Aksel-docsa.
- Dataen burde by default være sorter etter størrelse innen kategoriene.
- Prosentmodus er broken, og må fikses.

## Annet:

**Flere graftyper**
Burde lett kunne legges til via å legge til valget i ChartTypeRadio i ChartMenu.
Man må selvsagt passe på at det går overens med strukturen på dataen, osv. Dette har vi foreløpig ikke sett noe særlig på.
Valg man vil skal gjelde for én graftype kan legges til i chartOptions.plotOptions.navnetpågraftypen.

**Mer tydelighet**
Bedre labelling av data/serier/akser.
Valgt tidsperiode burde vises.
Det burde være en respons på at bruker har inputtet valid dataparametre.

**Layout**
I hvert fall må tabellen ordnes så den holder seg fint på sida når det er mange datapunkter. Kan gi mening å implementere pagination også, alt ettersom hvor mye data man ender opp med. Errormeldinger burde også fikses slik at de ikke ødelegger layouten.

**Eksportering**
Eksporteringsmenyen burde ikke bruke highcharts-defaulten men heller lage en egen som er på norsk.
Behovseier viste også interesse i mulighet til å eksportere tabelldataen.
