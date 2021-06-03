import React                 from 'react'
import Square, {SquareFrame} from './Square'
import {Container}           from './Elements'


const App = () => {
    const size = 80
    const dimensions = 12
    const duration = 500

    return (
        <Container>
            <SquareFrame dimensions={dimensions} size={size}>
                {[...Array(dimensions * dimensions).keys()].map(key =>
                    <Square
                        size={size}
                        key={key}
                        duration={duration}
                    />
                )}
            </SquareFrame>
        </Container>
    )
}

export default App
