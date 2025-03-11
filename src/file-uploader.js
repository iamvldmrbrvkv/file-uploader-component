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
          height: 426px; /* Изменяем на 230px при отображении response */
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
          background: url('/images/clear-input-button.svg') no-repeat center;
          background-size: cover;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease; /* Плавный переход для изменения иконки */
        }
        .clear-btn.blue {
          background: url('/images/clear-input-button-blue.svg') no-repeat center;
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
          text-align: left;
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
        .progress-complete {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 3px;
          gap: 14px;
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
        .progress-complete .file-icon {
          width: 37px;
          height: 28px;
          background: #5F5CF0;
          border-radius: 10px;
          flex: none;
          order: 0;
          flex-grow: 0;
        }
        .progress-complete .file-name {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 15.53px;
          color: #5F5CF0;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          line-height: 18.8px;
        }
        .progress-complete .progress-percentage {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 13.85px;
          text-align: right;
          color: #5F5CF0;
          margin: 0;
          ine-height: 18.8px;
        }
        .progress-complete .clear-progress {
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
          margin-right: 7px;
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
          display: none;
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
            <!-- Новый контейнер для отображения после 100% -->
            <div class="progress-complete">
              <div class="file-icon"></div>
              <p class="file-name"></p>
              <p class="progress-percentage"></p>
              <button class="clear-progress"></button>
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
    const uploadArea = this.shadowRoot.querySelector('.upload-area');
    const inputFile = this.shadowRoot.querySelector('#filename');
    const subtitle = this.shadowRoot.querySelector('.subtitle');
    const clearBtn = this.shadowRoot.querySelector('.clear-btn');
    const errorBox = this.shadowRoot.querySelector('.error');
    const uploadButton = this.shadowRoot.querySelector('.button');
    const progressContainer = this.shadowRoot.querySelector('.progress-container');
    const progressBar = this.shadowRoot.querySelector('.progress');
    const progressPercentage = this.shadowRoot.querySelector('.progress-percentage');
    const fileNameDisplay = this.shadowRoot.querySelector('.file-name');
    const clearProgressBtn = this.shadowRoot.querySelector('.progress-container .clear-progress'); // Изначальная кнопка
    const progressComplete = this.shadowRoot.querySelector('.progress-complete');
    const progressCompleteClearBtn = this.shadowRoot.querySelector('.progress-complete .clear-progress'); // Кнопка в новом контейнере
    const mainWrapper = this.shadowRoot.querySelector('.main-wrapper');
    const responseContainer = this.shadowRoot.querySelector('.response-container');
    const uploadContainer = this.shadowRoot.querySelector('.upload-container');
    const windowElement = this.shadowRoot.querySelector('.window');
    const inputContainer = this.shadowRoot.querySelector('.input-container');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    const errorDiv = this.shadowRoot.querySelector('.error');
  
    // Переменные для хранения состояния
    let selectedFile = null;
    let progressInterval = null;
  
    // Обработчик для кнопки закрытия окна с ответом от сервера
    closeBtn.addEventListener('click', () => {
      responseContainer.style.display = 'none';
      mainWrapper.style.display = 'block';
      clearBtn.classList.remove('blue');
      errorDiv.style.display = 'none';
      progressContainer.style.display = 'none';
      progressComplete.style.display = 'none';
      progressComplete.querySelector('.file-name').textContent = '';
      progressComplete.querySelector('.progress-percentage').textContent = '';
      uploadContainer.classList.remove('response');
      uploadContainer.classList.remove('error-response');
      windowElement.classList.remove('response');
      subtitle.textContent = 'Перед загрузкой дайте имя файлу';
      fileNameDisplay.textContent = '';
      inputFile.value = '';
      uploadButton.disabled = true;
      uploadButton.classList.remove('active');
      inputContainer.classList.remove('hidden');
      errorBox.style.display = 'none';
      responseContainer.querySelector('h1').textContent = '';
      responseContainer.querySelectorAll('p')[0].textContent = '';
      responseContainer.querySelectorAll('p')[1].textContent = '';
      responseContainer.querySelectorAll('p')[2].textContent = '';
      responseContainer.querySelectorAll('p')[3].textContent = '';
    });
  
    // Слушатель события для изменения текста в инпуте
    inputFile.addEventListener('input', () => {
      if (inputFile.value.trim()) {
        subtitle.textContent = 'Перенесите ваш файл в область ниже';
        clearBtn.classList.add('blue');
      } else {
        subtitle.textContent = 'Перед загрузкой дайте имя файлу';
        clearBtn.classList.remove('blue');
      }
    });
  
    // Слушатель события для очистки поля ввода имени файла
    clearBtn.addEventListener('click', () => {
      inputFile.value = '';
      uploadButton.disabled = true;
      uploadButton.classList.remove('active');
      subtitle.textContent = 'Перед загрузкой дайте имя файлу';
      clearBtn.classList.remove('blue');
    });
  
    // Обработчик для кнопки очистки прогресса (для обеих кнопок)
    const handleClearProgress = () => {
      selectedFile = null;
      progressContainer.style.display = 'none';
      progressComplete.style.display = 'none';
      progressComplete.querySelector('.file-name').textContent = '';
      progressComplete.querySelector('.progress-percentage').textContent = '';
      progressBar.style.width = '3px';
      progressPercentage.textContent = '0%';
      fileNameDisplay.textContent = '';
      uploadButton.disabled = true;
      uploadButton.classList.remove('active');
      if (progressInterval) clearInterval(progressInterval);
      inputContainer.classList.remove('hidden');
      subtitle.textContent = 'Перенесите ваш файл в область ниже';
    };
  
    // Привязываем обработчик к обеим кнопкам
    clearProgressBtn.addEventListener('click', handleClearProgress);
    progressCompleteClearBtn.addEventListener('click', handleClearProgress);
  
    // Эффект перетаскивания над областью загрузки
    uploadArea.addEventListener('dragover', (e) => {
      if (!inputFile.value.trim()) {
        alert('Дайте имя файлу');
        e.preventDefault();
        return;
      }
      e.preventDefault();
      uploadArea.style.borderColor = '#5060ff';
    });
  
    // Эффект ухода курсора с области загрузки
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.style.borderColor = '#A5A5A5';
    });
  
    // Обработка события сброса файла в область загрузки
    uploadArea.addEventListener('drop', (e) => {
      errorBox.style.display = 'block';
      if (!inputFile.value.trim()) {
        alert('Дайте имя файлу');
        e.preventDefault();
        return;
      }
      e.preventDefault();
      uploadArea.style.borderColor = '#A5A5A5';
      const file = e.dataTransfer.files[0];
  
      if (!file) return;
  
      errorDiv.style.display = 'block';
      if (!['text/plain', 'application/json', 'text/csv'].includes(file.type)) {
        errorBox.textContent = 'Поддерживаемыe форматы - .txt, .json, .csv';
        return;
      }
  
      if (file.size > 1024) {
        errorBox.textContent = 'Файл слишком большой (макс. 1 КБ)';
        return;
      }
  
      errorBox.textContent = '';
      selectedFile = file;
      progressContainer.style.display = 'flex';
      fileNameDisplay.textContent = file.name;
  
      inputContainer.classList.add('hidden');
  
      let progress = 0;
      progressBar.style.width = '3px';
      progressPercentage.textContent = '0%';
  
      if (progressInterval) clearInterval(progressInterval);
      progressInterval = setInterval(() => {
        progress += 10;
        const maxWidth = 182;
        const minWidth = 3;
        const newWidth = minWidth + (progress / 100) * (maxWidth - minWidth);
        progressBar.style.width = `${newWidth}px`;
        progressPercentage.textContent = `${progress}%`;
        if (progress >= 100) {
          clearInterval(progressInterval);
          subtitle.textContent = 'Загрузите ваш файл';
          if (inputFile.value.trim()) {
            uploadButton.disabled = false;
            uploadButton.classList.add('active');
          }
          progressContainer.style.display = 'none';
          progressComplete.style.display = 'flex';
          progressComplete.querySelector('.file-name').textContent = file.name;
          progressComplete.querySelector('.progress-percentage').textContent = '100%';
        }
      }, 200);
    });
  
    // Обработка загрузки файла на сервер
    uploadButton.addEventListener('click', async () => {
      if (!selectedFile) {
        errorBox.textContent = 'Выберите файл для загрузки';
        return;
      }
      if (!inputFile.value.trim()) {
        errorBox.textContent = 'Введите имя файла';
        return;
      }
  
      uploadButton.textContent = 'Файл загружается...';
      uploadButton.disabled = true;
      uploadButton.classList.add('uploading');
      uploadArea.classList.add('uploading');
      inputFile.disabled = true;
      clearBtn.disabled = true;
      clearProgressBtn.disabled = true;
  
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', inputFile.value.trim());
  
      try {
        const response = await fetch('https://file-upload-server-mc26.onrender.com/api/v1/upload', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (response.ok) {
          mainWrapper.style.display = 'none';
          responseContainer.style.display = 'flex';
          uploadContainer.classList.add('response');
          windowElement.classList.add('response');
          responseContainer.querySelector('h1').textContent = 'Файл успешно загружен';
          responseContainer.querySelectorAll('p')[0].textContent = `name: ${result.filename}`;
          responseContainer.querySelectorAll('p')[1].textContent = `filename: ${result.name}`;
          responseContainer.querySelectorAll('p')[2].textContent = `timestamp: ${result.timestamp}`;
          responseContainer.querySelectorAll('p')[3].textContent = `message: ${result.message}`;
        } else {
          mainWrapper.style.display = 'none';
          responseContainer.style.display = 'flex';
          uploadContainer.classList.add('response');
          windowElement.classList.add('response');
          uploadContainer.classList.add('error-response');
          responseContainer.querySelector('h1').textContent = 'Ошибка в загрузке файла';
          responseContainer.querySelectorAll('p')[0].textContent = `Ошибка: ${result.error}`;
        }
      } catch (err) {
        mainWrapper.style.display = 'none';
        responseContainer.style.display = 'flex';
        uploadContainer.classList.add('response');
        windowElement.classList.add('response');
        uploadContainer.classList.add('error-response');
        responseContainer.querySelector('h1').textContent = 'Ошибка в загрузке файла';
        responseContainer.querySelectorAll('p')[0].textContent = 'Ошибка сети';
      }
  
      uploadButton.textContent = 'Загрузить';
      uploadButton.disabled = false;
      uploadButton.classList.remove('uploading');
      uploadArea.classList.remove('uploading');
      inputFile.disabled = false;
      clearBtn.disabled = false;
      clearProgressBtn.disabled = false;
      inputContainer.classList.remove('hidden');
    });
  }
}

// Регистрируем пользовательский элемент с именем 'file-uploader'
customElements.define('file-uploader', FileUploader);