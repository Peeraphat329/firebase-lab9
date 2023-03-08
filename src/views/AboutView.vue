<template>
  <v-container>
  <div class="slide">
    <v-carousel>
      <v-carousel-item src="https://img.kapook.com/u/2016/wanwanat/0_edit/385698979x.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.pixabay.com/photo/2015/04/07/07/51/papaya-salad-710613__480.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://www.uncledeng.com/wp-content/uploads/2022/05/Vises_kaiyang_03-1000x667.jpg" cover></v-carousel-item>
    </v-carousel>
  </div>
  <div>
    <v-text-field label="ชื่อเมนูภาษาไทย" v-model="menu.nameTH" variant="solo"></v-text-field>
    <v-text-field label="ชื่อเมนูภาษาอังกฤษ" v-model="menu.nameeng" variant="solo"></v-text-field>
    <v-text-field label="ราคา" v-model="menu.price" variant="solo"></v-text-field>
    <v-textarea label="Detal" v-model="menu.detail" variant="solo"></v-textarea>
    <v-btn prepend-icon="mdi-hamburger-plus" variant="tonal" color="deep-purple-darken-1" @click="ADDUSERDATA()">
      ADDMANU
    </v-btn>
    <v-btn prepend-icon="mdi-hamburger-plus" variant="tonal" color="deep-purple-darken-1" @click="SHOWMENU()">
      SHOWMANU
    </v-btn>
  </div>
  <!-- {{ menu.nameTH }}{{ menu.nameeng }}{{ menu.price }}{{ menu.detail }}{{ allmenu }} -->
  <v-table>
    <thead>
      <tr>
        <th class="text-center">
          หมายเลขคำสั่ง
        </th>
        <th class="text-center">
          ชื่อเมนูภาษาไทย
        </th>
        <th class="text-center">
          ชื่อเมนูภาษาอังกฤษ
        </th>
        <th class="text-center">
          ราคา
        </th>
        <th class="text-center">
          รายละเอียด
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in allmenu" :key="item.name">
        <td class="text-center">{{ item.id }}</td>
        <td class="text-center">{{ item.data.nameTH }}</td>
        <td class="text-center">{{ item.data.nameeng }}</td>
        <td class="text-center">{{ item.data.price }}</td>
        <td class="text-center">{{ item.data.detail }}</td>
        <v-btn prepend-icon="mdi-delete" variant="tonal" color="red-accent-4" @click="DELETEMENU(item.id)">
          DELETE
        </v-btn>
        <v-btn prepend-icon="mdi-file-edit" variant="tonal" color="light-blue-darken-3" @click="EDIT(item.id)">
          EDIT
        </v-btn>
        <v-btn prepend-icon="mdi-ticket-confirmation" variant="tonal" color="brown-darken-4" @click="CONFIRMMENU(item.id)">
          CONFIRMMENU
        </v-btn>
      </tr>
    </tbody>
  </v-table>
</v-container>
</template>
<script setup>
import { ref } from "vue";
/* import TheWelcome from "../components/TheWelcome.vue"; */
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
   setDoc,
} from "firebase/firestore";
import { db } from "../main.js";
const menu = ref({ nameTH: "", nameeng: "", price: 0, detail: "" });

async function ADDUSERDATA() {
  try {
    const docRef = await addDoc(collection(db, "CANNADIAN"), menu.value);
    console.log("Document written with ID: ", docRef.id);
    alert("เพิ่มเมนูเสร็จสิ้น")
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const allmenu = ref([])
async function SHOWMENU() {
  const querySnapshot = await getDocs(collection(db, "CANNADIAN"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    //console.log(doc.id);
    const mydata = ref({ id: doc.id, data: doc.data() });
    allmenu.value.push(mydata.value);
  });
}
async function DELETEMENU(data) {
  if (confirm("ต้องการลบเมนูหรือไม่ ?")) {
    await deleteDoc(doc(db, "CANNADIAN", data));  
  }
}
const datamenu = ref();
async function EDIT(data2) {
  const docRef = doc(db, "CANNADIAN", data2);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.id, docSnap.data());
    datamenu.value = (docSnap.data())
    menu.value = datamenu.value;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    
  }
}
async function CONFIRMMENU(data1) {
  // Add a new document in collection "cities"
  await setDoc(doc(db, "CANNADIAN", data1), menu.value);
  console.log("dddd");
  alert("แก้ไขเสร็จสิ้น");
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.slide {
  width: 1200px;
  height: fit-content;
}
</style>
