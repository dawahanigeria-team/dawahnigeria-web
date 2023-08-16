import React from 'react';
import LangOptions from './searchOptionWidget/langOptions';
import LecturerOptions from './searchOptionWidget/lecturerOptions';
import AlbumOptions from './searchOptionWidget/albumOptions';
import CatOptions from './searchOptionWidget/catOptions';
const SearchOptions = () => {
    return (
        <div className='w-full pb-20'>
            <LangOptions/>
            <LecturerOptions/>
            <CatOptions/>
            <AlbumOptions/>

        </div>
    )
}

export default SearchOptions