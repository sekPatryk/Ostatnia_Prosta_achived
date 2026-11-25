# Zasady pracy nad projektem Ostatnia Prosta

## Cel i aktualny stan

Ostatnia Prosta jest aplikacją webową do przeglądania dostępności kaplic oraz tworzenia, przeglądania i anulowania rezerwacji. Aktualna wersja projektu to **v2.0**. Działający zakres funkcjonalny obejmuje F01–F03; v2 wprowadza zmiany w warstwie prezentacji i dokumentacji.

Funkcje **F04 i F05 są planowane na v3.0**. Nie należy implementować ich jako części v2 ani opisywać jako funkcji już dostępnych.

## Technologie

- Python 3
- Flask i Jinja2
- SQLite przez standardowy moduł `sqlite3`
- HTML, CSS i JavaScript bez dodatkowego frameworka frontendowego
- SVG dla grafiki wektorowej

## Architektura i odpowiedzialność

- `models/` – zapytania SQL, dostęp do danych oraz reguły dotyczące rezerwacji i konfliktów terminów.
- `controllers/` – routing Flask, obsługa HTTP, walidacja danych wejściowych, komunikaty i przekazywanie danych do widoków.
- `templates/` – prezentacja danych i formularzy w Jinja2; szablony nie wykonują zapytań SQL i nie implementują reguł biznesowych.
- `static/` – zasoby frontendowe: arkusze CSS, JavaScript i grafiki.
- `database.py` – połączenie SQLite i inicjalizacja bazy danych.
- `app.py` – konfiguracja i uruchomienie aplikacji Flask, rejestracja Blueprintów i ochrona CSRF.

## Niezmienniki v1/v2

1. Zachowuj funkcjonalności F01 (lista kaplic i dostępność), F02 (tworzenie rezerwacji) i F03 (lista oraz anulowanie własnych rezerwacji).
2. Zachowuj tabele `uzytkownik`, `sala` i `rezerwacja`, ich nazwy kolumn, klucze obce i ograniczenia, chyba że osobne zadanie wyraźnie zatwierdzi migrację.
3. Nie przenoś zapytań SQL ani reguł biznesowych do kontrolerów lub szablonów.
4. Zachowuj nazwy endpointów, nazwy pól formularzy i ochronę CSRF, jeśli zmiana nie jest wymagana przez zatwierdzony zakres.
5. Anulowanie musi nadal dotyczyć wyłącznie rezerwacji użytkownika, który ją posiada.
6. Konflikt czasu dotyczy aktywnych rezerwacji tej samej kaplicy i daty; stykające się przedziały nie są konfliktem.
7. Obecny kod używa użytkownika demonstracyjnego o ID `1`. Nie przedstawiaj tego mechanizmu jako pełnego logowania ani autoryzacji.
8. Zmiany v2 w CSS, JavaScript i szablonach nie powinny naruszać logiki F01–F03.

## Frontend

- Utrzymuj wspólną strukturę strony w `templates/rezerwacje/baza.html`.
- Style trzymaj w `static/css/`, skrypty w `static/js/`, grafiki w `static/img/`.
- Motyw jasny/ciemny opieraj na atrybucie `data-theme` elementu `html` i zmiennych CSS.
- Preferencja ręczna użytkownika ma być zapisana w `localStorage`; brak zapisanej preferencji oznacza użycie `prefers-color-scheme`.
- Zapewnij widoczny fokus klawiatury, semantyczne elementy HTML i czytelność na wąskich ekranach.
- Nie dodawaj frameworków frontendowych bez osobnej decyzji projektowej.
- Natywne pole `input type="time"` może wyświetlać AM/PM zależnie od przeglądarki i ustawień regionalnych. `step` ani `value` nie wymuszają formatu wizualnego. Nie deklaruj, że v2 gwarantuje wizualny format 24-godzinny.

## Plan v3

- F04: panel administracyjny do dodawania i edycji sal/kaplic oraz zarządzania pakietami usług.
- F05: cyfrowe epitafium i generowanie unikalnego kodu QR powiązanego z rekordem zmarłego.
- Przed implementacją v3 uzgodnij uwierzytelnianie, role i uprawnienia, model danych, migracje SQLite, prywatność epitafiów oraz docelowe adresy kodów QR.
- Nie dodawaj tabel ani endpointów F04/F05 bez zatwierdzonego zakresu i opisu zmian.

## Dokumentacja i testowanie

- Aktualizuj dokumentację `.md`, gdy zmienia się architektura, przepływ, zakres wersji lub istotna decyzja techniczna.
- `README.md` i `docs/roadmap.md` muszą rozróżniać funkcje dostępne od planowanych.
- Nie oznaczaj scenariusza testowego jako „Działa”, jeśli nie został wykonany.
- Nie usuwaj historycznych wyników testów bez uzgodnienia; nie dopisuj wyników, których nie potwierdzono.
- Przy zmianach funkcjonalnych dodaj lub zaktualizuj odpowiednie scenariusze testowe.

## Uruchomienie lokalne

```powershell
python -m venv .venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Aplikacja jest dostępna pod `http://127.0.0.1:5000`.
