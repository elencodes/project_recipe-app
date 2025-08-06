<div id="header">
<h1>YeeDaa - an application for creating step-by-step recipes</h1>
	<p>A Single Page Application  (SPA) using the Google Books API allows you to find books based on various criteria (title, author, keyword) and get detailed information about them, including covers, genres and annotations. Built using Typescript, React and Redux.</p>
<h2>Application link:</h2>
<a href="https://elencodes.github.io/project_recipe-app/">YeeDaa</a>
<h2>Used technologies:</h2>
	<ul type="circle" id=technologies>
		<li><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></li>
		<li><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"></li>
		<li><img src="https://img.shields.io/badge/redux%20toolkit-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"></li>
		<li><img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white"></li>
		<li><img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)"></li>
        <li><img src="https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e"></li>
        <li><img src="https://img.shields.io/badge/vite-%23CCD3FF?style=for-the-badge&logo=vite&logoColor=%23FFB600&color=%23827FFF"></li>
		<li><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"></li>
		<li><img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white"></li>
	</ul>
<h2>Application functionality:</h2>
<ul>
  <li>The "Library" page will display the top 100 books by default. Books are cards derived from the book cover image, book title and author name. A book card can be added to favorites or removed from the screen if it is not interesting.</li>
  <li>Using the search bar, you can find the books or authors you are interested in. You can search in both English and Russian. The maximum number of search results returned is 30.</li>
  <li>To optimize data loading from the server and sequential display of content, page-by-page pagination is used (step is 10 cards).</li>
  <li>Filtering has been implemented: to view all book cards ("All books"), added to favorites ("Favorites") and created book cards ("New books"). The "All books" filter is set by default.</li>
  <li>When you click on the card, the "Book Page" opens with its data: cover, title, all genres, all authors, description. The function of adding to favorites and deleting is also available.</li>
  <li>On the "Add Book Page", a form of adding a new book to the library has been implemented (with validation hints for correct data entry). When a card is successfully added, a notification appears, and the card itself can be found on the "Library" page in the active filter "New books".</li>
</ul>
<h2>Developed by:</h2> 
<div id=bages>
	<p><a href="https://github.com/elencodes"><img src="https://img.shields.io/badge/ELENA-2E2844?style=for-the-badge&logo=github"></a></p>
  <p>Contacts: <a href="https://t.me/elencodes">Telegram</a> | <a href="mailto:esadikova.codes@gmail.com">E-mail</a></p>
</div>

---

## Обращаем внимание на то, что для корректного запуска проекта версия ноды должна быть не ниже 20

---

## Установка Node.js, npm, nvm, Yarn

Эта инструкция предоставляет пошаговое руководство по установке Node.js, npm, nvm (Node Version Manager) и Yarn на вашем компьютере.

#### 1. Установка Node.js с помощью nvm (Node Version Manager)

---

**Windows:**

Скачайте и установите [nvm-windows](https://github.com/coreybutler/nvm-windows).

Откройте терминал (например, Command Prompt или PowerShell) и выполните команду:<br>
`nvm install latest`

---

**macOS:**

Установите nvm через Homebrew:
`brew install nvm`

Добавьте следующую строку в ваш файл ~/.bashrc, ~/.bash_profile или ~/.zshrc:
`export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`

Используйте ~/.bash_profile или ~/.zshrc, если у вас есть Zsh.

В новом терминале выполните:
`nvm install node`

#### 2. Установка Yarn

Установка через npm (пакетный менеджер Node.js)
`npm install -g yarn`

| Проверьте версии установленных компонентов | Описание                               |
| ------------------------------------------ | -------------------------------------- |
| `node -v`                                  | `Выведет установленную версию Node.js` |
| `npm -v`                                   | `Выведет установленную версию npm`     |
| `nvm -v`                                   | `Выведет установленную версию nvm`     |
| `yarn -v`                                  | `Выведет установленную версию Yarn`    |

---

#### 3. Установка и запуска проекта

| Установка и запуска проекта | Описание                                                                                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node -v`                   | `Проверьте, что у вас надлежащая версия ноды. Если версия ноды ниже 20, то выполните 2 инструкции ниже. Если всё ок - переходи к установке зависимостей проекта` |
| `nvm install 22.8.0`        | `Установить версию Node.js 22.8.0 с использованием Node Version Manager (nvm)`                                                                                   |
| `nvm use 22.8.0`            | `Активировать установленную версию Node.js 22.8.0`                                                                                                               |
| `yarn install`              | `Установить зависимости проекта с помощью Yarn`                                                                                                                  |
| `yarn start`                | `Запустить проект`                                                                                                                                               |

---

| Основные команды | Описание                             |
| ---------------- | ------------------------------------ |
| `yarn start`     | `Запуск проекта`                     |
| `yarn build`     | `Сборка проекта`                     |
| `lint:fix`       | `Запуск esline для для ts(x) файлов` |
| `yarn cy:e2e`    | `Запуск e2e тестов cypress`          |

---
