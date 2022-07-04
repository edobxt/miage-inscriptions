import styles from '../styles/Home.module.css'
import {userService} from "services";
import {Button} from "antd";

export default function Home() {
  return (
    <>
      <Button
          type={"primary"}
          onClick={() => userService.logout()}
      >
        Logout
      </Button>
    </>
  )
}
