# Scenariusze testowe – Ostatnia Prosta v1.0–v2.0

**Przykładowe statusy:**
- `Do wykonania` – test nie został jeszcze przeprowadzony;
- `Działa` – wynik jest zgodny z oczekiwaniem;
- `Nie działa` – wynik jest niezgodny z oczekiwaniem;
- `Zablokowany` – testu nie można wykonać z powodu innego problemu.

## Tabela scenariuszy

| ID | Funkcjonalność / scenariusz | Kroki i dane testowe | Oczekiwany rezultat | Status |
|---|---|---|---|---|
| T01 | F01 – wyświetlenie listy kaplic | Otworzyć stronę główną aplikacji lub `/rezerwacje/`. | Wyświetla się lista kaplic pobrana z bazy danych. | Działa |
| T02 | F01 – dostępność kaplicy | Wybrać kaplicę i sprawdzić prezentowane zajęte terminy. | Widok pokazuje informacje o aktywnych rezerwacjach. | Działa |
| T03 | F02 – poprawna rezerwacja | Wybrać kaplicę, przyszłą datę i poprawny przedział godzin, a następnie wysłać formularz. | Rezerwacja zostaje zapisana i pojawia się na liście użytkownika. | Działa |
| T04 | F02 – niepoprawna data | Wysłać formularz z datą w przeszłości lub niepoprawnym formatem. | Rezerwacja nie zostaje zapisana; użytkownik otrzymuje komunikat o błędzie. | Działa |
| T05 | F02 – niepoprawne godziny | Podać godzinę zakończenia wcześniejszą lub równą godzinie rozpoczęcia. | Formularz zostaje odrzucony; rezerwacja nie powstaje. | Działa |
| T06 | Konflikt terminów – nakładanie się | Dodać rezerwację, a następnie spróbować zarezerwować tę samą kaplicę w nakładającym się przedziale. | Druga rezerwacja zostaje odrzucona z komunikatem o zajętym terminie. | Działa |
| T07 | Konflikt terminów – różne kaplice | Zarezerwować ten sam przedział godzin dla dwóch różnych kaplic. | Obie rezerwacje mogą zostać zapisane. | Działa |
| T08 | Konflikt terminów – przedziały stykające się | Ustawić koniec pierwszej rezerwacji na 12:00, a początek kolejnej na 12:00 dla tej samej kaplicy. | Rezerwacje nie są traktowane jako nakładające się. | Działa |
| T09 | F03 – lista własnych rezerwacji | Otworzyć `/rezerwacje/moje`. | Wyświetlają się rezerwacje użytkownika demonstracyjnego ID 1. | Działa |
| T10 | F03 – anulowanie własnej rezerwacji | Anulować aktywną rezerwację z poziomu listy. | Status rezerwacji zmienia się na `anulowana`; rezerwacja nie jest usuwana z bazy. | Działa |
| T11 | F03 – ponowne anulowanie | Spróbować anulować rezerwację, która ma już status `anulowana`. | Operacja nie zmienia danych; użytkownik otrzymuje odpowiedni komunikat lub pozostaje na liście. | Działa |

## Wyniki testów historycznych

| Data testu | Osoba testująca | Liczba testów | Działa | Nie działa | Uwagi |
|---|---|---:|---:|---:|---|
| 11.11.2026 | Sęk Patryk | po 2+ | 12 | 0 | 12-godzinny format, brak prostego i niezawodnego rozwiązania na ten moment |


> **Uwaga do zapisu historycznego:** w tabeli wyników odnotowano 12 testów, natomiast lista scenariuszy T01–T11 zawiera 11 opisanych pozycji. Nie dopisano brakującego scenariusza ani nie zmieniono historycznej liczby bez potwierdzenia, czego dotyczył dodatkowy test.

## Testy interfejsu v2.0

Poniższe scenariusze należy wykonać ręcznie w przeglądarce. Zostały dodane w ramach modernizacji prezentacji i na początku mają status `Do wykonania`.

| ID | Scenariusz | Kroki i dane testowe | Oczekiwany rezultat | Status |
|---|---|---|---|---|
| V201 | Domyślny motyw systemowy – jasny | Usunąć klucz `ostatnia-prosta-theme` z `localStorage`, ustawić system na tryb jasny i odświeżyć stronę. | Aplikacja uruchamia się w jasnym motywie. | Do wykonania |
| V202 | Domyślny motyw systemowy – ciemny | Usunąć klucz `ostatnia-prosta-theme`, ustawić system na tryb ciemny i odświeżyć stronę. | Aplikacja uruchamia się w ciemnym motywie. | Do wykonania |
| V203 | Ręczne przełączanie motywu | Kliknąć przełącznik w nagłówku, a następnie kliknąć go ponownie. | Motyw zmienia się między jasnym i ciemnym; etykieta i ikona odpowiadają następnemu trybowi. | Do wykonania |
| V204 | Zapamiętanie wyboru | Ręcznie wybrać motyw, przejść na inną podstronę i odświeżyć stronę. | Wybrany motyw pozostaje aktywny na kolejnych stronach i po odświeżeniu. | Do wykonania |
| V205 | Pierwszeństwo wyboru ręcznego | Zapisać motyw ręcznie, a następnie zmienić preferencję motywu w systemie. | Aplikacja zachowuje ręcznie wybrany motyw. | Do wykonania |
| V206 | Powrót do preferencji systemowej | Usunąć klucz `ostatnia-prosta-theme` i zmienić systemową preferencję motywu. | Aplikacja ponownie dopasowuje się do ustawienia systemowego. | Do wykonania |
| V207 | Logo i nawigacja | Otworzyć W01, W02 i W03 w obu motywach. | Logo SVG i nawigacja są widoczne, czytelne i nie znikają przy zmianie motywu. | Do wykonania |
| V208 | Responsywność | Otworzyć aplikację w szerokości desktopowej i mobilnej (np. 375 px). | Nawigacja, formularze, karty i tabele pozostają czytelne; tabele można przewijać poziomo. | Do wykonania |
| V209 | Zachowanie F01–F03 po zmianie stylów | Wykonać dotychczasowe scenariusze F01, F02 i F03 w obu motywach. | Lista kaplic, zapis z walidacją konfliktów, lista i anulowanie własnych rezerwacji działają jak w v1.0. | Do wykonania |


## Dodatkowe testy bezpieczeństwa i integralności – do wykonania

| ID | Scenariusz | Kroki i dane testowe | Oczekiwany rezultat | Status |
|---|---|---|---|---|
| T12 | F03 – próba anulowania cudzej rezerwacji | Przygotować rezerwację przypisaną do innego użytkownika i wysłać żądanie anulowania jej identyfikatora z poziomu aplikacji. | Status obcej rezerwacji nie ulega zmianie; model aktualizuje rekord wyłącznie dla właściciela przekazanego przez kontroler. | Do wykonania |
| T13 | CSRF – formularz POST bez tokenu | Wysłać żądanie POST do operacji wymagającej ochrony CSRF bez prawidłowego tokenu. | Żądanie zostaje odrzucone i dane rezerwacji nie zostają zmienione. | Do wykonania |
