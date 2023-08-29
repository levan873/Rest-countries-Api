import Search from "../components/Search";
import Filter from "../components/Filter";
import AllCountries from "../components/AllCountries";
import { useState } from "react";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [regionFilter, setRegionFilter] = useState<string>('All');

    return (
        <>
            <div className="flex flex-wrap gap-10 justify-between mb-10 mt-10 mr-14 ml-14" >
                <Search value={searchTerm} onChange={setSearchTerm}/>
                <Filter regionFilter={regionFilter} setRegionFilter={setRegionFilter} />
            </div>
            <AllCountries searchTerm={searchTerm} regionFilter={regionFilter}/>
        </>
    );
}

export default Home;