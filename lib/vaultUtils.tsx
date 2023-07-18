import React, { useState, useContext, useEffect, PropsWithChildren, ReactChild } from 'react';
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    getFirestore,
    getDoc,
    setDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { showToast } from '@/components/showToast';
import { app } from '@/lib/firebaseConfig/init'
const db = getFirestore(app)

// type Props = {
//     children: React.ReactNode;
// };

// const router = useRouter();
// const [isDBValveOpen, setIsDBValveOpen] = useState(1);

// const getData =
//     1 &&
//     isDBValveOpen &&
//     (router.pathname.startsWith('/addItem') ||
//         router.pathname.startsWith('/vault'));

// CRUD operations for University
const createUniversity = async (university: University): Promise<void> => {
    await addDoc(collection(db, 'universities'), university)
        .then(() => {
            showToast('University added successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

const getUniversity = async (universityId: string): Promise<University | undefined> => {
    const docRef = doc(db, 'universities', universityId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as University;
    }
    return undefined;
};

const getAllUniversities = async (): Promise<University[]> => {
    const snapshot = await getDocs(collection(db, 'universities'));
    const universityArr: University[] = [];
    snapshot.forEach((doc) => {
        universityArr.push(doc.data() as University);
    });
    return universityArr;
};

const updateUniversity = async (universityId: string, university: University): Promise<void> => {
    await setDoc(doc(db, 'universities', universityId), university)
        .then(() => {
            showToast('University updated successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

const deleteUniversity = async (universityId: string): Promise<void> => {
    await deleteDoc(doc(db, 'universities', universityId))
        .then(() => {
            showToast('University deleted successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

// CRUD operations for Department
const createDepartment = async (universityId: string, department: Department): Promise<void> => {
    await addDoc(collection(db, 'universities', universityId, 'departments'), department)
        .then(() => {
            showToast('Department added successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

const getDepartment = async (universityId: string, departmentId: string): Promise<Department | undefined> => {
    const docRef = doc(db, 'universities', universityId, 'departments', departmentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as Department;
    }
    return undefined;
};

const getAllDepartments = async (universityId: string): Promise<Department[]> => {
    const snapshot = await getDocs(collection(db, 'universities', universityId, 'departments'));
    const departmentArr: Department[] = [];
    snapshot.forEach((doc) => {
        departmentArr.push(doc.data() as Department);
    })
    return departmentArr;
};

const updateDepartment = async (universityId: string, departmentId: string, department: Department): Promise<void> => {
    await setDoc(doc(db, 'universities', universityId, 'departments', departmentId), department)
        .then(() => {
            showToast('Department updated successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};


const deleteDepartment = async (universityId: string, departmentId: string): Promise<void> => {
    await deleteDoc(doc(db, 'universities', universityId, 'departments', departmentId))
        .then(() => {
            showToast('Department deleted successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

// CRUD operations for Paper
const createPaper = async (universityId: string, departmentId: string, paper: Paper): Promise<void> => {
    await addDoc(collection(db, 'universities', universityId, 'departments', departmentId, 'papers'), paper)
        .then(() => {
            showToast('Paper added successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

const getPaper = async (universityId: string, departmentId: string, paperId: string): Promise<Paper | undefined> => {
    const docRef = doc(db, 'universities', universityId, 'departments', departmentId, 'papers', paperId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as Paper;
    }
    return undefined;
};

const updatePaper = async (universityId: string, departmentId: string, paperId: string, paper: Paper): Promise<void> => {
    await setDoc(doc(db, 'universities', universityId, 'departments', departmentId, 'papers', paperId), paper)
        .then(() => {
            showToast('Paper updated successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

const deletePaper = async (universityId: string, departmentId: string, paperId: string): Promise<void> => {
    await deleteDoc(doc(db, 'universities', universityId, 'departments', departmentId, 'papers', paperId))
        .then(() => {
            showToast('Paper deleted successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

const getAllPapers = async (universityId: string, departmentId: string): Promise<Paper[]> => {
    const snapshot = await getDocs(collection(db, 'universities', universityId, 'departments', departmentId, 'papers'));
    const papers: Paper[] = [];
    snapshot.forEach((doc) => {
        papers.push(doc.data() as Paper);
    });
    return papers;
};

// CRUD operations for Year
const createYear = async (universityId: string, departmentId: string, paperId: string, year: Year): Promise<string> => {
    // const docRef = await addDoc(collection(db, 'universities', universityId, 'departments', departmentId, 'papers', paperId, 'years'), year)
    //     .then(() => {
    //         showToast('Year added successfully', 'success');
    //     })
    //     .catch((error) => {
    //         showToast(error.message, 'error');
    //     });
    // return docRef.id;    
    const yearCollectionRef = collection(db, 'universities', universityId, 'departments', departmentId, 'papers', paperId, 'years');
    const yearDocRef = doc(yearCollectionRef);
    const yearId = yearDocRef.id;
    await setDoc(yearDocRef, year);
    return yearId;
};

const getYear = async (universityId: string, departmentId: string, paperId: string, yearId: string): Promise<Year | undefined> => {
    const docRef = doc(db, 'universities', universityId, 'departments', departmentId, 'papers', paperId, 'years', yearId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as Year;
    }
    return undefined;
};

const updateYear = async (universityId: string, departmentId: string, paperId: string, yearId: string, year: Year): Promise<void> => {
    await setDoc(doc(db, 'universities', universityId, 'departments', departmentId, 'papers', paperId, 'years', yearId), year)
        .then(() => {
            showToast('Pdf replaced successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

const deleteYear = async (universityId: string, departmentId: string, paperId: string, yearId: string): Promise<void> => {
    await deleteDoc(doc(db, 'universities', universityId, 'departments', departmentId, 'papers', paperId, 'years', yearId))
        .then(() => {
            showToast('Pdf deleted successfully', 'success');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
};

const getAllYears = async (universityId: string, departmentId: string, paperId: string): Promise<Year[]> => {
    const snapshot = await getDocs(collection(db, 'universities', universityId, 'departments', departmentId, 'papers', paperId, 'years'));
    const years: Year[] = [];
    snapshot.forEach((doc) => {
        years.push(doc.data() as Year);
    });
    return years;
};

export {
    createUniversity,
    getUniversity,
    getAllUniversities,
    updateUniversity,
    deleteUniversity,
    createDepartment,
    getDepartment,
    getAllDepartments,
    updateDepartment,
    deleteDepartment,
    createPaper,
    getPaper,
    getAllPapers,
    updatePaper,
    deletePaper,
    createYear,
    getYear,
    getAllYears,
    updateYear,
    deleteYear
};