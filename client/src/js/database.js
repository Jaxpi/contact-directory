// TODO: Install the following package:
import { openDB } from "idb";

// TODO: Complete the initDb() function below:
const initdb = async () => {
  openDB("contactDirectory", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contactDirectory")) {
        console.log("contactDirectory database already exists");
        return;
      }
      db.createObjectStore("contactDirectory", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("contactDirectory database created");
    },
  });
};

// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
  console.log("Post to the database");
  const contactDirectoryDb = await openDB("contactDirectory", 1);
  const tx = contactDirectoryDb.transaction("contactDirectory", "readwrite");
  const store = tx.objectStore("contactDirectory");
  const request = store.add({
    name: name,
    home_phone: home,
    cell_phone: cell,
    email: email,
  });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  console.log("GET all from the database");
  const contactDirectoryDb = await openDB("contactDirectory", 1);
  const tx = contactDirectoryDb.transaction("contactDirectory", "readonly");
  const store = tx.objectStore("contactDirectory");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log("DELETE from the database", id);
  const contactDirectoryDb = await openDB("contactDirectory", 1);
  const tx = contactDirectoryDb.transaction("contactDirectory", "readwrite");
  const store = tx.objectStore("contactDirectory");
  const request = store.delete(id);
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
