import styles from '../styles/Home.module.css'
import {studentService} from "services";
import {Button} from "antd";

export default function Home() {
  return (
    <>
      <Button
          type={"primary"}
          onClick={() => studentService.logout()}
      >
        Logout
      </Button>
    </>
  )
}
