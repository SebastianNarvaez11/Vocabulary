import canvasconfetti from "canvas-confetti"


export const confetti = () => {
    canvasconfetti({
        zIndex: 999,
        particleCount: 200,
        spread: 160,
        angle: 90,
        origin: {
            x: 0.5,
            y: 1
        }
    })
}

