import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function RichText({data}) {
  
  const dataArr = typeof(data) === 'string' ? JSON.parse(data) : []
  
  const rich = dataArr.map((item, index) => <Block key={index} type={item.type} children={item.children} />)

  return (
    <View>
      {rich && rich}
    </View>
  )
}

function Block({type, children}) {

  const text = children.map(item => item.text).join('')

  const [classes, setClasses] = useState("")

  useEffect(() => {
    if(type === 'heading-one') {
        setClasses("text-3xl font-bold text-center")
    }
    if(type === 'heading-two') {
        setClasses("text-3xl font-bold text-center")
    }
  }, [type])

  return (
    <View>
      <Text className={`text-zinc-800 ${classes}`}>
        {text}
      </Text>
    </View>
  )
}