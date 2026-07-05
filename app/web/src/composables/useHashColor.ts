// composables/useColorHash.ts
import ColorHash from 'color-hash'

// 单例模式，确保全局唯一
let instance: ColorHash | null = null

export function useColorHash() {
    if (!instance) {
        instance = new ColorHash({
            hue: { min: 0, max: 360 },
            lightness: [0.35, 0.5, 0.65],
            saturation: [0.35, 0.5, 0.65]
        })
    }
    return instance
}

