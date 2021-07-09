import axios from 'axios';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Content from '../components/Content';

export default function Home({ vaccinations }) {
  return (
    <div>
      <Navbar />
      <Header />
      <Content vaccinations={vaccinations} />
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await axios.get(`${process.env.baseApiUrl}/vaccinations?_limit=8`)
  const vaccinations = await res.data

  // Pass data to the page via props
  return { props: { vaccinations } }
}