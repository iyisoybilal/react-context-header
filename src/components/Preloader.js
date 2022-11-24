import React, { useState } from 'react'

function Preloader({ isActive = false }) {
    return (
        <div className={'position-fixed z-index  h-100 w-100' + (isActive ? '' : ' d-none')} style={{ backgroundColor: '#343a4038', top: '0', left: '0' }}>
            <div className="position-absolute  translate-middle h-100 w-100 " style={{ marginTop: '200px' }}>
                <br /><br />
                <div className="row h-100 w-100">
                    <div className="col-md-12">
                        <div className="loader14">
                            <div className="loader-inner">
                                <div className="box-1"></div>
                                <div className="box-2"></div>
                                <div className="box-3"></div>
                                <div className="box-4"></div>
                            </div>
                            <span className="text">loading</span>
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        </div>
    )
}

export default Preloader
