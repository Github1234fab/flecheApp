<script>
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "../lib/firebase.js";
  import { headingsTab } from "../lib/storeAdvertisement.js"; // Importer le store

  async function fetchJsonServicesData() {
    try {
      const jsonDataCollection = collection(db, "BDDjson");
      const querySnapshot = await getDocs(jsonDataCollection);
      let tempJsonServices = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tempJsonServices.push(data);
      });

      headingsTab.set(tempJsonServices); // Mettre à jour le store avec les données récupérées
    } catch (error) {
      console.error("Error fetching JSON services data:", error);
    }
  }

  fetchJsonServicesData();
</script>

