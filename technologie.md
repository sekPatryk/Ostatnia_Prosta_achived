# Technologie – Ostatnia Prosta

Projekt „Ostatnia Prosta” korzysta z lekkiego stosu technologicznego, który umożliwia lokalne uruchomienie aplikacji bez zewnętrznego serwera bazodanowego.

## Backend

- **Python 3** – język implementacji.
- **Flask** – aplikacja webowa, routing i obsługa żądań HTTP.
- **Flask-WTF / CSRFProtect** – ochrona formularzy przed żądaniami CSRF.
- **SQLite / `sqlite3`** – lokalna baza danych obsługiwana przez standardowy moduł Pythona.

## Frontend

- **HTML5 i Jinja2** – struktura stron i szablony serwerowe.
- **CSS3** – style w `static/css/style.css`, w tym zmienne kolorystyczne dla obu motywów.
- **JavaScript** – `static/js/theme.js` obsługuje przełączanie motywu i jego preferencje.
- **SVG** – wektorowe logo w `static/img/logo.svg`.

W v2.0 interfejs pozostaje oparty na natywnych technologiach przeglądarkowych, bez zewnętrznego frameworka frontendowego. Ręczny wybór motywu jasnego/ciemnego jest przechowywany w `localStorage`; gdy brak ręcznego wyboru, aplikacja respektuje `prefers-color-scheme`.

## Baza danych

Plik bazy danych znajduje się w `instance/ostatnia_prosta.db`. Obecny schemat zawiera tabele `uzytkownik`, `sala` i `rezerwacja`. Wersja v2.0 nie wprowadzała zmian w strukturze tych tabel.

## Kontrola wersji

- **Git** – lokalna kontrola wersji.
- **GitHub** – zdalne repozytorium projektu.

## Zakres wersji

Funkcje rezerwacji F01–F03 stanowią aktualny zakres aplikacji. Panel administracyjny F04 oraz cyfrowe epitafium i kod QR F05 są planowane na v3.0; ich realizacja może wymagać rozszerzenia schematu bazy i mechanizmu uwierzytelniania.
