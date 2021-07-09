const API_URL = 'http://localhost:1337';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'

const Item = ({vaccination}) => {
    const router = useRouter()

    const [deleted, setDeleted] = useState(false)

    const handleDelete = (vaccination) => {
        let confirmDelete = confirm("Are You sure want to delete this?");

        if(confirmDelete) {
            axios.delete(`${process.env.baseApiUrl}/vaccinations/${vaccination.id}`)
                .then(function (response) {
                    console.log(response);
                    setTimeout(() => {
                        setDeleted(true)
                    }, 300)
                })
                .catch(function (error) {
                    console.log(error);
                    alert('Failed delete data.')
                });
        }
    }

    const handleClickUpdate = (vaccination) => {
        router.push({
            pathname: '/upload/[id]',
            query: { id: vaccination.id },
        })
    }

    return (
        <div className={"md:p-8 p-2 bg-white " + (deleted ? "hidden" : "")}>
            {vaccination.photo ? (
              
                <Image 
                    className="rounded-lg w-full" 
                    src={process.env.baseApiUrl + vaccination.photo.url} 
                    width={400}
                    height={400}
                    alt={vaccination.city}
                />
            ) : (
                <Image
                    className="rounded-lg w-full"
                    src={`https://via.placeholder.com/400`}
                    width={400}
                    height={400}
                    alt={`vaksinasi covid-19`}
                />
            )}
            
            
            <h1 className="font-semibold text-gray-900 leading-none text-xl capitalize truncate mt-10">
                { vaccination.city }
            </h1>
            
            <div className="max-w-full">
                <p className="text-base font-medium tracking-wide text-gray-600 mt-1">
                    Apa dokumen yang diperlukan: <strong>{ vaccination.documents }</strong>
                </p>
            </div>

            <p className="font-semibold text-base mt-2">
                <span className="text-gray-500">Jenis Vaksin:</span> 
                <span className="text-green-500"> {vaccination.types}</span>
            </p>

            <div className="flex items-center space-x-2 mt-10">
                <div className="h-12 w-12 bg-green-200 rounded-full flex flex-shrink-0 justify-center items-center text-green-500 text-2xl font-mono">c</div>
                <div>
                    
                    <p className="text-gray-900 font-semibold">{ vaccination.name }</p>
                    <p className="text-gray-500 font-semibold text-sm">
                    Feb 24,2021 &middot; { vaccination.phone ? vaccination.phone : '-' }
                    </p>
                </div>
            </div>

            <div className="mt-5">
                <button className="bg-green-500 text-white py-2 px-2 rounded-md hover:bg-green-400 mr-3" onClick={(e) => handleClickUpdate(vaccination)}>update</button>
                <button className="bg-red-500 text-white py-2 px-2 rounded-md hover:bg-red-400" onClick={(e) => handleDelete(vaccination)}>delete</button>
            </div>
        </div>
    );
}
 
export default Item;