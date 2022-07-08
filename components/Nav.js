import styles from "styles/Nav.module.css";
import miage from "public/miage-logo.png"
import Image from "next/image";
import Link from "next/link";
import {userService} from "services";
import {
    ContainerOutlined,
    FileTextOutlined,
    HomeOutlined,
    LogoutOutlined,
    QuestionCircleOutlined,
    UploadOutlined,
    UserOutlined
} from "@ant-design/icons";

export function Nav(props) {
    return (
        <>
            <div className={styles.Nav}>
                <div className={styles.logo_miage}><Image src={miage} alt={"Logo miage"} /></div>
                <div className={styles.menus}>
                    {props.data.map((menu, index) => (
                        <div className={styles.menus_item} key={index}>
                            <Link href={menu.path}>
                                <a>{menu.name}</a>
                            </Link>
                        </div>
                    ))}

                </div>
                <div className={styles.logout}>
                <span onClick={() => userService.logout()}>
                    Se déconnecter
                </span>
                </div>
            </div>
            <div className={styles.NavMobile}>
                <Link href={"/"}>
                    <HomeOutlined className={styles.HomeIcon} />
                </Link>

                <Link href={"/user-infos"}>
                    <UserOutlined />
                </Link>

                <Link href={"/registrations"}>
                    <ContainerOutlined />
                </Link>

                <Link href={"/files"}>
                    <FileTextOutlined />
                </Link>

                <LogoutOutlined onClick={() => userService.logout()} />
            </div>
        </>
    )
}