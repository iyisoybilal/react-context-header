import React from 'react'

function Buttons({ action, onClick }) {
    return (
        <div>
            <button onClick={action} className="mt-2">Verileri Getir</button>
            <button onClick={onClick} >Verileri Sil </button>
        </div>
    )
}

export default Buttons
