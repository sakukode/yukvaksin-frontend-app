import { useState } from "react";
import Link from 'next/link'

const Header = () => {

    const [city, setCity] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [photo, setPhoto] = useState("")
    const [types, setTypes] = useState("")
    const [documents, setDocuments] = useState("")

    return (
        <div className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="py-6 md:py-12">
                <div className="container px-4 mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-medium mb-2">Yuk bantu share lokasi pelayanan vaksinasi COVID-19 di kota kamu</h1>
                        <div className="mt-10">
                            <Link href="/upload">
                                <a className="bg-green-400 text-white py-4 px-4 rounded-md">Upload Poster Vaksinasi</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
