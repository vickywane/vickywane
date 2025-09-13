import { create } from "zustand"
import { navigation_links } from "@/data/static"

export interface INavigationState {
  activeLinkItem: any

  setNavigationLinkItem: (key: string) => void
}

const initialState: Pick<INavigationState, "activeLinkItem"> = {
  activeLinkItem: navigation_links[0],
}

export const useNavigationStore = create<INavigationState>(set => ({
  ...initialState,

  setNavigationLinkItem: key => {
    const linkItem = navigation_links.find(link => link.id === key)
    
    console.log("KEY =>", key)

    if (linkItem) {
      return set({
        activeLinkItem: linkItem 
      })
    }
  },
}))
