// import fixed from "./index"
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

import firebase from "./firebaseInit";

const { db } = firebase;
const createDocument = async (cln, data) => {
  try {
    console.log(`Creating document in ${cln}:`, data);
    const docRef = await addDoc(collection(db, cln), data);
    console.log(`Successfully created document with ID: ${docRef.id} in ${cln}`);
    return { didSucceed: true, docId: docRef.id };
  } catch (error) {
    console.error(`Error creating document in ${cln}:`, error);
    return {
      didSucceed: false,
      message: error.message || "Failed to create document",
      error: error
    };
  }
};

const fetchDocuments = async (cln) => {
  let items = [];
  try {
    const docsQuery = query(collection(db, cln), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(docsQuery);

    querySnapshot.forEach((doc) => {
      const item = { ...doc.data(), id: doc.id };
      items.push(item);
    });

    return { didSucceed: true, items };
  } catch (error) {
    return { didSucceed: false, items };
  }
};

const updateDocument = async (collection, docId, data) => {
  try {
    console.log(`Updating document in ${collection} with ID: ${docId}`, data);
    await updateDoc(doc(db, collection, docId), data);
    console.log(`Successfully updated document ${docId} in ${collection}`);
    return { didSucceed: true };
  } catch (error) {
    console.error(`Error updating document ${docId} in ${collection}:`, error);
    return { 
      didSucceed: false, 
      message: error.message || "Failed to update document",
      error: error
    };
  }
};

const deleteDocument = async (collection, docId) => {
  try {
    await deleteDoc(doc(db, collection, docId));

    return { didSucceed: true };
  } catch (error) {
    return { didSucceed: false };
  }
};

const getSingleDocument = async (collection, docId) => {
  try {
    const docSnap = await getDoc(doc(db, collection, docId));

    if (docSnap.exists()) {
      return { didSucceed: true, document: docSnap.data() };
    } else {
      console.log(`id : ${docId}...doc: doc not found`);
      return { didSucceed: true, document: null };
    }
  } catch (error) {
    console.log(`id : ${docId}...doc: doc not found`);
    return { didSucceed: false };
  }
};

//Featured Tours.....................................................
const fetchFeaturedTours = async () => {
  let items = [];
  try {
    const qr = query(
      collection(db, "tour-packages"),
      where("featured", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(qr);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots.......
      const item = { ...doc.data(), id: doc.id };
      items.push(item);
    });
    return { didSucceed: true, items };
  } catch (error) {
    return { didSucceed: false, items };
  }
};

//doc get by matchihng a  multiple fields that are just a strings . eg. title,.........................
// Function to create a Firestore query with dynamic where clauses
const createDynamicQuery = (db, collectionName, filters, orderByData) => {
  let q = collection(db, collectionName);

  const validFilters = filters.filter((itm) => {
    if (!itm.fieldName || !itm.value) return false;
    return true;
  });

  validFilters.forEach((filter) => {
    if (filter.fieldName === "focus" || filter.fieldName === "tags") {
      q = query(q, where(filter.fieldName, "array-contains", filter.value));
    } else {
      q = query(q, where(filter.fieldName, "==", filter.value));
    }
  });

  // Add orderBy clause if needed
  if (orderByData) {
    q = query(q, orderBy(orderByData.fieldName, orderByData.value));
  }
  return q;
};

const getSingleDocByFieldName = async (cln, userFilters) => {
  try {
    // Usage

    const qr = createDynamicQuery(db, cln, userFilters);

    const docSnap = await getDocs(qr);

    if (!docSnap.empty) {
      let item = {};
      docSnap.forEach((doc) => {
        item = { ...doc.data(), id: doc.id };
      });

      return {
        didSucceed: true,
        document: item,
      };
    } else {
      console.log("doc not found");
      return { didSucceed: true, document: null };
    }
  } catch (error) {
    console.log("error fetching doc...................", error);
    return { didSucceed: false, document: null };
  }
};

const getMultipleDocsByFieldNames = async (cln, userFilters, orderByData) => {
  try {
    // Usage

    const qr = createDynamicQuery(db, cln, userFilters, orderByData);

    const docSnap = await getDocs(qr);

    if (!docSnap.empty) {
      let item = {};
      let itemsArrary = [];
      docSnap.forEach((doc) => {
        item = { ...doc.data(), id: doc.id };
        itemsArrary = [...itemsArrary, item];
      });

      return {
        didSucceed: true,
        documents: itemsArrary,
      };
    } else {
      console.log("error..collection is empty");
      return { didSucceed: true, documents: [] };
    }
  } catch (error) {
    console.log("error..........................", error);
    return { didSucceed: false, documents: null };
  }
};

//filter tours.......................................................
const getFilteredTours = async (cln, searchOptions) => {
  let items = [];
  try {
    // Function to fetch tours based on multiple filters.......................

    let tourQuery = collection(db, cln);

    // Apply filters...........................................................

    //tour focus...............................................
    if (searchOptions.focus !== undefined && searchOptions.focus !== "") {
      tourQuery = query(tourQuery, where("focus", "==", searchOptions.focus));
    }
    //.........................................................

    if (searchOptions.duration !== undefined && searchOptions.duration !== "") {
      const minValue = searchOptions.duration.value[0];
      const maxValue = searchOptions.duration.value[1];

      tourQuery = query(
        tourQuery,
        where("durationTitle", "==", searchOptions.duration.durationTitle),
        where("duration", ">=", parseInt(minValue)),
        where("duration", "<=", parseInt(maxValue))
      );
    }

    //when........................................
    if (searchOptions.months !== undefined && searchOptions.months !== "") {
      tourQuery = query(
        tourQuery,
        where("availability", "array-contains-any", [
          parseInt(searchOptions.months[0]),
          parseInt(searchOptions.months[1]),
        ])
      );
    }

    tourQuery = query(tourQuery, orderBy("createdAt", "desc"));
    //get docs....
    const querySnapshot = await getDocs(tourQuery);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const item = { ...doc.data(), id: doc.id };
      items.push(item);
    });

    //destination(done after docs have been fetched)..............................
    if (
      searchOptions.destination !== undefined &&
      searchOptions.destination !== "" &&
      items.length > 0
    ) {
      let filteredTours = [];
      //iterating through tours array
      items.forEach((item) => {
        const hasDestination = item.itinerary.some(
          (itn) => itn.destination == searchOptions.destination
        );
        if (hasDestination) {
          filteredTours.push(item);
        }
      });

      items = [...filteredTours];
    }

    return { didSucceed: true, items };
  } catch (error) {
    console.log("ahahah", error);
    return { didSucceed: false, items };
  }
};
//end of filter tours................................

