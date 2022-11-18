import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export const Heading = () => {
    const [ term, setTerm ] = useState('');
    const history = useHistory();

    const handleClick = () => {
        history.push(`/search/${term}`);
    };

    return (
        <header>
            <Link to="/">
                <img src="/build-your-own-reddit-app/Reddit-Logo.png" alt="reddit logo" />
            </Link>
            <SearchBar term={term}
                       setTerm={setTerm} />
            <input type="button"
                   value="Search"
                   onClick={handleClick} />
        </header>
    );
};

const SearchBar = ({ term, setTerm }) => {

    const handleChange = ({ target }) => {
        setTerm(target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector('header input[type=button]').click();
        }
    };

    return (
        <div className="search-container">
            <input type="text"
                   placeholder="Search Reddit"
                   name="search"
                   onChange={handleChange}
                   onKeyPress={handleKeyPress}
                   value={term} />
        </div>
    );
};

export default Heading;