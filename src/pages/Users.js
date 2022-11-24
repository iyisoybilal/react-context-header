import React, { useEffect, useState } from "react";
import CustomButton from "../components/button";
import Preloader from "../components/Preloader";
import { MainContext, useContext } from '../context';

const Users = () => {
    const { appendContext } = useContext(MainContext);
    const [data, setData] = useState([]);
    const [modalState, setModalState] = useState([]);
    const [customButtonName, setCustomButtonName] = useState('Deneme');
    const [isLoading, setIsLoading] = useState(false);
    const [isDataUsers, setIsDataUsers] = useState(false);
    const [information, setInformation] = useState('');

    useEffect(() => {
        appendContext({ isDataUsers, information })
        if (data.length > 0) {
            getSecondData();

        } else {
            getFirstData();
        }
    },)

    useEffect(() => {

        if (data.length > 0) {
            getSecondData();

        } else {
            getFirstData();
        }
    }, [data])

    const getData = async () => {
        setIsLoading(true);
        let data = await fetch("https://jsonplaceholder.typicode.com/users");
        let json = await data.json();
        setData(json);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
        setIsDataUsers(true);
    };

    const getSecondData = () => {
        setCustomButtonName('Getirildi.')
    }
    const getFirstData = () => {
        setCustomButtonName('Veri Yok')
    }
    const deleteData = () => {
        setData([]);
        setIsDataUsers(false);
    }

    const customOnclick = () => {
        console.log('custom click')
    }
    const handleModal = (index) => {
        setModalState(data[index]);
        setInformation(data[index].website);
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

                    data.length === 0 ? <div></div> :
                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Website</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>

                            <tbody className="table">
                                {
                                    data.map((item, index) => {
                                        return <tr key={index}>
                                            <td className="bg-danger">{item.id}</td>
                                            <td className="bg-primary">{item.name}</td>
                                            <td className="bg-success">{item.username}</td>
                                            <td className="bg-warning">{item.email}</td>
                                            <td className="bg-info">{item.website}</td>
                                            <td className="bg-danger">{item.phone}</td>
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
                            <h5 className="modal-title">{"Name :" + modalState?.name}</h5>
                            <button type="button" className="btn-close" onClick={() => { document.querySelector('.modal').style.display = 'none'; }} aria-label="Close">X</button>
                        </div>
                        <div className="modal-body">
                            <p>{"Username : " + modalState?.username}</p>
                            <br />
                            <p>{"Email :" + modalState?.email}</p>
                            <br />
                            <p>{"Website :" + modalState?.website}</p>
                            <br />
                            <p>{"Phone :" + modalState?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Users;