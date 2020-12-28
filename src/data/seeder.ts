import { create as createSeeder } from 'random-seed'

declare global {
  interface Window {
    useTestSeed(): void
  }
}

let seeder = createSeeder()

export const useTestSeed = () => {
  seeder = createSeeder('test1234')
}

export const resetTestSeed = useTestSeed

export const restoreDefaultSeeder = () => {
  seeder = createSeeder()
}

window.useTestSeed = useTestSeed

export const random = () => seeder.random()
