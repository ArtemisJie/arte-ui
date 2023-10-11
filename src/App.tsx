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
import Upload from './components/Upload/upload'
import AutoComplete from './components/AutoComplete'
import Form from './components/Form/form'
import FormItem from './components/Form/formItem'
function App() {
  const [show, setShow] = useState<boolean>();
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Form>
        <FormItem label='邮件' name='email' rules={[{ type: 'email', required: true }]}>
          <Input />
        </FormItem>
        <FormItem label='密码' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
          <Input type="password" />
        </FormItem>
        <div className='form-submit-area'>
          <Button type="submit" btnType='primary'>登陆</Button>
        </div>
      </Form>
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
      <Input prepend={'nihao'} append={'sddsd'} />
      <Upload
        targetLink=''
      ></Upload>

    </div>
  )
}

export default App
