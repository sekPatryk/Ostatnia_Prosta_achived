# Prompty wykorzystane przy tworzeniu MVC v1.0

## Prompt 1

```
Jesteś doświadczonym programistą Pythona i Flaska. Przygotuj strukturę i kod dla pierwszej wersji (v1) projektu "Ostatnia Prosta" (system zarządzania usługami pogrzebowymi i rezerwacjami kaplic), z zachowaniem prostego podziału na architekturę MVC.

Cel v1: Użytkownik może sprawdzić dostępne terminy kaplic, zarezerwować termin i anulować własną rezerwację (dla użytkownika demonstracyjnego nr 1).
Stos technologiczny: Python 3, Flask, baza danych SQLite (z modułem sqlite3).

Zakres do wygenerowania:
Struktura katalogów dla projektu MVC (app.py, katalog models/, katalog controllers/, katalog templates/rezerwacje/).
Kod inicjalizujący bazę SQLite oraz schemat danych dla tabel: uzytkownik, sala (kaplica) oraz rezerwacja (z kluczami głównymi PK, obcymi FK i kontrolą kluczy obcych).
Kod modelu w models/rezerwacja.py obsługujący pobieranie danych, zapytania parametryzowane oraz podstawowe reguły biznesowe.
Kod kontrolera w controllers/rezerwacje.py (np. Blueprint we Flasku) obsługujący żądania GET i POST dla tras.

Szablony HTML w katalogu templates/rezerwacje/ dla widoków:
W01: Lista kaplic i terminów (z obsługą F01 – sprawdzenie dostępności).
W02: Formularz rezerwacji (z obsługą F02 – zapis nowego terminu z walidacją konfliktów czasowych).
W03: Panel „Moje rezerwacje” (z obsługą F03 – anulowanie rezerwacji przez użytkownika demo nr 1).

Plik requirements.txt oraz .gitignore dla środowiska wirtualnego i lokalnej bazy danych.
Zwróć pełny kod tworzonych plikóW, strukturę katalogów oraz jasną instrukcję uruchomienia aplikacji krok po kroku.
```
