import React, {useContext} from 'react';
import { UserContext } from '../context/userContext';
import Products from '../components/Products';


const Home = () => {

    const {currentUser} = useContext(UserContext)

    return (
        <div className='wrapper'>
            <Products />
        </div>
    );
};

export default Home;