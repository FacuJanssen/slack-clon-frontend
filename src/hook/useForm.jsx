import React from "react";
import { useState } from "react";

const useForm = (initial_form_state, onSubmit) => {
    const [form_state, setFormState] = useState(initial_form_state);
    const onInputChange = (e) => {
        const field = e.target;
        const field_name = field.name;
        const field_value = field.value;
        setFormState((prevFormState) => {
            return {
                ...prevFormState,
                [field_name]: field_value,
            };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form_state);
    };
    const resetForm = () => {
        setFormState(initial_form_state);
    };
    return {
        form_state,
        onInputChange,
        handleSubmit,
        resetForm,
    };
};

export default useForm;
