import React, { useState } from 'react'
import './App.css'
import flat from 'flat'

//サンプルのモデル
type Model = {
  key1: string
  key2: {
    keyA: string
  }
  key3: {
    keyA: {
      keyB: string
    }
    keyB: {
      keyB: string
    }
  }
}

//props
type Props = {
  //変更するstate
  state: any
  //setState
  setState: React.Dispatch<React.SetStateAction<any>>
  //event.target.nameで使われる値
  name: string
}

//Formコンポーネント
const Form = (props: Props) => {
  const copyText = props.state
  //TODO any意外にする
  //コピーしたstateをflatにする
  const flatText: any = flat.flatten(copyText)

  //値変更用のハンドル
  const handle = (event: any) => {
    //テキストボックスに入れた値を指定の箇所に入力する
    flatText[event.target.name] = event.target.value
    //TODO any意外にする
    //flatしてない状態に戻す
    const unFlatText: any = flat.unflatten(flatText)
    //stateを変更する
    props.setState(unFlatText)
  }

  return (
    <input
      type="text"
      name={props.name}
      onChange={handle}
      value={flatText[props.name]}
    />
  )
}

const App = () => {
  const [state, setState] = useState<Model>({
    key1: 'key1',
    key2: {
      keyA: 'key2.keyA',
    },
    key3: {
      keyA: {
        keyB: 'key3.keyA.keyB',
      },
      keyB: {
        keyB: 'key3.keyA.keyB',
      },
    },
  })

  return (
    <div className="App">
      <Form setState={setState} name="key1" state={state} />
      <Form setState={setState} name="key2.keyA" state={state} />
      <Form setState={setState} name="key3.keyA.keyB" state={state} />
    </div>
  )
}

export default App
