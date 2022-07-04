import { Button, Checkbox, Form, Input } from "antd";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {studentService} from "../services";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <div>
            <Form
                name={"Login"}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input onChange={e => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onChange={e => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={() => onSubmit()}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}