import { UserWithToken } from '#types'

import { Get, Set } from './store.types'

export type UserState = {
  user: UserWithToken | null

  setUser: (user: UserWithToken | null) => void
}

export const usersInitialState = {
  user: null,
  users: [],
}

export const userStore = (set: Set<UserState>, get: Get<UserState>): UserState => ({
  ...usersInitialState,

  setUser: (user: UserWithToken | null) => set((state) => ({ ...state, user })),
})
