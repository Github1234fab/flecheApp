<script>
  import { db } from '../../lib/firebase.js'; // Assurez-vous que le chemin est correct
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
        const fileContent = e.target.result;
        console.log('File content:', fileContent);
        const data = JSON.parse(fileContent);
        console.log('Parsed data:', data);

        const batch = writeBatch(db);
        data.forEach((docData) => {
          // Convert fields to correct types if necessary
          if (typeof docData.id === 'string' && !isNaN(docData.id)) {
            docData.id = Number(docData.id); // Ensure id is a number
          }
          console.log('Processing document:', docData);
          const docRef = doc(collection(db, 'BDDjson'), docData.id.toString()); // Firestore requires document IDs to be strings
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


