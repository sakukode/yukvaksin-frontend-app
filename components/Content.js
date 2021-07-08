import axios from 'axios';

import Item from './Item';

const Content = ({vaccinations}) => {
    return (
        <div>
            
            <div className="py-6 md:py-12">
                <div className="container px-4 mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-medium mb-2">Temukan lokasi pelayanan vaksinasi COVID-19 di bawah ini</h1>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {vaccinations.map(vaccination => (
                  <Item key={vaccination.id} vaccination={vaccination}/>
              ))}
            </div>
        </div>
    );
}


 
export default Content;