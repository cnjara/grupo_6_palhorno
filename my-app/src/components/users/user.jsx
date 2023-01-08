import React from "react";

export const User = ({ nombre, email,  avatar }) => {
    
    const img = avatar ? 'http://localhost:3030/api/usuarios/imagen/' + avatar.file : '../../DEFAULT-IMAGE.jpg'

    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    <div>
                        <p>{nombre}</p>
                    </div>
                    <div>
                    
                    </div>
                    <div>
                        <p>{email}</p>
                    </div>
                    <div className="avatar-size">
                        <img src={img} alt={nombre} />
                    </div>
                </div>
            </div>
        </div>
    );
};