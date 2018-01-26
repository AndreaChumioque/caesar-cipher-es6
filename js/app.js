window.onload = begin();

function begin() {
  // Declarando variables
  const spaces = 33;
  let inputMsg = document.getElementById('input-msg');
  let cipherBtn = document.getElementById('cipher-btn');
  let decipherBtn = document.getElementById('decipher-btn');
  let resultContainer = document.getElementById('result-container');
  let result = document.getElementById('result');

  // Función cifrado
  const cipher = (msg, x) => {
    // Creando variables para codigo original, código cifrado, letra cifrada y mensaje cifrado
    let origCode = 0;
    let newCode = 0;
    let newLetter = '';
    let cipherMsg = '';
    // Recorriendo el string
    for (let i = 0; i < msg.length; i++) {
      // Encontramos el código de cada caracter con el método charCodeAt
      origCode = msg.charCodeAt(i);
      // Si el caracter es una letra mayúscula o minúscula (entre los códigos 65 y 90 o 97 y 122), realiza el cifrado, de lo contrario agrega el caracter original al nuevo string
      if (origCode >= 'A'.charCodeAt(0) && origCode <= 'Z'.charCodeAt(0)) {
        newCode = (origCode - 'A'.charCodeAt(0) + x) % 26 + 'A'.charCodeAt(0);
        newLetter = String.fromCharCode(newCode);
        cipherMsg += newLetter;
      } else if (origCode >= 'a'.charCodeAt(0) && origCode <= 'z'.charCodeAt(0)) {
        newCode = (origCode - 'a'.charCodeAt(0) + x) % 26 + 'a'.charCodeAt(0);
        newLetter = String.fromCharCode(newCode);
        cipherMsg += newLetter;
      } else {
        cipherMsg += String.fromCharCode(origCode);
      }
    }
    // Retornando mensaje cifrado
    return cipherMsg;
  };

  // Función descifrado
  const decipher = (msg, x) => {
    // Creando variables para código cifrado, código descifrado, letra descifrada y mensaje descifrado
    let newCode = 0;
    let origCode = 0;
    let origLetter = '';
    let decipherMsg = '';
    // Recorriendo el string de izquierda a derecha
    for (let i = 0; i < msg.length; i++) {
      // Encontramos el código de cada caracter mediante el método charCodeAt
      newCode = msg.charCodeAt(i);
      // Si el caracter es una letra mayúscula o minúscula (entre los códigos 65 y 90 o 97 y 122), realiza el descifrado, de lo contrario agrega el caracter original al nuevo string
      if (newCode >= 'A'.charCodeAt(0) && newCode <= 'Z'.charCodeAt(0)) {
        if ((newCode - x % 26) < 'A'.charCodeAt(0)) {
          origCode = 'Z'.charCodeAt(0) - (x % 26) + (newCode - 'A'.charCodeAt(0)) + 1;
        } else {
          origCode = (newCode - x % 26);
        }
        origLetter = String.fromCharCode(origCode);
        decipherMsg += origLetter;
      } else if (newCode >= 'a'.charCodeAt(0) && newCode <= 'z'.charCodeAt(0)) {
        if ((newCode - x % 26) < 'a'.charCodeAt(0)) {
          origCode = 'z'.charCodeAt(0) - (x % 26) + (newCode - 'a'.charCodeAt(0)) + 1;
        } else { 
          origCode = (newCode - x % 26);
        }
        origLetter = String.fromCharCode(origCode);
        decipherMsg += origLetter;
      } else {
        decipherMsg += String.fromCharCode(newCode);
      }
    }
    // Retornando mensaje descifrado
    return decipherMsg;
  };

  // Validación del input
  inputMsg.addEventListener('keyup', () => {
    if (inputMsg.value !== '' && inputMsg.value !== ' ') {
      cipherBtn.classList.remove('disabled');
      decipherBtn.classList.remove('disabled');
    } else {
      cipherBtn.classList.add('disabled');
      decipherBtn.classList.add('disabled');
    }
  });

  // Función para mostrar mensaje cifrado
  cipherBtn.addEventListener('click', () => {
    document.getElementById('result-msg').innerText = 'Tu mensaje cifrado es:';
    result.innerText = cipher(inputMsg.value, spaces);
    showResultContainer();
  });

  // Función para mostrar mensaje descifrado
  decipherBtn.addEventListener('click', () => {
    document.getElementById('result-msg').innerText = 'Tu mensaje descifrado es:';
    result.innerText = decipher(inputMsg.value, spaces);
    showResultContainer();
  });

  // Función para mostrar resultado
  const showResultContainer = () => {
    document.getElementById('result-container').style.display = 'block';
  };
}