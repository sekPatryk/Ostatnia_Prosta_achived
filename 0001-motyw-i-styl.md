# ADR 0001 – Monochromatyczny interfejs i preferencja motywu

- **Status:** zaakceptowana w ramach zakresu v2.0
- **Data:** 2026-11-25
- **Zakres:** warstwa prezentacji

## Kontekst

Wersja 1.0 używała stylów zapisanych bezpośrednio w szablonie bazowym i miała ograniczoną, statyczną kolorystykę. Wersja 2.0 wymaga spójnego interfejsu monochromatycznego oraz możliwości wyboru trybu jasnego i ciemnego.

## Decyzja

1. Style zostają przeniesione do `static/css/style.css`.
2. Motyw jest określany przez `data-theme="light"` lub `data-theme="dark"` na elemencie `html`; kolory są definiowane przez zmienne CSS.
3. Preferencja ręczna jest zapisywana w `localStorage` pod kluczem `ostatnia-prosta-theme`.
4. Jeśli użytkownik nie zapisał własnego wyboru, domyślny motyw wynika z `prefers-color-scheme`.
5. Skrypt ustawia motyw przed załadowaniem arkusza CSS, aby ograniczyć migotanie przy inicjalizacji strony.
6. Logo jest wektorowym plikiem `static/img/logo.svg`. Wykorzystuje `currentColor`, aby dopasowywać się do obu motywów.
7. Nie wprowadzamy biblioteki CSS ani frameworka JavaScript.

## Konsekwencje

- Motyw działa po stronie klienta i nie wymaga zmian w tabelach SQLite ani w kontrolerach.
- Wybór użytkownika jest zachowywany w obrębie tej samej przeglądarki i profilu.
- Wyczyśczenie klucza `ostatnia-prosta-theme` przywraca automatyczne dopasowanie do preferencji systemowej.
- Jeśli przeglądarka blokuje `localStorage`, przełączanie działa w bieżącej karcie, ale wybór może nie przetrwać ponownego otwarcia strony.
- Testy ręczne obejmujące oba motywy i preferencję systemową zostały dodane do `docs/testy.md`.
