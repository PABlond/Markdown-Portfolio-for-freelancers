import initialState from "./initialState"
import constants from "./../constants"

export default (
  state = initialState.content,
  action: { type: string; payload: any }
) => {
  const { getContent, setDesc } = constants
  const { type, payload } = action
  switch (type) {
    case getContent.name:
      return {
        ...state,
        works: payload.works || state.works,
        header: {
          name: payload.header.name || state.header.name,
          title: payload.header.title || state.header.title,
          subtitle: payload.header.subtitle || state.header.subtitle,
        },
        about: payload.about || state.about,
        contacts: payload.contact || state.contacts,
        md: payload.md || state.md,
        description: payload.description || state.description,
      }
    case setDesc.name:
      return {
        ...state,
        about: {
          ...state.about,
          description: payload.description,
        },
      }
    default:
      return state
  }
}
