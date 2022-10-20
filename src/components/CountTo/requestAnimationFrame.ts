let lastTime = 0
const prefixes = 'webkit moz ms o'.split(' ') // 各浏览器前缀
let requestAnimationFrame
let cancelAnimationFrame

const isServer = typeof window === 'undefined'

if (isServer) {
  requestAnimationFrame = function() {
    return
  }
  cancelAnimationFrame = function() {
    return
  }
} else {
  requestAnimationFrame = window.requestAnimationFrame
  cancelAnimationFrame = window.cancelAnimationFrame
  let prefix : any
    // 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
  for (let i = 0; i < prefixes.length; i++) {
    // if (requestAnimationFrame && cancelAnimationFrame) { break }
    prefix = prefixes[i]
    const preRequest : any = prefix + 'RequestAnimationFrame'
    const preCancel : any = prefix + 'CancelAnimationFrame' 
    const preCancelAndRequest : any = prefix + 'CancelRequestAnimationFrame'
    requestAnimationFrame = requestAnimationFrame || window[preRequest]
    cancelAnimationFrame = cancelAnimationFrame || window[preCancel] || window[preCancelAndRequest]
  }

  // 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function(callback : any) {
      const currTime = new Date().getTime()
      // 为了使setTimteout的尽可能的接近每秒60帧的效果
      const timeToCall = Math.max(0, 16 - (currTime - lastTime))
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }

    cancelAnimationFrame = function(id : any) {
      window.clearTimeout(id)
    }
  }
}


export {}