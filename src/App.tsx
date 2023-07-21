import { useState } from 'react'
import Button, { ButtonType, ButtonSize } from '@/components/Button/button'
import { Library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from '@/components/Menu/menu'
import MenuItem from '@/components/Menu/menuItem'
import SubMenu from '@/components/Menu/subMenu'
import Icon from './components/Icon/icon'
library.add(fas)
import Transition from './components/Transition/transition'
import './styles/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import Input from './components/Input/input'
function App() {
  const [show, setShow] = useState<boolean>();
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <Icon icon='coffee' theme='danger' size='1x' /> */}
      {/*  <Button onClick={
        (e) => {
          e.preventDefault();
          alert('nihao');
          console.log(1);

        }
      }>Hello</Button>
      <Button disabled={true}>Normal</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Hello</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Large}>Hello</Button>
      <Button disabled btnType={ButtonType.Link} href="http://www.baidu.com" target={'_blank'}>BaiduLink</Button> */}

      <Menu defaultIndex={'0'} defaultOpenSubMenus={['0']} /* mode='vertical' */>
        <MenuItem index={'0'}>
          link1
        </MenuItem>
        <MenuItem index={'1'} disabled>
          link2
        </MenuItem>
        <SubMenu title={'dorpdown'}>
          <MenuItem index={'0'}>
            dropdown1
          </MenuItem>
          <MenuItem index={'1'}>
            dropdown2
          </MenuItem>
          <MenuItem index={'2'}>
            dropdown3
          </MenuItem>
        </SubMenu>
        <MenuItem index={'3'}>
          link3
        </MenuItem>
      </Menu>
      <Button size='lg' onClick={() => { setShow(!show) }}>Toggle</Button>
      <Transition
        in={show}
        timeout={300}
        animation='zoom-in-left'
        wrapper
      >
        <div>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>

        </div>
        <Button btnType='default' size='sm'>inner</Button>
      </Transition>
      <Input prepend={'nihao'} append={'sddsd'}/>
    </div>
  )
}

export default App
