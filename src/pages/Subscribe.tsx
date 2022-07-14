import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import codeMockupImgUrl from '../assets/code-mockup.png';
import { LogoIcon } from "../assets/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

interface InputForms {
    name: string;
    email: string;
}

export function SubscribePage() {
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<InputForms>();
    const [createSubscriber, { loading }] = useCreateSubscriberMutation();

    const onSubmit: SubmitHandler<InputForms> = async data => {
        await createSubscriber({
            variables: {
                ...data
            }
        });

        navigate('/event');
    };

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">

                <div className="max-w-[640px]">
                    <LogoIcon />

                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
                    </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>

                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Seu nome completo" />
                        {errors.name && <span className="text-red-400 text-sm">Nome é obrigatório</span>}
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Digite seu e-mail" />
                        {errors.email && <span className="text-red-400 text-sm">Email é obrigatório</span>}

                        <button
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                            disabled={loading}
                            type="submit">
                            Garantir minha vaga
                        </button>
                    </form>
                </div>


            </div>
            <img src={codeMockupImgUrl} className="mt-10" alt="" />
        </div>
    );
}