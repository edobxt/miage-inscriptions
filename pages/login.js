import { Button, Checkbox, Form, Input } from "antd";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {studentService} from "../services";
import styles from "styles/Login.module.css";

import {Tabs} from "antd";
const {TabPane} = Tabs;

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [target, setTarget] = useState('student');

    useEffect(() => {
        if (studentService.studentValue) {
            router.push('/');
        }
    }, []);

    const onSubmit = () => {
        studentService.login(email, password)
            .then(() => {
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
    }

    const onChange = (key) => {
        setTarget(key);
    }

    return (
        <div className={styles.main}>
            <div className={styles.images_side}></div>
            <div className={styles.form_side}>
                <div className={styles.login_form}>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h3>Se connecter en tant que :</h3>
                        <Tabs defaultActiveKey={"student"} onChange={onChange}>
                            <TabPane tab={"Étudiant"} key={"student"}></TabPane>
                            <TabPane tab={"Staff"} key={"staff"}></TabPane>
                            <TabPane tab={"Maître d'apprentissage"} key={"tutor"} disabled></TabPane>
                        </Tabs>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email" type="text" placeholder="Email" required={true} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Mot de passe
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="******************" required={true} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit" style={{backgroundColor: "#2D8B94"}}>
                                Se connecter
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                               href="#">
                                Créer un compte
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}