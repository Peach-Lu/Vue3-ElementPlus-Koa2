/**
 * Storage二次封装
 */
import config from '../config/index'
export default {
  setItem (key, value) {
    let storage = this.getStorage()
    storage[key] = value
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getItem (key) {
    return this.getStorage()[key]
  },
  getStorage () {
    let storage = JSON.parse(window.localStorage.getItem((config.namespace) || "{}"))
    if (!storage) {
      window.localStorage.setItem(config.namespace, JSON.stringify({}))
      storage = JSON.parse(window.localStorage.getItem((config.namespace) || "{}"))
    }
    return storage
  },
  clearItem (key) {
    let storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll () {
    window.localStorage.clear()
  }
}