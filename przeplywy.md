# Przepływy użytkownika – Ostatnia Prosta

Dokument opisuje przepływy dostępne w obecnej implementacji v2.0. Funkcje F04 i F05 są planowane na v3.0; nie mają jeszcze działających przepływów w aplikacji.

## F01 – przeglądanie kaplic i dostępności

1. Użytkownik otwiera stronę główną (`/`), która przekierowuje do `/rezerwacje/`.
2. Kontroler pobiera datę z parametru `data`; jeśli parametr jest niepoprawny, pokazuje komunikat i przyjmuje datę bieżącą.
3. Model pobiera aktywne kaplice oraz aktywne rezerwacje dla wybranej daty.
4. Widok `W01_lista_kaplic.html` prezentuje kaplice, pojemność i zajęte przedziały godzin.
5. Użytkownik może przejść z karty kaplicy do formularza nowej rezerwacji; wybrana kaplica i data są przekazane w parametrach URL.

## F02 – tworzenie rezerwacji

1. Użytkownik otwiera `/rezerwacje/nowa` – opcjonalnie z parametrami `id_sali` i `data`.
2. Kontroler pobiera aktywne kaplice i wyświetla `W02_formularz_rezerwacji.html`.
3. Użytkownik wybiera kaplicę, datę oraz godziny rozpoczęcia i zakończenia.
4. Po wysłaniu formularza kontroler waliduje identyfikator kaplicy, format daty, brak daty z przeszłości, format godzin i kolejność godzin.
5. Model weryfikuje istnienie użytkownika i aktywnej kaplicy, sprawdza konflikt z aktywnymi rezerwacjami tej samej kaplicy i daty, a następnie zapisuje rekord.
6. Jeśli zapis się powiedzie, kontroler pokazuje komunikat i przekierowuje do `/rezerwacje/moje`. W przypadku błędu formularz jest wyświetlany ponownie z zachowanymi wartościami.

Dwa przedziały godzinowe kolidują, gdy istniejący początek jest wcześniejszy niż nowy koniec, a istniejący koniec jest późniejszy niż nowy początek. Przedziały stykające się końcem i początkiem nie są konfliktem.

**Uwaga dotycząca formatu godziny:** formularz korzysta z natywnego `<input type="time">`. Przeglądarka może wyświetlać selektor w formacie 12- lub 24-godzinnym zależnie od ustawień regionalnych. Wartość przesyłana do aplikacji ma format `HH:MM`; atrybuty `step` i `value` nie wymuszają wizualnego formatu 24-godzinnego.

## F03 – przeglądanie i anulowanie własnych rezerwacji

1. Użytkownik otwiera `/rezerwacje/moje`.
2. Kontroler przekazuje do modelu identyfikator użytkownika demonstracyjnego (`DEMO_USER_ID = 1`).
3. Model pobiera rezerwacje tego użytkownika, a widok `W03_moje_rezerwacje.html` wyświetla ich daty, godziny, kaplice i statusy.
4. Przy aktywnej rezerwacji użytkownik może wysłać formularz anulowania metodą POST.
5. Kontroler przekazuje identyfikator rezerwacji oraz identyfikator użytkownika do modelu.
6. Model zmienia status wyłącznie wtedy, gdy rezerwacja należy do wskazanego użytkownika i jest aktywna. Rekord pozostaje w bazie ze statusem `anulowana`.
7. Kontroler pokazuje komunikat i wraca do listy rezerwacji.

## Zmiana motywu – interfejs v2.0

1. Podczas ładowania strony `static/js/theme.js` odczytuje zapisany wybór z `localStorage` (klucz `ostatnia-prosta-theme`).
2. Gdy zapisano `light` lub `dark`, stosowany jest zapisany motyw.
3. Gdy nie ma poprawnego zapisu, aplikacja odczytuje preferencję systemową `prefers-color-scheme`.
4. Użytkownik może użyć przełącznika w nagłówku. Wybór zmienia atrybut `data-theme` elementu `html` i jest zapisywany w `localStorage`.
5. Ręczny wybór ma pierwszeństwo przed późniejszymi zmianami ustawień systemowych. Usunięcie zapisanego klucza przywraca automatyczny wybór na podstawie systemu.

Zmiana motywu działa po stronie przeglądarki. Nie wysyła żądania do kontrolera i nie modyfikuje bazy danych.

## F04 i F05 – planowane na v3.0

- **F04:** docelowy przepływ administratora do dodawania/edycji kaplic i zarządzania pakietami usług zostanie opisany po ustaleniu logowania, ról i zakresu uprawnień.
- **F05:** docelowy przepływ tworzenia epitafium i generowania kodu QR zostanie opisany po zaprojektowaniu modelu danych, zasad prywatności i sposobu publikacji.

Na tym etapie nie należy traktować tych punktów jako dostępnych ekranów lub endpointów.
