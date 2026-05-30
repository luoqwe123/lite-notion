// 获取图片真实宽高
export function getImageSize(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.naturalWidth,  // 真实宽度
        height: img.naturalHeight // 真实高度
      })
    }
    img.onerror = reject
    img.src = url
  })
}