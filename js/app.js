window.onload = begin();

function begin() {
  // Declarando variables
  var spaces = 33;
  var inputMsg = document.getElementById('input-msg');
  var cipherBtn = document.getElementById('cipher-btn');
  var decipherBtn = document.getElementById('decipher-btn');
  var resultContainer = document.getElementById('result-container');
  var result = document.getElementById('result');

  // Asignando eventos
  cipherBtn.addEventListener('click', displayCipherMsg);
  decipherBtn.addEventListener('click', displayDecipherMsg);
  inputMsg.addEventListener('keyup', checkInput);

  // Creando funcion Cifrado Cesar
  function cipher(msg, x) {
    // Creando variables para codigo original, código cifrado, letra cifrada y mensaje cifrado
    var origCode = 0;
    var newCode = 0;
    var newLetter = '';
    var cipherMsg = '';
    // Recorriendo el string
    for (var i = 0; i < msg.length; i++) {
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
  }

  // Creando función para descrifrar
  function decipher(msg, x) {
    // Creando variables para código cifrado, código descifrado, letra descifrada y mensaje descifrado
    var newCode = 0;
    var origCode = 0;
    var origLetter = '';
    var decipherMsg = '';
    // Recorriendo el string de izquierda a derecha
    for (var i = 0; i < msg.length; i++) {
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
    console.log(decipherMsg);
    return decipherMsg;
  }

  // Función para validar que el input tenga un valor
  function checkInput() {
    if (inputMsg.value !== '' && inputMsg.value !== ' ') {
      console.log(inputMsg.value);
      cipherBtn.classList.remove('disabled');
      decipherBtn.classList.remove('disabled');
    } else {
      cipherBtn.classList.add('disabled');
      decipherBtn.classList.add('disabled');
    }
  }

  // Función para mostrar resultado de conversión
  function showResultContainer() {
    document.getElementById('result-container').style.display = 'block';
  }

  // Función para mostrar mensaje cifrado
  function displayCipherMsg() {
    document.getElementById('result-msg').innerText = 'Tu mensaje cifrado es:';
    result.innerText = cipher(inputMsg.value, spaces);
    showResultContainer();
  }

  // Función para mostrar mensaje descifrado
  function displayDecipherMsg() {
    document.getElementById('result-msg').innerText = 'Tu mensaje descifrado es:';
    result.innerText = decipher(inputMsg.value, spaces);
    showResultContainer();
  }
}