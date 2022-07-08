import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {userService} from "services";
import styles from "styles/Login.module.css";
import Link from "next/link";
import Image from "next/image"
import greta from "../public/greta-logo.png";
import miage from "../public/miage-logo.png";
import ua from "../public/ua-logo.png";

import {Tabs} from "antd";
const {TabPane} = Tabs;

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [target, setTarget] = useState('students');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    const onSubmit = () => {
        userService.login(email, password, target)
            .then(() => {
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(err => setError(true))
    }

    const onChange = (key) => {
        setTarget(key);
    }

    let inputClassName = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    if (error) {
        inputClassName += " border-red-500"
    }

    return (
        <div className={styles.main}>
            <div className={styles.images_side}>
                <div className={styles.nb1}><Image alt={"Logo Université"} src={ua} /></div>
                <div className={styles.nb2}><Image alt={"Logo Miage"} src={miage} /></div>
                <div className={styles.nb3}><Image alt={"Logo Greta"} src={greta} /></div>
            </div>
            <div className={styles.form_side}>
                <div className={styles.login_form}>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h3>Se connecter en tant que :</h3>
                        <Tabs defaultActiveKey={"students"} onChange={onChange}>
                            <TabPane tab={"Étudiant"} key={"students"}></TabPane>
                            <TabPane tab={"Staff"} key={"staffs"}></TabPane>
                            <TabPane tab={"Maître d'apprentissage"} key={"tutors"} disabled></TabPane>
                        </Tabs>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className={inputClassName}
                                id="email" type="text" placeholder="Email" required={true} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Mot de passe
                            </label>
                            <input
                                className={inputClassName}
                                id="password" type="password" placeholder="******************" required={true} onChange={e => setPassword(e.target.value)} />
                        </div>
                        {
                            error && <p className="text-red-500 text-xs italic">Email ou mot de passe incorrect</p>
                        }
                        <div className={styles.login_buttons}>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit" style={{backgroundColor: "#2D8B94"}} onClick={onSubmit}>
                                Se connecter
                            </button>
                            <Link href={"/signup"}>
                                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                    Pas de compte ? Inscrivez-vous !
                                </a>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}