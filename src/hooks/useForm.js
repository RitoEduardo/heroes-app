import { useState } from 'react'

export const useForm = ( initialState = {} ) => {
    
    const [values, setFormValues] = useState(initialState);

    const reset = () => {
        setFormValues(initialState);
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [
        values,
        handleInputChange,
        reset
    ];
    
}