// Settings specific operations
const saveSettings = async (settingsData) => {
  try {
    // Check if settings document already exists
    const settingsQuery = query(collection(db, "settings"));
    const querySnapshot = await getDocs(settingsQuery);
    
    if (querySnapshot.empty) {
      // Create new settings document
      const docRef = await addDoc(collection(db, "settings"), {
        ...settingsData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { didSucceed: true, docId: docRef.id, message: "Settings created successfully" };
    } else {
      // Update existing settings document
      const existingDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "settings", existingDoc.id), {
        ...settingsData,
        updatedAt: new Date()
      });
      return { didSucceed: true, docId: existingDoc.id, message: "Settings updated successfully" };
    }
  } catch (error) {
    console.error("Error saving settings: ", error);
    return {
      didSucceed: false,
      message: "Failed to save settings"
    };
  }
};

const getSettings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "settings"));
    
    if (!querySnapshot.empty) {
      // Get the first (and should be only) settings document
      const settingsDoc = querySnapshot.docs[0];
      return {
        didSucceed: true,
        settings: { ...settingsDoc.data(), id: settingsDoc.id }
      };
    } else {
      return {
        didSucceed: true,
        settings: null,
        message: "No settings found"
      };
    }
  } catch (error) {
    console.error("Error getting settings: ", error);
    return {
      didSucceed: false,
      message: "Failed to retrieve settings"
    };
  }
};

