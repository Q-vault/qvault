// import React, { useContext, useEffect, useState } from 'react';
// import { getStorage, ref, uploadBytes } from 'firebase/storage';
// import { app } from '@/lib/firebaseConfig/init';
// const storage = getStorage(app);
// import {
//     createUniversity,
//     getAllUniversities,
//     createDepartment,
//     getAllDepartments,
//     createPaper,
//     getAllPapers,
//     createYear,
// } from '@/lib/vaultUtils';

// const AddVaultItems = () => {
//     const [addingOption, setAddingOption] = useState(1)

//     return (
//         <div className='flex flex-col w-full h-full gap-4 p-4 dark:bg-zinc-900'>
//             <div className=''>
//                 <AdditionOptions active={addingOption} setActive={setAddingOption} />
//             </div>
//             <div className='w-full h-full bg-white dark:bg-zinc-800 rounded-xl '>
//                 {(() => {
//                     if (addingOption == 1)
//                         return <AddUniversity/>
//                     if (addingOption == 2)
//                         return (
//                             <AddDepartment/>
//                         )
//                     if (addingOption == 3)
//                         return (
//                             <AddPaper/>
//                         )
//                     if (addingOption == 4)
//                         return (
//                             <AddYear/>
//                         )
//                 })()}
//             </div>
//         </div>
//     )
// }

// export default AddVaultItems;

// const AdditionOptions = ({ active, setActive }: any) => {
//     return (
//         <div className='flex justify-around w-full gap-4 p-2 bg-white rounded-xl dark:bg-zinc-800 '>
//             <button
//                 onClick={() => setActive(1)}
//                 className={`flex rounded-xl p-2 justify-center transition hover:bg-zinc-100 dark:hover:bg-zinc-900 w-full ${active == 1 ? 'bg-black text-white hover:bg-zinc-800' : ''
//                     } `}
//             >
//                 Add a new University
//             </button>
//             <button
//                 onClick={() => setActive(2)}
//                 className={`flex rounded-xl dark:hover:bg-zinc-900 p-2 justify-center transition hover:bg-zinc-100 w-full ${active == 2 ? 'bg-black text-white hover:bg-zinc-800' : ''
//                     } `}
//             >
//                 Add a new Department
//             </button>
//             <button
//                 onClick={() => setActive(3)}
//                 className={`flex rounded-xl p-2 dark:hover:bg-zinc-900 justify-center transition hover:bg-zinc-100 w-full ${active == 3 ? 'bg-black text-white hover:bg-zinc-800' : ''
//                     } `}
//             >
//                 Add a new Paper
//             </button>
//             <button
//                 onClick={() => setActive(4)}
//                 className={`flex rounded-xl p-2 dark:hover:bg-zinc-900 justify-center transition hover:bg-zinc-100 w-full ${active == 4 ? 'bg-black text-white hover:bg-zinc-800' : ''
//                     } `}
//             >
//                 Add a new Year
//             </button>
//         </div>
//     )
// }

