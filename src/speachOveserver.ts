import { selector } from "./selector"
import { CcAreaElement } from "@/elements/ccAreaElement"
export interface speachOveserverInterface {
  run: () => void
  stop: () => void
}

const config = { childList: true, subtree: true }
const oveserverNode = new CcAreaElement().getElement()

export class SpeachOveserver implements speachOveserverInterface {
  private observer: MutationObserver | null = null
  private callbackFuncObserver: (
    name: string,
    imagePath: string,
    speach: string
  ) => void

  constructor(
    callbackFunc: (name: string, imagePath: string, speach: string) => void
  ) {
    this.callbackFuncObserver = callbackFunc
  }
  run() {
    const mutationCallback: MutationCallback = (
      mutations: MutationRecord[],
      observer: MutationObserver
    ) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          if (mutation.target.nodeName === "SPAN") {
            const speechAreaNode = mutation.target
            const userAreaNode =
              speechAreaNode.parentNode?.parentNode?.parentNode
            if (!userAreaNode) return
            const userAreaNodeList = Array.from(userAreaNode.children)
            if (userAreaNodeList.length !== 3) return
            this.callbackFuncObserver(
              userAreaNodeList[1].textContent ?? "",
              (userAreaNodeList[0] as HTMLImageElement).src,
              userAreaNodeList[2].textContent ?? ""
            )
          }
        }
      }
    }

    this.observer = new MutationObserver(mutationCallback)

    this.observer.observe(<Node>oveserverNode, config)
  }
  stop() {
    this.observer?.disconnect()
  }
}
