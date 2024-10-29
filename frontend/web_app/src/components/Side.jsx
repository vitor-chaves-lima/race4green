import Folha from '../../public/folha.svg';

function Side({ Imagem }) {
    return ( 
        <div className="z-100 relative flex flex-col justify-center h-full w-full bg-[#171717] text-[#FFFFFF]">
            <div className="w-5/6 min-h-[500px] justify-center items-center self-center h-full max-h-[760px] gap-5 flex flex-col bg-no-repeat" style={{ backgroundImage: `url(${Imagem})` }} >
                <h1 className="w-4/6  text-5xl">
                    Faça parte de uma <span className='text-[#2CC964]'>comunidade</span> comprometida com o <span className='text-[#2CC964]'>planeta</span> e com corridas eletrizantes.
                </h1>
                <div className='self-start pl-36'>
                    <img className="w-32" src={Folha} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Side;
