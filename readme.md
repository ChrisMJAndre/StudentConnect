## StudentConnect

### Guide til start

1. Clone Projekt
2. Npm install
3. Npm start
4. Opret en bruger
5. Opret en profil - brug PRÆCIS den samme email som kontoen er blevet lavet med (OBS: den er case-sensitive) - ellers vil den ikke matche den auth konto med realtime profil
6. Du kan nu tilgå hele systemet og oprette/ændre/slette/joine/afmelde Grupper eller Events

### Alternativt - Virker kun for andriod

Projektet er published til cloud og burde kunne køre uden at starte lokalt

- https://expo.dev/@chrisa4/studentconnect

### Manglende / Ikke færdige implementeringer

1. Lige nu kan camera ikke gøre mere end at tage et billede og vise billedet. Planen er i fremtiden at man skal tage et billede og sætte det som profilbillede

2. Tilmelding virker idag, men ikke optimalt. Lige nu så tilmelder man sig en gruppe ved at pushe sin email til eventet, Dette er ikke optimalt når flere skal tilmelde sig.
   Når man leaver et event så leaver alle, fordi den er nu tom.

3. Der skal i fremtiden oprettes en forbindelse mellem grupper og events, så en gruppe kan have flere events, men et event kun kan have en "host" gruppe. Idag skriver man bare manuelt Host gruppen ind.

4. Joined Groups / Events viser details for den første Group / Event i det store samlet array, ikke kun for de som der bliver filtreret på. Der skal lave en lignende løsning som i Eventlist / Grouplist hvor vi laver et nyt array og tager index på det array.

### Problemer med systemet

1. Pas på med at ikke oprette flere konto og lave flere profiler uden at reloade appen i mellem hver oprettelse. Det virker til at appen casher noget som årsager at den crasher

### Eventuelle ekstra oplysninger

1. Testbruger - Brugernavn: test@test.dk / Password: testtest
2. Vores picker opfører sig lidt anderledes på IOS end Andriod - den placering bliver anderledes på IOS, virker fint på andriod.
