const apiForm = document.getElementById('apiForm');
const methodSelect = document.getElementById('method');
const endpointSelect = document.getElementById('endpoint');
const paramsInput = document.getElementById('params');
const bodyGroup = document.getElementById('bodyGroup');
const bodyTextarea = document.getElementById('body');
const responseSection = document.getElementById('responseSection');
const statusSpan = document.getElementById('status');
const responseBody = document.getElementById('responseBody');

// Show/hide body based on method
methodSelect.addEventListener('change', () => {
    const method = methodSelect.value;
    if (method === 'POST' || method === 'PUT') {
        bodyGroup.style.display = 'block';
    } else {
        bodyGroup.style.display = 'none';
    }
});

apiForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const method = methodSelect.value;
    const endpoint = endpointSelect.value;
    const params = paramsInput.value.trim();
    const bodyContent = bodyTextarea.value.trim();

    const url = `${window.location.origin}${endpoint}${params}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if ((method === 'POST' || method === 'PUT') && bodyContent) {
        try {
            options.body = JSON.stringify(JSON.parse(bodyContent));
        } catch (error) {
            alert('Invalid JSON body');
            return;
        }
    }

    statusSpan.textContent = 'Loading...';
    responseSection.classList.remove('hidden');
    responseBody.textContent = '';

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        statusSpan.textContent = `${response.status} ${response.statusText}`;
        responseBody.textContent = JSON.stringify(data, null, 2);

        // Color status based on success/error
        if (response.ok) {
            statusSpan.style.color = '#27ae60';
        } else {
            statusSpan.style.color = '#e74c3c';
        }
    } catch (error) {
        statusSpan.textContent = 'Error';
        statusSpan.style.color = '#e74c3c';
        responseBody.textContent = error.message;
    }
});
