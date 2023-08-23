document.querySelector('#note-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const noteTitle = document.querySelector('#note-title').value;
    const noteText = document.querySelector('#note-text').value;
  
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: noteTitle, text: noteText }),
      });
  
      if (response.ok) {
        location.reload();
      } else {
        console.error('Failed to save note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  