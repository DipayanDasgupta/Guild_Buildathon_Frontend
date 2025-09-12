// vercel-frontend/static/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    // ==============================================================================
    // THIS IS THE MOST IMPORTANT LINE.
    // REPLACE THE URL WITH YOUR ACTUAL LIVE RENDER BACKEND URL.
    // ==============================================================================
    const RENDER_BACKEND_URL = 'https://guild-buildathon.onrender.com';

    // --- DOM ELEMENT SELECTION ---
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileSelectBtn = document.getElementById('file-select-btn');
    const fileNameSpan = document.getElementById('file-name');
    const resultCard = document.getElementById('result-card');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const clientsTableBody = document.getElementById('clients-table-body');

    // --- EVENT LISTENERS ---

    // Open file dialog when "Select File" button is clicked
    fileSelectBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => handleFile(fileInput.files[0]));

    // Drag and Drop listeners
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-blue-500', 'bg-gray-700');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-blue-500', 'bg-gray-700');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500', 'bg-gray-700');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    // --- FUNCTIONS ---

    function handleFile(file) {
        if (!file) return;

        fileNameSpan.textContent = `Selected file: ${file.name}`;
        showStatus('Processing...', 'Sending document to Gemini AI for analysis.', 'text-blue-400');
        processFileWithBackend(file);
    }

    async function processFileWithBackend(file) {
        const formData = new FormData();
        formData.append('document', file);

        try {
            // The fetch call now uses the full, absolute URL
            const response = await fetch(`${RENDER_BACKEND_URL}/api/documents/process`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'An unknown error occurred in the backend.');
            }
            
            showStatus('Success!', 'Document processed successfully.', 'text-green-400');
            addClientToTable(result.data);

        } catch (error) {
            console.error('Error:', error);
            showStatus('Error!', `Failed to process document: ${error.message}`, 'text-red-400');
        }
    }

    function showStatus(title, message, colorClass) {
        resultCard.classList.remove('hidden');
        resultTitle.textContent = title;
        resultMessage.textContent = message;

        // Reset colors
        resultTitle.className = 'text-lg font-semibold';
        resultTitle.classList.add(colorClass);
    }

    function addClientToTable(data) {
        const newRow = document.createElement('tr');
        newRow.className = 'border-b border-gray-700';
        newRow.innerHTML = `
            <td class="p-3">${data.customer_name || 'N/A'}</td>
            <td class="p-3">${data.policy_number || 'N/A'}</td>
            <td class="p-3">${data.policy_end_date || 'N/A'}</td>
            <td class="p-3">
                <span class="bg-green-600 text-white px-2 py-1 rounded-full text-sm">Processed</span>
            </td>
        `;
        // Add the new row to the top of the table
        clientsTableBody.prepend(newRow);
    }
});