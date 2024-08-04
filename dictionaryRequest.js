

document.getElementById('searchButton').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value;
    if (word) {
        fetchDefinition(word);
    } else {
        alert('Please enter a word.');
    }
});

function fetchDefinition(word) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            displayResult(response);
        }
    });

    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    xhr.send(null);
}

function displayResult(response) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (response && response.length > 0 && response[0].meanings) {
        const definitionList = document.createElement('ul');
        response[0].meanings.forEach(meaning => {
            meaning.definitions.forEach(definition => {
                const listItem = document.createElement('li');
                listItem.textContent = `${meaning.partOfSpeech}: ${definition.definition}`;
                definitionList.appendChild(listItem);
            });
        });
        resultDiv.appendChild(definitionList);
    } else {
        resultDiv.textContent = 'No definitions found.';
    }
}
