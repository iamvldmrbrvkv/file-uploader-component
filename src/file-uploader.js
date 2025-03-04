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
        .error {
          color: red;
          font-size: 12px;
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
              <div class="error"></div>
            
            </div>
            <button class="button" disabled>Загрузить</button>
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

    let selectedFile = null;

    clearBtn.addEventListener('click', () => {
      inputFile.value = '';
      uploadButton.disabled = true;
      uploadButton.style.cursor = 'not-allowed';
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
      fileInfo.textContent = `Файл: ${file.name}, ${file.size} байт`;
      selectedFile = file;
      uploadButton.disabled = false;
      uploadButton.style.cursor = 'pointer';
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
          alert(`Файл успешно загружен: ${result.filename}`);
        } else {
          errorBox.textContent = `Ошибка: ${result.error}`;
        }
      } catch (err) {
        errorBox.textContent = 'Ошибка сети';
      }
      uploadButton.textContent = 'Загрузить';
      uploadButton.disabled = false;
    });
  }
}

customElements.define('file-uploader', FileUploader);