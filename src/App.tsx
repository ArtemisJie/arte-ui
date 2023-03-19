import { useState } from 'react'
import Button,{ButtonType,ButtonSize} from '@/components/Button/button'
import './styles/index.scss'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Button onClick={
        (e)=>{
          e.preventDefault();
          alert('nihao');
          console.log(1);
          
        }
        }>Hello</Button>
      <Button disabled>Normal</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Hello</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Large}>Hello</Button>
      <Button disabled btnType={ButtonType.Link} href="http://www.baidu.com" target={'_blank'}>BaiduLink</Button>
    </div>
  )
}

export default App