// Attributes CRUD Operations
const getAttributes = async (attributeType) => {
  try {
    const docsQuery = query(
      collection(db, `attributes-${attributeType}`),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(docsQuery);
    
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    
    return { didSucceed: true, items };
  } catch (error) {
    console.error(`Error getting ${attributeType} attributes: `, error);
    return {
      didSucceed: false,
      items: [],
      message: `Failed to retrieve ${attributeType} attributes`
    };
  }
};

const createAttribute = async (attributeType, attributeData) => {
  try {
    const dataWithTimestamp = {
      ...attributeData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(
      collection(db, `attributes-${attributeType}`),
      dataWithTimestamp
    );
    
    const createdItem = {
      ...dataWithTimestamp,
      id: docRef.id
    };
    
    return {
      didSucceed: true,
      item: createdItem,
      docId: docRef.id,
      message: `${attributeType} attribute created successfully`
    };
  } catch (error) {
    console.error(`Error creating ${attributeType} attribute: `, error);
    return {
      didSucceed: false,
      message: `Failed to create ${attributeType} attribute`
    };
  }
};

const updateAttribute = async (attributeType, docId, attributeData) => {
  try {
    const dataWithTimestamp = {
      ...attributeData,
      updatedAt: new Date()
    };
    
    await updateDoc(
      doc(db, `attributes-${attributeType}`, docId),
      dataWithTimestamp
    );
    
    return {
      didSucceed: true,
      message: `${attributeType} attribute updated successfully`
    };
  } catch (error) {
    console.error(`Error updating ${attributeType} attribute: `, error);
    return {
      didSucceed: false,
      message: `Failed to update ${attributeType} attribute`
    };
  }
};

const deleteAttribute = async (attributeType, docId) => {
  try {
    await deleteDoc(doc(db, `attributes-${attributeType}`, docId));
    
    return {
      didSucceed: true,
      message: `${attributeType} attribute deleted successfully`
    };
  } catch (error) {
    console.error(`Error deleting ${attributeType} attribute: `, error);
    return {
      didSucceed: false,
      message: `Failed to delete ${attributeType} attribute`
    };
  }
};

// FAQ Operations
const getFAQs = async () => {
  try {
    const items = [];
    const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    
    return {
      didSucceed: true,
      items
    };
  } catch (error) {
    console.error('Error fetching FAQs: ', error);
    return {
      didSucceed: false,
      items: []
    };
  }
};

const createFAQ = async (faqData) => {
  try {
    const timestamp = new Date();
    const dataToSave = {
      ...faqData,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    const docRef = await addDoc(collection(db, 'faqs'), dataToSave);
    
    const createdItem = {
      id: docRef.id,
      ...dataToSave
    };
    
    return {
      didSucceed: true,
      docId: docRef.id,
      createdItem,
      message: 'FAQ created successfully'
    };
  } catch (error) {
    console.error('Error creating FAQ: ', error);
    return {
      didSucceed: false,
      message: 'Failed to create FAQ'
    };
  }
};

const updateFAQ = async (docId, faqData) => {
  try {
    const timestamp = new Date();
    const dataToUpdate = {
      ...faqData,
      updatedAt: timestamp
    };
    
    await updateDoc(doc(db, 'faqs', docId), dataToUpdate);
    
    return {
      didSucceed: true,
      message: 'FAQ updated successfully'
    };
  } catch (error) {
    console.error('Error updating FAQ: ', error);
    return {
      didSucceed: false,
      message: 'Failed to update FAQ'
    };
  }
};

const deleteFAQ = async (docId) => {
  try {
    await deleteDoc(doc(db, 'faqs', docId));
    
    return {
      didSucceed: true,
      message: 'FAQ deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting FAQ: ', error);
    return {
      didSucceed: false,
      message: 'Failed to delete FAQ'
    };
  }
};

// Gallery Operations
const getGalleryImages = async () => {
  try {
    const docsQuery = query(
      collection(db, "gallery"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(docsQuery);
    const images = [];

    querySnapshot.forEach((doc) => {
      const image = { ...doc.data(), id: doc.id };
      images.push(image);
    });

    return { didSucceed: true, images };
  } catch (error) {
    console.error("Error fetching gallery images: ", error);
    return { didSucceed: false, images: [], message: "Failed to fetch gallery images" };
  }
};

const createGalleryImage = async (imageData) => {
  try {
    const galleryImage = {
      ...imageData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const docRef = await addDoc(collection(db, "gallery"), galleryImage);
    return { didSucceed: true, docId: docRef.id, message: "Gallery image added successfully" };
  } catch (error) {
    console.error("Error creating gallery image: ", error);
    return {
      didSucceed: false,
      message: "Failed to add gallery image",
    };
  }
};

const updateGalleryImage = async (docId, imageData) => {
  try {
    const updatedData = {
      ...imageData,
      updatedAt: new Date(),
    };
    
    await updateDoc(doc(db, "gallery", docId), updatedData);
    return { didSucceed: true, message: "Gallery image updated successfully" };
  } catch (error) {
    console.error("Error updating gallery image: ", error);
    return { didSucceed: false, message: "Failed to update gallery image" };
  }
};

const deleteGalleryImage = async (docId) => {
  try {
    await deleteDoc(doc(db, "gallery", docId));
    return { didSucceed: true, message: "Gallery image deleted successfully" };
  } catch (error) {
    console.error("Error deleting gallery image: ", error);
    return { didSucceed: false, message: "Failed to delete gallery image" };
  }
};

const getGalleryImagesByCategory = async (category) => {
  try {
    const docsQuery = query(
      collection(db, "gallery"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(docsQuery);
    const images = [];

    querySnapshot.forEach((doc) => {
      const image = { ...doc.data(), id: doc.id };
      images.push(image);
    });

    return { didSucceed: true, images };
  } catch (error) {
    console.error("Error fetching gallery images by category: ", error);
    return { didSucceed: false, images: [], message: "Failed to fetch gallery images" };
  }
};

export {
  createDocument,
  updateDocument,
  deleteDocument,
  fetchDocuments,
  getSingleDocument,
  getFilteredTours,
  fetchFeaturedTours,
  getSingleDocByFieldName,
  getMultipleDocsByFieldNames,
  saveSettings,
  getSettings,
  getAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryImagesByCategory,
};