// // # University Form
// const AddUniversity: React.FC = () => {
//     const [universityName, setUniversityName] = useState('');
//     const [location, setLocation] = useState('');

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (universityName.trim() === '' || location.trim() === '') {
//             // Handle empty input or validation error
//             return;
//         }

//         // Create a new university object
//         const newUniversity = {
//             id: '',
//             location: location,
//             name: universityName,
//             departments: []
//             // Include other university fields if necessary
//         };

//         // Call the createUniversity function to add the new university to the database
//         await createUniversity(newUniversity);

//         // Reset the form
//         setUniversityName('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={universityName}
//                 onChange={(e) => setUniversityName(e.target.value)}
//                 placeholder="Enter university name"
//             />
//             <br/>
//             <br/>
//             <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Enter university location"
//             />
//             <br/>
//             <br/>
//             <button type="submit">Create University</button>
//         </form>
//     );
// };

// // # Department Form
// const AddDepartment: React.FC = () => {
//     const [departmentName, setDepartmentName] = useState('');
//     const [universityId, setUniversityId] = useState('');
//     const [universities, setUniversities] = useState<University[]>([]);

//     useEffect(() => {
//         const fetchUniversities = async () => {
//             const allUniversities = await getAllUniversities();
//             setUniversities(allUniversities);
//         };

//         fetchUniversities();
//     }, []);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (departmentName.trim() === '' || universityId.trim() === '') {
//             // Handle empty input or validation error
//             return;
//         }

//         // Create a new department object
//         const newDepartment = {
//             id: '', // Auto-generated ID will be assigned by Firestore
//             name: departmentName,
//             papers: [],
//         };

//         // Call the createDepartment function to add the new department to the database
//         await createDepartment(universityId, newDepartment);

//         // Reset the form
//         setDepartmentName('');
//         setUniversityId('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={departmentName}
//                 onChange={(e) => setDepartmentName(e.target.value)}
//                 placeholder="Enter department name"
//             />
//             <select value={universityId} onChange={(e) => setUniversityId(e.target.value)}>
//                 <option value="">Select University</option>
//                 {universities.map((university) => (
//                     <option key={university.id} value={university.id}>
//                         {university.name}
//                     </option>
//                 ))}
//             </select>
//             <button type="submit">Create Department</button>
//         </form>
//     );
// };

// // # Paper Form
// const AddPaper: React.FC = () => {
//     const [paperName, setPaperName] = useState('');
//     const [universities, setUniversities] = useState<University[]>([]);
//     const [departments, setDepartments] = useState<Department[]>([]);
//     const [selectedUniversityId, setSelectedUniversityId] = useState('');
//     const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
//     const [departmentDropdownDisabled, setDepartmentDropdownDisabled] = useState(true);

//     useEffect(() => {
//         const fetchUniversities = async () => {
//             const allUniversities = await getAllUniversities();
//             setUniversities(allUniversities);
//         };

//         fetchUniversities();
//     }, []);

//     useEffect(() => {
//         const fetchDepartments = async () => {
//             const allDepartments = await getAllDepartments(selectedUniversityId);
//             setDepartments(allDepartments);
//         };

//         if (selectedUniversityId) {
//             fetchDepartments();
//             setDepartmentDropdownDisabled(false);
//         } else {
//             setDepartments([]);
//             setDepartmentDropdownDisabled(true);
//         }
//     }, [selectedUniversityId]);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (paperName.trim() === '' || selectedUniversityId.trim() === '' || selectedDepartmentId.trim() === '') {
//             // Handle empty input or validation error
//             return;
//         }

//         // Create a new paper object
//         const newPaper = {
//             id: '', // Auto-generated ID will be assigned by Firestore
//             name: paperName,
//             years: [],
//         };

//         // Call the createPaper function to add the new paper to the database
//         await createPaper(selectedUniversityId, selectedDepartmentId, newPaper);

//         // Reset the form
//         setPaperName('');
//         setSelectedUniversityId('');
//         setSelectedDepartmentId('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={paperName}
//                 onChange={(e) => setPaperName(e.target.value)}
//                 placeholder="Enter paper name"
//             />
//             <select value={selectedUniversityId} onChange={(e) => setSelectedUniversityId(e.target.value)}>
//                 <option value="">Select University</option>
//                 {universities.map((university) => (
//                     <option key={university.id} value={university.id}>
//                         {university.name}
//                     </option>
//                 ))}
//             </select>
//             <select value={selectedDepartmentId} onChange={(e) => setSelectedDepartmentId(e.target.value)} disabled={departmentDropdownDisabled}>
//                 <option value="">Select Department</option>
//                 {departments.map((department) => (
//                     <option key={department.id} value={department.id}>
//                         {department.name}
//                     </option>
//                 ))}
//             </select>
//             <button type="submit">Create Paper</button>
//         </form>
//     );
// };

// // # Year Form
// const AddYear: React.FC = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [year, setYear] = useState('');
//     const [universities, setUniversities] = useState<University[]>([]);
//     const [departments, setDepartments] = useState<Department[]>([]);
//     const [papers, setPapers] = useState<Paper[]>([]);
//     const [selectedUniversityId, setSelectedUniversityId] = useState('');
//     const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
//     const [selectedPaperId, setSelectedPaperId] = useState('');
//     const [departmentDropdownDisabled, setDepartmentDropdownDisabled] = useState(true);
//     const [paperDropdownDisabled, setPaperDropdownDisabled] = useState(true);

//     useEffect(() => {
//         const fetchUniversities = async () => {
//             const allUniversities = await getAllUniversities();
//             setUniversities(allUniversities);
//         };

//         fetchUniversities();
//     }, []);

//     useEffect(() => {
//         const fetchDepartments = async () => {
//             const allDepartments = await getAllDepartments(selectedUniversityId);
//             setDepartments(allDepartments);
//         };

//         if (selectedUniversityId) {
//             fetchDepartments();
//             setDepartmentDropdownDisabled(false);
//         } else {
//             setDepartments([]);
//             setDepartmentDropdownDisabled(true);
//         }
//     }, [selectedUniversityId]);

//     useEffect(() => {
//         const fetchPapers = async () => {
//             const allPapers = await getAllPapers(selectedUniversityId, selectedDepartmentId);
//             setPapers(allPapers);
//         };

//         if (selectedDepartmentId) {
//             fetchPapers();
//             setPaperDropdownDisabled(false);
//         } else {
//             setPapers([]);
//             setPaperDropdownDisabled(true);
//         }
//     }, [selectedDepartmentId]);

//     const uploadFileToStorage = (file: File, filePath: string): Promise<void> => {
//         return new Promise((resolve, reject) => {
//             // Create a storage reference with the desired file path
//             const storageRef = ref(storage, filePath);

//             // Upload the file to the storage reference
//             uploadBytes(storageRef, file)
//                 .then(() => {
//                     resolve();
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 });
//         });
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (!file || year.trim() === '' || selectedUniversityId.trim() === '' || selectedDepartmentId.trim() === '' || selectedPaperId.trim() === '') {
//             // Handle empty input or validation error
//             return;
//         }

//         // Create a new year object
//         const newYear = {
//             id: '', // Auto-generated ID will be assigned by Firestore
//             year: parseInt(year),
//         };

//         try {
//             // Call the createYear function to add the new year's question paper to the database
//             const createdYearid = await createYear(selectedUniversityId, selectedDepartmentId, selectedPaperId, newYear);

//             // Upload the PDF file to Firebase Storage
//             const filePath = `universities/${selectedUniversityId}/departments/${selectedDepartmentId}/Papers/${selectedPaperId}/years/${createdYearid}/${file.name}`;
//             await uploadFileToStorage(file, filePath);

//             // Reset the form
//             setFile(null);
//             setYear('');
//             setSelectedUniversityId('');
//             setSelectedDepartmentId('');
//             setSelectedPaperId('');
//         } catch (error) {
//             // Handle error
//             console.error(error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//             <input
//                 type="text"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 placeholder="Enter year"
//             />
//             <select value={selectedUniversityId} onChange={(e) => setSelectedUniversityId(e.target.value)}>
//                 <option value="">Select University</option>
//                 {universities.map((university) => (
//                     <option key={university.id} value={university.id}>
//                         {university.name}
//                     </option>
//                 ))}
//             </select>
//             <select value={selectedDepartmentId} onChange={(e) => setSelectedDepartmentId(e.target.value)} disabled={departmentDropdownDisabled}>
//                 <option value="">Select Department</option>
//                 {departments.map((department) => (
//                     <option key={department.id} value={department.id}>
//                         {department.name}
//                     </option>
//                 ))}
//             </select>
//             <select value={selectedPaperId} onChange={(e) => setSelectedPaperId(e.target.value)} disabled={paperDropdownDisabled}>
//                 <option value="">Select Paper</option>
//                 {papers.map((paper) => (
//                     <option key={paper.id} value={paper.id}>
//                         {paper.name}
//                     </option>
//                 ))}
//             </select>
//             <button type="submit">Create Year</button>
//         </form>
//     );
// };
