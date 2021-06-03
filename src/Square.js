import React, {
    useCallback,
    useEffect,
    useState
}             from 'react'
import {
    animated,
    useSpring
}             from 'react-spring'
import styled from 'styled-components'

export const SquareFrame = styled.div`
  display: grid;
  grid-template-columns: repeat(${({dimensions}) => dimensions}, 1fr);
  grid-template-rows: repeat(${({dimensions}) => dimensions}, 1fr);
  width: ${({dimensions, size}) => dimensions * size}px;
  height: ${({dimensions, size}) => dimensions * size}px;
`

const SquareContainer = styled(animated.div)`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  position: relative;
`

const Worm = styled(animated.div)`
  border-radius: ${({size}) => size}px;
  height: ${({size}) => size * 3}px;
  width: ${({size}) => size}px;
  margin-bottom: ${({size}) => size}px;
  position: absolute;
  right: 0;
  bottom: 0;
`

const colors = [
    '#f2476a',
    '#fb654e',
    '#eb2d3a',
    '#add8e6',
    '#90ee90',
    '#475c6c',
    '#8a8583',
    '#eed7a1',
    '#cd8b62',
    '#7245a5'
]

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const getRandomDelay = (base = 0) => (Math.floor(Math.random() * (30 - base)) + base) * 100

const Square = ({size, duration}) => {
    const [randomColors, setRandomColors] = useState([])
    const [backgroundColor, setBackgroundColor] = useState('')
    const [wormColor, setWormColor] = useState('')

    useEffect(() => {
        const randomColors = shuffle(colors)
        setRandomColors(randomColors)
        setBackgroundColor(randomColors[0])
        setWormColor(randomColors[1])
    }, [])

    const {y} = useSpring({
        from: {
            y: 0,
            immediate: true
        },
        config: {
            duration,
            precision: .05,
            easing: x => Math.sin((x * Math.PI) / 2)
        },
        loop: true,
        to: useCallback(async animate => {
            await animate({
                y: size,
                delay: getRandomDelay(10)
            })
            await animate({
                y: size * 2,
                delay: getRandomDelay()
            })
            setBackgroundColor(color => randomColors[(randomColors.indexOf(color) + 2) % randomColors.length])
            await animate({
                y: size * 3,
                delay: getRandomDelay()
            })
            await animate({
                y: size * 4,
                delay: getRandomDelay()
            })
            setWormColor(color => randomColors[(randomColors.indexOf(color) + 2) % randomColors.length])
        }, [randomColors, size])
    })

    return (
        <SquareContainer style={{backgroundColor}} size={size}>
            <Worm style={{backgroundColor: wormColor, y}} size={size}/>
        </SquareContainer>
    )
}

export default Square