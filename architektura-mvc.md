# Architektura MVC – Ostatnia Prosta

Projekt **Ostatnia Prosta** jest aplikacją webową napisaną w Pythonie z użyciem Flask, Jinja2 i SQLite. Architektura MVC (Model–View–Controller) oddziela operacje na danych, obsługę żądań HTTP i prezentację interfejsu.

## Model (Model)

Model znajduje się w katalogu `models/`, przede wszystkim w pliku `rezerwacja.py`.

Odpowiada za:
- pobieranie listy kaplic i rezerwacji z bazy SQLite;
- sprawdzanie dostępności kaplicy w wybranym przedziale czasu;
- dodawanie rezerwacji i kontrolę konfliktów czasowych;
- pobieranie rezerwacji użytkownika;
- anulowanie rezerwacji należącej do danego użytkownika.

Model zawiera zapytania SQL i reguły dotyczące danych rezerwacji. Kontrola nakładania się aktywnych terminów znajduje się w modelu, a nie w kontrolerze lub szablonie.

## Widok (View)

Widoki znajdują się w katalogu `templates/rezerwacje/`:
- `W01_lista_kaplic.html` – lista kaplic i zajętych terminów;
- `W02_formularz_rezerwacji.html` – formularz tworzenia rezerwacji;
- `W03_moje_rezerwacje.html` – lista rezerwacji użytkownika i formularze anulowania;
- `baza.html` – wspólny szablon strony, nawigacja, logo, komunikaty i przełącznik motywu.

Widoki odpowiadają za prezentację danych i formularzy. Nie wykonują zapytań SQL ani nie rozstrzygają reguł biznesowych.

## Kontroler (Controller)

Kontroler znajduje się w `controllers/rezerwacje.py`. Jest to Blueprint Flask obsługujący ścieżki związane z rezerwacjami.

Odpowiada za:
- odbieranie żądań HTTP;
- pobieranie i walidowanie danych z formularzy;
- wywoływanie odpowiednich metod modelu;
- przekazywanie danych do szablonów;
- przekierowania i komunikaty dla użytkownika.

Plik `app.py` tworzy aplikację Flask, konfiguruje ochronę CSRF, rejestruje Blueprint i inicjalizuje bazę danych. `database.py` odpowiada za połączenie SQLite, włączenie kluczy obcych i utworzenie tabel/danych demonstracyjnych.

## Baza danych

Baza jest przechowywana lokalnie w `instance/ostatnia_prosta.db`. Aktualny schemat v1/v2 zawiera trzy tabele:

- `uzytkownik` – dane użytkownika;
- `sala` – dane kaplic/sal, w tym nazwa, opis, pojemność i informacja o aktywności;
- `rezerwacja` – użytkownik, sala, data, godzina rozpoczęcia, godzina zakończenia i status (`aktywna` lub `anulowana`).

W v2 schemat tabel nie został rozszerzony. Ewentualne tabele dla F04/F05 należą do planowania i migracji w v3.

## Zasoby statyczne

Katalog `static/` zawiera zasoby wykorzystywane przez warstwę widoku:
- `static/css/style.css` – układ strony, komponenty oraz kolory motywu jasnego i ciemnego;
- `static/js/theme.js` – przełączanie motywu, zapis wyboru w `localStorage` i obsługa preferencji systemowej;
- `static/img/logo.svg` – wektorowe logo projektu.

CSS i JavaScript nie zastępują kontrolera ani modelu. Motyw jest ustawieniem prezentacji po stronie przeglądarki i nie wymaga zmian w bazie danych.

## Ograniczenie aktualnego prototypu

Kontroler używa stałej `DEMO_USER_ID = 1`. Funkcja F03 działa z perspektywy użytkownika demonstracyjnego, ale projekt nie ma jeszcze pełnego logowania ani systemu ról. Nie należy utożsamiać tego rozwiązania z produkcyjnym uwierzytelnianiem.

## Przepływ działania

Przykładowy przepływ utworzenia rezerwacji:

1. Użytkownik otwiera formularz w przeglądarce.
2. Kontroler obsługuje żądanie i wyświetla widok formularza.
3. Użytkownik przesyła formularz.
4. Kontroler sprawdza poprawność danych wejściowych.
5. Model sprawdza dostępność kaplicy i zapisuje rezerwację w SQLite, jeśli termin nie koliduje z inną aktywną rezerwacją.
6. Kontroler przekazuje komunikat i przekierowuje użytkownika do odpowiedniego widoku.

Szczegółowe przepływy funkcji F01–F03 i ustawienia motywu opisano w [przeplywy.md](przeplywy.md).

## Zakres wersji

- **v1.0:** podstawowe funkcje rezerwacji F01–F03.
- **v2.0:** zmiany w warstwie prezentacji — styl monochromatyczny, motyw jasny/ciemny, logo SVG i dokumentacja. Logika F01–F03 i schemat bazy pozostały bez zmian.
- **v3.0 (plan):** F04 — panel administracyjny i zarządzanie pakietami usług; F05 — cyfrowe epitafium i kod QR. Te funkcje nie są obecnie częścią kodu.
