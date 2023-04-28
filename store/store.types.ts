import { StoreApi } from 'zustand'
import { GenericState } from './generic'
import { UserState } from './users'

export type State = UserState & GenericState

export type Set<T extends object = State> = StoreApi<T>['setState']

export type Get<T extends object = State> = StoreApi<T>['getState']
