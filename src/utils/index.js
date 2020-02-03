/**
 * Возвращает размер области просмотра
 * @returns {{width: Number, height: Number}}
 */
export const getViewportSize = () => ({
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
})

/**
 * Возвращает текущую прокрутку документа
 * @returns {{top: Number, left: Number}}
 */
export const getDocumentScroll = () => ({
  top: window.pageYOffset || document.documentElement.scrollTop,
  left: window.pageXOffset || document.documentElement.scrollLeft
})

/**
 * Возвращает текущие размеры документа
 * @returns {{width: Number, height: Number}}
 */
export const getDocumentSize = () => ({
  width: document.documentElement.scrollWidth,
  height: document.documentElement.scrollHeight
})
