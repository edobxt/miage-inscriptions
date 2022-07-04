import styles from "styles/Signup.module.css";

import {Tabs} from "antd";
import Link from "next/link";
import {useState} from "react";
const {TabPane} = Tabs;

export default function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [target, setTarget] = useState('students');

    const onSubmit = () => {
        console.log(fullName, email, password, verifyPassword, target);
    }

    let inputClassName = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

    return (
        <div className={styles.main}>
            <div className={styles.images_side}></div>
            <div className={styles.form_side}>
                <div className={styles.login_form}>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h3>Se connecter en tant que :</h3>
                        <Tabs defaultActiveKey={"students"}>
                            <TabPane tab={"Étudiant"} key={"students"}></TabPane>
                            <TabPane tab={"Maître d'apprentissage"} key={"tutors"} disabled></TabPane>
                        </Tabs>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">
                                Nom complet
                            </label>
                            <input
                                className={inputClassName}
                                id="full_name" type="text" placeholder="Nom complet" required={true} onChange={e => setFullName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className={inputClassName}
                                id="email" type="text" placeholder="Email" required={true} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Mot de passe
                            </label>
                            <input
                                className={inputClassName}
                                id="password" type="password" placeholder="******************" required={true} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">
                                Confirmation du mot de passe
                            </label>
                            <input
                                className={inputClassName}
                                id="confirm_password" type="password" placeholder="******************" required={true} onChange={e => setVerifyPassword(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit" style={{backgroundColor: "#2D8B94"}} onClick={onSubmit}>
                                S&apos;inscrire
                            </button>
                            <Link href={"/login"}>
                                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                    Déjà un compte ? Connectez vous !
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}