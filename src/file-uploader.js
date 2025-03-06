class FileUploader extends HTMLElement {
  constructor() {
    super();
    // Создаем Shadow DOM для изоляции стилей и разметки компонента
    this.attachShadow({ mode: 'open' });
    // Вызываем метод для рендеринга начального содержимого
    this.render();
  }

  // Метод для рендеринга HTML и CSS компонента
  render() {
    // Устанавливаем содержимое Shadow DOM, включая стили и разметку
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: 100vh;
        }
        .upload-container {
          box-sizing: border-box;
          width: 302px;
          height: 479px; /* Исходная высота окна */
          background: linear-gradient(to bottom, #5F5CF0, #DDDCFC, #FFFFFF);
          border-radius: 16px;
          padding: 12px 13px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
          position: relative;
          transition: background 0.3s ease, height 0.3s ease; /* Плавный переход для высоты */
        }
        .upload-container.response {
          height: 230px;
          box-sizing: border-box;
          width: 302px;
          border-radius: 22px;
          padding: 7px 13px;
          background: linear-gradient(180deg, #5F5CF0 0%, #8F8DF4 100%);
        }
        .window {
          width: 277px;
          height: 457px; /* Изменяем на 230px при отображении response */
        }
        .window.response {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          height: 206px; /* 230px - (12px + 12px) padding от upload-container */
        }
        .close-btn {
          width: 34px;
          height: 34px;
          border-radius: 17px;
          padding: 3px;
          background: #CCCCCE47;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 8px;
          right: 8px;
        }
        .close-btn img {
          width: 20px;
          height: 20px;
        }
        .main-wrapper {
          width: 277px;
          height: 426px;
          margin-top: 25px;
        }
        .title {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 7px;
          width: 277px;
          height: 48px;
        }
        .title h1 {
          font-family: Inter;
          font-weight: 600;
          font-size: 20px;
          line-height: 24.2px;
          text-align: center;
          color: #FFFFFF;
          margin: 0;
        }
        .title h2 {
          font-family: Inter;
          font-weight: 300;
          font-size: 14px;
          line-height: 16.94px;
          text-align: center;
          color: #FFFFFF;
          margin: 0;
        }
        .input-container {
          display: flex;
          align-items: center;
          background: #F0F0FF;
          border-radius: 8px;
          padding: 8px;
          margin: 10px 0;
          width: 277px;
          height: 35px;
          box-sizing: border-box;
        }
        .input-container.hidden {
          display: none;
        }
        .input-container input {
          font-family: Inter;
          font-weight: 500;
          font-size: 17.5px;
          line-height: 21.18px;
          border: none;
          outline: none;
          flex: 1;
          background: transparent;
          color: #5F5CF0;
        }
        .input-container input::placeholder {
          font-family: Inter;
          font-weight: 500;
          font-size: 17.5px;
          line-height: 21.18px;
          letter-spacing: 0%;
          color: #A5A5A5;
        }
        .clear-btn {
          width: 16.67px;
          height: 16.67px;
          background: url('images/clear-input-button.svg') no-repeat center;
          background-size: cover;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease; /* Плавный переход для изменения иконки */
        }
        .clear-btn.blue {
          background: url('images/clear-input-button-blue.svg') no-repeat center;
          background-size: cover;
        }
        .upload-area {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 277px;
          height: 257px;
          border-radius: 30px;
          border: 1px solid #A5A5A5;
          cursor: pointer;
          font-size: 14px;
          background: #F0F0FF;
          position: relative;
          transition: border-color 0.3s ease;
          margin: 10px 0;
        }
        .upload-area.uploading {
          pointer-events: none;
          opacity: 0.7;
        }
        .upload-window-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 221px;
          height: 175.76px;
        }
        .upload-window-content p {
          width: 75%;
          font-family: Inter;
          font-weight: 400;
          font-size: 14px;
          line-height: 16.94px;
          text-align: center;
          color: #5F5CF0;
          margin: 0;
          margin-top: 10px;
        }
        .progress-container {
          display: none;
          flex-direction: column;
          align-items: flex-start;
          padding: 3px;
          gap: 10px;
          width: 277px;
          height: 35px;
          background: #F1F1F1;
          border: 1px solid #A5A5A5;
          border-radius: 10px;
          box-sizing: border-box;
          flex: none;
          order: 2;
          align-self: stretch;
          flex-grow: 0;
          margin: 10px 0;
        }
        .progress-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 14px;
          width: 267.86px;
          height: 28px;
          flex: none;
          order: 0;
          flex-grow: 0;
        }
        .progress-container .file-icon {
          width: 37px;
          height: 28px;
          background: #5F5CF0;
          border-radius: 10px;
          flex: none;
          order: 0;
          flex-grow: 0;
        }
        .progress-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 6px;
          width: 182px;
          height: 24px;
          flex: none;
          order: 1;
          flex-grow: 0;
        }
        .progress-header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0px;
          gap: 79px;
          width: 182px;
          height: 12px;
          flex: none;
          order: 0;
          align-self: stretch;
          flex-grow: 0;
        }
        .progress-container p.file-name {
          width: 75px;
          height: 12px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 10px;
          line-height: 12px;
          color: #5F5CF0;
          margin: 0;
          flex: none;
          order: 0;
          flex-grow: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .progress-percentage {
          width: 26px;
          height: 12px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 10px;
          line-height: 12px;
          text-align: right;
          color: #5F5CF0;
          margin: 0;
          flex: none;
          order: 1;
          flex-grow: 0;
        }
        .progress-bar-container {
          position: relative;
          width: 182px;
          height: 6px;
          flex: none;
          order: 1;
          align-self: stretch;
          flex-grow: 0;
        }
        .progress-bar-background {
          position: absolute;
          width: 182px;
          height: 5px;
          left: 0px;
          top: 0.5px;
          background: #FFFFFF;
          border-radius: 10px;
        }
        .progress {
          position: absolute;
          width: 3px;
          height: 4px;
          left: 1px;
          top: 1px;
          background: #5F5CF0;
          border-radius: 10px;
          transition: width 0.1s linear;
        }
        .progress-container .clear-progress {
          width: 14.75px;
          height: 14.75px;
          background: url('/images/clear-upload.svg') no-repeat center;
          background-size: cover;
          border: none;
          border-radius: 42.6667px;
          cursor: pointer;
          flex: none;
          order: 2;
          flex-grow: 0;
        }
        .button {
          background: #BBB9D2;
          color: #FFFFFF;
          border: none;
          padding: 12px;
          border-radius: 30px;
          cursor: not-allowed;
          width: 277px;
          height: 56px;
          font-family: Inter;
          font-weight: 500;
          font-size: 20px;
          line-height: 24.2px;
          transition: background 0.3s ease, cursor 0.3s ease;
        }
        .button.active {
          background: #5F5CF0;
          cursor: pointer;
        }
        .button.uploading {
          pointer-events: none;
          opacity: 0.7;
        }
        .error {
          color: #FF5555;
          font-family: Inter;
          font-weight: 400;
          font-size: 14px;
          line-height: 16.94px;
          margin-top: 5px;
        }
        .response-container {
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          height: 100%; /* Занимает всю доступную высоту .window */
          text-align: center;
          overflow-y: auto; /* Добавляем прокрутку, если содержимое не помещается */
          margin-top: 30px;
        }
        .response-container h1 {
          font-family: Inter;
          font-weight: 600;
          font-size: 20px;
          line-height: 24.2px;
          color: #FFFFFF;
          margin: 10px 0;
        }
        .response-container p {
          font-family: Inter;
          font-weight: 300;
          font-size: 14px;
          line-height: 16.94px;
          color: #FFFFFF;
          margin: 0;
        }
        .upload-container.response.error-response {
          background: linear-gradient(180deg, #F05C5C 0%, #8F8DF4 100%);
        }
      </style>
      <div class="upload-container">
        <div class="window">
          <!-- Кнопка для закрытия окна загрузки -->
          <button class="close-btn"><img src="/images/close-upload-window.svg" alt="close" /></button>
          <div class="main-wrapper">
            <!-- Заголовок и подзаголовок окна загрузки -->
            <div class="title">
              <h1>Загрузочное окно</h1>
              <h2 class="subtitle">Перед загрузкой дайте имя файлу</h2>
            </div>
            <!-- Поле для ввода имени файла -->
            <div class="input-container">
              <input type="text" id="filename" placeholder="Название файла"/>
              <button class="clear-btn"></button>
            </div>
            <!-- Область для перетаскивания файла -->
            <div class="upload-area">
              <div class="upload-window-content">
                <img src="/images/docs pic.svg" alt="docs" />
                <p>Перенесите ваш файл в область ниже</p>
              </div>
              <div class="file-info"></div>
              <div class="error"></div>
            </div>
            <!-- Контейнер для отображения прогресса загрузки -->
            <div class="progress-container">
              <div class="progress-inner">
                <div class="file-icon"></div>
                <div class="progress-content">
                  <div class="progress-header">
                    <p class="file-name"></p>
                    <p class="progress-percentage">0%</p>
                  </div>
                  <div class="progress-bar-container">
                    <div class="progress-bar-background"></div>
                    <div class="progress"></div>
                  </div>
                </div>
                <button class="clear-progress"></button>
              </div>
            </div>
            <!-- Кнопка для отправки файла на сервер -->
            <button class="button" disabled>Загрузить</button>
          </div>
          <!-- Контейнер для отображения результата загрузки -->
          <div class="response-container">
            <h1></h1>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    `;

    // Инициализируем события для компонента
    this.initEvents();
  }

  // Метод для добавления событий и логики взаимодействия
  initEvents() {
    // Выбираем элементы DOM для дальнейшей работы
    const uploadArea = this.shadowRoot.querySelector('.upload-area'); // Область для перетаскивания файла
    const inputFile = this.shadowRoot.querySelector('#filename'); // Поле ввода имени файла
    const subtitle = this.shadowRoot.querySelector('.subtitle'); // Подзаголовок для изменения текста
    const clearBtn = this.shadowRoot.querySelector('.clear-btn'); // Кнопка очистки поля ввода
    const fileInfo = this.shadowRoot.querySelector('.file-info'); // Информация о файле (пока не используется)
    const errorBox = this.shadowRoot.querySelector('.error'); // Контейнер для отображения ошибок
    const uploadButton = this.shadowRoot.querySelector('.button'); // Кнопка для загрузки файла
    const progressContainer = this.shadowRoot.querySelector('.progress-container'); // Контейнер прогресс-бара
    const progressBar = this.shadowRoot.querySelector('.progress'); // Заполнение прогресс-бара
    const progressPercentage = this.shadowRoot.querySelector('.progress-percentage'); // Процент прогресса
    const fileNameDisplay = this.shadowRoot.querySelector('.file-name'); // Имя загружаемого файла
    const clearProgressBtn = this.shadowRoot.querySelector('.clear-progress'); // Кнопка очистки прогресса
    const mainWrapper = this.shadowRoot.querySelector('.main-wrapper'); // Основной контейнер содержимого
    const responseContainer = this.shadowRoot.querySelector('.response-container'); // Контейнер результата загрузки
    const uploadContainer = this.shadowRoot.querySelector('.upload-container'); // Главный контейнер окна
    const windowElement = this.shadowRoot.querySelector('.window'); // Внутренний контейнер окна
    const inputContainer = this.shadowRoot.querySelector('.input-container'); // Контейнер с полем ввода
    const closeBtn = this.shadowRoot.querySelector('.close-btn'); // Кнопка закрытия окна с ответом от сервера
    const errorDiv = this.shadowRoot.querySelector('.error'); // Контейнер для отображения ошибок

    // Переменные для хранения состояния
    let selectedFile = null; // Переменная для хранения выбранного файла
    let progressInterval = null; // Переменная для хранения интервала анимации прогресса

    // Добавляем обработчик для кнопки закрытия окна с ответом от сервера
    closeBtn.addEventListener('click', () => {
      // Скрываем контейнер с ответом
      responseContainer.style.display = 'none';
      // Показываем контейнер загрузки
      mainWrapper.style.display = 'block';
      // Делаем цвет кнопки инпута по умолчанию
      clearBtn.classList.remove('blue'); 
      // Скрываем контейнер с ошибкой
      errorDiv.style.display = 'none';
      // Скрываем прогресс-бар
      progressContainer.style.display = 'none';
      // Восстанавливаем высоту окна и внутреннего контейнера
      uploadContainer.classList.remove('response');
      windowElement.classList.remove('response');
      // Сбрасываем подзаголовок
      subtitle.textContent = 'Перед загрузкой дайте имя файлу';
      // Очищаем отображение имени файла
      fileNameDisplay.textContent = '';
      // Сбрасываем все поля ввода и настройки
      inputFile.value = '';
      uploadButton.disabled = true;
      uploadButton.classList.remove('active');
      inputContainer.classList.remove('hidden');
    });

    // Слушатель события для изменения текста в инпуте
    inputFile.addEventListener('input', () => {
      // Если в инпуте есть текст, меняем подзаголовок и иконку крестика
      if (inputFile.value.trim()) {
        subtitle.textContent = 'Перенесите ваш файл в область ниже';
        clearBtn.classList.add('blue'); // Добавляем класс для синей иконки
      } else {
        // Если инпут пуст, возвращаем начальный текст и исходную иконку
        subtitle.textContent = 'Перед загрузкой дайте имя файлу';
        clearBtn.classList.remove('blue'); // Удаляем класс синей иконки
      }
    });

    // Слушатель события для очистки поля ввода имени файла
    clearBtn.addEventListener('click', () => {
      // Очищаем значение поля ввода
      inputFile.value = '';
      // Отключаем кнопку загрузки, так как имя файла удалено
      uploadButton.disabled = true;
      // Удаляем класс активности у кнопки загрузки
      uploadButton.classList.remove('active');
      // Возвращаем начальный текст подзаголовка
      subtitle.textContent = 'Перед загрузкой дайте имя файлу';
      // Возвращаем исходную иконку крестика
      clearBtn.classList.remove('blue');
    });

    // Слушатель события для очистки прогресс-бара и выбранного файла
    clearProgressBtn.addEventListener('click', () => {
      // Сбрасываем выбранный файл
      selectedFile = null;
      // Скрываем прогресс-бар
      progressContainer.style.display = 'none';
      // Сбрасываем ширину прогресс-бара до начального значения
      progressBar.style.width = '3px';
      // Сбрасываем процент прогресса
      progressPercentage.textContent = '0%';
      // Очищаем отображение имени файла
      fileNameDisplay.textContent = '';
      // Отключаем кнопку загрузки, так как файл удален
      uploadButton.disabled = true;
      // Удаляем класс активности у кнопки загрузки
      uploadButton.classList.remove('active');
      // Останавливаем анимацию прогресса, если она запущена
      if (progressInterval) clearInterval(progressInterval);
      // Показываем контейнер ввода снова, когда прогресс очищен
      inputContainer.classList.remove('hidden');
      // Возвращаем текст "Перенесите ваш файл в область ниже" после очистки прогресса
      subtitle.textContent = 'Перенесите ваш файл в область ниже';
    });

    // Эффект перетаскивания над областью загрузки (визуальная подсказка)
    uploadArea.addEventListener('dragover', (e) => {
      // Проверяем, введено ли имя файла
      if (!inputFile.value.trim()) {
        // Если имя не введено, показываем алерт и прерываем событие
        alert('Дайте имя файлу');
        e.preventDefault();
        return;
      }
      // Отменяем стандартное поведение браузера для корректной обработки перетаскивания
      e.preventDefault();
      // Меняем цвет границы для визуального эффекта
      uploadArea.style.borderColor = '#5060ff';
    });

    // Эффект ухода курсора с области загрузки (возвращаем стандартный цвет границы)
    uploadArea.addEventListener('dragleave', () => {
      // Возвращаем исходный цвет границы
      uploadArea.style.borderColor = '#A5A5A5';
    });

    // Обработка события сброса файла в область загрузки (drag-and-drop)
    uploadArea.addEventListener('drop', (e) => {
      // Проверяем, введено ли имя файла
      if (!inputFile.value.trim()) {
        // Если имя не введено, показываем алерт и прерываем событие
        alert('Дайте имя файлу');
        e.preventDefault();
        return;
      }
      // Отменяем стандартное поведение браузера
      e.preventDefault();
      // Возвращаем исходный цвет границы
      uploadArea.style.borderColor = '#A5A5A5';
      // Получаем первый файл из перетаскиваемых данных
      const file = e.dataTransfer.files[0];

      // Проверяем, был ли добавлен файл
      if (!file) return;

      errorDiv.style.display = 'block'; // Показываем контейнер с ошибкой
      // Проверка типа файла (разрешены только текстовые файлы, JSON и CSV)
      if (!['text/plain', 'application/json', 'text/csv'].includes(file.type)) {
        errorBox.textContent = 'Поддерживаемыe форматы - .txt, .json, .csv';
        return;
      }

      // Проверка размера файла (максимум 1 КБ)
      if (file.size > 1024) {
        errorBox.textContent = 'Файл слишком большой (макс. 1 КБ)';
        return;
      }

      // Очищаем сообщение об ошибке, если файл прошел валидацию
      errorBox.textContent = '';
      // Сохраняем выбранный файл в переменную
      selectedFile = file;
      // Очищаем информацию о файле (пока не используется)
      fileInfo.textContent = '';
      // Показываем прогресс-бар
      progressContainer.style.display = 'flex';
      // Отображаем имя файла в прогресс-баре
      fileNameDisplay.textContent = file.name;

      // Скрываем контейнер ввода, когда файл добавлен (по заданию)
      inputContainer.classList.add('hidden');

      // Симуляция анимации прогресса загрузки
      let progress = 0; // Начальный процент прогресса
      progressBar.style.width = '3px'; // Сбрасываем ширину прогресс-бара до начального значения
      progressPercentage.textContent = '0%'; // Устанавливаем начальный процент

      // Останавливаем предыдущую анимацию, если она уже запущена
      if (progressInterval) clearInterval(progressInterval);
      // Запускаем интервал для симуляции прогресса
      progressInterval = setInterval(() => {
        // Увеличиваем прогресс на 10% каждые 200 мс
        progress += 10;
        // Вычисляем ширину заполнения прогресс-бара (от 3px при 0% до 182px при 100%)
        const maxWidth = 182; // Полная ширина прогресс-бара
        const minWidth = 3; // Минимальная ширина при 0%
        const newWidth = minWidth + (progress / 100) * (maxWidth - minWidth);
        // Устанавливаем новую ширину прогресс-бара
        progressBar.style.width = `${newWidth}px`;
        // Обновляем отображение процента прогресса
        progressPercentage.textContent = `${progress}%`;
        // Когда прогресс достигает 100%, останавливаем анимацию
        if (progress >= 100) {
          clearInterval(progressInterval);
          // Меняем текст подзаголовка на "Загрузите ваш файл"
          subtitle.textContent = 'Загрузите ваш файл';
          // Если имя файла введено, активируем кнопку загрузки
          if (inputFile.value.trim()) {
            uploadButton.disabled = false;
            uploadButton.classList.add('active');
          }
        }
      }, 200); // Симуляция прогресса в течение 2 секунд (200 мс * 10 шагов = 2 сек)
    });

    // Обработка загрузки файла на сервер по нажатию кнопки "Загрузить"
    uploadButton.addEventListener('click', async () => {
      // Проверяем, выбран ли файл
      if (!selectedFile) {
        errorBox.textContent = 'Выберите файл для загрузки';
        return;
      }
      // Проверяем, пустое ли поле ввода имени файла (для дополнительной безопасности)
      if (!inputFile.value.trim()) {
        errorBox.textContent = 'Введите имя файла';
        return;
      }

      // Блокируем интерфейс на время загрузки файла на сервер
      uploadButton.textContent = 'Файл загружается...'; // Меняем текст кнопки
      uploadButton.disabled = true; // Отключаем кнопку
      uploadButton.classList.add('uploading'); // Добавляем класс для визуального эффекта
      uploadArea.classList.add('uploading'); // Отключаем взаимодействие с областью загрузки
      inputFile.disabled = true; // Отключаем поле ввода
      clearBtn.disabled = true; // Отключаем кнопку очистки поля ввода
      clearProgressBtn.disabled = true; // Отключаем кнопку очистки прогресса

      // Формируем данные для отправки на сервер
      const formData = new FormData();
      formData.append('file', selectedFile); // Добавляем файл
      formData.append('name', inputFile.value.trim()); // Добавляем имя файла

      try {
        // Отправляем запрос на сервер для загрузки файла
        const response = await fetch('https://file-upload-server-mc26.onrender.com/api/v1/upload', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        console.log(result);
        // Проверяем успешность ответа от сервера
        if (response.ok) {
          // Скрываем основное содержимое и показываем результат успешной загрузки
          mainWrapper.style.display = 'none';
          responseContainer.style.display = 'flex';
          // Меняем высоту окна и внутреннего контейнера
          uploadContainer.classList.add('response');
          windowElement.classList.add('response');
          responseContainer.querySelector('h1').textContent = 'Файл успешно загружен';
          responseContainer.querySelectorAll('p')[0].textContent = `name: ${result.filename}`;
          responseContainer.querySelectorAll('p')[1].textContent = `filename: ${result.name}`;
          responseContainer.querySelectorAll('p')[2].textContent = `timestamp: ${result.timestamp}`;
          responseContainer.querySelectorAll('p')[3].textContent = `message: ${result.message}`;
        } else {
          // Скрываем основное содержимое и показываем сообщение об ошибке
          mainWrapper.style.display = 'none';
          responseContainer.style.display = 'flex';
          // Меняем высоту окна и внутреннего контейнера
          uploadContainer.classList.add('response');
          windowElement.classList.add('response');
          uploadContainer.classList.add('error-response'); // Добавляем класс для стилизации ошибки
          responseContainer.querySelector('h1').textContent = 'Ошибка в загрузке файла';
          responseContainer.querySelectorAll('p')[0].textContent = `Ошибка: ${result.error}`;
        }
      } catch (err) {
        // Обрабатываем сетевую ошибку
        mainWrapper.style.display = 'none';
        responseContainer.style.display = 'flex';
        // Меняем высоту окна и внутреннего контейнера
        uploadContainer.classList.add('response');
        windowElement.classList.add('response');
        uploadContainer.classList.add('error-response'); // Добавляем класс для стилизации ошибки
        responseContainer.querySelector('h1').textContent = 'Ошибка в загрузке файла';
        responseContainer.querySelectorAll('p')[0].textContent = 'Ошибка сети';
      }

      // Разблокируем интерфейс после завершения загрузки (успешной или с ошибкой)
      uploadButton.textContent = 'Загрузить'; // Восстанавливаем текст кнопки
      uploadButton.disabled = false; // Включаем кнопку
      uploadButton.classList.remove('uploading'); // Убираем класс загрузки
      uploadArea.classList.remove('uploading'); // Восстанавливаем взаимодействие с областью загрузки
      inputFile.disabled = false; // Включаем поле ввода
      clearBtn.disabled = false; // Включаем кнопку очистки поля ввода
      clearProgressBtn.disabled = false; // Включаем кнопку очистки прогресса
      // Показываем контейнер ввода снова после завершения загрузки
      inputContainer.classList.remove('hidden');
    });
  }
}

// Регистрируем пользовательский элемент с именем 'file-uploader'
customElements.define('file-uploader', FileUploader);