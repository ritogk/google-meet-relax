import { getStorage } from "@/core/chromeStorage"
export interface ConfigInterface {
  loadConfig(): Promise<void>
  getConfig(): ConfigObjectInterface
  setConfig(config: ConfigObjectInterface): void
  observeGoogleStorage(): void
}

export enum DisplayOriginalCc {
  OK = "1",
  NG = "2",
}

export interface ConfigObjectInterface {
  opacityRate: number
  displayOriginalCc: DisplayOriginalCc
}

/**
 * ポップアップ内で入力した設定情報
 */
export class Config implements ConfigInterface {
  private config: ConfigObjectInterface = {
    opacityRate: 0.5,
    displayOriginalCc: DisplayOriginalCc.OK,
  }

  private callbackFuncChangeConfig: (config: ConfigObjectInterface) => void

  constructor(callbackFunc: (config: ConfigObjectInterface) => void) {
    this.callbackFuncChangeConfig = callbackFunc
  }

  getConfig = (): ConfigObjectInterface => {
    return this.config
  }

  setConfig = (config: ConfigObjectInterface): void => {
    this.config = config
    this.callbackFuncChangeConfig(this.config)
  }

  loadConfig = async (): Promise<void> => {
    this.config.opacityRate =
      (await getStorage("configOpacityRate")) ?? this.config.opacityRate
    this.config.displayOriginalCc =
      (await getStorage("configDisplayOriginalCc")) ??
      this.config.displayOriginalCc
  }

  observeGoogleStorage = (): void => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      const config = this.config
      if ("configOpacityRate" in changes) {
        config.opacityRate = changes.configOpacityRate.newValue
      }
      if ("configDisplayOriginalCc" in changes) {
        config.displayOriginalCc = changes.configDisplayOriginalCc.newValue
      }
      this.setConfig(config)
    })
  }
}
