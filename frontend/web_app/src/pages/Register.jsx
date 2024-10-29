import Side from "../components/Side";
import Carro2 from '../../public/register.png'
import Senha from '../../public/Senha.svg'
import SetaBaixo from "../../public/seta-baixo.svg"
import Seta from "../../public/saibamais.svg"
import Email from "../../public/email.svg"
import FolhaBack from "../../public/folha-bg.svg"
import React, { useState } from 'react';
import "@fontsource/poppins"; 
import { Link } from "react-router-dom";

function Register() {
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return ( 
        <>
            <div className="flex w-full h-screen bg-[#141414] ">
                <div className="w-3/5">
                    <Side Imagem={Carro2}/>
                </div>

                <div className="flex flex-col justify-center z-20 gap-12 items-center w-2/5 text-[#FFFFFF]">

                    <div className="absolute h-screen min-w-[300px] w-full max-w-[700px] flex -z-10">
                        <img className="" src={FolhaBack} alt="" />
                    </div>

                    <h3 className="w-3/6 mx-auto my-0 text-[40px] font-bold text-[#FFFFFF]">Bem-vindo de <span className=" text-[#2CC964]">volta!</span></h3>


                    <div className="flex justify-center gap-5 text-white">
                        <img className="w-[8%]" src={SetaBaixo} alt="" />
                        <p className="w-[70%]">Preencha o formulário para criar sua conta</p>
                    </div>

                    <form className="z-99 w-full flex gap-3 flex-col justify-center items-left" action="">
                        <div className="w-3/6 gap-1 flex flex-col mx-auto my-0">                        <div className="flex flex-row">
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


                        <div className="w-3/6 gap-1 flex flex-col mx-auto my-0">
                            <div className="flex flex-row">
                            <input className="h-[50px] bg-[#FFFFFF08] opacity-50 w-[90%] pl-3 border-[1px] border-[#A0A0A0] rounded-s-lg focus: outline-none" 
                            placeholder="Confirme a sua Senha" 
                            type={isPasswordVisible ? 'text' : 'password'}/>
                                <button className="w-[15%] h-[50px]"
                                onClick={togglePasswordVisibility}
                                type="button">
                                {isPasswordVisible ?   <img className="bg-[#2CC964] h-[50px] w-full rounded-e-lg p-2" src={Senha} alt="" /> :                                     <img className="bg-[#2CC964] h-[50px] w-full rounded-e-lg p-2" src={Senha} alt="" />}

                                </button>
                            </div>
                        </div>

                        <Link className="flex flex-row gap-5 w-3/6 mx-auto my-0 justify-center text-center"to={'/'}>
                        <img className="self-center"src={Seta} alt="" />
                        <p>Voltar para o <span className="text-[#2CC264]">Login</span></p></Link>
                    
                    
                        <button className="flex rounded-lg h-[50px] justify-center items-center w-3/6 mx-auto my-0 bg-[#2CC964] p-2 shadow-custom-green">
                            <p className="w-full">Registrar Conta</p>
                        </button>
                    </form>
                </div>
            </div>
        </>
     );
}

export default Register;
