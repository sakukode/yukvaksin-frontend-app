import axios from 'axios';
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'

const Form = ({ vaccination }) => {
    const router = useRouter()
    
    const [city, setCity] = useState(vaccination ? vaccination.city : "")
    const [name, setName] = useState(vaccination ? vaccination.name : "")
    const [phone, setPhone] = useState(vaccination ? vaccination.phone : "")
    const [photo, setPhoto] = useState("")
    const [selectedPhoto, setSelectedPhoto] = useState(vaccination ? vaccination.photo.name : "")
    const [types, setTypes] = useState(vaccination ? vaccination.types : "")
    const [documents, setDocuments] = useState(vaccination ? vaccination.documents : "")

    const handleUploadClick = (e) => {
        document.getElementById('file-upload').click();
    };

    const handleUploadChange = (e) => {
        console.log(`Selected file - ${e.target.files[0].name}`);
        setSelectedPhoto(e.target.files[0].name)
        setPhoto(e.target.files[0]);
    }

    const handleCreate = (e) => {
        let formData = new FormData();
        
        let postData = {
            'city': city,
            'name': name,
            'phone': phone,
            'types': types,
            'documents': documents
        }

        formData.append("data", JSON.stringify(postData));
        formData.append("files.photo", photo)

        axios({
          method: "post",
          url: `${process.env.baseApiUrl}/vaccinations`,
          data: formData
        })
          .then(({ data }) => {
            router.push('/')
          })
          .catch((error) => {
            console.log("Error: ", error.message);
          });
    };

    const handleUpdate = (e) => {
        let formData = new FormData();
        
        let postData = {
            'city': city,
            'name': name,
            'phone': phone,
            'types': types,
            'documents': documents
        }

        formData.append("data", JSON.stringify(postData));
        formData.append("files.photo", photo)

        axios({
          method: "put",
          url: `${process.env.baseApiUrl}/vaccinations/${vaccination.id}`,
          data: formData
        })
          .then(({ data }) => {
            router.push('/')
          })
          .catch((error) => {
            console.log("Error: ", error.message);
          });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-green-200 rounded-full flex flex-shrink-0 justify-center items-center text-green-500 text-2xl font-mono">
                    i
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed">Lokasi Vaksinasi COVID-19</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Upload poster lokasi vaksinasi yang kamu ketahui.
                    </p>
                </div>
                </div>
                <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                    <label className="leading-loose">Kota</label>
                    <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Event title"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    </div>
                    <div className="flex flex-col">
                    <label className="leading-loose">Nama Kamu</label>
                    <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Optional"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div className="flex flex-col">
                    <label className="leading-loose">No.HP/Telp Kamu</label>
                    <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Optional"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    </div>
                    <div className="flex flex-col">
                    <label className="leading-loose">Poster</label>
                    <button
                        onClick={(e) => handleUploadClick(e)} 
                        className="focus:outline-none text-white text-sm py-2 px-4 rounded-md bg-green-400 hover:bg-green-500 hover:shadow-lg w-4/12 text-center"
                    >
                        Pilih File
                    </button> <span className="text-green-500">{selectedPhoto}</span>
                    <input type="file" id="file-upload" className="hidden" onChange={(e) => handleUploadChange(e)} required />
                    </div>
                    <div className="flex flex-col">
                    <label className="leading-loose">Jenis Vaksin</label>
                    <select value={types.split(",")} className="border border-gray-300 h-40 form-multiselect block w-full mt-1" required onChange={(e) => setTypes(Array.from(e.target.selectedOptions, option => option.value).join(","))} multiple={true}>
                        <option>Sinovac</option>
                        <option>AstraZeneca</option>
                        <option>Sinopharm</option>
                        <option>Moderna</option>
                        <option>Vaksin Nusantara</option>
                    </select>
                    </div>
                    <div className="flex flex-col" required>
                    <label className="leading-loose">Syarat Dokumen</label>
                    <select value={documents.split(",")} className="border border-gray-300 h-40 form-multiselect block w-full mt-1" onChange={(e) => setDocuments(Array.from(e.target.selectedOptions, option => option.value).join(","))} multiple={true}>
                        <option>KTP</option>
                        <option>KK</option>
                        <option>Surat Domisili</option>
                    </select>
                    </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                    <Link href="/">
                        <a className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none bg-gray-200">
                        <svg
                            className="w-6 h-6 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>{" "}
                        Batal
                        </a>
                    </Link>
                   
                    {vaccination ? (
                        <button 
                        className="bg-green-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                        onClick={(e) => handleUpdate(e)}
                        >
                       Ubah
                        </button>
                    ) : (
                         <button 
                         className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                         onClick={(e) => handleCreate(e)}
                         >
                        Tambah
                         </button>
                     )
                    }
                    
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Form;
