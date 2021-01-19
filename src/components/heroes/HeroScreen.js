import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroesById';

export const HeroScreen = ( { history }) => {

    const params = useParams();

    const hero = useMemo( ()=> getHeroesById(params.id) , [params.id] );

    if( !hero ){
        return <Redirect to='/' />
    }

    const { 
        id, 
        superhero,  
        alter_ego, 
        publisher,
        first_appearance, 
        characters 
    } = hero;

    const handleReturn = () => {

        if( history.length < 2 ){
            history.push('/');
        } else {
            history.goBack();
        }
        
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={ `../assets/heroes/${ id }.jpg`}
                    className="img-thumbnail animate__animated animate__backInLeft "
                    alt={ superhero }
                />
            </div>
            <div className="col-8">
                <h3> { superhero } </h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego : </b>{ alter_ego }</li>
                    <li className="list-group-item"> <b> Publisher : </b>{ publisher }</li>
                    <li className="list-group-item"> <b> First Apparence : </b>{ first_appearance }</li>
                </ul>

                <h5>characters </h5>
                <p> { characters } </p>

                <button
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Back
                </button>
            </div>
        </div>
    )
}
