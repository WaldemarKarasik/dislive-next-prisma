import {Form, Button, Input} from "antd";
import styles from "../../styles/pages/Login.module.scss"
function Login() {
    const [loading, setLoading] = React.useState(false)
    const tryToLogin = (data) => {
        setLoading(true)
    }
    return (
        <div>
            <h2 style={{textAlign: 'center', marginTop: '3rem', fontWeight: 'bold', fontSize: '24px'}}>Вход</h2>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Form
                    style={{width: '20rem', marginTop: '2rem'}}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={tryToLogin}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Пожалуйста введите email', type: "email"}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Войти
                        </Button>
                        <Button  htmlType="submit">
                            Еще нет аккаунта?
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

Login.getInitialProps = async function(ctx) {
    if(ctx.req) {
        console.log(ctx.store.getState())
    }
    return {}
}

export default Login