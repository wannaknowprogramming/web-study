# Лабораторная работа №1 — Nginx в Docker

## Запуск

```bash
docker compose up -d
```

После запуска откройте http://localhost:5143.

## Проверка

```bash
docker compose ps
docker compose exec web nginx -t
docker compose down
```

Папка `site` подключается с компьютера в контейнер как `/usr/share/nginx/html` в режиме чтения. Поэтому изменение HTML или CSS на компьютере видно после обновления страницы без пересборки образа.
