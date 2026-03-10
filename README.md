# Rolling Moto - Telegram Mini App

Мини-приложение для магазина мототехники в Telegram.

## 🚀 Запуск локально

### Способ 1: Python HTTP сервер
```bash
python -m http.server 8000
```
Откройте http://localhost:8000 в браузере.

### Способ 2: Node.js
```bash
npx serve .
```

### Способ 3: Live Server (VS Code)
Установите расширение Live Server и нажмите "Go Live".

## 📱 Тестирование в Telegram

### Шаг 1: Получите токен бота
1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot` и следуйте инструкциям
3. Сохраните полученный токен

### Шаг 2: Разместите приложение в интернете
Варианты:
- **GitHub Pages** (бесплатно): загрузите файлы в репозиторий → Settings → Pages → Deploy
- **Vercel** (бесплатно): загрузите проект на Vercel
- **Netlify** (бесплатно): загрузите проект на Netlify

### Шаг 3: Настройте Web App
В @BotFather отправьте:
```
/newapp
```
Выберите бота, введите название и URL вашего приложения.

### Шаг 4: Добавьте кнопку меню
В @BotFather:
```
/setmenubutton
```
Выберите бота, введите текст кнопки (например: "🛒 Каталог").

## 🔧 Интеграция с ботом

Для полноценной работы создайте бэкенд (пример на Python):

```python
import telebot
from telebot.types import WebAppInfo

bot = telebot.TeleBot('YOUR_BOT_TOKEN')

@bot.message_handler(commands=['start'])
def start(message):
    markup = telebot.types.InlineKeyboardMarkup()
    markup.add(telebot.types.InlineKeyboardButton(
        text='🛒 Открыть магазин',
        web_app=WebAppInfo(url='https://your-app-url.com')
    ))
    bot.send_message(message.chat.id, 'Добро пожаловать в Rolling Moto!', reply_markup=markup)

bot.infinity_polling()
```

## 📁 Структура проекта

```
rolling-moto/
├── index.html      # Главная страница
├── styles.css      # Стили (темная тема + оранжевый)
├── app.js          # Логика приложения
└── README.md       # Документация
```

## ✨ Функции

- 🏍️ Каталог мототехники (мотоциклы, скутеры, квадроциклы, запчасти)
- 🔍 Поиск и фильтрация по категориям
- 🛒 Корзина с подсчетом суммы
- ❤️ Избранные товары
- 👤 Профиль пользователя
- 📱 Адаптивный дизайн для Telegram
- 🌙 Темная тема с оранжевыми акцентами

## 🎨 Цветовая схема

- Основной фон: `#0d0d0d`
- Фон карточек: `#242424`
- Акцент: `#ff6b00` (оранжевый)
- Текст: `#ffffff` / `#a0a0a0`
