import FormLogin, { FormLoginData } from "../../components/forms/form-login";
import FormRegister, { FormRegisterData } from "../../components/forms/form-register";
import { APP_NAME } from "../../helpers/constants";
import Hoc from "../../hoc";
import logoWithTextWhite from "../../assets/images/logo-with-text-white.png";
import * as userService from "../../services/user-service";
import { useState } from "react";
import LPBAkert from "../../components/commons/lpb-alert";
import { useHistory } from "react-router";

const Home = () => {
    const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
    const [isPasswordLengthInvalid, setIsPasswordLengthInvalid] = useState(false);
    const [isEmailAlreadyInUse, setIsEmailAlreadyInUse] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const history = useHistory();

    const login = async (data: FormLoginData) => {
        try {
            setIsLoginLoading(true);
            setIsLoginFailed(false);
            await userService.login(data.email, data.password);
            history.push("/build");
        } catch (error: any) {
            setIsLoginFailed(error.message.includes("user-not-found") || error.message.includes("wrong-password"));
        } finally {
            setIsLoginLoading(false);
        }
    };

    const register = async (data: FormRegisterData) => {
        try {
            setIsPasswordNotMatch(false);
            setIsPasswordLengthInvalid(false);
            setIsEmailAlreadyInUse(false);

            if (data.password !== data.passwordConfirmation) setIsPasswordNotMatch(true);
            else {
                setIsRegisterLoading(true);
                await userService.register(data.fullName, data.email, data.password);
                history.push("/build");
            }
        } catch (error: any) {
            setIsPasswordLengthInvalid(error.message.includes("weak-password"));
            setIsEmailAlreadyInUse(error.message.includes("email-already-in-use"));
        } finally {
            setIsRegisterLoading(false);
        }
    };

    return (
        <Hoc
            title={`${APP_NAME}: Build Your Own Landing Page`}
            authType="guess"
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
                    <FormLogin className="mt-4" isLoading={isLoginLoading} onSubmited={login} />

                    {isLoginFailed && (
                        <LPBAkert mode="error" className="mt-4">
                            Login Failed!, Check Email or Password
                        </LPBAkert>
                    )}
                </div>

                <div className="w-full md:w-1/2 bg-primary-light p-6">
                    <p className="font-semibold text-gray-600 text-2xl">REGISTER</p>

                    {isPasswordNotMatch && (
                        <LPBAkert mode="error" className="mt-4">
                            Password not match!
                        </LPBAkert>
                    )}

                    {isPasswordLengthInvalid && (
                        <LPBAkert mode="error" className="mt-4">
                            Password at least 6 characters!
                        </LPBAkert>
                    )}

                    {isEmailAlreadyInUse && (
                        <LPBAkert mode="error" className="mt-4">
                            Email already in use!
                        </LPBAkert>
                    )}

                    <FormRegister className="mt-4" isLoading={isRegisterLoading} onSubmited={register} />
                </div>
            </div>
        </Hoc>
    );
};

export default Home;
