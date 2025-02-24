import React, { FormEvent } from "react";

export const RegistrationPage = () => {
    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();

    }

    return (<section>
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
        </form>
    </section>);
}