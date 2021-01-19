import React, { useEffect, useMemo } from 'react'

import queryString from 'query-string'; 
import { useLocation } from 'react-router-dom';
// import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { heroes } from '../../data/heroes';

export const SearchScreen = ( {history} ) => {


    const location = useLocation();
    const { q = '' } = queryString.parse( location.search );
    
    let herosFiltered = useMemo( () => getHeroesByName( q ) , [q] );

    const [ {searchText}, handleInputChange ] = useForm({
        searchText: q
    });

    console.log(q, herosFiltered)

    const handleSearch = ( ev ) => {
        ev.preventDefault();
        history.push('?q='+searchText);
    }

    return (
        <div>
            <h1> Search </h1>
            <hr />

            <div className="row">
                <div className="col-5">

                    <h4> Search Form </h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>

                    </form>

                </div>
                <div className="col-7">

                    <h4> Results </h4>
                    <hr />

                    {
                        ( q === '' ) && 
                            <div className='alert alert-info'>
                                Search a Hero
                            </div>
                    }

                    {
                        ( q !== '' &&  herosFiltered.length === 0 ) && 
                            <div className='alert alert-danger'>
                                There is not a hero with { q }
                            </div>
                    }
                     

                    {
                        herosFiltered.map( hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>
            </div>


        </div>
    )
}
