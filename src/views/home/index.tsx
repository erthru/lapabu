import FormLogin, { FormLoginData } from "../../components/forms/form-login";
import FormRegister, { FormRegisterData } from "../../components/forms/form-register";
import { APP_NAME } from "../../helpers/environments";
import Hoc from "../../hoc";
import logoWithTextWhite from "../../assets/images/logo-with-text-white.png";

const Home = () => {
    const handleLogin = (data: FormLoginData) => {};

    const handleRegister = (data: FormRegisterData) => {};

    return (
        <Hoc
            title={`${APP_NAME}: Build Your Own Landing Page`}
            className="flex flex-col items-center pb-4 px-4 pt-2 lg:pt-16 w-full bg-primary min-h-screen"
        >
            <img src={logoWithTextWhite} alt="" className="h-16 md:h-28" />

            <p className="hidden md:block text-2xl font-bold text-center text-white mt-4">
                Join Us and Build Your Own Landing Page <br /> in Minutes !!
            </p>

            <p className="block md:hidden text-lg font-bold text-center text-white mt-2">Join Us and Build Your Own Landing Page in Minutes !!</p>

            <div className="w-full lg:w-3/4 flex flex-wrap md:flex-nowrap mt-4 md:mt-10">
                <div className="w-full md:w-1/2 bg-gray-100 p-6">
                    <p className="font-semibold text-gray-600 text-2xl">LOGIN</p>
                    <FormLogin className="mt-4" onSubmited={handleLogin} />
                </div>

                <div className="w-full md:w-1/2 bg-primary-light p-6">
                    <p className="font-semibold text-gray-600 text-2xl">REGISTER</p>
                    <FormRegister className="mt-4" onSubmited={handleRegister} />
                </div>
            </div>
        </Hoc>
    );
};

export default Home;
