class FileUploader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
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
          height: 479px;
          background: linear-gradient(to bottom, #5F5CF0, #DDDCFC, #FFFFFF);
          border-radius: 16px;
          padding: 12px 13px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
          position: relative;
        }
        .window {
          width: 277px;
          height: 457px;
        }
        .close-btn {
          width: 34px;
          height: 34px;
          border-radius: 17px;
          padding: 3px;
          background: #CCCCCE47 url('src/images/+.svg') no-repeat center;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 8px;
          right: 8px;
        }
        .main-wrapper {
          width: 277px;
          height: 428px;
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
          background: #f0f0ff;
          border-radius: 8px;
          padding: 8px;
          margin: 10px 0;
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
          background: url('src/images/+_input.svg') no-repeat center;
          background-size: cover;
          border: none;
          cursor: pointer;
        }
        .upload-area {
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
          background: #f0f0ff;
          color: #7a89ff;
        }
        .upload-window-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 221px;
          height: 175.76077270507812px;
        }
        .upload-window-content p {
          width: 75%;
          font-family: Inter;
          font-weight: 400;
          font-size: 14px;
          line-height: 16.94px;
          text-align: center;
          color: #5F5CF0;
        }
        .progress-container {
          display: none;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 80%;
          margin-top: 10px;
          padding: 5px;
          background: #E6E6FF;
          border-radius: 5px;
        }
        .progress-container p.file-name {
          font-family: Inter;
          font-size: 14px;
          color: #5F5CF0;
          margin: 0;
          flex: 1;
          text-align: left;
        }
        .progress-bar {
          width: 50%;
          height: 10px;
          background: #ddd;
          border-radius: 5px;
          overflow: hidden;
          margin: 0 10px;
        }
        .progress {
          height: 100%;
          background: #5F5CF0;
          width: 0%;
          transition: width 0.1s linear;
        }
        .progress-percentage {
          font-family: Inter;
          font-size: 12px;
          color: #5F5CF0;
          margin: 0;
          width: 30px;
          text-align: right;
        }
        .progress-container .clear-progress {
          width: 16px;
          height: 16px;
          background: url('src/images/+_input.svg') no-repeat center;
          background-size: cover;
          border: none;
          cursor: pointer;
          margin-left: 5px;
        }
        .button {
          background: #BBB9D2;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 30px;
          cursor: not-allowed;
          width: 277px;
          height: 56px;
          margin-top: 12px;
          font-family: Inter;
          font-weight: 500;
          font-size: 20px;
          line-height: 24.2px;
        }
        .button.active {
          background: #FF5555;
          cursor: pointer;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }
        .response-container {
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
        }
        .response-container h1 {
          font-family: Inter;
          font-weight: 600;
          font-size: 20px;
          color: #FFFFFF;
          margin-bottom: 20px;
        }
        .response-container p {
          font-family: Inter;
          font-size: 14px;
          color: #5F5CF0;
          margin: 5px 0;
        }
        .error-response {
          background: linear-gradient(to bottom, #FF5555, #FF9999, #FFFFFF);
        }
      </style>
      <div class="upload-container">
        <div class="window">
          <button class="close-btn"></button>
          <div class="main-wrapper">
            <div class="title">
              <h1>Загрузочное окно</h1>
              <h2>Перед загрузкой дайте имя файлу</h2>
            </div>
            <div class="input-container">
              <input type="text" id="filename" placeholder="Название файла"/>
              <button class="clear-btn"></button>
            </div>
            <div class="upload-area">
              <div class="upload-window-content">
                <img src="src/images/docs pic.svg" alt="docs" />
                <p>Перенесите ваш в файл в область ниже</p>
              </div>
              <div class="file-info"></div>
              <div class="progress-container">
                <p class="file-name"></p>
                <div class="progress-bar">
                  <div class="progress"></div>
                </div>
                <p class="progress-percentage">0%</p>
                <button class="clear-progress"></button>
              </div>
              <div class="error"></div>
            </div>
            <button class="button" disabled>Загрузить</button>
          </div>
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

    this.initEvents();
  }

  initEvents() {
    const uploadArea = this.shadowRoot.querySelector('.upload-area');
    const inputFile = this.shadowRoot.querySelector('#filename');
    const fileInfo = this.shadowRoot.querySelector('.file-info');
    const errorBox = this.shadowRoot.querySelector('.error');
    const uploadButton = this.shadowRoot.querySelector('.button');
    const clearBtn = this.shadowRoot.querySelector('.clear-btn');
    const progressContainer = this.shadowRoot.querySelector('.progress-container');
    const progressBar = this.shadowRoot.querySelector('.progress');
    const progressPercentage = this.shadowRoot.querySelector('.progress-percentage');
    const fileNameDisplay = this.shadowRoot.querySelector('.file-name');
    const clearProgressBtn = this.shadowRoot.querySelector('.clear-progress');
    const mainWrapper = this.shadowRoot.querySelector('.main-wrapper');
    const responseContainer = this.shadowRoot.querySelector('.response-container');
    const uploadContainer = this.shadowRoot.querySelector('.upload-container');

    let selectedFile = null;
    let progressInterval = null;

    clearBtn.addEventListener('click', () => {
      inputFile.value = '';
      uploadButton.disabled = true;
      uploadButton.classList.remove('active');
      uploadButton.style.cursor = 'not-allowed';
    });

    clearProgressBtn.addEventListener('click', () => {
      selectedFile = null;
      progressContainer.style.display = 'none';
      progressBar.style.width = '0%';
      progressPercentage.textContent = '0%';
      fileNameDisplay.textContent = '';
      uploadButton.disabled = true;
      uploadButton.classList.remove('active');
      if (progressInterval) clearInterval(progressInterval);
    });

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '#5060ff';
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.style.borderColor = '#7a89ff';
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '#7a89ff';
      const file = e.dataTransfer.files[0];

      if (!file) return;
      if (!['text/plain', 'application/json', 'text/csv'].includes(file.type)) {
        errorBox.textContent = 'Неверный формат файла';
        return;
      }
      if (file.size > 1024) {
        errorBox.textContent = 'Файл слишком большой (макс. 1 КБ)';
        return;
      }

      errorBox.textContent = '';
      selectedFile = file;
      fileInfo.textContent = '';
      progressContainer.style.display = 'flex';
      fileNameDisplay.textContent = file.name;

      // Simulate progress
      let progress = 0;
      progressBar.style.width = '0%';
      progressPercentage.textContent = '0%';

      if (progressInterval) clearInterval(progressInterval);
      progressInterval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${progress}%`;
        if (progress >= 100) {
          clearInterval(progressInterval);
          if (inputFile.value.trim()) {
            uploadButton.disabled = false;
            uploadButton.classList.add('active');
          }
        }
      }, 200); // Simulate progress over 2 seconds
    });

    uploadButton.addEventListener('click', async () => {
      if (!selectedFile || !inputFile.value.trim()) {
        errorBox.textContent = 'Введите имя файла и выберите файл';
        return;
      }
      uploadButton.textContent = 'Загрузка...';
      uploadButton.disabled = true;

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
          responseContainer.querySelector('h1').textContent = 'Файл успешно загружен';
          responseContainer.querySelectorAll('p')[0].textContent = `message: ${result.message}`;
          responseContainer.querySelectorAll('p')[1].textContent = `filename: ${result.filename}`;
          responseContainer.querySelectorAll('p')[2].textContent = `nameField: ${result.nameField}`;
          responseContainer.querySelectorAll('p')[3].textContent = `timestamp: ${result.timestamp}`;
        } else {
          mainWrapper.style.display = 'none';
          responseContainer.style.display = 'flex';
          uploadContainer.classList.add('error-response');
          responseContainer.querySelector('h1').textContent = 'Ошибка в загрузке файла';
          responseContainer.querySelectorAll('p')[0].textContent = `Error: ${result.error}`;
        }
      } catch (err) {
        mainWrapper.style.display = 'none';
        responseContainer.style.display = 'flex';
        uploadContainer.classList.add('error-response');
        responseContainer.querySelector('h1').textContent = 'Ошибка в загрузке файла';
        responseContainer.querySelectorAll('p')[0].textContent = 'Ошибка сети';
      }
      uploadButton.textContent = 'Загрузить';
      uploadButton.disabled = false;
    });
  }
}

customElements.define('file-uploader', FileUploader);