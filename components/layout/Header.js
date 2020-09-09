import {MenuOutlined} from '@ant-design/icons'
import {Input, Button, Menu, Dropdown} from "antd";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

function Header() {
    const router = useRouter()
    const user = useSelector((state) => state.user.user)
    const isAuth = useSelector((state) => state.user.isAuthenticated)
    const goToLogin = () => {
        router.push("/auth/login")
    }

    return (
        <header>
            <div className={"hamburger-and-logo"}>
                <MenuOutlined style={{fontSize: '24px'}} />
                <span className={"logo"}>dislive.me</span>
            </div>
            <div className={"search"}>
                <Input.Search  />
            </div>
            <div className={"actions"}>
                {!isAuth ? <Button onClick={goToLogin} type={"danger"} block>Войти</Button> :
                    <span>
                        {user.username}
                    </span>
                }

            </div>
        </header>
    )
}
export default Header