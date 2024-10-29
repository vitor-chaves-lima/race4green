import Side from "../components/Side";
import Carro1 from '../../public/login.png'
import Senha from '../../public/Senha.svg'
import Seta from "../../public/Seta.svg"
import Email from "../../public/email.svg"
import FolhaBack from "../../public/folha-bg.svg"
import React, { useState } from 'react';
import "@fontsource/poppins"; 
import { Link } from "react-router-dom";

function Login() {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return ( 
        <>
            <div className="flex w-full h-screen bg-[#141414] ">
                <div className="w-3/5">
                    <Side Imagem={Carro1}/>
                </div>

             

                <div className="flex flex-col justify-center gap-12 z-20 items-center w-2/5 text-[#FFFFFF]">

                    <div className=" flex flex-wrap -z-10 absolute min-w-[300px] w-3/5 max-w-[700px] h-screen ">
                        <img className="w-full h-screen" src={FolhaBack} alt=""/>
                    </div>


                    <h3 className="w-3/6 mx-auto my-0 text-[40px] font-bold text-[#FFFFFF]">Bem-vindo de <span className=" text-[#2CC964]">volta!</span></h3>

                    <form className="z-100 w-full flex gap-5 flex-col justify-center items-left" action="">
                        <div className="w-3/6 gap-1 flex flex-col mx-auto my-0">
                        <label htmlFor="" className=" text-[#A0A0A0]">Endereço de Email</label>
                        <div className="flex flex-row">
                            <input className="h-[50px] bg-[#FFFFFF08] opacity-50 w-[90%] pl-3 border-[1px] border-[#A0A0A0] rounded-s-lg focus:outline-none" 
                            placeholder="Email Pessoal" 
                            type="text" />
                            <img 
                            className="bg-[#2CC964] w-[15%] rounded-e-lg px-3"
                            src={Email} 
                            alt="" />
                            
                        </div>

                        </div>

                        <div className="w-3/6 gap-1 flex flex-col mx-auto my-0">
                            <label htmlFor="" className="text-[#A0A0A0]">Senha</label>
                            <div className="flex flex-row">
                            <input className="h-[50px] bg-[#FFFFFF08] opacity-50 w-[90%] pl-3 border-[1px] border-[#A0A0A0] rounded-s-lg focus: outline-none" 
                            placeholder="Sua Senha" 
                            type={isPasswordVisible ? 'text' : 'password'}/>
                                <button className="w-[15%] h-[50px]"
                                onClick={togglePasswordVisibility}
                                type="button">
                                {isPasswordVisible ?   <img className="bg-[#2CC964] h-[50px] w-full rounded-e-lg p-2" src={Senha} alt="" /> :                                     <img className="bg-[#2CC964] h-[50px] w-full rounded-e-lg p-2" src={Senha} alt="" />}

                                </button>
                            </div>
                        </div>

                        <Link className="w-3/6 mx-auto my-0 text-right"to={'/reset-password'}>Esqueceu sua senha</Link>
                    
                    
                        <button className="flex rounded-lg h-[50px] justify-end items-center w-3/6 mx-auto my-0 bg-[#2CC964] p-2 shadow-custom-green">
                            <p className="w-full">Entrar Agora</p>
                            <img className="w-8 " src={Seta} alt="Seta" /> 
                        </button>


                        <p className="text-[#A0A0A0] self-center">Ou</p>

                        <Link className="w-3/6 mx-auto my-0 text-[#2CC264] text-center border-[1px] p-3 border-[#2CC264] rounded-lg" to={"/register"}>Registrar Agora</Link>

                    </form>
                </div>
            </div>
        </>

        
    );
}

export default Login;