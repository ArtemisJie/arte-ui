import { useState } from 'react'
import Button, { ButtonType, ButtonSize } from '@/components/Button/button'
import Menu from '@/components/Menu/menu'
import MenuItem from '@/components/Menu/menuItem'

import './styles/index.scss'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
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

      <Menu defaultIndex={0}>
        <MenuItem index={0}>
          link1
        </MenuItem>
        <MenuItem index={1} disabled>
          link2
        </MenuItem>
        <MenuItem index={3}>
          link3
        </MenuItem>
      </Menu>
    </div>
  )
}

export default App
