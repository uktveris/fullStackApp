import axios from 'axios'

document.getElementById('fetch-data')?.addEventListener('click', ()=> {
    console.log('button was clicked!');
    axios.get('http://localhost:3000/api/sample-data')
        .then(response => {
            console.log('received data: ' + response.data);
            document.getElementById('data-container')!.innerText = response.data;
        })
        .catch(error => {
            console.log('error while retrieving data from the backend: ' + (error as Error).message);
        })
})

document.addEventListener('DOMContentLoaded', ()=> {
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput') as HTMLInputElement;
    const addMsgButton = document.getElementById('sendMessage') as HTMLButtonElement;

    function fetchMesages() {
        axios.get('http://localhost:3000/api/messages')
            .then(response => {
                response.data.forEach((message: {id: number, message: string}) => {
                    const messageDiv = document.createElement('div');
                    messageDiv.textContent = message.message;
                    messages?.appendChild(messageDiv);
                });
            })
            .catch(error => {
                console.log('error while retrieving and displaying messages: ' + (error as Error).message);
            })
    }
    
    function sendMessage() {
        const input = messageInput.value.trim();
        if (input) {
            axios.post('http://localhost:3000/api/messages', {message: input})
                .then(response => {
                    const messageDiv = document.createElement('div');
                    messageDiv.textContent = response.data.message;
                    messages?.appendChild(messageDiv);
                })
        }
    }
    
    addMsgButton.addEventListener('click', sendMessage);
    
    fetchMesages();
})