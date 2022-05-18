import { Link } from "react-router-dom";
import '../../App.css';
import { useState } from "react";

const HomeScreen = params => {

    const [savedName, setSavedName] = useState('');

    const handleChange = (e) => {
        setSavedName(e.target.value);
    }


    return (
        <div>
            <h1 className="title">Wordcloud game</h1>
            <input type="text" name="name" value={savedName} onChange={handleChange} placeholder={'Enter your nickname here...'}></input>
            <Link onClick={() => { params.setName(savedName) }} to={{ pathname: '/Game' }} className='button'>play</Link>
        </div>
    )
}

export default HomeScreen;