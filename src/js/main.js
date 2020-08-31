// proof main.js is connected
console.log("I'm from the main.js!");

// PHP test to see if it is working (only from VM/vagrant)
// webpack-dev-server does not serve PHP files
function submitPHPTestForm() {
  const testText = document.getElementById('phpTestText').value;
  // probably the wrong way to do this, but it works and it's just an example
  const testPHP = require('../php/test-form.php').default; // eslint-disable-line global-require
  const xhr = new XMLHttpRequest();

  xhr.open('POST', testPHP, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const returnData = xhr.responseText;
      document.getElementById('status').innerHTML = returnData;
    }
  };

  xhr.send(`message=${testText}`);
}

// PHP form submit listener
document.getElementById('phpTestForm').addEventListener('submit', (event) => {
  event.preventDefault();
  submitPHPTestForm();
});
