import axios from 'axios';
import { useRouter } from 'next/router'

import Navbar from '../../components/Navbar';
import Form from '../../components/Form';

export default function UploadUpdate({ vaccination }) {
  const router = useRouter()
  const { id } = router.query
  return (
    <div>
      <Navbar />
      <Form vaccination={vaccination} />
    </div>
  )
}


// This gets called on every request
export async function getServerSideProps(context) {
    const { id } = context.params
    // Fetch data from external API
    const res = await axios.get(`${process.env.baseApiUrl}/vaccinations/${id}`)
    const vaccination = await res.data
    
    // Pass data to the page via props
    return { props: { vaccination } }
  }