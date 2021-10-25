import { useEffect, useState } from "react";
// import { useMount } from '../../utils/index'

const test = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `现在的num值：${num}`;
    return function unmount() {
      console.log(message);
    };
  };
  return effect;
};
const add = test();
const unmount = add();
add();
add();
unmount(); //直觉好像是打印3  实际上是打印1
const unmount1 = add();
unmount1(); //打印4

export const Test = () => {
  const [num, setNum] = useState(0);
  const add = () => {
    setNum(num + 1);
  };
  // useMount(() => {
  //   setInterval(() => {
  //     console.log('num in setInterval:', num)
  //   }, 1000)
  // })
  // 函数只调用了一次，而引用的值就是当页面加载时的值
  //所以在useEffect中遇到了闭包问题的话，首先要检查依赖项(第二个参数)是否有这个值
  useEffect(() => {
    return () => {
      console.log(num); //永远是0
    };
  }, [num]);
  return (
    <div>
      <button onClick={add}>add</button>
      <p>number:{num}</p>
    </div>
  );
};
