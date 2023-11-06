import { LayoutRectangle, Pressable, StyleSheet } from 'react-native'

import { useRef, useState } from 'react'
import { Text, View } from '../../components/Themed'

export default function TabOneScreen() {
  const [taps, setTaps] = useState<number>(222)
  const [pressableLayout, setPressableLayout] = useState<LayoutRectangle | null>(null)

  function extense(): string {
    const result: string[] = []
    const extenseDescription = [
      ['', 'UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO', 'SEIS', 'SETE', 'OITO', 'NOVE'],
      ['', 'DEZ', 'VINTE', 'TRINTA', 'QUARENTA', 'CINQUENTA', 'SESSENTA', 'SETENTA', 'OITENTA', 'NOVENTA'],
      ['', 'CEM', 'DUZENTOS', 'TREZENTOS', 'QUATROCENTOS', 'QUINHENTOS', 'SEISCENTOS', 'SETECENTOS', 'OITOCENTOS', 'NOVECENTOS'],
    ]
    const decimalException = ['', 'ONZE', 'DOZE', 'TREZE', 'QUATORZE', 'QUINZE', 'DEZESSEIS', 'DEZESSETE', 'DEZOITO', 'DEZENOVE']
    const mil = ['', 'MIL', 'MI', 'BI', 'TRI', 'QUADRI', 'PENTA', 'HEXA', 'SEPTA', 'OCTA', 'NONA']

    const str = taps.toString()

    str?.padStart(str.length + (str.length % 3 ? (str.length + 2 % 3 ? 2 : 1) : 0), '*')
      ?.match(/.{1,3}/g)
      ?.reverse()
      .map(a => a.replaceAll('*', '').split('').reverse().join(''))
      .forEach((mi, ix) => {
        const number: string = mi.toString() ?? ''
        const description = []
        if (!Number(number))
          return ''

        for (let i = 0; i < number.length; i++) {
          if (i == 1 && number.charAt(1) === '1' && number.charAt(0) != '0') {
            description.pop()
            description.push(decimalException[Number(number[0])])
          } else
            description.push(extenseDescription?.[i]?.[Number(number[i])])
        }

        result.push(description.filter(Boolean).reverse().join(' E '))
        result[result.length - 1] += ' ' + mil[ix]
        if (ix > 1)
          result[result.length - 1] += Number(number.split('').reverse().join('')) === 1 ? 'LHÃO' : 'LHÕES'
      })

    const description = !taps ? 'ZERO' : result.filter(Boolean).reverse().join(' E ')

    return description.replaceAll('CEM E', 'CENTO E').replaceAll('UM MIL', 'MIL').replaceAll('MIL E', 'MIL')
  }

  function isPrime() {
    if (!(taps % 2) || taps.toString().endsWith('5'))
      return false
    for (let i = 3; i <= Math.floor(taps / 2); i += 2)
      if (!(taps % i))
        return false
    return true
  }

  function sumAll() {
    let val = taps;
    const description = [val.toString()]

    while (val > 9) {
      let str = val.toString()
      val = 0
      str.toString().split('').forEach(a => val += Number(a))
      description.push(val.toString())
    }

    return description.join(' -> ')
  }

  function toTime() {

  }

  return (
    <View style={styles.container}>
      <Pressable
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          width: '100%'
        }}
        onLayout={(event) => {
          setPressableLayout(event.nativeEvent.layout)
        }}
        onPress={(event) => {
          if (!pressableLayout)
            return

          const inc = event.nativeEvent.locationX < pressableLayout.width / 2 ? -1 : 1

          if (event.nativeEvent.locationY > pressableLayout.height / 3 * 2)
            setTaps(taps + 100 * inc)
          else if (event.nativeEvent.locationY > pressableLayout.height / 3)
            setTaps(taps + 10 * inc)
          else
            setTaps(taps + 1 * inc)

        }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>
            {taps}
          </Text>
          <Text style={styles.descriptionText}>
            {extense()}
          </Text>
          <Text style={styles.descriptionText}>
            {sumAll()}
          </Text>
          <Text style={styles.descriptionText}>
            {isPrime() ? 'PRIMO' : 'NÃO PRIMO'}, {!(taps % 2) ? 'PAR' : 'ÍMPAR'}
          </Text>
        </View>
      </Pressable>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%'
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'center'
  }
})