export const Heading = () => {
    return (
        <header>
            <img src="./Reddit-Logo.png" alt="reddit logo" />
            <SearchBar />
            <input type="button" value="Search" />
        </header>
    );
};

const SearchBar = () => {
    return (
        <div className="search-container">
            <input type="text" placeholder="Search Reddit" name="search" />
        </div>
    );
};

export default Heading;