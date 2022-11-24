import React, { useEffect, useState } from "react";
import CustomButton from "../components/button";

import Preloader from "../components/Preloader";
import { MainContext, useContext } from '../context';


const Todos = () => {
    const { appendContext } = useContext(MainContext);

    const [data, setData] = useState([]);
    const [modalState, setModalState] = useState([]);
    const [customButtonName, setCustomButtonName] = useState('Veri Yok');
    const [isLoading, setIsLoading] = useState(false);
    const [isData, setIsData] = useState(false);
    const [information, setInformation] = useState('');

    useEffect(() => {
        appendContext({ isData, information })
    })

    useEffect(() => {
        if (data.length > 0)
            getSecondData();
        else {
            getFirstData();
        }
    }, [data])

    const getData = async () => {
        setIsLoading(true);
        let data = await fetch("https://jsonplaceholder.typicode.com/todos");
        let json = await data.json();
        setData(json);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
        setIsData(true);
    };
    const getSecondData = () => {
        setCustomButtonName('Getirildi.')
    }
    const getFirstData = () => {
        setCustomButtonName('Veri Yok')
    }

    const deleteData = () => {
        setData([]);
        setIsData(false);
    }

    const customOnclick = () => {
        console.log('custom click')
    }
    const handleModal = (index) => {
        setModalState(data[index]);
        setInformation(data[index].title);
        document.querySelector('.modal').style.display = 'block';
    }

    return (
        <>
            <Preloader isActive={isLoading}></Preloader>
            <div className="button">
                <CustomButton onClick={customOnclick} text={customButtonName} />
                {/* <button onClick={getData}>Verileri Getir</button>
                <button onClick={deleteData}>Verileri Sil</button> */}
                <CustomButton text="Verileri Getir" onClick={getData}></CustomButton>
                <CustomButton text="Verileri Sil" onClick={deleteData}></CustomButton>
            </div>

            {
                isLoading === true ? <div>Yüklemek için butona basın...</div> :
                    data.length === 0 ? <div>Yüklemek için butona basın...</div> :
                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                    <th>UserId</th>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Completed</th>
                                </tr>
                            </thead>

                            <tbody className="table">
                                {
                                    data.map((item, index) => {
                                        return <tr key={index}>
                                            <td className="bg-danger">{item.userId}</td>
                                            <td className="bg-primary">{item.id}</td>
                                            <td className="bg-success">{item.title}</td>
                                            <td className="bg-warning">{item.completed ? 'True' : 'False'}</td>
                                            <td className="bg-info"><button onClick={() => handleModal(index)}>Click</button></td>

                                        </tr>
                                    })

                                }
                            </tbody>

                        </table>
            }
            <div className="modal" style={{
                transition: "display 2s ease-out", animation: "fade-in 1s"
            }} tabIndex="-1">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalState?.name}</h5>
                            <button type="button" className="btn-close" onClick={() => { document.querySelector('.modal').style.display = 'none'; }} aria-label="Close">X</button>
                        </div>
                        <div className="modal-body">
                            <p>{"Id :" + modalState?.id}</p>
                            <br />
                            <p>{"Title :" + modalState?.title}</p>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Todos;