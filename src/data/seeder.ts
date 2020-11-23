import { create as createSeeder } from 'random-seed'

declare global {
  interface Window {
    useTestSeed(): void
  }
}

let seeder = createSeeder()

window.useTestSeed = () => {
  seeder = createSeeder('test1234')
}

export const random = () => seeder.random()
