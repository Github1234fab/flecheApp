<script>
  import { db } from '../lib/firebase.js'; // Assurez-vous que le chemin est correct
  import { collection, doc, writeBatch } from 'firebase/firestore';

  let file;

  const handleFileChange = (event) => {
    file = event.target.files[0];
    console.log('File selected:', file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        console.log('File content:', e.target.result);
        const data = JSON.parse(e.target.result);
        console.log('Parsed data:', data);

        const batch = writeBatch(db);
        data.forEach((docData) => {
          const docRef = doc(collection(db, 'fleche-json'), docData.id);
          batch.set(docRef, docData);
        });

        await batch.commit();
        alert('File successfully uploaded and imported to Firestore!');
      } catch (error) {
        console.error('Error reading or uploading file:', error);
        alert('Error uploading file.');
      }
    };

    reader.readAsText(file);
  };
</script>

<input type="file" accept=".json" on:change={handleFileChange} />
<button on:click={handleFileUpload}>Upload and Import JSON</button>
