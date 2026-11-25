# Mapa drogowa projektu – Ostatnia Prosta

Dokument rozróżnia zakres kolejnych wersji. Status „dostępne” oznacza funkcjonalność obecną w kodzie projektu; „planowane” nie oznacza implementacji.

## v1.0 – MVP rezerwacji

**Cel:** dostarczyć działający prototyp obsługi rezerwacji kaplic.

| ID | Funkcja | Zakres |
|---|---|---|
| F01 | Przeglądanie kaplic i dostępności | Lista kaplic oraz zajętych przedziałów godzin dla wybranej daty. |
| F02 | Rezerwowanie terminu | Formularz rezerwacji, walidacja danych oraz kontrola nakładania się aktywnych terminów tej samej kaplicy. |
| F03 | Moje rezerwacje | Lista rezerwacji użytkownika demonstracyjnego i anulowanie jego aktywnej rezerwacji. |

**Stan:** funkcje F01–F03 stanowią bazę działającego projektu. Obecna implementacja korzysta z konta demonstracyjnego o ID `1`, a nie z pełnego systemu logowania.

## v2.0 – modernizacja interfejsu i dokumentacji

**Cel:** poprawić wygląd i wygodę korzystania z aplikacji bez przebudowy logiki rezerwacji.

Zakres dodany w kodzie:

1. Monochromatyczny interfejs w odcieniach czerni, bieli i szarości.
2. Motyw jasny i ciemny z przełącznikiem w nagłówku.
3. Zapisywanie ręcznego wyboru motywu w `localStorage` (`ostatnia-prosta-theme`).
4. Dopasowanie do `prefers-color-scheme`, gdy użytkownik nie zapisał własnego wyboru.
5. Logo SVG przedstawiające drogę prowadzącą do uchylonej bramy i światła.
6. Wydzielenie CSS, JavaScriptu i grafiki do katalogu `static/`.
7. Uzupełnienie dokumentacji architektury, przepływów, technologii, testów i decyzji projektowych.

**Niezmieniony zakres:** funkcje F01–F03 oraz tabele `uzytkownik`, `sala` i `rezerwacja`. W v2 nie dodaje się panelu administracyjnego ani cyfrowych epitafiów.

## v3.0 – planowane rozszerzenia funkcjonalne

**Cel:** rozszerzyć aplikację poza podstawową obsługę rezerwacji. Funkcje poniżej nie są jeszcze zaimplementowane.

### F04 – panel administracyjny

Planowany zakres:

- dodawanie i edytowanie sal/kaplic;
- zarządzanie pakietami usług;
- określenie uprawnień administratora i zabezpieczenie operacji administracyjnych.

Przed implementacją trzeba doprecyzować, czy administrator będzie mógł również usuwać/dezaktywować sale i pakiety, jak pakiet będzie przypisywany do rezerwacji oraz jakie role będą dostępne.

### F05 – cyfrowe epitafium i kod QR

Planowany zakres:

- utworzenie cyfrowego epitafium powiązanego z rekordem zmarłego;
- wygenerowanie unikalnego kodu QR prowadzącego do strony epitafium;
- ustalenie, kto może tworzyć i edytować epitafia oraz kto może wyświetlać ich treść.

Przed implementacją trzeba zaprojektować model danych, publiczny/prywatny zakres informacji, sposób publikacji oraz docelowy adres kodu QR.

### Zagadnienia przekrojowe do rozstrzygnięcia przed v3

1. **Uwierzytelnianie i role:** obecnie aplikacja korzysta ze stałego `DEMO_USER_ID = 1`. Panel administracyjny wymaga odrębnego, bezpiecznego mechanizmu identyfikacji i autoryzacji.
2. **Baza danych:** F04/F05 prawdopodobnie będą wymagać dodatkowych tabel i relacji. Zmiany należy wprowadzić przez zaplanowaną migrację, bez przypadkowego naruszania istniejących rezerwacji.
3. **Prywatność:** dane epitafium mogą być wrażliwe dla rodzin; trzeba ustalić zakres publikowanych informacji i kontrolę dostępu.
4. **Testy:** przygotować scenariusze dla uprawnień administratora, operacji CRUD, powiązań danych i generowania/odczytu QR.

## Poza aktualnym zakresem

Na obecnym etapie projekt nie obejmuje:

- rzeczywistej obsługi płatności online;
- wysyłki powiadomień SMS/e-mail;
- pełnego systemu kont i logowania użytkowników;
- wdrożenia produkcyjnego i konfiguracji dla publicznego hostingu.

Są to potencjalne kierunki dalszego rozwoju, a nie obietnica zakresu v3.0.
